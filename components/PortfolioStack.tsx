import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    year: '2025',
    title: 'Sinkor Corporate Heights',
    description: 'A 12-story mixed-use complex defining the new Monrovia skyline. Integrated green building technologies with local architectural motifs.',
    tags: ['Engineering', 'Governance'],
    // Modern building with African context/lighting
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 2,
    year: '2024',
    title: 'Coastal Highway Rehab',
    description: 'Rehabilitating 45km of critical transport arteries for the Ministry of Public Works. Delivered 2 months ahead of schedule.',
    tags: ['Civil Works', 'Public Sector'],
    // Road work
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 3,
    year: '2023',
    title: 'Central Bank Annex',
    description: 'High-security structural engineering and systems integration. Implemented world-class access control and seismic reinforcement.',
    tags: ['Security', 'Architecture'],
    // Security/Tech/Architecture
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop'
  }
];

const PortfolioStack: React.FC = () => {
  return (
    <section className="bg-[#050505] py-24 md:py-32 relative text-white border-t border-white/10">

      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 mb-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Selected Works</h2>
        <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto">
          A legacy of infrastructure across West Africa.
        </p>
      </div>

      {/* Stacking Cards Container */}
      <div className="max-w-[1440px] mx-auto px-6 pb-24 flex flex-col gap-12">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="w-full rounded-[2.5rem] overflow-hidden shadow-2xl group relative md:sticky"
            style={{
              // We use a CSS variable for top position to easily toggle it on desktop vs mobile if needed,
              // or simply rely on md:sticky handling the behavior.
              // Logic: Mobile = relative (top ignored mostly), Desktop = sticky with calc.
              // @ts-ignore
              '--stack-top': `calc(10vh + ${index * 40}px)`,
              top: 'var(--stack-top)',
              height: '70vh',
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end items-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="font-mono text-accent text-lg md:text-xl font-bold mb-4 block">
                {project.year}
              </span>

              <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl">
                {project.title}
              </h3>

              <p className="text-stone-300 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-6 py-2 border border-white/20 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider text-stone-300 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-white font-bold text-lg border-b-2 border-accent pb-1 hover:text-accent transition-colors"
              >
                View Case Study <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button at bottom */}
      <div className="text-center pt-12">
        <Link to="/projects" className="inline-block px-8 py-4 bg-stone-800 hover:bg-stone-700 text-white rounded-full font-bold transition-colors">
          View Full Portfolio
        </Link>
      </div>

    </section>
  );
};

export default PortfolioStack;