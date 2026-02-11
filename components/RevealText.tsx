import React, { useEffect, useRef, useState } from 'react';

interface RevealTextProps {
    text: string;
    className?: string;
    activeColor?: string;
}

const RevealText: React.FC<RevealTextProps> = ({
    text,
    className = '',
    activeColor = 'text-stone-900'
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const words = text.split(' ');
    const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const spans = containerRef.current.querySelectorAll('.reveal-word');
            const viewportHeight = window.innerHeight;
            const revealTop = viewportHeight * 0.3;
            const revealBottom = viewportHeight * 0.7;

            const nextActiveIndices = new Set<number>();

            spans.forEach((span, index) => {
                const rect = span.getBoundingClientRect();
                const center = rect.top + rect.height / 2;

                // If the word's center is within the focus zone, or if it has already been passed (progressive reveal)
                if (center < revealBottom) {
                    nextActiveIndices.add(index);
                }
            });

            setActiveIndices(nextActiveIndices);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className={`reveal-text leading-relaxed transition-all duration-700 ${className}`}>
            {words.map((word, i) => (
                <span
                    key={i}
                    className={`reveal-word inline-block mr-[0.25em] transition-all duration-500 will-change-[opacity,transform] ${activeIndices.has(i)
                        ? `${activeColor} opacity-100 scale-100 translate-y-0`
                        : 'text-stone-400 opacity-30 scale-95 translate-y-1'
                        }`}
                >
                    {word}
                </span>
            ))}
        </div>
    );
};

export default RevealText;
