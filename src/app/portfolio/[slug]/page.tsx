import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPortfolioCaseStudyBySlug, getPortfolioCaseStudies } from "@/lib/mdx";
import { FaCheck, FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  const caseStudies = getPortfolioCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cs = getPortfolioCaseStudyBySlug(params.slug);
  if (!cs) {
    return {
      title: "Case Study Not Found — AuditWave Security",
    };
  }

  return {
    title: `${cs.title} — Portfolio Case Study`,
    description: cs.excerpt,
    keywords: cs.tags,
    openGraph: {
      title: cs.title,
      description: cs.excerpt,
      type: "article",
    },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const caseStudy = getPortfolioCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0E1A] text-white py-12">
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

      {/* Case Study Header */}
      <section className="px-4 sm:px-6 pt-8 pb-10">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#7C3AED]">
              {caseStudy.category.toUpperCase()}
            </span>
            {caseStudy.client && (
              <span className="text-xs text-gray-400">Client: {caseStudy.client}</span>
            )}
            {caseStudy.date && (
              <>
                <span className="text-xs text-gray-500">·</span>
                <span className="text-xs text-gray-500">{caseStudy.date}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            {caseStudy.title}
          </h1>

          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {caseStudy.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {caseStudy.tags.map((tag) => (
              <span key={tag} className="rounded-md border border-white/10 bg-[#0D1120] px-3 py-1 text-xs text-gray-300">
                #{tag}
              </span>
            ))}
          </div>

          <div className="border-t border-white/5" />
        </div>
      </section>

      {/* Structured Sections Overview */}
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

      {/* Main MDX Content */}
      <article className="px-4 sm:px-6 pb-16">
        <div className="mx-auto max-w-4xl prose prose-invert max-w-none text-gray-300 leading-relaxed">
          <MDXRemote source={caseStudy.content} />
        </div>
      </article>

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
