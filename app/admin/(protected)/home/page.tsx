import { PlaceholderPage } from "@/components/admin/placeholder-page";

export default function HomeAdminPage() {
  return (
    <PlaceholderPage
      title="Home Page"
      description="Edit the homepage hero, social proof bar, brands marquee, and section order."
      hint="The homepage editor lets a non-technical admin drag-reorder the homepage sections (Hero, Social Proof, Brands, About, Meet Mutale, Services, Collaborations, Gallery, Mission/Vision/Values, FAQ, CTA) and edit each section's content."
      list={[
        "Drag-to-reorder homepage sections",
        "Hero: headline, supporting text, image, buttons",
        "Social Proof Bar: stats and labels",
        "Brands marquee: featured names",
      ]}
    />
  );
}
