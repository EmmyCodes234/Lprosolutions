import React from 'react';
import { ArrowRight, Download, Award, Briefcase, GraduationCap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Founder: React.FC = () => {
    return (
        <div className="w-full bg-stone-50 font-sans text-stone-900 overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[85vh] md:h-screen min-h-[600px] md:min-h-[800px] flex items-end pb-16 md:pb-32 px-4 md:px-6">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/founder/hero.jpg"
                        alt="James Monbo Lynch"
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent opacity-90" />
                </div>

                <div className="relative z-10 max-w-[1440px] mx-auto w-full">
                    <div className="inline-block bg-accent px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-8 animate-revealUp">
                        Founder & Lead Consultant
                    </div>
                    <h1 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter text-white leading-[0.9] mb-8 animate-revealUp animation-delay-100">
                        James Monbo <br />
                        <span className="text-stone-400">Lynch, PMP®</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-stone-300 max-w-2xl font-light leading-relaxed animate-revealUp animation-delay-200">
                        Delivering large-scale infrastructure and governance solutions for Liberia’s donor-funded and public sectors.
                    </p>
                </div>
            </section>

            {/* Professional Manifesto */}
            <section className="py-16 md:py-32 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-stone-900 mb-8 md:mb-12 leading-tight">
                        "Sustainable development requires more than just capital. It demands <span className="text-accent">rigorous planning</span>, <span className="text-accent">governance</span>, and <span className="text-accent">unyielding execution</span>."
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-base md:text-lg text-stone-600 leading-relaxed">
                        <p>
                            With over 15 years of experience, James Monbo Lynch has dedicated his career to bridging the gap between strategic vision and on-the-ground reality in Liberia. From managing multi-million dollar contracts for ArcelorMittal to overseeing national ICT infrastructure for the Universal Access Fund, his focus is singular: results.
                        </p>
                        <p>
                            As a Project Management Professional (PMP®) and active trainer, he doesn't just lead projects — he builds capacity. His philosophy centers on establishing systems that outlast the tenure of any single contract, ensuring that Liberia's infrastructure serves its people for generations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Competencies Grid */}
            <section className="py-16 md:py-24 bg-stone-100 px-4 md:px-6">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 md:gap-8">
                        <div>
                            <div className="text-accent font-bold uppercase tracking-widest text-xs mb-2 md:mb-4">Expertise</div>
                            <h3 className="text-3xl md:text-5xl font-display font-bold text-stone-900">Core Competencies</h3>
                        </div>
                        <div className="max-w-md text-stone-500">
                            A multidisciplinary approach aimed at de-risking complex projects in challenging environments.
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {[
                            { title: "Project Planning & Implementation", icon: <Briefcase /> },
                            { title: "Budgeting & Financial Oversight", icon: <Award /> },
                            { title: "Construction Management", icon: <Briefcase /> },
                            { title: "Risk & Issue Management", icon: <Award /> },
                            { title: "Stakeholder Coordination", icon: <Globe /> },
                            { title: "Monitoring & Evaluation", icon: <Award /> },
                            { title: "Donor & Gov. Compliance", icon: <Briefcase /> },
                            { title: "Capacity Building", icon: <GraduationCap /> },
                        ].map((skill, idx) => (
                            <div key={idx} className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-xl group">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 group-hover:bg-accent group-hover:text-white transition-colors mb-3 md:mb-6">
                                    {React.cloneElement(skill.icon as React.ReactElement, { size: 18 })}
                                </div>
                                <h4 className="text-sm md:text-xl font-bold text-stone-900 group-hover:text-accent transition-colors leading-snug">
                                    {skill.title}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Timeline */}
            <section className="py-16 md:py-32 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-accent font-bold uppercase tracking-widest text-xs mb-2 md:mb-4">Track Record</div>
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-stone-900 mb-10 md:mb-16">Professional History</h3>

                    <div className="space-y-10 md:space-y-16 border-l-2 border-stone-200 pl-6 md:pl-16 relative">
                        {/* Role 1 */}
                        <div className="relative group">
                            <div className="absolute -left-[33px] md:-left-[73px] top-2 w-4 h-4 md:w-5 md:h-5 bg-white border-[3px] md:border-4 border-accent rounded-full group-hover:scale-125 transition-transform" />
                            <span className="text-xs md:text-sm font-bold text-stone-400 uppercase tracking-widest mb-1 md:mb-2 block">Feb 2019 – Present</span>
                            <h4 className="text-2xl md:text-3xl font-display font-bold text-stone-900 mb-1 leading-tight">Project Coordinator</h4>
                            <div className="text-base md:text-xl text-stone-600 mb-4 md:mb-6">Universal Access Fund (UAF), Liberia</div>
                            <ul className="space-y-3 text-stone-600 list-disc list-outside ml-4">
                                <li>Led planning & monitoring of national ICT infrastructure projects.</li>
                                <li>Managed $2.5M contract with KNET Ltd (Ghana) for rural telephony.</li>
                                <li>Supervised construction of 15 solar-powered base stations across 14 counties.</li>
                                <li>Connected 80,000+ rural residents to mobile networks.</li>
                            </ul>
                        </div>

                        {/* Role 2 */}
                        <div className="relative group">
                            <div className="absolute -left-[33px] md:-left-[73px] top-2 w-4 h-4 md:w-5 md:h-5 bg-white border-[3px] md:border-4 border-stone-300 group-hover:border-accent rounded-full transition-colors" />
                            <span className="text-xs md:text-sm font-bold text-stone-400 uppercase tracking-widest mb-1 md:mb-2 block">2023 – Present</span>
                            <h4 className="text-2xl md:text-3xl font-display font-bold text-stone-900 mb-1 leading-tight">Construction Project Consultant</h4>
                            <div className="text-base md:text-xl text-stone-600 mb-4 md:mb-6">ECHO Construction (for ArcelorMittal Liberia)</div>
                            <ul className="space-y-3 text-stone-600 list-disc list-outside ml-4">
                                <li>Provide leadership for AML engagements &gt;$1M in value.</li>
                                <li>Lead scope, schedule, and cost control for industrial construction.</li>
                                <li>Coordinate contractors and engineers for HSE compliance and quality assurance.</li>
                            </ul>
                        </div>

                        {/* Role 3 */}
                        <div className="relative group">
                            <div className="absolute -left-[33px] md:-left-[73px] top-2 w-4 h-4 md:w-5 md:h-5 bg-white border-[3px] md:border-4 border-stone-300 group-hover:border-accent rounded-full transition-colors" />
                            <span className="text-xs md:text-sm font-bold text-stone-400 uppercase tracking-widest mb-1 md:mb-2 block">Part-time</span>
                            <h4 className="text-2xl md:text-3xl font-display font-bold text-stone-900 mb-1 leading-tight">Lead Facilitator (Project Management)</h4>
                            <div className="text-base md:text-xl text-stone-600 mb-4 md:mb-6">Banking Institute of Liberia (BIL)</div>
                            <p className="text-stone-600">
                                Deliver instructor-led training in PMP methodologies, risk management, and stakeholder engagement for Liberia’s banking sector professionals.
                            </p>
                        </div>

                        {/* Role 4 */}
                        <div className="relative group">
                            <div className="absolute -left-[33px] md:-left-[73px] top-2 w-4 h-4 md:w-5 md:h-5 bg-white border-[3px] md:border-4 border-stone-300 group-hover:border-accent rounded-full transition-colors" />
                            <span className="text-xs md:text-sm font-bold text-stone-400 uppercase tracking-widest mb-1 md:mb-2 block">Nov 2016 – May 2018</span>
                            <h4 className="text-2xl md:text-3xl font-display font-bold text-stone-900 mb-1 leading-tight">Project Coordinator</h4>
                            <div className="text-base md:text-xl text-stone-600 mb-4 md:mb-6">Liberia Electricity Corporation (LEC) / WAPP</div>
                            <ul className="space-y-3 text-stone-600 list-disc list-outside ml-4">
                                <li>Coordinated WAPP Cross-Border Transmission Project activities.</li>
                                <li>Supervised 40+ technical staff maintaining cross-border power lines.</li>
                                <li>Facilitated electricity delivery to 27,000+ households.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Education & Certs */}
            <section className="py-16 md:py-24 bg-stone-900 text-white px-4 md:px-6">
                <div className="max-w-[1440px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h3 className="text-2xl md:text-4xl font-display font-bold mb-6 md:mb-8">Education & Credentials</h3>
                            <div className="space-y-8">
                                <div>
                                    <div className="text-accent font-bold text-sm tracking-widest uppercase mb-1">Current</div>
                                    <div className="text-xl font-bold">MSc (Candidate), Sustainable Development</div>
                                    <div className="text-stone-400">Cuttington University Graduate School (2024–2026)</div>
                                </div>
                                <div>
                                    <div className="text-stone-500 font-bold text-sm tracking-widest uppercase mb-1">Certification</div>
                                    <div className="text-xl font-bold">Project Management Professional (PMP®)</div>
                                    <div className="text-stone-400">Project Management Institute</div>
                                </div>
                                <div>
                                    <div className="text-stone-500 font-bold text-sm tracking-widest uppercase mb-1">Degree</div>
                                    <div className="text-xl font-bold">BSc, Public Administration</div>
                                    <div className="text-stone-400">AME Zion University</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[250px] md:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden group">
                            <img
                                src="/founder/speaking.jpg"
                                alt="James Monbo Lynch Speaking"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors" />
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Founder;
