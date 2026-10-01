import { prisma } from "@/lib/prisma";
import { BrandsManager } from "./manager";

export const dynamic = "force-dynamic";

export default async function BrandsAdminPage() {
  const items = await prisma.brand.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return <BrandsManager initialItems={items} />;
}
