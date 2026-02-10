import React from 'react';
import { ShieldCheck, Globe, Award, Activity } from 'lucide-react';

const TrustStrip: React.FC = () => {
  return (
    <section className="bg-[#111] py-16 px-6 border-t border-white/10 relative z-20">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">
        
        {/* Label */}
        <div className="flex items-center gap-4">
            <div className="w-1 h-12 bg-accent/50 rounded-full"></div>
            <p className="text-stone-500 font-mono text-sm uppercase tracking-widest max-w-[150px] leading-relaxed">
            Operated according to global standards
            </p>
        </div>

        {/* Badges Grid */}
        <div className="flex flex-wrap justify-center lg:justify-end gap-8 md:gap-16">
          
          {/* Badge 1 */}
          <div className="flex items-center gap-4 group opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 border-2 border-stone-800 rounded-lg text-white group-hover:border-accent group-hover:text-accent transition-colors">
               <ShieldCheck size={28} strokeWidth={1.5} />
            </div>
            <div className="text-stone-400 text-xs font-bold leading-tight uppercase tracking-wider">
              <span className="text-white text-base block mb-0.5">ISO</span>
              9001:2015<br/>Certified
            </div>
          </div>

          {/* Badge 2 */}
          <div className="flex items-center gap-4 group opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 border-2 border-stone-800 rounded-lg text-white group-hover:border-accent group-hover:text-accent transition-colors">
               <Award size={28} strokeWidth={1.5} />
            </div>
            <div className="text-stone-400 text-xs font-bold leading-tight uppercase tracking-wider">
              <span className="text-white text-base block mb-0.5">PMI</span>
              Project Mgmt<br/>Institute
            </div>
          </div>

          {/* Badge 3 */}
          <div className="flex items-center gap-4 group opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 border-2 border-stone-800 rounded-lg text-white group-hover:border-accent group-hover:text-accent transition-colors">
               <Globe size={28} strokeWidth={1.5} />
            </div>
            <div className="text-stone-400 text-xs font-bold leading-tight uppercase tracking-wider">
              <span className="text-white text-base block mb-0.5">ECOWAS</span>
              Regional<br/>Compliance
            </div>
          </div>

          {/* Badge 4 */}
          <div className="flex items-center gap-4 group opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 border-2 border-stone-800 rounded-lg text-white group-hover:border-accent group-hover:text-accent transition-colors">
               <Activity size={28} strokeWidth={1.5} />
            </div>
            <div className="text-stone-400 text-xs font-bold leading-tight uppercase tracking-wider">
              <span className="text-white text-base block mb-0.5">HSE</span>
              Safety &<br/>Environment
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustStrip;