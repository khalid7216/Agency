"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface AnimatedHeroHeadingProps {
  badge?: string;
  words: { text: string; highlight?: boolean }[];
  subtitle?: string;
}

export default function AnimatedHeroHeading({
  badge,
  words,
  subtitle,
}: AnimatedHeroHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-3xl text-center"
    >
      {badge && (
        <motion.p
          variants={fadeUpVariants}
          className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]"
        >
          {badge}
        </motion.p>
      )}
      <motion.h1
        variants={containerVariants}
        className="mb-6 text-3xl sm:text-4xl font-black md:text-6xl flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1"
      >
        {words.map((word, idx) => (
          <motion.span
            key={idx}
            variants={wordVariants}
            className={`inline-block ${
              word.highlight
                ? "bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#7C3AED] bg-clip-text text-transparent"
                : "text-white"
            }`}
          >
            {word.text}
          </motion.span>
        ))}
      </motion.h1>
      {subtitle && (
        <motion.p
          variants={fadeUpVariants}
          className="text-lg text-gray-400 max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
