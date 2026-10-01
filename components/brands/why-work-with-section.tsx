"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Users, Star, BookOpen, Heart } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Audience",
    description: "Connect with a large and engaged social audience.",
  },
  {
    icon: Star,
    title: "Influence",
    description:
      "Work with a recognisable media personality with a strong public presence.",
  },
  {
    icon: BookOpen,
    title: "Storytelling",
    description:
      "Use personality, media and content to communicate products and ideas.",
  },
  {
    icon: Heart,
    title: "Connection",
    description:
      "Create content that brings brands closer to audiences.",
  },
];

export function WhyWorkWithSection() {
  return (
    <section className="section-dark py-20">
      <Container>
        <div className="text-center mb-14">
          <span className="kicker block mb-3">WHY WORK WITH MUTALE</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white">
            Why Work With Mutale
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-500/10 mb-5">
                <reason.icon className="text-gold-500 w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-white font-semibold mb-3">
                {reason.title}
              </h3>
              <p className="text-charcoal-200 leading-relaxed text-sm">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
