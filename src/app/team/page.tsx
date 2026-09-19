import type { Metadata } from "next";
import Image from "next/image";
import { getMembers } from "@/lib/team";

export const metadata: Metadata = {
  title: "Meet the Team — AuditWave Security & Creative Experts",
  description: "Meet the cybersecurity specialists, Next.js developers, and video production experts behind AuditWave Security and Pixvault led by Khalid Sanawer.",
  keywords: ["AuditWave Security team", "Khalid Sanawer", "Pixvault team", "Cybersecurity experts Pakistan"],
  alternates: {
    canonical: '/team',
  },
  openGraph: {
    title: "Meet the Team — AuditWave Security & Creative Experts",
    description: "Meet the cybersecurity specialists, Next.js developers, and video production experts behind AuditWave Security and Pixvault led by Khalid Sanawer.",
    url: "https://khalidsanawer.online/team",
    siteName: "Khalid Sanawer",
    images: [{ url: "/khalid.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet the Team — AuditWave Security & Creative Experts",
    description: "Meet the cybersecurity specialists, Next.js developers, and video production experts behind AuditWave Security and Pixvault led by Khalid Sanawer.",
    images: ["/khalid.jpg"],
  },
};

function getInitials(name: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default async function Team() {
  const teamMembers = await getMembers();

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
        
        {/* Fan/Arc Layout — dynamic presentation */}
        <div className="flex scale-75 min-[400px]:scale-90 sm:scale-100 origin-bottom items-end justify-center gap-1 sm:gap-3 relative mb-12 max-w-sm sm:max-w-2xl mx-auto pt-12 pb-6 overflow-hidden">
          {/* Purple glow behind center image */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[100px] bg-[#7C3AED]/40 -z-10" />

          {/* Members rendered in arc around lead */}
          {teamMembers.slice(0, 2).map((member, idx) => (
            <div
              key={member.id}
              className={`relative overflow-hidden ${
                idx === 0 ? "w-16 h-24 sm:w-28 sm:h-36 rotate-[-12deg] translate-y-8" : "w-20 h-28 sm:w-32 sm:h-40 rotate-[-6deg] translate-y-4"
              } rounded-2xl bg-gradient-to-b from-blue-500/30 to-[#0D1120] border border-white/5 flex flex-col items-center justify-center text-xl font-bold text-white shadow-lg transition-all duration-300 hover:rotate-0 hover:translate-y-0 hover:scale-105 hover:z-20 hover:border-blue-500/50 cursor-pointer select-none`}
            >
              <span className="text-[8px] sm:text-xs opacity-70 font-normal mb-1 z-10 px-1 truncate max-w-full">{member.name}</span>
              {member.imageUrl ? (
                <Image src={member.imageUrl} alt={member.name} fill sizes="(max-width: 768px) 120px, 160px" className="object-cover" />
              ) : (
                <div className="text-sm sm:text-xl font-bold text-[#C4B5FD]">{getInitials(member.name)}</div>
              )}
            </div>
          ))}

          {/* Center: Khalid (Lead) */}
          <div className="relative w-28 h-36 sm:w-40 sm:h-48 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(124,58,237,0.35)] rotate-0 transition-all duration-300 hover:scale-105 hover:z-20 z-10 cursor-pointer">
            <Image
              src="/khalid.jpg"
              alt="Khalid Sanawer"
              fill
              priority={true}
              sizes="(max-width: 768px) 120px, 160px"
              className="object-cover object-top"
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm py-1 text-center text-[10px] tracking-widest font-semibold text-white">
              LEAD
            </div>
          </div>

          {/* Members rendered in right side of arc */}
          {teamMembers.slice(2, 4).map((member, idx) => (
            <div
              key={member.id}
              className={`relative overflow-hidden ${
                idx === 0 ? "w-20 h-28 sm:w-32 sm:h-40 rotate-[6deg] translate-y-4" : "w-16 h-24 sm:w-28 sm:h-36 rotate-[12deg] translate-y-8"
              } rounded-2xl bg-gradient-to-b from-pink-500/30 to-[#0D1120] border border-white/5 flex flex-col items-center justify-center text-xl font-bold text-white shadow-lg transition-all duration-300 hover:rotate-0 hover:translate-y-0 hover:scale-105 hover:z-20 hover:border-pink-500/50 cursor-pointer select-none`}
            >
              <span className="text-[8px] sm:text-xs opacity-70 font-normal mb-1 z-10 px-1 truncate max-w-full">{member.name}</span>
              {member.imageUrl ? (
                <Image src={member.imageUrl} alt={member.name} fill sizes="(max-width: 768px) 120px, 160px" className="object-cover" />
              ) : (
                <div className="text-sm sm:text-xl font-bold text-[#C4B5FD]">{getInitials(member.name)}</div>
              )}
            </div>
          ))}
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

          {/* Grid of Dynamic Team Members */}
          {teamMembers.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-[#0D1120] rounded-2xl border border-white/5 max-w-4xl mx-auto">
              <p className="text-sm">No team members available.</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#0D1120] rounded-2xl p-6 border border-white/5 border-t-2 border-t-blue-500 flex flex-col text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                >
                  {/* Avatar or Initials Fallback */}
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="rounded-2xl object-cover mx-auto mb-4 border border-white/10"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-[#7C3AED]/30 to-[#0D1120] border border-white/10 flex items-center justify-center text-2xl font-bold text-[#C4B5FD] mx-auto mb-4 shadow-lg">
                      {getInitials(member.name)}
                    </div>
                  )}

                  {/* Badge */}
                  <div>
                    <span className="inline-block rounded-full bg-white/5 border border-white/10 px-3 py-0.5 text-xs text-gray-400 mb-3">
                      {member.badge || "Team Member"}
                    </span>
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-xs font-semibold text-gray-400 mt-1 mb-4">{member.role}</p>

                  {/* Bio */}
                  {member.bio && (
                    <p className="text-sm text-gray-300 leading-relaxed mb-6 flex-grow">
                      {member.bio}
                    </p>
                  )}

                  {/* Skill Tags */}
                  {member.skills && member.skills.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
                      {member.skills.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-400 hover:text-white hover:border-white/20 transition duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
