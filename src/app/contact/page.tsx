"use client";

import { useState, useEffect } from "react";
import { FaShieldAlt, FaCode, FaVideo, FaChevronDown, FaEnvelope, FaBug, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Cybersecurity/VAPT");
  const [budget, setBudget] = useState("Under $500");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // Parse query parameters
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    const budgetParam = params.get("budget");
    if (serviceParam) setService(serviceParam);
    if (budgetParam) setBudget(budgetParam);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, service, budget, message })
      })
      if (res.ok) setSubmitted(true)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#0A0E1A] text-white">
      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-4 z-50 flex justify-center px-6">
        <div
          className={`flex items-center justify-between w-full max-w-3xl px-6 py-3 rounded-full border border-white/10 transition-all duration-300 ${scrolled ? "bg-[#0A0E1A]/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-[#0D1120]/80 backdrop-blur-sm"}`}
        >
          <div className="text-sm font-bold text-[#7C3AED] tracking-tight">
            Khalid Sanawer
          </div>

          <div className="hidden md:flex items-center gap-1">
            <a
              href="/"
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition"
            >
              Home
            </a>
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition flex items-center gap-1">
                Services
                <FaChevronDown className="w-2 h-2 text-gray-400" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#0D1120] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden z-50">
                  <a
                    href="/vapt"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED]">
                      <FaShieldAlt className="text-sm" />
                    </span>
                    <div>
                      <div className="font-medium text-white text-sm">VAPT</div>
                      <div className="text-xs text-gray-500">
                        Security Testing
                      </div>
                    </div>
                  </a>
                  <a
                    href="/services#webdev"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition"
                  >
                    <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <FaCode className="text-sm" />
                    </span>
                    <div>
                      <div className="font-medium text-white text-sm">
                        Web Development
                      </div>
                      <div className="text-xs text-gray-500">
                        Next.js & MERN Stack
                      </div>
                    </div>
                  </a>
                  <a
                    href="/services#video"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition"
                  >
                    <span className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400">
                      <FaVideo className="text-sm" />
                    </span>
                    <div>
                      <div className="font-medium text-white text-sm">
                        Video Production
                      </div>
                      <div className="text-xs text-gray-500">
                        Premiere Pro & CapCut
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>
            <a
              href="/services"
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition"
            >
              Pricing
            </a>
            <a
              href="/portfolio"
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition"
            >
              Portfolio
            </a>
            <a
              href="/blog"
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition"
            >
              Blog
            </a>
            <a
              href="/team"
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition"
            >
              Team
            </a>
            <a
              href="/#about"
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition"
            >
              About
            </a>
          </div>

          <a
            href="/contact"
            className="px-4 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold rounded-full transition shadow-[0_0_15px_rgba(124,58,237,0.4)]"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-16 text-center">
        <div className="absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7C3AED]/20 blur-[110px]" />

        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">CONTACT</p>
          <h1 className="mb-6 text-4xl font-black md:text-6xl">
            Let&apos;s work together.
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Have a project in mind? Send a message and I&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Main Section */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Get in touch</h2>
            
            {/* Contact Cards */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              
              {/* Email Card */}
              <a 
                href="mailto:security@khalidsanawer.online" 
                className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#0D1120] p-5 transition hover:border-[#7C3AED]/40 hover:bg-white/[0.02]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#C4B5FD]">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold">Email</span>
                  <p className="text-sm font-medium text-white break-all">security@khalidsanawer.online</p>
                </div>
              </a>

              {/* HackerOne Card */}
              <a 
                href="https://hackerone.com/cyberarmor72" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#0D1120] p-5 transition hover:border-[#7C3AED]/40 hover:bg-white/[0.02]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#C4B5FD]">
                  <FaBug className="text-xl" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold">HackerOne</span>
                  <p className="text-sm font-medium text-white">cyberarmor72</p>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a 
                href="#" 
                className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#0D1120] p-5 transition hover:border-[#7C3AED]/40 hover:bg-white/[0.02]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#C4B5FD]">
                  <FaLinkedin className="text-xl" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold">LinkedIn</span>
                  <p className="text-sm font-medium text-white">Connect with me</p>
                </div>
              </a>

              {/* GitHub Card */}
              <a 
                href="#" 
                className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#0D1120] p-5 transition hover:border-[#7C3AED]/40 hover:bg-white/[0.02]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#C4B5FD]">
                  <FaGithub className="text-xl" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold">GitHub</span>
                  <p className="text-sm font-medium text-white">View my code</p>
                </div>
              </a>

            </div>

            {/* Response Time Badge */}
            <div className="rounded-xl border border-white/5 bg-[#0D1120]/50 p-4 text-center">
              <p className="text-sm text-gray-400">
                🕐 Usually responds within 24 hours
              </p>
            </div>

            {/* Services Offered List */}
            <div className="rounded-xl border border-white/5 bg-[#0D1120] p-6 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Services Offered</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Web Application VAPT
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Full-Stack Web Development
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Video Production (via team)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> WordPress Security Audit
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column - Contact Form */}
          <div className="rounded-2xl border border-white/5 bg-[#0D1120] p-8">
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
                
                {/* Service Quick-Select Pricing Cards */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">What are you looking for?</h3>
                  <div className="grid gap-3 grid-cols-3">
                    
                    {/* Card 1 — Cybersecurity/VAPT */}
                    <div 
                      onClick={() => setService("Cybersecurity/VAPT")}
                      className={`rounded-xl border p-3 cursor-pointer text-center transition-all ${service === "Cybersecurity/VAPT" ? "border-[#7C3AED] bg-[#7C3AED]/10" : "border-white/5 bg-[#0A0E1A]/40 hover:border-[#7C3AED]/50"}`}
                    >
                      <p className="text-xs font-bold text-white leading-tight">Cybersecurity/VAPT</p>
                      <p className="text-[10px] text-gray-400 mt-1">Starting from $149</p>
                    </div>

                    {/* Card 2 — Web Development */}
                    <div 
                      onClick={() => setService("Web Development")}
                      className={`rounded-xl border p-3 cursor-pointer text-center transition-all ${service === "Web Development" ? "border-[#7C3AED] bg-[#7C3AED]/10" : "border-white/5 bg-[#0A0E1A]/40 hover:border-[#7C3AED]/50"}`}
                    >
                      <p className="text-xs font-bold text-white leading-tight">Web Development</p>
                      <p className="text-[10px] text-gray-400 mt-1">Starting from $199</p>
                    </div>

                    {/* Card 3 — Video Production */}
                    <div 
                      onClick={() => setService("Video Production")}
                      className={`rounded-xl border p-3 cursor-pointer text-center transition-all ${service === "Video Production" ? "border-[#7C3AED] bg-[#7C3AED]/10" : "border-white/5 bg-[#0A0E1A]/40 hover:border-[#7C3AED]/50"}`}
                    >
                      <p className="text-xs font-bold text-white leading-tight">Video Production</p>
                      <p className="text-[10px] text-gray-400 mt-1">Starting from $79</p>
                    </div>

                  </div>
                </div>

                <h2 className="text-2xl font-bold">Send a message</h2>
                <div className="space-y-4">
                  
                  {/* Name */}
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

                  {/* Email */}
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

                  {/* Service Dropdown */}
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

                  {/* Budget Dropdown */}
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

                  {/* Message */}
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

                  {/* Submit Button */}
                  <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full rounded-xl bg-[#7C3AED] py-4 font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition hover:bg-[#6D28D9] flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
                  >
                    {loading ? 'Sending...' : 'Send Message →'}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#070B15] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xl font-bold text-[#7C3AED]">Khalid Sanawer</div>
            <p className="mt-2 text-sm text-gray-500">2025 Khalid Sanawer. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-gray-400">
            <a href="/services" className="transition hover:text-white">
              Services
            </a>
            <a href="/portfolio" className="transition hover:text-white">
              Portfolio
            </a>
            <a href="/team" className="transition hover:text-white">
              Team
            </a>
            <a href="/#about" className="transition hover:text-white">
              About
            </a>
            <a href="/contact" className="transition hover:text-white">
              Contact
            </a>
          </div>

          <div className="flex gap-4 text-lg text-gray-400">
            <a href="#" aria-label="Twitter" className="transition hover:text-[#7C3AED]">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="transition hover:text-[#7C3AED]">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="GitHub" className="transition hover:text-[#7C3AED]">
              <FaGithub />
            </a>
            <a
              href="mailto:security@khalidsanawer.online"
              aria-label="Email security@khalidsanawer.online"
              className="transition hover:text-[#7C3AED]"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
