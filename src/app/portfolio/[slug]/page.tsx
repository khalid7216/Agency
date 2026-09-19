import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPortfolioCaseStudyBySlug, getPortfolioCaseStudies } from "@/lib/mdx";
import { getProjects, getProjectById } from "@/lib/projects";
import ProjectDetailGallery from "@/components/ProjectDetailGallery";
import { FaCheck, FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const caseStudies = getPortfolioCaseStudies();
  const projects = await getProjects();
  
  const slugs = new Set<string>();
  caseStudies.forEach((cs) => slugs.add(cs.slug));
  projects.forEach((p) => slugs.add(p.id));
  
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getPortfolioCaseStudyBySlug(slug);
  const project = await getProjectById(slug);

  if (!caseStudy && !project) {
    return {
      title: "Project Not Found — AuditWave Security",
    };
  }

  const title = project?.title || caseStudy?.title || "Portfolio Project";
  const description = caseStudy?.excerpt || project?.description || "Project details & screenshots";
  const tags = caseStudy?.tags || project?.tags || [];

  const imageUrl = project?.imageUrl || "/khalid.jpg";

  return {
    title: `${title} — Portfolio Case Study`,
    description,
    keywords: tags,
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
    openGraph: {
      title: `${title} — Portfolio Case Study`,
      description,
      url: `https://khalidsanawer.online/portfolio/${slug}`,
      siteName: "Khalid Sanawer",
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Portfolio Case Study`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getPortfolioCaseStudyBySlug(slug);
  const project = await getProjectById(slug);

  if (!caseStudy && !project) {
    notFound();
  }

  const title = project?.title || caseStudy?.title || "Project Detail";
  const category = project?.category || caseStudy?.category || "web-dev";
  const description = project?.description || caseStudy?.excerpt || "";
  const tags = project?.tags || caseStudy?.tags || [];

  const rawScreenshots =
    project?.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : project?.imageUrl
      ? [project.imageUrl]
      : [];

  const screenshots: string[] = rawScreenshots
    .map((item: unknown) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const obj = item as Record<string, unknown>;
        const urlStr = obj.url || obj.src || obj.secure_url;
        return typeof urlStr === "string" ? urlStr : "";
      }
      return "";
    })
    .filter((url: string) => Boolean(url && url.trim() !== ""));

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "@id": "https://khalidsanawer.online/#person",
      "name": "Khalid Sanawer",
      "url": "https://khalidsanawer.online"
    },
    "publisher": {
      "@type": "LocalBusiness",
      "@id": "https://khalidsanawer.online/#organization",
      "name": "AuditWave Security",
      "url": "https://khalidsanawer.online"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://khalidsanawer.online/portfolio/${slug}`
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0E1A] text-white py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />

      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
      </div>

      <section className="px-4 sm:px-6 pt-6">
        <div className="mx-auto max-w-4xl">
          <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition">
            ← Back to Portfolio
          </Link>
        </div>
      </section>

      {/* Project Header & Full Description */}
      <section className="px-4 sm:px-6 pt-8 pb-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#7C3AED] uppercase">
              {category}
            </span>
            {caseStudy?.client && (
              <span className="text-xs text-gray-400">Client: {caseStudy.client}</span>
            )}
            {caseStudy?.date && (
              <>
                <span className="text-xs text-gray-500">·</span>
                <span className="text-xs text-gray-500">{caseStudy.date}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            {title}
          </h1>

          <div className="bg-[#0D1120] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-lg mb-8">
            <h2 className="text-xs uppercase font-mono tracking-widest text-[#C4B5FD] mb-3">
              Full Project Overview
            </h2>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <span key={tag} className="rounded-md border border-white/10 bg-[#0D1120] px-3 py-1.5 text-xs font-medium text-[#C4B5FD]">
                #{tag}
              </span>
            ))}
          </div>

          <div className="border-t border-white/5" />
        </div>
      </section>

      {/* Screenshot Gallery (if available) */}
      {screenshots.length > 0 && (
        <section className="px-4 sm:px-6 pb-12">
          <div className="mx-auto max-w-4xl">
            <ProjectDetailGallery screenshots={screenshots} title={title} />
          </div>
        </section>
      )}

      {/* Structured Sections Overview (if case study exists) */}
      {caseStudy && (
        <section className="px-4 sm:px-6 pb-12">
          <div className="mx-auto max-w-4xl grid gap-6 grid-cols-1 md:grid-cols-2">
            {caseStudy.context && (
              <div className="bg-[#0D1120] p-6 rounded-2xl border border-white/5">
                <h3 className="font-bold text-base text-[#C4B5FD] mb-2 flex items-center gap-2">
                  <FaShieldAlt className="text-sm" /> Context & Objectives
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">{caseStudy.context}</p>
              </div>
            )}

            {caseStudy.methodology && (
              <div className="bg-[#0D1120] p-6 rounded-2xl border border-white/5">
                <h3 className="font-bold text-base text-blue-400 mb-2 flex items-center gap-2">
                  <FaCheck className="text-sm" /> Methodology
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">{caseStudy.methodology}</p>
              </div>
            )}

            {caseStudy.vulnerabilities && (
              <div className="bg-[#0D1120] p-6 rounded-2xl border border-white/5">
                <h3 className="font-bold text-base text-red-400 mb-2 flex items-center gap-2">
                  <FaExclamationTriangle className="text-sm" /> Vulnerabilities / Scope
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">{caseStudy.vulnerabilities}</p>
              </div>
            )}

            {caseStudy.businessResult && (
              <div className="bg-[#0D1120] p-6 rounded-2xl border border-white/5">
                <h3 className="font-bold text-base text-emerald-400 mb-2 flex items-center gap-2">
                  <FaCheck className="text-sm" /> Business Result
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">{caseStudy.businessResult}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Main MDX Content (if case study content exists) */}
      {caseStudy?.content && (
        <article className="px-4 sm:px-6 pb-16">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed prose-code:before:content-none prose-code:after:content-none">
              <MDXRemote source={caseStudy.content} />
            </div>
          </div>
        </article>
      )}

      {/* CTA */}
      <section className="px-4 sm:px-6 py-16 border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Want similar results for your platform?</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Get in touch to scope a custom security audit or web development project.
          </p>
          <Link href="/contact" className="inline-block rounded-xl bg-[#7C3AED] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-[#6D28D9]">
            Book a Free Scope Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
