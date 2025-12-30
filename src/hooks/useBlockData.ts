import { useState, useEffect, useRef } from "react";

export interface BlockInfo {
  number: string;
  hash: string;
  timestamp: string;
}

const ETHERSCAN_BASE = "https://api.etherscan.io/v2/api";
const POLL_INTERVAL_MS = 10000; // 10 seconds
const MAX_MISSED_TO_FETCH = 50; // safety cap to avoid spamming API

const getEnvApiKey = (): string | undefined => {
  try {
    const proc = (globalThis as any).process;
    return (
      (proc && proc.env && (proc.env.ETHERSCAN_API_KEY as string)) || undefined
    );
  } catch {
    return undefined;
  }
};

export const useBlockData = () => {
  const [blocks, setBlocks] = useState<BlockInfo[]>([]);
  const lastSeenRef = useRef<number | null>(null);
  const apiKey = getEnvApiKey();

  // Helper: convert hex timestamp to readable string
  const tsFromHex = (hex?: string) => {
    if (!hex) return new Date().toLocaleTimeString([], { hour12: false });
    const ts = parseInt(hex, 16);
    if (isNaN(ts)) return new Date().toLocaleTimeString([], { hour12: false });
    return new Date(ts * 1000).toLocaleTimeString([], { hour12: false });
  };

  // Fetch latest block number via Etherscan proxy
  const fetchLatestBlockNumber = async (): Promise<number> => {
    const keyParam = apiKey ? `&apikey=${apiKey}` : "";
    const url = `${ETHERSCAN_BASE}?chainid=1&module=proxy&action=eth_blockNumber${keyParam}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch latest block number");
    const data = await res.json();
    const result = data && (data.result !== undefined ? data.result : null);

    const parsePossibleBlock = (val: any): number | null => {
      if (typeof val === "number" && Number.isFinite(val))
        return Math.floor(val);
      if (typeof val === "string") {
        const s = val.trim();
        if (s.startsWith("0x") || s.startsWith("0X")) {
          const n = parseInt(s, 16);
          return Number.isNaN(n) ? null : n;
        }
        // decimal string
        const nDec = parseInt(s, 10);
        return Number.isNaN(nDec) ? null : nDec;
      }
      return null;
    };

    let num = parsePossibleBlock(result);

    // If Etherscan didn't return a usable value, fall back to public RPC
    if (num === null) {
      try {
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
        if (rpcRes.ok) {
          const rpcData = await rpcRes.json();
          const rpcHex = rpcData && rpcData.result;
          const parsed = parsePossibleBlock(rpcHex);
          if (parsed !== null) num = parsed;
        }
      } catch (e) {
        console.error("cloudflare fallback failed", e);
      }
    }

    if (num === null) {
      console.error("invalid latest block payload", data);
      throw new Error("Parsed NaN latest block");
    }

    return num;
  };

  // Fetch block details by number using Etherscan
  const fetchBlockByNumber = async (num: number): Promise<BlockInfo> => {
    const hex = `0x${num.toString(16)}`;
    const keyParam = apiKey ? `&apikey=${apiKey}` : "";
    const url = `${ETHERSCAN_BASE}?chainid=1&module=proxy&action=eth_getBlockByNumber&tag=${hex}&boolean=false${keyParam}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch block ${num}`);
    const data = await res.json();
    const result = data.result || data.result;
    if (!result) throw new Error("Invalid block result");

    return {
      number: num.toString(),
      hash: result.hash || hex,
      timestamp: tsFromHex(result.timestamp || undefined),
    };
  };

  useEffect(() => {
    let mounted = true;

    // No simulation: if we can't retrieve blocks, we will not modify the feed.

    const poll = async () => {
      try {
        const latest = await fetchLatestBlockNumber();

        // If we have no last seen, fetch the latest block details and set
        if (lastSeenRef.current === null) {
          const block = await fetchBlockByNumber(latest);
          if (!mounted) return;
          lastSeenRef.current = latest;
          setBlocks((prev) => [block, ...prev].slice(0, 15));
          return;
        }

        const lastSeen = lastSeenRef.current;
        if (latest <= lastSeen) return; // nothing new

        // Determine range of missed blocks
        const from = lastSeen + 1;
        const to = latest;
        const count = to - from + 1;

        // Cap to avoid spamming API
        const safeCount = Math.min(count, MAX_MISSED_TO_FETCH);
        const startToFetch = to - safeCount + 1;

        const nums: number[] = [];
        for (let n = startToFetch; n <= to; n++) nums.push(n);

        // Fetch sequentially to preserve order (could parallelize but keep simple)
        const fetched: BlockInfo[] = [];
        for (const n of nums) {
          try {
            const b = await fetchBlockByNumber(n);
            fetched.push(b);
          } catch (err) {
            // skip failed block but continue
            console.error("block fetch failed", n, err);
          }
        }

        if (!mounted) return;
        if (fetched.length === 0) {
          // nothing fetched; do not update lastSeen so we retry next poll
          return;
        }

        // newest first
        const newestFirst = fetched.reverse();
        lastSeenRef.current = latest;
        setBlocks((prev) => {
          // prepend fetched (newest first) but ensure uniqueness by number
          const combined = [...newestFirst, ...prev];
          const seen = new Set<string>();
          const dedup: BlockInfo[] = [];
          for (const b of combined) {
            if (!seen.has(b.number)) {
              dedup.push(b);
              seen.add(b.number);
            }
            if (dedup.length >= 15) break;
          }
          return dedup;
        });
      } catch (error) {
        // On any API error, do not simulate — keep the feed unchanged and retry later
        console.error("poll error", error);
        return;
      }
    };

    // run immediately then every POLL_INTERVAL_MS
    poll();
    const id = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [apiKey]);

  return blocks;
};
