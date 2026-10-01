import type { Metadata } from "next";
import "./globals.css";
import { BookingRoot } from "@/components/booking/booking-root";

export const metadata: Metadata = {
  title: "Mutale Mwanza | Media Personality, Entrepreneur, Philanthropist",
  description:
    "Official website of Mutale Mwanza — Media personality, entrepreneur and philanthropist.",
  keywords: ["Mutale Mwanza", "media personality", "Zambia", "entrepreneur"],
  openGraph: {
    title: "Mutale Mwanza",
    description: "Media Personality | Entrepreneur | Philanthropist",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <BookingRoot>{children}</BookingRoot>
      </body>
    </html>
  );
}
