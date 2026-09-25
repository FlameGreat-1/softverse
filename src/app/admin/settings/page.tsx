"use client";

import { useState, useEffect } from "react";
import { Key, Save, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  
  const [settings, setSettings] = useState({
    QSTASH_TOKEN: "",
    QSTASH_URL: "https://qstash.upstash.io/v2/publish/",
    TWITTER_API_KEY: "",
    TWITTER_API_SECRET: "",
    TWITTER_ACCESS_TOKEN: "",
    TWITTER_ACCESS_SECRET: "",
    LINKEDIN_ACCESS_TOKEN: "",
    FACEBOOK_PAGE_ACCESS_TOKEN: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      setMessage("Settings saved successfully!");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div className="p-12 text-center text-gray-400">Loading settings...</div>;
  }

  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto text-white">
      <div className="mb-8 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Key className="text-my-primary" /> Integrations & API Keys
        </h1>
        <p className="text-gray-400 text-sm">
          Configure your social media OAuth tokens and Upstash QStash credentials here. These are securely configured in the database, never hardcoded.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* QStash Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-white/5 pb-2">Upstash QStash (Scheduler Engine)</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">QStash Token</label>
              <input
                type="password"
                name="QSTASH_TOKEN"
                value={settings.QSTASH_TOKEN}
                onChange={handleChange}
                placeholder="eyJh..."
                className="w-full px-4 py-3 bg-[#111118] border border-white/10 rounded-xl outline-none focus:border-my-primary transition-colors font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">QStash URL (Default)</label>
              <input
                type="text"
                name="QSTASH_URL"
                value={settings.QSTASH_URL}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#111118] border border-white/10 rounded-xl outline-none focus:border-my-primary transition-colors font-mono text-sm"
              />
            </div>
          </div>
        </section>

        {/* Twitter Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-white/5 pb-2">X (Twitter) API v2</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">API Key</label>
              <input
                type="password"
                name="TWITTER_API_KEY"
                value={settings.TWITTER_API_KEY}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#111118] border border-white/10 rounded-xl outline-none focus:border-my-primary transition-colors font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">API Secret</label>
              <input
                type="password"
                name="TWITTER_API_SECRET"
                value={settings.TWITTER_API_SECRET}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#111118] border border-white/10 rounded-xl outline-none focus:border-my-primary transition-colors font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Access Token</label>
              <input
                type="password"
                name="TWITTER_ACCESS_TOKEN"
                value={settings.TWITTER_ACCESS_TOKEN}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#111118] border border-white/10 rounded-xl outline-none focus:border-my-primary transition-colors font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Access Secret</label>
              <input
                type="password"
                name="TWITTER_ACCESS_SECRET"
                value={settings.TWITTER_ACCESS_SECRET}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#111118] border border-white/10 rounded-xl outline-none focus:border-my-primary transition-colors font-mono text-sm"
              />
            </div>
          </div>
        </section>

        {/* LinkedIn Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-white/5 pb-2">LinkedIn Developer API</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">User Access Token</label>
            <input
              type="password"
              name="LINKEDIN_ACCESS_TOKEN"
              value={settings.LINKEDIN_ACCESS_TOKEN}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#111118] border border-white/10 rounded-xl outline-none focus:border-my-primary transition-colors font-mono text-sm"
            />
          </div>
        </section>

        {/* Facebook Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-white/5 pb-2">Meta Graph API (Facebook/Instagram)</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Page Access Token</label>
            <input
              type="password"
              name="FACEBOOK_PAGE_ACCESS_TOKEN"
              value={settings.FACEBOOK_PAGE_ACCESS_TOKEN}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#111118] border border-white/10 rounded-xl outline-none focus:border-my-primary transition-colors font-mono text-sm"
            />
          </div>
        </section>

        {/* Save Button */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-400">
            {message && (
              <>
                <AlertCircle size={18} />
                <span className="text-sm font-medium">{message}</span>
              </>
            )}
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-my-primary text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(199,120,221,0.4)] transition-all disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </form>
    </div>
  );
}
