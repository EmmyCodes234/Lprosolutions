import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

const Sitemap: React.FC = () => {
    const sections = [
        {
            title: 'Primary Portals',
            links: [
                { name: 'Home Identity', path: '/' },
                { name: 'Service Portfolio', path: '/services' },
                { name: 'Project Focal Points', path: '/projects' },
                { name: 'Company Registry', path: '/about' },
                { name: 'Consultation Portal', path: '/contact' }
            ]
        },
        {
            title: 'Technical Verticals',
            links: [
                { name: 'PMO Framework', path: '/services' },
                { name: 'Engineering Rigor', path: '/services' },
                { name: 'Institutional Growth', path: '/services' }
            ]
        },
        {
            title: 'Strategic Intel',
            links: [
                { name: 'Governance Protocols', path: '/faq' },
                { name: 'Privacy Standards', path: '/privacy' },
                { name: 'Engagement Terms', path: '/terms' }
            ]
        }
    ];

    return (
        <div className="w-full bg-[#fcfcfc] min-h-screen pt-32 pb-48 px-6">
            <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />

            <div className="max-w-[1440px] mx-auto relative z-10">

                <div className="max-w-4xl mb-24 md:mb-32">
                    <div className="inline-block bg-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8 animate-revealUp">
                        Platform Architecture
                    </div>
                    <h1 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter text-stone-950 leading-[0.8] mb-12 animate-revealUp animation-delay-100">
                        Site <br />
                        <span className="text-stone-300">Index.</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 xl:gap-24 animate-revealUp animation-delay-200">
                    {sections.map((section, idx) => (
                        <div key={idx} className="group">
                            <div className="flex items-center gap-3 mb-8 border-b border-stone-100 pb-4">
                                <Compass size={18} className="text-stone-400" />
                                <h2 className="text-xl font-display font-bold text-stone-900 tracking-tight">
                                    {section.title}
                                </h2>
                            </div>
                            <ul className="space-y-6">
                                {section.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link to={link.path} className="group/link flex items-center justify-between text-stone-500 hover:text-stone-950 transition-colors py-1">
                                            <span className="text-lg font-light tracking-tight">{link.name}</span>
                                            <ArrowRight size={16} className="text-accent opacity-0 group-hover/link:opacity-100 -translate-x-4 group-hover/link:translate-x-0 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sitemap;
