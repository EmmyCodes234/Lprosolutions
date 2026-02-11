import React from 'react';
import {
  Briefcase,
  ShieldCheck,
  HardHat,
  Zap,
  GraduationCap,
  TrendingUp,
  Users,
  FileSearch,
  LayoutDashboard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrambleText from '../components/ScrambleText';
import TiltCard from '../components/TiltCard';

const services = [
  {
    id: 'pmo',
    category: 'Management',
    title: 'PMO Services',
    description: 'We establish and manage centralized Project Management Offices (PMO) that serve as the nerve center for your initiatives. Our methodologies ensure standardized processes, resource optimization, and real-time performance tracking.',
    icon: LayoutDashboard,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'gov',
    category: 'Strategy',
    title: 'Governance & Risk',
    description: 'Comprehensive frameworks for project governance and proactive risk management. We minimize uncertainty through regulatory compliance and strategic portfolio oversight.',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'eng-pm',
    category: 'Oversight',
    title: 'Engineering & Construction PM',
    description: 'Acting as the owner’s representative, we provide end-to-end oversight of engineering and construction projects. We ensure contractors adhere to strict quality controls, timelines, and safety standards.',
    icon: HardHat,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'tel-nrg',
    category: 'Infrastructure',
    title: 'Telecom & Energy Solutions',
    description: 'Specialized project management for the telecommunications and energy sectors. We drive efficiency in infrastructure rollout and grid modernization initiatives.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'training',
    category: 'Capacity',
    title: 'Corporate Training',
    description: 'We design capacity-building programs that transfer critical project management skills to local teams, ensuring long-term sustainability and institutional growth.',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'bpo',
    category: 'Optimization',
    title: 'Process Optimization',
    description: 'Analyzing and restructuring business processes to increase operational efficiency. We implement change management strategies that ensure smooth transitions and adoption.',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'stakeholder',
    category: 'Strategy',
    title: 'Stakeholder Engagement',
    description: 'Strategic management of complex stakeholder relationships and thorough social/environmental impact assessments to secure project license to operate.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'feasability',
    category: 'Strategy',
    title: 'Feasibility Studies',
    description: 'Data-driven project evaluations and feasibility studies. We provide the extensive analysis needed to support investment decisions and ensure project viability.',
    icon: FileSearch,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop'
  }
];

const Services: React.FC = () => {
  const [filter, setFilter] = React.useState('All Services');
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const filteredServices = filter === 'All Services'
    ? services
    : services.filter(s => s.category.includes(filter) || filter === 'Management' && (s.category === 'Oversight' || s.category === 'Strategy'));

  return (
    <div className="w-full bg-stone-50 font-sans text-stone-900 overflow-hidden">

      {/* Immersive Expertise Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 text-center bg-stone-900 border-b border-stone-800">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
        <div className="relative z-10 max-w-[1440px] mx-auto">
          <div className="inline-block bg-accent px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-8 animate-reveal-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Our Expertise
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black tracking-tight text-white mb-8 leading-[1.05]">
            <span className="block animate-reveal-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>Strategic Insight.</span>
            <span className="block animate-reveal-up opacity-0 text-stone-500" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>Execution Excellence.</span>
          </h1>
          <p className="text-lg md:text-2xl text-stone-400 max-w-2xl mx-auto font-light leading-relaxed animate-reveal-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            We provide the integrated consultancy services that drive West Africa’s most ambitious development initiatives.
          </p>
        </div>
      </section>

      {/* Filter/Nav - Premium Sticky Bar */}
      <div className="sticky top-0 z-[40] bg-stone-50/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto flex justify-start md:justify-center gap-4 py-4 px-6 overflow-x-auto no-scrollbar">
          {['All Services', 'Strategy', 'Oversight', 'Capacity', 'Infrastructure'].map((f, i) => (
            <button
              key={i}
              onClick={() => setFilter(f === 'Management' ? 'Strategy' : f)} // Simple mapping for demo
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
            <TiltCard key={service.id} className="h-full">
              <div
                className="group relative bg-white rounded-[3rem] p-4 border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                style={{ animationDelay: `${idx * 0.1}s`, transformStyle: 'preserve-3d' }}
              >
                {/* Media Container */}
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8" style={{ transform: 'translateZ(20px)' }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500" />
                  <div
                    className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl flex items-center gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 shadow-xl"
                    style={{ transform: 'translateZ(40px)' }}
                  >
                    <div className="bg-accent p-2 rounded-xl text-white shadow-inner">
                      <service.icon size={20} />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white drop-shadow-md">
                      {service.category}
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="px-4 pb-8 flex-1 flex flex-col" style={{ transformStyle: 'preserve-3d' }}>
                  <h3 className="text-2xl font-display font-bold text-stone-900 mb-4 tracking-tight leading-tight" style={{ transform: 'translateZ(30px)' }}>
                    <ScrambleText text={service.title} />
                  </h3>
                  <p className="text-stone-500 mb-8 leading-relaxed text-sm md:text-base flex-1 line-clamp-4 group-hover:line-clamp-none transition-all duration-500" style={{ transform: 'translateZ(10px)' }}>
                    {service.description}
                  </p>
                  <Link
                    to={`/contact?service=${service.id}`}
                    className="mt-auto inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-stone-400 group-hover:text-accent transition-colors"
                    style={{ transform: 'translateZ(25px)' }}
                  >
                    Request Consultation <div className="w-6 h-px bg-stone-200 group-hover:bg-accent group-hover:w-10 transition-all" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* The L-Pro Methodology - Process Visual */}
      <section className="py-24 md:py-32 bg-stone-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">The Consultancy Excellence Framework</h2>
            <p className="text-stone-400 max-w-xl mx-auto">A rigorous, four-stage approach to project governance and delivery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { id: "01", title: "Assessment", desc: "Feasibility studies, risk analysis, and strategic gap analysis." },
              { id: "02", title: "Strategy", desc: "Developing the PMO frameworks, governance structures, and roadmaps." },
              { id: "03", title: "Oversight", desc: "Active project management, quality assurance, and stakeholder engagement." },
              { id: "04", title: "Optimization", desc: "Capacity building, process refinement, and sustainable handover." }
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
              { q: "How does your PMO service integrate with existing teams?", a: "We work as an extension of your leadership, providing the governance tools and oversight needed without disrupting established cultural workflows." },
              { q: "Do you offer on-site project management?", a: "Yes, our consultants provide full-time on-site representation to ensure quality assurance and timeline adherence." },
              { q: "Can you customize corporate training for our specific industry?", a: "Precisely. We perform a skills gap analysis first and then tailor our project management curriculum to your sector's needs." },
              { q: "What is the typical timeline for a feasibility study?", a: "Timelines vary by scope. Minor evaluations take 2-4 weeks; major infrastructure feasibility studies typically span 8-12 weeks." }
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