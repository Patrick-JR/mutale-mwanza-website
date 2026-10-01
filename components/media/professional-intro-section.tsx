"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Play } from "lucide-react";

/**
 * Professional Introduction video placeholder.
 *
 * The real video file is not yet uploaded. The lightbox uses a clean
 * placeholder UI and never opens a fake URL.
 */
export function ProfessionalIntroSection() {
  return (
    <section className="section-cream py-20 border-t border-charcoal-100">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="kicker block mb-4">MEET MUTALE</span>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-6 leading-tight">
              Professional Introduction
            </h2>
            <p className="text-charcoal-600 text-lg leading-relaxed mb-8">
              A short introduction to who Mutale Mwanza is, what she does, what
              drives her and the professional work behind her public platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl bg-charcoal-800 group">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80"
                alt="Meet Mutale — professional introduction"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-charcoal-900/30 group-hover:bg-charcoal-900/20 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gold-500/90 flex items-center justify-center shadow-lg">
                  <Play
                    className="text-charcoal-900 w-8 h-8 ml-1"
                    fill="currentColor"
                  />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 text-white/80 text-xs px-2 py-0.5 rounded">
                Video placeholder
              </div>
            </div>
            <p className="text-xs text-charcoal-500 italic mt-3 text-center">
              Video file to be uploaded via admin panel.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
