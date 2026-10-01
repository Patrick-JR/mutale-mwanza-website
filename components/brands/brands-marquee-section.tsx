"use client";

import { Container } from "@/components/ui/container";

export function BrandsMarqueeSection({ brands }: { brands: string[] }) {
  if (brands.length === 0) return null;
  const looped = [...brands, ...brands];

  return (
    <section className="section-light py-16 border-t border-charcoal-100 overflow-hidden">
      <Container>
        <div className="text-center mb-10">
          <span className="kicker block mb-3">FEATURED BRANDS &amp; COLLABORATIONS</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            Brands, Businesses &amp; Collaborations
          </h2>
          <p className="text-charcoal-500 mt-4 max-w-2xl mx-auto">
            Mutale Mwanza's public platform regularly intersects with brands,
            businesses, events and lifestyle partners across media, fashion, beauty,
            retail and entrepreneurship.
          </p>
        </div>
      </Container>

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
              <span className="font-serif text-charcoal-800 text-lg md:text-xl font-semibold tracking-wide">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
