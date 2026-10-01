"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Mail, MoreHorizontal, X, Handshake, Image as ImageIcon, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const primaryItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: Mail },
];

const moreItems = [
  { href: "/brands", label: "Brands", icon: Handshake, desc: "Featured brands & collaborations" },
  { href: "/gallery", label: "Gallery", icon: ImageIcon, desc: "Photos & moments" },
  { href: "/media", label: "Media Room", icon: Newspaper, desc: "Press kit & media enquiries" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-charcoal-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
      >
        <ul className="flex items-stretch justify-around h-16 px-1">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center h-full gap-0.5 text-[10px] font-medium transition-colors",
                    isActive ? "text-gold-500" : "text-charcoal-500 hover:text-charcoal-900"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
                  <span className="leading-none">{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setMoreOpen(true)}
              className={cn(
                "w-full h-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors",
                moreItems.some((m) => pathname.startsWith(m.href))
                  ? "text-gold-500"
                  : "text-charcoal-500"
              )}
              aria-label="More pages"
            >
              <MoreHorizontal size={20} strokeWidth={1.8} />
              <span className="leading-none">More</span>
            </button>
          </li>
        </ul>
      </nav>

      <AnimatePresence>
        {moreOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
            onClick={() => setMoreOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-charcoal-900 font-serif text-xl">More</p>
                <button
                  type="button"
                  onClick={() => setMoreOpen(false)}
                  className="w-9 h-9 rounded-full bg-ivory-100 flex items-center justify-center text-charcoal-700"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <ul className="space-y-2">
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg transition-colors",
                          isActive ? "bg-gold-500/10 text-gold-500" : "text-charcoal-900 hover:bg-ivory-100"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          isActive ? "bg-gold-500" : "bg-ivory-100"
                        )}>
                          <Icon size={18} className={isActive ? "text-white" : "text-charcoal-700"} />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{item.label}</p>
                          <p className="text-xs text-charcoal-500">{item.desc}</p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
