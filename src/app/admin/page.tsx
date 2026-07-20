"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCode,
  FaExclamationTriangle,
  FaImage,
  FaPlus,
  FaShieldAlt,
  FaSpinner,
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
  },
  {
    name: "Blue Theme",
    value: "blue",
    border: "border-t-blue-500",
    glow: "shadow-[0_-4px_24px_rgba(59,130,246,0.15)] hover:shadow-[0_-4px_24px_rgba(59,130,246,0.3)]",
    colorClass: "bg-blue-500",
  },
  {
    name: "Pink Theme",
    value: "pink",
    border: "border-t-pink-500",
    glow: "shadow-[0_-4px_24px_rgba(236,72,153,0.15)] hover:shadow-[0_-4px_24px_rgba(236,72,153,0.3)]",
    colorClass: "bg-pink-500",
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("web-dev");
  const [tagsInput, setTagsInput] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("purple");
  const [imageUrl, setImageUrl] = useState("");

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
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
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

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Data = reader.result;

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
      };
      reader.onerror = () => {
        throw new Error("File reading failed");
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image.";
      setUploadError(msg);
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // Submit new project
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
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          tags,
          border: preset.border,
          glow: preset.glow,
          imageUrl,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save project");
      }

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("web-dev");
      setTagsInput("");
      setSelectedPreset("purple");
      setImageUrl("");
      setUploadSuccess(false);

      // Refresh list
      await fetchProjects();
      alert("Project added successfully!");
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
                placeholder="admin@khalidsanawer.security.online"
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

        <div className="grid gap-10 grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Create Project Form Section */}
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#7C3AED]/20 text-[#7C3AED]">
                <FaPlus className="text-sm" />
              </span>
              Add New Project
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full bg-[#0D1120] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition"
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
                  className="w-full bg-[#0D1120] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Category Select */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0D1120] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7C3AED] transition"
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
                    className="w-full bg-[#0D1120] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7C3AED] transition"
                  />
                </div>
              </div>

              {/* Theme Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Glow Theme Preset
                </label>
                <div className="flex gap-4">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setSelectedPreset(preset.value)}
                      className={`flex-grow flex items-center justify-between px-4 py-3 rounded-xl border transition ${
                        selectedPreset === preset.value
                          ? "border-[#7C3AED] bg-[#7C3AED]/10 text-white"
                          : "border-white/5 bg-[#0D1120] text-gray-400 hover:text-white"
                      }`}
                    >
                      <span className="text-xs font-medium">{preset.name}</span>
                      <span className={`w-3.5 h-3.5 rounded-full ${preset.colorClass}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Image upload area */}
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

                <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_0.7fr] gap-6 items-center">
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      id="file-upload"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className={`flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-6 cursor-pointer bg-[#0D1120]/50 hover:bg-[#0D1120] hover:border-[#7C3AED]/50 transition text-center ${
                        uploading ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    >
                      {uploading ? (
                        <>
                          <FaSpinner className="animate-spin text-2xl text-[#7C3AED] mb-2" />
                          <p className="text-xs font-medium text-[#C4B5FD]">Uploading image to Cloudinary...</p>
                        </>
                      ) : uploadSuccess ? (
                        <>
                          <FaCheckCircle className="text-2xl text-emerald-400 mb-2" />
                          <p className="text-xs font-medium text-emerald-300">Successfully Uploaded!</p>
                          <p className="text-[10px] text-gray-500 mt-1 max-w-[200px] truncate">{imageUrl}</p>
                        </>
                      ) : (
                        <>
                          <FaUpload className="text-2xl text-gray-400 mb-2 group-hover:text-white transition" />
                          <p className="text-xs font-medium text-gray-300">Drag & drop or click to upload</p>
                          <p className="text-[10px] text-gray-500 mt-1">PNG, JPG or GIF up to 5MB</p>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Preview Image */}
                  <div className="flex flex-col items-center justify-center border border-white/5 bg-[#0D1120]/40 rounded-xl h-[120px] relative overflow-hidden">
                    {imageUrl ? (
                      <>
                        <Image
                          src={imageUrl}
                          alt="Cover image preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setImageUrl("")}
                          className="absolute top-2 right-2 bg-black/60 border border-white/15 p-1.5 rounded-lg hover:bg-red-500 hover:text-white transition"
                          title="Remove image"
                        >
                          <FaTrash className="w-2.5 h-2.5" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-gray-600">
                        <FaImage className="text-3xl" />
                        <span className="text-[10px]">No Image Preview</span>
                      </div>
                    )}
                  </div>
                </div>

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
                    Saving Project...
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

          {/* Manage Projects Section */}
          <section className="flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#7C3AED]/20 text-[#7C3AED]">
                <FaCode className="text-sm" />
              </span>
              Existing Projects ({projects.length})
            </h2>

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
            ) : (
              <div className="flex-grow overflow-y-auto space-y-4 max-h-[500px] pr-2">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 p-4 border border-white/5 bg-[#0D1120]/45 rounded-xl hover:border-white/10 transition group"
                  >
                    {/* Project thumbnail */}
                    <div className="w-16 h-16 shrink-0 relative bg-[#080D1A] rounded-lg border border-white/5 overflow-hidden flex items-center justify-center">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-[#C4B5FD]/70">
                          {project.category === "cybersecurity" && <FaShieldAlt className="text-xl" />}
                          {project.category === "web-dev" && <FaCode className="text-xl" />}
                          {project.category === "video" && <FaVideo className="text-xl" />}
                        </span>
                      )}
                    </div>

                    {/* Project details */}
                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold text-sm truncate text-white">{project.title}</h3>
                      <p className="text-xs text-gray-400 mt-1 truncate">{project.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                          {project.category}
                        </span>
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] text-[#C4B5FD] font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2.5 rounded-lg border border-white/5 bg-[#0D1120]/80 text-gray-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Delete project"
                    >
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
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
