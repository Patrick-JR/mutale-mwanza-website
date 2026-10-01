import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/admin/login");
  }

  // Live counts for sidebar badges + notification bell
  const [newEnquiries, unreadMessages] = await Promise.all([
    prisma.booking.count({ where: { status: "NEW" } }),
    prisma.message.count({ where: { isRead: false } }),
  ]);

  const notificationCount = newEnquiries + unreadMessages;

  return (
    <AdminShell
      userName={user.name}
      notificationCount={notificationCount}
      newEnquiries={newEnquiries}
      unreadMessages={unreadMessages}
    >
      {children}
    </AdminShell>
  );
}
