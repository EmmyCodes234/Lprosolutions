import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, X, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Footer: React.FC = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full h-[600px] md:h-[500px] bg-stone-950 text-white z-0 overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            {/* Watermark Curtain */}
            <div className="absolute -bottom-10 right-0 select-none pointer-events-none opacity-[0.05] z-0">
                <span className="text-[15rem] md:text-[25rem] font-display font-black leading-none tracking-[-0.08em] text-white whitespace-nowrap italic">
                    L-PRO
                </span>
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-6 relative z-10 pt-24 pb-12">

                {/* Top: Strategic CTA */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-20 mb-20 gap-12">
                    <div className="max-w-2xl">
                        <div className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6">Engagement Protocol</div>
                        <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-[0.9]">
                            Have a complex <br />
                            <span className="text-stone-600 italic">Engineering Gap?</span>
                        </h2>
                    </div>
                    <MagneticButton strength={40}>
                        <Link
                            to="/contact"
                            className="group flex items-center gap-6 bg-white text-stone-950 px-10 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-accent shadow-2xl"
                        >
                            Start Discussion <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform duration-500" />
                        </Link>
                    </MagneticButton>
                </div>

                {/* Middle: Architectural Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-32">

                    {/* Brand Meta */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-stone-950 font-black text-xs">LP</div>
                            <span className="text-xl font-display font-black tracking-tighter">L-PRO SOLUTIONS</span>
                        </div>
                        <p className="text-stone-500 max-w-xs leading-relaxed font-light">
                            West Africa's definitive engineering consultancy and project management office. Globally certified, locally empowered.
                        </p>
                    </div>

                    {/* Presence */}
                    <div className="space-y-8">
                        <h4 className="text-stone-400 font-black text-[10px] uppercase tracking-[0.3em]">Presence</h4>
                        <div className="space-y-4">
                            <div className="group hidden md:block">
                                <p className="text-xs font-black text-stone-300 mb-1 group-hover:text-accent transition-colors">Monrovia HQ</p>
                                <p className="text-stone-500 text-sm">Tubman Boulevard, Sinkor</p>
                            </div>
                            <div className="group">
                                <p className="text-xs font-black text-stone-300 mb-1 group-hover:text-accent transition-colors">Digital Channels</p>
                                <a href="mailto:partnerships@l-pro.com" className="text-stone-500 text-sm block hover:text-white transition-colors">partnerships@l-pro.com</a>
                                <a href="tel:+231770000000" className="text-stone-500 text-sm block">+231 77 000 0000</a>
                            </div>
                        </div>
                    </div>

                    {/* Socials & Legal */}
                    <div className="space-y-8">
                        <h4 className="text-stone-400 font-black text-[10px] uppercase tracking-[0.3em]">Strategic Links</h4>
                        <div className="flex flex-col gap-3 text-stone-500 text-sm font-bold">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                            <Link to="/about" className="hover:text-white transition-colors">Company Registry</Link>
                            <Link to="/projects" className="hover:text-white transition-colors">Project Portfolio</Link>
                        </div>
                    </div>

                    {/* Legal Block */}
                    <div className="space-y-8">
                        <h4 className="text-stone-400 font-black text-[10px] uppercase tracking-[0.3em]">Protocols</h4>
                        <div className="flex flex-col gap-3 text-stone-500 text-sm">
                            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                            <Link to="/sitemap" className="hover:text-white transition-colors">Site Index</Link>
                        </div>
                    </div>

                </div>

                {/* Bottom: Industry Compliance */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4">
                        <div className="h-px w-12 bg-white/10" />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-600">
                            © 2026 L-Pro Solutions <span className="mx-2">•</span> Engineering Excellence
                        </p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">ISO 9001:2015</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-stone-700 rounded-full" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">PMI CHARTERED</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;