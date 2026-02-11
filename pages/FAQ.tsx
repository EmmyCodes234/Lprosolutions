import React from 'react';
import { ArrowRight, FileText, ShieldCheck, HelpCircle, ChevronDown, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ: React.FC = () => {
    const [openIdx, setOpenIdx] = React.useState<number | null>(0);

    const faqs = [
        {
            q: "What industries does L-Pro Solutions specialize in?",
            a: "We maintain deep expertise in civil engineering, telecommunications, energy, and public sector governance. Our framework is optimized for complex infrastructure projects across diverse sectors within the ECOWAS region."
        },
        {
            q: "How do you ensure project quality and compliance?",
            a: "Our Technical Audit and QA/QC processes are rigorous and non-negotiable. We adhere to standardized international engineering codes and utilize proprietary real-time reporting dashboards for absolute transparency."
        },
        {
            q: "Does L-Pro provide regional services outside of Liberia?",
            a: "Yes. While headquartered in Liberia, our operational structure is designed for regional scale. We currently support infrastructure development and technical advisory across West African markets."
        },
        {
            q: "What is your approach to capacity building?",
            a: "Infrastructure is only as resilient as the team maintaining it. Every L-Pro engagement includes a comprehensive knowledge transfer component, ensuring local empowerment and long-term sustainability."
        },
        {
            q: "How can we request a feasibility study for a new project?",
            a: "Direct inquiries should be initiated via our primary consultation portal. Our technical team conducts an initial high-level assessment before proceeding to a detailed proposal and work-breakdown structure."
        }
    ];

    return (
        <div className="w-full bg-[#fcfcfc] min-h-screen pt-32 pb-48 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />

            <div className="max-w-[1440px] mx-auto relative z-10">

                {/* Protocol Header */}
                <div className="max-w-4xl mb-24 md:mb-32">
                    <div className="inline-block bg-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8 animate-revealUp">
                        Support Infrastructure
                    </div>
                    <h1 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter text-stone-950 leading-[0.8] mb-12 animate-revealUp animation-delay-100">
                        Governance <br />
                        <span className="text-stone-300">& Protocols.</span>
                    </h1>
                    <p className="text-xl md:text-3xl text-stone-500 max-w-2xl font-light leading-relaxed animate-revealUp animation-delay-200">
                        Definitive answers regarding our operational frameworks, regional compliance, and technical methodologies.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">

                    {/* Left: Interactive Accordion */}
                    <div className="lg:col-span-8 space-y-4 animate-revealUp animation-delay-300">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`group border-l-2 transition-all duration-500 ${openIdx === i ? 'bg-white border-stone-900 shadow-xl rounded-r-3xl' : 'border-stone-100 hover:border-stone-300'}`}
                            >
                                <button
                                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                                    className="w-full px-8 py-10 flex justify-between items-center text-left"
                                >
                                    <span className={`text-xl md:text-2xl font-display font-bold transition-colors ${openIdx === i ? 'text-stone-950' : 'text-stone-400 group-hover:text-stone-600'}`}>
                                        {faq.q}
                                    </span>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openIdx === i ? 'bg-stone-950 text-white rotate-180' : 'bg-stone-50 text-stone-300'}`}>
                                        <ChevronDown size={20} />
                                    </div>
                                </button>
                                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${openIdx === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-8 pb-12 pr-12">
                                        <p className="text-stone-500 text-lg leading-relaxed font-light italic border-l-4 border-accent pl-8 py-4 bg-stone-50 rounded-r-2xl">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Technical Support Card */}
                    <div className="lg:col-span-4 space-y-12 animate-revealUp animation-delay-400">

                        <div className="bg-stone-950 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <ShieldCheck size={120} />
                            </div>
                            <h2 className="text-2xl font-display font-bold mb-6 relative z-10">Still have <br /> specialized inquiries?</h2>
                            <p className="text-stone-400 text-sm leading-relaxed mb-10 relative z-10">
                                Our technical partners are available for direct project consultations and feasibility briefings.
                            </p>
                            <Link to="/contact" className="inline-flex items-center gap-4 bg-white text-stone-950 px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent transition-colors relative z-10 group">
                                Initiate Consultation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Audit Log Mockup */}
                        <div className="bg-stone-50 rounded-[2.5rem] p-10 border border-stone-100 flex flex-col gap-6">
                            <Activity className="text-stone-400" size={24} />
                            <div className="space-y-4">
                                <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-accent" />
                                </div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-stone-400">
                                    <span>Real-time Compliance Score</span>
                                    <span className="text-stone-900">98.4%</span>
                                </div>
                            </div>
                            <p className="text-[10px] text-stone-400 italic">
                                *Internal L-Pro monitoring for ECOWAS infrastructure standards.
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default FAQ;
