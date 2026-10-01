import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotificationEmail } from "@/lib/email";

type BookingPayload = {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  enquiryType: string;
  service: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  eventType?: string;
  expectedAudience?: string;
  brandName?: string;
  campaignProduct?: string;
  campaignObjective?: string;
  preferredTiming?: string;
  budget?: string;
  message?: string;
  consent?: boolean;
};

function isString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<BookingPayload>;

    if (
      !isString(body.fullName) ||
      !isString(body.email) ||
      !isString(body.enquiryType) ||
      !isString(body.service)
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!body.consent) {
      return NextResponse.json(
        { error: "Consent is required to submit the form." },
        { status: 400 }
      );
    }

    const created = await prisma.booking.create({
      data: {
        fullName: body.fullName.trim(),
        company: body.company?.trim() || null,
        email: body.email.trim(),
        phone: body.phone?.trim() || null,
        enquiryType: body.enquiryType.trim(),
        service: body.service.trim(),
        eventDate: body.eventDate?.trim() || null,
        eventTime: body.eventTime?.trim() || null,
        eventLocation: body.eventLocation?.trim() || null,
        eventType: body.eventType?.trim() || null,
        expectedAudience: body.expectedAudience?.trim() || null,
        brandName: body.brandName?.trim() || null,
        campaignProduct: body.campaignProduct?.trim() || null,
        campaignObjective: body.campaignObjective?.trim() || null,
        preferredTiming: body.preferredTiming?.trim() || null,
        budget: body.budget?.trim() || null,
        message: body.message?.trim() || null,
        status: "NEW",
      },
    });

    // 1) n8n webhook (if configured)
    const webhookUrl =
      process.env.N8N_BOOKING_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL || "";
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: created.id,
            fullName: created.fullName,
            email: created.email,
            phone: created.phone,
            company: created.company,
            enquiryType: created.enquiryType,
            service: created.service,
            eventDate: created.eventDate,
            eventTime: created.eventTime,
            eventLocation: created.eventLocation,
            eventType: created.eventType,
            expectedAudience: created.expectedAudience,
            brandName: created.brandName,
            campaignProduct: created.campaignProduct,
            campaignObjective: created.campaignObjective,
            preferredTiming: created.preferredTiming,
            budget: created.budget,
            message: created.message,
            createdAt: created.createdAt,
          }),
        });
      } catch (webhookErr) {
        console.error("n8n webhook trigger failed:", webhookErr);
      }
    }

    // 2) Email notification (if SMTP configured)
    await sendNotificationEmail({
      subject: `New ${created.enquiryType} — ${created.fullName}`,
      bookingId: created.id,
      fields: [
        { label: "Name", value: created.fullName },
        { label: "Email", value: created.email },
        { label: "Phone", value: created.phone || "" },
        { label: "Company", value: created.company || "" },
        { label: "Enquiry type", value: created.enquiryType },
        { label: "Service", value: created.service },
        { label: "Event date", value: created.eventDate || "" },
        { label: "Event time", value: created.eventTime || "" },
        { label: "Event location", value: created.eventLocation || "" },
        { label: "Budget", value: created.budget || "" },
        { label: "Message", value: created.message || "" },
      ],
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (err) {
    console.error("Booking submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
