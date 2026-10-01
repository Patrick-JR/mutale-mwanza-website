"use client";

import { Container } from "@/components/ui/container";

export function OpportunityCtaSection() {
  const scrollToForm = () => {
    const el = document.getElementById("enquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-gold-500 py-20 relative overflow-hidden">
      {/* Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <span className="font-script text-[18rem] text-white">M</span>
      </div>

      <Container className="relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal-900 font-bold mb-4">
              Have An Opportunity In Mind?
            </h2>
            <p className="text-charcoal-800 text-lg max-w-xl">
              Tell us about your event, media opportunity or brand collaboration.
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center justify-center bg-charcoal-900 text-white font-semibold px-8 py-4 rounded hover:bg-charcoal-800 transition-all duration-300"
          >
            Start A Conversation
          </button>
        </div>
      </Container>
    </section>
  );
}
