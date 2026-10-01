"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config/site";
import { useBookingModal } from "@/components/booking/booking-modal";

export function HomeHero() {
  const { open: openBooking } = useBookingModal();

  const handleMeetMutale = () => {
    const el = document.getElementById("meet-mutale");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-charcoal-900">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-900/85 to-charcoal-900/40" />

      <Container className="relative z-10 pt-20">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="kicker block mb-6"
          >
            {siteConfig.heroTags.join(", ")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6"
          >
            Inspiring. Empowering.
            <br />
            <span className="font-script text-gold-500 text-6xl md:text-7xl lg:text-8xl">
              Creating Impact.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-charcoal-200 text-lg leading-relaxed mb-10 max-w-xl"
          >
            From television to impactful partnerships, Mutale Mwanza continues to
            influence, inspire and empower through media, business and community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={openBooking}
              className="inline-flex items-center justify-center bg-gold-500 text-charcoal-900 font-semibold px-7 py-3.5 rounded hover:bg-gold-400 transition-all duration-300"
            >
              Book Mutale Mwanza
            </button>
            <button
              type="button"
              onClick={handleMeetMutale}
              className="inline-flex items-center justify-center border border-charcoal-500 text-white font-semibold px-7 py-3.5 rounded hover:bg-white hover:text-charcoal-900 transition-all duration-300"
            >
              Meet Mutale
            </button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
