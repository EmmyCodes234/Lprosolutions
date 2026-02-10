import React from 'react';
import { CheckCircle2, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';
import HeroSlider from '../components/HeroSlider';
import ServicesGrid from '../components/ServicesGrid';
import ImpactSection from '../components/ImpactSection';
import PortfolioStack from '../components/PortfolioStack';

const Home: React.FC = () => {
  return (
    <div className="w-full bg-stone-50 font-sans text-stone-900 overflow-hidden">
      {/* Dynamic Hero Slider */}
      <HeroSlider />

      {/* Intro Narrative */}
      <section className="py-24 md:py-40 px-6 bg-stone-50 border-b border-stone-100 relative">
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <div className="inline-block bg-accent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 mb-10">
            Founded in Monrovia
          </div>
          <h2 className="text-5xl md:text-9xl font-display font-black tracking-tighter text-stone-900 mb-10 max-w-5xl mx-auto leading-[0.85]">
            Uncompromising Standards.<br />
            <span className="text-stone-300">Local Precision.</span>
          </h2>
          <p className="text-stone-500 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-light">
            Managing complex infrastructure projects demands more than just technical skill; it requires cultural fluency and rigorous governance. At L-Pro, we bridge the gap between international engineering standards and on-the-ground execution in Liberia.
            <br className="hidden md:block" />
            From feasibility to handover, we ensure your vision becomes reality.
          </p>
        </div>
      </section>

      {/* Main Sections */}
      <div className="relative z-10">
        <ServicesGrid />
        <ImpactSection />
        <PortfolioStack />
      </div>

      {/* Strategic Approach (Blueprint Section) */}
      <section className="py-24 md:py-48 bg-white rounded-[4rem] relative overflow-hidden -mt-20 z-20 shadow-[-20px_-20px_100px_rgba(0,0,0,0.05)] border-t border-stone-100">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

        {/* Animated Blueprint Detail */}
        <div className="absolute right-0 top-0 w-2/3 h-full pointer-events-none opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 800 800" fill="none" className="translate-x-1/4">
            <circle cx="400" cy="400" r="300" stroke="black" strokeWidth="0.5" strokeDasharray="10 10" />
            <path d="M100 400 H700 M400 100 V700" stroke="black" strokeWidth="0.2" />
            <rect x="250" y="250" width="300" height="300" stroke="black" strokeWidth="1" className="blueprint-path" />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-10">
              <div className="inline-block border-l-4 border-accent pl-6 py-2">
                <h2 className="text-4xl md:text-7xl font-display font-black tracking-tight text-stone-900 leading-tight">
                  Strategic approach. <br />
                  <span className="text-stone-400">Sustainable impact.</span>
                </h2>
              </div>
              <p className="text-stone-500 text-xl leading-relaxed font-light">
                We don't just manage projects; we optimize them. Our methodology ensures that risk is mitigated, stakeholders are engaged, and value is delivered at every stage of the lifecycle.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-4">
              {[
                { title: "Risk Management", desc: "Proactive identification and mitigation of project risks." },
                { id: "01", title: "Feasibility", desc: "In-depth studies to ensure project viability before launch." },
                { title: "Optimization", desc: "Streamlining business processes for maximum efficiency." },
                { title: "Stakeholders", desc: "Managing relationships to ensure smooth project delivery." },
              ].map((item, idx) => (
                <div key={idx} className="group border-b border-stone-100 pb-8 hover:border-accent transition-colors duration-500">
                  <h4 className="text-2xl font-display font-bold text-stone-900 mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform" />
                    {item.title}
                  </h4>
                  <p className="text-stone-500 leading-relaxed text-sm md:text-base group-hover:text-stone-900 transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof (Trust Section) */}
      <section className="py-24 md:py-40 bg-stone-50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-xs font-black uppercase tracking-[0.4em] text-stone-400 mb-6 underline decoration-accent underline-offset-8">Testimonials</div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-stone-900 tracking-tight">Trusted by Industry Leaders</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { text: "L-Pro's PMO services transformed how we handle our infrastructure projects. The level of governance they introduced was world-class.", author: "James K.", role: "Director of Infrastructure" },
              { text: "Their training program is exceptional. Our team is now PMP certified and managing projects with much higher efficiency.", author: "Sarah M.", role: "HR Manager, Telecom Corp" },
              { text: "Detailed feasibility studies that saved us millions. They are the go-to firm for serious evaluations in Liberia.", author: "David T.", role: "Investment Lead" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-12 rounded-[3rem] border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
                <div className="flex text-accent mb-8 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-stone-600 text-lg mb-10 leading-[1.8] font-light">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-2xl p-1 overflow-hidden border border-stone-200">
                    <img src={`https://picsum.photos/seed/${i + 50}/100`} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 text-sm tracking-tight">{t.author}</div>
                    <div className="text-stone-400 text-[10px] font-black uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription CTA - Luxury Style */}
      <section className="px-6 pb-12 bg-stone-50">
        <div className="max-w-[1440px] mx-auto bg-stone-900 rounded-[4rem] py-24 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter">
              Ready to elevate your project?
            </h2>
            <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 font-light">
              Subscribe to our strategic insights or start a conversation <br className="hidden md:block" /> with our consultancy team today.
            </p>

            <div className="max-w-xl mx-auto">
              <form
                name="newsletter"
                method="POST"
                data-netlify="true"
                onSubmit={(e: any) => {
                  e.preventDefault();
                  const btn = e.target.querySelector('button');
                  const email = e.target.querySelector('input[type="email"]').value;
                  const originalText = btn.innerHTML;

                  const encode = (data: any) => {
                    return Object.keys(data)
                      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
                      .join("&");
                  }

                  fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: encode({ "form-name": "newsletter", email: email })
                  })
                    .then(() => {
                      btn.innerHTML = 'Subscribed';
                      btn.style.backgroundColor = '#FBBC05';
                      btn.style.color = '#0c0a09';
                      setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                      }, 3000);
                    })
                    .catch(err => console.error(err));
                }} className="relative group">
                <input type="hidden" name="form-name" value="newsletter" />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Engineering Intelligence Newsletter"
                  className="w-full h-20 pl-8 pr-48 rounded-full bg-white/5 border border-white/10 outline-none text-white placeholder-stone-500 focus:border-accent/50 focus:bg-white/10 transition-all font-light"
                />
                <div className="absolute right-2 top-2 bottom-2">
                  <button type="submit" className="h-full bg-white text-stone-900 px-10 rounded-full font-bold hover:bg-accent transition-all active:scale-95 shadow-xl">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;