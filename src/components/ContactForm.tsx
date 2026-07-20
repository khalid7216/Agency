"use client";

import { useState, useEffect } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Cybersecurity/VAPT");
  const [budget, setBudget] = useState("Under $500");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    const budgetParam = params.get("budget");
    if (serviceParam) setService(serviceParam);
    if (budgetParam) setBudget(budgetParam);
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, budget, message }),
      });
      if (res.ok) setSubmitted(true);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-[#0D1120] p-6 sm:p-8">
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
            <span className="text-2xl font-bold">✓</span>
          </div>
          <h3 className="text-xl font-bold text-white">Message sent!</h3>
          <p className="text-sm text-gray-400 max-w-sm">
            I&apos;ll get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setName("");
              setEmail("");
              setService("Cybersecurity/VAPT");
              setBudget("Under $500");
              setMessage("");
            }}
            className="mt-4 rounded-xl border border-white/10 px-5 py-2 text-sm text-gray-300 transition hover:border-[#7C3AED]/40 hover:bg-white/5"
          >
            Send another message
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">What are you looking for?</h3>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
              <div
                onClick={() => setService("Cybersecurity/VAPT")}
                className={`rounded-xl border p-3 cursor-pointer text-center transition-all ${
                  service === "Cybersecurity/VAPT"
                    ? "border-[#7C3AED] bg-[#7C3AED]/10"
                    : "border-white/5 bg-[#0A0E1A]/40 hover:border-[#7C3AED]/50"
                }`}
              >
                <p className="text-xs font-bold text-white leading-tight">Cybersecurity/VAPT</p>
                <p className="text-[10px] text-gray-400 mt-1">Starting from $149</p>
              </div>

              <div
                onClick={() => setService("Web Development")}
                className={`rounded-xl border p-3 cursor-pointer text-center transition-all ${
                  service === "Web Development"
                    ? "border-[#7C3AED] bg-[#7C3AED]/10"
                    : "border-white/5 bg-[#0A0E1A]/40 hover:border-[#7C3AED]/50"
                }`}
              >
                <p className="text-xs font-bold text-white leading-tight">Web Development</p>
                <p className="text-[10px] text-gray-400 mt-1">Starting from $199</p>
              </div>

              <div
                onClick={() => setService("Video Production")}
                className={`rounded-xl border p-3 cursor-pointer text-center transition-all ${
                  service === "Video Production"
                    ? "border-[#7C3AED] bg-[#7C3AED]/10"
                    : "border-white/5 bg-[#0A0E1A]/40 hover:border-[#7C3AED]/50"
                }`}
              >
                <p className="text-xs font-bold text-white leading-tight">Video Production</p>
                <p className="text-[10px] text-gray-400 mt-1">Starting from $79</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold">Send a message</h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase">Your Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED]/50 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase">Your Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED]/50 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase">Service Needed</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED]/50 transition cursor-pointer"
              >
                <option value="Cybersecurity/VAPT">Cybersecurity/VAPT</option>
                <option value="Web Development">Web Development</option>
                <option value="Video Production">Video Production</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase">Project Budget</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED]/50 transition cursor-pointer"
              >
                <option value="Under $500">Under $500</option>
                <option value="$500-$1500">$500-$1500</option>
                <option value="$1500-$5000">$1500-$5000</option>
                <option value="$5000+">$5000+</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase">Message</label>
              <textarea
                placeholder="Tell me about your project..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED]/50 transition resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-xl bg-[#7C3AED] py-4 font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition hover:bg-[#6D28D9] flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
