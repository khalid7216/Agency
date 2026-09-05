import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.ADMIN_JWT_SECRET;

    if (!expectedUsername || !expectedPassword || !jwtSecret) {
      console.error("ADMIN_USERNAME, ADMIN_PASSWORD, or ADMIN_JWT_SECRET is not configured in environment variables.");
      return NextResponse.json(
        { error: "Server authentication configuration error." },
        { status: 500 }
      );
    }

    if (
      typeof username === "string" &&
      typeof password === "string" &&
      username === expectedUsername &&
      password === expectedPassword
    ) {
      setSessionCookie();
      return NextResponse.json({ success: true, message: "Logged in successfully" });
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
