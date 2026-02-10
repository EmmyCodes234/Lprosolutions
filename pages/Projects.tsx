import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
   return (
      <div className="w-full bg-stone-50 font-sans text-stone-900 overflow-hidden">
         {/* Minimalist Header */}
         <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 text-center">
            <div className="inline-block bg-accent px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 mb-8">
               Our Portfolio
            </div>
            <h1 className="text-5xl md:text-9xl font-display font-black tracking-tighter text-stone-900 mb-8 leading-[0.9]">
               Proven Excellence. <br />
               <span className="text-stone-300">Concrete Results.</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
               Delivering governance and engineering structure to West Africa’s most critical infrastructure initiatives.
            </p>
         </section>

         <section className="max-w-[1440px] mx-auto px-6 pb-32">
            <div className="space-y-32 md:space-y-48">

               {/* Project 1 - Magazine Layout (Large) */}
               <div className="group relative">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                     <div className="lg:col-span-7 relative">
                        <div className="aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl">
                           <img
                              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2670&auto=format&fit=crop"
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                              alt="The Sinkor Corporate Heights"
                           />
                        </div>
                        <div className="absolute top-12 -left-6 bg-accent p-8 rounded-[2rem] shadow-2xl hidden md:block animate-pulse-slow">
                           <div className="text-xs font-black uppercase tracking-widest text-stone-950 mb-1">Status</div>
                           <div className="text-2xl font-display font-black text-stone-950">Completed</div>
                        </div>
                     </div>
                     <div className="lg:col-span-5 space-y-8">
                        <div>
                           <span className="text-xs font-black uppercase tracking-[0.3em] text-stone-400 mb-4 block">Commercial Infrastructure</span>
                           <h3 className="text-4xl md:text-6xl font-display font-bold text-stone-900 leading-tight mb-6">The Sinkor Corporate Heights</h3>
                           <p className="text-stone-500 text-lg leading-relaxed mb-8">
                              Managed the end-to-end construction of a 12-story mixed-use complex. L-Pro implemented a zero-waste policy and delivered the project 2 months ahead of schedule.
                           </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 border-t border-stone-200 pt-8">
                           <div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Duration</div>
                              <div className="text-xl font-display font-bold">18 Months</div>
                           </div>
                           <div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Efficiency</div>
                              <div className="text-xl font-display font-bold">+15% Budget</div>
                           </div>
                        </div>

                        <Link
                           to={`/contact?project=sinkor-heights`}
                           className="inline-flex items-center gap-4 bg-stone-950 text-white px-10 py-5 rounded-full font-bold text-sm hover:bg-accent hover:text-stone-950 transition-all group/btn shadow-xl active:scale-95"
                        >
                           Case Study Details <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                        </Link>
                     </div>
                  </div>
               </div>

               {/* Project 2 - Magazine Layout (Reversed) */}
               <div className="group relative">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                     <div className="lg:col-span-5 order-2 lg:order-1 space-y-8">
                        <div>
                           <span className="text-xs font-black uppercase tracking-[0.3em] text-stone-400 mb-4 block">Public Sector / Civil</span>
                           <h3 className="text-4xl md:text-6xl font-display font-bold text-stone-900 leading-tight mb-6">Arterial Road Rehabilitation</h3>
                           <p className="text-stone-500 text-lg leading-relaxed mb-8">
                              Partnered with government agencies to oversee the resurfacing and drainage improvement of critical urban transport corridors, ensuring adherence to ECOWAS engineering standards.
                           </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 border-t border-stone-200 pt-8">
                           <div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Impact</div>
                              <div className="text-xl font-display font-bold">50K+ Daily Users</div>
                           </div>
                           <div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Compliance</div>
                              <div className="text-xl font-display font-bold">ISO 9001</div>
                           </div>
                        </div>

                        <Link
                           to={`/contact?project=monrovia-roads`}
                           className="inline-flex items-center gap-4 bg-stone-950 text-white px-10 py-5 rounded-full font-bold text-sm hover:scale-105 transition-all group/btn shadow-xl"
                        >
                           Technical Audit <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                        </Link>
                     </div>
                     <div className="lg:col-span-7 order-1 lg:order-2">
                        <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl shadow-stone-300">
                           <img
                              src="https://images.unsplash.com/photo-1581094794329-c8112a4e5190?q=80&w=2670&auto=format&fit=crop"
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                              alt="Road Rehabilitation"
                           />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Project 3 - Interactive Banner Style */}
               <div className="relative bg-stone-950 rounded-[4rem] overflow-hidden p-8 md:p-20 text-white group">
                  <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
                  <img
                     src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop"
                     className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-[30s] group-hover:scale-125"
                     alt="Training"
                  />
                  <div className="relative z-10 max-w-3xl">
                     <span className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-6 block">National Advisory</span>
                     <h3 className="text-4xl md:text-7xl font-display font-black leading-tight mb-8">Capacity Development Initiative</h3>
                     <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-12">
                        Designed a vocational training curriculum for 500+ construction professionals, focusing on safety compliance and modern engineering techniques.
                     </p>

                     <div className="flex flex-wrap gap-12 mb-12">
                        <div>
                           <div className="text-3xl font-display font-bold text-white">500+</div>
                           <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">Certified Experts</div>
                        </div>
                        <div>
                           <div className="text-3xl font-display font-bold text-white">12</div>
                           <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">Training Labs</div>
                        </div>
                     </div>

                     <Link
                        to={`/contact?project=capacity-initiative`}
                        className="inline-flex items-center gap-4 bg-white text-stone-950 px-10 py-5 rounded-full font-bold text-sm hover:bg-accent transition-all shadow-2xl shadow-white/10"
                     >
                        View Strategic Impact <ArrowRight size={18} />
                     </Link>
                  </div>
               </div>

            </div>
         </section>
      </div>
   );
};

export default Projects;