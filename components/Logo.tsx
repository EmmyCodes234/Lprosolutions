import React from 'react';

interface LogoProps {
  color?: 'white' | 'dark';
  className?: string;
  height?: string;
}

const Logo: React.FC<LogoProps> = ({ color = 'dark', className = '', height = 'h-8' }) => {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src="/lprologonew.png"
        alt="L-Pro Solutions"
        className={`${height} w-auto transition-all duration-300 ${color === 'dark' ? 'brightness-0' : ''
          }`}
      />
    </div>
  );
};

export default Logo;