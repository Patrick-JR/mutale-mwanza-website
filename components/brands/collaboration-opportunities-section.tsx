"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const opportunities = [
  {
    title: "Brand Features",
    description:
      "Product and brand features across Mutale's digital presence.",
  },
  {
    title: "Promotional Content",
    description:
      "Audience-facing promotional content designed around a brand or product.",
  },
  {
    title: "Event Collaborations",
    description:
      "Media and audience-hosting opportunities for selected events.",
  },
  {
    title: "Media Appearances",
    description:
      "Professional media opportunities involving Mutale's public platform.",
  },
];

export function CollaborationOpportunitiesSection() {
  return (
    <section className="section-cream py-20">
      <Container>
        <div className="text-center mb-12">
          <span className="kicker block mb-3">OPPORTUNITIES</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            Collaboration Opportunities
          </h2>
          <p className="text-charcoal-500 mt-4 max-w-2xl mx-auto">
            Available collaboration categories. Specific availability is determined
            through the booking process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {opportunities.map((opp, i) => (
            <motion.div
              key={opp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-charcoal-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-serif text-xl text-charcoal-900 font-semibold mb-3">
                {opp.title}
              </h3>
              <p className="text-charcoal-500 text-sm leading-relaxed">
                {opp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
