import React from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, MessageSquare, Globe, ArrowUpRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Contact: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialService = queryParams.get('service') || 'PMO Services';
  const initialProject = queryParams.get('project');

  const [formState, setFormState] = React.useState('idle'); // idle, submitting, success
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    service: initialService,
    message: initialProject ? `Inquiry regarding case study: ${initialProject}` : ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    const encode = (data: any) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formData })
    })
      .then(() => {
        setFormState('success');
      })
      .catch(error => {
        console.error(error);
        setFormState('idle');
        alert("Submission failed. Please try again.");
      });
  };

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />

      {/* Hero Narrative Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="inline-block bg-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-stone-950 mb-8 animate-revealUp">
            Connect With L-Pro
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter text-stone-950 leading-[0.85] mb-12 animate-revealUp animation-delay-100">
            Let's Define <br />
            <span className="text-stone-300">The Horizon.</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-500 max-w-2xl font-light leading-relaxed animate-revealUp animation-delay-200">
            Whether you're launching a national infrastructure project or seeking technical advisory, our engineering partners are ready to engage.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-start">

          {/* Information & Presence Corridor (Left) */}
          <div className="lg:col-span-5 space-y-16 animate-revealUp animation-delay-300">

            {/* Presence Cards */}
            <div className="space-y-12">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-stone-400 mb-8">Regional Headquarters</h3>
                <div className="group cursor-pointer">
                  <p className="text-2xl font-display font-bold text-stone-900 mb-2 group-hover:text-accent transition-colors">Sinkor, Monrovia</p>
                  <p className="text-stone-500 text-lg leading-relaxed">
                    123 Tubman Boulevard,<br />
                    Lower Sinkor, Liberia
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-stone-400 group-hover:text-stone-900 transition-colors">
                    <span className="text-xs font-black uppercase tracking-widest">View Map</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-stone-400 mb-6">Direct Channels</h3>
                  <div className="space-y-4">
                    <a href="mailto:partnerships@l-pro.com" className="block text-stone-900 hover:text-accent font-bold text-lg transition-colors">partnerships@l-pro.com</a>
                    <a href="tel:+231770000000" className="block text-stone-900 hover:text-accent font-bold text-lg transition-colors">+231 77 000 0000</a>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-stone-400 mb-6">Operational Hours</h3>
                  <p className="text-stone-900 font-bold block">Monday — Friday</p>
                  <p className="text-stone-500">08:00 — 18:00 GMT</p>
                </div>
              </div>
            </div>

            {/* Immersive Map Visual */}
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1400&auto=format&fit=crop"
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                alt="Monrovia Headquarters"
              />
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-1000" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-stone-900 text-xs font-black uppercase tracking-widest">Office Open</span>
                </div>
              </div>
            </div>

          </div>

          {/* Consultation Portal (Right) */}
          <div className="lg:col-span-7 bg-white rounded-[4rem] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-stone-100 animate-revealUp animation-delay-400">
            {formState === 'success' ? (
              <div className="py-24 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-stone-950 rounded-full flex items-center justify-center text-accent mb-8 shadow-2xl">
                  <Mail size={40} />
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-stone-900 mb-6 tracking-tight">Communication Logged.</h2>
                <p className="text-stone-500 text-lg max-w-sm mb-12">An L-Pro technical advisor will review your inquiry and respond within 24 operational hours.</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="bg-stone-950 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-stone-800 transition-all group"
                >
                  Send New Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-stone-900 mb-6 tracking-tight">Project Consultation</h2>
                  <p className="text-stone-500 text-lg leading-relaxed">
                    Initiate your inquiry below. For urgent procurement or emergency infrastructure needs, please use our direct global line.
                  </p>
                </div>

                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <input type="hidden" name="form-name" value="contact" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Identity: First Name</label>
                      <input
                        required
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-stone-50 border-b-2 border-stone-100 px-6 py-4 outline-none focus:border-stone-900 transition-colors font-bold text-stone-900 placeholder:text-stone-300 placeholder:font-normal"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Identity: Last Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-stone-50 border-b-2 border-stone-100 px-6 py-4 outline-none focus:border-stone-900 transition-colors font-bold text-stone-900 placeholder:text-stone-300 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Electronic Mail</label>
                    <input
                      required
                      type="email"
                      placeholder="email@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-50 border-b-2 border-stone-100 px-6 py-4 outline-none focus:border-stone-900 transition-colors font-bold text-stone-900 placeholder:text-stone-300 placeholder:font-normal"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Strategic Area</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-stone-50 border-b-2 border-stone-100 px-6 py-4 outline-none focus:border-stone-900 transition-colors font-bold text-stone-900 appearance-none cursor-pointer"
                    >
                      <option>PMO Services</option>
                      <option>Engineering & Construction</option>
                      <option>Corporate Training</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Inquiry Narrative</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe your project goals or technical requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-stone-50 border-b-2 border-stone-100 px-6 py-4 outline-none focus:border-stone-900 transition-colors font-bold text-stone-900 placeholder:text-stone-300 placeholder:font-normal resize-none"
                    ></textarea>
                  </div>

                  <button
                    disabled={formState === 'submitting'}
                    className="w-full bg-stone-950 text-white font-black uppercase tracking-[0.2em] text-xs py-6 rounded-full hover:bg-stone-800 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] disabled:opacity-50 flex items-center justify-center gap-4 group"
                  >
                    {formState === 'submitting' ? (
                      'Processing Inquiry...'
                    ) : (
                      <>
                        Initiate Consultation
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;