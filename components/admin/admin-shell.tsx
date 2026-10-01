"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "./sidebar";
import { AdminHeader } from "./admin-header";

interface AdminShellProps {
  userName: string;
  notificationCount: number;
  newEnquiries: number;
  unreadMessages: number;
  children: React.ReactNode;
}

export function AdminShell({
  userName,
  notificationCount,
  newEnquiries,
  unreadMessages,
  children,
}: AdminShellProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen((v) => !v);
    window.addEventListener("toggle-admin-sidebar", handler);
    return () => window.removeEventListener("toggle-admin-sidebar", handler);
  }, []);

  return (
    <div className="min-h-screen bg-ivory-100 flex">
      <AdminSidebar
        open={open}
        onClose={() => setOpen(false)}
        userName={userName}
        newEnquiries={newEnquiries}
        unreadMessages={unreadMessages}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          userName={userName}
          notificationCount={notificationCount}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
