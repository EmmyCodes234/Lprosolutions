import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, Download, ExternalLink, Shield, FileCheck, Lock, Loader2, AlertCircle, Search, ShieldCheck } from 'lucide-react';
import { AcademyService } from '../../services/academy';
import { supabase } from '../../lib/supabase';

export default function AcademyCertificates() {
    const [certificates, setCertificates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [verifyCode, setVerifyCode] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadCertificates() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const data = await AcademyService.getUserCertificates(user.id);
                    setCertificates(data || []);
                }
            } catch (err) {
                console.error("Failed to load certificates:", err);
            } finally {
                setLoading(false);
            }
        }
        loadCertificates();
    }, []);

    const handleVerify = async () => {
        if (!verifyCode.trim()) return;
        setVerifying(true);
        setVerificationResult(null);
        setError(null);

        try {
            const result = await AcademyService.verifyCertificate(verifyCode.trim());
            if (result) {
                setVerificationResult(result);
            } else {
                setError("Certificate not found or invalid.");
            }
        } catch (err) {
            setError("Certificate not found or invalid.");
        } finally {
            setVerifying(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-stone-950">
                <Loader2 className="w-10 h-10 animate-spin text-[#FFD700]" />
            </div>
        );
    }

    return (
        <div className="flex-grow bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-stone-950 p-4 md:p-12 overflow-y-auto min-h-screen">
            <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-4">

                {/* 1. HEADER */}
                <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-stone-800 pb-8">
                    <div className="space-y-4 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#FFD700]">
                            <ShieldCheck className="w-3 h-3 text-[#FFD700]" /> Achievements
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                            MY <br />
                            <span className="text-stone-500">CERTIFICATES</span>
                        </h1>
                    </div>

                    <div className="px-6 py-3 bg-stone-900/50 backdrop-blur-sm border border-stone-800 flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
                        <Shield className="w-4 h-4 text-[#FFD700]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Verified</span>
                    </div>
                </header>

                {/* 2. CERTIFICATE GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {certificates.length > 0 ? (
                        certificates.map(cert => (
                            <div key={cert.id} className="group relative bg-stone-900/40 border border-stone-800 p-8 hover:border-[#FFD700]/50 transition-all duration-500 hover:bg-stone-900/60">

                                {/* Gold Foil Accent */}
                                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-50">
                                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#FFD700] to-transparent"></div>
                                    <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-l from-[#FFD700] to-transparent"></div>
                                </div>

                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-16 h-16 bg-stone-950 border border-stone-800 text-[#FFD700] flex items-center justify-center rounded-sm">
                                        <Award className="w-8 h-8" />
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-1">Status</span>
                                        <span className="flex items-center gap-2 text-xs font-bold text-[#FFD700] uppercase tracking-wide justify-end bg-[#FFD700]/10 px-2 py-1 border border-[#FFD700]/20 rounded-sm">
                                            <CheckCircle className="w-3 h-3 fill-current" /> Valid
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:text-[#FFD700] transition-colors">
                                    {cert.course?.title || "Professional Certification"}
                                </h3>
                                <p className="text-stone-500 text-xs font-mono mb-8 uppercase tracking-wider">
                                    Issued: {new Date(cert.issued_at).toLocaleDateString()}
                                </p>

                                <div className="space-y-4 border-t border-stone-800/50 pt-6">
                                    <div className="flex justify-between text-[10px] font-mono text-stone-600 uppercase tracking-widest">
                                        <span>ID: {cert.certificate_code}</span>
                                    </div>

                                    <div className="flex gap-4">
                                        <button className="flex-1 bg-stone-100 hover:bg-white text-black text-[10px] font-bold uppercase tracking-widest py-3 flex items-center justify-center gap-2 transition-colors">
                                            <Download className="w-3 h-3" /> Download PDF
                                        </button>
                                        <button
                                            onClick={() => {
                                                setVerifyCode(cert.certificate_code);
                                            }}
                                            className="flex-1 border border-stone-700 hover:border-[#FFD700] text-stone-400 hover:text-[#FFD700] text-[10px] font-bold uppercase tracking-widest py-3 flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <ExternalLink className="w-3 h-3" /> Verify
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="md:col-span-2 py-24 text-center border border-dashed border-stone-800 bg-stone-900/20 rounded-sm group hover:border-[#FFD700]/30 transition-colors">
                            <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-stone-800 group-hover:border-[#FFD700] transition-colors">
                                <Award className="w-8 h-8 text-stone-600 group-hover:text-[#FFD700] transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Certificates Earned Yet</h3>
                            <p className="text-stone-500 text-sm max-w-xs mx-auto">Complete courses in the Library to earn professional certification.</p>
                        </div>
                    )}
                </div>

                {/* 3. VERIFICATION TOOL */}
                <section className="bg-stone-900/30 border border-stone-800 p-12 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent opacity-50"></div>

                    <div className="relative z-10">
                        <Lock className="w-10 h-10 text-stone-600 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-2">Verify External Credential</h2>
                        <p className="text-stone-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                            Enter a unique certificate ID to instantly verify its authenticity against the L-Pro immutable ledger.
                        </p>

                        <div className="max-w-md mx-auto flex gap-0 shadow-2xl">
                            <input
                                type="text"
                                value={verifyCode}
                                onChange={(e) => setVerifyCode(e.target.value)}
                                placeholder="ENTER-CERT-ID-XXXX"
                                className="flex-grow bg-stone-950 border border-stone-800 border-r-0 px-6 py-4 text-xs font-mono text-[#FFD700] focus:outline-none focus:border-[#FFD700] transition-colors placeholder-stone-700 uppercase tracking-widest"
                            />
                            <button
                                onClick={handleVerify}
                                disabled={verifying}
                                className="bg-[#FFD700] hover:bg-[#E5C100] text-black px-8 font-bold uppercase tracking-widest text-[10px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {verifying ? <Loader2 className="w-3 h-3 animate-spin" /> : "Verify"}
                            </button>
                        </div>

                        {verificationResult && (
                            <div className="max-w-md mx-auto mt-8 bg-green-950/30 border border-green-900 p-6 animate-in fade-in slide-in-from-top-2 text-left">
                                <div className="flex items-center gap-3 mb-4 border-b border-green-900/50 pb-4">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-green-500 font-bold uppercase tracking-widest text-xs">Verified Valid</span>
                                </div>
                                <div className="space-y-2 text-xs font-mono text-green-400">
                                    <p>RECIPIENT: <span className="text-white">{verificationResult.user?.full_name}</span></p>
                                    <p>PROTOCOL: <span className="text-white">{verificationResult.course?.title}</span></p>
                                    <p>ISSUED: <span className="text-white">{new Date(verificationResult.issued_at).toLocaleDateString()}</span></p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="max-w-md mx-auto mt-8 bg-red-950/30 border border-red-900 p-4 flex items-center justify-center gap-2 text-red-500 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="w-4 h-4" />
                                <span className="font-bold uppercase tracking-widest text-xs">{error}</span>
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
}
