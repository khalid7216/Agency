"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const headlineWords = [
  { text: "I Build.", highlight: false },
  { text: "I Secure.", highlight: true },
  { text: "I Create.", highlight: false },
];

export default function AnimatedHeroText() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.18,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative px-4 sm:px-6 pb-14 pt-20 md:pb-24 md:pt-32 overflow-hidden">
      {/* Subtle grid pattern & ambient gradient glow */}
      <div className="absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:26px_26px]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute left-1/2 top-10 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-[#7C3AED]/20 blur-[120px] pointer-events-none"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:gap-16 grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* Greeting */}
          <motion.p
            variants={fadeUpVariants}
            className="mb-3 text-lg font-semibold text-[#C4B5FD] tracking-wide"
          >
            Hey, I&apos;m Khalid 👋
          </motion.p>

          {/* Status Badge */}
          <motion.div
            variants={fadeUpVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-1.5 text-xs sm:text-sm text-[#DDD6FE] backdrop-blur-md shadow-[0_0_15px_rgba(124,58,237,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Open to freelance &amp; security engagements</span>
          </motion.div>

          {/* Staggered Animated Headline */}
          <motion.h1
            className="mb-6 max-w-3xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.98] tracking-tight text-white mx-auto lg:mx-0 flex flex-wrap justify-center lg:justify-start gap-x-3 sm:gap-x-4 gap-y-1"
          >
            {headlineWords.map((word, idx) => (
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

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            className="text-base sm:text-lg text-gray-400 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed font-normal"
          >
            Security is my expertise. Code is my craft. Video is my team&apos;s game.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <motion.a
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              href="mailto:security@khalidsanawer.online"
              className="rounded-xl bg-[#7C3AED] px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-[#6D28D9] flex items-center gap-2"
            >
              <span>Hire Me</span>
              <span className="text-lg">→</span>
            </motion.a>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <Link
                href="/portfolio"
                className="rounded-xl border border-white/15 px-7 py-3.5 font-semibold text-white transition hover:border-[#7C3AED]/60 hover:bg-white/5 inline-block"
              >
                View Portfolio
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Profile Visual */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto">
            {/* Ambient pulsed glow */}
            <motion.div
              animate={shouldReduceMotion ? {} : { scale: [1, 1.06, 1], opacity: [0.25, 0.4, 0.25] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 bg-[#7C3AED]/30 blur-3xl rounded-full pointer-events-none"
            />

            {/* Profile Avatar Frame */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#7C3AED]/40 shadow-[0_0_50px_rgba(124,58,237,0.35)] bg-[#0D1120]">
              <Image
                src="/khalid.jpg"
                alt="Khalid Sanawer"
                fill
                priority={true}
                sizes="(max-width: 768px) 280px, 320px"
                className="object-cover object-top"
              />
            </div>

            {/* Floating availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2 rounded-full border border-white/15 bg-[#0A0E1A]/95 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for work</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
