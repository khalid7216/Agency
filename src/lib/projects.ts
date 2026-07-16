import fs from "fs/promises";
import path from "path";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string; // 'cybersecurity' | 'web-dev' | 'video'
  tags: string[];
  border: string;
  glow: string;
  imageUrl?: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/projects.json");

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error: unknown) {
    // If the file does not exist, return an empty array
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }
    console.error("Error reading projects database:", error);
    throw error;
  }
}

export async function saveProjects(projects: Project[]): Promise<void> {
  try {
    // Ensure parent directories exist
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    
    // Write formatted JSON to file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(projects, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to projects database:", error);
    throw error;
  }
}

export async function addProject(project: Omit<Project, "id">): Promise<Project> {
  const projects = await getProjects();
  
  // Create a clean URL/Slug-based ID or unique timestamped ID
  const slug = project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  
  const id = `${slug}-${Date.now().toString().slice(-6)}`;
  
  const newProject: Project = {
    ...project,
    id,
  };
  
  projects.push(newProject);
  await saveProjects(projects);
  return newProject;
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === id);
  
  if (index === -1) {
    return false;
  }
  
  projects.splice(index, 1);
  await saveProjects(projects);
  return true;
}
