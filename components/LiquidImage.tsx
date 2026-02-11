import React, { useEffect, useRef } from 'react';

interface LiquidImageProps {
    image1: string;
    image2: string;
    displacementImage?: string;
    intensity?: number;
    className?: string;
}

declare global {
    interface Window {
        hoverEffect: any;
    }
}

const LiquidImage: React.FC<LiquidImageProps> = ({
    image1,
    image2,
    displacementImage = 'https://raw.githubusercontent.com/robin-dela/hover-effect/master/images/fluid.jpg',
    intensity = 0.3,
    className = ''
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !window.hoverEffect) return;

        // Clear any previous animations
        containerRef.current.innerHTML = '';

        try {
            new window.hoverEffect({
                parent: containerRef.current,
                intensity,
                image1,
                image2,
                displacementImage,
            });
        } catch (error) {
            console.error('Error initializing LiquidImage:', error);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [image1, image2, displacementImage, intensity]);

    return (
        <div
            ref={containerRef}
            className={`liquid-img-container ${className}`}
            style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            }}
        />
    );
};

export default LiquidImage;
