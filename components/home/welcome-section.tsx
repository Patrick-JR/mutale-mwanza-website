"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Tv, Briefcase, Heart, Mic } from "lucide-react";

const roles = [
  {
    icon: Mic,
    title: "Media Personality",
    description: "Media personality and television professional with a strong connection to audiences.",
  },
  {
    icon: Tv,
    title: "TV Producer",
    description: "TV producer with experience creating and developing media content.",
  },
  {
    icon: Briefcase,
    title: "Entrepreneur",
    description: "Entrepreneur with an established presence across business and media.",
  },
  {
    icon: Heart,
    title: "Philanthropist",
    description: "Philanthropist whose public profile reflects an interest in community and empowerment.",
  },
];

export function WelcomeSection() {
  return (
    <section className="section-light py-20">
      <Container>
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=700&q=80"
              alt="Mutale Mwanza"
              className="w-full rounded-lg shadow-xl"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <span className="kicker block mb-4">ABOUT MUTALE</span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 mb-6 leading-tight">
              A Voice. A Vision.<br />A Purpose.
            </h2>
            <p className="text-charcoal-600 leading-relaxed mb-5">
              Mutale Mwanza is a media personality, TV producer, entrepreneur and
              philanthropist. Her work connects media, business and community, using
              influence and storytelling to create meaningful connections and
              opportunities.
            </p>
            <p className="text-charcoal-600 leading-relaxed mb-6">
              Through her media presence, entrepreneurial work and brand collaborations,
              she continues to connect audiences, businesses and communities.
            </p>
            <div className="font-script text-2xl text-gold-500 mb-6">Mutale Mwanza</div>
            <Link
              href="/about"
              className="inline-flex items-center justify-center bg-gold-500 text-charcoal-900 font-semibold px-6 py-3 rounded hover:bg-gold-400 transition-all duration-300"
            >
              Explore Her Story
            </Link>
          </motion.div>

          {/* Roles */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1 space-y-6"
          >
            {roles.map((role) => (
              <div key={role.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <role.icon className="text-gold-500 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-charcoal-900 font-semibold mb-1">
                    {role.title}
                  </h3>
                  <p className="text-charcoal-500 text-sm leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
