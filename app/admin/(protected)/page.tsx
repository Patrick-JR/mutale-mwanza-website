import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  StatsGrid,
  QuickActions,
  ManageContentCards,
  RecentEnquiries,
  SystemStatus,
  type RecentEnquiry,
} from "@/components/admin/dashboard-widgets";

export const dynamic = "force-dynamic";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((p) => p.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function AdminDashboardPage() {
  const user = await getSessionUser();

  // Live stats from SQLite
  const [
    websitePages,
    newEnquiriesCount,
    galleryItems,
    videos,
    brands,
    services,
    recentRows,
  ] = await Promise.all([
    Promise.resolve(7), // home, about, brands, services, gallery, media, contact
    prisma.booking.count({ where: { status: "NEW" } }),
    prisma.galleryImage.count(),
    prisma.video.count(),
    prisma.brand.count({ where: { isActive: true } }),
    prisma.service.count({ where: { isActive: true } }),
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        fullName: true,
        enquiryType: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  const recentEnquiries: RecentEnquiry[] = recentRows.map((r) => ({
    id: r.id,
    name: r.fullName,
    enquiryType: r.enquiryType,
    status: r.status,
    createdAt: r.createdAt.toISOString(),
    initials: initialsOf(r.fullName),
  }));

  const stats = {
    websitePages,
    newEnquiries: newEnquiriesCount,
    galleryItems,
    videos,
    brands,
    services,
  };

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            {getGreeting()}, {user?.name?.split(" ")[0] ?? "Team"}&rsquo;s Team <span className="inline-block">👋</span>
          </h1>
          <p className="text-charcoal-500 mt-1">
            Here&rsquo;s what&rsquo;s happening on your website today.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-charcoal-700 hover:text-gold-500"
        >
          View public site
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Manage Content + Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ManageContentCards />
        </div>
        <div>
          <RecentEnquiries items={recentEnquiries} />
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemStatus />
        <div className="bg-white rounded-xl p-6 border border-charcoal-100">
          <h2 className="font-serif text-xl text-charcoal-900 mb-3">Preview Website</h2>
          <p className="text-charcoal-500 text-sm mb-4">
            Open the public site in a new tab to review the latest content.
          </p>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gold-500 text-charcoal-900 font-semibold px-5 py-2.5 rounded hover:bg-gold-400 transition-colors"
          >
            Open Public Site
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
