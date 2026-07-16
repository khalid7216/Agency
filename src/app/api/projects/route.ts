import { NextResponse } from "next/server";
import { getProjects, addProject, deleteProject } from "@/lib/projects";

export async function GET() {
  try {
    const projects = await getProjects();
    // Return projects in reverse order (newest first)
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET projects API error:", error);
    return NextResponse.json({ error: "Failed to fetch projects." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, category, tags, border, glow, imageUrl } = body;

    // Validation
    if (!title || !description || !category) {
      return NextResponse.json(
        { error: "Title, description, and category are required." },
        { status: 400 }
      );
    }

    const newProject = await addProject({
      title,
      description,
      category,
      tags: Array.isArray(tags) ? tags : [],
      border: border || "border-t-[#7C3AED]",
      glow: glow || "shadow-[0_-4px_24px_rgba(124,58,237,0.15)] hover:shadow-[0_-4px_24px_rgba(124,58,237,0.3)]",
      imageUrl: imageUrl || "",
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST projects API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create project.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID is required." }, { status: 400 });
    }

    const deleted = await deleteProject(id);

    if (!deleted) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    console.error("DELETE project API error:", error);
    return NextResponse.json({ error: "Failed to delete project." }, { status: 500 });
  }
}
