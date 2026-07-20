import fs from "fs";
import path from "path";
import matter from "gray-matter";

const rootDir = process.cwd();
const blogDirectory = path.join(rootDir, "content", "blog");
const portfolioDirectory = path.join(rootDir, "content", "portfolio");

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  category: string;
  excerpt: string;
  readTime?: string;
}

export interface BlogPostData extends BlogPostMeta {
  content: string;
}

export interface CaseStudyMeta {
  slug: string;
  title: string;
  client?: string;
  date: string;
  tags: string[];
  category: string;
  excerpt: string;
  context?: string;
  methodology?: string;
  vulnerabilities?: string;
  remediation?: string;
  businessResult?: string;
}

export interface CaseStudyData extends CaseStudyMeta {
  content: string;
}

// ---------------- BLOG HELPERS ----------------

export function getBlogPosts(): BlogPostMeta[] {
  if (!fs.existsSync(blogDirectory)) return [];

  const files = fs.readdirSync(blogDirectory).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx?$/, "");
    const filePath = path.join(blogDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      tags: data.tags || [],
      category: data.category || "Security",
      excerpt: data.excerpt || "",
      readTime: data.readTime || "5 min read",
    };
  });

  return posts.sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
}

export function getBlogPostBySlug(slug: string): BlogPostData | null {
  if (!fs.existsSync(blogDirectory)) return null;

  const extensions = [".mdx", ".md"];
  let filePath = "";
  for (const ext of extensions) {
    const fullPath = path.join(blogDirectory, `${slug}${ext}`);
    if (fs.existsSync(fullPath)) {
      filePath = fullPath;
      break;
    }
  }

  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    tags: data.tags || [],
    category: data.category || "Security",
    excerpt: data.excerpt || "",
    readTime: data.readTime || "5 min read",
    content,
  };
}

export function getAllBlogTags(): string[] {
  const posts = getBlogPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag.toLowerCase()));
  });

  return Array.from(tagSet);
}

export function getBlogPostsByTag(tag: string): BlogPostMeta[] {
  const posts = getBlogPosts();
  const targetTag = tag.toLowerCase();

  return posts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === targetTag)
  );
}

// ---------------- PORTFOLIO / CASE STUDY HELPERS ----------------

export function getPortfolioCaseStudies(): CaseStudyMeta[] {
  if (!fs.existsSync(portfolioDirectory)) return [];

  const files = fs.readdirSync(portfolioDirectory).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const studies = files.map((filename) => {
    const slug = filename.replace(/\.mdx?$/, "");
    const filePath = path.join(portfolioDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      client: data.client || "",
      date: data.date || "",
      tags: data.tags || [],
      category: data.category || "cybersecurity",
      excerpt: data.excerpt || "",
      context: data.context || "",
      methodology: data.methodology || "",
      vulnerabilities: data.vulnerabilities || "",
      remediation: data.remediation || "",
      businessResult: data.businessResult || "",
    };
  });

  return studies.sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
}

export function getPortfolioCaseStudyBySlug(slug: string): CaseStudyData | null {
  if (!fs.existsSync(portfolioDirectory)) return null;

  const extensions = [".mdx", ".md"];
  let filePath = "";
  for (const ext of extensions) {
    const fullPath = path.join(portfolioDirectory, `${slug}${ext}`);
    if (fs.existsSync(fullPath)) {
      filePath = fullPath;
      break;
    }
  }

  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || slug,
    client: data.client || "",
    date: data.date || "",
    tags: data.tags || [],
    category: data.category || "cybersecurity",
    excerpt: data.excerpt || "",
    context: data.context || "",
    methodology: data.methodology || "",
    vulnerabilities: data.vulnerabilities || "",
    remediation: data.remediation || "",
    businessResult: data.businessResult || "",
    content,
  };
}
