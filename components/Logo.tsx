import React from 'react';

interface LogoProps {
  color?: 'white' | 'dark';
  className?: string;
  height?: string;
}

const Logo: React.FC<LogoProps> = ({ color = 'dark', className = '', height = 'h-20' }) => {

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src="/partners/lprogearlogo.png"
        alt="L-Pro Solutions"
        className={`${height} w-auto transition-all duration-300 ${color === 'dark' ? 'brightness-0' : ''
          }`}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

export default Logo;