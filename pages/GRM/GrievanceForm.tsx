import React, { useState } from 'react';
import { Shield, ArrowRight, ArrowLeft, Send, CheckCircle2, AlertCircle, Loader2, Camera, Upload, Lock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import MagneticButton from '../../components/MagneticButton';

const CATEGORIES = ['Environmental', 'Property Damage', 'Safety', 'Labor Dispute', 'Other'];

const GrievanceForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        complainant_name: '',
        contact_info: '',
        issue_category: '',
        description: '',
        evidence_url: ''
    });

    const [file, setFile] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            let evidence_url = '';

            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `grievances/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('grievance-evidence')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('grievance-evidence')
                    .getPublicUrl(filePath);

                evidence_url = publicUrl;
            }

            const { error: insertError } = await supabase
                .from('grievances')
                .insert([{ ...formData, evidence_url }]);

            if (insertError) throw insertError;

            setIsSuccess(true);
        } catch (err: any) {
            console.error('Submission error:', err);
            setError(err.message || 'An error occurred during submission.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 font-sans">
                <div className="max-w-md w-full text-center space-y-8 animate-reveal-up">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-display font-black text-stone-900 tracking-tight">Grievance Submitted</h1>
                    <p className="text-stone-500 text-base md:text-lg leading-relaxed">
                        Your report has been received and logged into our secure system. Our compliance team will review it immediately.
                    </p>
                    <div className="pt-4 flex justify-center">
                        <MagneticButton>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold hover:bg-accent transition-all shadow-xl shadow-stone-900/10 active:scale-95"
                            >
                                Return Home
                            </button>
                        </MagneticButton>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-accent selection:text-white pb-20 relative">
            {/* Ambient Background Detail */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/[0.02] blur-[120px] pointer-events-none" />

            {/* Header */}
            <header className="py-6 md:py-10 px-6 border-b border-stone-100 bg-white/80 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <button onClick={() => window.location.href = '/'} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-accent rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 transition-transform group-hover:rotate-0">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div className="hidden xs:block">
                            <h1 className="text-lg font-display font-black tracking-tight uppercase leading-none">L-Pro GRM</h1>
                            <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest mt-1">Governance Portal</p>
                        </div>
                    </button>
                    <div className="flex items-center gap-1.5 md:gap-3">
                        {[1, 2, 3].map(s => (
                            <div key={s} className="flex flex-col items-center gap-1.5">
                                <div className={`h-1 mx-0.5 w-6 md:w-12 rounded-full transition-all duration-700 ${step >= s ? 'bg-accent shadow-[0_0_8px_rgba(220,38,38,0.4)]' : 'bg-stone-100'}`} />
                                <span className={`text-[8px] font-black uppercase tracking-widest ${step === s ? 'text-accent' : 'text-stone-300'}`}>0{s}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 pt-12 md:pt-24 lg:pt-32">
                <div className="mb-12 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 mb-6 animate-reveal-up">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                        Compliance Form v4.2
                    </div>
                    <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-6 md:mb-8 animate-reveal-up leading-[0.9]">
                        {step === 1 && <><span className="text-stone-300">Who are</span><br />you?</>}
                        {step === 2 && <><span className="text-stone-300">The</span><br />details.</>}
                        {step === 3 && <><span className="text-stone-300">Evidence &</span><br />Review</>}
                    </h2>
                    <p className="text-stone-500 text-lg md:text-xl font-light animate-reveal-up max-w-xl leading-relaxed">
                        {step === 1 && "Tell us how to reach you. You can remain anonymous if you wish, though it may limit our ability to follow up."}
                        {step === 2 && "Clearly describe the incident or concern. Accuracy is critical for internal governance auditing."}
                        {step === 3 && "Attach any photos or documents that support your claim, then finalize your submission."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12 animate-reveal-up">
                    <div className="transition-all duration-500 ease-out transform">
                        {step === 1 && (
                            <div className="space-y-8 animate-reveal-up">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Full Name (Optional)</label>
                                        <input
                                            type="text"
                                            name="complainant_name"
                                            value={formData.complainant_name}
                                            onChange={handleInputChange}
                                            placeholder="John Doe (or Blank)"
                                            className="w-full h-16 md:h-20 px-6 md:px-8 rounded-2xl md:rounded-3xl bg-white border border-stone-100 shadow-sm focus:border-accent outline-none transition-all placeholder:text-stone-200 font-medium text-lg"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Contact Reference</label>
                                        <input
                                            type="text"
                                            name="contact_info"
                                            value={formData.contact_info}
                                            onChange={handleInputChange}
                                            placeholder="Email or Phone No."
                                            className="w-full h-16 md:h-20 px-6 md:px-8 rounded-2xl md:rounded-3xl bg-white border border-stone-100 shadow-sm focus:border-accent outline-none transition-all placeholder:text-stone-200 font-medium text-lg"
                                        />
                                    </div>
                                </div>
                                <div className="pt-8 flex justify-end">
                                    <MagneticButton>
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="w-full md:w-auto bg-stone-900 text-white font-black px-12 py-5 md:py-6 rounded-2xl md:rounded-3xl flex items-center justify-center gap-4 transition-all hover:bg-accent group active:scale-95 shadow-xl shadow-stone-900/10"
                                        >
                                            Next Step <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </button>
                                    </MagneticButton>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8 animate-reveal-up">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Issue Category</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {CATEGORIES.map(c => (
                                            <button
                                                key={c}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, issue_category: c }))}
                                                className={`h-14 md:h-16 rounded-xl md:rounded-2xl border transition-all font-bold text-[10px] md:text-xs uppercase tracking-widest ${formData.issue_category === c
                                                    ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20'
                                                    : 'bg-white border-stone-100 text-stone-400 hover:border-stone-300'
                                                    }`}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Narrative Analysis</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        placeholder="Describe exactly what happened, when, and where..."
                                        className="w-full px-6 md:px-8 py-6 rounded-2xl md:rounded-3xl bg-white border border-stone-100 shadow-sm focus:border-accent outline-none transition-all placeholder:text-stone-200 font-medium resize-none leading-relaxed text-lg"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 pt-10">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="h-16 md:h-20 px-10 rounded-2xl md:rounded-3xl border border-stone-100 bg-white font-black text-xs uppercase tracking-widest hover:bg-stone-50 transition-all flex items-center justify-center gap-3 order-2 md:order-1"
                                    >
                                        <ArrowLeft className="w-5 h-5" /> Back
                                    </button>
                                    <MagneticButton className="flex-grow order-1 md:order-2">
                                        <button
                                            type="button"
                                            onClick={() => formData.issue_category && formData.description ? setStep(3) : alert("Please fill in required fields")}
                                            className="w-full h-16 md:h-20 bg-stone-900 text-white font-black rounded-2xl md:rounded-3xl flex items-center justify-center gap-4 hover:bg-accent transition-all group shadow-xl shadow-stone-900/10"
                                        >
                                            Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </button>
                                    </MagneticButton>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-8 animate-reveal-up">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Supporting Documentation</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="w-full h-56 rounded-[2.5rem] border-2 border-dashed border-stone-100 group-hover:border-accent/30 transition-all flex flex-col items-center justify-center gap-4 bg-white shadow-inner">
                                            <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-accent/5 transition-all">
                                                <Camera className="w-8 h-8 text-stone-200 group-hover:text-accent transition-colors" />
                                            </div>
                                            <div className="text-center">
                                                <span className="block text-sm font-black text-stone-900 uppercase tracking-widest mb-1">
                                                    {file ? "File Ready" : "Capture Evidence"}
                                                </span>
                                                <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">
                                                    {file ? file.name : "Photos, Videos, or PDF Documents"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-5 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 text-red-600 animate-reveal-up">
                                        <AlertCircle className="w-6 h-6 mt-0.5 shrink-0" />
                                        <p className="text-sm font-bold leading-relaxed">{error}</p>
                                    </div>
                                )}

                                <div className="bg-stone-900 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex justify-between items-center opacity-40">
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Audit Protocol</span>
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">
                                            By submitting this log, you acknowledge that the information provided is part of an official infrastructure compliance record. Your data will be processed according to L-Pro Solutions' strict confidentiality and governance protocols.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 pt-10">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="h-16 md:h-20 px-10 rounded-2xl md:rounded-3xl border border-stone-100 bg-white font-black text-xs uppercase tracking-widest hover:bg-stone-50 transition-all flex items-center justify-center gap-3 order-2 md:order-1"
                                    >
                                        <ArrowLeft className="w-5 h-5" /> Back
                                    </button>
                                    <MagneticButton className="flex-grow order-1 md:order-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-16 md:h-20 bg-accent text-white font-black rounded-2xl md:rounded-3xl flex items-center justify-center gap-4 hover:shadow-2xl hover:shadow-accent/40 transition-all disabled:opacity-50 active:scale-95"
                                        >
                                            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-5 h-5" /> Finalize Submission</>}
                                        </button>
                                    </MagneticButton>
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </main>
        </div>
    );
};

export default GrievanceForm;
