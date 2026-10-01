import { PlaceholderPage } from "@/components/admin/placeholder-page";

export default function MediaAdminPage() {
  return (
    <PlaceholderPage
      title="Media Room"
      description="Manage featured videos, media kit, official biography, FAQ preview and media enquiries."
      hint="Upload the real Media Kit PDF and Official Biography file, add new featured videos and edit the displayed FAQ. All wiring is ready."
      list={[
        "Upload Media Kit PDF (replace)",
        "Upload Official Biography (replace)",
        "Add featured videos (YouTube / file / external URL)",
        "Manage Media Room FAQs",
        "Media enquiry contact details",
      ]}
    />
  );
}
