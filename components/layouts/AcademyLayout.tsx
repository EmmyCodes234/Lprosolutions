import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, GraduationCap, Users, Settings, LogOut, Search, Bell, ShieldCheck, X } from 'lucide-react';

export default function AcademyLayout() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-stone-950 font-sans text-stone-300 flex flex-col md:flex-row relative selection:bg-[#FFD700] selection:text-black">

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* 1. SIDEBAR (Left - Pure Black with Gold Accents) */}
            <aside className={`
                flex flex-col w-[260px] bg-black h-screen fixed left-0 top-0 z-50 border-r border-stone-800 transition-transform duration-300 ease-in-out
                md:translate-x-0 md:w-[80px] lg:w-[260px]
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>

                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-4 right-4 text-stone-500 hover:text-white md:hidden"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Brand */}
                <div className="p-8 cursor-pointer flex justify-center lg:justify-start" onClick={() => navigate('/')}>
                    <div className="flex items-center gap-4">
                        <div className="bg-white w-8 h-8 flex items-center justify-center flex-shrink-0">
                            <span className="text-black font-black text-lg">L</span>
                        </div>
                        <div className="hidden lg:block block">
                            <h1 className="text-white font-bold tracking-tight text-lg leading-none">L-PRO</h1>
                            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Academy</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-grow flex flex-col space-y-2 px-4 py-8">
                    <div className="px-4 mb-4 hidden lg:block block">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-600">Menu</p>
                    </div>
                    <NavItem to="/academy/dashboard" icon={LayoutDashboard} label="Dashboard" onClick={() => setIsMobileMenuOpen(false)} />
                    <NavItem to="/academy/courses" icon={BookOpen} label="Courses" onClick={() => setIsMobileMenuOpen(false)} />
                    <NavItem to="/academy/certificates" icon={GraduationCap} label="Certificates" onClick={() => setIsMobileMenuOpen(false)} />

                    <div className="my-8 border-t border-stone-900 mx-4"></div>

                    <div className="px-4 mb-4 hidden lg:block block">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-600">Account</p>
                    </div>
                    <NavItem to="/academy/users" icon={Users} label="Community" onClick={() => setIsMobileMenuOpen(false)} />
                    <NavItem to="/academy/profile" icon={Settings} label="Settings" onClick={() => setIsMobileMenuOpen(false)} />
                </nav>

                {/* User Profile */}
                <div className="p-6 border-t border-stone-900">
                    <button className="flex items-center gap-4 w-full group">
                        <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-xs font-bold text-stone-500 group-hover:border-[#FFD700] group-hover:text-[#FFD700] transition-colors">
                            OL
                        </div>
                        <div className="hidden lg:block block text-left">
                            <p className="text-sm font-bold text-white group-hover:text-[#FFD700] transition-colors">Olaribigbe</p>
                            <p className="text-[10px] text-stone-500 uppercase tracking-widest">Executive Director</p>
                        </div>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-[80px] lg:ml-[260px] flex flex-col min-h-screen relative bg-stone-950 pt-[60px] md:pt-0">
                {/* No Top Header - Pure Immersive Canvas */}
                <Outlet />
            </div>

            {/* Mobile Top Bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md text-white z-40 p-4 flex justify-between items-center border-b border-stone-800">
                <div className="flex items-center gap-3">
                    <div className="bg-white w-6 h-6 flex items-center justify-center rounded-sm">
                        <span className="text-black font-bold text-sm">L</span>
                    </div>
                    <span className="font-bold tracking-tight">ACADEMY</span>
                </div>
                <button className="text-stone-400" onClick={() => setIsMobileMenuOpen(true)}>
                    <MenuIcon />
                </button>
            </div>

        </div>
    );
}

function NavItem({ to, icon: Icon, label, onClick }: { to: string, icon: any, label: string, onClick?: () => void }) {
    return (
        <NavLink
            to={to}
            end={to === '/academy'} // Strict matching for root if needed
            onClick={onClick}
            className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group
                ${isActive
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-500 hover:text-stone-300 hover:bg-stone-900/50'}
            `}
        >
            {({ isActive }: any) => (
                <>
                    <div className={`
                        flex items-center justify-center transition-colors
                        ${isActive ? 'text-[#FFD700]' : 'text-stone-500 group-hover:text-stone-300'}
                    `}>
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span className={`text-sm font-medium tracking-wide md:hidden lg:block block ${isActive ? 'text-white' : ''}`}>{label}</span>
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FFD700] md:hidden lg:block block shadow-[0_0_8px_rgba(255,215,0,0.6)]"></div>}
                </>
            )}
        </NavLink>
    );
}

// Simple Menu Icon for Mobile
function MenuIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
    )
}

