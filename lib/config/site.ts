/**
 * Site configuration
 *
 * NOTE: This file currently uses empty placeholders for sensitive contact
 * information (phone, email, address, social links). Real values can be
 * supplied later through the admin panel / SiteSettings table.
 *
 * Do NOT hardcode unverified contact details here.
 */
export const siteConfig = {
  // Public-facing brand
  name: "Mutale Mwanza",
  shortName: "Mutale",

  // Booking / contact
  // Values are intentionally empty placeholders. Admin can populate.
  bookingEmail: process.env.NEXT_PUBLIC_BOOKING_EMAIL || "",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",

  // Office
  officeCityPrimary: process.env.NEXT_PUBLIC_OFFICE_CITY_PRIMARY || "",
  officeCitySecondary: process.env.NEXT_PUBLIC_OFFICE_CITY_SECONDARY || "",

  // Social
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "",
  },

  // Hero position tags (verified, general brand language)
  heroTags: ["MEDIA PERSONALITY", "ENTREPRENEUR", "PHILANTHROPIST"],

  // Verified social proof numbers
  socialProof: {
    facebookFollowers: "1.8M+",
    facebookLabel: "Facebook Followers",
    instagramFollowers: "486K+",
    instagramLabel: "Instagram Followers",
  },

  // n8n webhook (admin-managed) — used for booking enquiries
  n8nWebhookUrl:
    process.env.N8N_BOOKING_WEBHOOK_URL ||
    process.env.N8N_WEBHOOK_URL ||
    "",
};

export type SiteConfig = typeof siteConfig;
