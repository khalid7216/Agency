"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { FaSearch, FaCodeBranch, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    step: "01",
    title: "Discovery & Scoping",
    subtitle: "Alignment & Security Boundaries",
    icon: FaSearch,
    description:
      "We begin by understanding your architecture, defining clear scope boundaries, and establishing technical objectives. Legal NDA and authorization agreements are finalized before any work begins.",
    tags: ["Scope Definition", "Architecture Review", "NDA Protected"],
  },
  {
    step: "02",
    title: "Testing & Build",
    subtitle: "Rigorous Execution & Development",
    icon: FaCodeBranch,
    description:
      "Deep manual penetration testing and full-stack development take place in parallel workflows. Every vulnerability finding is validated with proof-of-concept steps, and applications are built with security-first engineering.",
    tags: ["Manual Audit", "OWASP Verification", "Production Code"],
  },
  {
    step: "03",
    title: "Delivery & Support",
    subtitle: "Actionable Handoff & Verification",
    icon: FaCheckCircle,
    description:
      "You receive an executive-ready PDF report with remediation guidance or production-deployed code. Includes walkthrough assistance and complimentary re-testing to verify your applied fixes.",
    tags: ["Executive Report", "Free Retest", "Post-Launch Support"],
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 70%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="px-4 sm:px-6 py-28 border-y border-white/5 bg-white/[0.015] relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7C3AED]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center max-w-2xl mx-auto"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">
            How We Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">
            A structured, transparent workflow.
          </h2>
          <p className="mt-4 text-base text-gray-400">
            From initial scoping to final delivery, every phase is built for clarity and impact.
          </p>
        </motion.div>

        <div className="relative">
          {/* Static Background Track */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-8 w-1 -translate-x-1/2 bg-white/10 rounded-full" />

          {/* Animated Scroll-Driven Fill Line */}
          <motion.div
            style={{
              scaleY: shouldReduceMotion ? 1 : scaleY,
              originY: 0,
            }}
            className="absolute left-6 md:left-1/2 top-4 bottom-8 w-1 -translate-x-1/2 bg-gradient-to-b from-[#7C3AED] via-[#A78BFA] to-[#C4B5FD] rounded-full shadow-[0_0_15px_rgba(124,58,237,0.6)]"
          />

          <div className="space-y-14 sm:space-y-20">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={item.step}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  } gap-8 md:gap-14 pl-14 md:pl-0`}
                >
                  {/* Center Timeline Node */}
                  <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#7C3AED] bg-[#0A0E1A] text-[#C4B5FD] shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                    >
                      <Icon className="text-base" />
                    </motion.div>
                  </div>

                  {/* Content Card (Alternates sides on desktop) */}
                  <div className="w-full md:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={shouldReduceMotion ? {} : { y: -4 }}
                      className={`rounded-2xl border border-white/10 bg-white/[0.035] p-7 sm:p-8 backdrop-blur-sm transition-colors hover:border-[#7C3AED]/40 hover:bg-white/[0.055] ${
                        isEven ? "md:text-left" : "md:text-left"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-black text-[#7C3AED] bg-[#7C3AED]/15 border border-[#7C3AED]/30 px-2.5 py-1 rounded-full font-mono">
                          {item.step}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          {item.subtitle}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-300 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
