"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCode,
  FaExclamationTriangle,
  FaImage,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaShieldAlt,
  FaSpinner,
  FaTimes,
  FaTrash,
  FaUpload,
  FaVideo,
} from "react-icons/fa";
import CloudinaryImagePicker from "@/components/CloudinaryImagePicker";

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

const colorPresets = [
  {
    name: "Purple Theme",
    value: "purple",
    border: "border-t-[#7C3AED]",
    glow: "shadow-[0_-4px_24px_rgba(124,58,237,0.15)] hover:shadow-[0_-4px_24px_rgba(124,58,237,0.3)]",
    colorClass: "bg-[#7C3AED]",
    selectedClass: "border-[#7C3AED] ring-2 ring-[#7C3AED]/50 bg-[#7C3AED]/15 shadow-[0_0_20px_rgba(124,58,237,0.35)] text-white font-semibold",
  },
  {
    name: "Blue Theme",
    value: "blue",
    border: "border-t-blue-500",
    glow: "shadow-[0_-4px_24px_rgba(59,130,246,0.15)] hover:shadow-[0_-4px_24px_rgba(59,130,246,0.3)]",
    colorClass: "bg-blue-500",
    selectedClass: "border-blue-500 ring-2 ring-blue-500/50 bg-blue-500/15 shadow-[0_0_20px_rgba(59,130,246,0.35)] text-white font-semibold",
  },
  {
    name: "Pink Theme",
    value: "pink",
    border: "border-t-pink-500",
    glow: "shadow-[0_-4px_24px_rgba(236,72,153,0.15)] hover:shadow-[0_-4px_24px_rgba(236,72,153,0.3)]",
    colorClass: "bg-pink-500",
    selectedClass: "border-pink-500 ring-2 ring-pink-500/50 bg-pink-500/15 shadow-[0_0_20px_rgba(236,72,153,0.35)] text-white font-semibold",
  },
];

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Form State
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("web-dev");
  const [tagsInput, setTagsInput] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("purple");
  const [imageUrl, setImageUrl] = useState("");

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Filtered projects
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filterCategory === "all" || project.category === filterCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      (Array.isArray(project.tags) && project.tags.some((tag) => tag.toLowerCase().includes(q)));
    return matchesCategory && matchesSearch;
  });

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
      setConfigError(null);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch("/api/admin/check");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchProjects();
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };
    verifyAuth();
  }, []);

  // Handle Login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput.trim(), password: passwordInput.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      setIsAuthenticated(true);
      fetchProjects();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid credentials";
      setLoginError(msg);
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        setIsAuthenticated(false);
        setProjects([]);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Handle image upload to Cloudinary via backend API
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (Cloudinary max limit is 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setUploadError(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 10 MB.`);
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      // Read file as base64 Data URL
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject(new Error("Failed to process selected file."));
          }
        };
        reader.onerror = () => {
          reject(new Error("File reading failed."));
        };
        reader.readAsDataURL(file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64Data }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.configured === false) {
          setConfigError(result.error);
        }
        throw new Error(result.error || "Upload failed");
      }

      setImageUrl(result.url);
      setUploadSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image.";
      setUploadError(msg);
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  // Start editing a project
  const handleStartEdit = (project: Project) => {
    setEditingProjectId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setCategory(project.category);
    setTagsInput(project.tags ? project.tags.join(", ") : "");
    const matched = colorPresets.find(
      (p) => p.border === project.border || p.value === project.border
    );
    setSelectedPreset(matched ? matched.value : "purple");
    setImageUrl(project.imageUrl || "");
    setUploadSuccess(false);
    setUploadError(null);

    // Scroll to form if on mobile/smaller screens
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setTitle("");
    setDescription("");
    setCategory("web-dev");
    setTagsInput("");
    setSelectedPreset("purple");
    setImageUrl("");
    setUploadSuccess(false);
    setUploadError(null);
  };

  // Submit project (Add or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category) {
      alert("Please fill out all required fields.");
      return;
    }

    setFormLoading(true);
    const preset = colorPresets.find((p) => p.value === selectedPreset) || colorPresets[0];
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    try {
      const isEditing = Boolean(editingProjectId);
      const endpoint = "/api/projects";
      const method = isEditing ? "PUT" : "POST";
      const payload = {
        ...(isEditing ? { id: editingProjectId } : {}),
        title,
        description,
        category,
        tags,
        border: preset.border,
        glow: preset.glow,
        imageUrl,
      };

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || (isEditing ? "Failed to update project" : "Failed to save project"));
      }

      // Reset form
      handleCancelEdit();

      // Refresh list
      await fetchProjects();
      alert(isEditing ? "Project updated successfully!" : "Project added successfully!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      alert(msg);
    } finally {
      setFormLoading(false);
    }
  };

  // Delete project
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete project");
      }

      if (editingProjectId === id) {
        handleCancelEdit();
      }

      await fetchProjects();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete.";
      alert(msg);
    }
  };

  // 1. Loading State
  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex flex-col items-center justify-center font-sans relative">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
          <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
        </div>
        <FaSpinner className="animate-spin text-4xl text-[#7C3AED] mb-4" />
        <p className="text-gray-400 text-sm tracking-wide">Securing connection...</p>
      </main>
    );
  }

  // 2. Unauthenticated State (Login Page)
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex flex-col items-center justify-center p-4 font-sans relative">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
          <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
        </div>

        <div className="w-full max-w-md bg-white/[0.02] border border-white/10 p-8 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-[#7C3AED] to-pink-500" />
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black tracking-tight text-white mb-2">Access Portal</h1>
            <p className="text-xs text-gray-400">Authenticate to manage your agency-site dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                required
                placeholder="Enter username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-[#0D1120] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-[#0D1120] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition"
              />
            </div>

            {loginError && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-2">
                <FaExclamationTriangle className="shrink-0 text-sm" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] px-4 py-3.5 text-sm font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              {loginLoading ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  Authenticating...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
            >
              <FaArrowLeft className="w-2.5 h-2.5" />
              Back to Home
            </a>
          </div>
        </div>
      </main>
    );
  }

  // 3. Authenticated State (Dashboard Page)
  return (
    <main className="min-h-screen bg-[#0A0E1A] text-white overflow-x-hidden font-sans">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
      </div>

      <header className="border-b border-white/5 bg-[#0D1120]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/portfolio"
              className="p-2 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition"
            >
              <FaArrowLeft className="w-3.5 h-3.5" />
            </a>
            <h1 className="text-lg font-bold text-[#7C3AED]">Portfolio Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[#C4B5FD] px-3 py-1 rounded-full font-mono">
              Mode: Developer
            </div>
            <button
              onClick={handleLogout}
              className="text-xs border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 px-3 py-1.5 rounded-full font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Cloudinary Warning Card */}
        {configError && (
          <div className="mb-10 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl flex flex-col md:flex-row items-start gap-4">
            <span className="p-3 rounded-xl bg-yellow-500/20 text-yellow-400">
              <FaExclamationTriangle className="text-xl" />
            </span>
            <div>
              <h3 className="font-bold text-yellow-400 text-lg">Cloudinary Credentials Missing</h3>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                Images cannot be uploaded because your Cloudinary keys are not set up. To enable uploads:
              </p>
              <ul className="text-xs text-gray-400 list-decimal list-inside space-y-1 mt-2 font-mono">
                <li>Create a <code className="text-yellow-300">.env.local</code> file in your project root folder.</li>
                <li>Add your credentials: <code className="text-yellow-300">CLOUDINARY_CLOUD_NAME</code>, <code className="text-yellow-300">CLOUDINARY_API_KEY</code>, and <code className="text-yellow-300">CLOUDINARY_API_SECRET</code>.</li>
                <li>Restart your Next.js development server to apply the environment variables.</li>
              </ul>
            </div>
          </div>
        )}

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-[440px_1fr] xl:grid-cols-[460px_1fr] items-start">
          {/* Create / Edit Project Form Section - Sticky on large screens */}
          <section className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-7 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#7C3AED]/20 text-[#7C3AED]">
                  {editingProjectId ? <FaPencilAlt className="text-sm" /> : <FaPlus className="text-sm" />}
                </span>
                {editingProjectId ? "Edit Project" : "Add New Project"}
              </h2>
              {editingProjectId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title input */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Finance App Dashboard"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-11 bg-[#0D1120] border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Project Description *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Summarize the project accomplishments, tech details, or VAPT audit results..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#0D1120] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Category Select */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 bg-[#0D1120] border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition cursor-pointer"
                  >
                    <option value="cybersecurity">Cybersecurity / VAPT</option>
                    <option value="web-dev">Web Development</option>
                    <option value="video">Video Production</option>
                  </select>
                </div>

                {/* Tags Comma separated */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Next.js, Burp Suite, Premiere Pro"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full h-11 bg-[#0D1120] border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition"
                  />
                </div>
              </div>

              {/* Theme Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Glow Theme Preset
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {colorPresets.map((preset) => {
                    const isSelected = selectedPreset === preset.value;
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setSelectedPreset(preset.value)}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-xl border transition-all ${
                          isSelected
                            ? preset.selectedClass
                            : "border-white/10 bg-[#0D1120] text-gray-400 hover:text-gray-200 hover:border-white/20"
                        }`}
                      >
                        <span className="text-xs">{preset.name}</span>
                        <div className="flex items-center gap-1.5">
                          {isSelected && <FaCheckCircle className="text-[11px] text-white" />}
                          <span
                            className={`w-3 h-3 rounded-full ${preset.colorClass} ${
                              isSelected ? "ring-2 ring-white/40" : ""
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Unified Cover Image Upload Zone */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Project Cover Image (via Cloudinary)
                  </label>
                  <button
                    type="button"
                    onClick={() => setPickerOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#C4B5FD] hover:text-white bg-[#7C3AED]/15 hover:bg-[#7C3AED]/25 border border-[#7C3AED]/30 px-3 py-1 rounded-lg transition"
                  >
                    <FaImage className="text-xs" /> Choose from Library
                  </button>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />

                {imageUrl ? (
                  /* Unified Inline Preview */
                  <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/10 bg-[#0D1120] group shadow-inner">
                    <Image
                      src={imageUrl}
                      alt="Cover image preview"
                      fill
                      className="object-cover transition group-hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 flex flex-col justify-between p-3.5 opacity-90 group-hover:opacity-100 transition">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                          <FaCheckCircle className="text-[10px]" /> {uploadSuccess ? "Uploaded to Cloudinary!" : "Cover Image Ready"}
                        </span>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="file-upload"
                            className="inline-flex items-center gap-1 text-xs bg-black/60 hover:bg-[#7C3AED] text-white border border-white/20 px-2.5 py-1 rounded-lg cursor-pointer transition backdrop-blur-md"
                            title="Replace image"
                          >
                            <FaUpload className="text-[10px]" /> Replace
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setImageUrl("");
                              setUploadSuccess(false);
                            }}
                            className="p-1.5 rounded-lg bg-black/60 hover:bg-red-500/80 text-gray-300 hover:text-white border border-white/20 transition backdrop-blur-md"
                            title="Remove image"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-300 truncate font-mono bg-black/60 px-2 py-1 rounded-md backdrop-blur-md border border-white/5">
                        {imageUrl}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Unified Empty Dropzone */
                  <label
                    htmlFor="file-upload"
                    className={`flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-[#7C3AED]/50 rounded-xl p-6 sm:p-7 cursor-pointer bg-[#0D1120]/50 hover:bg-[#0D1120] transition text-center group ${
                      uploading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {uploading ? (
                      <>
                        <FaSpinner className="animate-spin text-2xl text-[#7C3AED] mb-2" />
                        <p className="text-xs font-medium text-[#C4B5FD]">Uploading image to Cloudinary...</p>
                        <p className="text-[10px] text-gray-500 mt-1">Please wait a moment</p>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center text-[#C4B5FD] mb-2 group-hover:scale-110 group-hover:bg-[#7C3AED]/20 transition">
                          <FaUpload className="text-sm" />
                        </div>
                        <p className="text-xs font-medium text-gray-200">
                          Drag & drop or <span className="text-[#C4B5FD] underline decoration-dotted">browse</span> to upload cover
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1">PNG, JPG, WebP or GIF up to 5MB</p>
                      </>
                    )}
                  </label>
                )}

                {uploadError && <p className="text-xs text-red-400 mt-2">Error: {uploadError}</p>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={formLoading || uploading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] px-4 py-3.5 text-sm font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(124,58,237,0.3)] mt-2"
              >
                {formLoading ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    {editingProjectId ? "Updating Project..." : "Saving Project..."}
                  </>
                ) : editingProjectId ? (
                  <>
                    <FaPencilAlt className="text-xs" />
                    Update Project
                  </>
                ) : (
                  <>
                    <FaPlus className="text-xs" />
                    Save & Publish Project
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Manage Projects Section - Scrolls independently */}
          <section className="flex flex-col min-w-0 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-7 backdrop-blur-md">
            {/* Search + Category Filter Toolbar */}
            <div className="space-y-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search by title, description, or #tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0D1120] border border-white/10 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 text-xs"
                      title="Clear search"
                    >
                      <FaTimes className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>

                <div className="sm:w-48 shrink-0">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full bg-[#0D1120] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="cybersecurity">Cybersecurity / VAPT</option>
                    <option value="web-dev">Web Development</option>
                    <option value="video">Video Production</option>
                  </select>
                </div>
              </div>

              {/* Header with Project Count & Active Filter Indicator */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-[#7C3AED]/20 text-[#7C3AED]">
                    <FaCode className="text-sm" />
                  </span>
                  Existing Projects
                  <span className="text-xs font-mono font-normal bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-gray-300">
                    {filteredProjects.length}
                    {filteredProjects.length !== projects.length ? ` / ${projects.length}` : ""}
                  </span>
                </h2>

                {(searchQuery || filterCategory !== "all") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setFilterCategory("all");
                    }}
                    className="text-xs text-[#C4B5FD] hover:text-white hover:underline transition"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex-grow flex flex-col items-center justify-center py-20 text-gray-500">
                <FaSpinner className="animate-spin text-3xl text-[#7C3AED] mb-3" />
                <p className="text-sm">Loading projects from database...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center py-20 text-gray-500 border border-dashed border-white/5 rounded-xl">
                <FaImage className="text-4xl mb-3" />
                <p className="text-sm">No projects found. Add one on the left!</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center py-16 text-gray-500 border border-dashed border-white/5 rounded-xl text-center px-4">
                <FaSearch className="text-3xl mb-3 text-gray-600" />
                <p className="text-sm text-gray-300 font-medium">No matching projects found</p>
                <p className="text-xs text-gray-500 mt-1">Try adjusting your search or category filter</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterCategory("all");
                  }}
                  className="mt-3 text-xs bg-[#7C3AED]/20 text-[#C4B5FD] border border-[#7C3AED]/30 px-3 py-1.5 rounded-lg hover:bg-[#7C3AED]/30 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto max-h-[calc(100vh-14rem)] pr-1.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className={`relative flex flex-col justify-between p-4 border rounded-xl bg-[#0D1120]/50 hover:bg-[#0D1120]/80 transition group ${
                        editingProjectId === project.id
                          ? "border-[#7C3AED] ring-1 ring-[#7C3AED]/50 bg-[#7C3AED]/5"
                          : "border-white/5 hover:border-white/15"
                      }`}
                    >
                      {/* Top row: Thumbnail + Details + Action buttons */}
                      <div className="flex items-start gap-3">
                        {/* Project thumbnail */}
                        <div className="w-14 h-14 shrink-0 relative bg-[#080D1A] rounded-lg border border-white/5 overflow-hidden flex items-center justify-center">
                          {project.imageUrl ? (
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <span className="text-[#C4B5FD]/70">
                              {project.category === "cybersecurity" && <FaShieldAlt className="text-lg" />}
                              {project.category === "web-dev" && <FaCode className="text-lg" />}
                              {project.category === "video" && <FaVideo className="text-lg" />}
                            </span>
                          )}
                        </div>

                        {/* Project details */}
                        <div className="flex-grow min-w-0 pr-14">
                          <h3 className="font-bold text-sm truncate text-white" title={project.title}>
                            {project.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2" title={project.description}>
                            {project.description}
                          </p>
                        </div>

                        {/* Quick Edit/Delete action icons (top-right of card) */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(project)}
                            className="p-1.5 rounded-lg border border-white/10 bg-[#0D1120] text-gray-400 hover:text-[#C4B5FD] hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/20 transition shadow-sm"
                            title="Edit project"
                          >
                            <FaPencilAlt className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(project.id)}
                            className="p-1.5 rounded-lg border border-white/10 bg-[#0D1120] text-gray-400 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/20 transition shadow-sm"
                            title="Delete project"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Bottom row: Category badge & Tags */}
                      <div className="flex items-center flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                          {project.category}
                        </span>
                        {Array.isArray(project.tags) &&
                          project.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] text-[#C4B5FD] font-medium bg-[#7C3AED]/10 px-1.5 py-0.5 rounded border border-[#7C3AED]/20"
                            >
                              #{tag}
                            </span>
                          ))}
                        {Array.isArray(project.tags) && project.tags.length > 2 && (
                          <span className="text-[10px] text-gray-500">
                            +{project.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <CloudinaryImagePicker
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(selectedUrl) => {
          setImageUrl(selectedUrl);
          setUploadSuccess(true);
        }}
      />
    </main>
  );
}
