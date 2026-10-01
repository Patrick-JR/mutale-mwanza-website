import { PageLayout } from "@/components/layout/page-layout";
import { AiChatbotButton } from "@/components/shared/ai-chatbot-button";
import { WhatsappButton } from "@/components/shared/whatsapp-button";
import { HomeHero } from "@/components/home/home-hero";
import { CredentialsBar } from "@/components/home/credentials-bar";
import { SocialProofBar } from "@/components/home/social-proof-bar";
import { BrandsMarqueeSection } from "@/components/home/brands-marquee-section";
import { WelcomeSection } from "@/components/home/welcome-section";
import { VideoSection } from "@/components/home/video-section";
import { ServicesGrid } from "@/components/home/services-grid";
import { SelectedCollaborationsSection } from "@/components/home/selected-collaborations-section";
import { GalleryHighlights } from "@/components/home/gallery-highlights";
import { PurposePreviewSection } from "@/components/home/purpose-preview-section";
import { FaqPreviewSection } from "@/components/home/faq-preview-section";
import { HomeCTAButtons } from "@/components/home/home-cta-buttons";

export default function HomePage() {
  return (
    <>
      <PageLayout>
        <HomeHero />
        <CredentialsBar />
        <SocialProofBar />
        <BrandsMarqueeSection />
        <WelcomeSection />
        <VideoSection />
        <ServicesGrid />
        <SelectedCollaborationsSection />
        <GalleryHighlights />
        <PurposePreviewSection />
        <FaqPreviewSection />
        <HomeCTAButtons />
      </PageLayout>
      <AiChatbotButton />
      <WhatsappButton />
    </>
  );
}
