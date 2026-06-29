"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaCode,
  FaChevronDown,
  FaVideo,
  FaCar,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaStar,
} from "react-icons/fa";

const projects = [
  {
    title: "User Testing Blog",
    description: "Next.js 14 client project with high-performance content delivery and modern UI.",
    category: "web-dev",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Contentful"],
    border: "border-t-[#7C3AED]",
    glow: "shadow-[0_-4px_24px_rgba(124,58,237,0.15)] hover:shadow-[0_-4px_24px_rgba(124,58,237,0.3)]",
  },
  {
    title: "Rent-a-Car Platform",
    description: "Full-stack car rental platform with custom booking flow, database, and admin dashboard.",
    category: "web-dev",
    tags: ["Next.js", "Node.js", "MongoDB", "Cloudinary"],
    border: "border-t-blue-500",
    glow: "shadow-[0_-4px_24px_rgba(59,130,246,0.15)] hover:shadow-[0_-4px_24px_rgba(59,130,246,0.3)]",
  },
  {
    title: "AuditWave Security Site",
    description: "Personal brand security portfolio and consulting site featuring interactive shell elements.",
    category: "cybersecurity",
    tags: ["Next.js", "Tailwind CSS", "Vercel", "Security"],
    border: "border-t-pink-500",
    glow: "shadow-[0_-4px_24px_rgba(236,72,153,0.15)] hover:shadow-[0_-4px_24px_rgba(236,72,153,0.3)]",
  },
  {
    title: "FinTech API Security Audit",
    description: "VAPT and comprehensive security review of a high-volume international payment gateway API.",
    category: "cybersecurity",
    tags: ["OWASP Top 10", "Burp Suite", "REST API", "Threat Modeling"],
    border: "border-t-[#7C3AED]",
    glow: "shadow-[0_-4px_24px_rgba(124,58,237,0.15)] hover:shadow-[0_-4px_24px_rgba(124,58,237,0.3)]",
  },
  {
    title: "SaaS Brand Launch Video",
    description: "Cinematic promotional video editing, sound design, and custom motion graphics for a B2B startup launch.",
    category: "video",
    tags: ["Premiere Pro", "After Effects", "Motion Graphics", "Sound Design"],
    border: "border-t-blue-500",
    glow: "shadow-[0_-4px_24px_rgba(59,130,246,0.15)] hover:shadow-[0_-4px_24px_rgba(59,130,246,0.3)]",
  },
  {
    title: "AI Animated Shorts Series",
    description: "Viral short-form content series utilizing AI-generated avatars, captions, and trending animation styles.",
    category: "video",
    tags: ["CapCut Pro", "AI Animation", "Shorts/Reels", "Content Creation"],
    border: "border-t-pink-500",
    glow: "shadow-[0_-4px_24px_rgba(236,72,153,0.15)] hover:shadow-[0_-4px_24px_rgba(236,72,153,0.3)]",
  },
];

const categories = [
  { id: "all", name: "All Work" },
  { id: "cybersecurity", name: "Cybersecurity" },
  { id: "web-dev", name: "Web Dev" },
  { id: "video", name: "Video Production" },
];

const testimonials = [
  {
    stars: 5,
    review: "The penetration test report was incredibly detailed. Found issues we'd been missing for months. Worth every penny.",
    initials: "MK",
    name: "Michael K.",
    role: "CTO, SaaS Startup",
    tag: "VAPT",
    avatarWrap: "bg-[#7C3AED]/20 text-[#C4B5FD] border-[#7C3AED]/30",
    tagStyle: "bg-[#7C3AED]/10 border border-[#7C3AED]/25 text-[#C4B5FD]",
    avatarSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
  },
  {
    stars: 5,
    review: "Delivered the Next.js project ahead of schedule. Code quality was clean and the UI looked better than our mockups.",
    initials: "LT",
    name: "Lisa T.",
    role: "Founder, E-commerce Brand",
    tag: "Web Dev",
    avatarWrap: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    tagStyle: "bg-blue-500/10 border border-blue-500/25 text-blue-300",
    avatarSrc: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
  },
  {
    stars: 5,
    review: "The video editing team turned our raw footage into something we're genuinely proud to show clients. Fast and professional.",
    initials: "RH",
    name: "Raza H.",
    role: "Marketing Lead, Dubai Agency",
    tag: "Video",
    avatarWrap: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    tagStyle: "bg-pink-500/10 border border-pink-500/25 text-pink-300",
    avatarSrc: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face",
  },
];

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, ease: 'easeOut', delay }}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects = projects.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

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
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">PORTFOLIO</p>
          <h1 className="mb-6 text-4xl font-black md:text-6xl">Portfolio</h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Practical delivery behind every project. Code, security research, and dynamic video edits that drive results.
          </p>
        </div>
      </section>

      {/* Filter Tabs Section */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-xl flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
                activeCategory === cat.id
                  ? "bg-[#7C3AED] border-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                  : "bg-[#0D1120] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <FadeUp key={project.title} delay={index * 0.1}>
              <article
                className={`rounded-xl border border-white/10 ${project.border} ${project.glow} bg-white/[0.035] p-8 transition duration-300 flex flex-col justify-between`}
              >
                {/* Styled Preview Mockup */}
                <div className="mb-6">
                  {project.title === "User Testing Blog" && (
                    <div className="h-48 bg-[#080D1A] relative overflow-hidden rounded-lg border border-white/5 flex flex-col p-4 shadow-inner">
                      {/* Browser Bar */}
                      <div className="flex items-center gap-1.5 pb-2 border-b border-white/5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                        <div className="h-4 flex-grow bg-[#0D1120] rounded border border-white/5 mx-2 flex items-center px-2">
                          <span className="text-[9px] text-gray-500">usertestingblog.com</span>
                        </div>
                      </div>
                      {/* Fake Blog Content */}
                      <div className="flex-grow flex flex-col gap-2 pt-3">
                        <div className="h-3 w-3/4 bg-[#0D1120] rounded" />
                        <div className="h-2 w-full bg-[#0D1120] rounded opacity-65" />
                        <div className="h-2 w-5/6 bg-[#0D1120] rounded opacity-65" />
                        <div className="h-2 w-2/3 bg-[#0D1120] rounded opacity-65" />
                        <div className="mt-auto flex gap-2">
                          <div className="h-4 w-12 bg-[#7C3AED]/20 rounded" />
                          <div className="h-4 w-12 bg-[#0D1120] rounded" />
                        </div>
                      </div>
                    </div>
                  )}

                  {project.title === "Rent-a-Car Platform" && (
                    <div className="h-48 bg-[#080D1A] relative overflow-hidden rounded-lg border border-white/5 flex flex-col p-4 shadow-inner">
                      {/* Fake UI header */}
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <div className="text-[10px] font-bold text-blue-400">DriveGo</div>
                        <div className="h-3 w-8 bg-[#0D1120] rounded" />
                      </div>
                      {/* Car placeholder */}
                      <div className="flex-grow flex items-center justify-center relative">
                        <div className="flex flex-col items-center gap-2">
                          <FaCar className="text-3xl text-blue-400" />
                          <span className="text-[9px] text-gray-500 uppercase tracking-widest">Premium SUV</span>
                        </div>
                        {/* Floating UI Card */}
                        <div className="absolute bottom-1 right-1 bg-[#0D1120] border border-white/5 rounded p-1.5 shadow-lg flex flex-col gap-1">
                          <div className="h-2 w-10 bg-blue-500/20 rounded" />
                          <span className="text-[9px] text-green-400 font-bold">$45/day</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {project.title === "AuditWave Security Site" && (
                    <div className="h-48 bg-[#080D1A] relative overflow-hidden rounded-lg border border-white/5 flex flex-col p-4 shadow-inner font-mono text-[9px] text-emerald-400 leading-tight">
                      {/* Header */}
                      <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/5 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                        <span className="text-gray-500 text-[8px] ml-2">bash - terminal</span>
                      </div>
                      {/* Terminal lines */}
                      <div className="flex flex-col gap-1 select-none">
                        <div>
                          <span className="text-pink-500">auditwave@sec:~$</span> nmap -sV target.com
                        </div>
                        <div className="text-gray-500">Starting Nmap 7.92 at 2026-06-27 05:20</div>
                        <div>Nmap scan report for target.com (104.244.42.1)</div>
                        <div className="text-yellow-400">PORT    STATE SERVICE</div>
                        <div>80/tcp  open  http  nginx/1.18.0</div>
                        <div>443/tcp open  ssl/http nginx/1.18.0</div>
                        <div className="text-green-500">[+] SCAN COMPLETE - 0 VULS</div>
                      </div>
                    </div>
                  )}

                  {project.title === "FinTech API Security Audit" && (
                    <div className="h-48 bg-[#080D1A] relative overflow-hidden rounded-lg border border-white/5 flex flex-col p-4 shadow-inner font-mono text-[9px] text-[#C4B5FD] leading-tight">
                      <div className="flex items-center justify-between pb-1.5 border-b border-white/5 mb-2 text-gray-500">
                        <span>POST /api/v1/transfer</span>
                        <span className="text-red-400 font-bold">401 Unauthorized</span>
                      </div>
                      <div className="flex-grow overflow-hidden select-none text-[8px]">
                        <div className="text-gray-500">{"{"}</div>
                        <div className="pl-2 text-gray-400">{"\"status\": \"error\","}</div>
                        <div className="pl-2 text-gray-400">{"\"message\": \"JWT Token Expired\","}</div>
                        <div className="pl-2 text-yellow-400">{"\"detail\": \"Failed signature verification\""}</div>
                        <div className="text-gray-500">{"}"}</div>
                        <div className="mt-2.5 text-red-400 font-bold">⚠️ VULNERABILITY FOUND: Broken Authorization</div>
                        <div className="text-emerald-400">✓ Fixed: Implemented token verification & claims audit</div>
                      </div>
                    </div>
                  )}

                  {project.title === "SaaS Brand Launch Video" && (
                    <div className="h-48 bg-[#080D1A] relative overflow-hidden rounded-lg border border-white/5 flex flex-col items-center justify-center p-4 shadow-inner">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-purple-900/30 opacity-60" />
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/25 border border-blue-400 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <FaVideo className="text-lg ml-0.5" />
                      </div>
                      <div className="absolute bottom-2 left-3 right-3 flex items-center gap-2 z-10">
                        <span className="text-[8px] text-gray-400">01:42</span>
                        <div className="h-1 flex-grow bg-white/10 rounded overflow-hidden">
                          <div className="h-full w-2/3 bg-blue-500" />
                        </div>
                        <span className="text-[8px] text-gray-400">03:00</span>
                      </div>
                    </div>
                  )}

                  {project.title === "AI Animated Shorts Series" && (
                    <div className="h-48 bg-[#080D1A] relative overflow-hidden rounded-lg border border-white/5 flex items-center justify-center p-2 shadow-inner">
                      <div className="w-24 h-full border border-white/10 bg-[#0C101F] rounded-xl flex flex-col p-1.5 relative overflow-hidden">
                        <div className="w-8 h-2 bg-white/15 rounded-full mx-auto mb-1" />
                        <div className="flex-grow bg-gradient-to-b from-[#7C3AED]/20 to-pink-500/10 rounded flex flex-col justify-between p-1.5 relative">
                          <div className="text-[7px] text-pink-400 font-bold">Shorts</div>
                          <div className="flex flex-col gap-0.5">
                            <div className="h-1.5 w-8 bg-white/20 rounded" />
                            <div className="h-1.5 w-12 bg-white/20 rounded" />
                          </div>
                          <div className="absolute right-1 bottom-6 flex flex-col gap-1.5 text-right items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/25" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/25" />
                          </div>
                          <span className="text-[6px] text-yellow-300 font-mono tracking-widest mt-auto">AI ANIMATED</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="mt-3 text-sm text-gray-400">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Kind Words Section */}
      <section className="border-t border-white/5 bg-[#080D1A] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl text-left">
            <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">KIND WORDS</p>
            <h2 className="text-4xl font-bold md:text-5xl">What people say about the work.</h2>
          </div>

          <div className="items-start grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {testimonials.map((testimonial, i) => (
              <article
                key={i}
                className={`flex flex-col bg-[#0D1120] rounded-2xl p-6 border border-white/5 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] transition duration-300 ${
                  i === 0 ? "md:mt-8 mt-0" : i === 1 ? "md:mt-0 mt-0" : "md:mt-8 mt-0"
                }`}
              >
                {/* TOP: Name + Role + Avatar on same line */}
                <div className="flex items-center gap-3 mb-6">
                  <Image src={testimonial.avatarSrc} alt={testimonial.name} width={40} height={40} className="rounded-full object-cover shrink-0" />
                  <div className="text-left">
                    <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>

                {/* MIDDLE: Review text in quotes */}
                <div className="text-left flex-grow">
                  <span className="text-[#7C3AED] text-4xl font-black leading-none block mb-2">“</span>
                  <p className="text-gray-300 text-sm leading-relaxed italic">
                    {testimonial.review}
                  </p>
                </div>

                {/* BOTTOM: Service tag + stars */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <div className="flex gap-0.5 text-yellow-400 text-xs">
                    {[...Array(testimonial.stars)].map((_, idx) => (
                      <FaStar key={idx} />
                    ))}
                  </div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${testimonial.tagStyle}`}>
                    {testimonial.tag}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative px-6 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(124,58,237,0.16),transparent_55%)]" />
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black md:text-6xl">Ready to start a project?</h2>
          <p className="mt-4 text-base text-gray-400 max-w-md mx-auto">
            Get in touch to secure your platform, build your application, or elevate your content.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="rounded-xl bg-[#7C3AED] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-[#6D28D9]"
            >
              Get in Touch →
            </a>
            <a
              href="mailto:security@khalidsanawer.online?subject=Booking%20a%20Call"
              className="rounded-xl border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-[#7C3AED]/60 hover:bg-white/5"
            >
              Book a Call
            </a>
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
