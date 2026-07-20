"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaCheck,
  FaExclamationTriangle,
  FaImage,
  FaSearch,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  format: string;
  created_at: string;
  width: number;
  height: number;
}

interface CloudinaryImagePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
}

export default function CloudinaryImagePicker({
  isOpen,
  onClose,
  onSelect,
}: CloudinaryImagePickerProps) {
  const [resources, setResources] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      setSelectedUrl(null);
      try {
        const res = await fetch("/api/cloudinary/list");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch Cloudinary images");
        }
        setResources(data.resources || []);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to load image library.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredResources = resources.filter((item) =>
    item.public_id.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (selectedUrl) {
      onSelect(selectedUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#0D1120] border border-white/10 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0E1A]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-[#7C3AED]/20 text-[#7C3AED]">
              <FaImage className="text-base" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">Cloudinary Image Library</h3>
              <p className="text-xs text-gray-400">Select an existing image from your Cloudinary storage</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-gray-400 hover:text-white transition"
            aria-label="Close dialog"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3 border-b border-white/5 bg-white/[0.01]">
          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-500" />
            <input
              type="text"
              placeholder="Search images by public ID or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 min-h-[320px] bg-[#0D1120]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <FaSpinner className="animate-spin text-3xl text-[#7C3AED] mb-3" />
              <p className="text-xs tracking-wide">Fetching library from Cloudinary...</p>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center my-8">
              <FaExclamationTriangle className="text-2xl text-red-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-red-300">Error Loading Gallery</p>
              <p className="text-xs text-gray-400 mt-1">{error}</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="py-24 text-center text-gray-500 border border-dashed border-white/5 rounded-xl">
              <FaImage className="text-4xl mx-auto mb-3 opacity-40" />
              <p className="text-sm">No images found{search ? ` matching "${search}"` : ""}.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredResources.map((item) => {
                const isSelected = selectedUrl === item.secure_url;
                return (
                  <div
                    key={item.public_id}
                    onClick={() => setSelectedUrl(item.secure_url)}
                    className={`group relative aspect-square rounded-xl border overflow-hidden cursor-pointer transition ${
                      isSelected
                        ? "border-[#7C3AED] ring-2 ring-[#7C3AED]/60"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={item.secure_url}
                      alt={item.public_id}
                      fill
                      sizes="200px"
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />

                    {/* Gradient Overlay & Details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2 flex flex-col justify-end">
                      <p className="text-[10px] font-mono text-white truncate">{item.public_id}</p>
                      <p className="text-[9px] text-gray-400">
                        {item.width} x {item.height} · {item.format.toUpperCase()}
                      </p>
                    </div>

                    {/* Selection Check Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shadow-lg border border-white/20">
                        <FaCheck className="text-xs" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
          <span className="text-xs text-gray-400">
            {filteredResources.length} image{filteredResources.length !== 1 ? "s" : ""} found
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedUrl}
              className="px-5 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-xs font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(124,58,237,0.3)]"
            >
              Select Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
