"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { useBookingModal } from "@/components/booking/booking-modal";
import { Calendar } from "lucide-react";

export function ContactCtaSection() {
  const { open: openBooking } = useBookingModal();

  return (
    <section className="bg-gradient-to-br from-charcoal-900 via-charcoal-900 to-charcoal-800 py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <span className="font-script text-[18rem] text-gold-500">M</span>
        </div>
      </div>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="kicker block mb-4">READY TO BOOK?</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Book <span className="font-script text-gold-500">Mutale</span> Today
          </h2>
          <p className="text-charcoal-200 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Pick a date and time, share a few details, and the team will get back
            to you with next steps.
          </p>

          <button
            type="button"
            onClick={openBooking}
            className="inline-flex items-center justify-center gap-2 bg-gold-500 text-charcoal-900 font-semibold px-10 py-4 rounded hover:bg-gold-400 transition-all duration-300 text-base"
          >
            <Calendar size={18} />
            Open Booking Form
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
