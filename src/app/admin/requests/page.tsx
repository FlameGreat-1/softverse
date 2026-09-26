"use client";

import { useEffect, useState } from "react";
import { Mail, Calendar, MapPin, DollarSign, Briefcase, Paperclip, ExternalLink } from "lucide-react";

export default function AdminRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/requests")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          console.error("API Error:", data);
          setRequests([]);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 md:p-8 lg:p-12 text-white overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Project Requests</h1>
          <p className="text-gray-400 text-sm">View and manage inbound client project inquiries.</p>
        </div>
      </div>

      <div className="bg-[#111118] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(199,120,221,0.02)]">
        <div className="p-6 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
          <h2 className="font-semibold text-lg">All Inquiries</h2>
          <span className="text-xs bg-my-primary/10 text-my-primary px-3 py-1 rounded-full font-bold">
            {requests.length} Total
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading requests...</div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No project requests yet. They'll appear here when clients submit the form.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {requests.map((req: any) => (
              <div key={req.id} className="p-6 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors">
                
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Header / Client Info */}
                  <div>
                    <h3 className="font-bold text-xl mb-1 text-white flex items-center gap-2">
                      {req.name}
                      {req.businessName && <span className="text-gray-500 font-medium text-sm">({req.businessName})</span>}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-400 mt-2">
                      <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md">
                        <Mail size={14} className="text-my-primary" />
                        <a href={`mailto:${req.email}`} className="hover:text-white transition-colors">{req.email}</a>
                      </div>
                      {req.location && (
                        <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md">
                          <MapPin size={14} className="text-my-primary" />
                          {req.location}
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md">
                        <Calendar size={14} className="text-my-primary" />
                        {new Date(req.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-col gap-2 items-end">
                    <span className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full font-bold border border-purple-500/20 whitespace-nowrap">
                      {req.projectType}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold bg-white/5 px-2 py-0.5 rounded">
                      {req.source}
                    </span>
                  </div>
                </div>

                {/* Project Specifics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {(req.budget || req.timeline) && (
                    <div className="bg-[#0b090f] border border-white/5 rounded-xl p-4 flex flex-col justify-center gap-3">
                      {req.budget && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                            <DollarSign size={16} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Budget</p>
                            <p className="text-sm text-gray-200 font-medium">{req.budget}</p>
                          </div>
                        </div>
                      )}
                      {req.timeline && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <Briefcase size={16} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Timeline</p>
                            <p className="text-sm text-gray-200 font-medium">{req.timeline}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Details Block */}
                  <div className="bg-[#0b090f] border border-white/5 rounded-xl p-4 md:col-span-2">
                    <p className="text-[10px] uppercase tracking-widest text-my-primary font-bold mb-2">Project Details</p>
                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {req.details || "No details provided."}
                    </p>
                    
                    {req.attachments && req.attachments.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-white/5">
                        <p className="text-[10px] uppercase tracking-widest text-my-primary font-bold mb-3 flex items-center gap-1.5">
                          <Paperclip size={12} />
                          Attachments ({req.attachments.length})
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {req.attachments.map((url: string, index: number) => (
                            <a 
                              key={index} 
                              href={url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 px-3 py-2 rounded-lg text-xs font-medium text-gray-300"
                            >
                              <ExternalLink size={12} className="text-my-primary" />
                              View File {index + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
