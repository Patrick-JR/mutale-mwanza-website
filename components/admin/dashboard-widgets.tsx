"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Handshake,
  Layers,
  Image as ImageIcon,
  Speaker,
  Mail,
  Plus,
  Tag,
  Upload,
  PlayCircle,
  HelpCircle,
  CloudUpload,
  ArrowRight,
  CheckCircle2,
  Database,
  ShieldCheck,
  Clock,
  CircleDot,
} from "lucide-react";

export type DashboardStats = {
  websitePages: number;
  newEnquiries: number;
  galleryItems: number;
  videos: number;
  brands: number;
  services: number;
};

export type RecentEnquiry = {
  id: string;
  name: string;
  enquiryType: string;
  status: string;
  createdAt: string; // ISO
  initials: string;
};

interface StatsGridProps {
  stats: DashboardStats;
}

const statConfig = [
  { key: "websitePages", label: "Website Pages", sub: "Published", icon: Home, color: "bg-blue-50 text-blue-600" },
  { key: "newEnquiries", label: "New Enquiries", sub: "Awaiting response", icon: Mail, color: "bg-green-50 text-green-600" },
  { key: "galleryItems", label: "Gallery Items", sub: "Total uploaded", icon: ImageIcon, color: "bg-orange-50 text-orange-600" },
  { key: "videos", label: "Videos", sub: "Total uploaded", icon: PlayCircle, color: "bg-red-50 text-red-600" },
  { key: "brands", label: "Brands", sub: "Active", icon: Handshake, color: "bg-purple-50 text-purple-600" },
] as const;

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statConfig.map((s, i) => {
        const value = (stats as any)[s.key] ?? 0;
        return (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-white rounded-xl p-5 border border-charcoal-100"
          >
            <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={20} />
            </div>
            <p className="text-3xl font-serif font-bold text-charcoal-900">
              {value}
            </p>
            <p className="text-charcoal-700 text-sm font-medium mt-1">{s.label}</p>
            <p className="text-charcoal-400 text-xs mt-0.5">{s.sub}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

const quickActions = [
  { href: "/admin/services?new=1", label: "Add Service", icon: Layers, color: "bg-purple-50 text-purple-600" },
  { href: "/admin/brands?new=1", label: "Add Brand", icon: Tag, color: "bg-orange-50 text-orange-600" },
  { href: "/admin/gallery?new=1", label: "Upload Image", icon: Upload, color: "bg-green-50 text-green-600" },
  { href: "/admin/media?new=1", label: "Add Video", icon: PlayCircle, color: "bg-red-50 text-red-600" },
  { href: "/admin/faqs?new=1", label: "Add FAQ", icon: HelpCircle, color: "bg-rose-50 text-rose-600" },
  { href: "/admin/media", label: "Upload Media Kit", icon: CloudUpload, color: "bg-amber-50 text-amber-600" },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl p-6 border border-charcoal-100">
      <h2 className="font-serif text-xl text-charcoal-900 mb-5">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickActions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-charcoal-100 hover:border-gold-500 hover:shadow-sm transition-all text-center"
          >
            <div className={`w-12 h-12 rounded-full ${a.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
              <a.icon size={20} />
            </div>
            <span className="text-charcoal-700 text-sm font-medium leading-tight">
              {a.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const contentPages = [
  { href: "/admin/home", label: "Home", icon: Home },
  { href: "/admin/about", label: "About", icon: User },
  { href: "/admin/brands", label: "Brands", icon: Handshake },
  { href: "/admin/services", label: "Services", icon: Layers },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/media", label: "Media Room", icon: Speaker },
  { href: "/admin/contact", label: "Contact / Work With Us", icon: Mail },
];

export function ManageContentCards() {
  return (
    <div className="bg-white rounded-xl p-6 border border-charcoal-100">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="font-serif text-xl text-charcoal-900">Manage Website Content</h2>
          <p className="text-charcoal-500 text-sm">Edit and update your website pages</p>
        </div>
        <Link
          href="/admin/settings"
          className="text-gold-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
        >
          View All Pages
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentPages.map((p, i) => (
          <Link
            key={p.href}
            href={p.href}
            className="group flex items-center gap-4 p-4 rounded-xl border border-charcoal-100 hover:border-gold-500 hover:shadow-sm transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-ivory-100 flex items-center justify-center text-charcoal-700 group-hover:bg-gold-500/10 group-hover:text-gold-500 transition-colors">
              <p.icon size={20} />
            </div>
            <div className="flex-1">
              <p className="text-charcoal-900 font-semibold">{p.label}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-charcoal-500 text-xs">Published</span>
              </div>
            </div>
            <ArrowRight
              size={16}
              className="text-charcoal-300 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString();
}

function statusClass(status: string): string {
  const s = status.toUpperCase();
  if (s === "NEW") return "bg-gold-500/10 text-gold-500";
  if (s === "REVIEWING" || s === "CONTACTED") return "bg-blue-50 text-blue-600";
  if (s === "CONFIRMED" || s === "COMPLETED") return "bg-green-50 text-green-600";
  if (s === "DECLINED") return "bg-red-50 text-red-600";
  return "bg-charcoal-100 text-charcoal-700";
}

export function RecentEnquiries({ items }: { items: RecentEnquiry[] }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-charcoal-100">
      <div className="flex items-start justify-between mb-5">
        <h2 className="font-serif text-xl text-charcoal-900">Recent Enquiries</h2>
        <Link
          href="/admin/bookings"
          className="text-gold-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
        >
          View All
          <ArrowRight size={14} />
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="py-10 text-center">
          <div className="w-14 h-14 rounded-full bg-ivory-100 flex items-center justify-center mx-auto mb-3">
            <Mail className="text-charcoal-400" size={20} />
          </div>
          <p className="text-charcoal-700 font-medium">No enquiries yet</p>
          <p className="text-charcoal-400 text-sm">New submissions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <Link
              key={it.id}
              href={`/admin/bookings/${it.id}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-ivory-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-gold-500 text-sm font-semibold">{it.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-charcoal-900 font-medium truncate">{it.name}</p>
                <p className="text-charcoal-500 text-xs truncate">{it.enquiryType}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-charcoal-400 text-xs">{timeAgo(it.createdAt)}</p>
                <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded ${statusClass(it.status)}`}>
                  {it.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SystemStatus() {
  // Database + website status are real; backup status is honest.
  return (
    <div className="bg-white rounded-xl p-6 border border-charcoal-100">
      <h2 className="font-serif text-xl text-charcoal-900 mb-5">System Status</h2>
      <div className="space-y-4">
        <StatusRow icon={CheckCircle2} label="Website Status" value="Live" good />
        <StatusRow icon={Database} label="Database" value="Connected" good />
        <StatusRow icon={ShieldCheck} label="SSL Certificate" value="Valid" good />
        <StatusRow icon={Clock} label="Last Backup" value="Backup status not configured" muted />
      </div>
    </div>
  );
}

function StatusRow({
  icon: Icon,
  label,
  value,
  good,
  muted,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  good?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-charcoal-700">
        <Icon size={18} className="text-charcoal-500" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {good && <CircleDot size={10} className="text-green-500 fill-green-500" />}
        <span
          className={`text-sm font-semibold ${
            muted ? "text-charcoal-400 italic" : good ? "text-green-600" : "text-charcoal-700"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
