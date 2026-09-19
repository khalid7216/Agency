import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies — Security Audits, Web Apps & Media",
  description: "Browse our real-world security penetration testing case studies, Next.js web application projects, and media productions by Khalid Sanawer.",
  keywords: ["VAPT case studies", "Web development portfolio", "Next.js projects", "Security audit report", "Khalid Sanawer portfolio"],
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: "Portfolio & Case Studies — Security Audits, Web Apps & Media",
    description: "Browse our real-world security penetration testing case studies, Next.js web application projects, and media productions by Khalid Sanawer.",
    url: "https://khalidsanawer.online/portfolio",
    siteName: "Khalid Sanawer",
    images: [{ url: "/khalid.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Case Studies — Security Audits, Web Apps & Media",
    description: "Browse our real-world security penetration testing case studies, Next.js web application projects, and media productions by Khalid Sanawer.",
    images: ["/khalid.jpg"],
  },
};

const portfolioCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://khalidsanawer.online/portfolio/#collection",
  "url": "https://khalidsanawer.online/portfolio",
  "name": "Portfolio & Case Studies — Khalid Sanawer",
  "description": "Real-world security penetration testing case studies, Next.js web application projects, and media productions.",
  "isPartOf": {
    "@id": "https://khalidsanawer.online/#website"
  }
};

export default async function Portfolio() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0E1A] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioCollectionSchema) }}
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
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">PORTFOLIO</p>
          <h1 className="mb-6 text-3xl sm:text-4xl font-black md:text-6xl">Portfolio</h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Practical delivery behind every project. Code, security research, and dynamic video edits that drive results.
          </p>
        </div>
      </section>

      {/* Transition Banner Section */}
      <section className="border-y border-white/5 bg-[#080D1A] px-4 sm:px-6 py-12 text-center">
        <FadeUp delay={0}>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold md:text-4xl text-white mb-3">
              The Work Speaks for Itself
            </h2>
            <p className="text-base text-gray-400">
              Explore our full collection of verified security audits, full-stack web applications, and video productions in the project grid below.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* Projects Grid Section */}
      <section className="px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <PortfolioGrid initialProjects={projects} />
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
