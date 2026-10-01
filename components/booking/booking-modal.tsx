"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Mail, Phone, Building, MessageSquare, DollarSign, Users, Tag, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, Send } from "lucide-react";

type FormData = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  reason: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  expectedAudience: string;
  budget: string;
  message: string;
  consent: boolean;
};

const empty: FormData = {
  fullName: "", company: "", email: "", phone: "",
  reason: "", eventDate: "", eventTime: "",
  eventType: "", expectedAudience: "", budget: "",
  message: "", consent: false,
};

const REASONS = [
  "TV & Media Appearance",
  "Radio Appearance",
  "Brand Collaboration",
  "Event / Audience Hosting",
  "Media Interview / Press",
  "Speaking Engagement",
  "Other Professional Enquiry",
];

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00",
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function formatDateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

type Ctx = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const BookingContext = createContext<Ctx | null>(null);

export function useBookingModal(): Ctx {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookingModal must be used within BookingProvider");
  return ctx;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => { setIsOpen(true); document.body.style.overflow = "hidden"; }, []);
  const close = useCallback(() => { setIsOpen(false); document.body.style.overflow = ""; }, []);
  return (
    <BookingContext.Provider value={{ open, close, isOpen }}>
      {children}
      <BookingModal />
    </BookingContext.Provider>
  );
}

function BookingModal() {
  const { isOpen, close } = useBookingModal();
  const [form, setForm] = useState<FormData>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleChange = (k: keyof FormData, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.fullName.trim() || !form.email.trim() || !form.reason) {
      setError("Please fill in your name, email and reason for working with us.");
      return;
    }
    if (!form.consent) {
      setError("Please confirm consent before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          company: form.company,
          email: form.email,
          phone: form.phone,
          enquiryType: form.reason,
          service: form.reason,
          eventDate: form.eventDate,
          eventTime: form.eventTime,
          eventType: form.eventType,
          expectedAudience: form.expectedAudience,
          budget: form.budget,
          message: form.message,
          consent: form.consent,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Submission failed.");
      setSubmitted(true);
      setForm(empty);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setForm(empty);
      setSubmitted(false);
      setError(null);
      setCalendarOpen(false);
    }, 300);
  };

  const firstDay = new Date(calYear, calMonth, 1);
  const lastDay = new Date(calYear, calMonth + 1, 0);
  const startWeekday = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(calYear, calMonth, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const selectedDate = form.eventDate ? new Date(form.eventDate + "T00:00:00") : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.35 }}
            className="relative w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-charcoal-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <p className="text-gold-500 text-xs uppercase tracking-wider font-semibold">Work With Us</p>
                <h2 className="font-serif text-2xl text-charcoal-900">Book Mutale Mwanza</h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-ivory-100 hover:bg-charcoal-100 flex items-center justify-center text-charcoal-700"
                aria-label="Close booking form"
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="p-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/10 mb-5">
                  <CheckCircle2 className="text-gold-500 w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal-900 mb-3">Enquiry Received</h3>
                <p className="text-charcoal-600 mb-6">
                  Thank you for reaching out. Your request has been received and will be reviewed by the team.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold px-6 py-3 rounded transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {error && (
                  <div className="p-3 border border-red-300 bg-red-50 text-red-700 text-sm rounded flex items-start gap-2">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <p className="text-charcoal-500 text-xs">
                  Fields marked with <span className="text-gold-500">*</span> are required.
                </p>

                {/* Name + Company */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <FormField label="Full Name *" name="fullName" value={form.fullName} onChange={(v) => handleChange("fullName", v)} icon={User} required />
                  <FormField label="Company / Organisation" name="company" value={form.company} onChange={(v) => handleChange("company", v)} icon={Building} />
                </div>

                {/* Email + Phone */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <FormField label="Email *" name="email" type="email" value={form.email} onChange={(v) => handleChange("email", v)} icon={Mail} required />
                  <FormField label="Phone" name="phone" type="tel" value={form.phone} onChange={(v) => handleChange("phone", v)} icon={Phone} />
                </div>

                {/* Reason */}
                <div>
                  <label className="flex items-center gap-1.5 text-charcoal-700 text-xs font-semibold mb-1.5">
                    <Tag size={13} className="text-charcoal-400" />
                    Reason For Working With Us <span className="text-gold-500">*</span>
                  </label>
                  <select
                    value={form.reason}
                    onChange={(e) => handleChange("reason", e.target.value)}
                    className="w-full px-3 py-2.5 bg-ivory-100 border border-charcoal-200 rounded text-charcoal-900 text-sm focus:border-gold-500 focus:outline-none"
                    required
                  >
                    <option value="">Select a reason</option>
                    {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                {/* Date + Time */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <label className="flex items-center gap-1.5 text-charcoal-700 text-xs font-semibold mb-1.5">
                      <Calendar size={13} className="text-charcoal-400" />
                      Preferred Date
                    </label>
                    <button
                      type="button"
                      onClick={() => setCalendarOpen((v) => !v)}
                      className="w-full px-3 py-2.5 bg-ivory-100 border border-charcoal-200 rounded text-charcoal-900 text-left text-sm focus:border-gold-500 focus:outline-none flex items-center justify-between"
                    >
                      <span className={form.eventDate ? "text-charcoal-900" : "text-charcoal-400"}>
                        {form.eventDate
                          ? new Date(form.eventDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
                          : "Pick a date"}
                      </span>
                      <Calendar size={14} className="text-charcoal-400" />
                    </button>
                    {calendarOpen && (
                      <div className="absolute z-20 mt-1 bg-white border border-charcoal-200 rounded-lg shadow-lg p-3 w-full sm:w-80">
                        <div className="flex items-center justify-between mb-2">
                          <button type="button" onClick={() => { const m = calMonth - 1; if (m < 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(m); }} className="p-1 hover:bg-ivory-100 rounded" aria-label="Previous month">
                            <ChevronLeft size={16} />
                          </button>
                          <p className="font-semibold text-sm">{MONTHS[calMonth]} {calYear}</p>
                          <button type="button" onClick={() => { const m = calMonth + 1; if (m > 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(m); }} className="p-1 hover:bg-ivory-100 rounded" aria-label="Next month">
                            <ChevronRight size={16} />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-xs text-charcoal-500 mb-1">
                          {["S","M","T","W","T","F","S"].map((d, i) => <div key={i}>{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {cells.map((d, i) => {
                            if (!d) return <div key={i} />;
                            const past = d < today;
                            const selected = selectedDate && formatDateKey(d) === formatDateKey(selectedDate);
                            return (
                              <button
                                key={i}
                                type="button"
                                disabled={past}
                                onClick={() => { handleChange("eventDate", formatDateKey(d)); setCalendarOpen(false); }}
                                className={`aspect-square text-sm rounded ${selected ? "bg-gold-500 text-charcoal-900 font-bold" : past ? "text-charcoal-300 cursor-not-allowed" : "hover:bg-ivory-100 text-charcoal-700"}`}
                              >
                                {d.getDate()}
                              </button>
                            );
                          })}
                        </div>
                        <button type="button" onClick={() => { handleChange("eventDate", ""); setCalendarOpen(false); }} className="mt-2 text-xs text-charcoal-500 hover:text-charcoal-800">Clear</button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-charcoal-700 text-xs font-semibold mb-1.5">
                      <Clock size={13} className="text-charcoal-400" />
                      Preferred Time
                    </label>
                    <select
                      value={form.eventTime}
                      onChange={(e) => handleChange("eventTime", e.target.value)}
                      className="w-full px-3 py-2.5 bg-ivory-100 border border-charcoal-200 rounded text-charcoal-900 text-sm focus:border-gold-500 focus:outline-none"
                    >
                      <option value="">Select a time</option>
                      {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Event details (optional) */}
                <details className="border border-charcoal-100 rounded-lg p-3 group">
                  <summary className="cursor-pointer text-charcoal-700 text-sm font-semibold list-none flex items-center justify-between">
                    <span>Add event details (optional)</span>
                    <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="mt-3 space-y-3">
                    <FormField label="Event Type" name="eventType" value={form.eventType} onChange={(v) => handleChange("eventType", v)} placeholder="e.g. Awards night, brand launch, conference" />
                    <FormField label="Expected Audience" name="expectedAudience" value={form.expectedAudience} onChange={(v) => handleChange("expectedAudience", v)} icon={Users} placeholder="e.g. 200 guests, broadcast audience" />
                    <FormField label="Budget / Budget Range" name="budget" value={form.budget} onChange={(v) => handleChange("budget", v)} icon={DollarSign} placeholder="Optional" />
                  </div>
                </details>

                {/* Message */}
                <div>
                  <label className="flex items-center gap-1.5 text-charcoal-700 text-xs font-semibold mb-1.5">
                    <MessageSquare size={13} className="text-charcoal-400" />
                    Additional Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={3}
                    placeholder="Tell us more about your opportunity, event or collaboration…"
                    className="w-full px-3 py-2.5 bg-ivory-100 border border-charcoal-200 rounded text-charcoal-900 text-sm placeholder:text-charcoal-400 focus:border-gold-500 focus:outline-none resize-none"
                  />
                </div>

                <label className="flex items-start gap-2 text-xs text-charcoal-600">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => handleChange("consent", e.target.checked)}
                    className="mt-0.5 accent-gold-500"
                  />
                  <span>By submitting, you agree that the information provided may be used to respond to your enquiry.</span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 text-charcoal-900 font-semibold py-3 rounded hover:bg-gold-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={15} />
                  {submitting ? "Submitting…" : "Submit Enquiry"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FormField({ label, name, value, onChange, type = "text", required, placeholder, icon: Icon }: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  icon?: any;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-charcoal-700 text-xs font-semibold mb-1.5">
        {Icon && <Icon size={13} className="text-charcoal-400" />}
        {label} {required && <span className="text-gold-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 bg-ivory-100 border border-charcoal-200 rounded text-charcoal-900 text-sm placeholder:text-charcoal-400 focus:border-gold-500 focus:outline-none"
      />
    </div>
  );
}
