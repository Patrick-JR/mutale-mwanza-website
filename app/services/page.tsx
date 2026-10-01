import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/layout/page-layout";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesCardsSection } from "@/components/services/services-cards-section";
import { CommunityPurposeSection } from "@/components/services/community-purpose-section";
import { ProcessSection } from "@/components/services/process-section";
import { ImpactStatsSection } from "@/components/services/impact-stats-section";
import { CTABanner } from "@/components/ui/cta-banner";

// Read live data from SQLite at build time so admin edits appear after re-export
export const dynamic = "force-static";

export default async function ServicesPage() {
  const dbServices = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  // Map DB rows → the shape used by the existing UI
  const services = dbServices.map((s) => ({
    title: s.title,
    description: s.shortDescription ?? s.description,
    image: s.imageUrl ?? "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600&q=80",
    features: s.features ? s.features.split("|").filter(Boolean) : [],
    icon: s.icon ?? "Tv",
  }));

  return (
    <PageLayout>
      <ServicesHero />
      <ServicesCardsSection services={services} />
      <CommunityPurposeSection />
      <ProcessSection />
      <ImpactStatsSection />
      <CTABanner
        title="Let's Create Something Impactful Together"
        subtitle="Whether you're a brand, organization or individual, let's work together to bring your vision to life."
        buttonText="Work With Us"
        buttonHref="/contact"
        variant="gold"
      />
    </PageLayout>
  );
}
