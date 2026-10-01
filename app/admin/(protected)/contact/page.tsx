import { PlaceholderPage } from "@/components/admin/placeholder-page";

export default function ContactAdminPage() {
  return (
    <PlaceholderPage
      title="Contact / Work With Us"
      description="Edit the contact page hero, service area, contact details and WhatsApp."
      hint="All sensitive fields (email, phone, WhatsApp) read from the database so the public site updates immediately when changed."
      list={[
        "Booking email (recipient for n8n + email notifications)",
        "Phone number",
        "WhatsApp number",
        "Service area display text",
        "Social links",
      ]}
    />
  );
}
