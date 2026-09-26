"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PenTool, Eye, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 md:p-8 lg:p-12 text-white overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400 text-sm">Manage your blog posts, analytics, and content.</p>
        </div>
        <Link
          href="/admin/new"
          className="px-6 py-2.5 bg-my-primary text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(199,120,221,0.4)] transition-all flex items-center gap-2"
        >
          <PenTool size={18} />
          Create Post
        </Link>
      </div>

      <div className="bg-[#111118] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(199,120,221,0.02)]">
        <div className="p-6 border-b border-white/10 bg-white/[0.02]">
          <h2 className="font-semibold text-lg">All Posts</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No posts found. Start writing your first masterpiece!
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {posts.map((post: any) => (
              <div key={post.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                  <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                    <span className={post.published ? "text-green-400" : "text-yellow-400"}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <span>•</span>
                    <span>/{post.slug}</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-green-400 transition-colors bg-white/5 hover:bg-white/10 rounded-lg" title="View Public Post">
                    <Eye size={18} />
                  </a>
                  <Link href={`/admin/edit/${post.id}`} className="p-2 text-gray-400 hover:text-my-primary transition-colors bg-white/5 hover:bg-white/10 rounded-lg" title="Edit Post">
                    <PenTool size={18} />
                  </Link>
                  <button 
                    onClick={async () => {
                      if (confirm("Are you sure you want to delete this post? This cannot be undone.")) {
                        const res = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
                        if (res.ok) {
                          setPosts(posts.filter((p: any) => p.id !== post.id));
                        } else {
                          alert("Failed to delete post");
                        }
                      }
                    }}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors bg-red-500/10 hover:bg-red-500/20 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
