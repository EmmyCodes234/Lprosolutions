import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl transition-all duration-500 hover:bg-accent hover:text-stone-900 hover:scale-110 group ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
                }`}
            aria-label="Scroll to top"
        >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </button>
    );
};

export default ScrollToTopButton;
