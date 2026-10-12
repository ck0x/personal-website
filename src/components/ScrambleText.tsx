import React from 'react';
import { useScrambleText } from '../hooks/useScrambleText';

interface ScrambleTextProps {
  text: string;
  as?: React.ElementType;
  speed?: number;
  delay?: number;
  revealFactor?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrambleText = ({
  text,
  as: Component = 'span',
  speed = 40,
  delay = 0,
  revealFactor = 0.1,
  className = '',
  style,
}: ScrambleTextProps) => {
  const displayText = useScrambleText(text, speed, delay, revealFactor);

  return (
    <Component className={className} style={style}>
      {/* The invisible final text reserves layout; screen readers get the real text */}
      <span className="scramble" aria-hidden="true">
        <span className="scramble-ghost">{text}</span>
        <span>{displayText}</span>
      </span>
      <span className="sr-only">{text}</span>
    </Component>
  );
};
