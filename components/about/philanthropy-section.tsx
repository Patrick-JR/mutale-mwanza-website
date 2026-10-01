"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

export function PhilanthropySection() {
  return (
    <section className="section-light py-14">
      <Container>
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <span className="kicker block mb-3">MAKING AN IMPACT</span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 mb-4 leading-tight">
              Using Influence
              <br />
              For Good
            </h2>
            <p className="text-charcoal-600 leading-relaxed mb-6 text-sm">
              Mutale identifies as a philanthropist and regularly uses her public
              platform around themes of support, empowerment, community and positive
              impact. Her content also reflects an interest in women supporting women
              and creating opportunities through influence and connection.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center bg-gold-500 text-charcoal-900 font-semibold px-5 py-2.5 rounded hover:bg-gold-400 transition-all duration-300 text-sm"
            >
              Explore Her Impact
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
              alt="Mutale Mwanza community moment"
              className="w-full rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
