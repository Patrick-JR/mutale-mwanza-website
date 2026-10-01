"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  "All",
  "Media",
  "Events & Hosting",
  "Fashion & Style",
  "Beauty",
  "Brands & Business",
  "Lifestyle",
];

type GalleryItem = {
  src: string;
  title: string;
  category: string;
  caption?: string;
};

export function GalleryGridSection({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);
  const displayed = filtered;

  return (
    <section className="section-light py-16">
      <Container>
        {items.length > 0 && (
          <p className="text-center text-charcoal-600 mb-10 max-w-2xl mx-auto">
            Explore a curated collection of moments across media, events, fashion,
            beauty, business and everyday life.
          </p>
        )}

        {items.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded text-sm font-medium transition-colors ${
                  active === cat
                    ? "bg-gold-500 text-white"
                    : "bg-white border border-charcoal-200 text-charcoal-700 hover:border-gold-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {displayed.length === 0 ? (
          <div className="text-center text-charcoal-500 py-16">No gallery items yet.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayed.map((item, i) => (
              <motion.div
                key={`${active}-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onClick={() => setLightboxIdx(i)}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <p className="text-white font-semibold text-sm leading-tight">{item.title}</p>
                  {item.caption && <p className="text-gold-400 text-xs mt-1">{item.caption}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>

      {lightboxIdx !== null && displayed[lightboxIdx] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightboxIdx(null)}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(null); }}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-charcoal-800 flex items-center justify-center text-white hover:bg-charcoal-700"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i !== null ? (i - 1 + displayed.length) % displayed.length : 0)); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal-800 flex items-center justify-center text-white hover:bg-charcoal-700"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i !== null ? (i + 1) % displayed.length : 0)); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal-800 flex items-center justify-center text-white hover:bg-charcoal-700"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
          <div className="max-w-4xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img src={displayed[lightboxIdx].src} alt={displayed[lightboxIdx].title} className="max-w-full max-h-[85vh] object-contain rounded-lg" />
            <div className="text-center mt-4">
              <p className="text-white font-serif text-2xl">{displayed[lightboxIdx].title}</p>
              <p className="text-gold-500 text-sm mt-1">{displayed[lightboxIdx].category}</p>
              <p className="text-charcoal-300 text-sm mt-1">{lightboxIdx + 1} / {displayed.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
