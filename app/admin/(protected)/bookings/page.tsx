import { prisma } from "@/lib/prisma";
import { BookingsManager } from "./manager";

export const dynamic = "force-dynamic";

export default async function BookingsAdminPage() {
  const items = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });
  return <BookingsManager initialItems={items.map((b) => ({ ...b, createdAt: b.createdAt.toISOString() }))} />;
}
