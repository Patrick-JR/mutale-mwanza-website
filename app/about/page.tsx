import { PageLayout } from "@/components/layout/page-layout";
import { AboutHero } from "@/components/about/about-hero";
import { MyStorySection } from "@/components/about/my-story-section";
import { TimelineSection } from "@/components/about/timeline-section";
import { AchievementsSection } from "@/components/about/achievements-section";
import { MissionVisionSection } from "@/components/about/mission-vision-section";
import { PhilanthropySection } from "@/components/about/philanthropy-section";
import { CTABanner } from "@/components/ui/cta-banner";

export default function AboutPage() {
  return (
    <PageLayout>
      <AboutHero />
      <MyStorySection />
      <TimelineSection />
      <AchievementsSection />
      <MissionVisionSection />
      <PhilanthropySection />
      <CTABanner
        title="Let's Work Together"
        subtitle="Partner with Mutale Mwanza for your next event, media opportunity or brand collaboration."
        buttonText="Work With Us"
        buttonHref="/contact"
        variant="gold"
      />
    </PageLayout>
  );
}
