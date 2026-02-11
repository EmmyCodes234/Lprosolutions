import React, { useRef, useState } from 'react';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', intensity = 15 }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [brightness, setBrightness] = useState(1);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -intensity;
        const rotateY = ((x - centerX) / centerX) * intensity;

        setRotation({ x: rotateX, y: rotateY });

        // Add a slight brightness increase on hover for that "glass" flare effect
        setBrightness(1.1);
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setBrightness(1);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`perspective-1000 ${className}`}
            style={{
                transformStyle: 'preserve-3d',
            }}
        >
            <div
                className="w-full h-full transition-transform duration-200 ease-out"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d',
                    filter: `brightness(${brightness})`,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default TiltCard;
