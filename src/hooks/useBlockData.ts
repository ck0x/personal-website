import { useState, useEffect } from 'react';

export interface BlockInfo {
  number: string;
  hash: string;
  timestamp: string;
}

export const useBlockData = () => {
  const [blocks, setBlocks] = useState<BlockInfo[]>([]);

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        const response = await fetch('https://cloudflare-eth.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
            id: 1,
          }),
        });
        const data = await response.json();
        const blockNumberHex = data.result;
        const blockNumber = parseInt(blockNumberHex, 16);

        setBlocks((prev) => {
          const newBlock: BlockInfo = {
            number: blockNumber.toString(),
            hash: blockNumberHex, // Simplified for visual
            timestamp: new Date().toLocaleTimeString([], { hour12: false }),
          };
          
          // Only add if it's a new block
          if (prev.length > 0 && prev[0].number === newBlock.number) {
            return prev;
          }
          
          return [newBlock, ...prev].slice(0, 10);
        });
      } catch (error) {
        console.error('Failed to fetch Ethereum block:', error);
      }
    };

    fetchBlock(); // Initial fetch
    const interval = setInterval(fetchBlock, 12000); // Fetch every ~12s

    return () => clearInterval(interval);
  }, []);

  return blocks;
};
