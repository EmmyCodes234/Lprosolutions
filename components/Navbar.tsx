import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import MagneticButton from './MagneticButton';

const menuItems = [
  {
    id: 'meet',
    label: 'Founder',
    path: '/founder',
    image: '/founder/hero.jpg',
    title: 'James Monbo Lynch',
    subtitle: 'Founder & Lead Consultant'
  },
  {
    id: 'services',
    label: 'Services',
    path: '/services',
    image: '/web images/hero2.jpg',
    title: 'Our Expertise',
    subtitle: 'Comprehensive Project Solutions'
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    image: '/web images/hero3.jpg',
    title: 'Featured Projects',
    subtitle: 'Building Liberia\'s Future'
  },
  {
    id: 'company',
    label: 'About',
    path: '/about',
    image: '/web images/1001836414.jpg',
    title: 'Our Culture',
    subtitle: 'Professional, Ethical, Committed'
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    image: '/web images/hero1.jpg',
    title: 'Start a Project',
    subtitle: 'Let\'s build something together'
  }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string>('meet');
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled && !isOpen;

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Reset menu interaction on open
  useEffect(() => {
    if (isOpen) setActiveMenuId('meet');
  }, [isOpen]);

  const activeContent = menuItems.find(item => item.id === activeMenuId) || menuItems[0];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isTransparent ? 'bg-transparent py-6' : 'bg-[#f5f5f4]/80 backdrop-blur-md py-4 shadow-sm'
          }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex items-center justify-between relative">

          {/* Left: Menu Trigger & Nav Links */}
          <div className="flex items-center gap-6 lg:gap-12">
            <MagneticButton>
              <button
                onClick={() => setIsOpen(true)}
                className={`flex items-center gap-3 group hover:opacity-70 transition-opacity ${isTransparent ? 'text-white' : 'text-stone-900'}`}
              >
                <Menu size={24} className="stroke-[2]" />
                <span className="hidden sm:inline font-bold text-xs uppercase tracking-[0.2em]">Menu</span>
              </button>
            </MagneticButton>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-2">
              {menuItems.slice(0, 4).map((item) => (
                <MagneticButton key={item.id} strength={10}>
                  <Link
                    to={item.path}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${isTransparent ? 'text-white hover:text-accent' : 'text-stone-900 hover:text-accent'
                      }`}
                  >
                    {item.label}
                  </Link>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" onClick={() => setIsOpen(false)} className="block">
              <Logo color={(!isTransparent || isOpen) ? 'dark' : 'white'} height="h-12 md:h-16" />
            </Link>
          </div>

          {/* Right: CTAs */}
          <div className="flex items-center space-x-4">
            <MagneticButton>
              <Link
                to="/contact"
                className="hidden md:flex bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 shadow-sm"
              >
                Start Project
              </Link>
            </MagneticButton>

            <Link
              to="/contact"
              className={`flex items-center gap-2 px-1 py-1 pr-4 rounded-full transition-colors ${isTransparent ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10' : 'bg-stone-200 hover:bg-stone-300 text-stone-900'}`}
            >
              <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-white">
                <ArrowRight size={14} />
              </div>
              <span className="hidden sm:inline text-sm font-semibold">Get in touch</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay - Glassmorphism */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        {/* Glass Background */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-xl"></div>

        {/* Border Overlay */}
        <div className="absolute inset-0 border-r border-white/30 pointer-events-none"></div>

        <div className="relative flex flex-col h-full max-w-[1920px] mx-auto z-10">

          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 md:p-8 shrink-0">
            <MagneticButton>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-stone-900 hover:opacity-70 transition-opacity group"
              >
                <X size={32} className="stroke-[1.5] transition-transform group-hover:rotate-90 duration-300" />
                <span className="text-lg font-bold">Close</span>
              </button>
            </MagneticButton>

            <div className="absolute left-1/2 -translate-x-1/2 top-8 md:top-8">
              <Logo color="dark" height="h-16 md:h-24" />
            </div>

            <div className="hidden md:flex gap-4">
              <MagneticButton>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full font-bold transition-colors shadow-sm block"
                >
                  Initiate a Partnership
                </Link>
              </MagneticButton>
              <Link
                to="/services"
                onClick={() => setIsOpen(false)}
                className="bg-white/50 backdrop-blur-md hover:bg-white/80 text-stone-900 border border-stone-200 px-8 py-3 rounded-full font-bold transition-colors flex items-center gap-2"
              >
                <span>All Services</span>
                <div className="w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center">
                  <ArrowRight size={12} />
                </div>
              </Link>
            </div>

            {/* Mobile Header Right */}
            <div className="md:hidden">
              <Link to="/contact" onClick={() => setIsOpen(false)} className="bg-accent text-white px-4 py-2 rounded-full text-xs font-bold">
                Contact
              </Link>
            </div>
          </div>

          {/* Menu Content Grid */}
          <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-8">
            <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-4">

              {/* Left Column: Navigation Links */}
              <div className="lg:col-span-3 flex flex-col justify-start lg:justify-center pt-8 lg:pt-0">
                <ul className="space-y-4">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        onMouseEnter={() => setActiveMenuId(item.id)}
                        className={`block text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold transition-all duration-500 px-4 md:px-8 py-2 md:py-4 rounded-full tracking-tighter ${activeMenuId === item.id
                          ? 'bg-stone-900 text-white shadow-2xl pl-10'
                          : 'text-stone-900 hover:text-stone-400'
                          }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  {/* Additional small links */}
                  <li className="pt-8 pl-8 space-y-4 border-l border-stone-200 ml-4">
                    <Link to="/faq" onClick={() => setIsOpen(false)} className="block text-stone-400 hover:text-stone-900 font-bold text-xs uppercase tracking-[0.2em]">Help Center / FAQ</Link>
                  </li>
                </ul>
              </div>

              {/* Center Column: Dynamic Large Image */}
              <div className="hidden lg:block lg:col-span-5 relative group h-full max-h-[70vh] self-center">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative shadow-2xl">
                  <img
                    src={activeContent.image}
                    alt={activeContent.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  <div className="absolute bottom-10 left-10 right-10 text-white">
                    <h2 className="text-4xl font-bold mb-3">{activeContent.title}</h2>
                    <p className="text-lg text-white/90">{activeContent.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Static Cards */}
              <div className="hidden lg:flex lg:col-span-4 flex-col gap-6 h-full max-h-[70vh] self-center">

                {/* Card 1 */}
                <Link to="/contact" onClick={() => setIsOpen(false)} className="flex-1 relative rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all">
                  <img
                    src="/web images/1001836396.jpg"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt="HQ"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute top-8 left-8 right-8">
                    <h3 className="text-3xl font-bold text-white leading-tight">Visit Our Offices</h3>
                    <p className="text-white/80 mt-2 flex items-center gap-2 text-sm">Join us at Paynesville for a face-to-face consultation.</p>
                  </div>
                </Link>

                {/* Card 2 */}
                <Link to="/contact" onClick={() => setIsOpen(false)} className="flex-1 relative rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all">
                  <img
                    src="/web images/1001836405.jpg"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt="Meeting"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-3xl font-bold text-white mb-2">Request an Expert Review</h3>
                    <p className="text-white/80 text-sm">Schedule a feasibility study or governance audit for your site.</p>
                  </div>
                </Link>

              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;