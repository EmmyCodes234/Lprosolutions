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
    <div className="w-full bg-[#f5f5f4] min-h-screen pb-24">

      {/* Page Header */}
      <section className="pt-24 md:pt-32 pb-12 px-6 text-center">
        <div className="inline-block bg-white border border-stone-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide text-stone-500 mb-6">
          Our Expertise
        </div>
        <h1 className="text-4xl md:text-7xl font-bold text-stone-900 tracking-tighter mb-6">
          Comprehensive Solutions for <br className="hidden md:block" /> Complex Challenges.
        </h1>
        <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto">
          We bring structure, clarity, and efficiency to your most complex challenges.
        </p>
      </section>

      {/* Filter/Nav */}
      <div className="flex justify-start md:justify-center gap-2 mb-12 md:mb-16 overflow-x-auto px-6 py-2 no-scrollbar">
        {['All Services', 'Management', 'Engineering', 'Training'].map((f, i) => (
          <button
            key={i}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${filter === f ? 'bg-stone-900 text-white' : 'bg-white text-stone-500 hover:bg-stone-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <section className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="group bg-white rounded-[2.5rem] p-3 hover:shadow-xl transition-shadow duration-300 cursor-default">
              <div className="relative h-56 md:h-64 rounded-[2rem] overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-3 rounded-full text-stone-900">
                  <service.icon size={24} />
                </div>
              </div>
              <div className="px-4 pb-6">
                <h3 className="text-xl md:text-2xl font-bold text-stone-900 mb-3 h-auto md:h-16 flex items-start">
                  <ScrambleText text={service.title} />
                </h3>
                <p className="text-stone-500 mb-6 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
                <Link to={`/contact?service=${service.id}`} className="text-sm font-bold border-b border-stone-200 pb-1 hover:border-stone-900 transition-colors inline-block">
                  Learn more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-[800px] mx-auto px-6 pt-20 md:pt-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-900 mb-8 md:mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How does your PMO service integrate with existing teams?", a: "We work as an extension of your leadership, providing the tools and oversight needed without disrupting established workflows." },
            { q: "Do you offer on-site engineering supervision?", a: "Yes, our engineers provide full-time on-site management to ensure QA/QC standards are met daily." },
            { q: "Can you customize corporate training for our specific industry?", a: "Precisely. We perform a gap analysis first and then tailor our curriculum to your actual field needs." },
            { q: "What is the typical timeline for a feasibility study?", a: "Minor projects take 2-4 weeks; major infrastructure evaluations typically span 8-12 weeks." }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-[1.5rem] overflow-hidden">
              <div
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="p-6 flex justify-between items-center cursor-pointer hover:bg-stone-50 transition-colors"
              >
                <span className="font-semibold text-stone-900 pr-4">{item.q}</span>
                <div className={`w-8 h-8 rounded-full bg-[#f5f5f4] flex items-center justify-center text-stone-500 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>
                  +
                </div>
              </div>
              <div className={`px-6 transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <p className="text-stone-500 text-sm md:text-base leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;