import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const Preloader: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Start fade out slightly after load
    const timer = setTimeout(() => {
      setIsHidden(true);
    }, 2000); // Wait 2 seconds for logo to pulse

    // Remove from DOM after transition
    const removeTimer = setTimeout(() => {
      setIsRemoved(true);
    }, 2800); // 2000ms + 800ms transition

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 bg-black z-[9999] flex flex-col justify-center items-center transition-all duration-1000 ease-out ${isHidden ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}
    >
      <div className="mb-12 animate-pulse-slow flex flex-col items-center">
        <Logo color="white" height="h-32 md:h-48" />
        <div className="text-white text-[10px] md:text-xs font-black uppercase tracking-[0.4em] pl-1 opacity-80 -mt-10 md:-mt-14">
          Consult. Plan. Deliver.
        </div>
      </div>
      <div className="w-64 h-[2px] bg-stone-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-[2000ms] ease-in-out w-0 animate-[width_2s_ease-in-out_forwards]"
          style={{ width: '100%' }}
        />
      </div>
      <style>{`
        @keyframes width {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;