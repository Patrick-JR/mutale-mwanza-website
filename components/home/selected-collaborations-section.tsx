"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";

const collaborations = [
  {
    name: "Angie's Shoe Collection",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80",
  },
  {
    name: "DENIM Studio",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80",
  },
  {
    name: "Touch By Julie Beauty Lounge",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600&q=80",
  },
  {
    name: "Bosslady Diaries ZM",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&q=80",
  },
];

export function SelectedCollaborationsSection() {
  return (
    <section className="section-cream py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="kicker block mb-3">SELECTED COLLABORATIONS</span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900">
            Working With Brands That Connect
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {collaborations.map((collab, i) => (
            <motion.div
              key={collab.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden relative">
                <img
                  src={collab.image}
                  alt={collab.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <p className="text-white font-serif text-lg font-semibold">
                    {collab.name}
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Featured in Mutale's content
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 bg-gold-500 text-charcoal-900 font-semibold px-6 py-3 rounded hover:bg-gold-400 transition-all duration-300"
          >
            View All Brands
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
