import React, { useState, useEffect } from 'react';
import { X, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

const NewsletterPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Check if user has already subscribed or dismissed
        const isSubscribed = localStorage.getItem('newsletterSubscribed');
        const isDismissed = localStorage.getItem('newsletterDismissed');

        if (!isSubscribed && !isDismissed) {
            // Show popup after 5 seconds
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            localStorage.setItem('newsletterDismissed', 'true');
        }, 500); // Wait for exit animation
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            localStorage.setItem('newsletterSubscribed', 'true');

            // Auto close after success message
            setTimeout(() => {
                handleClose();
            }, 2500);
        }, 800);
    };

    if (!isVisible && !isClosing) return null;

    return (
        <div className={`fixed inset-0 z-[70] flex items-center justify-center px-4 transition-all duration-500 ${isVisible && !isClosing ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity duration-500"
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div className={`relative w-full max-w-lg bg-stone-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl transition-all duration-500 transform ${isVisible && !isClosing ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
                }`}>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-200 transition-colors text-stone-500 hover:text-stone-900"
                >
                    <X size={20} />
                </button>

                {!isSubmitted ? (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <span className="inline-block py-1 px-3 rounded-full bg-stone-200 text-stone-600 text-xs font-bold uppercase tracking-wider">
                                Exclusive Access
                            </span>
                            <h2 className="text-3xl md:text-4xl font-display font-black text-stone-900 leading-tight">
                                Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-stone-500">Inner Circle</span>.
                            </h2>
                            <p className="text-stone-600 text-lg">
                                Get executive briefings, industry insights, and early access to our premium resources delivered to your inbox.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-800 transition-colors" size={20} />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white border-2 border-stone-200 rounded-xl py-4 pl-12 pr-4 text-stone-800 outline-none focus:border-stone-800 transition-colors placeholder:text-stone-400 text-lg"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-stone-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-stone-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-stone-900/10 flex items-center justify-center gap-2"
                            >
                                <span>Subscribe Now</span>
                                <ArrowRight size={20} />
                            </button>

                            <p className="text-xs text-center text-stone-400 mt-4">
                                No spam. Unsubscribe at any time.
                            </p>
                        </form>
                    </div>
                ) : (
                    <div className="text-center py-8 space-y-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4 animate-bounce">
                            <CheckCircle2 size={40} />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-stone-900">
                            Welcome Aboard!
                        </h3>
                        <p className="text-stone-600">
                            You've successfully joined our executive newsletter. Keep an eye on your inbox for our next briefing.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsletterPopup;
