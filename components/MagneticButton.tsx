import React, { useRef, useState, MouseEvent } from 'react';
import { soundManager } from './SoundManager';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // How strong the magnetic pull is
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 30
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Calculate center of button
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate distance from center
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Apply magnetic force (dampened by strength factor)
    // We normalize slightly to ensure it doesn't fly off too far
    const x = deltaX / width * strength;
    const y = deltaY / height * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => soundManager.play('hover')}
      onClick={() => soundManager.play('click')}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out will-change-transform inline-block ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${position.x * 0.3}px, ${position.y * 0.3}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MagneticButton;