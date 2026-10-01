"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config/site";

const socialLinks = [
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: siteConfig.social.youtube,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: siteConfig.social.tiktok,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/brands", label: "Brands" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/media", label: "Media Room" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter out socials with no URL configured
  const visibleSocials = socialLinks.filter((s) => s.href && s.href.length > 0);

  return (
    <footer className="bg-charcoal-900 border-t border-charcoal-700">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block mb-6">
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "#C89D61",
                  fontSize: "1.75rem",
                }}
              >
                Mutale
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "white",
                  fontSize: "1.25rem",
                }}
              >
                {" "}
                Mwanza
              </span>
            </Link>
            <p className="text-charcoal-300 text-sm leading-relaxed mb-6">
              Media personality, TV producer, entrepreneur and philanthropist. Creating
              impact through media, business and community.
            </p>
            {visibleSocials.length > 0 && (
              <div className="flex gap-4">
                {visibleSocials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-charcoal-300 hover:text-gold-500 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact — only show what is configured */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              {siteConfig.bookingEmail ? (
                <li className="flex items-start gap-3">
                  <Mail className="text-gold-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <a
                    href={`mailto:${siteConfig.bookingEmail}`}
                    className="text-charcoal-300 text-sm hover:text-gold-500 transition-colors"
                  >
                    {siteConfig.bookingEmail}
                  </a>
                </li>
              ) : (
                <li className="flex items-start gap-3">
                  <Mail className="text-gold-500/40 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-charcoal-500 text-sm italic">
                    Contact email — to be configured
                  </span>
                </li>
              )}

              {siteConfig.officeCityPrimary || siteConfig.officeCitySecondary ? (
                <li className="flex items-start gap-3 text-charcoal-300 text-sm">
                  <span className="text-gold-500">•</span>
                  <span>
                    {siteConfig.officeCityPrimary}
                    {siteConfig.officeCitySecondary ? (
                      <>
                        <br />
                        {siteConfig.officeCitySecondary}
                      </>
                    ) : null}
                  </span>
                </li>
              ) : null}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Newsletter</h3>
            <p className="text-charcoal-300 text-sm mb-4">
              Stay updated with latest news, events and projects.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-600 rounded text-white placeholder:text-charcoal-400 focus:border-gold-500 focus:outline-none transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full bg-gold-500 text-charcoal-900 font-semibold py-3 rounded hover:bg-gold-400 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-700">
        <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-charcoal-400 text-sm">
            © {new Date().getFullYear()} Mutale Mwanza Media. All Rights Reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-charcoal-600 flex items-center justify-center text-charcoal-400 hover:border-gold-500 hover:text-gold-500 transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </Container>
      </div>
    </footer>
  );
}
