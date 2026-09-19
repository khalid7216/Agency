import { NextResponse } from "next/server";
import { updateMember, deleteMember, getMemberById } from "@/lib/team";
import { checkAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Props) {
  try {
    const { id } = await params;
    const member = await getMemberById(id);
    if (!member) {
      return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    console.error("GET team member API error:", error);
    return NextResponse.json({ error: "Failed to fetch team member." }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Props) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access. Please login first." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { name, role, badge, bio, imageUrl, skills, order } = body;

    const updatedMember = await updateMember(id, {
      ...(name ? { name } : {}),
      ...(role ? { role } : {}),
      ...(badge !== undefined ? { badge } : {}),
      ...(bio !== undefined ? { bio } : {}),
      ...(imageUrl !== undefined ? { imageUrl } : {}),
      ...(Array.isArray(skills) ? { skills } : {}),
      ...(order !== undefined ? { order: Number(order) } : {}),
    });

    if (!updatedMember) {
      return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, member: updatedMember });
  } catch (error: unknown) {
    console.error("PUT team member API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update team member.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Props) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access. Please login first." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const deleted = await deleteMember(id);

    if (!deleted) {
      return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Team member deleted successfully." });
  } catch (error) {
    console.error("DELETE team member API error:", error);
    return NextResponse.json({ error: "Failed to delete team member." }, { status: 500 });
  }
}
