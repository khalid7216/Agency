import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#070B15] px-4 sm:px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between text-center md:text-left">
        <div>
          <div className="text-xl font-bold text-[#7C3AED]">Khalid Sanawer</div>
          <p className="mt-2 text-sm text-gray-500">2025 Khalid Sanawer. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-5 text-sm text-gray-400">
          <Link href="/services" className="transition hover:text-white">Services</Link>
          <Link href="/portfolio" className="transition hover:text-white">Portfolio</Link>
          <Link href="/blog" className="transition hover:text-white">Blog</Link>
          <Link href="/team" className="transition hover:text-white">Team</Link>
          <Link href="/#about" className="transition hover:text-white">About</Link>
          <Link href="/contact" className="transition hover:text-white">Contact</Link>
        </div>

        <div className="flex justify-center md:justify-start gap-4 text-lg text-gray-400">
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="transition hover:text-[#7C3AED]"><FaTwitter /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition hover:text-[#7C3AED]"><FaLinkedin /></a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition hover:text-[#7C3AED]"><FaGithub /></a>
          <a href="mailto:security@khalidsanawer.online" aria-label="Email security@khalidsanawer.online" className="transition hover:text-[#7C3AED]"><FaEnvelope /></a>
        </div>
      </div>
    </footer>
  );
}
