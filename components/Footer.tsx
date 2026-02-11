import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, X, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import MagneticButton from './MagneticButton';
import Logo from './Logo';

const Footer: React.FC = () => {
    return (
        <footer className="relative bg-stone-950 text-white overflow-hidden pt-48 pb-12">
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            {/* Background Watermark */}
            <div className="absolute top-0 right-0 select-none pointer-events-none opacity-[0.05] z-0 translate-x-1/4 -translate-y-1/4">
                <span className="text-[20rem] md:text-[35rem] font-display font-black leading-none tracking-[-0.08em] text-white whitespace-nowrap italic">
                    L-PRO
                </span>
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">

                {/* Top Section: Signature & Strategic CTA */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-16">
                    <div className="flex flex-col max-w-xl">
                        <div className="flex flex-col">
                            <Logo color="white" height="h-32 md:h-48" className="origin-left" />
                            <div className="text-white text-[10px] md:text-xs font-black uppercase tracking-[0.4em] pl-1 opacity-80 -mt-10 md:-mt-14">
                                Consult. Plan. Deliver.
                            </div>
                        </div>
                        <p className="text-xl md:text-2xl text-stone-400 font-light leading-relaxed mt-12">
                            West Africa's definitive engineering consultancy and project management office.
                            <span className="text-white block mt-4 font-normal italic">Globally certified, locally empowered.</span>
                        </p>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-8">
                        <div className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Engagement Protocol</div>
                        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-tight lg:text-right">
                            Ready to build <br />
                            <span className="text-stone-600 italic text-3xl md:text-5xl">the future?</span>
                        </h2>
                        <MagneticButton strength={40}>
                            <Link
                                to="/contact"
                                className="group flex items-center gap-6 bg-white text-stone-950 px-10 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-accent hover:text-white shadow-2xl"
                            >
                                Start A Project <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform duration-500" />
                            </Link>
                        </MagneticButton>
                    </div>
                </div>

                {/* Middle Section: Architectural Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-24 border-t border-white/5 pt-20">

                    {/* Headquarters */}
                    <div className="space-y-8">
                        <h4 className="text-stone-400 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                            <MapPin size={10} className="text-stone-400" /> Headquarters
                        </h4>
                        <div className="text-stone-300 space-y-2">
                            <p className="font-bold">Paynesville HQ</p>
                            <p className="text-sm text-stone-500 leading-relaxed font-light">
                                1st Floor, Samir Building<br />
                                Adjacent ELWA Hospital, RIA Highway<br />
                                Paynesville City, Liberia
                            </p>
                        </div>
                    </div>

                    {/* Direct Contact */}
                    <div className="space-y-8">
                        <h4 className="text-stone-400 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                            <Mail size={10} className="text-stone-400" /> Communication
                        </h4>
                        <div className="space-y-4">
                            <a href="mailto:info@lprosolutions.org" className="group block">
                                <span className="text-[10px] text-stone-600 uppercase block mb-1">General Inquiries</span>
                                <span className="text-stone-300 text-sm group-hover:text-accent transition-colors">info@lprosolutions.org</span>
                            </a>
                            <a href="tel:+231777200001" className="group block">
                                <span className="text-[10px] text-stone-600 uppercase block mb-1">Direct Line</span>
                                <span className="text-stone-300 text-sm group-hover:text-accent transition-colors">+231 77 720 0001</span>
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-8">
                        <h4 className="text-stone-400 font-black text-[10px] uppercase tracking-[0.3em]">Directory</h4>
                        <div className="flex flex-col gap-4 text-stone-500 text-sm font-medium">
                            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                            <Link to="/projects" className="hover:text-white transition-colors">Project Portfolio</Link>
                        </div>
                    </div>

                    {/* Legal & Compliance */}
                    <div className="space-y-8">
                        <h4 className="text-stone-400 font-black text-[10px] uppercase tracking-[0.3em]">Governance</h4>
                        <div className="flex flex-col gap-4 text-stone-500 text-sm font-medium">
                            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Protocol</Link>
                            <Link to="/terms" className="hover:text-white transition-colors">Legal Terms</Link>
                            <Link to="/sitemap" className="hover:text-white transition-colors">Site Map</Link>
                            <Link to="/faq" className="hover:text-white transition-colors">Help Center</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Industry Compliance & Social */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-center md:text-left">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-600">
                            © 2026 L-PRO SOLUTIONS LTD <span className="mx-2 hidden md:inline">•</span> <span className="block md:inline mt-2 md:mt-0">ENGINEERING EXCELLENCE</span>
                        </p>
                        <div className="flex items-center gap-6 text-stone-400">
                            <a href="#" className="hover:text-accent transition-colors"><Linkedin size={16} /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Instagram size={16} /></a>
                            <a href="#" className="hover:text-accent transition-colors"><X size={16} /></a>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">ISO 9001:2015</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-stone-700 rounded-full" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">PMI CHARTERED</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;