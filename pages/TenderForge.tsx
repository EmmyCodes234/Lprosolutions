import React, { useState, useEffect, useRef } from 'react';
import {
    Layout,
    FileText,
    Search,
    Zap,
    Target,
    ShieldCheck,
    Users,
    TrendingUp,
    Loader2,
    ChevronRight,
    Save,
    Send,
    ExternalLink,
    Info
} from 'lucide-react';

// Types for Section Management
type SectionKey = 'feasibility' | 'engineering' | 'governance' | 'stakeholders' | 'capacity';

interface ProposalData {
    feasibility: string;
    engineering: string;
    governance: string;
    stakeholders: string;
    capacity: string;
}

const SECTIONS: { key: SectionKey; label: string; icon: any }[] = [
    { key: 'feasibility', label: 'Feasibility & Approach', icon: Target },
    { key: 'engineering', label: 'Engineering Execution', icon: Zap },
    { key: 'governance', label: 'PMO & Governance', icon: ShieldCheck },
    { key: 'stakeholders', label: 'Stakeholder & ESG', icon: Users },
    { key: 'capacity', label: 'Capacity Building', icon: TrendingUp },
];

const TenderForge: React.FC = () => {
    // State Management
    const [proposalData, setProposalData] = useState<ProposalData>({
        feasibility: '',
        engineering: '',
        governance: '',
        stakeholders: '',
        capacity: '',
    });

    const [activeSection, setActiveSection] = useState<SectionKey>('feasibility');
    const [researchQuery, setResearchQuery] = useState('');
    const [researchResults, setResearchResults] = useState('');
    const [aiInstructions, setAiInstructions] = useState('');

    const [isSearching, setIsSearching] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const abortControllerRef = useRef<AbortController | null>(null);

    // 3. TAVILY API INTEGRATION (Live Research)
    const handleSearchWeb = async () => {
        if (!researchQuery.trim()) return;

        setIsSearching(true);
        setResearchResults('');

        try {
            const response = await fetch('https://api.tavily.com/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_key: import.meta.env.VITE_TAVILY_API_KEY,
                    query: researchQuery,
                    search_depth: 'advanced',
                    include_answer: true,
                }),
            });

            const data = await response.json();

            if (data.answer) {
                setResearchResults(data.answer);
            } else if (data.results) {
                const combined = data.results
                    .slice(0, 3)
                    .map((r: any) => `[${r.title}] ${r.content}`)
                    .join('\n\n');
                setResearchResults(combined);
            }
        } catch (error) {
            console.error('Tavily Search Error:', error);
            setResearchResults('Failed to retrieve research data. Please check your API key.');
        } finally {
            setIsSearching(false);
        }
    };

    // 4. CEREBRAS API INTEGRATION (Live Streaming Generation)
    const handleGenerateViaCerebras = async () => {
        if (isGenerating) {
            abortControllerRef.current?.abort();
            setIsGenerating(false);
            return;
        }

        setIsGenerating(true);

        // Create new AbortController
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const response = await fetch('/api/cerebras/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_CEREBRAS_API_KEY}`,
                },
                signal: controller.signal,
                body: JSON.stringify({
                    model: 'llama3.1-8b',
                    stream: true,
                    messages: [
                        {
                            role: 'system',
                            content: `You are an elite Bid Writer for L-Pro Solutions. Write the currently active section of the proposal. You MUST incorporate the provided Live Research Facts to ensure absolute factual accuracy and compliance. Tone must be formal, authoritative, and highly technical.`
                        },
                        {
                            role: 'user',
                            content: `SECTION TO WRITE: ${activeSection.toUpperCase()}. \n\nUSER INSTRUCTIONS: ${aiInstructions}. \n\nLIVE RESEARCH FACTS: ${researchResults}.`
                        }
                    ],
                }),
            });

            if (!response.ok) throw new Error('Cerebras API Error');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) return;

            // Clear existing content if starting fresh generation or just append?
            // User request says "append them directly", so we append.

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const jsonStr = line.replace('data: ', '').trim();
                        if (jsonStr === '[DONE]') break;

                        try {
                            const data = JSON.parse(jsonStr);
                            const content = data.choices[0]?.delta?.content;
                            if (content) {
                                setProposalData(prev => ({
                                    ...prev,
                                    [activeSection]: prev[activeSection] + content
                                }));
                            }
                        } catch (e) {
                            // Ignore parse errors for partial chunks
                        }
                    }
                }
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Generation aborted');
            } else {
                console.error('Cerebras Generation Error:', error);
            }
        } finally {
            setIsGenerating(false);
            abortControllerRef.current = null;
        }
    };

    return (
        <div className="flex h-screen bg-stone-950 text-stone-200 overflow-hidden font-sans">
            {/* LEFT PANE: Outline Navigation */}
            <aside className="w-64 border-r border-stone-800 bg-stone-900 flex flex-col shrink-0">
                <div className="p-6 border-b border-stone-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FFD700] rounded flex items-center justify-center">
                        <Layout size={18} className="text-stone-950" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold uppercase tracking-widest text-[#FFD700]">The Tender Forge</h1>
                        <p className="text-[10px] text-stone-500 font-medium">L-PRO SOLUTIONS IDE</p>
                    </div>
                </div>

                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    {SECTIONS.map((section) => (
                        <button
                            key={section.key}
                            onClick={() => setActiveSection(section.key)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group text-left ${activeSection === section.key
                                ? 'bg-[#FFD700]/10 text-[#FFD700] ring-1 ring-[#FFD700]/20'
                                : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                                }`}
                        >
                            <section.icon size={18} className={activeSection === section.key ? 'text-[#FFD700]' : 'text-stone-500 group-hover:text-stone-300'} />
                            <span className="text-sm font-medium">{section.label}</span>
                            {activeSection === section.key && <div className="ml-auto w-1 h-4 bg-[#FFD700] rounded-full" />}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-stone-800 bg-stone-950/50">
                    <div className="flex items-center gap-2 text-[10px] text-stone-500 mb-3 px-2">
                        <Info size={12} />
                        <span>AUTO-SAVE ACTIVE</span>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 py-2 rounded text-xs font-semibold transition-colors">
                        <Save size={14} />
                        EXPORT PROPOSAL
                    </button>
                </div>
            </aside>

            {/* MIDDLE PANE: Editor */}
            <main className="flex-1 flex flex-col min-w-0 bg-stone-950 relative">
                <header className="h-16 border-b border-stone-800 flex items-center justify-between px-8 bg-stone-900/30">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-stone-400 text-xs tracking-wider uppercase font-semibold">
                            <FileText size={14} />
                            <span>Editing:</span>
                            <span className="text-[#FFD700]">{SECTIONS.find(s => s.key === activeSection)?.label}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-2 py-1 rounded bg-stone-800 text-[10px] font-mono text-stone-500 border border-stone-700">
                            UTF-8
                        </div>
                        <div className="px-2 py-1 rounded bg-stone-800 text-[10px] font-mono text-stone-500 border border-stone-700">
                            MDX
                        </div>
                    </div>
                </header>

                <div className="flex-1 relative p-8">
                    <textarea
                        value={proposalData[activeSection]}
                        onChange={(e) => setProposalData(prev => ({ ...prev, [activeSection]: e.target.value }))}
                        placeholder={`Drafting ${activeSection} section...`}
                        className="w-full h-full bg-transparent border-none focus:ring-0 text-stone-200 text-lg leading-relaxed placeholder:text-stone-700 resize-none font-sans scrollbar-hide"
                    />
                </div>

                <footer className="h-10 border-t border-stone-800 px-8 flex items-center justify-between bg-stone-900/50 text-[10px] text-stone-500 font-mono tracking-tight">
                    <div className="flex gap-6">
                        <span>CHARACTERS: {proposalData[activeSection].length}</span>
                        <span>WORDS: {proposalData[activeSection].trim() ? proposalData[activeSection].trim().split(/\s+/).length : 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span>CONNECTED TO CEREBRAS_L3.1_8B</span>
                    </div>
                </footer>
            </main>

            {/* RIGHT PANE: AI Assistant */}
            <aside className="w-96 border-l border-stone-800 bg-stone-900 flex flex-col shrink-0 overflow-y-auto">
                {/* Top: Live Research */}
                <section className="p-6 border-b border-stone-800">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700] mb-4 flex items-center gap-2">
                        <Search size={14} />
                        Live Web Research
                    </h2>
                    <div className="relative mb-4">
                        <input
                            type="text"
                            value={researchQuery}
                            onChange={(e) => setResearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchWeb()}
                            placeholder="Query industry standards, ESG regulations..."
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg py-3 px-4 text-sm focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/50 outline-none transition-all placeholder:text-stone-700"
                        />
                    </div>
                    <button
                        onClick={handleSearchWeb}
                        disabled={isSearching || !researchQuery.trim()}
                        className="w-full bg-stone-800 hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed text-stone-200 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all border border-stone-700"
                    >
                        {isSearching ? <Loader2 size={16} className="animate-spin" /> : <TrendingUp size={16} />}
                        {isSearching ? 'EXPLORING WEB...' : 'SEARCH WEB VIA TAVILY'}
                    </button>

                    {researchResults && (
                        <div className="mt-4 bg-stone-950 border border-stone-800 rounded-lg p-4 max-h-60 overflow-y-auto custom-scrollbar">
                            <div className="flex items-center gap-2 text-[#FFD700] text-[10px] font-bold uppercase mb-2">
                                <ChevronRight size={10} />
                                Latest Insights
                            </div>
                            <p className="text-xs text-stone-400 leading-relaxed whitespace-pre-wrap">
                                {researchResults}
                            </p>
                        </div>
                    )}
                </section>

                {/* Bottom: AI Generation */}
                <section className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700] mb-4 flex items-center gap-2">
                        <Zap size={14} />
                        Cerebras Inference
                    </h2>
                    <textarea
                        value={aiInstructions}
                        onChange={(e) => setAiInstructions(e.target.value)}
                        placeholder="AI Prompt Context (e.g. Focus on Liberian infrastructure standards...)"
                        className="w-full flex-1 bg-stone-950 border border-stone-800 rounded-lg p-4 text-sm focus:border-[#FFD700] focus:outline-none transition-all placeholder:text-stone-700 resize-none mb-4 min-h-[150px]"
                    />
                    <button
                        onClick={handleGenerateViaCerebras}
                        disabled={!researchResults && !aiInstructions.trim()}
                        className={`w-full py-4 rounded-xl text-sm font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-[#FFD700]/5
              ${isGenerating
                                ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20'
                                : 'bg-[#FFD700] text-stone-950 hover:brightness-110'
                            }`}
                    >
                        {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        {isGenerating ? 'HALT GENERATION' : 'GENERATE VIA CEREBRAS'}
                    </button>

                    <div className="mt-4 flex items-center gap-3 p-3 bg-stone-950/50 rounded-lg border border-stone-800/50">
                        <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center shrink-0">
                            <ShieldCheck size={16} className="text-stone-500" />
                        </div>
                        <p className="text-[10px] text-stone-500 leading-tight">
                            Enterprise-grade compliance engine active. All generated content is context-aware.
                        </p>
                    </div>
                </section>
            </aside>

            <style dangerouslySetInnerHTML={{
                __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #292524; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #44403c; }
      `}} />
        </div>
    );
};

export default TenderForge;
