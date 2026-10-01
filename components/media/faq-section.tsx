"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Who is Mutale Mwanza?",
    answer:
      "Mutale Mwanza is a media personality, TV producer, entrepreneur and philanthropist. She also identifies herself as a trained journalist and radio and TV personality.",
  },
  {
    question: "What is Mutale Mwanza Media?",
    answer:
      "Mutale Mwanza Media is the media entity associated with Mutale Mwanza, who identifies herself as its CEO.",
  },
  {
    question: "Can Mutale be booked for events?",
    answer:
      "Professional event and audience-hosting opportunities can be discussed through the Work With Us or booking process.",
  },
  {
    question: "Can brands collaborate with Mutale?",
    answer:
      "Yes. Brand collaborations and promotional opportunities can be discussed through the Work With Us process.",
  },
  {
    question: "How can media professionals request information?",
    answer:
      "Use the official contact or media enquiry channel provided on the website.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-cream py-20 border-t border-charcoal-100">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="kicker block mb-3">FAQ</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-lg border border-charcoal-100 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-charcoal-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`text-gold-500 flex-shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-charcoal-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
