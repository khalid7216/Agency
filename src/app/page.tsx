import type { Metadata } from "next";
import Link from "next/link";
import { FaCode, FaShieldAlt, FaVideo } from "react-icons/fa";
import FadeUp from "@/components/FadeUp";
import AnimatedHeroText from "@/components/AnimatedHeroText";
import AnimatedStats from "@/components/AnimatedStats";
import PortfolioGrid from "@/components/PortfolioGrid";
import AnimatedServices from "@/components/AnimatedServices";
import ProcessTimeline from "@/components/ProcessTimeline";
import BlogPreview from "@/components/BlogPreview";
import FaqAccordion from "@/components/FaqAccordion";
import AnimatedCTA from "@/components/AnimatedCTA";
import { getProjects } from "@/lib/projects";
import { getBlogPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "AuditWave Security & Full-Stack Web Development — Khalid Sanawer",
  description: "VAPT penetration testing, full-stack Next.js web development, and 4K video production by EC-Council certified security researcher Khalid Sanawer in Pakistan.",
  keywords: ["Security Researcher", "Penetration Testing", "VAPT", "Next.js Developer", "MERN Stack", "AuditWave Security", "Khalid Sanawer"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "AuditWave Security & Full-Stack Web Development — Khalid Sanawer",
    description: "VAPT penetration testing, full-stack Next.js web development, and 4K video production by EC-Council certified security researcher Khalid Sanawer in Pakistan.",
    url: "https://khalidsanawer.online",
    siteName: "Khalid Sanawer",
    images: [{ url: "/khalid.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuditWave Security & Full-Stack Web Development — Khalid Sanawer",
    description: "VAPT penetration testing, full-stack Next.js web development, and 4K video production by EC-Council certified security researcher Khalid Sanawer in Pakistan.",
    images: ["/khalid.jpg"],
  },
};

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

// TODO: confirm FAQ copy before deploy
const homepageFaqs = [
  // TODO: confirm FAQ copy before deploy
  {
    question: "What makes Khalid Sanawer's services unique?",
    answer: "A rare trifecta of verified cybersecurity credentials (EC-Council Certified, 1,200+ sites tested, HackerOne researcher) alongside senior Next.js full-stack development and 4K video editing capabilities.",
  },
  // TODO: confirm FAQ copy before deploy
  {
    question: "Do you handle both security testing and development for the same product?",
    answer: "Yes. Clients frequently engage us to develop secure, high-performance web applications from scratch, or to conduct penetration tests on existing platforms to pinpoint and eliminate vulnerabilities.",
  },
  // TODO: confirm FAQ copy before deploy
  {
    question: "How do you protect client confidentiality during security audits?",
    answer: "All engagements are bound by strict legal Non-Disclosure Agreements (NDAs). Findings, architectural data, and vulnerability reports are 100% confidential and never disclosed to third parties.",
  },
  // TODO: confirm FAQ copy before deploy
  {
    question: "What is your typical project delivery workflow?",
    answer: "We follow a 3-step structured process: Discovery & Scoping → Testing & Build → Delivery & Support, complete with actionable reports, code reviews, and complimentary re-testing.",
  },
];

const homeWebsiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://khalidsanawer.online/#website",
  "url": "https://khalidsanawer.online",
  "name": "Khalid Sanawer — Security Researcher & Full-Stack Developer",
  "description": "Expert VAPT penetration testing, full-stack Next.js web application development, and 4K video production.",
  "publisher": {
    "@id": "https://khalidsanawer.online/#organization"
  },
  "inLanguage": "en-US"
};

export default async function Home() {
  const projects = await getProjects();
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0E1A] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebsiteSchema) }}
      />

      {/* Ambient Background Glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
      </div>

      {/* SECTION 1: Hero */}
      <AnimatedHeroText />

      {/* SECTION 2: Animated Stats Row (Track Record) directly below hero */}
      <AnimatedStats projectsCount={projects.length} />

      {/* SECTION 3: Featured Work Showcase */}
      <section id="portfolio" className="px-4 sm:px-6 py-28 relative">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">Portfolio</p>
            <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">
              Selected work with real delivery behind it.
            </h2>
          </div>

          <PortfolioGrid initialProjects={projects} limit={3} />

          <div className="mt-14 flex justify-center">
            <Link
              href="/portfolio"
              className="rounded-xl border border-[#7C3AED] px-8 py-3.5 font-semibold text-[#DDD6FE] transition hover:bg-[#7C3AED]/10 hover:text-white shadow-[0_0_20px_rgba(124,58,237,0.15)] flex items-center gap-2"
            >
              <span>View All Projects</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: Skills / Services Grid */}
      <AnimatedServices />

      {/* SECTION 5: Process / Timeline Section ("How We Work") */}
      <ProcessTimeline />

      {/* SECTION 5b: About Section & Core Skills */}
      <section id="about" className="border-t border-white/5 bg-[#080D1A]/60 px-4 sm:px-6 py-28">
        <FadeUp delay={0}>
          <div className="mx-auto grid max-w-7xl gap-12 grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">About</p>
              <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">
                Security Researcher. Developer. Creator.
              </h2>
              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-300">
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
                  <div
                    key={skill.label}
                    className="rounded-2xl border border-white/10 bg-[#0A0E1A] p-6 transition-colors hover:border-[#7C3AED]/40"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#C4B5FD]">
                        <Icon className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-white">{skill.label}</h3>
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

      {/* SECTION 6: Blog / Journal Preview Grid */}
      <BlogPreview posts={posts} />

      {/* SECTION 7: FAQ Accordion */}
      <FaqAccordion
        items={homepageFaqs}
        title="Frequently Asked Questions"
        subtitle="Common questions about our agency capabilities, security credentials, and engagements."
        tag="FAQ"
      />

      {/* SECTION 8: Final CTA */}
      <AnimatedCTA />
    </main>
  );
}
