import React from 'react';

const Terms: React.FC = () => {
    return (
        <div className="w-full bg-[#fcfcfc] min-h-screen pt-32 pb-48 px-6">
            <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="inline-block bg-stone-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-stone-950 mb-8 animate-revealUp">
                    Service Protocols
                </div>
                <h1 className="text-5xl md:text-8xl font-display font-black text-stone-950 tracking-tighter mb-16 leading-[0.8] animate-revealUp animation-delay-100">
                    Terms of <br />
                    <span className="text-stone-300">Engagement.</span>
                </h1>

                <div className="prose prose-stone prose-lg max-w-none animate-revealUp animation-delay-200">
                    <p className="text-xl text-stone-500 mb-12 leading-relaxed font-light italic border-l-4 border-accent pl-8">
                        By accessing the L-Pro Solutions platform, you agree to abide by the following technical and legal protocols governing our professional services.
                    </p>

                    <section className="space-y-6 mb-16">
                        <h2 className="text-2xl font-display font-bold text-stone-900 uppercase tracking-tight">1. Acceptance of Protocols</h2>
                        <p className="text-stone-500 leading-relaxed">
                            The services and content provided by L-Pro Solutions are subject to these Terms of Engagement. We reserve the right to refine these standards as regional engineering codes and legal requirements evolve.
                        </p>
                    </section>

                    <section className="space-y-6 mb-16">
                        <h2 className="text-2xl font-display font-bold text-stone-900 uppercase tracking-tight">2. Intellectual Property</h2>
                        <p className="text-stone-500 leading-relaxed">
                            All architectural plans, technical frameworks, and methodologies on this platform are the intellectual property of L-Pro Solutions. Unauthorized reproduction or use in project execution is prohibited.
                        </p>
                    </section>

                    <section className="space-y-6 mb-16">
                        <h2 className="text-2xl font-display font-bold text-stone-900 uppercase tracking-tight">3. Governing Jurisdiction</h2>
                        <p className="text-stone-500 leading-relaxed">
                            These terms are governed by and construed in accordance with the laws of the Republic of Liberia, aligning with ECOWAS regional infrastructure directives.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
