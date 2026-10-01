"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Calendar, Mic, Megaphone, Briefcase } from "lucide-react";

const cards = [
  {
    icon: Calendar,
    title: "Events & Hosting",
    description: "For event hosting and audience engagement opportunities.",
  },
  {
    icon: Mic,
    title: "Media",
    description: "For interviews, appearances and professional media opportunities.",
  },
  {
    icon: Megaphone,
    title: "Brand Collaborations",
    description: "For product features, promotional content and brand collaborations.",
  },
  {
    icon: Briefcase,
    title: "Professional Enquiries",
    description: "For other opportunities relevant to Mutale&rsquo;s professional work.",
  },
];

export function HowWeWorkSection() {
  return (
    <section className="section-light py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="kicker block mb-3">WHAT WE COVER</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            How Can We Work Together?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-charcoal-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-500/10 mb-4">
                <card.icon className="text-gold-500 w-6 h-6" />
              </div>
              <h3
                className="font-serif text-xl text-charcoal-900 font-semibold mb-2"
                dangerouslySetInnerHTML={{ __html: card.title }}
              />
              <p
                className="text-charcoal-500 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: card.description }}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
