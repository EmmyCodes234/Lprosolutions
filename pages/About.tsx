import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="w-full bg-stone-50 font-sans text-stone-900">
      {/* Immersive Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop"
          alt="L-Pro Office"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 animate-[slowZoom_20s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-50" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 text-center">
          <div className="inline-block bg-accent px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-8 animate-reveal-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Meet L-Pro Solutions
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black tracking-tight text-white mb-8 drop-shadow-2xl">
            <span className="block animate-reveal-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>Built on Integrity.</span>
            <span className="block animate-reveal-up opacity-0 italic text-accent" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>Driven by Impact.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed animate-reveal-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            The premier partner for development and corporate excellence in West Africa.
          </p>
        </div>
      </section>

      {/* Strategic Vision Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">Our Vision</h2>
                <p className="text-3xl md:text-5xl font-display font-bold leading-tight tracking-tight">
                  To be the leading provider of innovative and effective project management solutions, empowering businesses in Liberia to achieve <span className="text-accent underline decoration-stone-200 underline-offset-8">excellence, efficiency, and sustainable growth.</span>
                </p>
              </div>

              <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-stone-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-700" />
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400 mb-4">Our Mission</h3>
                <p className="text-stone-500 text-lg leading-relaxed">
                  At L-Pro Solutions, we are committed to delivering top-tier project management, training, and consultancy services that enhance organizational efficiency and project success. We partner with businesses across diverse industries, providing tailored solutions, best practices, and expert guidance to drive impactful results.
                  <br /><br />
                  Our goal is to foster a culture of <span className="font-semibold text-stone-700">excellence, accountability, and continuous improvement</span> in Liberia's project management landscape.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Precision", desc: "We measure twice, cut once. Attention to detail is at the core of our engineering philosophy.", icon: "01" },
                { title: "Transparency", desc: "No hidden costs, no ambiguity. We believe in clear communication and accountability.", icon: "02" },
                { title: "Community", desc: "We build for the people, employing local talent and ensuring long-term community benefit.", icon: "03" },
                { title: "Global Standards", desc: "We apply international best practices (PMI, ISO) to ensure world-class quality.", icon: "04" },
              ].map((val, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl group">
                  <div className="text-4xl font-display font-black text-stone-100 group-hover:text-accent/20 transition-colors mb-4">{val.icon}</div>
                  <h4 className="text-xl font-display font-bold mb-4">{val.title}</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-stone-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Projects Managed", value: "150+" },
              { label: "Community Impact", value: "10K+", suffix: "People" },
              { label: "Team Excellence", value: "50+", suffix: "Experts" },
              { label: "Client Satisfaction", value: "100%" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl md:text-6xl font-display font-black text-accent mb-2">{stat.value}</div>
                <div className="text-white/40 text-xs uppercase tracking-[0.2em] font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-10">
            Let’s build the future <br /> of West Africa together.
          </h2>
          <Link
            to="/contact"
            className="inline-flex h-20 items-center justify-center bg-stone-950 text-white px-12 rounded-full font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-2xl"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;