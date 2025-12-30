import { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export const useScrambleText = (text: string, speed: number = 2, delay: number = 0) => {
  const [displayText, setDisplayText] = useState(text);
  
  // Use a ref to keep track of the animation frame specifically
  const frameRequest = useRef<number | null>(null);
  const iteration = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const startAnimation = () => {
      iteration.current = 0;
      
      const animate = () => {
        setDisplayText(() => 
          text
            .split('')
            .map((_, index) => { // Removed unused char
              if (index < iteration.current) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration.current < text.length) {
          iteration.current += 1 / speed;
          // Loop
          frameRequest.current = requestAnimationFrame(animate); 
        } else {
          setDisplayText(text); // Ensure final state is clean
        }
      };

      frameRequest.current = requestAnimationFrame(animate);
    };

    if (delay > 0) {
      timeout = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      clearTimeout(timeout);
      if (frameRequest.current) cancelAnimationFrame(frameRequest.current);
    };
  }, [text, speed, delay]);

  return displayText;
};

