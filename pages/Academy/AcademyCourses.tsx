import React, { useState } from 'react';
import { Search, Filter, Lock, Play, MoreVertical, ShieldCheck, Clock, Award, CheckCircle, BarChart3, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AcademyCourses() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');

    return (
        <div className="flex-grow bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-stone-950 p-4 md:p-12 overflow-y-auto min-h-screen">
            <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">

                {/* 1. HEADER & CONTROLS */}
                <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-stone-800 pb-8">
                    <div className="space-y-4 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500">
                            <ShieldCheck className="w-3 h-3 text-[#FFD700]" /> Available Courses
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                            COURSE <br />
                            <span className="text-stone-500">LIBRARY</span>
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <div className="relative group w-full md:w-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 group-focus-within:text-[#FFD700] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="bg-stone-900/50 border border-stone-800 text-sm text-white pl-12 pr-4 py-3 w-full md:w-[360px] hover:border-stone-700 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] focus:outline-none transition-all placeholder:text-stone-600"
                            />
                        </div>
                        <div className="flex flex-wrap bg-stone-900/50 border border-stone-800 p-1 gap-1">
                            {['all', 'active', 'completed'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${filter === f
                                        ? 'bg-[#FFD700] text-black shadow-lg shadow-[#FFD700]/20'
                                        : 'text-stone-500 hover:text-white hover:bg-stone-800'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {/* 2. COURSE GRID */}
                <div className="grid grid-cols-1 gap-6">

                    {/* Active Course (Featured) */}
                    <CourseCard
                        id="1"
                        title="Infrastructure Governance: PPCC & World Bank ESF"
                        description="Synchronizing international environmental standards with Liberian statutory procurement law."
                        tags={['Legal Framework', 'Compliance']}
                        progress={15}
                        duration="8 Sections"
                        status="In Progress"
                        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                        onNavigate={() => navigate('/academy/infrastructure-governance')}
                    />

                    {/* Locked Courses */}
                    <CourseCard
                        id="2"
                        title="Advanced Financial Audit Standards"
                        description="Mastering the audit lifecycle for government concessions and large-scale infrastructure projects."
                        tags={['Finance', 'Audit']}
                        progress={0}
                        duration="12 Sections"
                        status="Locked"
                        locked
                    />

                    <CourseCard
                        id="3"
                        title="Executive Leadership in Public Sector"
                        description="Strategic decision framework for high-stakes public sector management."
                        tags={['Leadership', 'Management']}
                        progress={0}
                        duration="6 Sections"
                        status="Locked"
                        locked
                    />
                    <CourseCard
                        id="4"
                        title="Digital Transformation Strategy"
                        description="Implementing e-government solutions and digital procurement systems."
                        tags={['Tech', 'Strategy']}
                        progress={0}
                        duration="10 Sections"
                        status="Locked"
                        locked
                    />

                </div>
            </div>
        </div>
    );
}

function CourseCard({ id, title, description, tags, progress, duration, status, image, locked = false, onNavigate }: any) {
    return (
        <div
            onClick={!locked ? onNavigate : undefined}
            className={`
                group relative border transition-all duration-300 flex flex-col md:flex-row overflow-hidden min-h-[220px]
                ${locked
                    ? 'bg-stone-900/20 border-stone-800/50 opacity-60 grayscale hover:opacity-80 cursor-not-allowed'
                    : 'bg-stone-900/40 border-stone-800 hover:border-[#FFD700]/50 hover:bg-stone-900/60 cursor-pointer shadow-lg shadow-black/20'}
            `}
        >
            {/* Hover Glow Effect */}
            {!locked && <div className="absolute top-0 left-0 w-0.5 h-full bg-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}

            {/* Image Section */}
            {image && !locked && (
                <div className="w-full md:w-1/4 relative overflow-hidden hidden md:block border-r border-stone-800">
                    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply"></div>
                </div>
            )}

            {/* Locked Visual Placeholder */}
            {locked && (
                <div className="w-full md:w-1/4 relative hidden md:flex items-center justify-center border-r border-stone-800/50 bg-stone-950/30">
                    <Lock className="w-8 h-8 text-stone-700" />
                </div>
            )}

            {/* Content Section */}
            <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-2">
                            {tags.map((tag: string) => (
                                <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-stone-500 border border-stone-800 px-2 py-1 bg-stone-950">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            {locked ? (
                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-stone-600">
                                    <Lock className="w-3 h-3" /> Locked
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#FFD700]">
                                    <Play className="w-3 h-3 fill-current" /> Active
                                </span>
                            )}
                        </div>
                    </div>

                    <h3 className={`text-2xl font-bold mb-2 ${locked ? 'text-stone-500' : 'text-stone-200 group-hover:text-white transition-colors'}`}>
                        {title}
                    </h3>
                    <p className="text-stone-500 text-sm max-w-2xl leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="flex items-center gap-6 mt-8 pt-6 border-t border-stone-800/50">
                    <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                        <Clock className="w-3 h-3" /> {duration}
                    </div>

                    {!locked && (
                        <div className="flex-1 max-w-xs flex items-center gap-3">
                            <div className="h-1 flex-1 bg-stone-800 rounded-full overflow-hidden">
                                <div className="h-full bg-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.5)]" style={{ width: `${progress}%` }}></div>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-[#FFD700]">{progress}%</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
