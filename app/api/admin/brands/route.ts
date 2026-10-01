import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { name, category, relationship, description, website, logo, featured, sortOrder } = body;
    if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });
    const item = await prisma.brand.create({
      data: {
        name,
        category: category || null,
        relationship: relationship || null,
        description: description || null,
        website: website || null,
        logo: logo || null,
        featured: !!featured,
        sortOrder: typeof sortOrder === "number" ? sortOrder : 0,
      },
    });
    return NextResponse.json({ ok: true, item });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
