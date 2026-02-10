import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, X, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Footer: React.FC = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full h-[500px] md:h-[450px] bg-black text-white z-0 flex items-center justify-center overflow-hidden">

            {/* Watermark */}
            <div className="absolute -bottom-10 right-0 select-none pointer-events-none opacity-[0.03] z-0">
                <span className="text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter text-white whitespace-nowrap">
                    L-PRO
                </span>
            </div>

            <div className="w-full max-w-[1440px] px-6 h-full flex flex-col relative z-10 pt-16 md:pt-24 pb-8">

                {/* Top: CTA */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-12 mb-12 gap-8">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        Have a complex project?
                    </h2>
                    <MagneticButton strength={50}>
                        <Link
                            to="/contact"
                            className="group flex items-center gap-3 bg-accent text-stone-900 px-8 py-4 rounded-full text-lg font-bold transition-transform hover:scale-105"
                        >
                            Start Discussion <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform duration-300" />
                        </Link>
                    </MagneticButton>
                </div>

                {/* Middle: Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 flex-grow">
                    {/* Column 1 */}
                    <div>
                        <h4 className="text-stone-500 font-mono text-xs uppercase tracking-widest mb-6">Headquarters</h4>
                        <p className="text-lg leading-relaxed text-stone-300">
                            123 Tubman Boulevard<br />
                            Sinkor, Monrovia<br />
                            Liberia
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="text-stone-500 font-mono text-xs uppercase tracking-widest mb-6">Contact</h4>
                        <p className="text-lg leading-relaxed text-stone-300">
                            <a href="tel:+231770000000" className="hover:text-accent transition-colors">+231 77 000 0000</a><br />
                            <a href="mailto:projects@l-pro.com" className="hover:text-accent transition-colors">projects@l-pro.com</a>
                        </p>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="text-stone-500 font-mono text-xs uppercase tracking-widest mb-6">Socials</h4>
                        <div className="flex flex-col gap-2 text-lg text-stone-300">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2">
                                <span>Twitter / X</span>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a>
                        </div>
                    </div>

                    {/* Column 4 */}
                    <div className="hidden md:block">
                        <h4 className="text-stone-500 font-mono text-xs uppercase tracking-widest mb-6">Legal</h4>
                        <div className="flex flex-col gap-2 text-sm text-stone-400">
                            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom: Copyright */}
                <div className="pt-8 border-t border-white/5 flex justify-between items-center text-stone-500 text-sm">
                    <p>© 2026 L-Pro Solutions. Engineering the Future.</p>
                    <p className="hidden md:block">Monrovia • Freetown • Accra</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;