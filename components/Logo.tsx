import React from 'react';

interface LogoProps {
  color?: 'white' | 'dark';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ color = 'dark', className = '' }) => {
  const textColor = color === 'white' ? 'text-white' : 'text-stone-900';

  return (
    <div className={`flex flex-col items-start select-none ${className}`}>
      {/* We split the text to position the arrow exactly relative to the 'P' */}
      <div className={`flex items-baseline text-3xl font-display font-black tracking-tighter leading-none ${textColor} relative z-10`}>
        <span>L-</span>
        <div className="relative">
          {/* Accent Arrow Icon */}
          <div className="absolute -top-4 -left-1.5 text-accent z-0">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Navigation Arrow Shape pointing NE */}
              <path d="M3 11L22 2L13 21L11 13L3 11Z" stroke="none" />
            </svg>
          </div>
          <span className="relative z-10">P</span>
        </div>
        <span>RO</span>
      </div>

      <span className={`text-[0.6rem] font-bold tracking-[0.35em] uppercase ${textColor} pl-1 mt-1`}>
        Solutions
      </span>
    </div>
  );
};

export default Logo;