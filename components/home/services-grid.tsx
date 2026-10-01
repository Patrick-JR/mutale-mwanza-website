"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Tv, Megaphone, Calendar, Heart, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Tv,
    title: "TV & Media",
    description: "Television, media appearances and production.",
  },
  {
    icon: Megaphone,
    title: "Brand Collaborations",
    description: "Brand promotions, collaborations and audience-facing partnerships.",
  },
  {
    icon: Calendar,
    title: "Event Hosting",
    description: "Hosting and audience engagement for events and special occasions.",
  },
  {
    icon: Heart,
    title: "Philanthropy & Community",
    description: "Community-focused initiatives and philanthropic engagement.",
  },
];

export function ServicesGrid() {
  return (
    <section className="section-light py-20 border-t border-charcoal-100">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="kicker block mb-4">WHAT WE DO</span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900">Services</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500 transition-colors">
                <service.icon className="text-gold-500 w-6 h-6 group-hover:text-charcoal-900 transition-colors" />
              </div>
              <h3 className="font-serif text-lg text-charcoal-900 font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-charcoal-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-gold-500 text-charcoal-900 font-semibold px-6 py-3 rounded hover:bg-gold-400 transition-all duration-300"
          >
            View All Services
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
