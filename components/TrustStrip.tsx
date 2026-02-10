import React from 'react';
import { ShieldCheck, Globe, Award, Activity } from 'lucide-react';

const TrustStrip: React.FC = () => {
  return (
    <section className="bg-white py-12 px-6 border-t border-stone-100 relative z-20">
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* Section Header (Curator Note) */}
          <div className="flex items-center gap-5 pr-8 xl:border-r xl:border-stone-100 shrink-0">
            <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center text-accent shadow-xl">
              <ShieldCheck size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 mb-1">Standardization</span>
              <p className="text-stone-900 font-display font-black text-xs uppercase tracking-tight leading-none whitespace-nowrap">
                Governance <br /> Framework
              </p>
            </div>
          </div>

          {/* Badges Corridor (Center) */}
          <div className="flex-grow flex flex-wrap md:flex-nowrap items-center justify-center lg:justify-between gap-6 md:gap-0 w-full">

            {/* Cert 1 */}
            <div className="flex-1 min-w-[140px] md:min-w-0 flex flex-col items-center lg:items-start md:px-6 lg:px-8 md:border-r md:border-stone-50 last:border-0 group">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-stone-300 mb-2 group-hover:text-accent transition-colors">Quality</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-display font-black text-stone-950">ISO</span>
                <span className="text-[9px] font-bold text-stone-500 uppercase">9001:2015</span>
              </div>
            </div>

            {/* Cert 2 */}
            <div className="flex-1 min-w-[140px] md:min-w-0 flex flex-col items-center lg:items-start md:px-6 lg:px-8 md:border-r md:border-stone-50 last:border-0 group">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-stone-300 mb-2 group-hover:text-accent transition-colors">Project Mgmt</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-display font-black text-stone-950">PMI</span>
                <span className="text-[9px] font-bold text-stone-500 uppercase">Chartered</span>
              </div>
            </div>

            {/* Cert 3 */}
            <div className="flex-1 min-w-[140px] md:min-w-0 flex flex-col items-center lg:items-start md:px-6 lg:px-8 md:border-r md:border-stone-50 last:border-0 group">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-stone-300 mb-2 group-hover:text-accent transition-colors">Regional Accord</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-display font-black text-stone-950 text-nowrap">ECOWAS</span>
                <span className="text-[9px] font-bold text-stone-500 uppercase">Audit</span>
              </div>
            </div>

            {/* Cert 4 */}
            <div className="flex-1 min-w-[140px] md:min-w-0 flex flex-col items-center lg:items-start md:px-6 lg:px-8 md:border-r md:border-stone-50 last:border-0 group">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-stone-300 mb-2 group-hover:text-accent transition-colors">Compliance</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-display font-black text-stone-950">HSE</span>
                <span className="text-[9px] font-bold text-stone-500 uppercase">Tier-1</span>
              </div>
            </div>

          </div>

          {/* Legal Stamp (Right) */}
          <div className="pl-8 xl:border-l xl:border-stone-100 flex items-center gap-4 shrink-0 justify-center">
            <div className="text-right">
              <div className="text-2xl font-display font-black text-stone-950 leading-none">100%</div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 mt-2">Compliance</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-accent shadow-lg">
              <Activity size={18} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustStrip;