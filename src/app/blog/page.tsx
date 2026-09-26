import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog | Softverse",
  description: "Thoughts, ideas & everything in between. Insights on design, code, AI engineering, and building scalable products.",
  openGraph: {
    title: "Blog | Softverse",
    description: "Insights on design, code, AI engineering, and building scalable products.",
    url: "https://www.flamegreat.tech/blog",
    type: "website",
  },
};

export default async function BlogFeed() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  return (
    <section className="min-h-screen bg-[#09090b] pt-40 pb-32 px-6 sm:px-12 lg:px-24 font-sans selection:bg-my-primary selection:text-black">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header Section */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-sm font-medium text-gray-300">Blog</span>
            <span className="text-xl">✍️</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            Thoughts, ideas & <br/>
            <span className="text-my-primary">everything in between.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
            Welcome to my digital garden. This is where I share my experiences, lessons learned, and insights on design, code, AI engineering, and building scalable products.
          </p>
        </div>

        {/* Categories (Static for now, scalable later) */}
        <div className="flex items-center gap-8 border-b border-white/10 pb-4 overflow-x-auto scrollbar-hide">
          <button className="text-white border-b-2 border-white pb-4 -mb-[17px] font-medium whitespace-nowrap">All Posts</button>
          <button className="text-gray-500 hover:text-gray-300 transition-colors font-medium whitespace-nowrap">Engineering</button>
          <button className="text-gray-500 hover:text-gray-300 transition-colors font-medium whitespace-nowrap">AI & ML</button>
          <button className="text-gray-500 hover:text-gray-300 transition-colors font-medium whitespace-nowrap">System Design</button>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-20 border border-white/5 rounded-3xl bg-white/[0.02]">
              No articles published yet. Check back soon.
            </div>
          ) : (
            posts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group h-full">
                <article className="flex flex-col h-full bg-[#0f0f13] border border-white/5 rounded-[2rem] overflow-hidden hover:border-my-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(199,120,221,0.1)] hover:-translate-y-1">
                  
                  {/* Image Header (Runpod Style) */}
                  {post.coverImage ? (
                    <div className="aspect-[16/10] w-full relative overflow-hidden bg-[#1a1a24]">
                      <Image 
                        src={post.coverImage} 
                        alt={post.title} 
                        fill 
                        className="object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent opacity-80" />
                    </div>
                  ) : (
                    <div className="h-4" /> /* Spacer for YUYU style text-only cards */
                  )}

                  {/* Content Body */}
                  <div className={`flex flex-col flex-1 p-8 ${post.coverImage ? 'pt-6' : 'pt-8'}`}>
                    
                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mb-4 uppercase tracking-wider">
                      {post.author?.name ? <span>{post.author.name}</span> : <span>Emmanuel U.</span>}
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    {/* Title */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h2 className="text-2xl font-bold text-white group-hover:text-my-primary transition-colors duration-300 leading-snug">
                        {post.title}
                      </h2>
                      <ArrowUpRight size={24} className="text-gray-600 group-hover:text-my-primary transition-colors flex-shrink-0 mt-1" />
                    </div>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-400 leading-relaxed line-clamp-3 mb-8">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Footer / Read More (YUYU Style) */}
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-my-primary font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        Read article <ArrowRight size={16} />
                      </span>
                      {post.tags && post.tags.length > 0 && (
                        <span className="text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                          {post.tags[0]}
                        </span>
                      )}
                    </div>

                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
