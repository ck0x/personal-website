import { useState, useEffect, useRef } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";
const CHARS_LEN = CHARS.length;

export const useScrambleText = (
  text: string,
  speed: number = 40,
  delay: number = 0,
  revealFactor: number = 0.1 // Factor to control sequential reveal (0 = all at once, 1 = strictly sequential)
) => {
  const [displayText, setDisplayText] = useState("");
  const frameRequest = useRef<number | null>(null);
  const frame = useRef(0);
  const queue = useRef<
    { from: string; to: string; start: number; end: number; char: string }[]
  >([]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const setupQueue = () => {
      queue.current = [];
      // Shorten per-character durations for longer texts by scaling speed down,
      // but avoid making medium-length lines (like an About sentence) too fast.
      const MIN_MULTIPLIER = 0.8;
      const multiplier = Math.max(
        MIN_MULTIPLIER,
        Math.min(1, 40 / Math.max(1, text.length))
      );
      const adjustedSpeed = Math.max(6, Math.floor(speed * multiplier));

      for (let i = 0; i < text.length; i++) {
        const from = "";
        const to = text[i];

        // Use revealFactor to adjust the sequential bias.
        // Lower factor means characters start closer together.
        const stagger = i * adjustedSpeed * revealFactor;
        const start = Math.floor(Math.random() * (adjustedSpeed / 2)) + stagger;
        const end =
          start +
          Math.floor(Math.random() * Math.max(3, adjustedSpeed)) +
          Math.floor(adjustedSpeed / 3);

        queue.current.push({ from, to, start, end, char: "" });
      }
    };

    const animate = () => {
      let output = "";
      let complete = 0;
      const q = queue.current;

      for (let i = 0; i < q.length; i++) {
        let { from, to, start, end, char } = q[i];

        if (frame.current >= end) {
          complete++;
          output += to;
        } else if (frame.current >= start) {
          // Use a single random call per slot per frame to reduce overhead
          const rnd = Math.random();
          if (!char || rnd < 0.28) {
            char = CHARS[Math.floor(rnd * CHARS_LEN)];
            q[i].char = char;
          }
          output += char;
        } else {
          output += from;
        }
      }

      setDisplayText(output);

      if (complete === q.length) {
        setDisplayText(text);
        if (frameRequest.current) {
          cancelAnimationFrame(frameRequest.current);
          frameRequest.current = null;
        }
        return;
      }

      frame.current++;
      frameRequest.current = requestAnimationFrame(animate);
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
