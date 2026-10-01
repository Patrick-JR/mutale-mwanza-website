import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/layout/page-layout";
import { BrandsHero } from "@/components/brands/brands-hero";
import { BrandsMarqueeSection } from "@/components/brands/brands-marquee-section";
import { BrandGridSection } from "@/components/brands/brand-grid-section";
import { SelectedCollaborationsSection } from "@/components/brands/selected-collaborations-section";
import { FeaturedBrandContentSection } from "@/components/brands/featured-brand-content-section";
import { WhyWorkWithSection } from "@/components/brands/why-work-with-section";
import { CollaborationOpportunitiesSection } from "@/components/brands/collaboration-opportunities-section";
import { CTABanner } from "@/components/ui/cta-banner";

export const dynamic = "force-static";

export default async function BrandsPage() {
  const dbBrands = await prisma.brand.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const brandNames = dbBrands.map((b) => b.name);

  const brandsForGrid = dbBrands.map((b) => ({
    name: b.name,
    category: b.category ?? "Featured Brand",
    description: b.description ?? "Featured across Mutale's public platform.",
    filterCategory: b.category ?? "Lifestyle",
  }));

  const selected = dbBrands.slice(0, 4).map((b, i) => ({
    name: b.name,
    category: b.category ?? "Featured Brand",
    description: b.description ?? "Featured across Mutale's public platform.",
    image: b.logo ?? [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80",
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80",
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600&q=80",
      "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&q=80",
    ][i % 4],
  }));

  return (
    <PageLayout>
      <BrandsHero />
      <BrandsMarqueeSection brands={brandNames} />
      <BrandGridSection brands={brandsForGrid} />
      <SelectedCollaborationsSection items={selected} />
      <FeaturedBrandContentSection />
      <WhyWorkWithSection />
      <CollaborationOpportunitiesSection />
      <CTABanner
        title="Have A Brand In Mind?"
        subtitle="Let's discuss how Mutale Mwanza could work with your brand, business or event."
        buttonText="Work With Us"
        buttonHref="/contact"
        variant="dark"
      />
    </PageLayout>
  );
}
