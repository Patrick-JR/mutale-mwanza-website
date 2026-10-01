/**
 * Email notification helper.
 *
 * Uses nodemailer with SMTP credentials supplied via env vars.
 * If no credentials are configured, this no-ops (the booking is still saved).
 *
 * Recommended free SMTP options (no commitment, no credit card):
 *   - Resend      (https://resend.com)        — 100 emails/day free
 *   - Brevo SMTP  (https://brevo.com)         — 300 emails/day free
 *   - Gmail App Password                      — free with a Gmail account
 *   - Mailgun SMTP (https://mailgun.com)      — 100 emails/day free trial
 *   - Zoho ZeptoMail (https://zoho.com/zeptomail) — 10K/month free
 *
 * Env vars:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO
 */

import * as nodemailer from "nodemailer";

type Transporter = nodemailer.Transporter;

let cachedTransport: Transporter | null = null;

function getTransport(): Transporter | null {
  if (cachedTransport) return cachedTransport;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  cachedTransport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return cachedTransport;
}

export function isEmailConfigured(): boolean {
  return getTransport() !== null;
}

export async function sendNotificationEmail(params: {
  subject: string;
  bookingId?: string;
  fields: { label: string; value: string }[];
}): Promise<{ ok: boolean; reason?: string }> {
  const transport = getTransport();
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  const to = process.env.MAIL_TO || process.env.SMTP_USER;

  if (!transport || !from || !to) {
    return { ok: false, reason: "Email not configured" };
  }

  const rows = params.fields
    .filter((f) => f.value && f.value.length > 0)
    .map(
      (f) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;font-weight:600;color:#333">${f.label}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#555">${escapeHtml(
          f.value
        )}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px">
      <div style="background:#C89D61;color:#1a1a1a;padding:16px 24px;border-radius:8px 8px 0 0">
        <h2 style="margin:0;font-size:20px">${escapeHtml(params.subject)}</h2>
      </div>
      <div style="background:#fafaf8;padding:24px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px">
        ${
          params.bookingId
            ? `<p style="color:#888;font-size:12px;margin:0 0 12px">Reference: <code>${escapeHtml(
                params.bookingId
              )}</code></p>`
            : ""
        }
        <table style="width:100%;border-collapse:collapse;margin-top:12px">${rows}</table>
      </div>
      <p style="color:#aaa;font-size:11px;margin-top:16px;text-align:center">
        Sent from the Mutale Mwanza website admin notification system.
      </p>
    </div>
  `;

  try {
    await transport.sendMail({
      from,
      to,
      subject: params.subject,
      html,
    });
    return { ok: true };
  } catch (err: any) {
    console.error("Email send error:", err?.message || err);
    return { ok: false, reason: err?.message || "Send failed" };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
