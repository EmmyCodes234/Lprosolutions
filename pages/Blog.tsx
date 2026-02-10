import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
    {
        title: "The Future of Infrastructure in Liberia",
        excerpt: "Exploring the critical role of technical oversight and governance in sustainable national development.",
        date: "Feb 10, 2026",
        category: "Insights",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "Bridging the Gap: Capacity Building in Engineering",
        excerpt: "How L-Pro is empowering the next generation of Liberian engineers through hands-on project management training.",
        date: "Jan 15, 2026",
        category: "Training",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "Risk Management in Telecom Infrastructure",
        excerpt: "Best practices for ensuring high availability and resilience in large-scale network deployments.",
        date: "Dec 05, 2025",
        category: "Case Study",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2670&auto=format&fit=crop"
    }
];

const Blog: React.FC = () => {
    return (
        <div className="w-full bg-[#f5f5f4] min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-[1440px] mx-auto">
                <div className="max-w-3xl mb-16 md:mb-24">
                    <h1 className="text-4xl md:text-7xl font-bold text-stone-900 tracking-tighter mb-8 italic">
                        Our Story. <br />Our Insights.
                    </h1>
                    <p className="text-xl text-stone-500 leading-relaxed">
                        We share our thoughts on project management, engineering excellence, and the impact of technical leadership on emerging markets.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {posts.map((post, i) => (
                        <Link key={i} to="/contact" className="group block">
                            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm">
                                <img
                                    src={post.image}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={post.title}
                                />
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-stone-900">
                                    {post.category}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-stone-400 font-mono text-sm uppercase tracking-wide">{post.date}</p>
                                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight group-hover:text-accent transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-stone-500 leading-relaxed line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-stone-900 font-bold group-hover:gap-4 transition-all">
                                    Read Article <ArrowRight size={18} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
