"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "How can I work with Mutale?",
    answer:
      "Use the Work With Us or booking option to submit your request and provide details about your event, campaign or collaboration.",
  },
  {
    question: "What types of opportunities can I discuss with Mutale?",
    answer:
      "Brand collaborations, media opportunities, event hosting and other professional engagements can be discussed through the booking process.",
  },
  {
    question: "How can I access Mutale's media information?",
    answer:
      "Visit the Media Room for the available media resources, biography and featured videos.",
  },
];

export function FaqPreviewSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-light py-20">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="kicker block mb-3">FAQ</span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-3 mb-10">
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
                <span className="font-semibold text-charcoal-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`text-gold-500 flex-shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-charcoal-600 leading-relaxed">{faq.answer}</div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/media"
            className="inline-flex items-center gap-2 text-gold-500 font-semibold hover:gap-3 transition-all"
          >
            View All FAQs
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
