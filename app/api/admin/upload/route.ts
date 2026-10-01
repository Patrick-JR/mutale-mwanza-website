import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { getSessionUser } from "@/lib/auth";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB
const MAX_VIDEO_BYTES = 80 * 1024 * 1024; // 80MB
const MAX_DOC_BYTES = 30 * 1024 * 1024; // 30MB

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const kind = (formData.get("kind") as string) || "image";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const isImage = ALLOWED_TYPES.includes(file.type);
  const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
  const isDoc =
    file.type === "application/pdf" ||
    file.type === "application/msword" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  if (!isImage && !isVideo && !isDoc) {
    return NextResponse.json(
      { error: `Unsupported file type: ${file.type}` },
      { status: 400 }
    );
  }

  const maxBytes = isVideo ? MAX_VIDEO_BYTES : isDoc ? MAX_DOC_BYTES : MAX_IMAGE_BYTES;
  if (file.size > maxBytes) {
    return NextResponse.json(
      { error: `File too large. Max ${Math.round(maxBytes / (1024 * 1024))}MB` },
      { status: 400 }
    );
  }

  const ext = path.extname(file.name) || (isVideo ? ".mp4" : isDoc ? ".pdf" : ".jpg");
  const safeExt = /^\.[a-z0-9]+$/i.test(ext) ? ext : "";
  const filename = `${randomUUID()}${safeExt}`;

  const subdir =
    kind === "video" ? "videos" : kind === "document" ? "docs" : "images";
  const uploadDir = path.join(process.cwd(), "public", "uploads", subdir);
  await mkdir(uploadDir, { recursive: true });

  const filepath = path.join(uploadDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  const url = `/uploads/${subdir}/${filename}`;
  return NextResponse.json({
    ok: true,
    url,
    filename: file.name,
    size: file.size,
    type: file.type,
  });
}
