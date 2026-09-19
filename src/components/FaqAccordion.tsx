"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
  tag?: string;
  includeSchema?: boolean;
}

export default function FaqAccordion({
  items,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our services, process, and deliverables.",
  tag = "FAQ",
  includeSchema = false,
}: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);
  const shouldReduceMotion = useReducedMotion();

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section className="px-4 sm:px-6 py-24 relative">
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center max-w-2xl mx-auto"
        >
          {tag && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">
              {tag}
            </p>
          )}
          <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">{title}</h2>
          {subtitle && <p className="mt-4 text-base text-gray-400">{subtitle}</p>}
        </motion.div>

        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndices.includes(idx);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-6 sm:p-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
                >
                  <span className="text-base sm:text-lg font-bold text-white pr-4">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#C4B5FD]"
                  >
                    <FaChevronDown className="text-xs" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        transition: shouldReduceMotion
                          ? { duration: 0 }
                          : {
                              height: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] },
                              opacity: { duration: 0.25, delay: 0.05 },
                            },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: shouldReduceMotion
                          ? { duration: 0 }
                          : {
                              height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                              opacity: { duration: 0.2 },
                            },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
