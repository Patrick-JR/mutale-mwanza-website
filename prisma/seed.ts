import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const dbPath = process.env.DATABASE_URL?.replace(/^file:/, "") || "./dev.db";
const adapter = new PrismaLibSql({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database…");

  // Default admin user (hashed password)
  const adminHash = await bcrypt.hash("12345", 10);
  const editorHash = await bcrypt.hash("editor123", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin" },
    update: { passwordHash: adminHash, name: "admin", role: "ADMINISTRATOR", isActive: true },
    create: {
      name: "admin",
      email: "admin",
      passwordHash: adminHash,
      role: "ADMINISTRATOR",
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "editor@mutalemwanza.com" },
    update: {},
    create: {
      name: "Content Editor",
      email: "editor@mutalemwanza.com",
      passwordHash: editorHash,
      role: "EDITOR",
      isActive: true,
    },
  });

  // -------------------------------------------------------------------------
  // Public-facing seed
  // -------------------------------------------------------------------------

  const brands = [
    { name: "Angie's Shoe Collection", category: "Fashion", relationship: "Featured Brand", description: "Featured repeatedly in Mutale's promotional and lifestyle content.", sortOrder: 1 },
    { name: "DENIM Studio", category: "Fashion", relationship: "Featured Brand", description: "Featured across Mutale's fashion and lifestyle content.", sortOrder: 2 },
    { name: "Touch By Julie Beauty Lounge", category: "Beauty", relationship: "Featured Brand", description: "Featured in Mutale's beauty and styling content.", sortOrder: 3 },
    { name: "Bosslady Diaries ZM", category: "Lifestyle", relationship: "Featured Brand", description: "Featured in Mutale's lifestyle and fashion content.", sortOrder: 4 },
    { name: "Hair Lingerie", category: "Beauty", relationship: "Featured Brand", description: "Featured in Mutale's styling and beauty content.", sortOrder: 5 },
    { name: "Luxurious Hair Lingerie", category: "Beauty", relationship: "Featured Brand", description: "Featured in Mutale's styling content.", sortOrder: 6 },
    { name: "Huncho's Farms", category: "Entrepreneurship", relationship: "Entrepreneurship & Business Feature", description: "Featured in Mutale's entrepreneurial and business-related content.", sortOrder: 7 },
    { name: "Vivavax Boutique", category: "Retail", relationship: "Featured Brand", description: "Featured in Mutale's fashion-related content.", sortOrder: 8 },
    { name: "The Bridge Apartments", category: "Hospitality", relationship: "Featured Brand", description: "Featured in Mutale's lifestyle and promotional content.", sortOrder: 9 },
    { name: "Efficient Hair & Beauty", category: "Beauty", relationship: "Featured Brand", description: "Featured in Mutale's beauty-related content.", sortOrder: 10 },
  ];
  for (const b of brands) {
    await prisma.brand.create({ data: b });
  }

  const services = [
    { title: "TV & Media", description: "Television and media work built around presentation, production, communication and audience connection.", shortDescription: "Television, media appearances and production.", features: "TV Presentation|TV Production|Media Appearances", sortOrder: 1 },
    { title: "Radio & Media Appearances", description: "Radio and media appearances that connect ideas, conversations and audiences through strong communication and personality.", shortDescription: "Radio and media appearances.", features: "Radio Appearances|Television Appearances|Media Engagements", sortOrder: 2 },
    { title: "Brand Collaborations", description: "Professional brand collaborations and promotional partnerships that connect businesses with Mutale's audience and personal influence.", shortDescription: "Brand promotions and collaborations.", features: "Brand Promotions|Product Features|Audience-Focused Campaigns", sortOrder: 3 },
    { title: "Event & Audience Hosting", description: "Professional hosting and audience engagement for events and public occasions.", shortDescription: "Event and audience hosting.", features: "Audience Hosting|Event Hosting|Public Engagement", sortOrder: 4 },
  ];
  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  const galleryImages = [
    { title: "Kwacha Music Awards 2025", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", category: "Events & Hosting", caption: "Audience Host", sortOrder: 1 },
    { title: "Media Moment", imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80", category: "Media", caption: "Studio moment", sortOrder: 2 },
    { title: "Media Appearance", imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80", category: "Media", caption: "Television moment", sortOrder: 3 },
    { title: "Behind The Scenes", imageUrl: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800&q=80", category: "Media", caption: "On-set moment", sortOrder: 4 },
    { title: "Event Moment", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", category: "Events & Hosting", caption: "Public event", sortOrder: 5 },
    { title: "Event Appearance", imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80", category: "Events & Hosting", caption: "On stage", sortOrder: 6 },
    { title: "Fashion Feature", imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80", category: "Fashion & Style", caption: "Style moment", sortOrder: 7 },
    { title: "Editorial Portrait", imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80", category: "Fashion & Style", caption: "Fashion moment", sortOrder: 8 },
    { title: "Featured with DENIM Studio", imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80", category: "Fashion & Style", caption: "Featured fashion content", sortOrder: 9 },
    { title: "Featured with Angie's Shoe Collection", imageUrl: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=800&q=80", category: "Fashion & Style", caption: "Featured fashion content", sortOrder: 10 },
    { title: "Beauty & Style", imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80", category: "Beauty", caption: "Beauty moment", sortOrder: 11 },
    { title: "Featured with Touch By Julie Beauty Lounge", imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80", category: "Beauty", caption: "Featured beauty content", sortOrder: 12 },
    { title: "Featured with Hair Lingerie", imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80", category: "Beauty", caption: "Featured styling content", sortOrder: 13 },
    { title: "Featured with Bosslady Diaries ZM", imageUrl: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=800&q=80", category: "Brands & Business", caption: "Featured lifestyle content", sortOrder: 14 },
    { title: "Product Feature", imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", category: "Brands & Business", caption: "Promotional feature", sortOrder: 15 },
    { title: "Lifestyle Moment", imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", category: "Lifestyle", caption: "Everyday moment", sortOrder: 16 },
    { title: "Personal Style", imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80", category: "Lifestyle", caption: "Lifestyle portrait", sortOrder: 17 },
    { title: "Professional Portrait", imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80", category: "Lifestyle", caption: "Portrait moment", sortOrder: 18 },
  ];
  for (const g of galleryImages) {
    await prisma.galleryImage.create({ data: g });
  }

  const videos = [
    { title: "Kwacha Music Awards 2025", description: "Audience Host at the 2025 Sun FM Kwacha Music Awards.", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", category: "Events", sourceType: "UPLOAD", featured: true, sortOrder: 1 },
    { title: "Hot FM — Red Hot Breakfast", description: "Mutale's Hot FM journey and Red Hot Breakfast Show appearance.", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800&q=80", category: "Radio", sourceType: "UPLOAD", sortOrder: 2 },
    { title: "Media Appearance", description: "Selected media moment.", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80", category: "Media", sourceType: "UPLOAD", sortOrder: 3 },
    { title: "Event Hosting Moment", description: "Selected event hosting moment.", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80", category: "Featured Moments", sourceType: "UPLOAD", sortOrder: 4 },
    { title: "Professional Introduction", description: "A short professional introduction video.", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80", category: "Featured Moments", sourceType: "UPLOAD", sortOrder: 5 },
  ];
  for (const v of videos) {
    await prisma.video.create({ data: v });
  }

  const faqs = [
    { question: "Who is Mutale Mwanza?", answer: "Mutale Mwanza is a media personality, TV producer, entrepreneur and philanthropist. She also identifies herself as a trained journalist and radio and TV personality.", category: "About", sortOrder: 1 },
    { question: "What is Mutale Mwanza Media?", answer: "Mutale Mwanza Media is the media entity associated with Mutale Mwanza, who identifies herself as its CEO.", category: "About", sortOrder: 2 },
    { question: "Can Mutale be booked for events?", answer: "Professional event and audience-hosting opportunities can be discussed through the Work With Us or booking process.", category: "Booking", sortOrder: 3 },
    { question: "Can brands collaborate with Mutale?", answer: "Yes. Brand collaborations and promotional opportunities can be discussed through the Work With Us process.", category: "Booking", sortOrder: 4 },
    { question: "How can media professionals request information?", answer: "Use the official contact or media enquiry channel provided on the website.", category: "Media", sortOrder: 5 },
  ];
  for (const f of faqs) {
    await prisma.fAQ.create({ data: f });
  }

  const settings = [
    { key: "site_title", value: "Mutale Mwanza | Media Personality, Entrepreneur, Philanthropist", group: "seo" },
    { key: "site_description", value: "Media personality, TV producer, entrepreneur and philanthropist.", group: "seo" },
    { key: "contact_email", value: "", group: "contact" },
    { key: "contact_phone", value: "", group: "contact" },
    { key: "whatsapp_number", value: "", group: "contact" },
    { key: "service_area", value: "Lusaka Province & Copperbelt Province", group: "contact" },
    { key: "hero_tags", value: "MEDIA PERSONALITY, ENTREPRENEUR, PHILANTHROPIST", group: "general" },
  ];
  for (const s of settings) {
    await prisma.siteSettings.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  // Sample activity log so the admin log isn't empty
  await prisma.activityLog.create({
    data: {
      userId: adminUser.id,
      actorName: adminUser.name,
      action: "Initialised the admin dashboard",
      target: "System",
    },
  });
  await prisma.activityLog.create({
    data: {
      actorName: "System",
      action: "Seeded default website content",
      target: "Database",
    },
  });

  console.log("Database seeded successfully!");
  console.log("Admin login: admin / 12345");
  console.log("Editor login: editor@mutalemwanza.com / editor123");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
