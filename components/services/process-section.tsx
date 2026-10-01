"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const steps = [
  {
    num: "01",
    title: "Enquire",
    description:
      "Tell us what you are looking to achieve and provide the details of your opportunity, event or collaboration.",
  },
  {
    num: "02",
    title: "Review",
    description:
      "We review the request and determine the most appropriate way to work together.",
  },
  {
    num: "03",
    title: "Discuss",
    description:
      "We discuss the opportunity, requirements, timing and next steps.",
  },
  {
    num: "04",
    title: "Confirm",
    description:
      "Once the engagement is agreed, the relevant details are confirmed.",
  },
];

export function ProcessSection() {
  return (
    <section className="section-light py-20 border-t border-charcoal-100">
      <Container>
        <div className="text-center mb-16">
          <span className="kicker block mb-3">WORK WITH MUTALE</span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900">
            How We Work Together
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-gold-500 bg-white mb-5">
                <span className="font-serif text-xl text-gold-500 font-bold">
                  {step.num}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-charcoal-900 font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-charcoal-500 text-sm leading-relaxed max-w-[220px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
