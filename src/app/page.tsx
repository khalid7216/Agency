"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaCar,
  FaCode,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaShieldAlt,
  FaStar,
  FaTwitter,
  FaVideo,
} from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { motion } from 'framer-motion';


const services = [
  {
    title: "Cybersecurity & VAPT",
    icon: FaShieldAlt,
    tags: ["Web App Testing", "Network Audit", "WordPress Security"],
    metric: "1200+ sites tested",
    border: "border-l-[#7C3AED]",
    iconWrap: "bg-[#7C3AED]/15 text-[#C4B5FD]",
    layout: "items-center text-center",
  },
  {
    title: "Web Development",
    icon: FaCode,
    tags: ["Next.js", "MERN Stack", "REST APIs"],
    metric: "Production-ready apps",
    border: "border-l-blue-500",
    iconWrap: "bg-blue-500/15 text-blue-300",
    layout: "items-center text-center",
  },
  {
    title: "Video Editing",
    icon: FaVideo,
    tags: ["Premiere Pro", "After Effects", "CapCut"],
    metric: "4K Production",
    border: "border-l-pink-500",
    iconWrap: "bg-pink-500/15 text-pink-300",
    layout: "items-center text-center",
  },
];

const stats = [
  { number: "1200+", label: "Sites Tested" },
  { number: "10+", label: "Global Brands" },
  { number: "4+", label: "Years Experience" },
  { number: "EC-Council", label: "Certified" },
];

const projects = [
  {
    title: "User Testing Blog",
    description: "Next.js 14 client project",
    tags: ["Next.js", "TypeScript", "shadcn/ui"],
    border: "border-t-[#7C3AED]",
    glow: "shadow-[0_-4px_24px_rgba(124,58,237,0.25)] hover:shadow-[0_-4px_24px_rgba(124,58,237,0.4)]",
  },
  {
    title: "Rent-a-Car Platform",
    description: "Full-stack with admin panel",
    tags: ["Next.js", "Cloudinary", "Framer Motion"],
    border: "border-t-blue-500",
    glow: "shadow-[0_-4px_24px_rgba(59,130,246,0.25)] hover:shadow-[0_-4px_24px_rgba(59,130,246,0.4)]",
  },
  {
    title: "AuditWave Security Site",
    description: "Personal brand site",
    tags: ["Next.js", "Tailwind", "Vercel"],
    border: "border-t-pink-500",
    glow: "shadow-[0_-4px_24px_rgba(236,72,153,0.25)] hover:shadow-[0_-4px_24px_rgba(236,72,153,0.4)]",
  },
];

const skills = [
  {
    label: "Security",
    icon: FaShieldAlt,
    items: "Burp Suite, OWASP, HackerOne (cyberarmor72)",
  },
  {
    label: "Dev",
    icon: FaCode,
    items: "Next.js, React, Node.js, TypeScript",
  },
  {
    label: "Tools",
    icon: FaVideo,
    items: "Premiere Pro, After Effects, CapCut",
  },
];

const testimonials = [
  {
    stars: 5,
    review: "Khalid identified critical vulnerabilities in our WordPress site that we had no idea about. Professional, fast, and thorough.",
    initials: "JM",
    name: "James M.",
    role: "Website Owner, Finland",
    tag: "VAPT",
    avatarWrap: "bg-[#7C3AED]/20 text-[#C4B5FD] border-[#7C3AED]/30",
    tagStyle: "bg-[#7C3AED]/10 border border-[#7C3AED]/25 text-[#C4B5FD]",
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    stars: 5,
    review: "The blog platform he built for us was clean, fast, and delivered on time. Really understood what we needed.",
    initials: "SR",
    name: "Sarah R.",
    role: "Product Manager, UK",
    tag: "Web Dev",
    avatarWrap: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    tagStyle: "bg-blue-500/10 border border-blue-500/25 text-blue-300",
    avatarSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
  {
    stars: 5,
    review: "Our brand video campaign got amazing engagement. The team's editing quality is top-notch and the turnaround was quick.",
    initials: "AK",
    name: "Ahmed K.",
    role: "Marketing Director, UAE",
    tag: "Video",
    avatarWrap: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    tagStyle: "bg-pink-500/10 border border-pink-500/25 text-pink-300",
    avatarSrc: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&crop=face",
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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0E1A] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
      </div>

      <nav className="sticky top-4 z-50 flex justify-center px-4 sm:px-6 relative">
        <div
          className={`flex items-center justify-between w-full max-w-3xl px-4 sm:px-6 py-3 rounded-full border border-white/10 transition-all duration-300 ${scrolled ? "bg-[#0A0E1A]/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-[#0D1120]/80 backdrop-blur-sm"}`}
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

          <div className="flex items-center gap-2">
            <a
              href="/contact"
              className="px-4 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold rounded-full transition shadow-[0_0_15px_rgba(124,58,237,0.4)]"
            >
              Contact
            </a>
            <button
              className="md:hidden text-gray-300 hover:text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="space-y-1">
                <div className="w-5 h-0.5 bg-current" />
                <div className="w-5 h-0.5 bg-current" />
                <div className="w-5 h-0.5 bg-current" />
              </div>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-[#0D1120] border border-white/10 rounded-2xl p-4 z-50 space-y-2">
            <a href="/" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition">Home</a>
            <a href="/vapt" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition">VAPT</a>
            <a href="/services" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition">Web Development</a>
            <a href="/services" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition">Video Production</a>
            <a href="/services" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition">Pricing</a>
            <a href="/portfolio" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition">Portfolio</a>
            <a href="/blog" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition">Blog</a>
            <a href="/team" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition">Team</a>
            <a href="/#about" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition">About</a>
            <a href="/contact" className="block w-full text-center px-3 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold rounded-lg transition mt-2">Contact</a>
          </div>
        )}
      </nav>

      <section className="relative px-4 sm:px-6 pb-14 pt-20 md:pb-20 md:pt-28">
        <div className="absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7C3AED]/20 blur-[110px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <p className="mb-4 text-lg font-semibold text-[#C4B5FD]">Hey, I&apos;m Khalid 👋</p>
            <div className="mb-4 inline-flex items-center rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-2 text-sm text-[#DDD6FE]">
              🟢 Open to freelance & security engagements
            </div>

            <h1 className="mb-4 max-w-3xl text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-normal text-white mx-auto lg:mx-0">
              I Build. I Secure. I Create.
            </h1>

            <p className="text-base text-gray-400 mb-10 max-w-xs mx-auto lg:mx-0 leading-relaxed">
              Security is my expertise. Code is my craft. Video is my team&apos;s game.
            </p>

            <div className="mb-4 flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="mailto:security@khalidsanawer.online"
                className="rounded-xl bg-[#7C3AED] px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-[#6D28D9]"
              >
                Hire Me →
              </a>
              <a
                href="/portfolio"
                className="rounded-xl border border-white/15 px-7 py-3.5 font-semibold text-white transition hover:border-[#7C3AED]/60 hover:bg-white/5"
              >
                View Portfolio
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto">
            <div className="absolute -inset-4 bg-[#7C3AED]/20 blur-3xl rounded-full" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#7C3AED]/40 shadow-[0_0_40px_rgba(124,58,237,0.3)]">
              <Image
                src="/khalid.jpg"
                alt="Khalid Sanawer"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full border border-white/10 bg-[#0A0E1A]/90 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              🟢 Available for work
            </div>
          </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="px-4 sm:px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl text-left">
            <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">Security, software, and content that ship.</h2>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <FadeUp key={service.title} delay={index * 0.1}>
                <article
                  className={`flex min-h-[285px] flex-col ${service.layout} rounded-xl border border-white/10 ${service.border} bg-white/[0.035] p-7 transition hover:-translate-y-1 hover:bg-white/[0.055]`}
                >
                  <div className={`mb-6 flex h-14 w-14 self-center items-center justify-center rounded-xl ${service.iconWrap}`}>
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-auto pt-7 text-sm font-semibold text-[#C4B5FD]">{service.metric}</p>
                </article>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.025] px-4 sm:px-6 py-16">
        <FadeUp delay={0}>
        <div className="mx-auto grid max-w-7xl gap-6 grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-left lg:text-center">
              <div className="text-4xl sm:text-5xl font-black text-[#7C3AED] mb-2">{stat.number}</div>
              <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
        </FadeUp>
      </section>

      <section id="portfolio" className="px-4 sm:px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl text-left">
            <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">Portfolio</p>
            <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">Selected work with real delivery behind it.</h2>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {projects.map((project, index) => (
              <FadeUp key={project.title} delay={index * 0.1}>
              <a href="/portfolio" className="block group/card h-full">
                <article
                  className={`rounded-xl border border-white/10 ${project.border} ${project.glow} bg-white/[0.035] p-8 transition hover:-translate-y-1 hover:bg-white/[0.055] h-full`}
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
                          <div className="w-2 h-2 rounded-full bg-red-500/60" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                          <div className="w-2 h-2 rounded-full bg-green-500/60" />
                          <span className="text-gray-500 text-[8px] ml-2">bash - terminal</span>
                        </div>
                        {/* Terminal lines */}
                        <div className="flex flex-col gap-1 select-none">
                          <div><span className="text-pink-500">auditwave@sec:~$</span> nmap -sV target.com</div>
                          <div className="text-gray-500">Starting Nmap 7.92 at 2026-06-27 05:20</div>
                          <div>Nmap scan report for target.com (104.244.42.1)</div>
                          <div className="text-yellow-400">PORT    STATE SERVICE</div>
                          <div>80/tcp  open  http  nginx/1.18.0</div>
                          <div>443/tcp open  ssl/http nginx/1.18.0</div>
                          <div className="text-green-500">[+] SCAN COMPLETE - 0 VULS</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="mt-3 text-gray-400">{project.description}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </a>
              </FadeUp>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="/portfolio"
              className="rounded-xl border border-[#7C3AED] px-8 py-3.5 font-semibold text-[#DDD6FE] transition hover:bg-[#7C3AED]/10 hover:text-white shadow-[0_0_15px_rgba(124,58,237,0.15)] flex items-center gap-2"
            >
              View All Projects →
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="border-y border-white/5 bg-white/[0.025] px-4 sm:px-6 py-24">
        <FadeUp delay={0}>
        <div className="mx-auto grid max-w-7xl gap-12 grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">About</p>
            <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">Security Researcher. Developer. Creator.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Khalid Sanawer is a Pakistan-based security researcher and full-stack developer
              focused on practical results: finding vulnerabilities, building reliable web apps,
              and creating polished digital content. His work spans VAPT, Next.js production
              builds, brand websites, and video editing workflows for modern online businesses.
            </p>
          </div>

          <div className="space-y-4">
            {skills.map((skill) => {
              const Icon = skill.icon;

              return (
                <div key={skill.label} className="rounded-xl border border-white/10 bg-[#0A0E1A] p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#7C3AED]/15 text-[#C4B5FD]">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="font-bold">{skill.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-gray-400">{skill.items}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </FadeUp>
      </section>

      <section id="testimonials" className="border-t border-white/5 bg-[#080D1A] px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl text-left">
            <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">Clients</p>
            <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">What clients say.</h2>
          </div>

          <div className="items-start grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {testimonials.map((testimonial, i) => (
              <FadeUp key={i} delay={i * 0.1}>
              <article
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
                  <span className="text-[#7C3AED] text-4xl font-black leading-none block mb-2">&ldquo;</span>
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
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative px-4 sm:px-6 py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(124,58,237,0.16),transparent_55%)]" />
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-black md:text-6xl">Ready to work together?</h2>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:security@khalidsanawer.online"
              className="rounded-xl bg-[#7C3AED] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-[#6D28D9]"
            >
              Hire Me
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

      <footer className="border-t border-white/5 bg-[#070B15] px-4 sm:px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between text-center md:text-left">
          <div>
            <div className="text-xl font-bold text-[#7C3AED]">Khalid Sanawer</div>
            <p className="mt-2 text-sm text-gray-500">2025 Khalid Sanawer. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-5 text-sm text-gray-400">
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
            <a href="/#contact" className="transition hover:text-white">
              Contact
            </a>
          </div>

          <div className="flex justify-center md:justify-start gap-4 text-lg text-gray-400">
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
