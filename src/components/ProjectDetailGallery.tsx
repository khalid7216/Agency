"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaImages } from "react-icons/fa";

interface ProjectDetailGalleryProps {
  screenshots: string[];
  title: string;
}

export default function ProjectDetailGallery({
  screenshots,
  title,
}: ProjectDetailGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const total = screenshots.length;

  // Auto scroll to top when slide changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  if (total === 0) return null;

  const currentImage = screenshots[currentIndex];

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0D1120] overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.15)] my-8">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#0A0E1A]/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#C4B5FD]">
            <FaImages className="text-sm" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">Project Screenshots</h3>
            <p className="text-xs text-gray-400 hidden sm:block">Full page preview & screenshot gallery</p>
          </div>
        </div>

        {total > 0 && (
          <div className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#C4B5FD]">
            {currentIndex + 1} / {total}
          </div>
        )}
      </div>

      {/* Main visual display & scroll container */}
      <div className="relative w-full bg-[#070A14] overflow-hidden select-none flex flex-col items-center justify-center">
        {/* Scroll hint badge */}
        {currentImage && (
          <div className="absolute top-3 z-20 pointer-events-none px-3 py-1 rounded-full bg-[#0A0E1A]/85 backdrop-blur-md border border-white/10 text-[10px] text-gray-300 flex items-center gap-1.5 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
            <span>Scroll to view full page screenshot</span>
          </div>
        )}

        {/* Scrollable image area */}
        <div
          ref={scrollContainerRef}
          className="w-full max-h-[65vh] sm:max-h-[75vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6 pt-10 sm:pt-12 custom-gallery-scrollbar flex flex-col items-center"
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
                  alt={`${title} screenshot ${currentIndex + 1}`}
                  width={1600}
                  height={2400}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  className="w-full h-auto rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-white/10"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 my-auto">
              <FaImages className="text-5xl mb-3 opacity-40 text-[#7C3AED]" />
              <p className="text-sm">No preview screenshots available.</p>
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

      {/* Thumbnail indicators */}
      {total > 1 && (
        <div className="px-5 py-3 border-t border-white/5 bg-[#0A0E1A]/90 backdrop-blur-md flex items-center justify-center gap-2">
          {screenshots.map((_, idx) => {
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
  );
}
