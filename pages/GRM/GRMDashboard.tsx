import React, { useEffect, useState } from 'react';
import { Shield, LayoutDashboard, Search, Filter, Download, CheckCircle2, Clock, AlertTriangle, MoreHorizontal, ExternalLink, FileText, ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';

interface Grievance {
    id: string;
    complainant_name: string;
    contact_info: string;
    issue_category: string;
    description: string;
    status: 'Submitted' | 'Under Review' | 'Resolved';
    created_at: string;
    evidence_url?: string;
}

const GRMDashboard: React.FC = () => {
    const [grievances, setGrievances] = useState<Grievance[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string | 'all'>('all');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        fetchGrievances();
    }, []);

    const fetchGrievances = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('grievances')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching grievances:', error);
        else setGrievances(data || []);
        setIsLoading(false);
    };

    const updateStatus = async (id: string, newStatus: Grievance['status']) => {
        const { error } = await supabase
            .from('grievances')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) console.error('Error updating status:', error);
        else fetchGrievances();
    };

    const exportToPDF = () => {
        const pdf = new jsPDF();
        const activeGrievances = grievances.filter(g =>
            (selectedStatus === 'all' || g.status === selectedStatus) &&
            (g.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (g.complainant_name || '').toLowerCase().includes(searchTerm.toLowerCase()))
        );

        pdf.setFontSize(22);
        pdf.setTextColor(220, 38, 38); // Accent Red
        pdf.text('L-Pro Solutions: Governance Audit Report', 20, 20);

        pdf.setFontSize(12);
        pdf.setTextColor(100);
        pdf.text(`Generated on: ${format(new Date(), 'PPpp')}`, 20, 30);
        pdf.text(`Protocol: GRM-Compliance-V2`, 20, 38);

        pdf.setLineWidth(0.5);
        pdf.line(20, 45, 190, 45);

        let y = 60;
        activeGrievances.forEach((g, i) => {
            if (y > 250) {
                pdf.addPage();
                y = 20;
            }

            pdf.setFontSize(14);
            pdf.setTextColor(0);
            pdf.text(`${i + 1}. ${g.issue_category} - ${g.status}`, 20, y);

            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Complainant: ${g.complainant_name || 'Anonymous'} | Date: ${format(new Date(g.created_at), 'PP')}`, 20, y + 7);

            pdf.setTextColor(80);
            const splitText = pdf.splitTextToSize(`Description: ${g.description}`, 160);
            pdf.text(splitText, 20, y + 15);

            y += 25 + (splitText.length * 5);
            pdf.line(20, y - 5, 60, y - 5);
            y += 10;
        });

        pdf.save(`LPro_Audit_Report_${format(new Date(), 'yyyyMMdd')}.pdf`);
    };

    const filteredGrievances = grievances.filter(g =>
        (selectedStatus === 'all' || g.status === selectedStatus) &&
        (g.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (g.complainant_name || '').toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Submitted': return <Clock className="w-4 h-4 text-orange-500" />;
            case 'Under Review': return <AlertTriangle className="w-4 h-4 text-blue-500" />;
            case 'Resolved': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            default: return null;
        }
    };

    const SidebarContent = () => (
        <>
            <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-black/20 transform -rotate-3 transition-transform group-hover:rotate-0">
                    <Shield className="w-6 h-6 text-stone-900" />
                </div>
                <div>
                    <h2 className="font-display font-black tracking-tight text-xl uppercase leading-none">Admin</h2>
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">L-Pro Solutions</span>
                </div>
            </div>

            <nav className="space-y-2 flex-grow">
                <button className="w-full flex items-center gap-3 p-4 bg-accent rounded-2xl text-left transition-all shadow-lg shadow-accent/20">
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="font-bold">Grievances</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 text-stone-400 hover:bg-stone-800 hover:text-white rounded-2xl text-left transition-all">
                    <FileText className="w-5 h-5" />
                    <span className="font-bold">Audit Logs</span>
                </button>
                <button
                    onClick={() => window.location.href = '/'}
                    className="w-full flex items-center gap-3 p-4 text-stone-400 hover:bg-stone-800 hover:text-white rounded-2xl text-left transition-all"
                >
                    <ExternalLink className="w-5 h-5" />
                    <span className="font-bold">Live Portal</span>
                </button>
            </nav>

            <div className="mt-auto border-t border-stone-800 pt-8">
                <div className="bg-stone-800/50 rounded-2xl p-6 border border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-3">Compliance Health</p>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-display font-black text-white">98.4%</span>
                        <div className="h-1.5 flex-grow bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[98%] shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-accent selection:text-white">
            <div className="flex relative">
                {/* Desktop Sidebar */}
                <aside className="w-80 min-h-screen bg-stone-900 text-white p-10 hidden lg:flex flex-col sticky top-0 shadow-2xl">
                    <SidebarContent />
                </aside>

                {/* Mobile Drawer Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100] lg:hidden animate-fade-in"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Mobile Drawer */}
                <aside className={`fixed inset-y-0 left-0 w-80 bg-stone-900 text-white p-10 z-[101] lg:hidden flex flex-col transition-transform duration-500 ease-out transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <SidebarContent />
                </aside>

                <main className="flex-grow p-6 md:p-12 lg:p-20 relative">
                    <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/[0.03] blur-[150px] pointer-events-none" />

                    <header className="flex flex-col gap-8 mb-16 lg:mb-24">
                        <div className="flex items-center justify-between lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-stone-100 shadow-sm"
                            >
                                <MoreHorizontal className="w-6 h-6 text-stone-900" />
                            </button>
                            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 animate-reveal-up">
                            <div className="max-w-3xl">
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-6">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    Live Compliance Stream
                                </span>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-[0.9]">
                                    Executive Monitoring.
                                </h1>
                                <p className="text-stone-500 text-lg md:text-xl font-light mt-6 max-w-xl leading-relaxed">
                                    Real-time oversight of infrastructure integrity, stakeholder concerns, and governance compliance reporting.
                                </p>
                            </div>
                            <button
                                onClick={exportToPDF}
                                className="bg-stone-900 text-white font-black px-10 py-5 rounded-[2rem] flex items-center justify-center gap-3 hover:bg-accent transition-all shadow-2xl shadow-stone-900/20 group active:scale-95"
                            >
                                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                Generate Audit Report
                            </button>
                        </div>
                    </header>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-16 lg:mb-24 animate-reveal-up animation-delay-200">
                        {[
                            { label: 'Total Logs', value: grievances.length, sub: 'All Time Records' },
                            { label: 'Awaiting Action', value: grievances.filter(g => g.status === 'Submitted').length, sub: 'Needs Review', hot: true },
                            { label: 'Resolution Rate', value: '94.2%', sub: 'Avg. Turnaround' }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-8 lg:p-12 rounded-[3rem] border border-stone-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 relative overflow-hidden group">
                                {stat.hot && <div className="absolute top-0 right-0 w-24 h-24 bg-accent/[0.03] blur-2xl rounded-full" />}
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-3">{stat.label}</p>
                                <p className={`text-5xl lg:text-6xl font-display font-black tracking-tighter ${stat.hot ? 'text-accent' : 'text-stone-900'}`}>{stat.value}</p>
                                <p className="text-[9px] font-bold text-stone-300 uppercase tracking-widest mt-4">{stat.sub}</p>
                            </div>
                        ))}
                    </div>

                    {/* Filters & Search */}
                    <div className="bg-white p-4 md:p-6 rounded-[2.5rem] border border-stone-100 shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center animate-reveal-up animation-delay-300">
                        <div className="relative flex-grow w-full group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-accent transition-colors" />
                            <input
                                type="text"
                                placeholder="Filter records by narrative or name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-16 pl-14 pr-6 rounded-2xl bg-stone-50/50 border border-transparent focus:border-accent/10 focus:bg-white outline-none transition-all placeholder:text-stone-300 font-medium text-lg"
                            />
                        </div>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full md:w-auto h-16 px-8 rounded-2xl bg-stone-50 border border-transparent focus:border-accent/10 outline-none font-black text-xs uppercase tracking-widest appearance-none cursor-pointer hover:bg-stone-100 transition-all min-w-[200px] text-center"
                        >
                            <option value="all">Status: Global view</option>
                            <option value="Submitted">Status: Submitted</option>
                            <option value="Under Review">Status: In-Progress</option>
                            <option value="Resolved">Status: Resolution</option>
                        </select>
                    </div>

                    {/* Data List */}
                    <div className="space-y-6 animate-reveal-up animation-delay-400">
                        {isLoading ? (
                            <div className="py-32 flex flex-col items-center justify-center gap-6">
                                <Loader2 className="w-12 h-12 text-accent animate-spin" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 animate-pulse">Syncing Cryptographic Logs...</p>
                            </div>
                        ) : filteredGrievances.length === 0 ? (
                            <div className="py-40 text-center bg-white rounded-[3rem] border border-stone-100">
                                <Search size={48} className="mx-auto mb-6 text-stone-100" />
                                <p className="text-stone-300 font-display font-bold text-2xl tracking-tight">No records found matching criteria.</p>
                                <button onClick={() => { setSearchTerm(''); setSelectedStatus('all'); }} className="mt-4 text-xs font-black uppercase tracking-widest text-accent hover:underline">Clear all filters</button>
                            </div>
                        ) : (
                            filteredGrievances.map((g, idx) => (
                                <div key={g.id} className="bg-white p-8 lg:p-12 rounded-[3.5rem] border border-stone-100 shadow-sm transition-all hover:shadow-2xl hover:border-accent/10 group animate-reveal-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                                        <div className="flex-grow max-w-4xl">
                                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                                <div className="bg-stone-900 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-black/10">
                                                    {g.issue_category}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-500">
                                                    {getStatusIcon(g.status)}
                                                    {g.status}
                                                </div>
                                                <span className="text-stone-200 hidden xs:inline">|</span>
                                                <span className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">{format(new Date(g.created_at), 'MMM d, yyyy • HH:mm')}</span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-display font-black mb-6 group-hover:text-accent transition-colors leading-[1.1] tracking-tight">{g.description.substring(0, 200)}{g.description.length > 200 ? '...' : ''}</h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-stone-500">
                                                <div className="flex items-center gap-3 bg-stone-50 px-5 py-2.5 rounded-full border border-stone-100">
                                                    <span className="text-stone-300 uppercase text-[9px] font-black tracking-widest">Subject:</span>
                                                    <span className="font-bold text-sm text-stone-700">{g.complainant_name || 'Anonymous Submission'}</span>
                                                </div>
                                                {g.contact_info && (
                                                    <div className="flex items-center gap-3 text-xs font-bold text-accent px-5">
                                                        <ExternalLink size={14} />
                                                        {g.contact_info}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 lg:border-l lg:pl-12 lg:border-stone-100 min-w-[240px]">
                                            <div className="flex items-center gap-2 mb-2 lg:mb-4 lg:self-start">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-300">Action Interface</span>
                                            </div>
                                            <div className="flex gap-2 w-full lg:w-auto">
                                                <select
                                                    value={g.status}
                                                    onChange={(e) => updateStatus(g.id, e.target.value as Grievance['status'])}
                                                    className="flex-grow lg:flex-none bg-stone-900 text-white font-black h-16 px-8 rounded-2xl outline-none hover:bg-accent transition-all cursor-pointer appearance-none text-xs uppercase tracking-widest text-center shadow-xl shadow-stone-900/10"
                                                >
                                                    <option value="Submitted">Log Status</option>
                                                    <option value="Under Review">Engage Review</option>
                                                    <option value="Resolved">Finalize</option>
                                                </select>
                                                {g.evidence_url && (
                                                    <a
                                                        href={g.evidence_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 hover:text-accent hover:bg-white border border-transparent hover:border-accent/20 transition-all shadow-sm group/btn"
                                                        title="View Evidence Container"
                                                    >
                                                        <ExternalLink className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                                                    </a>
                                                )}
                                                <button className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 transition-all hover:bg-stone-900 hover:text-white">
                                                    <MoreHorizontal className="w-6 h-6" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default GRMDashboard;
