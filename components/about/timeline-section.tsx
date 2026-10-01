"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Radio, Tv, Film, Briefcase, Music } from "lucide-react";

const milestones = [
  {
    year: "2015",
    title: "Hot FM Journey",
    description:
      "Mutale has described beginning her Hot FM journey in 2015 on Mr. & Mrs. Smith, later progressing through Radio After 6 and the Red Hot Breakfast Show.",
    icon: Radio,
  },
  {
    year: null,
    title: "Radio & Television",
    description:
      "Built experience as a radio and television personality while developing her skills in communication, research, presentation and audience engagement.",
    icon: Tv,
  },
  {
    year: null,
    title: "TV Production",
    description:
      "Mutale identifies herself as a TV producer and continues to combine media, storytelling and production within her professional work.",
    icon: Film,
  },
  {
    year: null,
    title: "Mutale Mwanza Media",
    description:
      "CEO of Mutale Mwanza Media, with a professional focus that connects media, content, business and public engagement.",
    icon: Briefcase,
  },
  {
    year: "2025",
    title: "Kwacha Music Awards 2025",
    description:
      "Audience Host at the 2025 Sun FM Kwacha Music Awards.",
    icon: Music,
  },
];

export function TimelineSection() {
  return (
    <section className="section-light py-14 border-t border-charcoal-100">
      <Container>
        <div className="text-center mb-12">
          <span className="kicker block mb-3">CAREER HIGHLIGHTS</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            A Journey Shaped By Media
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px bg-charcoal-200" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {milestones.map((m, i) => (
              <motion.div
                key={`${m.title}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-gold-500 bg-white mb-4 z-10">
                  <m.icon className="text-gold-500 w-6 h-6" />
                </div>
                <div className="h-7 mb-2 flex items-center justify-center">
                  {m.year && (
                    <p className="font-serif text-xl text-gold-500 font-bold leading-none">
                      {m.year}
                    </p>
                  )}
                </div>
                <h3 className="font-serif text-base text-charcoal-900 font-semibold mb-1">
                  {m.title}
                </h3>
                <p className="text-charcoal-500 text-xs leading-relaxed">
                  {m.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
