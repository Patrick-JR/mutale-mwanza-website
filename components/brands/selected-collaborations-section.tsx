"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

export type CollabItem = {
  name: string;
  category: string;
  description: string;
  image: string;
};

export function SelectedCollaborationsSection({ items }: { items: CollabItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="section-cream py-20 border-t border-charcoal-100">
      <Container>
        <div className="text-center mb-12">
          <span className="kicker block mb-3">SELECTED WORK</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            Selected Collaborations
          </h2>
          <p className="text-charcoal-500 mt-4 max-w-2xl mx-auto">
            A selection of businesses, brands and professional collaborations
            featured across Mutale Mwanza's public platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.name + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-charcoal-100 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg text-charcoal-900 font-semibold mb-2 leading-tight">
                  {item.name}
                </h3>
                <p className="text-gold-500 text-xs uppercase tracking-wider mb-3">
                  {item.category}
                </p>
                <p className="text-charcoal-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
