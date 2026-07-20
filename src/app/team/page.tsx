import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Meet the Team — AuditWave Security & Creative Experts",
  description: "Meet the cybersecurity specialists, Next.js developers, and video production experts behind AuditWave Security and Pixvault led by Khalid Sanawer.",
  keywords: ["AuditWave Security team", "Khalid Sanawer", "Pixvault team", "Cybersecurity experts Pakistan"],
};

const otherMembers = [
  {
    initials: "AK",
    name: "Ali Khan",
    role: "Video Editor — Premiere Pro & After Effects",
    badge: "Video Production",
    description: "Handles cinematic video production, color grading, motion graphics, and professional edits using Premiere Pro and After Effects.",
    tags: ["Premiere Pro", "After Effects", "Color Grading", "Motion Graphics", "4K"],
    avatarBg: "from-[#7C3AED]/30 to-[#0D1120]",
    borderClass: "border-t-2 border-t-blue-500",
    hoverShadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    alt: "Alex Khan",
  },
  {
    initials: "SR",
    name: "Sara Raza",
    role: "Video Editor — Premiere Pro & After Effects",
    badge: "Video Production",
    description: "Specializes in brand videos, promotional content, and social media video production with professional post-production workflow.",
    tags: ["Premiere Pro", "After Effects", "Brand Videos", "Social Media"],
    avatarBg: "from-pink-500/30 to-[#0D1120]",
    borderClass: "border-t-2 border-t-pink-500",
    hoverShadow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
    imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    alt: "Sara Raza",
  },
  {
    initials: "MR",
    name: " Saleem Haider",
    role: "CapCut Editor — AI Animated Videos",
    badge: "Video Editor",
    description: "Creates AI-powered animated videos and viral short-form content using CapCut. Specializes in modern trending formats.",
    tags: ["CapCut", "AI Animation", "Short-form", "Trending Formats"],
    avatarBg: "from-blue-500/30 to-[#0D1120]",
    borderClass: "border-t-2 border-t-blue-500",
    hoverShadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    alt: "Mike Riaz",
  },
  {
    initials: "ZA",
    name: "Waniya ",
    role: "CapCut Editor — AI Animated Videos",
    badge: "Video Editor",
    description: "Produces AI animated videos and engaging short-form content optimized for social media platforms.",
    tags: ["CapCut", "AI Animation", "Social Media", "Content Creation"],
    avatarBg: "from-pink-500/30 to-[#0D1120]",
    borderClass: "border-t-2 border-t-pink-500",
    hoverShadow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
    imageSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    alt: "Zoe Ahmed",
  },
];

export default function Team() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0E1A] text-white">
      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-16 pb-20 text-center">
        <div className="absolute inset-0 -z-10 opacity-[0.08] [background-image:radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:26px_26px]" />
        
        {/* Fan/Arc Layout — responsive version */}
        <div className="flex items-end justify-center gap-1 sm:gap-3 relative mb-12 max-w-sm sm:max-w-2xl mx-auto pt-12 pb-6 overflow-hidden">
          {/* Purple glow behind center image */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[100px] bg-[#7C3AED]/40 -z-10" />

          {/* Far Left: MR */}
          <div className="relative overflow-hidden w-16 h-24 sm:w-28 sm:h-36 rounded-2xl bg-gradient-to-b from-blue-500/30 to-[#0D1120] border border-white/5 flex flex-col items-center justify-center text-xl font-bold text-white shadow-lg rotate-[-12deg] translate-y-8 transition-all duration-300 hover:rotate-0 hover:translate-y-0 hover:scale-105 hover:z-20 hover:border-blue-500/50 cursor-pointer select-none">
            <span className="text-[8px] sm:text-sm opacity-50 font-normal mb-1">Editor</span>
            <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" alt="Saleem Haider" fill className="object-cover" />
          </div>

          {/* Mid Left: AK */}
          <div className="relative overflow-hidden w-20 h-28 sm:w-32 sm:h-40 rounded-2xl bg-gradient-to-b from-[#7C3AED]/30 to-[#0D1120] border border-white/5 flex flex-col items-center justify-center text-2xl font-bold text-white shadow-lg rotate-[-6deg] translate-y-4 transition-all duration-300 hover:rotate-0 hover:translate-y-0 hover:scale-105 hover:z-20 hover:border-[#7C3AED]/50 cursor-pointer select-none">
            <span className="text-[8px] sm:text-xs opacity-50 font-normal mb-1">Production</span>
            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Ali Khan" fill className="object-cover" />
          </div>

          {/* Center: Khalid (largest, front/center) */}
          <div className="relative w-28 h-36 sm:w-40 sm:h-48 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(124,58,237,0.35)] rotate-0 transition-all duration-300 hover:scale-105 hover:z-20 z-10 cursor-pointer">
            <Image
              src="/khalid.jpg"
              alt="Khalid Sanawer"
              fill
              priority={true}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm py-1 text-center text-[10px] tracking-widest font-semibold text-white">
              LEAD
            </div>
          </div>

          {/* Mid Right: SR */}
          <div className="relative overflow-hidden w-20 h-28 sm:w-32 sm:h-40 rounded-2xl bg-gradient-to-b from-pink-500/30 to-[#0D1120] border border-white/5 flex flex-col items-center justify-center text-2xl font-bold text-white shadow-lg rotate-[6deg] translate-y-4 transition-all duration-300 hover:rotate-0 hover:translate-y-0 hover:scale-105 hover:z-20 hover:border-pink-500/50 cursor-pointer select-none">
            <span className="text-[8px] sm:text-xs opacity-50 font-normal mb-1">Production</span>
            <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" alt="Sara Raza" fill className="object-cover" />
          </div>

          {/* Far Right: ZA */}
          <div className="relative overflow-hidden w-16 h-24 sm:w-28 sm:h-36 rounded-2xl bg-gradient-to-b from-pink-500/30 to-[#0D1120] border border-white/5 flex flex-col items-center justify-center text-xl font-bold text-white shadow-lg rotate-[12deg] translate-y-8 transition-all duration-300 hover:rotate-0 hover:translate-y-0 hover:scale-105 hover:z-20 hover:border-pink-500/50 cursor-pointer select-none">
            <span className="text-[8px] sm:text-sm opacity-50 font-normal mb-1">Editor</span>
            <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" alt="Waniya" fill className="object-cover" />
          </div>
        </div>

        {/* Hero Typography */}
        <div className="mx-auto max-w-3xl mt-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#7C3AED] bg-clip-text">
            OUR TEAM
          </p>
          <h1 className="mb-6 text-3xl font-black sm:text-4xl md:text-6xl tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400">
            The People Behind the Work.
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto font-normal">
            A small but sharp team — each one a specialist in their lane.
          </p>
        </div>
      </section>

      {/* Team Cards Section */}
      <section className="px-4 sm:px-6 pb-32 relative">
        <div className="mx-auto max-w-5xl">
          
          {/* Featured Lead Card: Khalid Sanawer */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="bg-[#0D1120] rounded-2xl p-6 sm:p-8 border border-white/5 border-l-4 border-l-[#7C3AED] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
                
                {/* Photo */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <Image
                    src="/khalid.jpg"
                    alt="Khalid Sanawer"
                    fill
                    priority={true}
                    sizes="128px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow text-center md:text-left">
                  <span className="inline-block rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-3 py-0.5 text-xs font-semibold text-[#C4B5FD] mb-3">
                    Senior — Security + Dev
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    KHALID SANAWER
                  </h2>
                  <p className="text-sm font-semibold text-gray-400 mt-1 mb-4">
                    Lead Security Researcher & Senior Web Developer
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl text-sm md:text-base">
                    I lead security assessments and full-stack development. From VAPT and penetration testing to building production-ready web apps — this is my core.
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                    {[
                      "VAPT", "MERN Stack", "Next.js", "WordPress", "REST APIs", 
                      "Laravel", "Laragon", "UI/UX Design", "TypeScript", 
                      "Node.js", "React", "Burp Suite", "OWASP"
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-400 hover:text-white hover:border-[#7C3AED]/30 transition duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Grid of Other 4 Members */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto">
            {otherMembers.map((member) => (
              <div
                key={member.initials}
                className={`bg-[#0D1120] rounded-2xl p-6 border border-white/5 ${member.borderClass} flex flex-col text-center transition-all duration-300 hover:-translate-y-1 ${member.hoverShadow}`}
              >
                {/* Avatar */}
                <Image src={member.imageSrc} alt={member.alt} width={80} height={80} className="rounded-2xl object-cover mx-auto mb-4" />

                {/* Badge */}
                <div>
                  <span className="inline-block rounded-full bg-white/5 border border-white/10 px-3 py-0.5 text-xs text-gray-400 mb-3">
                    {member.badge}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-xs font-semibold text-gray-400 mt-1 mb-4">{member.role}</p>

                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed mb-6 flex-grow">
                  {member.description}
                </p>

                {/* Skill Tags */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-400 hover:text-white hover:border-white/20 transition duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
