import { PlaceholderPage } from "@/components/admin/placeholder-page";

export default function ActivityLogPage() {
  return (
    <PlaceholderPage
      title="Activity Log"
      description="Record of important admin actions: sign-ins, content updates, uploads and deletions."
      list={[
        "Track who did what and when",
        "Filter by actor or section",
        "Search past activity",
      ]}
    />
  );
}
