import { NextResponse } from "next/server";
import { v2 as cloudinaryRoot } from "cloudinary";
import cloudinary from "@/lib/cloudinary";
import { checkAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Initialize temporary Root instance to test Root key permissions
cloudinaryRoot.config({
  cloud_name: "dwo1whvr8",
  api_key: "369479721517498",
  api_secret: "qu3cED5NSxcg1-jcPXy5ssM58_k",
  secure: true,
});

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

  const rootTestReport: Record<string, unknown> = {};
  const rootResources: CloudinaryApiResource[] = [];

  // 1. Run Search API with Root Key
  try {
    const rootSearchRes = (await cloudinaryRoot.search
      .expression("")
      .max_results(100)
      .execute()) as CloudinarySearchResponse;

    rootTestReport["root_search_broad"] = {
      total_count: rootSearchRes.total_count,
      count: rootSearchRes.resources?.length || 0,
    };

    if (rootSearchRes.resources) {
      rootResources.push(...rootSearchRes.resources);
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    rootTestReport["root_search_broad"] = { error: msg };
  }

  // 2. Run Admin API resources with Root Key
  try {
    const rootAdminRes = (await cloudinaryRoot.api.resources({
      resource_type: "image",
      type: "upload",
      max_results: 100,
    })) as CloudinaryListResponse;

    rootTestReport["root_admin_resources"] = {
      count: rootAdminRes.resources?.length || 0,
      next_cursor: rootAdminRes.next_cursor || null,
    };

    if (rootAdminRes.resources && rootResources.length === 0) {
      rootResources.push(...rootAdminRes.resources);
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    rootTestReport["root_admin_resources"] = { error: msg };
  }

  // 3. Run root_folders with Root Key
  try {
    const rootFolders = await cloudinaryRoot.api.root_folders();
    rootTestReport["root_folders"] = rootFolders;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    rootTestReport["root_folders"] = { error: msg };
  }

  // 4. Also run existing env key for side-by-side comparison
  const existingTestReport: Record<string, unknown> = {};
  try {
    const envSearchRes = (await cloudinary.search
      .expression("")
      .max_results(100)
      .execute()) as CloudinarySearchResponse;
    existingTestReport["env_key_broad_search"] = {
      total_count: envSearchRes.total_count,
      count: envSearchRes.resources?.length || 0,
    };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    existingTestReport["env_key_broad_search"] = { error: msg };
  }

  const finalResources = rootResources.map((res) => ({
    public_id: res.public_id,
    secure_url: res.secure_url,
    format: res.format,
    created_at: res.created_at,
    width: res.width,
    height: res.height,
  }));

  console.log("=== ROOT KEY CLOUDINARY TEST REPORT ===");
  console.log(JSON.stringify({ rootTestReport, existingTestReport }, null, 2));

  return NextResponse.json({
    success: true,
    total_count: finalResources.length,
    resources: finalResources,
    debugReport: {
      rootTestReport,
      existingTestReport,
      totalRootFound: finalResources.length,
    },
  });
}
