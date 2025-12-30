import { useBlockData } from '../hooks/useBlockData';
import { ScrambleText } from './ScrambleText';

export const BlockFeed = () => {
  const blocks = useBlockData();

  return (
    <aside style={{
      position: 'fixed',
      right: '1.5rem',
      top: '1.5rem',
      bottom: '1.5rem',
      width: '220px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      fontSize: '0.75rem',
      color: '#aaa', // Lighter grey for better visibility
      opacity: 0.8, // Increased opacity
      textAlign: 'right',
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>

      <div style={{ marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
        <ScrambleText text="[ ETH_MAINNET_FEED ]" speed={20} />
      </div>
      
      {blocks.map((block, index) => {
        const isLatest = index === 0;
        return (
          <div key={block.number} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2px',
            position: 'relative',
            marginBottom: isLatest ? '0.5rem' : '0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
              {isLatest && (
                <span className="blink" style={{ 
                  color: '#00ff00', 
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em'
                }}>
                  [ LIVE ]
                </span>
              )}
              <ScrambleText 
                text={`BLOCK_${block.number}`} 
                speed={30} 
                delay={0}
                style={isLatest ? { color: '#eee', fontWeight: 'bold' } : undefined}
              />
            </div>
            <div style={{ fontSize: '0.6rem', color: isLatest ? '#888' : '#555' }}>
              <ScrambleText 
                text={`TS: ${block.timestamp}`} 
                speed={50} 
              />
            </div>
          </div>
        );
      })}
    </aside>
  );
};
