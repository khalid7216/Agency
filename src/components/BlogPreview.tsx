"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { BlogPostMeta } from "@/lib/mdx";

const categoryColors: Record<string, string> = {
  Security: "bg-[#7C3AED]",
  Development: "bg-blue-500",
};

export default function BlogPreview({ posts }: { posts: BlogPostMeta[] }) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="blog" className="px-4 sm:px-6 py-24 relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-left"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">Journal</p>
            <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">
              Insights &amp; Security Research.
            </h2>
            <p className="mt-4 text-base text-gray-400">
              Deep dives into modern web engineering, offensive security research, and infrastructure hardening.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#7C3AED]/60 hover:bg-white/5"
            >
              <span>View All Articles</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 grid-cols-1 md:grid-cols-3 items-stretch"
        >
          {posts.slice(0, 3).map((post) => (
            <motion.div
              key={post.slug}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              className="h-full"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] rounded-2xl"
              >
                <article className="rounded-2xl border border-white/10 bg-white/[0.035] overflow-hidden h-full flex flex-col justify-between transition-colors duration-300 group-hover:bg-white/[0.06] group-hover:border-white/20">
                  {post.image && (
                    <div className="h-48 relative overflow-hidden bg-[#0D1120] border-b border-white/5">
                      <motion.div
                        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full relative"
                      >
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </motion.div>
                    </div>
                  )}

                  <div className="p-7 sm:p-8 flex flex-col flex-grow">
                    <div className="mb-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                          categoryColors[post.category] || "bg-[#7C3AED]"
                        }`}
                      >
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#C4B5FD] transition-colors mb-3 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto text-xs text-gray-400">
                      <span>{post.date}</span>
                      <span className="text-[#C4B5FD] group-hover:text-white font-semibold transition-colors flex items-center gap-1">
                        <span>Read Post</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
