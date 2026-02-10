import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ: React.FC = () => {
    const [openIdx, setOpenIdx] = React.useState<number | null>(0);

    const faqs = [
        {
            q: "What industries does L-Pro Solutions specialize in?",
            a: "We have deep expertise in civil engineering, telecommunications, energy, and public sector governance. Our team is equipped to handle complex infrastructure projects across diverse sectors."
        },
        {
            q: "How do you ensure project quality and compliance?",
            a: "Our Technical Audit and QA/QC processes are rigorous. We use standardized ECOWAS engineering codes and proprietary real-time reporting dashboards to maintain transparency and excellence."
        },
        {
            q: "Does L-Pro provide regional services outside of Liberia?",
            a: "Yes, while our headquarters are in Monrovia, we are structured to support regional projects across West Africa, bringing global standards to local challenges."
        },
        {
            q: "What is your approach to capacity building?",
            a: "We believe infrastructure is only as good as the team maintaining it. Every major L-Pro project includes a knowledge transfer component to empower local workforces."
        },
        {
            q: "How can we request a feasibility study for a new project?",
            a: "You can reach out via our contact form or email our partnerships team directly. We typically begin with a high-level consultation to understand your project scope before drafting a detailed proposal."
        }
    ];

    return (
        <div className="w-full bg-[#f5f5f4] min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tighter mb-6 text-center">Help Center</h1>
                <p className="text-lg text-stone-500 text-center mb-16">Find answers to common questions about our services and methodologies.</p>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-stone-100">
                            <button
                                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                                className="w-full p-8 flex justify-between items-center text-left hover:bg-stone-50 transition-colors"
                            >
                                <span className="text-lg font-bold text-stone-900 pr-8">{faq.q}</span>
                                <div className={`w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 flex-shrink-0 transition-transform ${openIdx === i ? 'rotate-45' : ''}`}>
                                    +
                                </div>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out ${openIdx === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                <div className="px-8 pb-8">
                                    <p className="text-stone-600 leading-relaxed italic">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-stone-900 rounded-[2.5rem] p-12 text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
                    <p className="text-stone-400 mb-8">Our team of experts is ready to help you with your specific project needs.</p>
                    <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-stone-900 px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                        Contact Support <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
