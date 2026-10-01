/**
 * Root /admin layout — minimal passthrough.
 * The auth gate lives in /admin/(protected)/layout.tsx so /admin/login
 * is reachable without a session.
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
