"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Pen, Radio, Film, Mic } from "lucide-react";

const highlights = [
  {
    icon: Pen,
    title: "Trained Journalist",
    description:
      "Professional foundation in journalism, communication and storytelling.",
  },
  {
    icon: Radio,
    title: "Radio & TV Personality",
    description:
      "Experience across radio and television, with a strong focus on audience connection and presentation.",
  },
  {
    icon: Film,
    title: "TV Producer",
    description:
      "Professional work in television production and media content.",
  },
  {
    icon: Mic,
    title: "Audience Host",
    description:
      "Audience Host at the 2025 Sun FM Kwacha Music Awards.",
  },
];

export function AchievementsSection() {
  return (
    <section className="section-light py-14 border-t border-charcoal-100">
      <Container>
        <div className="text-center mb-10">
          <span className="kicker block mb-3">PROFESSIONAL HIGHLIGHTS</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            Experience, Influence &amp; Impact
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-charcoal-200 rounded-lg p-5 text-center hover:shadow-lg transition-shadow bg-white"
            >
              <item.icon className="text-gold-500 w-8 h-8 mx-auto mb-3" strokeWidth={1.5} />
              <h3 className="font-serif text-base text-charcoal-900 font-semibold mb-1">
                {item.title}
              </h3>
              <p className="text-charcoal-500 text-xs leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
