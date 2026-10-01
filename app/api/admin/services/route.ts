import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { title, shortDescription, fullDescription, features, icon, imageUrl, featured, sortOrder } = body;
    if (!title || !shortDescription) {
      return NextResponse.json({ error: "Title and short description required" }, { status: 400 });
    }
    const item = await prisma.service.create({
      data: {
        title,
        description: fullDescription || shortDescription,
        shortDescription,
        fullDescription: fullDescription || null,
        features: features || null,
        icon: icon || null,
        imageUrl: imageUrl || null,
        featured: !!featured,
        sortOrder: typeof sortOrder === "number" ? sortOrder : 0,
      },
    });
    return NextResponse.json({ ok: true, item });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
