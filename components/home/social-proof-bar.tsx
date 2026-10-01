"use client";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config/site";

function InstagramIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function SocialProofBar() {
  return (
    <section className="bg-charcoal-900 border-t border-charcoal-700">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6">
          <p className="text-white/70 text-xs uppercase tracking-[0.25em] font-semibold">
            Followers Across Social Platforms
          </p>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="text-gold-500">
                <FacebookIcon />
              </span>
              <div>
                <p className="text-white font-serif text-xl font-bold leading-none">
                  {siteConfig.socialProof.facebookFollowers}
                </p>
                <p className="text-charcoal-300 text-xs mt-1">
                  {siteConfig.socialProof.facebookLabel}
                </p>
              </div>
            </div>

            <div className="w-px h-10 bg-charcoal-700" />

            <div className="flex items-center gap-3">
              <span className="text-gold-500">
                <InstagramIcon />
              </span>
              <div>
                <p className="text-white font-serif text-xl font-bold leading-none">
                  {siteConfig.socialProof.instagramFollowers}
                </p>
                <p className="text-charcoal-300 text-xs mt-1">
                  {siteConfig.socialProof.instagramLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
