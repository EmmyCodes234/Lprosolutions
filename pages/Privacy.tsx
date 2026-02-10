import React from 'react';

const Privacy: React.FC = () => {
    return (
        <div className="w-full bg-[#fcfcfc] min-h-screen pt-32 pb-48 px-6">
            <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="inline-block bg-stone-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-stone-950 mb-8 animate-revealUp">
                    Legal Framework
                </div>
                <h1 className="text-5xl md:text-8xl font-display font-black text-stone-950 tracking-tighter mb-16 leading-[0.8] animate-revealUp animation-delay-100">
                    Privacy <br />
                    <span className="text-stone-300">Protocols.</span>
                </h1>

                <div className="prose prose-stone prose-lg max-w-none animate-revealUp animation-delay-200">
                    <p className="text-xl text-stone-500 mb-12 leading-relaxed font-light italic border-l-4 border-accent pl-8">
                        Your privacy is of paramount importance to L-Pro Solutions. This policy outlines how we handle your data with transparency, technical rigor, and respect.
                    </p>

                    <section className="space-y-6 mb-16">
                        <h2 className="text-2xl font-display font-bold text-stone-900 uppercase tracking-tight">1. Information Collection</h2>
                        <p className="text-stone-500 leading-relaxed">
                            We collect information you provide directly to us through our contact forms, newsletter signups, and direct communication. This may include your name, email address, and professional details relevant to your inquiry.
                        </p>
                    </section>

                    <section className="space-y-6 mb-16">
                        <h2 className="text-2xl font-display font-bold text-stone-900 uppercase tracking-tight">2. Use of Information</h2>
                        <p className="text-stone-500 leading-relaxed">
                            We use the information collected to respond to your requests, provide project updates, send newsletters if subscribed, and improve our service offerings. We do not sell or lease your personal information to third parties.
                        </p>
                    </section>

                    <section className="space-y-6 mb-16">
                        <h2 className="text-2xl font-display font-bold text-stone-900 uppercase tracking-tight">3. Data Security</h2>
                        <p className="text-stone-500 leading-relaxed">
                            L-Pro Solutions implements industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. Our digital infrastructure is audited for compliance with regional security standards.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
