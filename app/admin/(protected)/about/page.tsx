import { PlaceholderPage } from "@/components/admin/placeholder-page";

export default function AboutAdminPage() {
  return (
    <PlaceholderPage
      title="About Page"
      description="Edit hero, professional profile, career highlights and professional highlights cards."
      hint="The About editor allows safe edits to the hero headline, professional profile paragraphs, career milestones and professional-highlight cards — without changing the layout."
      list={[
        "Hero: kicker, headline, tagline, paragraph",
        "Professional Profile: paragraphs",
        "Career Highlights: 5 milestones",
        "Professional Highlights: 4 cards",
        "Mission / Vision / Values / Goal: each block",
      ]}
    />
  );
}
