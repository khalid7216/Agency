"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaCar, FaCode, FaImage, FaVideo } from "react-icons/fa";
import FadeUp from "@/components/FadeUp";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  border: string;
  glow: string;
  imageUrl?: string;
}

const categories = [
  { id: "all", name: "All Work" },
  { id: "cybersecurity", name: "Cybersecurity" },
  { id: "web-dev", name: "Web Dev" },
  { id: "video", name: "Video Production" },
];

export default function PortfolioGrid({ limit }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <div>
      {!limit && (
        <div className="mx-auto max-w-xl flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
                activeCategory === cat.id
                  ? "bg-[#7C3AED] border-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                  : "bg-[#0D1120] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/5 bg-white/[0.01] p-8 h-[400px] flex flex-col justify-between animate-pulse"
            >
              <div className="h-48 bg-white/5 rounded-lg mb-6" />
              <div className="space-y-3 flex-grow">
                <div className="h-5 bg-white/5 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-full" />
                <div className="h-3 bg-white/5 rounded w-5/6" />
              </div>
              <div className="flex gap-2 mt-6">
                <div className="h-5 bg-white/5 rounded w-12" />
                <div className="h-5 bg-white/5 rounded w-16" />
              </div>
            </div>
          ))
        ) : displayedProjects.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500">
            <FaImage className="text-4xl mx-auto mb-3 opacity-60" />
            <p>No projects found.</p>
          </div>
        ) : (
          displayedProjects.map((project, index) => (
            <FadeUp key={project.id || project.title} delay={index * 0.05}>
              <a href="/portfolio" className="block group/card h-full">
                <article
                  className={`rounded-xl border border-white/10 ${project.border} ${project.glow} bg-white/[0.035] p-8 transition hover:-translate-y-1 hover:bg-white/[0.055] h-full flex flex-col justify-between`}
                >
                  <div>
                    <div className="mb-6">
                      {project.imageUrl ? (
                        <div className="h-48 relative overflow-hidden rounded-lg border border-white/5 shadow-inner bg-[#080D1A]">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-[1.03] transition duration-500"
                          />
                        </div>
                      ) : project.title === "User Testing Blog" ? (
                        <div className="h-48 bg-[#080D1A] relative overflow-hidden rounded-lg border border-white/5 flex flex-col p-4 shadow-inner">
                          <div className="flex items-center gap-1.5 pb-2 border-b border-white/5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                            <div className="h-4 flex-grow bg-[#0D1120] rounded border border-white/5 mx-2 flex items-center px-2">
                              <span className="text-[9px] text-gray-500">usertestingblog.com</span>
                            </div>
                          </div>
                          <div className="flex-grow flex flex-col gap-2 pt-3">
                            <div className="h-3 w-3/4 bg-[#0D1120] rounded" />
                            <div className="h-2 w-full bg-[#0D1120] rounded opacity-65" />
                            <div className="h-2 w-5/6 bg-[#0D1120] rounded opacity-65" />
                            <div className="h-2 w-2/3 bg-[#0D1120] rounded opacity-65" />
                            <div className="mt-auto flex gap-2">
                              <div className="h-4 w-12 bg-[#7C3AED]/20 rounded" />
                              <div className="h-4 w-12 bg-[#0D1120] rounded" />
                            </div>
                          </div>
                        </div>
                      ) : project.title === "Rent-a-Car Platform" ? (
                        <div className="h-48 bg-[#080D1A] relative overflow-hidden rounded-lg border border-white/5 flex flex-col p-4 shadow-inner">
                          <div className="flex items-center justify-between pb-2 border-b border-white/5">
                            <div className="text-[10px] font-bold text-blue-400">DriveGo</div>
                            <div className="h-3 w-8 bg-[#0D1120] rounded" />
                          </div>
                          <div className="flex-grow flex items-center justify-center relative">
                            <div className="flex flex-col items-center gap-2">
                              <FaCar className="text-3xl text-blue-400" />
                              <span className="text-[9px] text-gray-500 uppercase tracking-widest">Premium SUV</span>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-[#0D1120] border border-white/5 rounded p-1.5 shadow-lg flex flex-col gap-1">
                              <div className="h-2 w-10 bg-blue-500/20 rounded" />
                              <span className="text-[9px] text-green-400 font-bold">$45/day</span>
                            </div>
                          </div>
                        </div>
                      ) : project.title === "AuditWave Security Site" ? (
                        <div className="h-48 bg-[#080D1A] relative overflow-hidden rounded-lg border border-white/5 flex flex-col p-4 shadow-inner font-mono text-[9px] text-emerald-400 leading-tight">
                          <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/5 mb-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                            <span className="text-gray-500 text-[8px] ml-2">bash - terminal</span>
                          </div>
                          <div className="flex flex-col gap-1 select-none">
                            <div><span className="text-pink-500">auditwave@sec:~$</span> nmap -sV target.com</div>
                            <div className="text-gray-500">Starting Nmap 7.92 at 2026-06-27 05:20</div>
                            <div>Nmap scan report for target.com (104.244.42.1)</div>
                            <div className="text-yellow-400">PORT    STATE SERVICE</div>
                            <div>80/tcp  open  http  nginx/1.18.0</div>
                            <div>443/tcp open  ssl/http nginx/1.18.0</div>
                            <div className="text-green-500">[+] SCAN COMPLETE - 0 VULS</div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-48 bg-[#080D1A] relative overflow-hidden rounded-lg border border-white/5 flex flex-col p-4 shadow-inner">
                          {project.category === "cybersecurity" ? (
                            <div className="font-mono text-[9px] text-emerald-400 leading-tight flex-grow flex flex-col justify-between">
                              <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/5 mb-2">
                                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                                <div className="w-2 h-2 rounded-full bg-green-500/60" />
                                <span className="text-gray-500 text-[8px] ml-2">bash - audit</span>
                              </div>
                              <div>
                                <span className="text-pink-500">guest@sec:~$</span> run security-audit
                                <div className="text-yellow-400 mt-1">✓ Analyzing {project.title}</div>
                                <div className="text-emerald-500 mt-0.5">[+] SECURE & COMPLIANT</div>
                              </div>
                            </div>
                          ) : project.category === "video" ? (
                            <div className="flex flex-col items-center justify-center h-full relative">
                              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-pink-900/20 opacity-60" />
                              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/25 border border-pink-400 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                                <FaVideo className="text-lg ml-0.5" />
                              </div>
                              <span className="text-[9px] text-gray-500 mt-2 z-10 tracking-widest uppercase">HD Video Project</span>
                            </div>
                          ) : (
                            <div className="flex flex-col h-full">
                              <div className="flex items-center gap-1.5 pb-2 border-b border-white/5">
                                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                                <div className="w-2 h-2 rounded-full bg-green-500/60" />
                                <span className="text-[8px] text-gray-500 ml-2">app.deploy</span>
                              </div>
                              <div className="flex-grow flex flex-col justify-center items-center gap-1.5 text-center">
                                <FaCode className="text-2xl text-blue-400" />
                                <span className="text-[9px] text-gray-400 font-semibold">{project.title}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="mt-3 text-sm text-gray-400">{project.description}</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </a>
            </FadeUp>
          ))
        )}
      </div>
    </div>
  );
}
