import React, { useState, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+';

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = '', 
  scrambleSpeed = 30 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const startScramble = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = window.setInterval(() => {
      setDisplayText(prev => 
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      
      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 2; // Slower iteration for smoother effect
    }, scrambleSpeed);
  };

  const stopScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  return (
    <span 
      className={`inline-block ${className}`}
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;