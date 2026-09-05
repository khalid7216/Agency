import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { checkAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface CloudinaryApiResource {
  public_id: string;
  secure_url: string;
  format: string;
  created_at: string;
  width: number;
  height: number;
}

interface CloudinaryListResponse {
  resources?: CloudinaryApiResource[];
  next_cursor?: string;
}

interface CloudinarySearchResponse {
  total_count?: number;
  resources?: CloudinaryApiResource[];
}

export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: "Unauthorized access. Please login first." }, { status: 401 });
  }

  const resources: CloudinaryApiResource[] = [];

  try {
    // 1. Attempt Search API using configured client
    const searchRes = (await cloudinary.search
      .expression("")
      .max_results(100)
      .execute()) as CloudinarySearchResponse;

    if (searchRes.resources && searchRes.resources.length > 0) {
      resources.push(...searchRes.resources);
    }
  } catch (err) {
    console.warn("Cloudinary search API error, falling back to Admin API:", err);
  }

  // 2. Fallback to Admin API resources if search returns nothing
  if (resources.length === 0) {
    try {
      const adminRes = (await cloudinary.api.resources({
        resource_type: "image",
        type: "upload",
        max_results: 100,
      })) as CloudinaryListResponse;

      if (adminRes.resources) {
        resources.push(...adminRes.resources);
      }
    } catch (err) {
      console.error("Cloudinary admin resources API error:", err);
    }
  }

  const finalResources = resources.map((res) => ({
    public_id: res.public_id,
    secure_url: res.secure_url,
    format: res.format,
    created_at: res.created_at,
    width: res.width,
    height: res.height,
  }));

  return NextResponse.json({
    success: true,
    total_count: finalResources.length,
    resources: finalResources,
  });
}
