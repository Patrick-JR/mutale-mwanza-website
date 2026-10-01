"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";

const items = [
  { src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80", label: "Portrait" },
  { src: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600&q=80", label: "Media Moment" },
  { src: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80", label: "Behind The Scenes" },
  { src: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&q=80", label: "Event Moment" },
  { src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80", label: "Lifestyle" },
];

export function GalleryHighlights() {
  return (
    <section className="section-light py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="kicker block mb-4">GALLERY</span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900">
            Moments &amp; Highlights
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {items.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative aspect-[3/4] overflow-hidden rounded-lg group"
            >
              <img
                src={image.src}
                alt={image.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                <p className="text-white text-sm font-medium">{image.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-gold-500 text-charcoal-900 font-semibold px-6 py-3 rounded hover:bg-gold-400 transition-all duration-300"
          >
            View Full Gallery
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
