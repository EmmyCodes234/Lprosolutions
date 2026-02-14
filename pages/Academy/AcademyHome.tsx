import React from 'react';
import { Play, TrendingUp, Clock, ArrowRight, ShieldCheck, BarChart3, Star, Layers, Users, Activity, Target, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AcademyHome() {
    const navigate = useNavigate();

    return (
        <div className="flex-grow bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-stone-950 p-4 md:p-12 overflow-y-auto min-h-screen">
            <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-4">

                {/* 1. DASHBOARD HEADER */}
                <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-stone-800 pb-8">
                    <div className="space-y-4 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#FFD700]">
                            <Activity className="w-3 h-3" /> Welcome Back
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                            MY LEARNING <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-stone-500">DASHBOARD</span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <MetricCard
                            label="Training Hours"
                            value="12.5"
                            unit="HRS"
                            icon={Clock}
                            trend="+2.4h"
                        />
                        <MetricCard
                            label="Course Progress"
                            value="85"
                            unit="%"
                            icon={Target}
                            trend="+5%"
                            accent
                        />
                    </div>
                </header>

                {/* 2. PRIORITY ACTION (Current Course) */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-pulse"></div>
                        <h3 className="text-stone-400 font-bold uppercase tracking-widest text-xs">Current Course</h3>
                    </div>

                    <div
                        className="w-full bg-stone-900/50 backdrop-blur-sm border border-stone-800 hover:border-[#FFD700]/50 transition-all duration-500 group cursor-pointer relative overflow-hidden rounded-none"
                        onClick={() => navigate('/academy/infrastructure-governance')}
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#FFD700]"></div>

                        <div className="flex flex-col md:flex-row min-h-[350px]">
                            {/* Data Side */}
                            <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-between relative z-10 space-y-8 md:space-y-0">
                                <div>
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="bg-[#FFD700]/10 text-[#FFD700] text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-[#FFD700]/20">
                                            Module 01
                                        </span>
                                        <span className="text-stone-500 text-[10px] uppercase tracking-widest font-mono">
                                            // IN PROGRESS
                                        </span>
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-[#FFD700] transition-colors">
                                        Infrastructure Governance: <br />
                                        PPCC & World Bank ESF
                                    </h2>

                                    <p className="text-stone-400 max-w-lg mb-8 text-sm leading-relaxed">
                                        Master the synchronization of international environmental standards with Liberian statutory procurement law.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="w-full h-0.5 bg-stone-800 relative">
                                        <div className="absolute left-0 top-0 h-full bg-[#FFD700] w-[15%] shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono text-[#FFD700]">15% COMPLETE</span>
                                        <button className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                                            Resume Course <ChevronRight className="w-4 h-4 text-[#FFD700]" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Visual Side */}
                            <div className="w-full md:w-2/5 relative overflow-hidden hidden md:block border-l border-stone-800">
                                <img
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                                    alt="Course Context"
                                    className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-stone-900/60 mix-blend-multiply"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>

                                <div className="absolute bottom-8 right-8 text-right">
                                    <span className="block text-4xl font-black text-white/10 group-hover:text-[#FFD700]/20 transition-colors">01</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. ASSIGNED COURSES CATALOG */}
                <section>
                    <div className="flex items-center justify-between mb-8 border-b border-stone-800 pb-4">
                        <div className="flex items-center gap-3">
                            <Layers className="w-4 h-4 text-stone-500" />
                            <h3 className="text-stone-400 font-bold uppercase tracking-widest text-xs">My Courses</h3>
                        </div>
                        <button
                            onClick={() => navigate('/academy/courses')}
                            className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-white transition-colors"
                        >
                            View All Courses
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <CourseCard
                            title="Statutory Procurement"
                            category="Legal Framework"
                            status="Locked"
                            icon={ShieldCheck}
                            delay={100}
                        />
                        <CourseCard
                            title="Financial Compliance"
                            category="Audit & Control"
                            status="Locked"
                            icon={BarChart3}
                            delay={200}
                        />
                        <CourseCard
                            title="Project Leadership"
                            category="Executive Skills"
                            status="Locked"
                            icon={Zap}
                            delay={300}
                        />
                    </div>
                </section>

            </div>
        </div>
    );
}

// Sub-components
function MetricCard({ label, value, unit, icon: Icon, trend, accent = false }: { label: string, value: string, unit: string, icon: any, trend: string, accent?: boolean }) {
    return (
        <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 p-6 min-w-[160px] hover:border-stone-700 transition-colors group">
            <div className="flex justify-between items-start mb-4">
                <Icon className={`w-4 h-4 ${accent ? 'text-[#FFD700]' : 'text-stone-500'}`} />
                <span className={`text-[10px] font-mono font-bold ${accent ? 'text-[#FFD700]' : 'text-stone-500'}`}>{trend}</span>
            </div>
            <div>
                <div className="text-2xl font-bold text-white tracking-tight flex items-baseline gap-1">
                    {value} <span className="text-sm text-stone-600 font-mono">{unit}</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mt-1 group-hover:text-stone-300 transition-colors">{label}</div>
            </div>
        </div>
    )
}

function CourseCard({ title, category, status, icon: Icon, delay }: { title: string, category: string, status: string, icon: any, delay: number }) {
    return (
        <div
            className="bg-stone-900/30 border border-stone-800 p-8 hover:bg-stone-900 hover:border-[#FFD700]/30 transition-all cursor-pointer group relative animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="mb-6 flex justify-between items-start">
                <div className="p-3 bg-stone-950 border border-stone-800 rounded-sm group-hover:border-[#FFD700]/30 transition-colors">
                    <Icon className="w-5 h-5 text-stone-500 group-hover:text-[#FFD700] transition-colors" />
                </div>
                <LockIcon status={status} />
            </div>

            <div className="text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-2">{category}</div>
            <h4 className="text-lg font-bold text-stone-300 group-hover:text-white transition-colors mb-4">{title}</h4>

            <div className="w-full h-px bg-stone-800 group-hover:bg-stone-700 transition-colors"></div>
        </div>
    )
}

function LockIcon({ status }: { status: string }) {
    if (status === 'Locked') {
        return <div className="text-[10px] font-mono font-bold text-stone-700 uppercase flex items-center gap-1"><span className="w-1.5 h-1.5 bg-stone-800 rounded-full"></span> Locked</div>
    }
    return null;
}
