import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { destroySession, clearSessionCookie, SESSION_COOKIE_NAME } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (token) {
      const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true },
      });
      if (session) {
        await logActivity({
          userId: session.userId,
          actorName: session.user.name,
          action: "Signed out",
          target: "Auth",
        });
      }
      await destroySession(token);
    }
    await clearSessionCookie();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ ok: true });
  }
}
