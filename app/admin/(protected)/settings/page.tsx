import { PlaceholderPage } from "@/components/admin/placeholder-page";

export default function SettingsAdminPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Manage site-wide settings: contact info, SEO, social links and AI assistant."
      list={[
        "Site name, SEO title & description",
        "Contact email, phone, WhatsApp",
        "Social links",
        "AI assistant enabled / disabled + welcome message",
      ]}
    />
  );
}
