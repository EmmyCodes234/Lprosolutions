import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, CheckCircle, Circle, PlayCircle, FileText, Menu, X, Share2, Award, Download, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { AcademyService } from '../../services/academy';
import { supabase } from '../../lib/supabase';

export default function CoursePlayer() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentLesson, setCurrentLesson] = useState<any>(null);
    const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
    const [completing, setCompleting] = useState(false);

    useEffect(() => {
        async function loadCourse() {
            if (!courseId) return;
            try {
                setLoading(true);
                const data = await AcademyService.getCourseDetails(courseId);
                setCourse(data);

                // Default to first lesson of first module
                if (data?.modules?.[0]?.lessons?.[0]) {
                    setCurrentLesson(data.modules[0].lessons[0]);
                    // Auto expand first module
                    setExpandedModules({ [data.modules[0].id]: true });
                }
            } catch (error) {
                console.error("Failed to load course:", error);
            } finally {
                setLoading(false);
            }
        }
        loadCourse();
    }, [courseId]);

    const toggleModule = (moduleId: string) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };

    const handleCompleteLesson = async () => {
        if (!currentLesson || !course) return;
        try {
            setCompleting(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            await AcademyService.completeLesson(user.id, currentLesson.id);

            // Update local state
            setCourse((prev: any) => ({
                ...prev,
                modules: prev.modules.map((m: any) => ({
                    ...m,
                    lessons: m.lessons.map((l: any) =>
                        l.id === currentLesson.id ? { ...l, completed: true } : l
                    )
                }))
            }));

            // Also update currentLesson
            setCurrentLesson((prev: any) => ({ ...prev, completed: true }));

        } catch (error) {
            console.error("Failed to complete lesson:", error);
        } finally {
            setCompleting(false);
        }
    };

    if (loading) {
        return (
            <div className="h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-red-600" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="h-screen bg-black flex flex-col items-center justify-center text-stone-500 gap-4">
                <AlertCircle className="w-12 h-12 text-red-600" />
                <p>Protocol not found or access denied.</p>
                <button
                    onClick={() => navigate('/academy/courses')}
                    className="text-white underline underline-offset-4 hover:text-red-500"
                >
                    Return to command
                </button>
            </div>
        );
    }

    return (
        <div className="h-screen bg-black flex flex-col overflow-hidden font-sans text-stone-200">

            {/* Top Bar - Distraction Free */}
            <header className="h-16 border-b border-stone-900 bg-black flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/academy/courses')}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-white transition-colors group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Exit Protocol
                    </button>
                    <div className="h-8 w-px bg-stone-900"></div>
                    <h1 className="text-sm font-bold text-white hidden md:block opacity-80">{course.title}</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end mr-4">
                        <span className="text-[10px] uppercase tracking-widest text-stone-500">Progress</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">0%</span>
                            <div className="w-24 h-1 bg-stone-900">
                                <div className="bg-red-600 h-full w-[0%]"></div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`p-2 border border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 transition-all ${sidebarOpen ? 'bg-stone-900' : 'bg-black'}`}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">

                {/* Main Content (Player) */}
                <main className="flex-1 flex flex-col relative bg-stone-950">

                    {/* Cinematic Video Stage */}
                    <div className="w-full bg-black relative shadow-2xl flex-shrink-0 border-b border-stone-900">
                        <div className="aspect-video max-h-[70vh] w-full mx-auto relative group">
                            {currentLesson?.content_type === 'video' ? (
                                <video
                                    key={currentLesson?.id} // Force remount on change
                                    className="w-full h-full object-contain"
                                    controls
                                    poster={course.thumbnail_url || "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"}
                                >
                                    <source src={currentLesson?.content_url || "https://www.w3schools.com/html/mov_bbb.mp4"} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-stone-900">
                                    <div className="text-center space-y-4">
                                        <FileText className="w-16 h-16 text-stone-600 mx-auto" />
                                        <h3 className="text-xl font-bold text-stone-400">
                                            {currentLesson?.content_type === 'quiz' ? 'Assessment Module' : 'Text Content'}
                                        </h3>
                                        <button className="bg-white text-black px-6 py-2 font-bold uppercase tracking-widest text-xs hover:bg-stone-200">
                                            Launch {currentLesson?.content_type}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lesson Details */}
                    <div className="flex-1 overflow-y-auto px-8 py-8 md:px-12 md:py-10 bg-stone-950">
                        <div className="max-w-4xl mx-auto pb-20">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8 border-b border-stone-900 pb-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-red-900/20 text-red-500 text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-red-900/30">
                                            Now Playing
                                        </span>
                                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                                            <Clock className="w-3 h-3" /> {currentLesson?.duration_minutes || 0} Min
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                                        {currentLesson?.title}
                                    </h2>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-2 px-4 py-2 border border-stone-800 hover:border-white text-stone-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 border border-stone-800 hover:border-white text-stone-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
                                        <Download className="w-4 h-4" /> Resources
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-2 space-y-8 text-stone-400 leading-relaxed font-light text-lg">
                                    <p>{course.description}</p>

                                    <div className="p-6 bg-stone-900/30 border border-stone-900 rounded-none">
                                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-red-600" /> Academy Note
                                        </h3>
                                        <p className="text-sm">
                                            Content for this module is strictly confidential. Do not distribute outside of L-Pro secure channels.
                                        </p>
                                    </div>
                                </div>

                                <div className="lg:col-span-1">
                                    <div className="bg-stone-900 p-6 border border-stone-800 sticky top-4">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-6">Action Required</div>
                                        <button
                                            onClick={handleCompleteLesson}
                                            disabled={completing || currentLesson?.completed}
                                            className={`
                                                w-full font-bold py-4 text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all mb-4
                                                ${currentLesson?.completed
                                                    ? 'bg-green-900/20 text-green-500 border border-green-900/50 cursor-default'
                                                    : 'bg-red-600 hover:bg-red-700 text-white hover:gap-3'}
                                            `}
                                        >
                                            {completing ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : currentLesson?.completed ? (
                                                <>Completed <CheckCircle className="w-4 h-4" /></>
                                            ) : (
                                                <>Complete Lesson <ChevronDown className="w-4 h-4 -rotate-90" /></>
                                            )}
                                        </button>
                                        <p className="text-xs text-stone-500 text-center">
                                            Proceed to the next module to update your protocol status.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Sidebar (Curriculum) - Collapsible */}
                <aside className={`
              ${sidebarOpen ? 'w-full md:w-[400px] border-l border-stone-900' : 'w-0 border-none'}
              bg-black transition-all duration-300 ease-in-out overflow-hidden flex flex-col flex-shrink-0 absolute md:relative right-0 h-full z-40
          `}>
                    <div className="p-6 border-b border-stone-900 min-w-[400px]">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Curriculum</h3>
                        <p className="text-xs text-stone-500">
                            {course.modules?.length || 0} Modules Available
                        </p>
                    </div>

                    <div className="flex-grow overflow-y-auto min-w-[400px]">
                        {course.modules?.map((module: any, idx: number) => (
                            <div key={module.id} className="border-b border-stone-900">
                                <div
                                    className="px-6 py-4 bg-stone-900/20 flex justify-between items-center group cursor-pointer hover:bg-stone-900/40 transition-colors"
                                    onClick={() => toggleModule(module.id)}
                                >
                                    <div>
                                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-1">Module 0{idx + 1}</span>
                                        <h4 className="text-sm font-bold text-stone-200">{module.title}</h4>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-stone-600 group-hover:text-white transition-transform ${expandedModules[module.id] ? 'rotate-180' : ''}`} />
                                </div>

                                {expandedModules[module.id] && (
                                    <div className="bg-black">
                                        {module.lessons?.map((lesson: any) => (
                                            <div
                                                key={lesson.id}
                                                onClick={() => setCurrentLesson(lesson)}
                                                className={`
                                                px-6 py-4 flex items-start gap-4 border-l-2 hover:bg-stone-900/30 cursor-pointer transition-colors
                                                ${currentLesson?.id === lesson.id
                                                        ? 'border-red-600 bg-stone-900/50'
                                                        : 'border-transparent opacity-60 hover:opacity-100'}
                                            `}
                                            >
                                                <div className="mt-1">
                                                    {lesson.completed ? (
                                                        <CheckCircle className="w-4 h-4 text-red-600" />
                                                    ) : lesson.content_type === 'quiz' ? (
                                                        <Award className="w-4 h-4 text-stone-400" />
                                                    ) : (
                                                        <PlayCircle className={`w-4 h-4 ${currentLesson?.id === lesson.id ? 'text-white' : 'text-stone-400'}`} />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-bold mb-1 ${currentLesson?.id === lesson.id ? 'text-white' : 'text-stone-400'}`}>
                                                        {lesson.title}
                                                    </p>
                                                    <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">
                                                        {lesson.duration_minutes} Min
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>

            </div>
        </div>
    );
}
