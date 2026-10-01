"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

export function AboutHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-charcoal-900">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-900/90 to-charcoal-900/40" />

      <Container className="relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="kicker block mb-4">ABOUT</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            About Mutale
          </h1>
        </motion.div>
      </Container>
    </section>
  );
}
