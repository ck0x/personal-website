import { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export const useScrambleText = (
  text: string, 
  speed: number = 40, 
  delay: number = 0,
  revealFactor: number = 0.1 // Factor to control sequential reveal (0 = all at once, 1 = strictly sequential)
) => {
  const [displayText, setDisplayText] = useState('');
  const frameRequest = useRef<number | null>(null);
  const frame = useRef(0);
  const queue = useRef<{ from: string; to: string; start: number; end: number; char: string }[]>([]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const setupQueue = () => {
      queue.current = [];
      for (let i = 0; i < text.length; i++) {
        const from = '';
        const to = text[i];
        
        // Use revealFactor to adjust the sequential bias. 
        // Lower factor means characters start closer together.
        const stagger = i * speed * revealFactor;
        const start = Math.floor(Math.random() * (speed / 2)) + stagger;
        const end = start + Math.floor(Math.random() * speed) + (speed / 2);
        
        queue.current.push({ from, to, start, end, char: '' });
      }
    };

    const animate = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < queue.current.length; i++) {
        let { from, to, start, end, char } = queue.current[i];

        if (frame.current >= end) {
          complete++;
          output += to;
        } else if (frame.current >= start) {
          if (!char || Math.random() < 0.28) {
            char = CHARS[Math.floor(Math.random() * CHARS.length)];
            queue.current[i].char = char;
          }
          output += char;
        } else {
          output += from;
        }
      }

      setDisplayText(output);

      if (complete === queue.current.length) {
        setDisplayText(text);
      } else {
        frame.current++;
        frameRequest.current = requestAnimationFrame(animate);
      }
    };

    const startAnimation = () => {
      frame.current = 0;
      setupQueue();
      animate();
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
  }, [text, speed, delay, revealFactor]);

  return displayText;
};


