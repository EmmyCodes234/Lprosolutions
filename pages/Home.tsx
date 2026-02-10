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
    <div className="w-full">
      {/* Dynamic Hero Slider */}
      <HeroSlider />

      {/* Intro Text */}
      <section className="py-16 md:py-24 px-6 bg-[#f5f5f4]">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-3xl md:text-6xl font-semibold tracking-tight text-stone-900 mb-6 md:mb-8 max-w-4xl mx-auto leading-tight">
            Uncompromising Standards.<br />
            Local Precision.
          </h2>
          <p className="text-stone-500 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
            Managing complex infrastructure projects demands more than just technical skill; it requires cultural fluency and rigorous governance. At L-Pro, we bridge the gap between international engineering standards and on-the-ground execution in Liberia. From feasibility to handover, we ensure your vision becomes reality—on time, on budget, and up to code.
          </p>
        </div>
      </section>

      {/* Services Grid (Dark Section) */}
      <ServicesGrid />

      {/* Impact & Partners (Dark Section continued) */}
      <ImpactSection />

      {/* Selected Works (Stacked Cards) */}
      <PortfolioStack />

      {/* Feature List with Blueprint Background */}
      <section className="py-16 md:py-24 bg-white rounded-t-[3rem] relative overflow-hidden -mt-12 z-20 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        {/* SVG Blueprint Animation Background */}
        <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="none">
            <path d="M50 50 L350 50 L350 350 L50 350 Z" className="stroke-black stroke-[2] fill-none blueprint-path" />
            <path d="M50 50 L350 350 M350 50 L50 350" className="stroke-black stroke-[1] fill-none blueprint-path" style={{ animationDelay: '1s' }} />
            <circle cx="200" cy="200" r="100" className="stroke-black stroke-[1] fill-none blueprint-path" style={{ animationDelay: '2s' }} />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 mb-6">
                Strategic approach. <br />
                Sustainable impact.
              </h2>
              <p className="text-stone-500 text-base md:text-lg">
                We don't just manage projects; we optimize them. Our methodology ensures that risk is mitigated, stakeholders are engaged, and value is delivered at every stage of the lifecycle.
              </p>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {[
                { title: "Risk Management", desc: "Proactive identification and mitigation of project risks." },
                { title: "Feasibility", desc: "In-depth studies to ensure project viability before launch." },
                { title: "Optimization", desc: "Streamlining business processes for maximum efficiency." },
                { title: "Stakeholders", desc: "Managing relationships to ensure smooth project delivery." },
              ].map((item, idx) => (
                <div key={idx} className="group hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-stone-900 mb-4 group-hover:bg-accent transition-colors">
                    <CheckCircle2 size={20} />
                  </div>
                  <h4 className="text-xl font-bold text-stone-900 mb-2">{item.title}</h4>
                  <p className="text-stone-500 leading-relaxed text-sm md:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Trusted by industry leaders</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "L-Pro's PMO services transformed how we handle our infrastructure projects. The level of governance they introduced was world-class.", author: "James K.", role: "Director of Infrastructure" },
              { text: "Their training program is exceptional. Our team is now PMP certified and managing projects with much higher efficiency.", author: "Sarah M.", role: "HR Manager, Telecom Corp" },
              { text: "Detailed feasibility studies that saved us millions. They are the go-to firm for serious evaluations in Liberia.", author: "David T.", role: "Investment Lead" }
            ].map((t, i) => (
              <div key={i} className="bg-[#f5f5f4] p-8 rounded-[2rem] hover:shadow-xl transition-shadow duration-300">
                <div className="flex text-accent mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-stone-800 text-base md:text-lg mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-stone-300 rounded-full overflow-hidden">
                    <img src={`https://picsum.photos/seed/${i + 50}/100`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 text-sm">{t.author}</div>
                    <div className="text-stone-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yellow CTA Section */}
      <section className="px-4 md:px-6 pb-6 bg-white">
        <div className="bg-accent rounded-[3rem] py-16 md:py-20 px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6 tracking-tight">
            Ready to elevate your project?
          </h2>
          <p className="text-stone-900/80 text-base md:text-lg max-w-xl mx-auto mb-10">
            Subscribe to our newsletter for insights or contact us to discuss your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <script>{`
              function handleSubscribe(e) {
                e.preventDefault();
                const btn = e.target.querySelector('button');
                const originalText = btn.innerText;
                btn.innerText = 'Subscribed!';
                btn.classList.add('bg-stone-700');
                setTimeout(() => {
                  btn.innerText = originalText;
                  btn.classList.remove('bg-stone-700');
                }, 3000);
              }
            `}</script>
            <form
              name="newsletter"
              method="POST"
              data-netlify="true"
              onSubmit={(e: any) => {
                e.preventDefault();
                const btn = e.target.querySelector('button');
                const email = e.target.querySelector('input[type="email"]').value;
                const originalText = btn.innerText;

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
                    btn.innerText = 'Subscribed!';
                    btn.style.backgroundColor = '#44403c';
                    setTimeout(() => {
                      btn.innerText = originalText;
                      btn.style.backgroundColor = '';
                    }, 3000);
                  })
                  .catch(err => console.error(err));
              }} className="flex flex-col sm:flex-row gap-4 w-full">
              <input type="hidden" name="form-name" value="newsletter" />
              <input
                required
                name="email"
                type="email"
                placeholder="Email address"
                className="flex-1 px-6 py-4 rounded-full bg-white border-none outline-none text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-stone-900 w-full"
              />
              <MagneticButton>
                <button type="submit" className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold hover:bg-stone-800 transition-colors w-full sm:w-auto">
                  Subscribe
                </button>
              </MagneticButton>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;