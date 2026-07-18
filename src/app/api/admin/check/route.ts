import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const authenticated = checkAuth();
    return NextResponse.json({ authenticated });
  } catch (error) {
    console.error("Check Auth API Error:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
