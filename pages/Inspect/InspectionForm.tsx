import React, { useState, useRef } from 'react';
import { HardHat, Camera, Plus, Trash2, Send, CheckCircle2, AlertTriangle, FileText, ArrowLeft, ArrowRight, Loader2, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import MagneticButton from '../../components/MagneticButton';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';

interface PunchlistItem {
    id?: string;
    category: string;
    severity: 'Low' | 'High' | 'Critical';
    description: string;
    photo?: File;
    photo_url?: string;
}

const CATEGORIES = ['Structural', 'Electrical', 'Plumbing', 'Safety', 'Finishing', 'Other'];
const SEVERITIES: ('Low' | 'High' | 'Critical')[] = ['Low', 'High', 'Critical'];

const InspectionForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [inspectionData, setInspectionData] = useState({
        project_name: '',
        inspector_name: '',
    });

    const [items, setItems] = useState<PunchlistItem[]>([]);

    // Form for new item
    const [newItem, setNewItem] = useState<PunchlistItem>({
        category: 'Safety',
        severity: 'Low',
        description: '',
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddItem = () => {
        if (!newItem.description) {
            alert("Please provide a description for the defect.");
            return;
        }
        setItems([...items, { ...newItem, id: Math.random().toString(36).substr(2, 9) }]);
        setNewItem({ category: 'Safety', severity: 'Low', description: '' });
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewItem({ ...newItem, photo: e.target.files[0] });
        }
    };

    const finalizeInspection = async () => {
        if (items.length === 0) {
            alert("Please add at least one punchlist item.");
            return;
        }

        setIsSubmitting(true);
        try {
            // 1. Create Inspection
            const { data: inspection, error: inspectionError } = await supabase
                .from('inspections')
                .insert([{ ...inspectionData, status: 'Sent' }])
                .select()
                .single();

            if (inspectionError) throw inspectionError;

            // 2. Upload Photos and Insert Punchlist Items
            for (const item of items) {
                let photo_url = '';

                if (item.photo) {
                    const fileExt = item.photo.name.split('.').pop();
                    const fileName = `${inspection.id}_${Math.random()}.${fileExt}`;
                    const filePath = `inspections/${fileName}`;

                    await supabase.storage
                        .from('inspection-photos')
                        .upload(filePath, item.photo);

                    const { data: { publicUrl } } = supabase.storage
                        .from('inspection-photos')
                        .getPublicUrl(filePath);

                    photo_url = publicUrl;
                }

                await supabase.from('punchlist_items').insert([{
                    inspection_id: inspection.id,
                    category: item.category,
                    severity: item.severity,
                    description: item.description,
                    photo_url
                }]);
            }

            generatePDF(inspection.id);
            setIsSuccess(true);
        } catch (err) {
            console.error('Finalization error:', err);
            alert("Failed to finalize inspection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const generatePDF = (inspectionId: string) => {
        const pdf = new jsPDF();
        pdf.setFontSize(22);
        pdf.setTextColor(220, 38, 38);
        pdf.text('SITE INSPECTION REPORT', 20, 20);

        pdf.setFontSize(10);
        pdf.setTextColor(100);
        pdf.text(`Project: ${inspectionData.project_name}`, 20, 35);
        pdf.text(`Inspector: ${inspectionData.inspector_name}`, 20, 42);
        pdf.text(`Date: ${format(new Date(), 'PPpp')}`, 20, 49);
        pdf.text(`Reference: ${inspectionId.substring(0, 8).toUpperCase()}`, 20, 56);

        pdf.setLineWidth(0.5);
        pdf.line(20, 65, 190, 65);

        let y = 80;
        items.forEach((item, i) => {
            if (y > 250) {
                pdf.addPage();
                y = 20;
            }

            pdf.setFontSize(14);
            pdf.setTextColor(0);
            pdf.text(`${i + 1}. [${item.severity}] ${item.category}`, 20, y);

            pdf.setFontSize(10);
            pdf.setTextColor(80);
            const splitText = pdf.splitTextToSize(item.description, 160);
            pdf.text(splitText, 20, y + 10);

            y += 20 + (splitText.length * 5);
        });

        pdf.save(`Inspection_${inspectionData.project_name}_${format(new Date(), 'yyyyMMdd')}.pdf`);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center font-sans">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-accent rounded-full flex items-center justify-center mb-8 animate-reveal-up shadow-xl shadow-accent/20">
                    <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
                <h1 className="text-3xl md:text-5xl font-display font-black mb-4 tracking-tighter">Report Finalized.</h1>
                <p className="text-stone-500 max-w-sm md:max-w-md mx-auto mb-12 text-base md:text-lg font-light">
                    The site inspection data has been synchronized with the L-Pro database. Your branded PDF report is ready for distribution.
                </p>
                <MagneticButton>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-stone-900 text-white px-12 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-accent transition-all active:scale-95 shadow-xl shadow-stone-900/10"
                    >
                        Back to Workspace
                    </button>
                </MagneticButton>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-accent selection:text-white pb-32 relative overflow-x-hidden">
            {/* Ambient Background Detail */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-stone-100/50 to-transparent pointer-events-none" />

            <header className="py-6 md:py-10 px-6 bg-white/80 backdrop-blur-md border-b border-stone-100 flex items-center justify-between sticky top-0 z-[100]">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                    <button onClick={() => window.location.href = '/'} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-stone-900 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 transition-transform group-hover:rotate-0">
                            <HardHat className="w-5 h-5 text-white" />
                        </div>
                        <div className="hidden xs:block">
                            <h1 className="text-lg font-display font-black tracking-tight uppercase leading-none">Site Inspect</h1>
                            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-1 block">Automation Engine</span>
                        </div>
                    </button>
                    <div className="flex items-center gap-3 md:gap-6">
                        {[1, 2].map(s => (
                            <div key={s} className="flex flex-col items-center gap-1.5">
                                <div className={`h-1 w-10 md:w-20 rounded-full transition-all duration-700 ${step >= s ? 'bg-accent shadow-[0_0_8px_rgba(220,38,38,0.4)]' : 'bg-stone-100'}`} />
                                <span className={`text-[8px] font-black uppercase tracking-widest ${step === s ? 'text-accent' : 'text-stone-300'}`}>Phase 0{s}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <main className={`transition-all duration-500 max-w-7xl mx-auto px-6 pt-12 lg:pt-24 ${step === 2 ? 'max-w-7xl' : 'max-w-3xl'}`}>
                {step === 1 ? (
                    <div className="space-y-12 animate-reveal-up max-w-2xl mx-auto">
                        <div className="mb-20">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 mb-6 border border-stone-100 shadow-sm">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                                Protocol: Field Logistics
                            </div>
                            <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter mb-8 leading-[0.85]">
                                New<br /><span className="text-stone-300 transform inline-block translate-x-4">Inspection.</span>
                            </h2>
                            <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed max-w-sm">
                                Initialize your site visit. These details will brand the final PDF report sent to contractors.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 ml-1">Project Identifier</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Mount Coffee Hydro Rehabilitation"
                                    value={inspectionData.project_name}
                                    onChange={(e) => setInspectionData({ ...inspectionData, project_name: e.target.value })}
                                    className="w-full h-16 md:h-20 px-6 md:px-8 rounded-2xl md:rounded-3xl bg-white border border-stone-100 shadow-sm focus:border-accent outline-none font-medium text-lg md:text-xl placeholder:text-stone-200 transition-all font-display"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 ml-1">Lead Inspector</label>
                                <input
                                    type="text"
                                    placeholder="Your Full Name"
                                    value={inspectionData.inspector_name}
                                    onChange={(e) => setInspectionData({ ...inspectionData, inspector_name: e.target.value })}
                                    className="w-full h-16 md:h-20 px-6 md:px-8 rounded-2xl md:rounded-3xl bg-white border border-stone-100 shadow-sm focus:border-accent outline-none font-medium text-lg md:text-xl placeholder:text-stone-200 transition-all font-display"
                                />
                            </div>
                        </div>

                        <div className="pt-12">
                            <MagneticButton>
                                <button
                                    onClick={() => inspectionData.project_name && inspectionData.inspector_name ? setStep(2) : alert("Fill required fields.")}
                                    className="w-full md:w-auto bg-stone-900 text-white font-black px-12 py-6 rounded-2xl md:rounded-3xl flex items-center justify-center gap-4 transition-all hover:bg-accent group active:scale-95 shadow-xl shadow-stone-900/10"
                                >
                                    Log Site Defects <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </MagneticButton>
                        </div>
                    </div>
                ) : (
                    <div className="animate-reveal-up pb-20">
                        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-2">
                            <div>
                                <h1 className="text-4xl md:text-7xl font-display font-black tracking-tighter leading-none mb-4">Punchlist<br /><span className="text-stone-300">Automator.</span></h1>
                                <p className="text-stone-500 font-light text-lg">Logged {items.length} findings for <span className="text-stone-900 font-bold">{inspectionData.project_name}</span></p>
                            </div>
                            <button
                                onClick={() => setStep(1)}
                                className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-stone-100 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-accent hover:border-accent/20 transition-all shadow-sm self-start md:self-auto"
                            >
                                <ArrowLeft size={14} /> Back to Setup
                            </button>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-20">
                            {/* Desktop Sidebar: Add New Item */}
                            <div className="lg:col-span-5 order-2 lg:order-1">
                                <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-stone-100 shadow-2xl space-y-8 sticky top-32">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-accent/5 flex items-center justify-center">
                                                <Plus size={16} className="text-accent" />
                                            </div>
                                            Log New Entry
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-1">System Type</label>
                                            <select
                                                value={newItem.category}
                                                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                                className="w-full h-14 px-5 rounded-xl bg-stone-50 border border-transparent focus:border-accent outline-none font-bold text-[10px] uppercase tracking-widest appearance-none cursor-pointer"
                                            >
                                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-1">Severity Tier</label>
                                            <select
                                                value={newItem.severity}
                                                onChange={(e) => setNewItem({ ...newItem, severity: e.target.value as any })}
                                                className="w-full h-14 px-5 rounded-xl bg-stone-50 border border-transparent focus:border-accent outline-none font-bold text-[10px] uppercase tracking-widest appearance-none cursor-pointer"
                                            >
                                                {SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-1">Detailed Findings</label>
                                        <textarea
                                            placeholder="Specify location and nature of defect..."
                                            value={newItem.description}
                                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                            className="w-full h-32 px-6 py-5 rounded-2xl bg-stone-50 border border-transparent focus:border-accent outline-none font-medium text-base resize-none placeholder:text-stone-200"
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`flex-grow h-16 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all border ${newItem.photo ? 'bg-green-50 text-green-600 border-green-100 shadow-lg shadow-green-500/5' : 'bg-stone-50 text-stone-500 hover:bg-white border-transparent hover:border-stone-100'
                                                }`}
                                        >
                                            {newItem.photo ? <CheckCircle2 size={18} /> : <Camera size={18} />}
                                            <span className="text-[10px] font-black uppercase tracking-widest">
                                                {newItem.photo ? "Visual Evidence Captured" : "Snap Inspection Photo"}
                                            </span>
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        <button
                                            onClick={handleAddItem}
                                            disabled={!newItem.description}
                                            className="h-16 px-8 bg-stone-900 text-white rounded-2xl flex items-center justify-center hover:bg-accent transition-all shadow-xl shadow-stone-900/10 disabled:opacity-20 active:scale-95"
                                        >
                                            <Plus size={24} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Main Area: Punchlist Log */}
                            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-stone-400">Current Log Session</h3>
                                    {items.length > 0 && (
                                        <span className="text-[9px] font-black text-accent bg-accent/5 px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">Live Link Active</span>
                                    )}
                                </div>

                                <div className="space-y-4 max-h-[70vh] lg:max-h-[60vh] overflow-y-auto pr-4 scrollbar-hide lg:border-l-2 lg:border-stone-100 lg:pl-8">
                                    {items.length === 0 ? (
                                        <div className="py-32 lg:py-48 border-2 border-dashed border-stone-100 rounded-[3rem] flex flex-col items-center justify-center text-stone-200">
                                            <div className="w-20 h-20 rounded-full bg-stone-50 flex items-center justify-center mb-6">
                                                <AlertTriangle size={32} className="opacity-20" />
                                            </div>
                                            <p className="font-black uppercase tracking-[0.3em] text-[10px]">No infrastructure logs recorded</p>
                                        </div>
                                    ) : (
                                        items.map((item, idx) => (
                                            <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm flex items-start justify-between group animate-reveal-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                                <div className="space-y-4 flex-grow">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest text-white shadow-sm ${item.severity === 'Critical' ? 'bg-red-600' : item.severity === 'High' ? 'bg-orange-500' : 'bg-stone-400'
                                                            }`}>
                                                            {item.severity}
                                                        </span>
                                                        <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest">{item.category} Module</span>
                                                    </div>
                                                    <p className="text-lg font-bold text-stone-800 leading-[1.2] max-w-lg">{item.description}</p>
                                                    {item.photo && (
                                                        <div className="flex items-center gap-2 text-[9px] font-black text-green-500 uppercase tracking-widest">
                                                            <CheckCircle2 size={12} /> Photo Attachment Ready
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id!)}
                                                    className="w-12 h-12 rounded-xl bg-stone-50 text-stone-200 hover:text-red-500 hover:bg-white border border-transparent hover:border-red-100 transition-all flex items-center justify-center self-center"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="pt-10">
                                    <MagneticButton className="w-full">
                                        <button
                                            disabled={isSubmitting || items.length === 0}
                                            onClick={finalizeInspection}
                                            className="w-full bg-accent text-white font-black py-8 rounded-[2.5rem] flex items-center justify-center gap-4 hover:shadow-2xl hover:shadow-accent/40 hover:bg-stone-900 transition-all disabled:opacity-20 active:scale-95 text-lg uppercase tracking-tighter"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="animate-spin w-8 h-8" />
                                            ) : (
                                                <><Send className="w-6 h-6" /> Finalize Audit & Download Report</>
                                            )}
                                        </button>
                                    </MagneticButton>
                                    <p className="text-center mt-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] opacity-50">
                                        Encrypted Transmission • Compliance Standard ISO-27001
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default InspectionForm;
