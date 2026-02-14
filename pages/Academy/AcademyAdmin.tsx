import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Users, BookOpen, BarChart3, Search, ArrowUpRight, MoreHorizontal, Loader2, AlertCircle } from 'lucide-react';
import { AcademyService } from '../../services/academy';

export default function AcademyAdmin() {
    const [stats, setStats] = useState<any>({ enrollments: 0, activeCourses: 0, certificates: 0 });
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAdminData() {
            try {
                const [statsData, coursesData] = await Promise.all([
                    AcademyService.getAdminStats(),
                    AcademyService.getCourses()
                ]);
                setStats(statsData);
                setCourses(coursesData);
            } catch (error) {
                console.error("Failed to load admin data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadAdminData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 animate-spin text-red-600" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-4">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-neutral-200 pb-8">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-black text-black tracking-tighter">
                        Academy <span className="text-red-600">Command.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-xl font-medium">
                        Manage curriculum, students, and certification issuance.
                    </p>
                </div>

                <div className="flex gap-4">
                    <button className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-neutral-800 transition-colors shadow-lg">
                        <Plus className="w-4 h-4" /> Initialize New Protocol
                    </button>
                    {/* Placeholder for future export/reports */}
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Enrolled" value={stats.enrollments.toString()} icon={Users} trend="Active Students" />
                <StatCard label="Active Protocols" value={stats.activeCourses.toString()} icon={BookOpen} trend="Live Courses" />
                <StatCard label="Certificates Issued" value={stats.certificates.toString()} icon={BarChart3} trend="Total Credentials" accent />
            </div>

            {/* Course Management */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black text-black uppercase tracking-tight">Active Protocols</h2>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-64 border-b-2 border-neutral-200 bg-transparent py-2 pl-8 font-bold text-black focus:outline-none focus:border-black transition-colors placeholder-neutral-400"
                        />
                        <Search className="w-4 h-4 text-neutral-400 absolute left-0 top-1/2 -translate-y-1/2 group-focus-within:text-black transition-colors" />
                    </div>
                </div>

                <div className="border-2 border-neutral-900 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-neutral-900 bg-neutral-50">
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">Protocol Name</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">Duration</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">Status</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">Category</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors group">
                                    <td className="px-8 py-6 font-bold text-black">{course.title}</td>
                                    <td className="px-8 py-6 font-mono text-neutral-600">{course.duration_minutes} min</td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border ${course.published
                                            ? 'bg-green-50 text-green-700 border-green-200'
                                            : 'bg-neutral-100 text-neutral-500 border-neutral-200'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${course.published ? 'bg-green-600' : 'bg-neutral-500'}`}></span>
                                            {course.published ? 'Active' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 font-mono text-black text-xs uppercase">{course.category}</td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-black hover:text-white transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-red-600 hover:text-white transition-colors text-red-600">
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon: Icon, trend, accent = false }: { label: string, value: string, icon: any, trend: string, accent?: boolean }) {
    return (
        <div className={`bg-white border-2 p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform ${accent ? 'border-red-600' : 'border-neutral-200 hover:border-black'}`}>
            <div className="flex justify-between items-start mb-4">
                <Icon className={`w-6 h-6 ${accent ? 'text-red-600' : 'text-neutral-400 group-hover:text-black'} transition-colors`} />
                {accent && <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>}
            </div>

            <div className="text-4xl font-black text-black tracking-tighter mb-2">{value}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{label}</div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-medium text-neutral-400">
                <ArrowUpRight className="w-3 h-3" /> {trend}
            </div>
        </div>
    )
}
