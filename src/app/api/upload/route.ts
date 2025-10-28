import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { Verify } from "../utils/utils";

export async function POST(req: NextRequest) {
  try {
    await Verify();

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Check if token is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is not configured");
      return NextResponse.json({ 
        error: "Blob storage not configured. Please set BLOB_READ_WRITE_TOKEN environment variable" 
      }, { status: 500 });
    }

    // Upload to Vercel Blob Storage
    // Generate unique filename to avoid "blob already exists" error
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true, // Generate unique filename
    });

    return NextResponse.json({ url: blob.url, name: blob.pathname });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const message = (error as unknown as Error).message || "Upload failed";
    const status = (error as unknown as Error).message?.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: message }, { status: status || 500 });
  }
}


