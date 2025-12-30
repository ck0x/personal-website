import React from 'react';
import { useScrambleText } from '../hooks/useScrambleText';

interface ScrambleTextProps {
  text: string;
  as?: React.ElementType;
  speed?: number;
  delay?: number;
  className?: string;
  onClick?: () => void;
}

export const ScrambleText = ({ 
  text, 
  as: Component = 'span', 
  speed = 3, 
  delay = 0,
  className = '',
  onClick
}: ScrambleTextProps) => {
  const displayText = useScrambleText(text, speed, delay);

  return (
    <Component className={className} onClick={onClick}>
      {displayText}
    </Component>
  );
};

