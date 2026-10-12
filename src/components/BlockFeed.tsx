import { useState, useEffect } from "react";
import { useBlockData } from "../hooks/useBlockData";
import { ScrambleText } from "./ScrambleText";

const formatRelativeTime = (secs: number) => {
  const diff = Math.floor(Date.now() / 1000) - secs;
  if (diff < 5) return "now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export const BlockFeed = () => {
  const blocks = useBlockData();
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <aside className="feed" aria-label="Latest Ethereum blocks">
      <div className="feed-header label">
        <ScrambleText text="eth mainnet" speed={20} delay={600} />
      </div>

      <ol className="feed-list">
        {blocks.map((block, index) => {
          const isLatest = index === 0;
          return (
            <li
              key={block.number}
              className={isLatest ? "feed-row is-latest" : "feed-row"}
            >
              <div className="feed-block">
                {isLatest && <span className="live-dot" aria-hidden="true" />}
                <ScrambleText
                  text={`#${block.number.toLocaleString("en-US")}`}
                  speed={30}
                />
              </div>
              <div className="feed-time">
                <ScrambleText
                  text={formatRelativeTime(block.timestamp)}
                  speed={50}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </aside>
  );
};
