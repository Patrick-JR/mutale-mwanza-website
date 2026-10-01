import { prisma } from "@/lib/prisma";
import { ServicesManager } from "./manager";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  const items = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return <ServicesManager initialItems={items} />;
}
