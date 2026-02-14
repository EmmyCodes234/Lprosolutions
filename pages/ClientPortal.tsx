import React, { useState, useEffect } from 'react';
import { LayoutDashboard, TrendingUp, AlertCircle, CheckCircle, Clock, Download, Image as ImageIcon, ChevronRight, Projector as Project, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ProjectData {
    id: string;
    name: string;
    schedule_status: string;
    budget_status: string;
    risk_factor: string;
    physical_progress: number;
    financial_burn: number;
    last_brief_url: string;
}

export default function ClientPortal() {
    const [project, setProject] = useState<ProjectData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .limit(1)
                .single();

            if (data) {
                setProject(data);
            } else {
                // Mock data if table is empty
                setProject({
                    id: '1',
                    name: 'Sinkor Coastal Highway Rehab',
                    schedule_status: 'On Track',
                    budget_status: 'Healthy',
                    risk_factor: 'Elevated',
                    physical_progress: 42,
                    financial_burn: 38,
                    last_brief_url: '#'
                });
            }
            setLoading(false);
        };

        fetchProject();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-950 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-800 border-t-[#FFD700]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-950 p-4 md:p-8 font-sans text-stone-200">
            {/* Client Header */}
            <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-stone-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{project?.name}</h1>
                    <p className="text-stone-400 text-sm flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${project?.schedule_status === 'On Track' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        LIVE EXECUTIVE OVERVIEW
                    </p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                    <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">Managed By</p>
                    <div className="flex items-center gap-2 justify-end">
                        <Shield className="w-4 h-4 text-[#FFD700]" />
                        <p className="text-[#FFD700] font-bold tracking-wider">L-PRO SOLUTIONS</p>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Project Health (RAG) */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl group hover:border-stone-700 transition-all duration-500">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-xs text-stone-400 uppercase tracking-widest">Schedule</p>
                            <Clock className="w-5 h-5 text-[#FFD700] group-hover:rotate-12 transition-transform" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{project?.schedule_status}</h3>
                        <p className="text-sm text-stone-500">Milestone 3 due in 14 days</p>
                    </div>

                    <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl group hover:border-stone-700 transition-all duration-500">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-xs text-stone-400 uppercase tracking-widest">Budget</p>
                            <TrendingUp className="w-5 h-5 text-green-500 group-hover:-translate-y-1 transition-transform" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{project?.budget_status}</h3>
                        <p className="text-sm text-stone-500">-2.4% variance to baseline</p>
                    </div>

                    <div className="bg-stone-900 border border-red-900/30 p-6 rounded-xl relative overflow-hidden group hover:border-red-900/50 transition-all duration-500">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-xs text-stone-400 uppercase tracking-widest">Risk Factor</p>
                            <AlertCircle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{project?.risk_factor}</h3>
                        <p className="text-sm text-red-400">Supply chain delay: Steel</p>
                    </div>
                </div>

                {/* Burn Rate vs Progress */}
                <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl flex flex-col justify-center">
                    <h3 className="text-sm font-medium text-stone-300 mb-6 uppercase tracking-widest">Completion Metrics</h3>

                    <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-stone-400">Physical Progress</span>
                            <span className="text-white font-bold">{project?.physical_progress}%</span>
                        </div>
                        <div className="w-full bg-stone-950 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-[#FFD700] h-2 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${project?.physical_progress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-stone-400">Financial Burn</span>
                            <span className="text-white font-bold">{project?.financial_burn}%</span>
                        </div>
                        <div className="w-full bg-stone-950 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${project?.financial_burn}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Latest Field Intel */}
                <div className="lg:col-span-3 bg-stone-900 border border-stone-800 rounded-xl overflow-hidden mt-4">
                    <div className="px-6 py-4 border-b border-stone-800 bg-stone-900/50 flex justify-between items-center">
                        <h3 className="font-medium text-sm text-stone-200 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-[#FFD700]" /> Verified Field Intel
                        </h3>
                        <button className="text-xs text-stone-400 hover:text-white flex items-center gap-1 transition-colors">
                            <Download className="w-3 h-3" /> Export Executive Brief
                        </button>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="aspect-video bg-stone-950 rounded-lg border border-stone-800 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <span className="text-xs text-white border border-white/30 px-3 py-1 rounded-full backdrop-blur-sm">View Full Res</span>
                            </div>
                            <div className="absolute bottom-2 left-2 text-[10px] bg-black/80 px-2 py-1 rounded text-stone-300 uppercase tracking-widest">North Sector - 14 Feb</div>
                        </div>
                        <div className="aspect-video bg-stone-950 rounded-lg border border-stone-800 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <span className="text-xs text-white border border-white/30 px-3 py-1 rounded-full backdrop-blur-sm">View Full Res</span>
                            </div>
                            <div className="absolute bottom-2 left-2 text-[10px] bg-black/80 px-2 py-1 rounded text-stone-300 uppercase tracking-widest">Foundation Pour</div>
                        </div>
                        <div className="aspect-video bg-stone-950 rounded-lg border border-stone-800 relative group overflow-hidden flex flex-col items-center justify-center text-stone-600 hover:text-stone-400 transition-colors cursor-pointer">
                            <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                            <span className="text-xs uppercase tracking-widest">View Archive (42)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Tag */}
            <footer className="max-w-6xl mx-auto mt-12 text-center border-t border-stone-800 pt-8 pb-12 opacity-50">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Proprietary Executive Dashboard &copy; 2026 L-Pro Solutions. All Rights Reserved.
                </p>
            </footer>
        </div>
    );
}
