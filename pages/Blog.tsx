import React from 'react';
import { ArrowRight, Clock, User, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
    {
        title: "The Future of Infrastructure in Liberia",
        excerpt: "Exploring the critical role of technical oversight and governance in sustainable national development.",
        date: "Feb 10, 2026",
        readTime: "8 min read",
        author: "Tech Advisory Board",
        category: "Strategic Insights",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "Bridging the Gap: Capacity Building in Engineering",
        excerpt: "How L-Pro is empowering the next generation of Liberian engineers through hands-on project management training.",
        date: "Jan 15, 2026",
        readTime: "6 min read",
        author: "Education Lead",
        category: "Institutional Growth",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "Risk Management in Telecom Infrastructure",
        excerpt: "Best practices for ensuring high availability and resilience in large-scale network deployments.",
        date: "Dec 05, 2025",
        readTime: "12 min read",
        author: "Telco Operations",
        category: "Technical Audit",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2670&auto=format&fit=crop"
    }
];

const Blog: React.FC = () => {
    return (
        <div className="w-full bg-[#fcfcfc] min-h-screen pt-32 pb-48 px-6">
            <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />

            <div className="max-w-[1440px] mx-auto relative z-10">

                {/* Editorial Header */}
                <div className="max-w-4xl mb-24 md:mb-32">
                    <div className="inline-block bg-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-stone-950 mb-8 animate-revealUp">
                        Intellectual Property
                    </div>
                    <h1 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter text-stone-950 leading-[0.8] mb-12 animate-revealUp animation-delay-100">
                        Executive <br />
                        <span className="text-stone-300">Briefings.</span>
                    </h1>
                    <p className="text-xl md:text-3xl text-stone-500 max-w-2xl font-light leading-relaxed animate-revealUp animation-delay-200">
                        Strategic perspectives on engineering governance, regional development, and the future of African infrastructure.
                    </p>
                </div>

                {/* Featured Grid - Editorial Style */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">

                    {/* Primary Feature (Left) */}
                    <div className="lg:col-span-8 animate-revealUp animation-delay-300">
                        <Link to="/contact" className="group block">
                            <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
                                <img
                                    src={posts[0].image}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    alt={posts[0].title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                <div className="absolute bottom-12 left-12 right-12">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="bg-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-stone-950">
                                            {posts[0].category}
                                        </span>
                                        <div className="h-px w-12 bg-white/20" />
                                        <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{posts[0].date}</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight leading-tight group-hover:translate-x-4 transition-transform duration-500">
                                        {posts[0].title}
                                    </h2>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Secondary List (Right) */}
                    <div className="lg:col-span-4 space-y-16 animate-revealUp animation-delay-400">
                        <div className="border-t-2 border-stone-900 pt-8 mb-12">
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-stone-950">Latest Dispatches</h3>
                        </div>

                        {posts.slice(1).map((post, i) => (
                            <Link key={i} to="/contact" className="group block pb-12 border-b border-stone-100 last:border-0">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-stone-400">
                                        <span>{post.category}</span>
                                        <div className="w-1 h-1 bg-stone-200 rounded-full" />
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-stone-900 leading-tight group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-stone-500 line-clamp-2 italic leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-stone-950 font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                                        Read Dispatch <ArrowRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* Newsletter Block */}
                        <div className="bg-stone-50 rounded-[2.5rem] p-10 border border-stone-100">
                            <Bookmark className="text-accent mb-6" size={32} />
                            <h4 className="text-xl font-display font-bold text-stone-900 mb-4">Advisory Subscription</h4>
                            <p className="text-stone-500 text-sm leading-relaxed mb-8">
                                Stay informed with our monthly technical briefings on regional infrastructure.
                            </p>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="briefing@organization.com"
                                    className="w-full bg-white rounded-full px-6 py-4 text-sm font-bold border border-stone-100 outline-none focus:border-stone-900 transition-colors"
                                />
                                <button className="absolute right-2 top-2 bottom-2 bg-stone-900 text-white px-6 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-stone-950 transition-all">
                                    Sub
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Blog;
