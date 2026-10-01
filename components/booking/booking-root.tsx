"use client";

import { ReactNode } from "react";
import { BookingProvider } from "@/components/booking/booking-modal";

export function BookingRoot({ children }: { children: ReactNode }) {
  return <BookingProvider>{children}</BookingProvider>;
}
