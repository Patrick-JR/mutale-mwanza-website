"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Phone, Mail, MessageCircle, Play } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
}

export function ContactInfoSection() {
  const email = siteConfig.bookingEmail;
  const phone = siteConfig.contactPhone;
  const whatsapp = siteConfig.whatsappNumber;
  const facebook = siteConfig.social.facebook;
  const instagram = siteConfig.social.instagram;
  const linkedin = siteConfig.social.linkedin;
  const youtube = siteConfig.social.youtube;

  const hasContact = !!(email || phone || whatsapp || facebook);

  if (!hasContact) {
    return null;
  }

  return (
    <section className="section-light py-20 border-t border-charcoal-100">
      <Container>
        <div className="text-center mb-12">
          <span className="kicker block mb-3">DIRECT CONTACT</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 mb-3">
            Reach Mutale Directly
          </h2>
          <p className="text-charcoal-500 max-w-xl mx-auto text-sm">
            Use any of the channels below to start a conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {phone && (
            <ContactCard
              icon={Phone}
              title="Phone"
              value={phone}
              href={`tel:${phone}`}
              tone="charcoal"
            />
          )}
          {whatsapp && (
            <ContactCard
              icon={MessageCircle}
              title="WhatsApp"
              value={whatsapp}
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
              external
              tone="whatsapp"
            />
          )}
          {email && (
            <ContactCard
              icon={Mail}
              title="Email"
              value={email}
              href={`mailto:${email}`}
              tone="charcoal"
            />
          )}
        </div>

        {/* Social links */}
        {(facebook || instagram || linkedin || youtube) && (
          <div className="text-center mt-12">
            <p className="text-charcoal-500 text-sm mb-4 uppercase tracking-wider">Follow Along</p>
            <div className="flex justify-center gap-3 flex-wrap">
              {facebook && (
                <SocialLink href={facebook} Icon={FacebookIcon} label="Facebook" />
              )}
              {instagram && (
                <SocialLink href={instagram} Icon={InstagramIcon} label="Instagram" />
              )}
              {linkedin && (
                <SocialLink href={linkedin} Icon={LinkedInIcon} label="LinkedIn" />
              )}
              {youtube && (
                <SocialLink href={youtube} icon={Play} label="YouTube" />
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function ContactCard({ icon: Icon, title, value, href, external, tone = "charcoal" }: any) {
  const isWhatsapp = tone === "whatsapp";
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-charcoal-100 rounded-lg p-6 hover:shadow-lg transition-shadow group"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isWhatsapp ? "bg-[#25D366]/10" : "bg-gold-500/10"}`}>
        <Icon className={`w-6 h-6 ${isWhatsapp ? "text-[#25D366]" : "text-gold-500"}`} />
      </div>
      <p className="text-charcoal-500 text-xs uppercase tracking-wider mb-1">{title}</p>
      <p className="text-charcoal-900 font-semibold group-hover:text-gold-500 transition-colors break-words">
        {value}
      </p>
    </motion.a>
  );
}

function SocialLink({ href, icon: Icon, Icon: CustomIcon, label }: any) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-12 h-12 rounded-full bg-charcoal-900 hover:bg-gold-500 flex items-center justify-center text-white transition-colors"
    >
      {CustomIcon ? <CustomIcon size={18} /> : <Icon size={18} />}
    </a>
  );
}
