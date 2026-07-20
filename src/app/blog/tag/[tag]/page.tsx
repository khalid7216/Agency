import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostsByTag, getAllBlogTags } from "@/lib/mdx";
import FadeUp from "@/components/FadeUp";

interface Props {
  params: { tag: string };
}

export function generateStaticParams() {
  const tags = getAllBlogTags();
  return tags.map((tag) => ({ tag }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tagDecoded = decodeURIComponent(params.tag);
  return {
    title: `Posts Tagged "${tagDecoded}" — AuditWave Security Blog`,
    description: `Browse all security research articles, guides, and developer notes tagged with ${tagDecoded}.`,
  };
}

export default function BlogTagPage({ params }: Props) {
  const tagDecoded = decodeURIComponent(params.tag);
  const posts = getBlogPostsByTag(tagDecoded);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0E1A] text-white py-16">
      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
      </div>

      <section className="px-4 sm:px-6 mb-12">
        <div className="mx-auto max-w-6xl">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition mb-6">
            ← Back to Blog
          </Link>

          <p className="text-xs uppercase font-semibold text-[#7C3AED] tracking-wider mb-2">TAG FILTER</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">
            Posts tagged &ldquo;{tagDecoded}&rdquo;
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Found {posts.length} article{posts.length > 1 ? "s" : ""}.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-24">
        <div className="mx-auto max-w-6xl grid gap-8 grid-cols-1 md:grid-cols-3">
          {posts.map((post, index) => (
            <FadeUp key={post.slug} delay={index * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-[#0D1120] rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/10 h-full p-6"
              >
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#7C3AED]">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-[#C4B5FD] transition-colors mb-2">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className={`rounded-md border px-2.5 py-1 text-xs ${
                        t.toLowerCase() === tagDecoded.toLowerCase()
                          ? "border-[#7C3AED] bg-[#7C3AED]/20 text-white"
                          : "border-white/10 bg-[#0A0E1A] text-gray-300"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

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
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>
    </main>
  );
}
