import type { Metadata } from "next";
import Link from "next/link";
import { FaCheck, FaCode, FaShieldAlt, FaVideo } from "react-icons/fa";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Services & Transparent Pricing — VAPT, Web Dev & Video Production",
  description: "Explore transparent pricing for web application penetration testing (VAPT), Next.js full-stack development, and professional video production by AuditWave Security.",
  keywords: ["VAPT pricing", "Web development pricing", "Penetration testing cost", "Next.js development services", "Video production services"],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Web & Security Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "AuditWave Security",
    "url": "https://khalidsanawer.online"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AuditWave Security Services Catalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Basic Security Audit"
        },
        "price": "149",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full VAPT Pentest"
        },
        "price": "349",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Next.js Landing Page"
        },
        "price": "199",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full Website Development"
        },
        "price": "499",
        "priceCurrency": "USD"
      }
    ]
  }
};

export default function Services() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0E1A] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 py-16 text-center">
        <div className="absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7C3AED]/20 blur-[110px]" />
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">SERVICES</p>
          <h1 className="mb-6 text-3xl sm:text-4xl font-black md:text-6xl">What we do. What we charge.</h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">Transparent pricing. No hidden fees. Every engagement is scoped to your needs.</p>
        </div>
      </section>

      {/* Service 1 — Cybersecurity & VAPT */}
      <section id="vapt" className="px-4 sm:px-6 py-16 border-t border-white/5">
        <div className="mx-auto max-w-6xl grid gap-12 grid-cols-1 lg:grid-cols-[1fr_1.3fr] items-start">
          <div className="space-y-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C3AED]/15 text-[#C4B5FD]"><FaShieldAlt className="text-3xl" /></div>
            <h2 className="text-2xl sm:text-3xl font-bold md:text-4xl">Cybersecurity &amp; VAPT</h2>
            <p className="text-gray-400 leading-relaxed text-base">We conduct thorough vulnerability assessments and penetration tests on web applications, WordPress sites, and APIs. Every engagement ends with a detailed report and remediation guidance.</p>
            <div className="space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500">What&apos;s Included</h4>
              <ul className="grid gap-3 sm:grid-cols-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><FaCheck className="text-[#7C3AED] text-xs shrink-0" /> Web Application Pentesting</li>
                <li className="flex items-center gap-2"><FaCheck className="text-[#7C3AED] text-xs shrink-0" /> WordPress Security Audit</li>
                <li className="flex items-center gap-2"><FaCheck className="text-[#7C3AED] text-xs shrink-0" /> API Security Testing</li>
                <li className="flex items-center gap-2"><FaCheck className="text-[#7C3AED] text-xs shrink-0" /> Detailed PDF Report</li>
                <li className="flex items-center gap-2"><FaCheck className="text-[#7C3AED] text-xs shrink-0" /> Remediation Guidance</li>
                <li className="flex items-center gap-2"><FaCheck className="text-[#7C3AED] text-xs shrink-0" /> 1 Free Re-test after fixes</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {["OWASP Top 10", "Burp Suite", "Manual Testing"].map((tag) => (
                <span key={tag} className="rounded-md border border-white/10 bg-[#0D1120] px-3 py-1 text-xs text-gray-400">{tag}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <FadeUp delay={0}>
              <div className="relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[#7C3AED]/20 to-[#0D1120] backdrop-blur-sm overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-300 hover:border-white/20 h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#7C3AED]/40 rounded-full blur-2xl pointer-events-none" />
                <div className="p-6 flex flex-col h-full relative z-10">
                  <h3 className="text-xl font-bold text-white text-center">Basic Audit</h3>
                  <div className="mt-4 flex flex-col items-center"><span className="text-4xl font-black text-white">$149</span><span className="mt-1 text-xs text-gray-400">one-time</span></div>
                  <ul className="flex-grow space-y-3 mb-6 text-sm text-gray-300 border-t border-white/5 pt-4 mt-6">
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Up to 5 pages</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> WordPress focus</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Basic report</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> 3 day delivery</li>
                  </ul>
                  <div className="mt-auto">
                    <Link href="/contact?service=Cybersecurity/VAPT&budget=Under $500" className="block w-full text-center rounded-xl border border-white/10 py-3 text-sm font-semibold text-white transition hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/10">Get Started</Link>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="relative flex flex-col rounded-2xl border border-[#7C3AED]/50 bg-gradient-to-b from-[#7C3AED]/20 to-[#0D1120] backdrop-blur-sm overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.25)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(124,58,237,0.35)] h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#7C3AED]/60 rounded-full blur-2xl pointer-events-none" />
                <div className="p-6 flex flex-col h-full relative z-10 mt-1">
                  <div className="flex justify-center"><div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#7C3AED] text-white text-xs font-semibold mb-4">Most Popular</div></div>
                  <h3 className="text-xl font-bold text-white text-center">Full VAPT</h3>
                  <div className="mt-4 flex flex-col items-center"><span className="text-4xl font-black text-white">$349</span><span className="mt-1 text-xs text-gray-400">one-time</span></div>
                  <ul className="flex-grow space-y-3 mb-6 text-sm text-gray-300 border-t border-white/5 pt-4 mt-6">
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Up to 20 pages</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Web app + API</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Detailed report</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> PoC included</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> 7 day delivery</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> 1 re-test</li>
                  </ul>
                  <div className="mt-auto">
                    <Link href="/contact?service=Cybersecurity/VAPT&budget=Under $500" className="block w-full text-center rounded-xl bg-[#7C3AED] py-3 text-sm font-semibold text-white shadow-[0_0_15px_rgba(124,58,237,0.35)] transition hover:bg-[#6D28D9]">Get Started</Link>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[#7C3AED]/20 to-[#0D1120] backdrop-blur-sm overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-300 hover:border-white/20 h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#7C3AED]/40 rounded-full blur-2xl pointer-events-none" />
                <div className="p-6 flex flex-col h-full relative z-10">
                  <h3 className="text-xl font-bold text-white text-center">Enterprise</h3>
                  <div className="mt-4 flex flex-col items-center"><span className="text-4xl font-black text-white">Custom</span><span className="mt-1 text-xs text-gray-400">contact us</span></div>
                  <ul className="flex-grow space-y-3 mb-6 text-sm text-gray-300 border-t border-white/5 pt-4 mt-6">
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Unlimited scope</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Full pentest</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Executive report</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Priority support</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Ongoing retainer</li>
                  </ul>
                  <div className="mt-auto">
                    <Link href="/contact?service=Cybersecurity/VAPT&budget=$5000+" className="block w-full text-center rounded-xl border border-white/10 py-3 text-sm font-semibold text-white transition hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/10">Contact Us</Link>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Service 2 — Web Development */}
      <section id="webdev" className="px-4 sm:px-6 py-16 border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-6xl grid gap-12 grid-cols-1 lg:grid-cols-[1fr_1.3fr] items-start">
          <div className="space-y-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300"><FaCode className="text-3xl" /></div>
            <h2 className="text-2xl sm:text-3xl font-bold md:text-4xl">Web Development</h2>
            <p className="text-gray-400 leading-relaxed text-base">Full-stack web applications built with Next.js, React, and Node.js. From landing pages to complex platforms with admin panels, payment integration, and API backends.</p>
            <div className="space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500">What&apos;s Included</h4>
              <ul className="grid gap-3 sm:grid-cols-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><FaCheck className="text-blue-400 text-xs shrink-0" /> Next.js / React Frontend</li>
                <li className="flex items-center gap-2"><FaCheck className="text-blue-400 text-xs shrink-0" /> Node.js / REST API Backend</li>
                <li className="flex items-center gap-2"><FaCheck className="text-blue-400 text-xs shrink-0" /> Database Setup</li>
                <li className="flex items-center gap-2"><FaCheck className="text-blue-400 text-xs shrink-0" /> Admin Panel (if needed)</li>
                <li className="flex items-center gap-2"><FaCheck className="text-blue-400 text-xs shrink-0" /> Vercel Deployment</li>
                <li className="flex items-center gap-2"><FaCheck className="text-blue-400 text-xs shrink-0" /> 30 days post-launch support</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Next.js", "MERN Stack", "TypeScript", "Tailwind"].map((tag) => (
                <span key={tag} className="rounded-md border border-white/10 bg-[#0D1120] px-3 py-1 text-xs text-gray-400">{tag}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <FadeUp delay={0}>
              <div className="relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[#7C3AED]/20 to-[#0D1120] backdrop-blur-sm overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-300 hover:border-white/20 h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#7C3AED]/40 rounded-full blur-2xl pointer-events-none" />
                <div className="p-6 flex flex-col h-full relative z-10">
                  <h3 className="text-xl font-bold text-white text-center">Landing Page</h3>
                  <div className="mt-4 flex flex-col items-center"><span className="text-4xl font-black text-white">$199</span><span className="mt-1 text-xs text-gray-400">one-time</span></div>
                  <ul className="flex-grow space-y-3 mb-6 text-sm text-gray-300 border-t border-white/5 pt-4 mt-6">
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Single page</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Responsive design</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Contact form</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> SEO basics</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> 5 day delivery</li>
                  </ul>
                  <div className="mt-auto">
                    <Link href="/contact?service=Web Development&budget=Under $500" className="block w-full text-center rounded-xl border border-white/10 py-3 text-sm font-semibold text-white transition hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/10">Get Started</Link>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="relative flex flex-col rounded-2xl border border-[#7C3AED]/50 bg-gradient-to-b from-[#7C3AED]/20 to-[#0D1120] backdrop-blur-sm overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.25)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(124,58,237,0.35)] h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#7C3AED]/60 rounded-full blur-2xl pointer-events-none" />
                <div className="p-6 flex flex-col h-full relative z-10 mt-1">
                  <div className="flex justify-center"><div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#7C3AED] text-white text-xs font-semibold mb-4">Most Popular</div></div>
                  <h3 className="text-xl font-bold text-white text-center">Full Website</h3>
                  <div className="mt-4 flex flex-col items-center"><span className="text-4xl font-black text-white">$499</span><span className="mt-1 text-xs text-gray-400">one-time</span></div>
                  <ul className="flex-grow space-y-3 mb-6 text-sm text-gray-300 border-t border-white/5 pt-4 mt-6">
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Up to 5 pages</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> CMS integration</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Admin panel</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> API backend</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> 14 day delivery</li>
                  </ul>
                  <div className="mt-auto">
                    <Link href="/contact?service=Web Development&budget=Under $500" className="block w-full text-center rounded-xl bg-[#7C3AED] py-3 text-sm font-semibold text-white shadow-[0_0_15px_rgba(124,58,237,0.35)] transition hover:bg-[#6D28D9]">Get Started</Link>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[#7C3AED]/20 to-[#0D1120] backdrop-blur-sm overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-300 hover:border-white/20 h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#7C3AED]/40 rounded-full blur-2xl pointer-events-none" />
                <div className="p-6 flex flex-col h-full relative z-10">
                  <h3 className="text-xl font-bold text-white text-center">Custom Platform</h3>
                  <div className="mt-4 flex flex-col items-center"><span className="text-4xl font-black text-white">From $999</span><span className="mt-1 text-xs text-gray-400">starting price</span></div>
                  <ul className="flex-grow space-y-3 mb-6 text-sm text-gray-300 border-t border-white/5 pt-4 mt-6">
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Complex application</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Payment integration</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Custom features</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Priority support</li>
                  </ul>
                  <div className="mt-auto">
                    <Link href="/contact?service=Web Development&budget=$500-$1500" className="block w-full text-center rounded-xl border border-white/10 py-3 text-sm font-semibold text-white transition hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/10">Contact Us</Link>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Service 3 — Video Production */}
      <section id="video" className="px-4 sm:px-6 py-16 border-t border-white/5">
        <div className="mx-auto max-w-6xl grid gap-12 grid-cols-1 lg:grid-cols-[1fr_1.3fr] items-start">
          <div className="space-y-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/15 text-pink-300"><FaVideo className="text-3xl" /></div>
            <h2 className="text-2xl sm:text-3xl font-bold md:text-4xl">Video Production</h2>
            <p className="text-gray-400 leading-relaxed text-base">My team handles professional video editing and production using Premiere Pro, After Effects, and CapCut. From brand videos to AI-animated content for social media.</p>
            <div className="space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500">What&apos;s Included</h4>
              <ul className="grid gap-3 sm:grid-cols-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><FaCheck className="text-pink-400 text-xs shrink-0" /> Professional Video Editing</li>
                <li className="flex items-center gap-2"><FaCheck className="text-pink-400 text-xs shrink-0" /> Motion Graphics &amp; Transitions</li>
                <li className="flex items-center gap-2"><FaCheck className="text-pink-400 text-xs shrink-0" /> Color Grading</li>
                <li className="flex items-center gap-2"><FaCheck className="text-pink-400 text-xs shrink-0" /> AI Animated Content (CapCut)</li>
                <li className="flex items-center gap-2"><FaCheck className="text-pink-400 text-xs shrink-0" /> Social Media Formats</li>
                <li className="flex items-center gap-2"><FaCheck className="text-pink-400 text-xs shrink-0" /> 2 Revision rounds</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Premiere Pro", "After Effects", "CapCut", "4K"].map((tag) => (
                <span key={tag} className="rounded-md border border-white/10 bg-[#0D1120] px-3 py-1 text-xs text-gray-400">{tag}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <FadeUp delay={0}>
              <div className="relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[#7C3AED]/20 to-[#0D1120] backdrop-blur-sm overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-300 hover:border-white/20 h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#7C3AED]/40 rounded-full blur-2xl pointer-events-none" />
                <div className="p-6 flex flex-col h-full relative z-10">
                  <h3 className="text-xl font-bold text-white text-center">Short Form</h3>
                  <div className="mt-4 flex flex-col items-center"><span className="text-4xl font-black text-white">$79</span><span className="mt-1 text-xs text-gray-400">per video</span></div>
                  <ul className="flex-grow space-y-3 mb-6 text-sm text-gray-300 border-t border-white/5 pt-4 mt-6">
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Up to 3 min</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> CapCut editing</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Social media ready</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> 3 day delivery</li>
                  </ul>
                  <div className="mt-auto">
                    <Link href="/contact?service=Video Production&budget=Under $500" className="block w-full text-center rounded-xl border border-white/10 py-3 text-sm font-semibold text-white transition hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/10">Get Started</Link>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="relative flex flex-col rounded-2xl border border-[#7C3AED]/50 bg-gradient-to-b from-[#7C3AED]/20 to-[#0D1120] backdrop-blur-sm overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.25)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(124,58,237,0.35)] h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#7C3AED]/60 rounded-full blur-2xl pointer-events-none" />
                <div className="p-6 flex flex-col h-full relative z-10 mt-1">
                  <div className="flex justify-center"><div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#7C3AED] text-white text-xs font-semibold mb-4">Most Popular</div></div>
                  <h3 className="text-xl font-bold text-white text-center">Brand Video</h3>
                  <div className="mt-4 flex flex-col items-center"><span className="text-4xl font-black text-white">$199</span><span className="mt-1 text-xs text-gray-400">per video</span></div>
                  <ul className="flex-grow space-y-3 mb-6 text-sm text-gray-300 border-t border-white/5 pt-4 mt-6">
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Up to 10 min</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Premiere Pro</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Motion graphics</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Color grade</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> 7 day delivery</li>
                  </ul>
                  <div className="mt-auto">
                    <Link href="/contact?service=Video Production&budget=Under $500" className="block w-full text-center rounded-xl bg-[#7C3AED] py-3 text-sm font-semibold text-white shadow-[0_0_15px_rgba(124,58,237,0.35)] transition hover:bg-[#6D28D9]">Get Started</Link>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[#7C3AED]/20 to-[#0D1120] backdrop-blur-sm overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-300 hover:border-white/20 h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#7C3AED]/40 rounded-full blur-2xl pointer-events-none" />
                <div className="p-6 flex flex-col h-full relative z-10">
                  <h3 className="text-xl font-bold text-white text-center">Full Campaign</h3>
                  <div className="mt-4 flex flex-col items-center"><span className="text-4xl font-black text-white">From $499</span><span className="mt-1 text-xs text-gray-400">project-based</span></div>
                  <ul className="flex-grow space-y-3 mb-6 text-sm text-gray-300 border-t border-white/5 pt-4 mt-6">
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Multiple videos</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> After Effects</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> AI animation</li>
                    <li className="flex items-center gap-2"><span className="text-[#7C3AED] font-bold">✓</span> Priority delivery</li>
                  </ul>
                  <div className="mt-auto">
                    <Link href="/contact?service=Video Production&budget=Under $500" className="block w-full text-center rounded-xl border border-white/10 py-3 text-sm font-semibold text-white transition hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/10">Contact Us</Link>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(124,58,237,0.12),transparent_55%)]" />
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl font-black md:text-5xl">Not sure which plan is right for you?</h2>
          <p className="text-base text-gray-400 max-w-lg mx-auto">Let&apos;s talk. I&apos;ll recommend the best option for your budget and goals.</p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a href="mailto:security@khalidsanawer.online?subject=Booking%20a%20Call" className="rounded-xl bg-[#7C3AED] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-[#6D28D9]">Book a Free Call</a>
            <Link href="/contact" className="rounded-xl border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-[#7C3AED]/60 hover:bg-white/5">Send a Message</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
