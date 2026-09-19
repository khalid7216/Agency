import { NextResponse } from "next/server";
import { getMembers, addMember, updateMember, deleteMember } from "@/lib/team";
import { checkAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const members = await getMembers();
    return NextResponse.json(members);
  } catch (error) {
    console.error("GET team API error:", error);
    return NextResponse.json({ error: "Failed to fetch team members." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access. Please login first." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, role, badge, bio, imageUrl, skills, order } = body;

    if (!name || !role) {
      return NextResponse.json(
        { error: "Name and role are required." },
        { status: 400 }
      );
    }

    const newMember = await addMember({
      name,
      role,
      badge: badge || "Team Member",
      bio: bio || "",
      imageUrl: imageUrl || "",
      skills: Array.isArray(skills) ? skills : [],
      order: Number(order) || 1,
    });

    return NextResponse.json({ success: true, member: newMember }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST team API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create team member.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access. Please login first." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name, role, badge, bio, imageUrl, skills, order } = body;

    if (!id || !name || !role) {
      return NextResponse.json(
        { error: "Member ID, name, and role are required." },
        { status: 400 }
      );
    }

    const updatedMember = await updateMember(id, {
      name,
      role,
      badge: badge || "Team Member",
      bio: bio || "",
      imageUrl: imageUrl || "",
      skills: Array.isArray(skills) ? skills : [],
      order: Number(order) || 1,
    });

    if (!updatedMember) {
      return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, member: updatedMember });
  } catch (error: unknown) {
    console.error("PUT team API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update team member.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access. Please login first." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Team member ID is required." }, { status: 400 });
    }

    const deleted = await deleteMember(id);

    if (!deleted) {
      return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Team member deleted successfully." });
  } catch (error) {
    console.error("DELETE team API error:", error);
    return NextResponse.json({ error: "Failed to delete team member." }, { status: 500 });
  }
}
