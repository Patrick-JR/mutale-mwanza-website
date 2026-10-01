"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

type Brand = {
  name: string;
  category: string;
  description: string;
  filterCategory: string;
};

export function BrandGridSection({ brands }: { brands: Brand[] }) {
  const categories = ["All", "Fashion", "Beauty", "Retail", "Lifestyle", "Hospitality", "Entrepreneurship"];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? brands : brands.filter((b) => b.filterCategory === active);

  return (
    <section className="section-light py-20">
      <Container>
        <div className="text-center mb-10">
          <span className="kicker block mb-3">FEATURED BRANDS</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            All Featured Brands &amp; Collaborations
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`px-5 py-2 rounded text-sm font-medium transition-colors ${
                active === filter
                  ? "bg-gold-500 text-charcoal-900"
                  : "border border-charcoal-200 text-charcoal-700 hover:border-gold-500"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center text-charcoal-500 py-10">No brands available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((brand, i) => (
              <motion.div
                key={brand.name + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-charcoal-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-serif text-xl text-charcoal-900 font-semibold mb-2 uppercase tracking-wide">
                  {brand.name}
                </h3>
                <p className="text-gold-500 text-xs uppercase tracking-wider mb-3">
                  {brand.category}
                </p>
                <p className="text-charcoal-500 text-sm leading-relaxed">
                  {brand.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
