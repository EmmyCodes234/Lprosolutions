import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';

const NotFound: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState([
        { x: -150, y: 0, char: '4' },
        { x: 0, y: 0, char: '0' },
        { x: 150, y: 0, char: '4' }
    ]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - rect.width / 2;
            const mouseY = e.clientY - rect.top - rect.height / 2;

            setPositions(prev => prev.map(pos => {
                const dx = pos.x - mouseX;
                const dy = pos.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const force = Math.max(0, 300 - distance) / 300;

                if (distance < 300) {
                    return {
                        ...pos,
                        x: pos.x + dx * force * 0.1,
                        y: pos.y + dy * force * 0.1
                    };
                }
                return pos;
            }));
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-screen w-full bg-stone-950 flex flex-col items-center justify-center overflow-hidden relative"
        >
            <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />

            <div className="relative h-64 w-full flex items-center justify-center">
                {positions.map((pos, i) => (
                    <div
                        key={i}
                        className="absolute text-[12rem] md:text-[20rem] font-display font-black text-white/10 select-none pointer-events-none transition-transform duration-75 ease-out"
                        style={{
                            transform: `translate(${pos.x}px, ${pos.y}px)`,
                            textShadow: '0 0 50px rgba(220, 38, 36, 0.2)'
                        }}
                    >
                        {pos.char}
                    </div>
                ))}
            </div>

            <div className="relative z-10 text-center mt-12">
                <h2 className="text-white text-2xl font-display font-bold mb-8 uppercase tracking-[0.2em]">
                    Signal Lost in Deep Space
                </h2>
                <MagneticButton strength={40}>
                    <Link
                        to="/"
                        className="bg-accent text-white px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-transform hover:scale-105"
                    >
                        Return to Base
                    </Link>
                </MagneticButton>
            </div>
        </div>
    );
};

export default NotFound;
