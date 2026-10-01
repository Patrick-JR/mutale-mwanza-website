import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/layout/page-layout";
import { GalleryHero } from "@/components/gallery/gallery-hero";
import { GalleryGridSection } from "@/components/gallery/gallery-grid-section";
import { CTABanner } from "@/components/ui/cta-banner";

export const dynamic = "force-static";

export default async function GalleryPage() {
  const dbItems = await prisma.galleryImage.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const items = dbItems.map((g) => ({
    src: g.imageUrl,
    title: g.title,
    category: g.category,
    caption: g.caption ?? undefined,
  }));

  return (
    <PageLayout>
      <GalleryHero />
      <GalleryGridSection items={items} />
      <CTABanner
        title="Want To Work With Mutale?"
        subtitle="Explore opportunities for events, media and brand collaborations."
        buttonText="Work With Us"
        buttonHref="/contact"
        variant="gold"
      />
    </PageLayout>
  );
}
