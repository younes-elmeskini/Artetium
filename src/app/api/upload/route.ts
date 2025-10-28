import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile, stat } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { Verify } from "../utils/utils";

async function ensureDir(dirPath: string) {
  try {
    await stat(dirPath);
  } catch {
    await mkdir(dirPath, { recursive: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    await Verify();

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || ".png";
    const filename = `${crypto.randomBytes(16).toString("hex")}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, filename);

    await ensureDir(uploadDir);
    await writeFile(filePath, buffer);

    const urlPath = `/uploads/${filename}`;
    return NextResponse.json({ url: urlPath, name: filename });
  } catch (error: unknown) {
    const message = (error as unknown as Error).message || "Upload failed";
    const status = (error as unknown as Error).message?.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: message }, { status: status || 500 });
  }
}


