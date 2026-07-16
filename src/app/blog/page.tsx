"use client";

import { useState, useEffect } from "react";
import { FaShieldAlt, FaCode, FaVideo, FaChevronDown, FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { motion } from 'framer-motion';

const blogPosts = [
  {
    slug: "wordpress-security-checklist-2025",
    title: "WordPress Security Checklist 2025",
    excerpt: "A practical checklist covering the most common WordPress vulnerabilities and how to fix them before attackers exploit them.",
    category: "Security",
    date: "June 15, 2025",
    readTime: "5 min read",
    tags: ["WordPress", "VAPT", "Security"]
  },
  {
    slug: "how-to-find-xss-in-web-apps",
    title: "How to Find XSS Vulnerabilities in Web Apps",
    excerpt: "A step-by-step guide to identifying Cross-Site Scripting vulnerabilities using manual testing and Burp Suite.",
    category: "Security",
    date: "June 20, 2025",
    readTime: "8 min read",
    tags: ["XSS", "Burp Suite", "OWASP"]
  },
  {
    slug: "nextjs-14-best-practices",
    title: "Next.js 14 Best Practices for Production",
    excerpt: "Key patterns and optimizations for building production-ready Next.js 14 applications with App Router.",
    category: "Development",
    date: "June 25, 2025",
    readTime: "6 min read",
    tags: ["Next.js", "React", "TypeScript"]
  }
];

const categoryColors: Record<string, string> = {
  Security: "bg-[#7C3AED]",
  Development: "bg-blue-500",
};

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

export default function Blog() {
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
      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-4 z-50 flex justify-center px-4 sm:px-6 relative">
        <div
          className={`flex items-center justify-between w-full max-w-3xl px-4 sm:px-6 py-3 rounded-full border border-white/10 transition-all duration-300 ${scrolled ? "bg-[#0A0E1A]/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-[#0D1120]/80 backdrop-blur-sm"}`}
        >
          <div className="text-sm font-bold text-[#7C3AED] tracking-tight">
            Khalid Sanawer
          </div>

          <div className="hidden md:flex items-center gap-1">
            <a href="/" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition">Home</a>
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
                  <a href="/vapt" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">
                    <span className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED]"><FaShieldAlt className="text-sm" /></span>
                    <div><div className="font-medium text-white text-sm">VAPT</div><div className="text-xs text-gray-500">Security Testing</div></div>
                  </a>
                  <a href="/services#webdev" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400"><FaCode className="text-sm" /></span>
                    <div><div className="font-medium text-white text-sm">Web Development</div><div className="text-xs text-gray-500">Next.js & MERN Stack</div></div>
                  </a>
                  <a href="/services#video" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">
                    <span className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400"><FaVideo className="text-sm" /></span>
                    <div><div className="font-medium text-white text-sm">Video Production</div><div className="text-xs text-gray-500">Premiere Pro & CapCut</div></div>
                  </a>
                </div>
              )}
            </div>
            <a href="/services" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition">Pricing</a>
            <a href="/portfolio" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition">Portfolio</a>
            <a href="/blog" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition">Blog</a>
            <a href="/team" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition">Team</a>
            <a href="/#about" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition">About</a>
          </div>

          <div className="flex items-center gap-2">
            <a href="/contact" className="px-4 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold rounded-full transition shadow-[0_0_15px_rgba(124,58,237,0.4)]">Contact</a>
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

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 py-16 text-center">
        <div className="absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7C3AED]/20 blur-[110px]" />

        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">BLOG</p>
          <h1 className="mb-6 text-3xl sm:text-4xl font-black md:text-6xl">
            Security insights & dev notes.
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Practical writeups on VAPT, web security, and full-stack development.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="mx-auto max-w-6xl grid gap-8 grid-cols-1 md:grid-cols-3">
          {blogPosts.map((post, index) => (
              <FadeUp key={post.slug} delay={index * 0.1}>
            <a
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-[#0D1120] rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
            >
              {/* Visual illustration */}
              {index === 0 && (
                <div className="relative h-40 bg-[#080D1A] overflow-hidden rounded-t-2xl border-b border-white/5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_60%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-mono text-xs text-left space-y-1.5 p-4 w-full">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500" />
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-gray-500 ml-2 text-xs">wp-config.php</span>
                      </div>
                      <div className="text-green-400">✓ Core updated: 6.4.2</div>
                      <div className="text-green-400">✓ XML-RPC disabled</div>
                      <div className="text-yellow-400">! Login attempts: 3/5</div>
                      <div className="text-red-400">✗ File permissions: 777</div>
                      <div className="text-green-400">✓ Backup: today 03:00</div>
                    </div>
                  </div>
                </div>
              )}
              {index === 1 && (
                <div className="relative h-40 bg-[#080D1A] overflow-hidden rounded-t-2xl border-b border-white/5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_60%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-mono text-xs space-y-1.5 p-4 w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500" />
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-gray-500 ml-2 text-xs">burpsuite — repeater</span>
                      </div>
                      <div className="text-gray-400">GET /search?q=<span className="text-red-400">&lt;script&gt;alert(1)&lt;/script&gt;</span></div>
                      <div className="text-gray-500">Host: target.com</div>
                      <div className="mt-2 text-yellow-400">⚠ XSS reflected in response</div>
                      <div className="text-green-400">→ Payload executed</div>
                    </div>
                  </div>
                </div>
              )}
              {index === 2 && (
                <div className="relative h-40 bg-[#080D1A] overflow-hidden rounded-t-2xl border-b border-white/5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-mono text-xs space-y-1.5 p-4 w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500" />
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-gray-500 ml-2 text-xs">app/page.tsx</span>
                      </div>
                      <div><span className="text-blue-400">import</span> <span className="text-white">{`{ Metadata }`}</span> <span className="text-blue-400">from</span> <span className="text-green-400">&apos;next&apos;</span></div>
                      <div><span className="text-purple-400">export default async function</span> <span className="text-yellow-400">Page</span><span className="text-white">() {`{`}</span></div>
                      <div className="pl-4 text-gray-400">{`// Server Component`}</div>
                      <div className="pl-4"><span className="text-blue-400">return</span> <span className="text-white">&lt;</span><span className="text-red-400">main</span><span className="text-white">&gt;...&lt;/</span><span className="text-red-400">main</span><span className="text-white">&gt;</span></div>
                      <div className="text-white">{`}`}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col flex-grow p-6">
                {/* Category badge */}
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white group-hover:text-[#C4B5FD] transition-colors mb-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom: date, read time, link */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <div className="text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span className="mx-2">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#7C3AED] group-hover:underline">
                    Read More →
                  </span>
                </div>
              </div>
            </a>
              </FadeUp>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#080D1A] px-4 sm:px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between text-center md:text-left">
          <div>
            <div className="text-xl font-bold text-[#7C3AED]">Khalid Sanawer</div>
            <p className="mt-2 text-sm text-gray-500">2025 Khalid Sanawer. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-5 text-sm text-gray-400">
            <a href="/services" className="transition hover:text-white">Services</a>
            <a href="/portfolio" className="transition hover:text-white">Portfolio</a>
            <a href="/blog" className="transition hover:text-white">Blog</a>
            <a href="/team" className="transition hover:text-white">Team</a>
            <a href="/#about" className="transition hover:text-white">About</a>
            <a href="/contact" className="transition hover:text-white">Contact</a>
          </div>

          <div className="flex justify-center md:justify-start gap-4 text-lg text-gray-400">
            <a href="#" aria-label="Twitter" className="transition hover:text-[#7C3AED]"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn" className="transition hover:text-[#7C3AED]"><FaLinkedin /></a>
            <a href="#" aria-label="GitHub" className="transition hover:text-[#7C3AED]"><FaGithub /></a>
            <a href="mailto:security@khalidsanawer.online" aria-label="Email security@khalidsanawer.online" className="transition hover:text-[#7C3AED]"><FaEnvelope /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
