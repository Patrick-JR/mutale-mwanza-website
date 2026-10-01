import { prisma } from "@/lib/prisma";
import { GalleryManager } from "./page";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  const items = await prisma.galleryImage.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return <GalleryManager initialItems={items} />;
}
