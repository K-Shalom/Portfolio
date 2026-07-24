import { useState, useEffect, useRef, useCallback } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({
  text = 'Shalom K.',
  autoStart = true,
  className = '',
  style = {},
}) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimatingRef = useRef(false);

  const scramble = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    let frame = 0;
    const totalFrames = text.length * 4 + 10;

    const interval = setInterval(() => {
      frame++;
      const resolvedCharsCount = Math.floor(frame / 4);

      const output = text
        .split('')
        .map((char, idx) => {
          if (char === ' ') return ' ';
          if (idx < resolvedCharsCount) {
            return text[idx];
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplayText(output);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayText(text);
        isAnimatingRef.current = false;
      }
    }, 35);
  }, [text]);

  useEffect(() => {
    if (autoStart) {
      scramble();
    }
  }, [autoStart, scramble]);

  return (
    <span
      className={className}
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        ...style,
      }}
      onMouseEnter={scramble}
      onClick={scramble}
      title="Click or hover to scramble"
    >
      {displayText}
    </span>
  );
}
