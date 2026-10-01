import { prisma } from "@/lib/prisma";

/**
 * Record an admin action. The user is looked up if `userId` is provided;
 * otherwise `actorName` is required so we never lose the actor label.
 */
export async function logActivity(params: {
  userId?: string | null;
  actorName: string;
  action: string;
  target?: string | null;
  metadata?: Record<string, unknown> | null;
}) {
  try {
    await prisma.activityLog.create({
      data: {
        userId: params.userId ?? null,
        actorName: params.actorName,
        action: params.action,
        target: params.target ?? null,
        metadata: params.metadata ? JSON.stringify(params.metadata) : null,
      },
    });
  } catch (err) {
    // Activity log failures must never break the main flow.
    console.error("Activity log error:", err);
  }
}
