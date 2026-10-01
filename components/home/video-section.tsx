"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Play } from "lucide-react";

export function VideoSection() {
  return (
    <section id="meet-mutale" className="section-cream py-20 scroll-mt-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="kicker block mb-4">MEET MUTALE</span>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-6 leading-tight">
              A Glimpse Into<br />Who She Is.
            </h2>
            <p className="text-charcoal-600 text-lg leading-relaxed mb-8">
              Get to know Mutale Mwanza beyond the spotlight — who she is, what she
              does, what drives her and why she continues to use media, business and
              influence to create meaningful connections.
            </p>
            <button
              type="button"
              className="inline-flex items-center justify-center bg-gold-500 text-charcoal-900 font-semibold px-6 py-3 rounded hover:bg-gold-400 transition-all duration-300"
            >
              Watch Introduction
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl group cursor-pointer bg-charcoal-800">
              {/* Placeholder thumbnail — to be replaced via admin */}
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 via-charcoal-900 to-charcoal-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold-500/90 flex items-center justify-center shadow-lg">
                  <Play
                    className="text-charcoal-900 w-7 h-7 ml-1"
                    fill="currentColor"
                  />
                </div>
              </div>
              {/* Subtle bottom-right duration tag, optional */}
              <div className="absolute bottom-3 right-3 bg-black/60 text-white/80 text-xs px-2 py-0.5 rounded">
                2:00
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
