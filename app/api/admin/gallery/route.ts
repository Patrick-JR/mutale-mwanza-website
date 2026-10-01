import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, imageUrl, category, caption, sortOrder } = body;
    if (!title || !imageUrl || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const item = await prisma.galleryImage.create({
      data: {
        title,
        imageUrl,
        category,
        caption: caption || null,
        sortOrder: typeof sortOrder === "number" ? sortOrder : 0,
      },
    });
    return NextResponse.json({ ok: true, item });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
