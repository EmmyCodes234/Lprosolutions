import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import LiquidImage from '../components/LiquidImage';
import { soundManager } from '../components/SoundManager';

const galleryImages = [
   '/web%20images/1001836387.jpg',
   '/web%20images/1001836393.jpg',
   '/web%20images/1001836396.jpg',
   '/web%20images/1001836399.jpg',
   '/web%20images/1001836405.jpg',
   '/web%20images/1001836411.jpg',
   '/web%20images/1001836414.jpg',
   '/web%20images/1001836417.jpg',
   '/web%20images/1001836420.jpg',
   '/web%20images/1001836423.jpg',
];

const Projects: React.FC = () => {
   const [selectedImage, setSelectedImage] = useState<string | null>(null);

   React.useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.remove('opacity-0', 'translate-y-10');
                  entry.target.classList.add('opacity-100', 'translate-y-0');
                  observer.unobserve(entry.target);
               }
            });
         },
         { threshold: 0.1 }
      );

      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
         observer.observe(el);
      });

      return () => observer.disconnect();
   }, []);

   return (
      <div className="w-full bg-stone-50 font-sans text-stone-900 overflow-hidden min-h-screen">
         {/* Minimalist Header */}
         <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 text-center">
            <div className="inline-block bg-accent px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-8 animate-revealUp">
               Visual Portfolio
            </div>
            <h1 className="text-5xl md:text-9xl font-display font-black tracking-tighter text-stone-900 mb-6 leading-[0.9] animate-revealUp animation-delay-100">
               Built to Last.
            </h1>
            <p className="text-xl md:text-2xl text-stone-500 max-w-2xl mx-auto font-light leading-relaxed animate-revealUp animation-delay-200">
               A visual chronology of engineering excellence across West Africa.
            </p>
         </section>

         {/* Structured Grid Gallery */}
         <section className="max-w-[1920px] mx-auto px-4 md:px-6 pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {galleryImages.map((src, index) => (
                  <div
                     key={index}
                     className={`animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out relative group rounded-2xl overflow-hidden cursor-zoom-in aspect-[4/5] bg-stone-200`}
                     style={{ transitionDelay: `${(index % 3) * 100}ms` }}
                     onClick={() => setSelectedImage(src)}
                     onMouseEnter={() => soundManager.play('hover')}
                  >
                     <LiquidImage
                        image1={src}
                        image2={galleryImages[(index + 1) % galleryImages.length]}
                        className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                     />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
                     <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg">
                           <ArrowUpRight size={20} className="text-stone-900" />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* Lightbox Modal */}
         {selectedImage && (
            <div
               className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 animate-fadeIn"
               onClick={() => setSelectedImage(null)}
            >
               <div className="relative w-full max-w-7xl max-h-[90vh]">
                  <img
                     src={selectedImage}
                     alt="Enlarged Project View"
                     className="w-full h-full object-contain max-h-[90vh] rounded-lg shadow-2xl"
                  />
                  <button
                     className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
                     onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                     }}
                  >
                     <span className="text-xs font-black uppercase tracking-widest">Close</span>
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default Projects;