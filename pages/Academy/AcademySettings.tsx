import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, LogOut, Camera, ShieldAlert, Loader2, Save, CheckCircle, AlertCircle, ShieldCheck, Mail, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AcademySettings() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Form Stats
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [jobTitle, setJobTitle] = useState("");

    useEffect(() => {
        async function loadProfile() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setUser(user);

                    const { data, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', user.id)
                        .single();

                    if (data) {
                        setProfile(data);
                        setFirstName(data.first_name || "");
                        setLastName(data.last_name || "");
                        setJobTitle(data.job_title || "");
                    }
                }
            } catch (err) {
                console.error("Failed to load profile:", err);
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);

    const handleUpdateProfile = async () => {
        if (!user) return;
        setSaving(true);
        setMessage(null);

        try {
            const updates = {
                id: user.id,
                first_name: firstName,
                last_name: lastName,
                job_title: jobTitle,
                updated_at: new Date(),
            };

            const { error } = await supabase
                .from('profiles')
                .upsert(updates);

            if (error) throw error;
            setMessage({ type: 'success', text: "Profile updated successfully." });
        } catch (error) {
            setMessage({ type: 'error', text: "Failed to update profile." });
        } finally {
            setSaving(false);
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
            <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-4">

                {/* Header */}
                <div className="space-y-4 border-b border-stone-800 pb-8 flex flex-col md:flex-row justify-between items-end">
                    <div className="space-y-4 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#FFD700]">
                            <ShieldCheck className="w-3 h-3 text-[#FFD700]" /> Membership Status: Verified
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
                            ACCOUNT <br />
                            <span className="text-stone-500">SETTINGS</span>
                        </h1>
                    </div>
                    <div className="px-4 py-2 bg-stone-900 border border-stone-800 flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Online</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Main Form Area */}
                    <div className="md:col-span-2 space-y-12">

                        {/* Message Toast */}
                        {message && (
                            <div className={`p-4 border ${message.type === 'success' ? 'bg-green-900/20 border-green-900/50 text-green-400' : 'bg-red-900/20 border-red-900/50 text-red-400'} flex items-start gap-3 text-xs font-bold uppercase tracking-wide`}>
                                {message.type === 'success' ? <CheckCircle className="w-4 h-4 mt-0.5" /> : <AlertCircle className="w-4 h-4 mt-0.5" />}
                                <span className="mt-0.5">{message.text}</span>
                            </div>
                        )}

                        {/* Profile Section */}
                        <section className="space-y-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-2 bg-stone-900 border border-stone-800 rounded-sm">
                                    <User className="w-5 h-5 text-[#FFD700]" />
                                </div>
                                <h2 className="text-lg font-bold text-white uppercase tracking-widest">Public Profile</h2>
                            </div>

                            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                <div className="relative group cursor-pointer self-center md:self-auto flex-shrink-0">
                                    <div className="w-24 h-24 bg-stone-900 rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 border-stone-800 group-hover:border-[#FFD700] transition-all shadow-xl">
                                        {firstName?.charAt(0) || user?.email?.charAt(0) || "U"}
                                    </div>
                                    <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-6 h-6 text-[#FFD700]" />
                                    </div>
                                </div>
                                <div className="flex-grow space-y-6 w-full">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">First Name</label>
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="w-full bg-stone-900/50 border border-stone-800 p-3 text-sm font-medium text-white focus:outline-none focus:border-[#FFD700] transition-colors rounded-none placeholder-stone-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Last Name</label>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full bg-stone-900/50 border border-stone-800 p-3 text-sm font-medium text-white focus:outline-none focus:border-[#FFD700] transition-colors rounded-none placeholder-stone-700"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Job Title</label>
                                        <input
                                            type="text"
                                            value={jobTitle}
                                            onChange={(e) => setJobTitle(e.target.value)}
                                            placeholder="e.g. Senior Project Manager"
                                            className="w-full bg-stone-900/50 border border-stone-800 p-3 text-sm font-medium text-white focus:outline-none focus:border-[#FFD700] transition-colors rounded-none placeholder-stone-700"
                                        />
                                    </div>

                                    <button
                                        onClick={handleUpdateProfile}
                                        disabled={saving}
                                        className="bg-[#FFD700] hover:bg-[#E5C100] text-black px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Security Section */}
                        <section className="space-y-8 pt-8 border-t border-stone-800/50">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-2 bg-stone-900 border border-stone-800 rounded-sm">
                                    <Shield className="w-5 h-5 text-[#FFD700]" />
                                </div>
                                <h2 className="text-lg font-bold text-white uppercase tracking-widest">Security Credentials</h2>
                            </div>

                            <div className="space-y-6 max-w-lg">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Primary Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                                        <input
                                            type="email"
                                            disabled
                                            value={user?.email || ""}
                                            className="w-full bg-stone-900 border border-stone-800 p-3 pl-10 text-sm font-mono text-stone-400 cursor-not-allowed rounded-none"
                                        />
                                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-700" />
                                    </div>
                                </div>

                                <button className="w-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors border border-stone-800 flex items-center justify-center gap-2 group">
                                    <Lock className="w-3 h-3 group-hover:text-[#FFD700] transition-colors" /> Update Password (Managed by SSO)
                                </button>
                            </div>
                        </section>

                        {/* Account Management */}
                        <section className="pt-8 border-t border-red-900/30">
                            <div className="border border-red-900/30 bg-red-950/10 p-6 flex flex-col md:flex-row items-start gap-4">
                                <ShieldAlert className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                <div className="flex-grow">
                                    <h3 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-2">Account Management</h3>
                                    <p className="text-red-400/70 text-sm mb-6 leading-relaxed">
                                        Disabling your account will revoke access to all active courses and certifications immediately. <br />This action requires Administrator approval to reverse.
                                    </p>
                                    <button className="text-white bg-red-900/50 hover:bg-red-600 border border-red-900 hover:border-red-500 px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors rounded-sm">
                                        Deactivate Account
                                    </button>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Quick Nav / Sidebar */}
                    <div className="hidden md:block">
                        <div className="sticky top-12 space-y-1">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-4 px-4">Navigation</div>
                            <button className="w-full text-left px-4 py-3 border-l-2 border-[#FFD700] bg-stone-900/50 text-white font-bold text-xs uppercase tracking-wide">
                                Public Profile
                            </button>
                            <button className="w-full text-left px-4 py-3 border-l-2 border-transparent text-stone-500 hover:text-white hover:bg-stone-900/30 text-xs font-bold uppercase tracking-wide transition-colors">
                                Security & Password
                            </button>
                            <button className="w-full text-left px-4 py-3 border-l-2 border-transparent text-stone-500 hover:text-white hover:bg-stone-900/30 text-xs font-bold uppercase tracking-wide transition-colors">
                                API Access Keys
                            </button>
                            <button className="w-full text-left px-4 py-3 border-l-2 border-transparent text-stone-500 hover:text-white hover:bg-stone-900/30 text-xs font-bold uppercase tracking-wide transition-colors">
                                Notifications
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
