import React, { useState, useEffect, useRef } from 'react';
import {
    Shield,
    Send,
    Loader2,
    Lock,
    Search,
    Cpu,
    MessageSquare,
    Sparkles,
    FileCheck,
    ExternalLink,
    History,
    Layout,
    Globe,
    Settings,
    ChevronRight,
    User
} from 'lucide-react';
import Logo from '../components/Logo';

// Design System Constants
const COLORS = {
    bg: 'bg-stone-950',
    card: 'bg-stone-900',
    border: 'border-stone-800',
    textPrimary: 'text-stone-200',
    textSecondary: 'text-stone-400',
    textMuted: 'text-stone-500',
    accent: '#FFD700', // Brand Gold
    active: 'text-blue-500',
    highlight: 'bg-stone-800/50'
};

const LivingTender = () => {
    const [isAdminView, setIsAdminView] = useState(true);
    const [tenderData, setTenderData] = useState({
        projectName: '',
        targetClient: '',
        budget: '',
        strategyText: ''
    });
    const [queries, setQueries] = useState<string[]>([]);
    const [chatInput, setChatInput] = useState('');
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [deployed, setDeployed] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);

    // Load persistence logic
    useEffect(() => {
        const savedData = localStorage.getItem('lpro_tender_data');
        if (savedData) setTenderData(JSON.parse(savedData));

        const savedQueries = localStorage.getItem('lpro_tender_queries');
        if (savedQueries) setQueries(JSON.parse(savedQueries));
    }, []);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleDeploy = () => {
        if (!tenderData.projectName || !tenderData.strategyText) {
            alert("Please fill in the Project Name and Strategy Text to deploy.");
            return;
        }
        localStorage.setItem('lpro_tender_data', JSON.stringify(tenderData));
        setDeployed(true);
        setTimeout(() => setDeployed(false), 3000);
    };

    const submitQuery = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim() || isGenerating) return;

        const userQuery = chatInput.trim();
        const newQueries = [...queries, userQuery];
        setQueries(newQueries);
        localStorage.setItem('lpro_tender_queries', JSON.stringify(newQueries));

        setChatHistory(prev => [...prev, { role: 'user', content: userQuery }]);
        setChatInput('');
        setIsGenerating(true);

        try {
            const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${(import.meta as any).env.VITE_CEREBRAS_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'llama3.1-8b',
                    stream: true,
                    messages: [
                        {
                            role: 'system',
                            content: `You are the L-Pro AI Bid Assistant. Answer the evaluator's questions using ONLY the following proposal text. If the answer is not in the text, say you will have an L-Pro executive follow up. PROPOSAL TEXT: ${tenderData.strategyText}`
                        },
                        { role: 'user', content: userQuery }
                    ],
                    max_tokens: 1000
                })
            });

            if (!response.ok) throw new Error('API Execution Failed');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder('utf-8');
            let assistantResponse = '';

            setChatHistory(prev => [...prev, { role: 'assistant', content: '' }]);

            while (reader) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                        try {
                            const parsed = JSON.parse(line.slice(6));
                            const content = parsed.choices[0].delta.content;
                            if (content) {
                                assistantResponse += content;
                                setChatHistory(prev => {
                                    const last = prev[prev.length - 1];
                                    const nextHistory: { role: 'user' | 'assistant', content: string }[] = [...prev.slice(0, -1), { role: 'assistant' as const, content: assistantResponse }];
                                    return nextHistory;
                                });
                            }
                        } catch (e) { }
                    }
                }
            }
        } catch (err) {
            console.error(err);
            setChatHistory(prev => [...prev, { role: 'assistant', content: "An error occurred connecting to the L-Pro Oracle. Please retry." }]);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className={`min-h-screen ${COLORS.bg} font-sans ${COLORS.textPrimary} relative selection:bg-[#FFD700] selection:text-black`}>
            {/* GLOBAL HUD OVERLAY */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%20opacity%3D%221%22%2F%3E%3C%2Fsvg%3E')]"></div>

            {isAdminView ? (
                /* ==========================================
                   L-PRO ADMIN VIEW (REDESIGNED)
                   ========================================== */
                <div className="flex flex-col min-h-screen">
                    {/* Top Navigation Bar */}
                    <nav className="border-b border-stone-800 bg-stone-900/50 backdrop-blur-md sticky top-0 z-40">
                        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <Logo color="white" height="h-10" />
                                <div className="hidden md:flex items-center gap-1 text-[11px] font-bold tracking-widest text-stone-500 uppercase">
                                    <span>Intelligence</span>
                                    <ChevronRight size={12} />
                                    <span className="text-white">Living Tender</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex flex-col text-right mr-4">
                                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Admin Node</span>
                                    <span className="text-xs font-bold text-stone-200">STRATEGIST_01</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center">
                                    <User size={18} className="text-stone-400" />
                                </div>
                            </div>
                        </div>
                    </nav>

                    <main className="flex-grow p-6 md:p-10 lg:p-12">
                        <div className="max-w-[1400px] mx-auto">
                            <div className="flex flex-col lg:flex-row gap-10">

                                {/* Configuration Panel */}
                                <div className="flex-grow lg:w-2/3 space-y-8">
                                    <header>
                                        <h2 className="text-3xl font-black tracking-tight mb-2">Configure Smart Tender</h2>
                                        <p className="text-stone-400 text-sm">Deploy an AI-powered deal room for high-stakes client evaluations.</p>
                                    </header>

                                    <div className={`${COLORS.card} border ${COLORS.border} rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-stone-700`}>
                                        <div className="p-8 space-y-8">
                                            {/* Name & Client Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                                <div className="space-y-3">
                                                    <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Project Identification</label>
                                                    <input
                                                        className="w-full bg-stone-950/50 border border-stone-800 rounded-xl p-4 text-sm focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none transition-all placeholder:text-stone-700"
                                                        placeholder="e.g. Freeport Logistics Hub"
                                                        value={tenderData.projectName}
                                                        onChange={(e) => setTenderData({ ...tenderData, projectName: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Target Stakeholder</label>
                                                    <input
                                                        className="w-full bg-stone-950/50 border border-stone-800 rounded-xl p-4 text-sm focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none transition-all placeholder:text-stone-700"
                                                        placeholder="e.g. Ministry of Infrastructure"
                                                        value={tenderData.targetClient}
                                                        onChange={(e) => setTenderData({ ...tenderData, targetClient: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Budget */}
                                            <div className="space-y-3 text-left">
                                                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Deal Value (USD)</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 font-bold">$</span>
                                                    <input
                                                        className="w-full bg-stone-950/50 border border-stone-800 rounded-xl p-4 pl-8 text-sm focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none transition-all placeholder:text-stone-700"
                                                        placeholder="150,000,000"
                                                        value={tenderData.budget}
                                                        onChange={(e) => setTenderData({ ...tenderData, budget: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Strategy Text */}
                                            <div className="space-y-3 text-left">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Proposal Intelligence Base</label>
                                                    <span className="text-[10px] text-stone-600 font-medium">LLM_CONTEXT_V4</span>
                                                </div>
                                                <textarea
                                                    className="w-full h-80 bg-stone-950/50 border border-stone-800 rounded-2xl p-6 text-sm leading-relaxed resize-none focus:border-[#FFD700] outline-none transition-all placeholder:text-stone-700 custom-scrollbar"
                                                    placeholder="Paste the technical specifications, financial assumptions, and project milestones here. The Oracle will use this as the single source of truth..."
                                                    value={tenderData.strategyText}
                                                    onChange={(e) => setTenderData({ ...tenderData, strategyText: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="p-8 bg-stone-950/50 border-t border-stone-800 flex flex-col md:flex-row items-center gap-6">
                                            <button
                                                onClick={handleDeploy}
                                                className={`flex-grow py-5 rounded-xl font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300
                          ${deployed ? 'bg-green-600 text-white shadow-[0_0_40px_rgba(22,163,74,0.2)]' : 'bg-white text-black hover:bg-[#FFD700] active:scale-[0.98]'}`}
                                            >
                                                {deployed ? <FileCheck className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                                                {deployed ? 'Protocol Deployed' : 'Deploy Secure Deal Room'}
                                            </button>
                                            <div className="flex items-center gap-3 text-stone-500">
                                                <Lock size={16} />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted Deployment</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Intelligence Side Panel */}
                                <div className="lg:w-1/3 flex flex-col gap-8">
                                    <div className={`${COLORS.card} border ${COLORS.border} rounded-2xl p-8 flex flex-col h-[700px] shadow-2xl relative overflow-hidden group`}>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>
                                        <div className="flex items-center justify-between mb-8 relative z-10">
                                            <div className="flex items-center gap-2 text-blue-500">
                                                <Search className="w-4 h-4" />
                                                <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Evaluator Spyglass</h2>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">Live</span>
                                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar relative z-10">
                                            {queries.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-stone-800 rounded-2xl opacity-30 px-10 text-center">
                                                    <History className="w-10 h-10 mb-4 text-stone-600" />
                                                    <p className="text-[10px] uppercase font-bold tracking-widest leading-relaxed">System waiting for client interaction...</p>
                                                </div>
                                            ) : (
                                                [...queries].reverse().map((q, i) => (
                                                    <div key={i} className="p-5 bg-stone-950 border border-stone-800 rounded-xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300 shadow-lg">
                                                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                            <span className="text-[9px] font-bold text-stone-500 uppercase tracking-tighter">Query Logged</span>
                                                        </div>
                                                        <p className="text-xs text-stone-200 italic mb-4 leading-relaxed font-medium">"{q}"</p>
                                                        <div className="flex justify-between items-center text-[9px] font-bold text-stone-600 uppercase tracking-widest">
                                                            <span className="flex items-center gap-1"><User size={10} /> EVALUATOR_SEC_B</span>
                                                            <span>TIMESTAMP // SYNC</span>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center border border-stone-700">
                                                <Settings size={20} className="text-stone-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">AI Tier</span>
                                                <span className="text-xs font-bold text-white">Llama 3.1 8B Stable</span>
                                            </div>
                                        </div>
                                        <div className="h-2 w-24 bg-stone-800 rounded-full overflow-hidden">
                                            <div className="h-full w-4/5 bg-[#FFD700]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            ) : (
                /* ==========================================
                   CLIENT EVALUATOR VIEW (REDESIGNED)
                   ========================================== */
                <div className="flex flex-col min-h-screen bg-stone-950">
                    {/* Client Header bar */}
                    <header className="border-b border-stone-800 bg-stone-900/50 backdrop-blur-md sticky top-0 z-40 px-6 md:px-12 h-24 flex items-center justify-between">
                        <div className="flex items-center gap-10">
                            <Logo color="white" height="h-10" />
                            <div className="hidden lg:block h-8 w-[1px] bg-stone-800"></div>
                            <div>
                                <h1 className="text-lg md:text-xl font-black tracking-tight text-white">{tenderData.projectName || 'Secure Tender Portal'}</h1>
                                <div className="flex items-center gap-3 mt-0.5">
                                    <span className="text-[9px] font-bold text-[#FFD700] uppercase tracking-widest">{tenderData.targetClient || 'Proprietary Access'}</span>
                                    <span className="w-1 h-1 bg-stone-700 rounded-full"></span>
                                    <span className="text-[9px] text-stone-500 font-bold tracking-widest italic">L-PRO_CERTIFIED_ENV_V4.0</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-0.5">Deal Maturity</p>
                                <p className="text-lg font-black text-white">{tenderData.budget || '$0.00'}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-[#FFD700]">
                                <Shield size={24} />
                            </div>
                        </div>
                    </header>

                    <main className="flex-grow flex flex-col md:p-8 lg:p-12 overflow-hidden">
                        <div className="max-w-[1200px] mx-auto w-full flex-grow flex flex-col bg-stone-900/40 border border-stone-800 md:rounded-3xl overflow-hidden shadow-2xl">

                            {/* Chat Header */}
                            <div className="px-8 py-5 border-b border-stone-800 bg-stone-900 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center relative shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                        <Sparkles className="text-blue-500 w-6 h-6" />
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-stone-900"></div>
                                    </div>
                                    <div>
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-white">L-Pro Proposal Oracle</span>
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Active Intelligence Session</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden sm:flex flex-col items-end opacity-50">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Cerebras Llama-3.1</span>
                                    <span className="text-[9px] font-medium italic">Latency: <span>42ms</span> // Syncing</span>
                                </div>
                            </div>

                            {/* Chat Scrollable Area */}
                            <div className="flex-1 overflow-y-auto px-6 py-10 md:px-12 space-y-10 custom-scrollbar bg-stone-950/20">
                                {chatHistory.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40 px-10">
                                        <div className="w-20 h-20 rounded-3xl bg-stone-900/50 border border-stone-800 flex items-center justify-center mb-6">
                                            <MessageSquare className="w-10 h-10 text-stone-600" />
                                        </div>
                                        <h3 className="text-sm font-black uppercase tracking-widest mb-2">Initialize Inquiry</h3>
                                        <p className="text-xs text-stone-500 font-medium max-w-[300px] leading-relaxed">Ask the L-Pro Oracle about technical feasibility, financial projections, or legal compliance.</p>
                                    </div>
                                ) : (
                                    chatHistory.map((chat, i) => (
                                        <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                                            <div className={`max-w-[90%] md:max-w-[75%] p-6 rounded-2xl shadow-xl leading-relaxed text-sm ${chat.role === 'user'
                                                    ? 'bg-stone-800 text-white rounded-tr-none border border-stone-700'
                                                    : 'bg-stone-900/80 backdrop-blur-sm border border-stone-800 text-stone-200 rounded-tl-none font-medium'
                                                }`}>
                                                {chat.role === 'assistant' && (
                                                    <div className="flex items-center gap-2 mb-3 opacity-50">
                                                        <Cpu size={12} className="text-blue-500" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">Oracle Response</span>
                                                    </div>
                                                )}
                                                <span className="whitespace-pre-wrap">{chat.content}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {isGenerating && (
                                    <div className="flex justify-start">
                                        <div className="bg-stone-900/50 border border-stone-800 p-6 rounded-2xl rounded-tl-none flex items-center gap-4 shadow-lg animate-pulse">
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                                            </div>
                                            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em]">Oracle Synthesizing...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Chat Input section */}
                            <div className="p-6 md:p-10 border-t border-stone-800 bg-stone-900/50 backdrop-blur-md">
                                <form onSubmit={submitQuery} className="max-w-4xl mx-auto">
                                    <div className="relative group">
                                        <input
                                            className="w-full bg-stone-950/80 border border-stone-800 rounded-2xl p-6 pr-20 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 outline-none transition-all placeholder:text-stone-700 font-medium shadow-inner"
                                            placeholder="Enter procurement or technical query..."
                                            value={chatInput}
                                            onChange={(e) => setChatInput(e.target.value)}
                                            disabled={isGenerating}
                                        />
                                        <button
                                            type="submit"
                                            disabled={!chatInput.trim() || isGenerating}
                                            className="absolute right-3 top-3 bottom-3 px-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-20 disabled:grayscale text-white rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center transition-all duration-300 active:scale-[0.95]"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-center gap-4 mt-6 opacity-30 select-none">
                                        <div className="flex items-center gap-1.5">
                                            <Lock size={10} />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">ECC-521 Encryption</span>
                                        </div>
                                        <span className="w-1 h-1 bg-stone-700 rounded-full"></span>
                                        <div className="flex items-center gap-1.5">
                                            <Globe size={10} />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">BDS Compliant Node</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            )}

            {/* VIEW TOGGLE (Demo Mode) */}
            <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 flex flex-col items-end gap-3 z-50">
                <button
                    onClick={() => setIsAdminView(!isAdminView)}
                    className="p-5 bg-stone-900/80 backdrop-blur-xl border border-stone-800 rounded-2xl text-stone-500 hover:text-white hover:border-[#FFD700]/50 transition-all duration-300 shadow-2xl group flex items-center gap-3"
                    title="Toggle Admin/Client View"
                >
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-stone-500 group-hover:text-stone-300 uppercase tracking-widest transition-colors mb-0.5">Toggle Control</span>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{isAdminView ? 'CLIENT VIEW' : 'ADMIN HUB'}</span>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isAdminView ? 'bg-blue-600/10 text-blue-500' : 'bg-[#FFD700]/10 text-[#FFD700]'}`}>
                        {isAdminView ? <ExternalLink className="group-hover:rotate-12" /> : <Shield className="scale-110" />}
                    </div>
                </button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #292524;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #44403c;
        }
      `}} />
        </div>
    );
};

export default LivingTender;
