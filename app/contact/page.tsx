import { PageLayout } from "@/components/layout/page-layout";
import { AiChatbotButton } from "@/components/shared/ai-chatbot-button";
import { WhatsappButton } from "@/components/shared/whatsapp-button";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactInfoSection } from "@/components/contact/contact-info-section";
import { FaqPreviewSection } from "@/components/contact/faq-preview-section";
import { ContactCtaSection } from "@/components/contact/contact-cta-section";

export default function ContactPage() {
  return (
    <>
      <PageLayout>
        <ContactHero />
        <ContactInfoSection />
        <FaqPreviewSection />
        <ContactCtaSection />
      </PageLayout>
      <AiChatbotButton />
      <WhatsappButton />
    </>
  );
}
