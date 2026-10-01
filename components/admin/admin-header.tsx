"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Calendar } from "lucide-react";
import { SidebarToggle } from "./sidebar";

interface AdminHeaderProps {
  userName: string;
  notificationCount: number;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function AdminHeader({ userName, notificationCount }: AdminHeaderProps) {
  const router = useRouter();
  const [date, setDate] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setDate(formatDate(new Date()));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-charcoal-100 sticky top-0 z-20">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <SidebarToggle onClick={() => {
            const ev = new CustomEvent("toggle-admin-sidebar");
            window.dispatchEvent(ev);
          }} />
          <div className="hidden md:flex items-center gap-2 text-sm text-charcoal-500">
            <Calendar size={16} />
            <span>{date || "\u00A0"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="relative w-9 h-9 rounded-full bg-ivory-100 flex items-center justify-center text-charcoal-700 hover:bg-ivory-200 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-500 text-charcoal-900 text-xs font-bold rounded-full px-1.5 min-w-[20px] h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-ivory-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center">
                <span className="text-gold-500 font-semibold text-sm">
                  {userName?.charAt(0)?.toUpperCase() ?? "A"}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-medium text-charcoal-700">
                {userName}
              </span>
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-charcoal-100 rounded-lg shadow-lg z-40 overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-charcoal-700 hover:bg-ivory-100 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
