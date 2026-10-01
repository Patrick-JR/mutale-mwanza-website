"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Tv, Radio, Megaphone, Calendar, Heart, Film, Mic, Camera, Briefcase, Sparkles, Layers } from "lucide-react";

const iconMap: Record<string, any> = {
  Tv, Radio, Megaphone, Calendar, Heart, Film, Mic, Camera, Briefcase, Sparkles, Layers,
};

export type ServiceCard = {
  title: string;
  description: string;
  image: string;
  features: string[];
  icon?: string;
};

export function ServicesCardsSection({ services }: { services: ServiceCard[] }) {
  return (
    <section className="section-light py-20">
      <Container>
        <div className="text-center mb-14">
          <span className="kicker block mb-3">WHAT MUTALE DOES</span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900">
            Professional Services
          </h2>
        </div>

        {services.length === 0 ? (
          <div className="text-center text-charcoal-500 py-10">
            No services available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon ?? "Tv"] ?? Tv;
              return (
                <motion.div
                  key={service.title + i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-charcoal-100"
                >
                  {service.image && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mb-4">
                      <Icon className="text-gold-500 w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl text-charcoal-900 font-semibold mb-3">
                      {service.title}
                    </h3>
                    <p className="text-charcoal-500 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    {service.features?.length > 0 && (
                      <ul className="space-y-2 mb-5">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-charcoal-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link href="/contact" className="inline-flex items-center gap-1 text-gold-500 text-sm font-semibold hover:gap-2 transition-all">
                      Discuss This →
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
