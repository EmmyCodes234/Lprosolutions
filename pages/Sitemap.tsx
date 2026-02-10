import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Sitemap: React.FC = () => {
    const sections = [
        {
            title: 'Main Navigation',
            links: [
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Projects', path: '/projects' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' }
            ]
        },
        {
            title: 'Our Expertise',
            links: [
                { name: 'PMO Services', path: '/services' },
                { name: 'Engineering', path: '/services' },
                { name: 'Capacity Building', path: '/services' }
            ]
        },
        {
            title: 'Resources',
            links: [
                { name: 'Blog / Stories', path: '/blog' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' }
            ]
        }
    ];

    return (
        <div className="w-full bg-[#f5f5f4] min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tighter mb-12">Sitemap</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {sections.map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-xl font-bold text-stone-900 mb-6 pb-2 border-b border-stone-200">
                                {section.title}
                            </h2>
                            <ul className="space-y-4">
                                {section.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link to={link.path} className="group flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors">
                                            {link.name} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
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
