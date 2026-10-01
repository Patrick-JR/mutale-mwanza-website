"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

export function MyStorySection() {
  return (
    <section className="section-light py-16">
      <Container>
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <img
              src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=700&q=80"
              alt="Mutale Mwanza professional portrait"
              className="w-full max-w-md rounded-lg shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <span className="kicker block mb-3">PROFESSIONAL PROFILE</span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 mb-5 leading-tight">
              From Journalism
              <br />
              To Media &amp; Influence
            </h2>

            <p className="text-charcoal-600 leading-relaxed mb-3">
              Mutale Mwanza is a trained journalist, radio and television personality,
              TV producer, entrepreneur and philanthropist.
            </p>
            <p className="text-charcoal-600 leading-relaxed mb-3">
              Her radio journey includes Hot FM, beginning in 2015 on Mr. &amp; Mrs.
              Smith, later moving through Radio After 6 and the Red Hot Breakfast Show.
            </p>
            <p className="text-charcoal-600 leading-relaxed mb-5">
              She is also CEO of Mutale Mwanza Media.
            </p>

            <div className="font-script text-2xl text-gold-500">Mutale Mwanza</div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
