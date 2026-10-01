"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const categories = [
  { name: "Fashion", description: "Style features and product highlights." },
  { name: "Beauty", description: "Beauty and styling content." },
  { name: "Retail", description: "Retail and shopping features." },
  { name: "Lifestyle", description: "Lifestyle and everyday content." },
  { name: "Hospitality", description: "Lifestyle and hospitality features." },
  { name: "Entrepreneurship", description: "Business and entrepreneurial content." },
];

export function FeaturedBrandContentSection() {
  return (
    <section className="section-light py-20 border-t border-charcoal-100">
      <Container>
        <div className="text-center mb-12">
          <span className="kicker block mb-3">CATEGORIES</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            Featured Brand Content
          </h2>
          <p className="text-charcoal-500 mt-4 max-w-2xl mx-auto">
            Categories of content that appear regularly across Mutale's promotional
            and lifestyle platform.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white border border-charcoal-100 rounded-lg p-5 text-center hover:shadow-lg transition-shadow"
            >
              <h3 className="font-serif text-base text-gold-500 font-semibold uppercase tracking-wider mb-2">
                {cat.name}
              </h3>
              <p className="text-charcoal-500 text-xs leading-relaxed">
                {cat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
