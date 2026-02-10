import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
   return (
      <div className="w-full bg-[#f5f5f4] min-h-screen pb-24">
         {/* Page Header */}
         <section className="pt-32 pb-12 md:pb-20 px-6 text-center relative z-10">
            <div className="inline-block bg-white border border-stone-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide text-stone-500 mb-6">
               Portfolio
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-stone-900 tracking-tighter mb-6">
               A Track Record of Excellence.
            </h1>
            <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto">
               Delivering results for Liberia's most critical infrastructure and development initiatives.
            </p>
         </section>

         <section className="max-w-[1440px] mx-auto px-6">

            {/* Project 1 - Stacking Card */}
            <div className="mb-8 md:mb-12 lg:mb-24 shadow-2xl rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-white z-10">
               <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="h-[250px] md:h-[400px] lg:h-[600px] relative">
                     <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Building" />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12 lg:p-20 bg-white">
                     <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Commercial Infrastructure</span>
                     <h3 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">The Sinkor Corporate Heights</h3>
                     <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
                        <span className="inline-block px-3 py-1 bg-stone-100 rounded-full text-xs font-semibold text-stone-600">Lead Project Managers</span>
                        <span className="inline-block px-3 py-1 bg-stone-100 rounded-full text-xs font-semibold text-stone-600">Governance Consultants</span>
                     </div>
                     <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-8">
                        Managed the end-to-end construction of a 12-story mixed-use complex. L-Pro implemented a zero-waste policy and delivered the project 2 months ahead of schedule.
                        <br /><br />
                        This landmark project redefines the skyline of Monrovia, integrating green building technologies with local architectural motifs.
                     </p>
                     <Link to={`/contact?project=sinkor-heights`} className="self-start flex items-center gap-2 text-stone-900 font-bold hover:text-accent transition-colors group">
                        View Case Study <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                     </Link>
                  </div>
               </div>
            </div>

            {/* Project 2 - Stacking Card */}
            <div className="mb-8 md:mb-12 lg:mb-24 shadow-2xl rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-white z-20">
               <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="flex flex-col justify-center p-8 md:p-12 lg:p-20 bg-white order-2 lg:order-1">
                     <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Public Sector / Civil</span>
                     <h3 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">Monrovia Arterial Road Rehabilitation</h3>
                     <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
                        <span className="inline-block px-3 py-1 bg-stone-100 rounded-full text-xs font-semibold text-stone-600">Technical Auditors</span>
                        <span className="inline-block px-3 py-1 bg-stone-100 rounded-full text-xs font-semibold text-stone-600">Quality Assurance</span>
                     </div>
                     <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-8">
                        Partnered with government agencies to oversee the resurfacing and drainage improvement of critical urban transport corridors, ensuring adherence to ECOWAS engineering standards.
                        <br /><br />
                        By deploying our proprietary real-time reporting dashboard, we increased transparency and reduced delays by 40%.
                     </p>
                     <Link to={`/contact?project=monrovia-roads`} className="self-start flex items-center gap-2 text-stone-900 font-bold hover:text-accent transition-colors group">
                        View Case Study <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                     </Link>
                  </div>
                  <div className="h-[250px] md:h-[400px] lg:h-[600px] relative order-1 lg:order-2">
                     <img src="https://images.unsplash.com/photo-1590059530462-8c1c46399426?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Road" />
                  </div>
               </div>
            </div>

            {/* Project 3 - Stacking Card */}
            <div className="mb-8 md:mb-12 lg:mb-24 shadow-2xl rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-white z-30">
               <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="h-[250px] md:h-[400px] lg:h-[600px] relative">
                     <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Training" />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12 lg:p-20 bg-white">
                     <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Advisory</span>
                     <h3 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">National Capacity Development Initiative</h3>
                     <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
                        <span className="inline-block px-3 py-1 bg-stone-100 rounded-full text-xs font-semibold text-stone-600">Strategic Advisors</span>
                     </div>
                     <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-8">
                        Designed a vocational training curriculum for 500+ construction professionals, focusing on safety compliance and modern engineering techniques.
                        <br /><br />
                        We worked with local technical institutes to modernize their labs and train the trainers, creating a multiplier effect.
                     </p>
                     <Link to={`/contact?project=capacity-initiative`} className="self-start flex items-center gap-2 text-stone-900 font-bold hover:text-accent transition-colors group">
                        View Case Study <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                     </Link>
                  </div>
               </div>
            </div>

         </section>
      </div>
   );
};

export default Projects;