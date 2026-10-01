"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Tv, Radio, Briefcase, Heart, Mic, Building2 } from "lucide-react";

const credentials = [
  { icon: Tv, label: "TV Producer" },
  { icon: Radio, label: "Radio Personality" },
  { icon: Mic, label: "Trained Journalist" },
  { icon: Building2, label: "CEO, Mutale Mwanza Media" },
  { icon: Briefcase, label: "Entrepreneur" },
  { icon: Heart, label: "Philanthropist" },
];

export function CredentialsBar() {
  return (
    <section className="bg-charcoal-900 border-y border-charcoal-800">
      <Container>
        <div className="py-8 md:py-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6"
          >
            {credentials.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mb-2">
                    <Icon className="text-gold-500 w-5 h-5" />
                  </div>
                  <p className="text-white text-xs md:text-sm font-medium leading-tight">
                    {c.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
