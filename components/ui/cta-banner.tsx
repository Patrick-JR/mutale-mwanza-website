"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  variant?: "gold" | "dark";
  className?: string;
}

export function CTABanner({
  title,
  subtitle,
  buttonText,
  buttonHref,
  onButtonClick,
  variant = "gold",
  className,
}: CTABannerProps) {
  return (
    <section className={cn("py-20 relative overflow-hidden", className)}>
      {/* Background */}
      <div
        className={cn(
          "absolute inset-0",
          variant === "gold" ? "bg-gold-500" : "bg-charcoal-900"
        )}
      >
        {/* Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <span className="font-script text-[20rem] text-white">M</span>
        </div>
      </div>

      <Container className="relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-white/80 text-lg max-w-xl">{subtitle}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              variant={variant === "gold" ? "dark" : "gold"}
              size="lg"
              onClick={onButtonClick}
              href={buttonHref}
            >
              {buttonText}
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
