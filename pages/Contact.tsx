import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
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
    <div className="w-full bg-[#f5f5f4] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-12 md:py-24 pt-24 md:pt-32">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-sm">

          {/* Form Side */}
          <div className="p-8 md:p-16 order-2 lg:order-1 relative">
            {formState === 'success' ? (
              <div className="h-full flex flex-col justify-center items-center text-center animate-reveal-up">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-stone-900 mb-6">
                  <Mail size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
                <p className="text-stone-500 max-w-sm">Thank you for reaching out. An expert from our team will contact you within 24 hours.</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-8 text-stone-900 font-bold border-b border-stone-900 pb-1"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 mb-2">Let’s Build Something Lasting.</h2>
                <p className="text-stone-500 mb-8 md:mb-10 text-sm md:text-base">Whether you have an RFP ready or are just exploring the feasibility of a new idea, our team is ready to listen.</p>

                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">First Name</label>
                      <input
                        required
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-[#f5f5f4] rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Last Name</label>
                      <input
                        required
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-[#f5f5f4] rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">Email</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#f5f5f4] rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">Service of Interest</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#f5f5f4] rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-200 text-stone-500"
                    >
                      <option>PMO Services</option>
                      <option>Engineering & Construction</option>
                      <option>Corporate Training</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#f5f5f4] rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-200"
                    ></textarea>
                  </div>

                  <button
                    disabled={formState === 'submitting'}
                    className="w-full bg-stone-900 text-white font-bold py-4 rounded-full hover:bg-stone-800 transition-colors disabled:opacity-50"
                  >
                    {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Info Side */}
          <div className="bg-stone-900 p-8 md:p-16 text-white order-1 lg:order-2 flex flex-col justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-6">Contact Information</h3>
              <ul className="space-y-6 text-sm md:text-base">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Headquarters</p>
                    <p className="text-stone-400">123 Tubman Boulevard,<br />Sinkor, Monrovia, Liberia</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Global Line</p>
                    <p className="text-stone-400">+231 77 000 0000</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-stone-400">partnerships@l-pro.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Office Hours</p>
                    <p className="text-stone-400">Mon - Fri, 8:00 AM – 6:00 PM GMT</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-12">
              <a
                href="https://www.google.com/maps/search/Tubman+Boulevard,+Sinkor,+Monrovia,+Liberia"
                target="_blank"
                rel="noopener noreferrer"
                className="h-48 w-full rounded-3xl bg-white/5 overflow-hidden relative block group"
              >
                <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1400&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" alt="Map" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white text-stone-900 px-6 py-2 rounded-full text-xs font-bold shadow-xl group-hover:scale-105 transition-transform">View on Google Maps</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;