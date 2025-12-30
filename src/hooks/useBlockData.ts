import { useState, useEffect } from 'react';

export interface BlockInfo {
  number: string;
  hash: string;
  timestamp: string;
}

export const useBlockData = () => {
  const [blocks, setBlocks] = useState<BlockInfo[]>([]);

  useEffect(() => {
    // Helper to generate a fake block if needed
    const createSimulatedBlock = (lastBlock?: string) => {
      const num = lastBlock ? parseInt(lastBlock) + 1 : 19345678;
      return {
        number: num.toString(),
        hash: '0x' + Math.random().toString(16).slice(2, 10),
        timestamp: new Date().toLocaleTimeString([], { hour12: false }),
      };
    };

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
        
        if (!response.ok) throw new Error('RPC error');
        
        const data = await response.json();
        const blockNumberHex = data.result;
        const blockNumber = parseInt(blockNumberHex, 16);

        setBlocks((prev) => {
          const newBlock: BlockInfo = {
            number: blockNumber.toString(),
            hash: blockNumberHex,
            timestamp: new Date().toLocaleTimeString([], { hour12: false }),
          };
          
          if (prev.length > 0 && prev[0].number === newBlock.number) return prev;
          return [newBlock, ...prev].slice(0, 15);
        });
      } catch (error) {
        // Simulation fallback
        setBlocks((prev) => {
          const newBlock = createSimulatedBlock(prev[0]?.number);
          return [newBlock, ...prev].slice(0, 15);
        });
      }
    };

    fetchBlock();
    const interval = setInterval(fetchBlock, 12000);

    return () => clearInterval(interval);
  }, []);

  return blocks;
};

