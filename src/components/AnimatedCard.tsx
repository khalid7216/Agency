"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
