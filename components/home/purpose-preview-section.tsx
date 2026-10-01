"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Target, Eye } from "lucide-react";

const values = [
  {
    title: "Authenticity",
    description: "Stay genuine, relatable and true to the people we serve.",
  },
  {
    title: "Excellence",
    description: "Bring professionalism, quality and intention to every opportunity.",
  },
  {
    title: "Connection",
    description: "Create meaningful relationships between people, audiences and brands.",
  },
  {
    title: "Empowerment",
    description: "Use influence to encourage growth, confidence and opportunity.",
  },
  {
    title: "Purpose",
    description: "Ensure visibility and influence translate into meaningful impact.",
  },
  {
    title: "Growth",
    description: "Keep evolving through media, business, experience and learning.",
  },
];

export function PurposePreviewSection() {
  return (
    <section className="section-cream py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="kicker block mb-3">OUR PURPOSE</span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900">
            Mission, Vision &amp; Values
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg p-8 border border-charcoal-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center">
                <Target className="text-gold-500 w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal-900 font-semibold">Mission</h3>
            </div>
            <p className="text-charcoal-600 leading-relaxed">
              To use media, storytelling and influence to connect people, amplify
              businesses and create meaningful impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-lg p-8 border border-charcoal-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center">
                <Eye className="text-gold-500 w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal-900 font-semibold">Vision</h3>
            </div>
            <p className="text-charcoal-600 leading-relaxed">
              To build a trusted African media and personal brand platform that connects
              audiences, brands and communities through influence, authenticity and purpose.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-lg p-5 border border-charcoal-100 text-center"
            >
              <h4 className="font-serif text-base text-gold-500 font-semibold mb-2 uppercase tracking-wider">
                {value.title}
              </h4>
              <p className="text-charcoal-500 text-xs leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/about"
            className="inline-flex items-center justify-center bg-gold-500 text-charcoal-900 font-semibold px-6 py-3 rounded hover:bg-gold-400 transition-all duration-300"
          >
            Explore Our Purpose
          </Link>
        </div>
      </Container>
    </section>
  );
}
