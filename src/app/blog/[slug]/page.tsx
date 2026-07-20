import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const blogPosts = [
  {
    slug: "wordpress-security-checklist-2025",
    title: "WordPress Security Checklist 2025",
    excerpt: "A practical checklist covering the most common WordPress vulnerabilities and how to fix them before attackers exploit them.",
    category: "Security",
    date: "June 15, 2025",
    readTime: "5 min read",
    tags: ["WordPress", "VAPT", "Security"],
    content: [
      {
        heading: "Why WordPress Sites Get Hacked",
        body: "WordPress powers over 40% of the web, making it a prime target for attackers. Most hacks are automated bots scanning for outdated plugins, weak passwords, or known vulnerabilities. The good news is that most of these attacks are preventable with basic security hygiene."
      },
      {
        heading: "1. Keep Everything Updated",
        body: "Outdated cores, plugins, and themes are the #1 entry point for attackers. Enable automatic updates for minor releases and review major updates on a staging environment before deploying. Remove any plugin or theme you are not actively using."
      },
      {
        heading: "2. Use Strong Admin Credentials",
        body: "Never use 'admin' as a username or 'admin' as a password. Use a unique username and a password manager to generate a strong 16+ character password. Enforce this for all users with editor or administrator roles."
      },
      {
        heading: "3. Limit Login Attempts",
        body: "Install a plugin like Limit Login Attempts Reloaded or Wordfence to cap failed login attempts. This blocks brute-force attacks by temporarily locking out IPs after a set number of failures."
      },
      {
        heading: "4. Disable XML-RPC",
        body: "XML-RPC is a legacy feature that allows remote access to your WordPress site. It is a common vector for brute-force and DDoS attacks. Disable it unless you specifically need it for the WordPress mobile app or Jetpack."
      },
      {
        heading: "5. Check File Permissions",
        body: "Ensure file permissions are set correctly: files should be 644 and directories should be 755. The wp-config.php file should be set to 600 or 440 to prevent unauthorized reading of database credentials."
      },
      {
        heading: "6. Install a Security Plugin",
        body: "Wordfence, Sucuri, and iThemes Security are reliable options. They provide firewall protection, malware scanning, login security, and real-time threat monitoring. Configure them according to your site's specific needs."
      },
      {
        heading: "7. Regular Backups",
        body: "Schedule automated offsite backups to cloud storage (Google Drive, Dropbox, or S3). Test your backups regularly by restoring them on a staging environment. A good backup is useless if you have never verified it works."
      },
      {
        heading: "Conclusion",
        body: "WordPress security does not have to be complicated. Start with these seven steps and you will eliminate the majority of attack vectors. For a thorough audit, consider hiring a professional penetration tester to identify issues automated scanners miss."
      }
    ]
  },
  {
    slug: "how-to-find-xss-in-web-apps",
    title: "How to Find XSS Vulnerabilities in Web Apps",
    excerpt: "A step-by-step guide to identifying Cross-Site Scripting vulnerabilities using manual testing and Burp Suite.",
    category: "Security",
    date: "June 20, 2025",
    readTime: "8 min read",
    tags: ["XSS", "Burp Suite", "OWASP"],
    content: [
      {
        heading: "What is XSS?",
        body: "Cross-Site Scripting (XSS) is a vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users. It occurs when an application includes user-supplied data in its output without proper validation or escaping."
      },
      {
        heading: "Types of XSS",
        body: "Reflected XSS — the payload is reflected off a web server in an error message, search result, or response. Stored XSS — the payload is stored on the server (e.g., in a comment or profile field) and served to every visitor. DOM-based XSS — the vulnerability exists in client-side JavaScript rather than server-side HTML."
      },
      {
        heading: "Setting Up Burp Suite",
        body: "Configure your browser to route traffic through Burp Suite's proxy (usually 127.0.0.1:8080). Install Burp's CA certificate to intercept HTTPS traffic. Use the Target tab to map the application and the Repeater tool to manually craft and resend requests."
      },
      {
        heading: "Manual Testing Approach",
        body: "Start with input fields, URL parameters, and HTTP headers. Submit simple test strings like <script>alert(1)</script> and watch for script execution. Check if the output is reflected anywhere in the page — in HTML attributes, JavaScript strings, or CSS."
      },
      {
        heading: "Common XSS Payloads",
        body: "Try payloads like <img src=x onerror=alert(1)>, <svg onload=alert(1)>, and <input onfocus=alert(1) autofocus>. For context-specific tests, try breaking out of existing HTML attributes: \"><script>alert(1)</script> or ' onfocus=alert(1) autofocus='. Use Burp Intruder to automate payload testing across multiple injection points."
      },
      {
        heading: "How to Fix XSS",
        body: "Output encoding is the primary defense. Encode data based on the output context: HTML entity encoding for HTML body, JavaScript encoding for script contexts, and URL encoding for URL parameters. Implement a Content Security Policy (CSP) header as a defense-in-depth measure."
      },
      {
        heading: "Conclusion",
        body: "XSS remains one of the most common web vulnerabilities. With Burp Suite and a systematic manual testing approach, you can identify and fix XSS before attackers exploit them. Always validate input and encode output."
      }
    ]
  },
  {
    slug: "nextjs-14-best-practices",
    title: "Next.js 14 Best Practices for Production",
    excerpt: "Key patterns and optimizations for building production-ready Next.js 14 applications with App Router.",
    category: "Development",
    date: "June 25, 2025",
    readTime: "6 min read",
    tags: ["Next.js", "React", "TypeScript"],
    content: [
      {
        heading: "App Router vs Pages Router",
        body: "Next.js 14 introduces the App Router as the recommended approach for new projects. It uses a file-system based routing model with nested layouts, server components by default, and streaming support. The Pages Router remains supported but is no longer recommended for new projects."
      },
      {
        heading: "Server Components by Default",
        body: "Components in the App Router are server components by default. They render on the server and send only the resulting HTML to the client. This reduces bundle size and improves performance. Use the 'use client' directive only when you need interactivity — event handlers, hooks, or browser-only APIs."
      },
      {
        heading: "Proper Error Handling",
        body: "Create error.tsx and not-found.tsx files at each route segment to handle errors gracefully. Error boundaries catch runtime errors and display fallback UI. The not-found.tsx file handles 404 cases. Combine these with global-error.tsx for the root layout to catch unexpected crashes."
      },
      {
        heading: "Image Optimization",
        body: "Use the built-in next/image component for automatic image optimization. It supports lazy loading, responsive images, and WebP/AVIF format negotiation. Configure remote patterns in next.config.mjs for external image hosts. Always provide width, height, and alt attributes."
      },
      {
        heading: "Environment Variables",
        body: "Prefix public environment variables with NEXT_PUBLIC_ to expose them to the browser. Use .env.local for local development secrets and .env.production for production values. Access them via process.env — Next.js replaces them at build time for client-side code."
      },
      {
        heading: "Deployment on Vercel",
        body: "Vercel is the recommended deployment platform for Next.js. It provides automatic SSL, edge functions, ISR (Incremental Static Regeneration), and preview deployments for every git branch. Configure your build settings in vercel.json or the Vercel dashboard."
      },
      {
        heading: "Conclusion",
        body: "Next.js 14's App Router offers a powerful model for building modern web applications. By following these best practices — server components, error handling, image optimization, and proper deployment — you can build applications that are fast, maintainable, and production-ready."
      }
    ]
  }
];

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: "Post Not Found — AuditWave Security",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} — AuditWave Security Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://khalidsanawer.online/blog/${post.slug}`,
    },
  };
}

export default function BlogPost({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Khalid Sanawer",
      "url": "https://khalidsanawer.online"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AuditWave Security",
      "url": "https://khalidsanawer.online"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://khalidsanawer.online/blog/${post.slug}`
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0E1A] text-white py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[38rem] h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
      </div>

      {/* Back Button */}
      <section className="px-4 sm:px-6 pt-6">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition">
            ← Back to Blog
          </Link>
        </div>
      </section>

      {/* Post Header */}
      <section className="px-4 sm:px-6 pt-8 pb-10">
        <div className="mx-auto max-w-3xl">
          {/* Category, date, read time */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${post.category === "Security" ? "bg-[#7C3AED]" : "bg-blue-500"}`}>
              {post.category}
            </span>
            <span className="text-xs text-gray-500">{post.date}</span>
            <span className="text-xs text-gray-500">·</span>
            <span className="text-xs text-gray-500">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-md border border-white/10 bg-[#0A0E1A] px-2.5 py-1 text-xs text-gray-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="border-t border-white/5" />
        </div>
      </section>

      {/* Article Content */}
      <article className="px-4 sm:px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          {post.content.map((section, i) => (
            <div key={i}>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">{section.heading}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">{section.body}</p>
            </div>
          ))}
        </div>
      </article>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-16 border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Need a security audit for your site?</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Let me help you identify vulnerabilities before attackers do.
          </p>
          <a href="/contact" className="inline-block rounded-xl bg-[#7C3AED] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-[#6D28D9]">
            Get a Free Quote
          </a>
        </div>
      </section>
    </main>
  );
}
