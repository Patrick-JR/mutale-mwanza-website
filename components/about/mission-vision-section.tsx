"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Target, Eye, Heart, Compass } from "lucide-react";

const values = [
  { title: "Authenticity", description: "Stay genuine, relatable and true to the people we serve." },
  { title: "Excellence", description: "Bring professionalism, quality and intention to every opportunity." },
  { title: "Connection", description: "Create meaningful relationships between people, audiences and brands." },
  { title: "Empowerment", description: "Use influence to encourage growth, confidence and opportunity." },
  { title: "Purpose", description: "Ensure visibility and influence translate into meaningful impact." },
  { title: "Growth", description: "Keep evolving through media, business, experience and learning." },
];

export function MissionVisionSection() {
  return (
    <section className="section-dark py-14">
      <Container>
        <div className="text-center mb-10">
          <span className="kicker block mb-3">OUR PURPOSE</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white">
            Mission, Vision, Values &amp; Goal
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gold-500/10 mb-3">
              <Target className="text-gold-500 w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-white mb-2">Mission</h3>
            <p className="text-charcoal-200 text-sm leading-relaxed">
              To use media, storytelling and influence to connect people, amplify
              businesses and create meaningful impact.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gold-500/10 mb-3">
              <Eye className="text-gold-500 w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-white mb-2">Vision</h3>
            <p className="text-charcoal-200 text-sm leading-relaxed">
              To build a trusted media and personal brand platform that connects
              audiences, brands and communities through influence, authenticity and purpose.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gold-500/10 mb-3">
              <Heart className="text-gold-500 w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-white mb-2">Values</h3>
            <p className="text-charcoal-200 text-sm leading-relaxed">
              Authenticity, Excellence, Connection, Empowerment, Purpose and Growth.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gold-500/10 mb-3">
              <Compass className="text-gold-500 w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-white mb-2">Goal</h3>
            <p className="text-charcoal-200 text-sm leading-relaxed">
              To turn influence into meaningful opportunities for people, brands and
              communities through media, business and connection.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {values.map((value, i) => (
            <motion.div key={value.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="border border-charcoal-700 rounded-lg p-4 text-center hover:border-gold-500/50 transition-colors">
              <h4 className="font-serif text-xs text-gold-500 font-semibold uppercase tracking-wider mb-2">
                {value.title}
              </h4>
              <p className="text-charcoal-300 text-[11px] leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
