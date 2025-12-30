import React from 'react';
import { useScrambleText } from '../hooks/useScrambleText';

interface ScrambleTextProps {
  text: string;
  as?: React.ElementType;
  speed?: number;
  delay?: number;
  revealFactor?: number;
  className?: string;
  onClick?: () => void;
}

export const ScrambleText = ({ 
  text, 
  as: Component = 'span', 
  speed = 40, 
  delay = 0,
  revealFactor = 0.1,
  className = '',
  onClick
}: ScrambleTextProps) => {
  const displayText = useScrambleText(text, speed, delay, revealFactor);

  return (
    <Component className={className} onClick={onClick}>
      {displayText}
    </Component>
  );
};

