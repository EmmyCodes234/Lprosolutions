import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Small delay for smooth entrance
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 transition-all duration-700 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
        >
            <div className="max-w-7xl mx-auto">
                <div className="bg-stone-900/95 backdrop-blur-md border border-stone-800 p-6 md:p-8 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 relative overflow-hidden group">

                    {/* Subtle noise texture */}
                    <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

                    {/* Content */}
                    <div className="flex-1 relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-stone-800 rounded-full text-accent-light">
                                <Cookie size={20} />
                            </div>
                            <h3 className="text-xl font-display font-bold text-stone-100">
                                Cookie Preferences
                            </h3>
                        </div>
                        <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                            We use cookies to ensure you get the most premium experience on our website.
                            By continuing, you agree to our use of cookies in accordance with our
                            <a href="/privacy" className="text-stone-200 hover:text-accent-light ml-1 underline decoration-stone-600 underline-offset-4 transition-colors">
                                Privacy Policy
                            </a>.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row gap-3 w-full md:w-auto relative z-10">
                        <button
                            onClick={handleDecline}
                            className="flex-1 md:flex-none px-6 py-3 rounded-full border border-stone-700 text-stone-300 font-medium hover:bg-stone-800 hover:text-white transition-all duration-300 text-sm md:text-base whitespace-nowrap"
                        >
                            Decline
                        </button>
                        <button
                            onClick={handleAccept}
                            className="flex-1 md:flex-none px-8 py-3 rounded-full bg-stone-100 text-stone-900 font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-stone-900/20 text-sm md:text-base whitespace-nowrap"
                        >
                            Accept All
                        </button>
                    </div>

                    {/* Close Button (X) - Optional, but good for UX if they want to ignore */}
                    <button
                        onClick={handleDecline}
                        className="absolute top-4 right-4 text-stone-500 hover:text-stone-300 transition-colors md:hidden"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
