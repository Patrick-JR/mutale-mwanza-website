"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  User,
  Handshake,
  Layers,
  Image as ImageIcon,
  Speaker,
  Mail,
  CalendarCheck,
  Inbox,
  HelpCircle,
  Settings,
  Users,
  Activity,
  ExternalLink,
  X,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: number;
};

const mainNav: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/home", label: "Home", icon: Home },
  { href: "/admin/about", label: "About", icon: User },
  { href: "/admin/brands", label: "Brands", icon: Handshake },
  { href: "/admin/services", label: "Services", icon: Layers },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/media", label: "Media Room", icon: Speaker },
  { href: "/admin/contact", label: "Contact / Work With Us", icon: Mail },
];

const opsNav: NavItem[] = [
  { href: "/admin/bookings", label: "Bookings & Enquiries", icon: CalendarCheck, badge: 0 },
  { href: "/admin/messages", label: "Messages", icon: Inbox, badge: 0 },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
];

const sysNav: NavItem[] = [
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/activity-log", label: "Activity Log", icon: Activity },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  userName: string;
  newEnquiries: number;
  unreadMessages: number;
}

export function AdminSidebar({ open, onClose, userName, newEnquiries, unreadMessages }: SidebarProps) {
  const pathname = usePathname();

  const badgeFor = (href: string) => {
    if (href === "/admin/bookings") return newEnquiries;
    if (href === "/admin/messages") return unreadMessages;
    return 0;
  };

  const renderItem = (item: NavItem) => {
    const isActive =
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname === item.href || pathname.startsWith(item.href + "/");
    const badge = badgeFor(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClose}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
          isActive
            ? "bg-gold-500 text-charcoal-900"
            : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white"
        )}
      >
        <item.icon size={18} />
        <span className="flex-1">{item.label}</span>
        {badge > 0 && (
          <span className="bg-gold-500 text-charcoal-900 text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">
            {badge}
          </span>
        )}
      </Link>
    );
  };

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-charcoal-700">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center">
            <span className="font-serif text-charcoal-900 font-bold text-lg">M</span>
          </div>
          <div className="leading-tight">
            <p className="text-white font-serif text-base font-semibold">MUTALE</p>
            <p className="text-charcoal-400 text-xs tracking-[0.25em]">MWANZA</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {mainNav.map(renderItem)}

        <div className="my-3 border-t border-charcoal-700" />

        {opsNav.map((item) => (
          <div key={item.href}>
            {renderItem(item)}
          </div>
        ))}

        <div className="my-3 border-t border-charcoal-700" />

        {sysNav.map(renderItem)}
      </nav>

      {/* Bottom: View Website + User */}
      <div className="border-t border-charcoal-700 p-3 space-y-3">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-charcoal-300 hover:bg-charcoal-800 hover:text-white transition-colors"
        >
          <ExternalLink size={18} />
          <span className="flex-1">View Website</span>
          <ExternalLink size={12} className="opacity-50" />
        </Link>

        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-full bg-gold-500/20 flex items-center justify-center">
            <span className="text-gold-500 font-semibold text-sm">
              {userName?.charAt(0)?.toUpperCase() ?? "A"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{userName}</p>
            <p className="text-charcoal-400 text-xs">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 lg:z-auto w-64 h-screen bg-charcoal-900 text-white border-r border-charcoal-700 transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <button
          onClick={onClose}
          className="lg:hidden absolute top-3 right-3 p-2 text-charcoal-300 hover:text-white"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
        {content}
      </aside>
    </>
  );
}

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 text-charcoal-700 hover:text-charcoal-900"
      aria-label="Open menu"
    >
      <Menu size={22} />
    </button>
  );
}
