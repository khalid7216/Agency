import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import FadeUp from "@/components/FadeUp";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies — Security Audits, Web Apps & Media",
  description: "Browse our real-world security penetration testing case studies, Next.js web application projects, and media productions by Khalid Sanawer.",
  keywords: ["VAPT case studies", "Web development portfolio", "Next.js projects", "Security audit report", "Khalid Sanawer portfolio"],
};

const testimonials = [
  {
    stars: 5,
    review: "The penetration test report was incredibly detailed. Found issues we'd been missing for months. Worth every penny.",
    name: "Michael K.",
    role: "CTO, SaaS Startup",
    tag: "VAPT",
    tagStyle: "bg-[#7C3AED]/10 border border-[#7C3AED]/25 text-[#C4B5FD]",
    avatarSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
  },
  {
    stars: 5,
    review: "Delivered the Next.js project ahead of schedule. Code quality was clean and the UI looked better than our mockups.",
    name: "Lisa T.",
    role: "Founder, E-commerce Brand",
    tag: "Web Dev",
    tagStyle: "bg-blue-500/10 border border-blue-500/25 text-blue-300",
    avatarSrc: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
  },
  {
    stars: 5,
    review: "The video editing team turned our raw footage into something we're genuinely proud to show clients. Fast and professional.",
    name: "Raza H.",
    role: "Marketing Lead, Dubai Agency",
    tag: "Video",
    tagStyle: "bg-pink-500/10 border border-pink-500/25 text-pink-300",
    avatarSrc: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face",
  },
];

export default function Portfolio() {
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
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">PORTFOLIO</p>
          <h1 className="mb-6 text-3xl sm:text-4xl font-black md:text-6xl">Portfolio</h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Practical delivery behind every project. Code, security research, and dynamic video edits that drive results.
          </p>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <PortfolioGrid />
        </div>
      </section>

      {/* Testimonials / Kind Words Section */}
      <section className="border-t border-white/5 bg-[#080D1A] px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl text-left">
            <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">KIND WORDS</p>
            <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">What people say about the work.</h2>
          </div>

          <div className="items-start grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {testimonials.map((testimonial, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <article
                  className={`flex flex-col bg-[#0D1120] rounded-2xl p-6 border border-white/5 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] transition duration-300 ${
                    i === 0 ? "md:mt-8 mt-0" : i === 1 ? "md:mt-0 mt-0" : "md:mt-8 mt-0"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Image src={testimonial.avatarSrc} alt={testimonial.name} width={40} height={40} className="rounded-full object-cover shrink-0" />
                    <div className="text-left">
                      <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
                      <p className="text-gray-500 text-xs">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="text-left flex-grow">
                    <span className="text-[#7C3AED] text-4xl font-black leading-none block mb-2">&ldquo;</span>
                    <p className="text-gray-300 text-sm leading-relaxed italic">
                      {testimonial.review}
                    </p>
                  </div>

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

      {/* CTA Section */}
      <section id="contact" className="relative px-4 sm:px-6 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(124,58,237,0.16),transparent_55%)]" />
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-black md:text-6xl">Ready to start a project?</h2>
          <p className="mt-4 text-base text-gray-400 max-w-md mx-auto">
            Get in touch to secure your platform, build your application, or elevate your content.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-[#7C3AED] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-[#6D28D9]"
            >
              Get in Touch →
            </Link>
            <a
              href="mailto:security@khalidsanawer.online?subject=Booking%20a%20Call"
              className="rounded-xl border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-[#7C3AED]/60 hover:bg-white/5"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
