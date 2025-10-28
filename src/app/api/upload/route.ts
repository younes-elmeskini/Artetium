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

    // Upload to Vercel Blob Storage
    const blob = await put(file.name, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ url: blob.url, name: blob.pathname });
  } catch (error: unknown) {
    const message = (error as unknown as Error).message || "Upload failed";
    const status = (error as unknown as Error).message?.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: message }, { status: status || 500 });
  }
}


