"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { FileText, Download } from "lucide-react";

interface DownloadCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const cards: DownloadCardProps[] = [
  {
    id: "media-kit",
    title: "Media Kit",
    description:
      "A professional resource for brands, event organizers, media professionals and collaborators looking for essential information about Mutale Mwanza.",
    icon: <FileText className="text-gold-500 w-7 h-7" />,
  },
  {
    id: "official-biography",
    title: "Official Biography",
    description:
      "Read or download Mutale Mwanza's professional biography, including her media background, professional roles and current areas of work.",
    icon: <FileText className="text-gold-500 w-7 h-7" />,
  },
];

export function MediaKitSection() {
  return (
    <section className="section-light py-20 border-t border-charcoal-100">
      <Container>
        <div className="text-center mb-12">
          <span className="kicker block mb-3">RESOURCES</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            Media Kit &amp; Biography
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              id={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-charcoal-100 rounded-lg p-6 flex flex-col"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="font-serif text-xl text-charcoal-900 font-semibold mb-2">
                {card.title}
              </h3>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-5 flex-grow">
                {card.description}
              </p>

              {/* Placeholder state — no real file yet */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-2 bg-charcoal-200 text-charcoal-500 font-semibold px-5 py-2.5 rounded cursor-not-allowed text-sm"
                  aria-disabled="true"
                >
                  <Download size={14} />
                  {card.id === "media-kit" ? "Media Kit Coming Soon" : "Biography Coming Soon"}
                </button>
              </div>
              <p className="text-xs text-charcoal-400 italic mt-2">
                Real file will be uploaded through the admin panel.
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
