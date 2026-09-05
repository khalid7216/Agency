import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/mdx";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post Not Found — AuditWave Security",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} — AuditWave Security Blog`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://khalidsanawer.online/blog/${post.slug}`,
    },
  };
}

export default function BlogPost({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
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
      "@id": `https://khalidsanawer.online/blog/${post.slug}`
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0E1A] text-white py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
      </div>

      {/* Back Button */}
      <section className="px-4 sm:px-6 pt-6">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition">
            ← Back to Blog
          </Link>
        </div>
      </section>

      {/* Post Header */}
      <section className="px-4 sm:px-6 pt-8 pb-10">
        <div className="mx-auto max-w-3xl">
          {/* Category, date, read time */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${post.category === "Security" ? "bg-[#7C3AED]" : "bg-blue-500"}`}>
              {post.category}
            </span>
            <span className="text-xs text-gray-500">{post.date}</span>
            {post.readTime && (
              <>
                <span className="text-xs text-gray-500">·</span>
                <span className="text-xs text-gray-500">{post.readTime}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="border-t border-white/5" />
        </div>
      </section>

      {/* Article Content */}
      <article className="px-4 sm:px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed prose-code:before:content-none prose-code:after:content-none">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-16 border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Need a security audit for your site?</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Let me help you identify vulnerabilities before attackers do.
          </p>
          <a href="/contact" className="inline-block rounded-xl bg-[#7C3AED] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-[#6D28D9]">
            Get a Free Quote
          </a>
        </div>
      </section>
    </main>
  );
}

