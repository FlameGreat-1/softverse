"use client";

import { useState } from "react";
import TipTapEditor from "@/components/admin/TipTapEditor";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";

export default function NewPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    published: false,
    tags: [] as string[],
    scheduleSocial: false,
    socialCaption: "",
    socialPlatforms: [] as string[],
    scheduledFor: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        scheduledFor: formData.scheduleSocial && formData.scheduledFor 
          ? new Date(formData.scheduledFor).toISOString() 
          : null
      };

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create post");
      }

      router.push("/admin");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
          <p className="text-gray-400 text-sm">Write, format, and publish your new blog entry.</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || !formData.title || !formData.content}
          className="px-6 py-2.5 bg-my-primary text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(199,120,221,0.4)] transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : "Publish Post"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Post Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                setFormData({
                  ...formData,
                  title,
                  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                });
              }}
              placeholder="The Future of AI Engineering"
              className="w-full px-4 py-3 bg-[#111118] border border-white/10 rounded-xl outline-none focus:border-my-primary transition-colors text-lg font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Content (Rich Text)</label>
            <TipTapEditor
              content={formData.content}
              onChange={(html) => setFormData({ ...formData, content: html })}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111118] border border-white/10 p-6 rounded-xl space-y-5">
            <h3 className="font-semibold text-lg border-b border-white/10 pb-3">Post Metadata</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">URL Slug</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg outline-none focus:border-my-primary transition-colors text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Cover Image URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://..."
                  className="flex-1 w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg outline-none focus:border-my-primary transition-colors text-sm"
                />
                <CldUploadWidget 
                  uploadPreset="flamo_blog"
                  onSuccess={(result: any) => {
                    if (result?.info?.secure_url) {
                      setFormData({ ...formData, coverImage: result.info.secure_url });
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                    >
                      Upload
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Excerpt (Short Description)</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg outline-none focus:border-my-primary transition-colors text-sm resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Tags (Comma separated)</label>
              <input
                type="text"
                value={formData.tags.join(", ")}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
                placeholder="AI, Engineering, Design"
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg outline-none focus:border-my-primary transition-colors text-sm"
              />
            </div>

            <label className="flex items-center gap-3 pt-4 border-t border-white/10 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 accent-my-primary rounded"
              />
              <span className="text-sm font-medium text-gray-300">Publish Immediately</span>
            </label>
            
            <div className="pt-4 border-t border-white/10">
              <label className="flex items-center gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={formData.scheduleSocial}
                  onChange={(e) => setFormData({ ...formData, scheduleSocial: e.target.checked })}
                  className="w-5 h-5 accent-blue-500 rounded"
                />
                <span className="text-sm font-medium text-blue-400">Schedule Social Media Blast</span>
              </label>

              {formData.scheduleSocial && (
                <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Publish Date & Time</label>
                    <input
                      type="datetime-local"
                      required={formData.scheduleSocial}
                      value={formData.scheduledFor}
                      onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                      className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Custom Social Caption</label>
                      <span className={`text-xs ${formData.socialCaption.length > 280 ? 'text-red-400' : 'text-gray-500'}`}>
                        {formData.socialCaption.length} / 280 (Twitter Limit)
                      </span>
                    </div>
                    <textarea
                      value={formData.socialCaption}
                      onChange={(e) => setFormData({ ...formData, socialCaption: e.target.value })}
                      rows={3}
                      placeholder="Write a custom hook for Twitter & LinkedIn..."
                      className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg outline-none focus:border-blue-500 transition-colors text-sm resize-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Platforms</label>
                    <div className="flex flex-wrap gap-4">
                      {["TWITTER", "LINKEDIN", "FACEBOOK"].map((platform) => (
                        <label key={platform} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.socialPlatforms.includes(platform)}
                            onChange={(e) => {
                              const newPlatforms = e.target.checked
                                ? [...formData.socialPlatforms, platform]
                                : formData.socialPlatforms.filter(p => p !== platform);
                              setFormData({ ...formData, socialPlatforms: newPlatforms });
                            }}
                            className="w-4 h-4 accent-blue-500 rounded"
                          />
                          <span className="text-sm text-gray-300">{platform}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
