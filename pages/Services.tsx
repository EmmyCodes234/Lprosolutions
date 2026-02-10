import React from 'react';
import {
  Briefcase,
  ShieldCheck,
  HardHat,
  Zap,
  GraduationCap,
  TrendingUp,
  Users,
  FileSearch
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrambleText from '../components/ScrambleText';

const services = [
  {
    id: 'pmo',
    category: 'Management',
    title: 'PMO Services',
    description: 'We establish and manage centralized Project Management Offices that serve as the nerve center for your initiatives. Our methodologies ensure standardized processes, resource optimization, and real-time performance tracking.',
    icon: Briefcase,
    image: 'https://picsum.photos/id/1/800/600'
  },
  {
    id: 'gov',
    category: 'Management',
    title: 'Governance & Risk',
    description: 'Comprehensive frameworks for project governance and proactive risk management strategies to minimize uncertainty. We ensure regulatory compliance and strategic portfolio management.',
    icon: ShieldCheck,
    image: 'https://picsum.photos/id/1055/800/600'
  },
  {
    id: 'eng',
    category: 'Engineering',
    title: 'Civil Engineering & Construction',
    description: 'From the first blueprint to the final inspection, L-Pro provides end-to-end oversight. We act as your owner’s representative, ensuring contractors adhere to strict quality controls and safety standards.',
    icon: HardHat,
    image: 'https://picsum.photos/id/164/800/600'
  },
  {
    id: 'tel',
    category: 'Engineering',
    title: 'Telecom & Energy',
    description: 'Specialized solutions for the telecommunications and energy sectors, focusing on infrastructure and efficiency.',
    icon: Zap,
    image: 'https://picsum.photos/id/61/800/600'
  },
  {
    id: 'edu',
    category: 'Training',
    title: 'Training & Institutional Strengthening',
    description: 'True development leaves a legacy. We design capacity-building programs that transfer skills to local teams, ensuring that the infrastructure we build can be sustained and maintained by the community long after we leave.',
    icon: GraduationCap,
    image: 'https://picsum.photos/id/60/800/600'
  },
  {
    id: 'opt',
    category: 'Management',
    title: 'Process Optimization',
    description: 'Analyzing and improving business processes to increase operational efficiency and reduce costs.',
    icon: TrendingUp,
    image: 'https://picsum.photos/id/180/800/600'
  },
  {
    id: 'stake',
    category: 'Management',
    title: 'Stakeholder Engagement',
    description: 'Strategic management of project stakeholders and thorough social/environmental impact assessments.',
    icon: Users,
    image: 'https://picsum.photos/id/231/800/600'
  },
  {
    id: 'feas',
    category: 'Management',
    title: 'Feasibility Studies',
    description: 'Detailed project evaluations and feasibility studies to support data-driven investment decisions. We provide in-depth studies to ensure project viability before launch.',
    icon: FileSearch,
    image: 'https://picsum.photos/id/450/800/600'
  }
];

const Services: React.FC = () => {
  const [filter, setFilter] = React.useState('All Services');
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const filteredServices = filter === 'All Services'
    ? services
    : services.filter(s => s.category === filter);

  return (
    <div className="w-full bg-stone-50 font-sans text-stone-900 overflow-hidden">

      {/* Immersive Expertise Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 text-center bg-stone-900 border-b border-stone-800">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
        <div className="relative z-10 max-w-[1440px] mx-auto">
          <div className="inline-block bg-accent px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 mb-8 animate-reveal-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Our Expertise
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black tracking-tight text-white mb-8 leading-[1.05]">
            <span className="block animate-reveal-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>Comprehensive Solutions.</span>
            <span className="block animate-reveal-up opacity-0 text-stone-500" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>Predictable Outcomes.</span>
          </h1>
          <p className="text-lg md:text-2xl text-stone-400 max-w-2xl mx-auto font-light leading-relaxed animate-reveal-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            We bring structure, clarity, and precision to West Africa’s most demanding development initiatives.
          </p>
        </div>
      </section>

      {/* Filter/Nav - Premium Sticky Bar */}
      <div className="sticky top-0 z-[40] bg-stone-50/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto flex justify-start md:justify-center gap-4 py-4 px-6 overflow-x-auto no-scrollbar">
          {['All Services', 'Management', 'Engineering', 'Training'].map((f, i) => (
            <button
              key={i}
              onClick={() => setFilter(f)}
              className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-stone-950 text-white shadow-lg scale-105' : 'bg-transparent text-stone-400 hover:text-stone-950 hover:bg-stone-100'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Services Stack */}
      <section className="max-w-[1440px] mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-[3rem] p-4 border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col h-full"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Media Container */}
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl flex items-center gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-accent p-2 rounded-xl text-stone-950 shadow-inner">
                    <service.icon size={20} />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white drop-shadow-md">
                    {service.category}
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="px-4 pb-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-display font-bold text-stone-900 mb-4 tracking-tight leading-tight">
                  <ScrambleText text={service.title} />
                </h3>
                <p className="text-stone-500 mb-8 leading-relaxed text-sm md:text-base flex-1 line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                  {service.description}
                </p>
                <Link
                  to={`/contact?service=${service.id}`}
                  className="mt-auto inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-stone-400 group-hover:text-accent transition-colors"
                >
                  Configure Service <div className="w-6 h-px bg-stone-200 group-hover:bg-accent group-hover:w-10 transition-all" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The L-Pro Methodology - Process Visual */}
      <section className="py-24 md:py-32 bg-stone-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">The L-Pro Methodology</h2>
            <p className="text-stone-400 max-w-xl mx-auto">A rigorous, four-stage approach to engineering and governance excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { id: "01", title: "Feasibility", desc: "Scientific evaluation of project viability and risk assessment." },
              { id: "02", title: "Structure", desc: "Establishing PMO frameworks and governance strictures." },
              { id: "03", title: "Execution", desc: "Active engineering oversight and real-time QA reporting." },
              { id: "04", title: "Handover", desc: "Institutional strengthening and sustainable exit strategy." }
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="text-8xl font-display font-black text-white/5 absolute -top-10 left-0 transition-colors group-hover:text-accent/10">{step.id}</div>
                <div className="relative pt-12 border-t border-white/10 group-hover:border-accent transition-colors">
                  <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                  <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-300 transition-colors">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Overlay Section */}
      <section className="max-w-[900px] mx-auto px-6 py-24 md:py-32">
        <div className="bg-white p-10 md:p-20 rounded-[4rem] border border-stone-100 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-stone-900 mb-12">Expert Insights (FAQ)</h2>
          <div className="space-y-4">
            {[
              { q: "How does your PMO service integrate with existing teams?", a: "We work as an extension of your leadership, providing the tools and oversight needed without disrupting established workflows." },
              { q: "Do you offer on-site engineering supervision?", a: "Yes, our engineers provide full-time on-site management to ensure QA/QC standards are met daily." },
              { q: "Can you customize corporate training for our specific industry?", a: "Precisely. We perform a gap analysis first and then tailor our curriculum to your actual field needs." },
              { q: "What is the typical timeline for a feasibility study?", a: "Minor projects take 2-4 weeks; major infrastructure evaluations typically span 8-12 weeks." }
            ].map((item, i) => (
              <div key={i} className="group">
                <div
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="py-6 flex justify-between items-center cursor-pointer border-b border-stone-100 group-hover:border-stone-200 transition-colors"
                >
                  <span className="font-bold text-stone-900 pr-4">{item.q}</span>
                  <div className={`text-2xl text-stone-300 group-hover:text-accent transition-transform duration-500 ${openFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-40 py-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-stone-500 text-sm md:text-base leading-relaxed bg-stone-50 p-6 rounded-3xl">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;