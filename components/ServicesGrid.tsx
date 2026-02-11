import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';

const ServicesGrid: React.FC = () => {
  return (
    <section className="bg-stone-900 py-24 md:py-32 relative overflow-hidden text-white">
      {/* Subtle Concrete/Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.07] mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Our Expertise</h2>
          <div className="h-1 w-24 bg-accent rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1: Engineering */}
          <Link to="/services" className="group block h-full">
            <div className="h-full bg-white/5 border border-white/10 p-10 rounded-[2rem] transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/[0.08] hover:border-accent relative overflow-hidden flex flex-col">

              <div className="w-16 h-16 bg-stone-800 rounded-2xl flex items-center justify-center mb-8 text-white group-hover:text-accent transition-colors duration-300">
                <HardHat size={32} strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-bold mb-4">Engineering</h3>
              <p className="text-stone-400 leading-relaxed mb-8 flex-grow">
                Precision execution for complex infrastructure challenges. We handle everything from civil works to high-rise structures.
              </p>

              <div className="flex items-center gap-2 text-sm font-bold text-stone-500 group-hover:text-accent transition-colors duration-300">
                <span>Learn More</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>

            </div>
          </Link>

          {/* Card 2: Governance */}
          <Link to="/services" className="group block h-full">
            <div className="h-full bg-white/5 border border-white/10 p-10 rounded-[2rem] transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/[0.08] hover:border-accent relative overflow-hidden flex flex-col">

              <div className="w-16 h-16 bg-stone-800 rounded-2xl flex items-center justify-center mb-8 text-white group-hover:text-accent transition-colors duration-300">
                <ShieldCheck size={32} strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-bold mb-4">Governance</h3>
              <p className="text-stone-400 leading-relaxed mb-8 flex-grow">
                Rigorous PMO standards to ensure transparency and efficiency. We eliminate waste and ensure regulatory compliance.
              </p>

              <div className="flex items-center gap-2 text-sm font-bold text-stone-500 group-hover:text-accent transition-colors duration-300">
                <span>Learn More</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>

            </div>
          </Link>

          {/* Card 3: Capacity */}
          <Link to="/services" className="group block h-full">
            <div className="h-full bg-white/5 border border-white/10 p-10 rounded-[2rem] transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/[0.08] hover:border-accent relative overflow-hidden flex flex-col">

              <div className="w-16 h-16 bg-stone-800 rounded-2xl flex items-center justify-center mb-8 text-white group-hover:text-accent transition-colors duration-300">
                <GraduationCap size={32} strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-bold mb-4">Capacity</h3>
              <p className="text-stone-400 leading-relaxed mb-8 flex-grow">
                Training the next generation of African builders. We leave behind more than just buildings; we leave skills.
              </p>

              <div className="flex items-center gap-2 text-sm font-bold text-stone-500 group-hover:text-accent transition-colors duration-300">
                <span>Learn More</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>

            </div>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;