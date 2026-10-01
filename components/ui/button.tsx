"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "gold" | "outline-gold" | "dark" | "outline-white";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  href?: string;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = "gold",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
  icon,
}: ButtonProps) {
  const variants = {
    gold: "bg-gold-500 text-charcoal-900 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20",
    "outline-gold": "border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-charcoal-900",
    dark: "bg-charcoal-900 text-white hover:bg-charcoal-800",
    "outline-white": "border-2 border-white text-white hover:bg-white hover:text-charcoal-900",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold rounded transition-all duration-300",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}
