"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I book Mutale?",
    answer:
      "Use the booking form on this page to share the details of your event, media opportunity or collaboration. The team reviews every enquiry and follows up with next steps.",
  },
  {
    question: "How can a brand collaborate with Mutale?",
    answer:
      "Brand collaborations and promotional opportunities can be discussed through the Work With Us process. Submit the brand collaboration form so the team can evaluate fit and timing.",
  },
  {
    question: "What information should I include in my enquiry?",
    answer:
      "Include as much context as you can: the type of opportunity, the date (if known), the location, the audience, and what you are hoping to achieve. This helps the team respond with relevant next steps.",
  },
];

export function FaqPreviewSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-light py-20 border-t border-charcoal-100">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="kicker block mb-3">FAQ</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            Quick Questions
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
