import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  verifyPassword,
  createSession,
  setSessionCookie,
} from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export async function POST(req: Request) {
  try {
    const { username, password } = (await req.json()) as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    const id = username.toLowerCase().trim();

    // Look up by email OR by name (so "admin" works just like an email would)
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: id },
          { name: { equals: id, mode: "insensitive" } },
        ],
      },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const token = await createSession(user.id);
    await setSessionCookie(token);

    await prisma.user
      .update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      })
      .catch(() => {});

    await logActivity({
      userId: user.id,
      actorName: user.name,
      action: "Signed in",
      target: "Auth",
    });

    return NextResponse.json({
      ok: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
