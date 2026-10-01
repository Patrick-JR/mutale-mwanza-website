"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Heart } from "lucide-react";

/**
 * "Community & Purpose" is presented as part of Mutale's professional
 * identity and public profile — NOT as a paid commercial service.
 */
export function CommunityPurposeSection() {
  return (
    <section className="section-cream py-20 border-t border-charcoal-100">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-500/10 mb-5">
            <Heart className="text-gold-500 w-7 h-7" />
          </div>
          <span className="kicker block mb-3">PROFESSIONAL IDENTITY</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 mb-5">
            Community &amp; Purpose
          </h2>
          <p className="text-charcoal-600 leading-relaxed mb-7">
            Mutale's public work also reflects an interest in community, empowerment
            and meaningful social impact.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center justify-center bg-gold-500 text-charcoal-900 font-semibold px-6 py-3 rounded hover:bg-gold-400 transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
