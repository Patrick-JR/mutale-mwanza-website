import { PageLayout } from "@/components/layout/page-layout";
import { MediaHero } from "@/components/media/media-hero";
import { FeaturedVideosSection } from "@/components/media/featured-videos-section";
import { ProfessionalIntroSection } from "@/components/media/professional-intro-section";
import { MediaKitSection } from "@/components/media/media-kit-section";
import { FaqSection } from "@/components/media/faq-section";
import { MediaContactSection } from "@/components/media/media-contact-section";
import { CTABanner } from "@/components/ui/cta-banner";

export default function MediaPage() {
  return (
    <PageLayout>
      <MediaHero />
      <FeaturedVideosSection />
      <ProfessionalIntroSection />
      <MediaKitSection />
      <FaqSection />
      <MediaContactSection />
      <CTABanner
        title="Need To Connect With Mutale?"
        subtitle="For media opportunities, events, brand collaborations and professional enquiries, start a conversation with the team."
        buttonText="Work With Us"
        buttonHref="/contact"
        variant="gold"
      />
    </PageLayout>
  );
}
