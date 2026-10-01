"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config/site";

/**
 * Audience & Influence — only verified social-follower figures are shown.
 * Followers ≠ reach. This section is explicitly NOT labelled as "people reached".
 */
export function ImpactStatsSection() {
  return (
    <section className="section-dark py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=700&q=80"
              alt="Mutale Mwanza professional portrait"
              className="w-full max-w-md rounded-lg shadow-2xl"
            />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <span className="kicker block mb-3">AUDIENCE &amp; INFLUENCE</span>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                An Audience That Connects.
              </h2>
              <p className="text-charcoal-300 text-sm">
                Built through years of media, communication and public engagement.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-serif text-4xl md:text-5xl text-gold-500 font-bold mb-2">
                  {siteConfig.socialProof.facebookFollowers}
                </p>
                <p className="text-charcoal-300 text-sm leading-tight">
                  Facebook Followers
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="font-serif text-4xl md:text-5xl text-gold-500 font-bold mb-2">
                  {siteConfig.socialProof.instagramFollowers}
                </p>
                <p className="text-charcoal-300 text-sm leading-tight">
                  Instagram Followers
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
