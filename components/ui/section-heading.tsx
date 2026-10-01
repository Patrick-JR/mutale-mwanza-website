"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  light?: boolean;
  maxWidth?: string;
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  alignment = "center",
  light = false,
  maxWidth = "max-w-3xl",
}: SectionHeadingProps) {
  const textAlign = alignment === "center" ? "text-center" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("mb-12", textAlign)}
    >
      {kicker && (
        <span className="kicker block mb-4">{kicker}</span>
      )}
      <h2
        className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${light ? "text-charcoal-900" : "text-white"}`}
        style={{ maxWidth }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg md:text-xl leading-relaxed ${light ? "text-charcoal-600" : "text-charcoal-300"} ${alignment === "center" ? "mx-auto" : ""}`}
          style={{ maxWidth: alignment === "center" ? "max-w-2xl" : undefined }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
