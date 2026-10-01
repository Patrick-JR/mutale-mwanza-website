"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";

// Real brand/business names from supplied content. No fabricated logo files.
const brands = [
  "Angie's Shoe Collection",
  "DENIM Studio",
  "Touch By Julie Beauty Lounge",
  "Bosslady Diaries ZM",
  "Hair Lingerie",
  "Huncho's Farms",
  "Vivavax Boutique",
  "The Bridge Apartments",
  "Efficient Hair & Beauty",
];

export function BrandsMarqueeSection() {
  // Duplicate the list so the marquee can loop seamlessly.
  const looped = [...brands, ...brands];

  return (
    <section className="section-light py-16 border-t border-charcoal-100 overflow-hidden">
      <Container>
        <div className="text-center mb-10">
          <span className="kicker block mb-3">FEATURED BRANDS &amp; COLLABORATIONS</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            Brands &amp; Collaborations
          </h2>
        </div>
      </Container>

      {/* Marquee strip */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-track flex gap-12 whitespace-nowrap">
          {looped.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0 flex items-center justify-center min-w-[220px] py-4"
            >
              <span className="font-serif text-charcoal-800 text-xl md:text-2xl font-semibold tracking-wide">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Container>
        <div className="text-center mt-10">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 bg-gold-500 text-charcoal-900 font-semibold px-6 py-3 rounded hover:bg-gold-400 transition-all duration-300"
          >
            View All Brands
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
