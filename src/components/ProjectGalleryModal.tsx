"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaImages,
  FaTimes,
} from "react-icons/fa";
import { Project } from "@/components/PortfolioGrid";

interface ProjectGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  initialIndex?: number;
}

export default function ProjectGalleryModal({
  isOpen,
  onClose,
  project,
  initialIndex = 0,
}: ProjectGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Normalize and sanitize screenshots list (handles string arrays, object arrays, or imageUrl fallback)
  const rawScreenshots =
    project?.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : project?.imageUrl
      ? [project.imageUrl]
      : [];

  const screenshots: string[] = rawScreenshots
    .map((item: unknown) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const obj = item as Record<string, unknown>;
        const urlStr = obj.url || obj.src || obj.secure_url;
        return typeof urlStr === "string" ? urlStr : "";
      }
      return "";
    })
    .filter((url: string) => Boolean(url && url.trim() !== ""));

  const total = screenshots.length;

  // Reset index when project changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex >= 0 && initialIndex < total ? initialIndex : 0);
    }
  }, [isOpen, initialIndex, project, total]);

  // Reset scroll position to top whenever screenshot changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentIndex, project]);

  // Log screenshot array values at render time for debugging & verification
  useEffect(() => {
    if (isOpen && project) {
      console.log("[ProjectGalleryModal] Opened project:", {
        id: project.id,
        title: project.title,
        screenshotsCount: screenshots.length,
        screenshots,
        currentIndex,
        currentImage: screenshots[currentIndex >= 0 && currentIndex < screenshots.length ? currentIndex : 0],
      });
    }
  }, [isOpen, project, screenshots, currentIndex]);

  // Navigate to Next slide
  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Navigate to Previous slide
  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation (Arrow keys + Escape) and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !project) return null;

  const currentImage = screenshots[currentIndex];
  const hasCaseStudy = [
    "usertesting-blog",
    "drivego-rent-a-car",
    "auditwave-security-platform",
  ].includes(project.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6">
        {/* Backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#070A14]/85 backdrop-blur-xl"
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 flex flex-col w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-5xl rounded-none sm:rounded-2xl border-0 sm:border border-white/10 bg-[#0D1120] text-white shadow-[0_0_50px_rgba(124,58,237,0.25)] overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-title"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#0A0E1A]/80 backdrop-blur-md shrink-0 z-20">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#C4B5FD] shrink-0">
                <FaImages className="text-sm" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2
                    id="gallery-title"
                    className="font-bold text-base sm:text-lg text-white truncate"
                  >
                    {project.title}
                  </h2>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5 shrink-0">
                    {project.category}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate max-w-md hidden sm:block">
                  Project Detail & Screenshot Gallery
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Counter Indicator */}
              {total > 0 && (
                <div className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#C4B5FD]">
                  {currentIndex + 1} / {total}
                </div>
              )}

              {/* Case study link if available */}
              {hasCaseStudy && (
                <Link
                  href={`/portfolio/${project.id}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition"
                >
                  <span>Case Study</span>
                  <FaExternalLinkAlt className="text-[10px] text-gray-400" />
                </Link>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-red-500/40 hover:text-red-400 transition cursor-pointer"
                aria-label="Close modal"
                title="Close (Esc)"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Visual Display Area */}
          <div className="relative w-full bg-[#070A14] overflow-hidden select-none flex flex-col items-center justify-center">
            {/* Scroll hint badge */}
            {currentImage && (
              <div className="absolute top-3 z-20 pointer-events-none px-3 py-1 rounded-full bg-[#0A0E1A]/85 backdrop-blur-md border border-white/10 text-[10px] text-gray-300 flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
                <span>Scroll to view full page</span>
              </div>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="w-full max-h-[65vh] sm:max-h-[72vh] overflow-y-auto overflow-x-hidden p-3 sm:p-6 pt-10 sm:pt-12 custom-gallery-scrollbar flex flex-col items-center"
            >
              {currentImage ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage + currentIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="w-full max-w-4xl mx-auto flex flex-col items-center relative"
                  >
                    <Image
                      src={currentImage}
                      alt={`${project.title} screenshot ${currentIndex + 1}`}
                      width={1600}
                      height={2400}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      className="w-full h-auto rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-white/10"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 my-auto">
                  <FaImages className="text-5xl mb-3 opacity-40 text-[#7C3AED]" />
                  <p className="text-sm">No preview screenshots available for this project.</p>
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full border border-white/10 bg-[#0D1120]/80 text-white hover:bg-[#7C3AED] hover:border-[#7C3AED] shadow-xl transition backdrop-blur-md group cursor-pointer z-30"
                  aria-label="Previous screenshot"
                  title="Previous (Left Arrow)"
                >
                  <FaChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full border border-white/10 bg-[#0D1120]/80 text-white hover:bg-[#7C3AED] hover:border-[#7C3AED] shadow-xl transition backdrop-blur-md group cursor-pointer z-30"
                  aria-label="Next screenshot"
                  title="Next (Right Arrow)"
                >
                  <FaChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Information & Thumbnails / Dots Bar */}
          <div className="px-5 py-4 border-t border-white/5 bg-[#0A0E1A]/90 backdrop-blur-md shrink-0 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* Project description caption */}
              <div className="max-w-2xl">
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex items-center flex-wrap gap-1.5 shrink-0">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium text-[#C4B5FD] bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnail Navigation / Dot Indicators */}
            {total > 1 && (
              <div className="flex items-center justify-center gap-2 pt-1">
                {screenshots.map((img, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative transition-all rounded-full overflow-hidden cursor-pointer ${
                        isActive
                          ? "w-8 h-2 bg-[#7C3AED] shadow-[0_0_12px_rgba(124,58,237,0.7)]"
                          : "w-2 h-2 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Jump to screenshot ${idx + 1}`}
                      title={`Screenshot ${idx + 1} of ${total}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
