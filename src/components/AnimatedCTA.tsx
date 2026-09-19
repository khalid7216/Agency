"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contact" className="relative px-4 sm:px-6 py-28 overflow-hidden border-t border-white/5">
      {/* Animated subtle gradient shift background */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.18, 1],
                opacity: [0.14, 0.26, 0.14],
                x: ["-5%", "5%", "-5%"],
              }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.28),transparent_65%)] pointer-events-none"
      />

      <div className="mx-auto max-w-4xl text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl font-black md:text-7xl tracking-tight text-white"
        >
          Ready to work together?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-base sm:text-lg text-gray-400 max-w-md mx-auto"
        >
          Let&apos;s build secure, high-performance applications and high-impact digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          >
            <Link
              href="/contact"
              className="inline-block rounded-xl bg-[#7C3AED] px-8 py-4 font-semibold text-white shadow-[0_0_35px_rgba(124,58,237,0.45)] transition hover:bg-[#6D28D9]"
            >
              Hire Me →
            </Link>
          </motion.div>

          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          >
            <a
              href="mailto:security@khalidsanawer.online?subject=Booking%20a%20Call"
              className="inline-block rounded-xl border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-[#7C3AED]/60 hover:bg-white/5"
            >
              Book a Call
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
