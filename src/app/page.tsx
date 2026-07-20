import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaCode,
  FaShieldAlt,
  FaStar,
  FaVideo,
} from "react-icons/fa";
import FadeUp from "@/components/FadeUp";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "AuditWave Security & Full-Stack Web Development — Khalid Sanawer",
  description: "Expert VAPT penetration testing, full-stack Next.js web application development, and 4K video production by EC-Council certified security researcher Khalid Sanawer.",
  keywords: ["Security Researcher", "Penetration Testing", "VAPT", "Next.js Developer", "MERN Stack", "AuditWave Security", "Khalid Sanawer"],
};

const services = [
  {
    title: "Cybersecurity & VAPT",
    icon: FaShieldAlt,
    href: "/vapt",
    tags: ["Web App Testing", "Network Audit", "WordPress Security"],
    metric: "1200+ sites tested",
    border: "border-l-[#7C3AED]",
    iconWrap: "bg-[#7C3AED]/15 text-[#C4B5FD]",
    layout: "items-center text-center",
  },
  {
    title: "Web Development",
    icon: FaCode,
    href: "/services#webdev",
    tags: ["Next.js", "MERN Stack", "REST APIs"],
    metric: "Production-ready apps",
    border: "border-l-blue-500",
    iconWrap: "bg-blue-500/15 text-blue-300",
    layout: "items-center text-center",
  },
  {
    title: "Video Editing",
    icon: FaVideo,
    href: "/services#video",
    tags: ["Premiere Pro", "After Effects", "CapCut"],
    metric: "4K Production",
    border: "border-l-pink-500",
    iconWrap: "bg-pink-500/15 text-pink-300",
    layout: "items-center text-center",
  },
];

const stats = [
  { number: "1200+", label: "Sites Tested" },
  { number: "10+", label: "Global Brands" },
  { number: "4+", label: "Years Experience" },
  { number: "EC-Council", label: "Certified" },
];

const skills = [
  {
    label: "Security",
    icon: FaShieldAlt,
    items: "Burp Suite, OWASP, HackerOne (cyberarmor72)",
  },
  {
    label: "Dev",
    icon: FaCode,
    items: "Next.js, React, Node.js, TypeScript",
  },
  {
    label: "Tools",
    icon: FaVideo,
    items: "Premiere Pro, After Effects, CapCut",
  },
];

const testimonials = [
  {
    stars: 5,
    review: "Khalid identified critical vulnerabilities in our WordPress site that we had no idea about. Professional, fast, and thorough.",
    name: "James M.",
    role: "Website Owner, Finland",
    tag: "VAPT",
    tagStyle: "bg-[#7C3AED]/10 border border-[#7C3AED]/25 text-[#C4B5FD]",
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    stars: 5,
    review: "The blog platform he built for us was clean, fast, and delivered on time. Really understood what we needed.",
    name: "Sarah R.",
    role: "Product Manager, UK",
    tag: "Web Dev",
    tagStyle: "bg-blue-500/10 border border-blue-500/25 text-blue-300",
    avatarSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
  {
    stars: 5,
    review: "Our brand video campaign got amazing engagement. The team's editing quality is top-notch and the turnaround was quick.",
    name: "Ahmed K.",
    role: "Marketing Director, UAE",
    tag: "Video",
    tagStyle: "bg-pink-500/10 border border-pink-500/25 text-pink-300",
    avatarSrc: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&crop=face",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0E1A] text-white">
      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pb-14 pt-20 md:pb-20 md:pt-28">
        <div className="absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7C3AED]/20 blur-[110px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <p className="mb-4 text-lg font-semibold text-[#C4B5FD]">Hey, I&apos;m Khalid 👋</p>
            <div className="mb-4 inline-flex items-center rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-2 text-sm text-[#DDD6FE]">
              🟢 Open to freelance & security engagements
            </div>

            <h1 className="mb-4 max-w-3xl text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-normal text-white mx-auto lg:mx-0">
              I Build. I Secure. I Create.
            </h1>

            <p className="text-base text-gray-400 mb-10 max-w-xs mx-auto lg:mx-0 leading-relaxed">
              Security is my expertise. Code is my craft. Video is my team&apos;s game.
            </p>

            <div className="mb-4 flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="mailto:security@khalidsanawer.online"
                className="rounded-xl bg-[#7C3AED] px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-[#6D28D9]"
              >
                Hire Me →
              </a>
              <Link
                href="/portfolio"
                className="rounded-xl border border-white/15 px-7 py-3.5 font-semibold text-white transition hover:border-[#7C3AED]/60 hover:bg-white/5"
              >
                View Portfolio
              </Link>
            </div>
          </div>

          <div>
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto">
              <div className="absolute -inset-4 bg-[#7C3AED]/20 blur-3xl rounded-full" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#7C3AED]/40 shadow-[0_0_40px_rgba(124,58,237,0.3)]">
                <Image
                  src="/khalid.jpg"
                  alt="Khalid Sanawer"
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full border border-white/10 bg-[#0A0E1A]/90 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                🟢 Available for work
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Link wrap */}
      <section id="services" className="px-4 sm:px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl text-left">
            <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">Security, software, and content that ship.</h2>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <FadeUp key={service.title} delay={index * 0.1}>
                  <Link href={service.href} className="block h-full group">
                    <article
                      className={`flex min-h-[285px] flex-col ${service.layout} rounded-xl border border-white/10 ${service.border} bg-white/[0.035] p-7 transition hover:-translate-y-1 hover:bg-white/[0.055] h-full`}
                    >
                      <div className={`mb-6 flex h-14 w-14 self-center items-center justify-center rounded-xl ${service.iconWrap}`}>
                        <Icon className="text-2xl" />
                      </div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
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
                      <p className="mt-auto pt-7 text-sm font-semibold text-[#C4B5FD]">{service.metric}</p>
                    </article>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-white/5 bg-white/[0.025] px-4 sm:px-6 py-16">
        <FadeUp delay={0}>
          <div className="mx-auto grid max-w-7xl gap-6 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-left lg:text-center">
                <div className="text-4xl sm:text-5xl font-black text-[#7C3AED] mb-2">{stat.number}</div>
                <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="px-4 sm:px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl text-left">
            <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">Portfolio</p>
            <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">Selected work with real delivery behind it.</h2>
          </div>

          <PortfolioGrid limit={3} />

          <div className="mt-12 flex justify-center">
            <Link
              href="/portfolio"
              className="rounded-xl border border-[#7C3AED] px-8 py-3.5 font-semibold text-[#DDD6FE] transition hover:bg-[#7C3AED]/10 hover:text-white shadow-[0_0_15px_rgba(124,58,237,0.15)] flex items-center gap-2"
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-y border-white/5 bg-white/[0.025] px-4 sm:px-6 py-24">
        <FadeUp delay={0}>
          <div className="mx-auto grid max-w-7xl gap-12 grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">About</p>
              <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">Security Researcher. Developer. Creator.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                Khalid Sanawer is a Pakistan-based security researcher and full-stack developer
                focused on practical results: finding vulnerabilities, building reliable web apps,
                and creating polished digital content. His work spans VAPT, Next.js production
                builds, brand websites, and video editing workflows for modern online businesses.
              </p>
            </div>

            <div className="space-y-4">
              {skills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <div key={skill.label} className="rounded-xl border border-white/10 bg-[#0A0E1A] p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#7C3AED]/15 text-[#C4B5FD]">
                        <Icon />
                      </div>
                      <div>
                        <h3 className="font-bold">{skill.label}</h3>
                        <p className="mt-1 text-sm leading-6 text-gray-400">{skill.items}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="border-t border-white/5 bg-[#080D1A] px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl text-left">
            <p className="mb-3 text-sm font-semibold uppercase text-[#7C3AED]">Clients</p>
            <h2 className="text-3xl sm:text-4xl font-bold md:text-5xl">What clients say.</h2>
          </div>

          <div className="items-start grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {testimonials.map((testimonial, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <article
                  className={`flex flex-col bg-[#0D1120] rounded-2xl p-6 border border-white/5 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] transition duration-300 ${
                    i === 0 ? "md:mt-8 mt-0" : i === 1 ? "md:mt-0 mt-0" : "md:mt-8 mt-0"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Image src={testimonial.avatarSrc} alt={testimonial.name} width={40} height={40} className="rounded-full object-cover shrink-0" />
                    <div className="text-left">
                      <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
                      <p className="text-gray-500 text-xs">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="text-left flex-grow">
                    <span className="text-[#7C3AED] text-4xl font-black leading-none block mb-2">&ldquo;</span>
                    <p className="text-gray-300 text-sm leading-relaxed italic">
                      {testimonial.review}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                    <div className="flex gap-0.5 text-yellow-400 text-xs">
                      {[...Array(testimonial.stars)].map((_, idx) => (
                        <FaStar key={idx} />
                      ))}
                    </div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${testimonial.tagStyle}`}>
                      {testimonial.tag}
                    </span>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative px-4 sm:px-6 py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(124,58,237,0.16),transparent_55%)]" />
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-black md:text-6xl">Ready to work together?</h2>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-[#7C3AED] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-[#6D28D9]"
            >
              Hire Me
            </Link>
            <a
              href="mailto:security@khalidsanawer.online?subject=Booking%20a%20Call"
              className="rounded-xl border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-[#7C3AED]/60 hover:bg-white/5"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
