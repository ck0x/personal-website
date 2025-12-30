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
  onClick?: () => void;
}

export const ScrambleText = ({ 
  text, 
  as: Component = 'span', 
  speed = 40, 
  delay = 0,
  revealFactor = 0.1,
  className = '',
  style,
  onClick
}: ScrambleTextProps) => {
  const displayText = useScrambleText(text, speed, delay, revealFactor);

  return (
    <Component className={className} style={style} onClick={onClick}>
      {displayText}
    </Component>
  );
};

