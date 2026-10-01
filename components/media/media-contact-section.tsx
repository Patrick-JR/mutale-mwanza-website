"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

/**
 * Media Enquiries — uses configured contact details.
 * If no email is configured, shows a neutral placeholder.
 */
export function MediaContactSection() {
  const email = siteConfig.bookingEmail;

  return (
    <section className="section-dark py-20">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <span className="kicker block mb-3">MEDIA ENQUIRIES</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            Media Enquiries
          </h2>
          <p className="text-charcoal-200 leading-relaxed mb-10">
            For interviews, media opportunities, official information and
            professional enquiries, contact Mutale's team through the official
            channel provided.
          </p>

          {email ? (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2 bg-gold-500 text-charcoal-900 font-semibold px-6 py-3 rounded hover:bg-gold-400 transition-all"
            >
              <Mail size={16} />
              {email}
            </a>
          ) : (
            <div className="inline-flex items-center justify-center gap-2 border border-charcoal-600 text-charcoal-300 px-6 py-3 rounded">
              <Mail size={16} className="text-gold-500" />
              <span className="italic">Official contact — to be configured</span>
            </div>
          )}

          <p className="text-charcoal-500 text-sm mt-6">
            For general enquiries, please{" "}
            <Link
              href="/contact"
              className="text-gold-500 hover:text-gold-400 underline"
            >
              use the contact form
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
