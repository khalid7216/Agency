"use client";

import Link from "next/link";
import { FaCode, FaShieldAlt, FaVideo } from "react-icons/fa";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const services = [
  {
    title: "Cybersecurity & VAPT",
    icon: FaShieldAlt,
    href: "/vapt",
    tags: ["Web App Testing", "Network Audit", "WordPress Security"],
    metric: "1200+ sites tested",
    accent: "#7C3AED",
    border: "border-l-[#7C3AED]",
    iconWrap: "bg-[#7C3AED]/15 text-[#C4B5FD]",
    glow: "hover:shadow-[0_10px_35px_rgba(124,58,237,0.18)]",
  },
  {
    title: "Web Development",
    icon: FaCode,
    href: "/services#webdev",
    tags: ["Next.js", "MERN Stack", "REST APIs"],
    metric: "Production-ready apps",
    accent: "#3B82F6",
    border: "border-l-blue-500",
    iconWrap: "bg-blue-500/15 text-blue-300",
    glow: "hover:shadow-[0_10px_35px_rgba(59,130,246,0.18)]",
  },
  {
    title: "Video Editing",
    icon: FaVideo,
    href: "/services#video",
    tags: ["Premiere Pro", "After Effects", "CapCut"],
    metric: "4K Production",
    accent: "#EC4899",
    border: "border-l-pink-500",
    iconWrap: "bg-pink-500/15 text-pink-300",
    glow: "hover:shadow-[0_10px_35px_rgba(236,72,153,0.18)]",
  },
];

export default function AnimatedServices() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
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
    <section id="services" className="px-4 sm:px-6 py-24 relative">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl text-left"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">Services</p>
          <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">
            Security, software, and content that ship.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 grid-cols-1 md:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.015 }}
                className="h-full"
              >
                <Link href={service.href} className="block h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] rounded-2xl">
                  <article
                    className={`flex min-h-[300px] flex-col items-center text-center rounded-2xl border border-white/10 ${service.border} bg-white/[0.035] p-8 transition-colors duration-300 group-hover:bg-white/[0.06] group-hover:border-white/20 h-full ${service.glow}`}
                  >
                    <div
                      className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${service.iconWrap} transition-transform duration-300 group-hover:scale-110 shadow-inner`}
                    >
                      <Icon className="text-2xl" />
                    </div>

                    <h3 className="text-xl font-bold group-hover:text-white transition-colors">{service.title}</h3>

                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-auto pt-7 text-sm font-semibold text-[#C4B5FD] flex items-center gap-1.5">
                      <span>{service.metric}</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </p>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
