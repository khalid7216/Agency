"use client";

import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/team", label: "Team" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://x.com", label: "Twitter", icon: FaTwitter },
  { href: "https://linkedin.com", label: "LinkedIn", icon: FaLinkedin },
  { href: "https://github.com", label: "GitHub", icon: FaGithub },
  { href: "mailto:security@khalidsanawer.online", label: "Email security@khalidsanawer.online", icon: FaEnvelope },
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="border-t border-white/5 bg-[#070B15] px-4 sm:px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between text-center md:text-left">
        <div>
          <Link href="/" className="text-xl font-bold text-[#7C3AED] hover:text-[#A78BFA] transition-colors">
            Khalid Sanawer
          </Link>
          <p className="mt-2 text-sm text-gray-500">2025 Khalid Sanawer. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-400">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center md:justify-start gap-5 text-xl text-gray-400">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                whileHover={shouldReduceMotion ? {} : { scale: 1.2, y: -3, color: "#C4B5FD" }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="transition-colors hover:text-[#7C3AED]"
              >
                <Icon />
              </motion.a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
