import { useState, useEffect } from "react";

export interface BlockInfo {
  number: number;
  timestamp: number; // seconds since epoch
}

interface RawBlock {
  number?: string;
  timestamp?: string;
}

const ETHERSCAN_BASE = "https://api.etherscan.io/v2/api";
const PUBLIC_RPC = "https://ethereum-rpc.publicnode.com";
const POLL_INTERVAL_MS = 12000; // ~1 Ethereum block
const MAX_BLOCKS = 8;

const fetchFromEtherscan = async (apiKey: string): Promise<RawBlock | null> => {
  const url = `${ETHERSCAN_BASE}?chainid=1&module=proxy&action=eth_getBlockByNumber&tag=latest&boolean=false&apikey=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  // Etherscan reports errors as status "0" in a 200 response
  if (data?.status === "0") return null;
  return data?.result ?? null;
};

const fetchFromRpc = async (): Promise<RawBlock | null> => {
  const res = await fetch(PUBLIC_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getBlockByNumber",
      params: ["latest", false],
      id: 1,
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.result ?? null;
};

const parseBlock = (raw: RawBlock | null): BlockInfo | null => {
  if (!raw?.number || !raw.timestamp) return null;
  const number = parseInt(raw.number, 16);
  const timestamp = parseInt(raw.timestamp, 16);
  if (Number.isNaN(number) || Number.isNaN(timestamp)) return null;
  return { number, timestamp };
};

const fetchLatestBlock = async (
  apiKey: string | null
): Promise<BlockInfo | null> => {
  if (apiKey) {
    try {
      const block = parseBlock(await fetchFromEtherscan(apiKey));
      if (block) return block;
    } catch (error) {
      console.debug("Etherscan fetch failed, falling back to RPC", error);
    }
  }
  return parseBlock(await fetchFromRpc());
};

export const useBlockData = () => {
  const [blocks, setBlocks] = useState<BlockInfo[]>([]);
  const apiKey: string | null = import.meta.env.VITE_ETHERSCAN_API_KEY || null;

  useEffect(() => {
    let mounted = true;

    const poll = async () => {
      if (document.hidden) return;
      try {
        const block = await fetchLatestBlock(apiKey);
        if (!mounted || !block) return;
        setBlocks((prev) =>
          prev.length > 0 && block.number <= prev[0].number
            ? prev
            : [block, ...prev].slice(0, MAX_BLOCKS)
        );
      } catch (error) {
        console.debug("poll error", error); // keep feed unchanged
      }
    };

    // Catch up immediately when the tab becomes visible again
    const onVisibilityChange = () => {
      if (!document.hidden) poll();
    };

    poll();
    const id = setInterval(poll, POLL_INTERVAL_MS);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      mounted = false;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [apiKey]);

  return blocks;
};
