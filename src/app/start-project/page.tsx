"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const MapLocationSelector = dynamic(() => import("../../components/MapLocationSelector"), { 
  ssr: false, 
  loading: () => <div className="w-full h-80 bg-gray-900 rounded-xl animate-pulse"></div> 
});

export type LocationData = {
  name: string;
  lat: number;
  lng: number;
};

type FormData = {
  name: string;
  email: string;
  locations: LocationData[];
  projectType: string[];
  businessName: string;
  timeline: string;
  budget: string;
  files: File[];
  details: string;
};

const INITIAL_DATA: FormData = {
  name: "",
  email: "",
  locations: [],
  projectType: [],
  businessName: "",
  timeline: "",
  budget: "",
  files: [],
  details: "",
};

const fetchWithRetry = async (url: string, options: RequestInit, maxRetries = 3) => {
  let attempt = 0;
  let lastResponse: Response | null = null;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, options);
      lastResponse = response;
      if (response.ok) return response;
      // Do not retry client-side errors like 400 Bad Request or 413 Payload Too Large
      if (response.status >= 400 && response.status < 500) return response;
    } catch (error) {
      if (attempt === maxRetries - 1) throw error; // Network error
    }
    attempt++;
    const delay = 1000 * Math.pow(2, attempt); // Exponential backoff: 2s, 4s, 8s...
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  
  if (lastResponse) return lastResponse;
  throw new Error("Max retries exceeded");
};

export default function StartProject() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [dragActive, setDragActive] = useState(false);
  const [showError, setShowError] = useState(false);

  // Auto-redirect on success step
  useEffect(() => {
    if (step === 10) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step, router]);

  // Always reset scroll to the top of the page when navigating between steps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const totalSteps = 11;

  const canProceed = () => {
    switch (step) {
      case 0: return data.name.trim().length > 0;
      case 1: return data.email.trim().length > 0 && data.email.includes("@");
      case 2: return data.locations.length > 0;
      case 3: return data.projectType.length > 0;
      case 4: return data.businessName.trim().length > 0;
      case 5: return data.timeline.trim().length > 0;
      case 6: return data.budget.trim().length > 0;
      case 7: return true; // optional files
      case 8: return data.details.trim().length > 0;
      default: return true;
    }
  };

  const hasError = showError && !canProceed();

  const handleNext = () => {
    if (canProceed() && step < totalSteps - 1) {
      setShowError(false);
      setStep(step + 1);
    } else if (!canProceed()) {
      setShowError(true);
    }
  };

  const handleBack = () => {
    setShowError(false);
    if (step > 0) setStep(step - 1);
    else router.push("/");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter(f => {
        if (f.size > 10 * 1024 * 1024) {
          alert(`File ${f.name} is too large. Maximum size is 10MB.`);
          return false;
        }
        return true;
      });
      setData({ ...data, files: [...data.files, ...newFiles] });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).filter(f => {
        if (f.size > 10 * 1024 * 1024) {
          alert(`File ${f.name} is too large. Maximum size is 10MB.`);
          return false;
        }
        return true;
      });
      setData({ ...data, files: [...data.files, ...newFiles] });
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...data.files];
    newFiles.splice(index, 1);
    setData({ ...data, files: newFiles });
  };

  const [isSubmittingWa, setIsSubmittingWa] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  const submitToWhatsApp = async () => {
    setIsSubmittingWa(true);
    const locationsStr = data.locations.map(l => l.name).join(", ");
    let text = `Hi Emmanuel! I'm ${data.name} from ${locationsStr}. I need a ${data.projectType.join(", ")} for my business "${data.businessName}".\nTimeline: ${data.timeline}\nBudget: ${data.budget}\nDetails: ${data.details}`;
    
    // Always submit to backend to trigger the auto-reply email (FIRE AND FORGET)
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("location", locationsStr);
    formData.append("projectType", data.projectType.join(", "));
    formData.append("businessName", data.businessName);
    formData.append("timeline", data.timeline);
    formData.append("budget", data.budget);
    formData.append("details", data.details);
    formData.append("source", "WhatsApp Submission");
    
    data.files.forEach((file) => {
      formData.append("files", file);
    });

    if (data.files.length > 0) {
      // Appended instantly so the client doesn't wait
      text += `\n\nP.S. I have also securely attached some files via the website.`;
    }

    // 1. Open the popup immediately to bypass browser popup blockers (must be synchronous)
    const waWindow = window.open('about:blank', '_blank');

    // 2. Upload to server (Wait for it so large files don't fail when navigating)
    try {
      await fetchWithRetry("/api/project/submit", {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.error("Upload failed:", err);
    }

    setIsSubmittingWa(false);
    
    // 3. Navigate the popup to WhatsApp
    if (waWindow) {
      waWindow.location.href = `https://wa.me/2348136872013?text=${encodeURIComponent(text)}`;
      router.push("/"); // Only push if popup succeeded
    } else {
      // Fallback if popup blocker completely blocked the initial open
      // Do NOT call router.push("/") here, as Next.js will intercept and cancel the hard navigation
      window.location.href = `https://wa.me/2348136872013?text=${encodeURIComponent(text)}`;
    }
  };

  const submitToEmail = async () => {
    setIsSubmittingEmail(true);
    
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("location", data.locations.map(l => l.name).join(", "));
    formData.append("projectType", data.projectType.join(", "));
    formData.append("businessName", data.businessName);
    formData.append("timeline", data.timeline);
    formData.append("budget", data.budget);
    formData.append("details", data.details);
    
    data.files.forEach((file) => {
      formData.append("files", file);
    });

    // Upload to server
    try {
      await fetchWithRetry("/api/project/submit", {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.error("Upload failed:", err);
    }

    setIsSubmittingEmail(false);
    setStep(10); // Go to success step
  };

  const stepsContent = [
    // Step 0: Name
    <div key="step-0" className="w-full max-w-2xl mx-auto space-y-6">
      <p className="text-gray-400 font-medium">Hey there 👋</p>
      <h1 className="text-4xl md:text-5xl font-bold text-white">What's your name?</h1>
      <p className="text-gray-500 text-sm">Your first name would do just fine.</p>
      <input 
        type="text"
        autoFocus
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        placeholder="e.g. Sara Badmus"
        className={`w-full bg-transparent border-b-2 py-4 text-xl md:text-2xl outline-none text-white transition-colors placeholder:text-gray-700 ${hasError ? 'border-red-500 focus:border-red-500' : 'border-gray-800 focus:border-my-primary'}`}
        onKeyDown={(e) => e.key === 'Enter' && data.name && handleNext()}
      />
    </div>,

    // Step 1: Email
    <div key="step-1" className="w-full max-w-2xl mx-auto space-y-6">
      <p className="text-gray-400 font-medium">Nice to meet you, <span className="uppercase text-white">{data.name}</span> 🥂</p>
      <h1 className="text-4xl md:text-5xl font-bold text-white">What's your email address?</h1>
      <p className="text-gray-500 text-sm">We'll send your project updates here.</p>
      <input 
        type="email"
        autoFocus
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        placeholder="e.g. sara@example.com"
        className={`w-full bg-transparent border-b-2 py-4 text-xl md:text-2xl outline-none text-white transition-colors placeholder:text-gray-700 ${hasError ? 'border-red-500 focus:border-red-500' : 'border-gray-800 focus:border-my-primary'}`}
        onKeyDown={(e) => e.key === 'Enter' && data.email.includes("@") && handleNext()}
      />
    </div>,

    // Step 2: Location
    <div key="step-2" className="w-full max-w-2xl mx-auto space-y-6">
      <p className="text-gray-400 font-medium">Got it!</p>
      <h1 className="text-4xl md:text-5xl font-bold text-white">Where are you based?</h1>
      
      <div className={`pt-4 rounded-xl ${hasError ? 'border-2 border-red-500 p-2' : ''}`}>
        <MapLocationSelector 
          locations={data.locations} 
          setLocations={(locs) => setData({ ...data, locations: locs })} 
        />
        {hasError && <p className="text-red-500 text-sm mt-2">Please select at least one location.</p>}
      </div>
    </div>,

    // Step 3: Project Type
    <div key="step-3" className="w-full max-w-2xl mx-auto space-y-6">
      <p className="text-gray-400 font-medium">Perfect, Got it! 🌍</p>
      <h1 className="text-4xl md:text-5xl font-bold text-white">What type of project is this?</h1>
      <div className="flex flex-wrap gap-4 pt-4">
        {["Web Application", "AI/ML", "LLM Integration", "Payment Systems", "Algorithmic Trading", "E-Commerce & Marketplaces", "Backend & API Development", "Automations", "Consulting", "Other"].map((pt) => {
          const isSelected = data.projectType.includes(pt);
          return (
            <button
              key={pt}
              onClick={() => {
                setShowError(false);
                if (isSelected) {
                  setData({ ...data, projectType: data.projectType.filter(t => t !== pt) });
                } else {
                  setData({ ...data, projectType: [...data.projectType, pt] });
                }
              }}
              className={`px-6 py-3 rounded-full border transition-all font-semibold ${isSelected ? "bg-[#a65abf] border-[#a65abf] text-white" : hasError ? "border-red-500 text-red-500 hover:bg-red-500/10" : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"}`}
            >
              {pt}
            </button>
          );
        })}
      </div>
    </div>,

    // Step 4: Business Name
    <div key="step-3" className="w-full max-w-2xl mx-auto space-y-6">
      <p className="text-gray-400 font-medium">Great choice 💡</p>
      <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">What's the name of your business or product?</h1>
      <input 
        type="text"
        autoFocus
        value={data.businessName}
        onChange={(e) => setData({ ...data, businessName: e.target.value })}
        placeholder="e.g. Burgeon Properties Limited"
        className={`w-full bg-transparent border-b-2 py-4 text-xl outline-none text-white transition-colors placeholder:text-gray-700 mt-8 ${hasError ? 'border-red-500 focus:border-red-500' : 'border-gray-800 focus:border-my-primary'}`}
        onKeyDown={(e) => e.key === 'Enter' && data.businessName && handleNext()}
      />
    </div>,

    // Step 5: Timeline
    <div key="step-5" className="w-full max-w-2xl mx-auto space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold text-white">When do you need this completed?</h1>
      <p className="text-gray-500 text-sm">A rough timeline is fine.</p>
      <input 
        type="date"
        value={data.timeline}
        onChange={(e) => setData({ ...data, timeline: e.target.value })}
        className={`w-full bg-transparent border-b-2 py-4 text-xl outline-none text-white transition-colors placeholder:text-gray-700 mt-8 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert ${hasError ? 'border-red-500 focus:border-red-500' : 'border-gray-800 focus:border-my-primary'}`}
        onKeyDown={(e) => e.key === 'Enter' && data.timeline && handleNext()}
      />
    </div>,

    // Step 6: Budget
    <div key="step-6" className="w-full max-w-2xl mx-auto space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold text-white">What's your budget (USD)?</h1>
      <p className="text-gray-500 text-sm">You can enter an exact amount or a range, e.g. 900 - 5,000</p>
      <div className={`flex items-center border-b-2 transition-colors mt-8 ${hasError ? 'border-red-500 focus-within:border-red-500' : 'border-gray-800 focus-within:border-my-primary'}`}>
        <span className={`text-2xl pr-2 ${hasError ? 'text-red-500' : 'text-gray-400'}`}>$</span>
        <input 
          type="text"
          autoFocus
          value={data.budget}
          onChange={(e) => setData({ ...data, budget: e.target.value })}
          placeholder="e.g. 300 or 900 - 5,000"
          className="w-full bg-transparent py-4 text-xl outline-none text-white placeholder:text-gray-700"
          onKeyDown={(e) => e.key === 'Enter' && data.budget && handleNext()}
        />
      </div>
    </div>,

    // Step 7: File Upload
    <div key="step-7" className="w-full max-w-2xl mx-auto space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold text-white">Do you have any files to share?</h1>
      <p className="text-gray-500 text-sm">Upload wireframes, project briefs, or brand assets (PDF, DOCX, Images). You can also skip this.</p>
      
      {data.files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {data.files.map((f, idx) => (
            <div key={idx} className="relative group rounded-xl overflow-hidden bg-[#110e16] border border-gray-800 aspect-square flex flex-col items-center justify-center">
              {f.type.startsWith("image/") ? (
                <img src={URL.createObjectURL(f)} alt={f.name} className="object-cover w-full h-full opacity-80 group-hover:opacity-40 transition-opacity" />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full bg-[#1c1824]">
                  {f.name.toLowerCase().endsWith('.pdf') ? (
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" alt="PDF" className="w-12 h-12" />
                  ) : f.name.toLowerCase().endsWith('.docx') || f.name.toLowerCase().endsWith('.doc') ? (
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg" alt="DOCX" className="w-12 h-12" />
                  ) : (
                    <div className="px-3 py-1 rounded font-bold text-xs bg-gray-500/20 text-gray-400">
                      {f.name.split('.').pop()?.toUpperCase() || 'FILE'}
                    </div>
                  )}
                </div>
              )}
              <button onClick={() => removeFile(idx)} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-red-400 font-bold text-sm">Remove</button>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/80 text-[10px] text-gray-300 truncate text-center">{f.name}</div>
            </div>
          ))}
        </div>
      )}

      <div 
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`w-full ${data.files.length > 0 ? "h-32" : "h-48"} border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors mt-8 relative ${dragActive ? "border-[#a65abf] bg-[#a65abf]/10" : "border-gray-800 bg-[#0b090f] hover:border-gray-600"}`}
      >
        <div className="text-center px-4">
          <svg className={`w-8 h-8 text-gray-600 mx-auto mb-3 ${data.files.length > 0 ? "hidden" : "block"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          <p className="text-gray-400 text-sm"><span className="text-[#a65abf] font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-gray-600 text-xs mt-1">PDF, DOCX, PNG, JPG (max. 10MB)</p>
          <input type="file" multiple className="hidden" id="file-upload" onChange={handleFileSelect} />
          <button onClick={() => document.getElementById('file-upload')?.click()} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"></button>
        </div>
      </div>
    </div>,

    // Step 8: Project Details
    <div key="step-7" className="w-full max-w-2xl mx-auto space-y-6">
      <p className="text-gray-400 font-medium">Almost done! 🎉</p>
      <h1 className="text-4xl md:text-5xl font-bold text-white">Can you provide brief details of the project?</h1>
      <p className="text-gray-500 text-sm">Please provide a brief or project details. This is required.</p>
      <textarea 
        autoFocus
        value={data.details}
        onChange={(e) => setData({ ...data, details: e.target.value })}
        placeholder="Tell me more about your vision, goals, and requirements..."
        className={`w-full h-48 bg-[#110e16] border rounded-xl p-6 text-lg outline-none text-white transition-colors placeholder:text-gray-700 mt-8 resize-none ${hasError ? 'border-red-500 focus:border-red-500' : 'border-gray-800 focus:border-[#a65abf]'}`}
      />
    </div>,

    // Step 9: Send
    <div key="step-9" className="w-full max-w-2xl mx-auto space-y-6 text-center">
      <p className="text-gray-400 font-medium">All done! 🎉</p>
      <h1 className="text-4xl md:text-5xl font-bold text-white">How would you like to send this?</h1>
      <p className="text-gray-500 text-sm">Choose your preferred method and your project details will be ready to send.</p>
      
      <div className="grid md:grid-cols-2 gap-6 pt-8">
        <button onClick={submitToWhatsApp} disabled={isSubmittingWa} className="flex flex-col items-center p-8 bg-[#110e16] border border-gray-800 rounded-2xl hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all group disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmittingWa ? (
            <svg className="w-10 h-10 text-[#25D366] animate-spin mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          ) : (
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-10 h-10 mb-4 transition-transform group-hover:scale-110" />
          )}
          <h3 className="text-xl font-bold text-white">{isSubmittingWa ? "Processing..." : "Send via WhatsApp"}</h3>
          <p className="text-gray-500 text-sm mt-2">{isSubmittingWa && data.files.length > 0 ? "Sending Attachment to Emmanuel..." : "Opens WhatsApp with your details pre-filled"}</p>
        </button>
        <button onClick={submitToEmail} disabled={isSubmittingEmail} className="flex flex-col items-center p-8 bg-[#110e16] border border-gray-800 rounded-2xl hover:border-my-primary hover:bg-[#a65abf]/5 transition-all group disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmittingEmail ? (
            <svg className="w-10 h-10 text-my-primary animate-spin mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          ) : (
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-10 h-10 mb-4 transition-transform group-hover:scale-110" />
          )}
          <h3 className="text-xl font-bold text-white">{isSubmittingEmail ? "Sending..." : "Send via Email"}</h3>
          <p className="text-gray-500 text-sm mt-2">{isSubmittingEmail ? "Uploading files and sending email" : "Sends an instant email securely"}</p>
        </button>
      </div>
    </div>,

    // Step 10: Success
    <div key="step-10" className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center pt-24 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-[#25D366]/20 rounded-full flex items-center justify-center border border-[#25D366]/50 shadow-[0_0_30px_rgba(37,211,102,0.2)]">
          <svg className="w-8 h-8 text-[#25D366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white">Sent</h1>
      </div>
      <p className="text-gray-400 text-lg font-medium">We'll get back to you</p>
    </div>
  ];

  return (
    <div className="min-h-screen bg-[#06050a] flex flex-col font-sans">
      
      {/* Main Form Area */}
      <main className="flex-1 flex flex-col px-4 md:px-8 relative overflow-x-hidden min-h-screen">
        
        {/* Progress Bar */}
        <div className="absolute top-24 md:top-36 left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] h-1 bg-gray-900 rounded-full overflow-hidden mt-4">
          <div 
            className="h-full bg-gradient-to-r from-[#5a2e6a] to-[#a65abf] transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="w-full max-w-4xl mx-auto mt-48 md:mt-56 mb-8 relative flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {stepsContent[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons (Hidden on Send and Success steps) */}
        {step < totalSteps - 2 && (
          <div className="w-full max-w-4xl mx-auto mt-8 flex items-center justify-between pb-24 z-20">
            <button 
              onClick={handleBack}
              className="px-6 md:px-8 py-3 md:py-4 rounded-full border border-gray-700 hover:border-gray-500 text-gray-300 font-bold transition-all text-sm"
            >
              &lt; Back
            </button>
            <button 
              onClick={handleNext}
              className="px-8 md:px-12 py-3 md:py-4 rounded-full bg-gradient-to-r from-[#8b31ff] to-[#a65abf] hover:shadow-[0_0_20px_#a65abf55] text-white font-bold transition-all text-sm"
            >
              Continue &gt;
            </button>
          </div>
        )}
      </main>

    </div>
  );
}
