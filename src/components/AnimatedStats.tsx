"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

interface AnimatedStatsProps {
  projectsCount: number;
}

function Counter({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(easeProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

const companies = ["Airbnb", "Dyson", "Freshworks", "Arkose Labs", "Inditex"];

export default function AnimatedStats({ projectsCount }: AnimatedStatsProps) {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: "easeOut",
      },
    },
  };

  const badgeContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const badgeItemVariants: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.9, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="track-record" className="border-t border-white/5 bg-[#080D1A] px-4 sm:px-6 py-20 relative">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl text-left"
        >
          <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">Track Record</p>
          <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">Verified metrics &amp; security research.</h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Stat 1: 1,200+ Sites Tested */}
          <motion.div
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -4, borderColor: "rgba(124, 58, 237, 0.4)" }}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.035] p-6 h-full transition-colors hover:bg-white/[0.055]"
          >
            <div className="text-3xl sm:text-4xl font-black text-[#7C3AED] mb-2">
              <Counter value={1200} suffix="+" />
            </div>
            <div className="text-sm font-medium text-gray-300">Sites Tested</div>
          </motion.div>

          {/* Stat 2: 3+ Years Experience */}
          <motion.div
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -4, borderColor: "rgba(124, 58, 237, 0.4)" }}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.035] p-6 h-full transition-colors hover:bg-white/[0.055]"
          >
            <div className="text-3xl sm:text-4xl font-black text-[#7C3AED] mb-2">
              <Counter value={3} suffix="+" />
            </div>
            <div className="text-sm font-medium text-gray-300">Years of Security Testing Experience</div>
          </motion.div>

          {/* Stat 3: {projectsCount} Live Projects */}
          <motion.div
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -4, borderColor: "rgba(124, 58, 237, 0.4)" }}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.035] p-6 h-full transition-colors hover:bg-white/[0.055]"
          >
            <div className="text-3xl sm:text-4xl font-black text-[#7C3AED] mb-2">
              <Counter value={projectsCount} />
            </div>
            <div className="text-sm font-medium text-gray-300">Live Projects Delivered</div>
          </motion.div>

          {/* Stat 4: EC-Council Certified */}
          <motion.div
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -4, borderColor: "rgba(124, 58, 237, 0.4)" }}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.035] p-6 h-full transition-colors hover:bg-white/[0.055]"
          >
            <div className="text-2xl sm:text-3xl font-black text-[#7C3AED] mb-2">EC-Council</div>
            <div className="text-sm font-medium text-gray-300">Certified Bug Bounty Practitioner</div>
          </motion.div>
        </motion.div>

        {/* Part B: Vulnerability findings strip */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center backdrop-blur-sm"
        >
          <h3 className="text-lg sm:text-xl font-bold text-white mb-6 tracking-wide">
            Vulnerabilities Identified In
          </h3>

          <motion.div
            variants={badgeContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6"
          >
            {companies.map((company) => (
              <motion.span
                key={company}
                variants={badgeItemVariants}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                className="rounded-xl border border-white/10 bg-[#0A0E1A] px-5 py-2.5 text-sm sm:text-base font-semibold text-gray-300 transition-colors hover:border-[#7C3AED]/50 hover:text-white shadow-sm"
              >
                {company}
              </motion.span>
            ))}
          </motion.div>

          <p className="text-xs sm:text-sm text-gray-500">
            Findings identified through responsible disclosure on HackerOne
          </p>
        </motion.div>
      </div>
    </section>
  );
}
