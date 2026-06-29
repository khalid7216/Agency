"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaCode,
  FaVideo,
  FaChevronDown,
  FaCheck,
  FaLock,
  FaFileAlt,
  FaBug,
  FaHandshake,
  FaSearch,
  FaDollarSign,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

const FadeUp = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

export default function Vapt() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#0A0E1A] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
      </div>

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

      <section className="relative px-6 pb-14 pt-20 md:pb-20 md:pt-28">
        <div className="absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7C3AED]/20 blur-[110px]" />

        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]"
          >
            VAPT SERVICES
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-5xl font-black md:text-7xl tracking-tight"
          >
            We Secure What Others Miss.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Affordable penetration testing for startups and small businesses.
            Professional security — without the enterprise price tag.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
              <FaLock className="text-[#7C3AED]" /> NDA Protected
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
              <FaFileAlt className="text-[#7C3AED]" /> Detailed Reports
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
              <FaDollarSign className="text-[#7C3AED]" /> Budget Friendly
            </span>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24 border-y border-white/5 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl grid gap-14 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <FadeUp delay={0}>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">
                Why VAPT with Us
              </p>
              <h2 className="text-4xl font-bold md:text-5xl mb-6">
                Built for Startups & Small Businesses
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Most penetration testing firms charge thousands of dollars —
                putting real security out of reach for growing businesses. We
                believe every business deserves professional security, regardless
                of budget.
                <br />
                <br />
                We work exclusively with startups, small businesses, and
                independent website owners who want to protect their customers
                and reputation without breaking the bank.
                <br />
                <br />
                Our engagements are fully confidential. Every client signs a
                proper legal contract before testing begins, and your report is
                never shared with anyone — period.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <div className="text-3xl font-black text-[#7C3AED]">
                    1200+
                  </div>
                  <div className="text-sm text-gray-400">Sites Tested</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-[#7C3AED]">10+</div>
                  <div className="text-sm text-gray-400">Global Brands</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-[#7C3AED]">100%</div>
                  <div className="text-sm text-gray-400">Confidential</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-[#7C3AED]">
                    EC-Council
                  </div>
                  <div className="text-sm text-gray-400">Certified</div>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="bg-[#080D1A] rounded-2xl border border-white/5 overflow-hidden font-mono text-xs leading-relaxed shadow-[0_0_40px_rgba(124,58,237,0.1)]">
              <div className="flex items-center gap-1.5 px-5 py-3 border-b border-white/5 bg-[#0D1120]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="text-gray-500 text-[10px] ml-2">
                  terminal — auditwave vapt
                </span>
              </div>
              <div className="p-6 space-y-1.5 text-gray-300 select-none">
                <div className="text-[#C4B5FD] font-bold mb-3">
                  # AuditWave VAPT
                </div>
                <div>
                  <span className="text-gray-500">$ </span>
                  client: startup_client
                </div>
                <div>
                  <span className="text-gray-500">$ </span>
                  scope: web_app + api
                </div>
                <div>
                  <span className="text-gray-500">$ </span>
                  budget:{" "}
                  <span className="text-green-400">✓ approved</span>
                </div>
                <div>
                  <span className="text-gray-500">$ </span>
                  contract:{" "}
                  <span className="text-green-400">✓ signed</span>
                </div>
                <div>
                  <span className="text-gray-500">$ </span>
                  nda: <span className="text-green-400">✓ active</span>
                </div>
                <div className="text-gray-600">---</div>
                <div>
                  <span className="text-gray-500">$ </span>
                  [Starting security assessment...]
                </div>
                <div className="text-green-400">✓ Recon complete</div>
                <div className="text-green-400">✓ Scanning endpoints</div>
                <div className="text-yellow-400">
                  ! Vulnerability found: SQLi
                </div>
                <div className="text-[#C4B5FD]">
                  → Documenting for report...
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <FadeUp delay={0}>
            <div className="mb-14 text-center max-w-2xl mx-auto">
              <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">
                SCOPE
              </p>
              <h2 className="text-4xl font-bold md:text-5xl mb-4">
                What Do You Want Tested?
              </h2>
              <p className="text-gray-400">
                You define the scope. We test everything within it — nothing
                outside.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-6 md:grid-cols-2">
            <FadeUp delay={0}>
              <div className="bg-[#0D1120] rounded-2xl p-6 border border-white/5 hover:-translate-y-1 transition duration-300 flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#C4B5FD] mb-5">
                  <FaBug className="text-xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Web Application</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-grow">
                  Full testing of your web app — login flows, forms, APIs,
                  authentication, session management, and business logic.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["OWASP Top 10", "Auth Testing", "Input Validation"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="bg-[#0D1120] rounded-2xl p-6 border border-white/5 hover:-translate-y-1 transition duration-300 flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300 mb-5">
                  <FaShieldAlt className="text-xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">WordPress Security</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-grow">
                  Plugin vulnerabilities, outdated themes, admin panel hardening,
                  XML-RPC, and WordPress-specific attack vectors.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Plugin CVEs", "WP Hardening", "File Permissions"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="bg-[#0D1120] rounded-2xl p-6 border border-white/5 hover:-translate-y-1 transition duration-300 flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/15 text-pink-300 mb-5">
                  <FaCode className="text-xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">API Security</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-grow">
                  REST/GraphQL API endpoints, authentication tokens, rate
                  limiting, IDOR, and data exposure vulnerabilities.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["REST API", "GraphQL", "IDOR", "Auth Bypass"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="bg-[#0D1120] rounded-2xl p-6 border border-white/5 hover:-translate-y-1 transition duration-300 flex flex-col relative overflow-hidden">
                <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/25 text-[10px] font-semibold text-[#C4B5FD]">
                  Most Comprehensive
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15 text-orange-300 mb-5">
                  <FaSearch className="text-xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Full Stack Audit</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-grow">
                  Complete assessment covering frontend, backend, database, API,
                  and infrastructure. Most thorough option.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Full Coverage", "Best Value", "Priority Report"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 border-y border-white/5 bg-white/[0.025]">
        <div className="mx-auto max-w-4xl">
          <FadeUp delay={0}>
            <div className="mb-14 text-center max-w-2xl mx-auto">
              <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">
                METHODOLOGY
              </p>
              <h2 className="text-4xl font-bold md:text-5xl mb-4">
                How We Test.
              </h2>
              <p className="text-gray-400">
                A structured, proven approach — same methodology used by
                enterprise security teams.
              </p>
            </div>
          </FadeUp>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#7C3AED]/20 md:left-8" />

            <div className="space-y-8">
              {[
                {
                  icon: FaSearch,
                  color: "text-[#C4B5FD]",
                  bg: "bg-[#7C3AED]/20",
                  border: "border-[#7C3AED]/40",
                  step: "01",
                  title: "Reconnaissance & Information Gathering",
                  desc: "We map your attack surface — subdomains, endpoints, technologies, exposed services, and publicly available information about your target.",
                  tags: ["OSINT", "Subdomain Enum", "Tech Fingerprinting"],
                },
                {
                  icon: FaBug,
                  color: "text-blue-300",
                  bg: "bg-blue-500/20",
                  border: "border-blue-500/40",
                  step: "02",
                  title: "Vulnerability Scanning & Analysis",
                  desc: "Automated and manual scanning to identify potential vulnerabilities. We go beyond automated tools — every finding is manually verified.",
                  tags: ["Manual Testing", "Burp Suite", "OWASP ZAP"],
                },
                {
                  icon: FaShieldAlt,
                  color: "text-rose-300",
                  bg: "bg-rose-500/20",
                  border: "border-rose-500/40",
                  step: "03",
                  title: "Exploitation & Proof of Concept",
                  desc: "We attempt to exploit discovered vulnerabilities to prove real-world impact. Every PoC is documented with screenshots and reproduction steps.",
                  tags: ["PoC Development", "Impact Assessment", "Safe Testing"],
                },
                {
                  icon: FaFileAlt,
                  color: "text-amber-300",
                  bg: "bg-amber-500/20",
                  border: "border-amber-500/40",
                  step: "04",
                  title: "Documentation & Reporting",
                  desc: "Every finding is documented with severity rating (Critical/High/Medium/Low), CVSS score, impact description, and step-by-step reproduction guide.",
                  tags: ["CVSS Scoring", "Severity Rating", "Screenshots"],
                },
                {
                  icon: FaCheck,
                  color: "text-green-300",
                  bg: "bg-green-500/20",
                  border: "border-green-500/40",
                  step: "05",
                  title: "Fix Recommendations & Retest",
                  desc: "We provide clear, actionable remediation steps for every finding. After you fix the issues, we offer one free retest to verify the fixes.",
                  tags: ["Fix Guidance", "1 Free Retest", "Verification"],
                },
              ].map((step, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="relative flex gap-6 md:gap-8 pl-16 md:pl-20">
                    <div className={`absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-full ${step.bg} border-2 ${step.border} flex items-center justify-center z-10 shrink-0`}>
                      <step.icon className={`text-sm md:text-base ${step.color}`} />
                    </div>

                    <div className="bg-[#0D1120] rounded-2xl p-6 border border-white/5 w-full">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-1 rounded-md">
                          Step {step.step}
                        </span>
                        <h3 className="text-base md:text-lg font-bold">{step.title}</h3>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                        {step.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <FadeUp delay={0}>
            <div className="mb-14 text-center max-w-2xl mx-auto">
              <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">
                DELIVERABLE
              </p>
              <h2 className="text-4xl font-bold md:text-5xl mb-4">
                What You Get — The Report.
              </h2>
              <p className="text-gray-400">
                A professional PDF report you can share with your team,
                developers, or investors.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start">
            <FadeUp delay={0}>
              <div className="bg-[#0D1120] rounded-2xl p-8 border border-white/5 font-mono text-sm leading-relaxed shadow-[0_0_30px_rgba(124,58,237,0.08)]">
                <div className="text-[#C4B5FD] font-bold text-base mb-6 tracking-wider">
                  📄 PIXVAULT SECURITY REPORT
                </div>
                <div className="text-gray-600 mb-4">
                  ━━━━━━━━━━━━━━━━━━━━━━━━
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="text-white font-bold">
                      01. Executive Summary
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      Risk overview for non-technical stakeholders
                    </div>
                  </div>

                  <div>
                    <div className="text-white font-bold">
                      02. Scope & Methodology
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      What was tested and how
                    </div>
                  </div>

                  <div>
                    <div className="text-white font-bold">
                      03. Findings Summary
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      Critical:{" "}
                      <span className="text-red-400">2</span> · High:{" "}
                      <span className="text-orange-400">3</span> · Medium:{" "}
                      <span className="text-yellow-400">5</span> · Low:{" "}
                      <span className="text-green-400">8</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-white font-bold">
                      04. Detailed Findings
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      Per vulnerability:
                    </div>
                    <div className="text-gray-400 text-xs mt-1 space-y-0.5">
                      <div>• Title &amp; CVSS Score</div>
                      <div>• Description</div>
                      <div>• Proof of Concept</div>
                      <div>• Screenshots</div>
                      <div>• Remediation Steps</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-white font-bold">
                      05. Fix Recommendations
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      Priority order, developer-friendly guidance
                    </div>
                  </div>

                  <div>
                    <div className="text-white font-bold">
                      06. Retest Results
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      Verification after fixes applied
                    </div>
                  </div>
                </div>

                <div className="text-gray-600 mt-6">
                  ━━━━━━━━━━━━━━━━━━━━━━━━
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="space-y-4">
                <div className="bg-[#0D1120] rounded-2xl p-6 border border-white/5 flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/15 text-green-400">
                    <FaLock className="text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">100% Confidential</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Your report is protected by NDA. We never disclose
                      findings to third parties — ever.
                    </p>
                  </div>
                </div>

                <div className="bg-[#0D1120] rounded-2xl p-6 border border-white/5 flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#C4B5FD]">
                    <FaHandshake className="text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Legal Contract First</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Proper authorization agreement signed before any testing
                      begins. You&apos;re protected legally.
                    </p>
                  </div>
                </div>

                <div className="bg-[#0D1120] rounded-2xl p-6 border border-white/5 flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                    <FaFileAlt className="text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">
                      Developer-Friendly
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Reports include code-level fix recommendations your
                      developers can implement immediately.
                    </p>
                  </div>
                </div>

                <div className="bg-[#0D1120] rounded-2xl p-6 border border-white/5 flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-500/15 text-yellow-300">
                    <FaCheck className="text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Free Retest Included</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      After you fix the issues, we verify the fixes at no extra
                      cost — Basic plan gets 1 retest.
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 bg-[#080D1A] border-y border-white/5">
        <FadeUp delay={0}>
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7C3AED]/20 text-[#C4B5FD]">
                <FaLock className="text-3xl" />
              </div>
            </div>
            <h2 className="text-4xl font-bold md:text-5xl mb-6">
              Your Security. Your Secret.
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
              We understand that security findings are sensitive business
              information. Before any engagement begins, we sign a formal
              Non-Disclosure Agreement (NDA). Your vulnerabilities, your report,
              and your business information are never shared with anyone — not
              even anonymized. What we find, stays between us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span> NDA signed before
                testing
              </span>
              <span className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span> No third-party
                disclosure — ever
              </span>
              <span className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span> Encrypted report
                delivery
              </span>
            </div>
          </div>
        </FadeUp>
      </section>

      <section className="px-6 py-24">
        <FadeUp delay={0}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold md:text-5xl mb-6">
              Transparent, Budget-Friendly Pricing
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10">
              No surprise fees. No enterprise contracts. Just honest security
              work at prices that make sense for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/services"
                className="rounded-xl bg-[#7C3AED] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-[#6D28D9]"
              >
                View Pricing →
              </a>
              <a
                href="/contact"
                className="rounded-xl border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-[#7C3AED]/60 hover:bg-white/5"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      <section className="relative px-6 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(124,58,237,0.16),transparent_55%)]" />
        <FadeUp delay={0}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-black md:text-6xl mb-6">
              Ready to secure your business?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-10">
              Free consultation call. No commitment required. Let&apos;s talk about
              what needs testing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="rounded-xl bg-[#7C3AED] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-[#6D28D9]"
              >
                Book Free Consultation
              </a>
              <a
                href="/contact"
                className="rounded-xl border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-[#7C3AED]/60 hover:bg-white/5"
              >
                View Sample Report
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      <footer className="border-t border-white/5 bg-[#070B15] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xl font-bold text-[#7C3AED]">
              Khalid Sanawer
            </div>
            <p className="mt-2 text-sm text-gray-500">
              2025 Khalid Sanawer. All rights reserved.
            </p>
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
            <a
              href="#"
              aria-label="Twitter"
              className="transition hover:text-[#7C3AED]"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="transition hover:text-[#7C3AED]"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="transition hover:text-[#7C3AED]"
            >
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
