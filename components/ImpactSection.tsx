import React, { useEffect, useRef } from 'react';

const stats = [
  { id: 1, value: 150, suffix: 'M+', label: 'Project Value Managed (USD)' },
  { id: 2, value: 100, suffix: '%', label: 'Regulatory Compliance' },
  { id: 3, value: 12, suffix: 'Years', label: 'Operational Excellence' },
];

const partners = [
  "Ministry of Public Works",
  "World Bank Group",
  "African Development Bank",
  "L-Pro Infrastructure",
  "USAID",
  "Millennium Challenge Corporation",
  "ECOWAS Commission",
  "ArcelorMittal Liberia"
];

// Duplicate partners list to create seamless loop for the marquee
// We repeat it enough times to ensure it fills the width and loops smoothly
const tickerItems = [...partners, ...partners, ...partners];

const ImpactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseFloat(entry.target.getAttribute('data-target') || '0');
          const element = entry.target as HTMLElement;
          
          let startTimestamp: number | null = null;
          const duration = 2000;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Ease out quart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            const current = Math.floor(easeProgress * target);
            element.innerText = current.toString();

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
               element.innerText = target.toString();
            }
          };

          window.requestAnimationFrame(step);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const numberElements = containerRef.current?.querySelectorAll('.stat-number');
    numberElements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-stone-900 pt-20 pb-0 border-t border-white/10 relative overflow-hidden">
      
      {/* Stats Grid */}
      <div className="max-w-[1440px] mx-auto px-6 mb-20" ref={containerRef}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0 items-center justify-center text-center">
            {stats.map((stat, index) => (
                <div key={stat.id} className={`flex flex-col items-center relative ${
                    index !== stats.length - 1 ? 'md:after:content-[""] md:after:absolute md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:w-px md:after:h-20 md:after:bg-gradient-to-b md:after:from-transparent md:after:via-stone-700 md:after:to-transparent' : ''
                }`}>
                    <div className="flex items-baseline gap-1">
                         <span 
                            className="stat-number text-6xl md:text-7xl font-bold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-500"
                            data-target={stat.value}
                         >
                             0
                         </span>
                         <span className="text-4xl md:text-5xl font-bold text-accent">{stat.suffix}</span>
                    </div>
                    <p className="text-stone-500 uppercase tracking-[0.2em] text-xs md:text-sm mt-4 font-semibold">{stat.label}</p>
                </div>
            ))}
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="w-full bg-black/20 border-t border-white/5 py-8 overflow-hidden">
         <div className="animate-marquee whitespace-nowrap inline-block">
            {tickerItems.map((partner, i) => (
                <span key={i} className="inline-flex items-center">
                    <span className="text-stone-600 font-bold uppercase tracking-widest text-sm md:text-base mx-12">{partner}</span>
                    <span className="text-accent/50 text-xs">•</span>
                </span>
            ))}
         </div>
      </div>
    </section>
  );
};

export default ImpactSection;