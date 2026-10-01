import { PlaceholderPage } from "@/components/admin/placeholder-page";

export default function FaqsAdminPage() {
  return (
    <PlaceholderPage
      title="FAQs"
      description="Add, edit, reorder and publish FAQs."
      list={[
        "Add new FAQ (question + answer)",
        "Edit existing FAQs",
        "Drag-reorder FAQ display order",
        "Show / hide per FAQ",
        "Category grouping (Booking, Media, About)",
      ]}
    />
  );
}
