import React, { useState, useRef } from 'react';
import {
    Building2,
    Search,
    Coins,
    Hammer,
    HardHat,
    Ruler,
    MapPin,
    TrendingUp,
    Loader2,
    CheckCircle2,
    AlertTriangle,
    Download,
    FileSpreadsheet
} from 'lucide-react';

// Types
interface BOQItem {
    id: string;
    category: string;
    item: string;
    quantity: number;
    unit: string;
    unitRate: number;
    totalCost: number;
    source?: string; // e.g. "Tavily Search: Cemenco Price" or "AI Estimate"
    confidence: 'High' | 'Medium' | 'Low';
}

const IronBank: React.FC = () => {
    // Input State
    const [projectType, setProjectType] = useState('');
    const [location, setLocation] = useState('Monrovia, Liberia');
    const [plotSize, setPlotSize] = useState('');
    const [details, setDetails] = useState('');

    // Processing State
    const [isScanning, setIsScanning] = useState(false);
    const [scanStatus, setScanStatus] = useState('');
    const [marketData, setMarketData] = useState<string[]>([]);
    const [boqItems, setBoqItems] = useState<BOQItem[]>([]);
    const [totalEstimatedCost, setTotalEstimatedCost] = useState(0);
    const [currency, setCurrency] = useState<'USD' | 'LRD'>('USD');
    const EXCHANGE_RATE = 195; // 1 USD = 195 LRD (Approx)

    // 1. IDENTIFY KEY COST DRIVERS (Mock Logic for now, could be AI)
    // 2. SCAN MARKET (Tavily)
    const handleGenerateEstimate = async () => {
        if (!projectType || !plotSize) return;

        setIsScanning(true);
        setScanStatus('Identifying key cost drivers...');
        setBoqItems([]);
        setMarketData([]);

        try {
            // Step 1: Search for diverse current prices in Liberia
            setScanStatus('Scanning Monrovia market for real-time prices (Cement, Steel, Labor)...');

            const queries = [
                `current cement price Monrovia Liberia 2025 ${new Date().getFullYear()}`,
                `steel rods price Liberia construction 2025`,
                `daily labor rate construction worker Liberia 2025`,
                `granite delivery price Liberia`,
                `sand truck price Liberia`
            ];

            const findings: string[] = [];

            // We'll run a few searches in parallel
            await Promise.all(queries.map(async (q) => {
                try {
                    const response = await fetch('https://api.tavily.com/search', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            api_key: import.meta.env.VITE_TAVILY_API_KEY,
                            query: q,
                            search_depth: 'basic', // Fast search
                            include_answer: true,
                        }),
                    });
                    const data = await response.json();
                    if (data.answer) findings.push(`[${q}]: ${data.answer}`);
                } catch (e) {
                    console.error("Search failed for", q);
                }
            }));

            setMarketData(findings);
            setScanStatus('Synthesizing Bill of Quantities via Cerebras AI...');

            // Step 2: Generate BOQ with Cerebras
            const aiResponse = await fetch('/api/cerebras/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_CEREBRAS_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'llama3.1-8b',
                    messages: [
                        {
                            role: 'system',
                            content: `You are an elite, highly accurate Quantity Surveyor and Cost Estimator operating in West Africa (specifically Liberia). 
Your task is to generate a realistic Bill of Quantities (BOQ) based on the user's project parameters.

CRITICAL CONSTRAINTS (YOU MUST OBEY THESE):
1. CURRENCY: All prices MUST be strictly in USD. If you find local data in LRD, you must convert it to USD before outputting. 
2. REALISTIC BASELINES: A standard residential build in West Africa costs roughly $40 to $100 USD per square foot. Your final total MUST realistically align with this math.
3. ENGINEERING REALISM: Do not over-prescribe materials. A 2500 sq ft house uses approximately 3-6 tonnes of steel, 500-800 bags of cement, and 40-60 cubic meters of sand. Scale accordingly.
4. FORMAT: Output pure JSON representing an array of line items with: description, qty, unit, rate_usd, total_usd, and confidence_level (high/medium/low based on your data certainty).`
                        },
                        {
                            role: 'user',
                            content: `
                PROJECT: ${projectType}
                LOCATION: ${location}
                SIZE: ${plotSize}
                DETAILS: ${details}
                
                MARKET DATA FOUND:
                ${findings.join('\n')}
                
                GENERATE ACCURATE BOQ NOW.
              `
                        }
                    ],
                    response_format: { type: "json_object" }
                }),
            });

            const aiData = await aiResponse.json();
            const generatedBoq = JSON.parse(aiData.choices[0].message.content);

            // Calculate totals
            let grandTotal = 0;
            const processedItems = generatedBoq.items.map((item: any) => {
                // Ensure we map the AI's response fields correctly
                const quantity = Number(item.qty || item.quantity);
                const rate = Number(item.rate_usd || item.unitRate);
                const total = quantity * rate;

                grandTotal += total;

                return {
                    id: crypto.randomUUID(),
                    category: 'Construction', // Default category if not provided
                    item: item.description || item.item,
                    quantity: quantity,
                    unit: item.unit,
                    unitRate: rate,
                    totalCost: total,
                    confidence: item.confidence_level || item.confidence || 'Medium'
                };
            });

            // Sort items to group by category if AI provides it, otherwise simple list
            setBoqItems(processedItems);
            setTotalEstimatedCost(grandTotal);
            setScanStatus('Estimation Complete.');

        } catch (error) {
            console.error('Iron Bank Error:', error);
            setScanStatus('Process Interrupted. Please try again.');
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-900 selection:text-white">
            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 p-6 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl border border-cyan-500/20 flex items-center justify-center">
                        <Coins className="text-cyan-400" size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                            THE IRON BANK
                            <span className="px-2 py-0.5 rounded-full bg-cyan-900/30 text-cyan-400 text-[10px] uppercase font-bold tracking-widest border border-cyan-800">
                                Beta
                            </span>
                        </h1>
                        <p className="text-xs text-slate-400 font-medium">AI QUANTITY SURVEYOR & COST INTELLIGENCE</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Market Data Source</p>
                        <div className="flex items-center gap-1.5 justify-end text-cyan-400 text-xs font-bold">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            TAVILY LIVE FEED
                        </div>
                        <div className="flex items-center gap-1.5 justify-end text-slate-500 text-[10px] font-medium mt-1">
                            <CheckCircle2 size={10} />
                            CONSERVATIVE ESTIMATION MODEL
                        </div>
                    </div>
                </div>
            </header>

            <main className="p-6 md:p-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: Input Protocol */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                            <Ruler size={16} className="text-cyan-400" />
                            Project Parameters
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-2">PROJECT TYPE</label>
                                <input
                                    type="text"
                                    value={projectType}
                                    onChange={(e) => setProjectType(e.target.value)}
                                    placeholder="e.g. 3-Bedroom Residential Villa"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-2">LOCATION</label>
                                    <div className="relative">
                                        <MapPin size={14} className="absolute left-3 top-3.5 text-slate-500" />
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 pl-9 pr-3 text-sm text-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-2">SIZE / SCOPE</label>
                                    <input
                                        type="text"
                                        value={plotSize}
                                        onChange={(e) => setPlotSize(e.target.value)}
                                        placeholder="e.g. 2500 sq ft"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-2">SPECIFIC REQUIREMENTS</label>
                                <textarea
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    placeholder="e.g. Use high-grade Turkish tiles, reinforced concrete foundation, solar capability..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white h-24 resize-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
                                />
                            </div>

                            <button
                                onClick={handleGenerateEstimate}
                                disabled={isScanning || !projectType || !plotSize}
                                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {isScanning ? <Loader2 className="animate-spin" size={20} /> : <TrendingUp size={20} />}
                                {isScanning ? 'CALCULATING...' : 'GENERATE SMART BOQ'}
                            </button>
                        </div>
                    </div>

                    {/* Live Market Data Feed */}
                    {marketData.length > 0 && (
                        <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6">
                            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Search size={14} />
                                Live Market Intel
                            </h3>
                            <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                                {marketData.map((data, idx) => (
                                    <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] leading-relaxed text-slate-400">
                                        {data}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: The BOQ */}
                <div className="lg:col-span-8 flex flex-col h-full min-h-[500px]">
                    {boqItems.length === 0 ? (
                        <div className="flex-1 bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-600 p-12 text-center">
                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6">
                                <FileSpreadsheet size={32} className="opacity-50" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-500 mb-2">No Estimate Generated Yet</h3>
                            <p className="max-w-md text-sm">
                                Enter project details to initialize the Iron Bank algorithms. We'll scan real-time Liberian market rates to build your BOQ.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full">
                            <div className="p-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between sticky top-0">
                                <div>
                                    <h2 className="text-lg font-bold text-white">Bill of Quantities</h2>
                                    <p className="text-xs text-slate-500">Generated {new Date().toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    {/* Currency Toggle */}
                                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                                        <button
                                            onClick={() => setCurrency('USD')}
                                            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${currency === 'USD' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
                                        >
                                            USD
                                        </button>
                                        <button
                                            onClick={() => setCurrency('LRD')}
                                            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${currency === 'LRD' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
                                        >
                                            LRD
                                        </button>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Estimated Cost</p>
                                        <p className="text-2xl font-black text-cyan-400 tracking-tight">
                                            {currency === 'USD' ? '$' : 'L$'}
                                            {(totalEstimatedCost * (currency === 'USD' ? 1 : EXCHANGE_RATE)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto flex-1 custom-scrollbar">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-950/50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800">
                                            <th className="p-4">Item Description</th>
                                            <th className="p-4 w-24 text-center">Qty</th>
                                            <th className="p-4 w-24 text-center">Unit</th>
                                            <th className="p-4 w-32 text-center">Rate ({currency})</th>
                                            <th className="p-4 w-32 text-right">Total ({currency})</th>
                                            <th className="p-4 w-24 text-center">Confidence</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-slate-800">
                                        {boqItems.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                                                <td className="p-4">
                                                    <div className="font-medium text-slate-200">{item.item}</div>
                                                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{item.category}</div>
                                                </td>
                                                <td className="p-4 text-center text-slate-400">{item.quantity}</td>
                                                <td className="p-4 text-center text-slate-500 text-xs">{item.unit}</td>
                                                <td className="p-4 text-center font-mono text-slate-300">
                                                    {currency === 'USD' ? '$' : 'L$'}
                                                    {(item.unitRate * (currency === 'USD' ? 1 : EXCHANGE_RATE)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className="p-4 text-right font-mono font-bold text-cyan-400/90">
                                                    {currency === 'USD' ? '$' : 'L$'}
                                                    {(item.totalCost * (currency === 'USD' ? 1 : EXCHANGE_RATE)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className={`
                                        px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border
                                        ${item.confidence === 'High' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                            item.confidence === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                                'bg-red-500/10 text-red-500 border-red-500/20'}
                                     `}>
                                                        {item.confidence}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
                                <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-lg text-sm font-bold transition-all">
                                    <Download size={16} />
                                    Export CSV
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default IronBank;
