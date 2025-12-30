import { useBlockData } from '../hooks/useBlockData';
import { ScrambleText } from './ScrambleText';

export const BlockFeed = () => {
  const blocks = useBlockData();

  return (
    <aside style={{
      position: 'fixed',
      right: '2rem',
      top: '2rem',
      bottom: '2rem',
      width: '200px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      fontSize: '0.7rem',
      color: '#888',
      opacity: 0.6,
      textAlign: 'right',
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <div style={{ marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
        <ScrambleText text="[ ETH_MAINNET_FEED ]" speed={20} />
      </div>
      
      {blocks.map((block) => (
        <div key={block.number} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <ScrambleText 
            text={`BLOCK_${block.number}`} 
            speed={30} 
            delay={0}
          />
          <div style={{ fontSize: '0.6rem', color: '#555' }}>
            <ScrambleText 
              text={`TS: ${block.timestamp}`} 
              speed={50} 
            />
          </div>
        </div>
      ))}
    </aside>
  );
};
