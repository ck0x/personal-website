import { useState, useEffect, useRef } from "react";

export interface BlockInfo {
  number: string;
  hash?: string;
  timestamp: number; // seconds since epoch
}

const ETHERSCAN_BASE = "https://api.etherscan.io/v2/api";
const POLL_INTERVAL_MS = 5000; // 5 seconds

const parseTimestampSeconds = (hex?: string): number | null => {
  if (!hex) return null;
  const n = parseInt(hex, 16);
  if (Number.isNaN(n)) return null;
  return n;
};

export const useBlockData = () => {
  const [blocks, setBlocks] = useState<BlockInfo[]>([]);
  const lastSeenRef = useRef<number | null>(null);
  const apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY || null;

  const parsePossibleBlock = (val: any): number | null => {
    if (typeof val === "number" && Number.isFinite(val)) return Math.floor(val);
    if (typeof val === "string") {
      const s = val.trim();
      if (s.startsWith("0x") || s.startsWith("0X")) {
        const parsed = parseInt(s, 16);
        return Number.isNaN(parsed) ? null : parsed;
      }
      const parsedDec = parseInt(s, 10);
      return Number.isNaN(parsedDec) ? null : parsedDec;
    }
    return null;
  };

  const fetchLatestBlockNumber = async (): Promise<number> => {
    // If we don't have an API key, use public RPC
    if (!apiKey) {
      const rpcRes = await fetch("https://cloudflare-eth.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        }),
      });
      if (!rpcRes.ok) throw new Error("Failed RPC latest block");
      const rpcJson = await rpcRes.json();
      const parsed = parsePossibleBlock(rpcJson && rpcJson.result);
      if (parsed === null) {
        console.error("Invalid RPC latest block payload:", rpcJson);
        throw new Error("Parsed NaN latest block from RPC");
      }
      return parsed;
    }

    // Use Etherscan GET endpoint
    const url = `${ETHERSCAN_BASE}?chainid=1&module=proxy&action=eth_blockNumber&apikey=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok)
      throw new Error("Failed to fetch latest block number from Etherscan");
    const data = await res.json();

    // If Etherscan returns an error payload, fall back to RPC
    if (data && data.status === "0") {
      console.debug(
        "Etherscan error, falling back to RPC:",
        data.message,
        data.result
      );
      const rpcRes = await fetch("https://cloudflare-eth.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        }),
      });
      if (!rpcRes.ok) {
        console.debug("Failed RPC latest block fallback (non-OK response)");
        throw new Error("Failed RPC latest block fallback");
      }
      const rpcJson = await rpcRes.json();
      const parsed = parsePossibleBlock(rpcJson && rpcJson.result);
      if (parsed === null) {
        console.debug("Invalid RPC latest block payload (fallback):", rpcJson);
        throw new Error("Parsed NaN latest block from RPC fallback");
      }
      return parsed;
    }

    const parsed = parsePossibleBlock(data && data.result);
    if (parsed === null) {
      console.error("invalid latest block payload from Etherscan:", data);
      throw new Error("Parsed NaN latest block");
    }
    return parsed;
  };

  const fetchBlockByNumber = async (num: number): Promise<BlockInfo | null> => {
    const hex = `0x${num.toString(16)}`;
    if (!apiKey) {
      // RPC call
      const rpcRes = await fetch("https://cloudflare-eth.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_getBlockByNumber",
          params: [hex, false],
          id: 1,
        }),
      });
      if (!rpcRes.ok) throw new Error(`Failed to fetch block ${num} via RPC`);
      const rpcJson = await rpcRes.json();
      const r = rpcJson && rpcJson.result;
      if (!r) throw new Error("Invalid RPC block result");
      return {
        number: num.toString(),
        hash: r.hash || hex,
        timestamp:
          parseTimestampSeconds(r.timestamp) ?? Math.floor(Date.now() / 1000),
      };
    }

    const url = `${ETHERSCAN_BASE}?chainid=1&module=proxy&action=eth_getBlockByNumber&tag=${hex}&boolean=false&apikey=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch block ${num} from Etherscan`);
    const data = await res.json();

    // Etherscan occasionally returns status: "0" (e.g. NOTOK) for a short time
    // — fall back to a public RPC call, but don't surface a noisy error on first load.
    if (data && data.status === "0") {
      console.debug(
        `Etherscan block fetch failed, attempting RPC fallback: ${data.message}`
      );
      try {
        const rpcRes = await fetch("https://cloudflare-eth.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBlockByNumber",
            params: [hex, false],
            id: 1,
          }),
        });
        if (!rpcRes.ok) {
          console.debug(`RPC fallback returned non-OK for block ${num}`);
          return null;
        }
        const rpcJson = await rpcRes.json();
        const rr = rpcJson && rpcJson.result;
        if (!rr) {
          console.debug(`RPC fallback returned invalid block for ${num}`);
          return null;
        }
        return {
          number: num.toString(),
          hash: rr.hash || hex,
          timestamp:
            parseTimestampSeconds(rr.timestamp) ??
            Math.floor(Date.now() / 1000),
        };
      } catch (e) {
        console.debug(`RPC fallback error for block ${num}:`, e);
        return null;
      }
    }

    const r = data && data.result;
    if (!r) {
      console.debug(`Etherscan returned no block result for ${num}`);
      return null;
    }
    return {
      number: num.toString(),
      hash: r.hash || hex,
      timestamp:
        parseTimestampSeconds(r.timestamp) ?? Math.floor(Date.now() / 1000),
    };
  };

  useEffect(() => {
    let mounted = true;

    const poll = async () => {
      try {
        const latest = await fetchLatestBlockNumber();

        // first run: fetch single latest block
        if (lastSeenRef.current === null) {
          const block = await fetchBlockByNumber(latest);
          if (!mounted) return;
          if (!block) {
            // transient failure; try again on the next poll without logging
            return;
          }
          lastSeenRef.current = latest;
          setBlocks((prev) => [block, ...prev].slice(0, 15));
          return;
        }

        const lastSeen = lastSeenRef.current as number;
        if (latest <= lastSeen) return; // nothing new

        // Only fetch the latest block (we poll frequently enough)
        try {
          const b = await fetchBlockByNumber(latest);
          if (!mounted) return;
          if (!b) {
            // transient failure; do not advance lastSeenRef so we'll retry
            return;
          }
          lastSeenRef.current = latest;
          setBlocks((prev) => {
            const combined = [b, ...prev];
            const dedup: BlockInfo[] = [];
            const seen = new Set<string>();
            for (const item of combined) {
              if (!seen.has(item.number)) {
                dedup.push(item);
                seen.add(item.number);
              }
              if (dedup.length >= 15) break;
            }
            return dedup;
          });
        } catch (err) {
          console.error("block fetch failed for latest", latest, err);
        }
      } catch (error) {
        console.debug("poll error", error);
        return; // keep feed unchanged
      }
    };

    poll();
    const id = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [apiKey]);

  return blocks;
};
