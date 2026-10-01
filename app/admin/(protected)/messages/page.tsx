import { PlaceholderPage } from "@/components/admin/placeholder-page";

export default function MessagesAdminPage() {
  return (
    <PlaceholderPage
      title="Messages"
      description="Inbox for general contact-form messages."
      list={[
        "View unread messages",
        "Mark as read",
        "Reply (opens mail client)",
        "Delete",
      ]}
    />
  );
}
