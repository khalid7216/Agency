import type { Metadata } from "next";
import { FaBug, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Hire — Book Security Audit or Web Project",
  description: "Get in touch with Khalid Sanawer and AuditWave Security for VAPT security testing, Next.js application development, or video production projects.",
  keywords: ["Hire security researcher", "Contact Khalid Sanawer", "Book VAPT audit", "Next.js developer for hire"],
};

export default function Contact() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0E1A] text-white">
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
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">CONTACT</p>
          <h1 className="mb-6 text-3xl sm:text-4xl font-black md:text-6xl">
            Let&apos;s work together.
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Have a project in mind? Send a message and I&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Main Section */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="mx-auto max-w-5xl grid gap-12 grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Get in touch</h2>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
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

            <div className="rounded-xl border border-white/5 bg-[#0D1120]/50 p-4 text-center">
              <p className="text-sm text-gray-400">
                🕐 Usually responds within 24 hours
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#0D1120] p-6 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Services Offered</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Web Application VAPT</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Full-Stack Web Development</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Video Production (via team)</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> WordPress Security Audit</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
