import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { checkAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Verify admin authentication
  if (!checkAuth()) {
    return NextResponse.json({ error: "Unauthorized access. Please login first." }, { status: 401 });
  }

  // Check if credentials are set
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (
    !cloudName ||
    !apiKey ||
    !apiSecret ||
    cloudName === "your_cloud_name" ||
    apiKey === "your_api_key" ||
    apiSecret === "your_api_secret"
  ) {
    return NextResponse.json(
      {
        error: "Cloudinary is not configured. Please add your credentials in .env.local file.",
        configured: false,
      },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { file } = body; // This should be a base64 string or image URL

    if (!file) {
      return NextResponse.json(
        { error: "No file data provided." },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary in 'portfolio' folder
    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "agency_portfolio",
      resource_type: "auto",
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      width: uploadResponse.width,
      height: uploadResponse.height,
      format: uploadResponse.format,
    });
  } catch (error: unknown) {
    console.error("Cloudinary upload API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to upload image to Cloudinary.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
