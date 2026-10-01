"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Send, CheckCircle2, Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

const ENQUIRY_TYPES = [
  { value: "Event / Hosting", label: "Event / Hosting" },
  { value: "Brand Collaboration", label: "Brand Collaboration" },
  { value: "Media Opportunity", label: "Media Opportunity" },
  { value: "Other Professional Enquiry", label: "Other Professional Enquiry" },
];

const SERVICE_OPTIONS = [
  { value: "TV & Media", label: "TV & Media" },
  { value: "Radio / Media Appearance", label: "Radio / Media Appearance" },
  { value: "Brand Collaboration", label: "Brand Collaboration" },
  { value: "Event & Audience Hosting", label: "Event & Audience Hosting" },
  { value: "Other", label: "Other" },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatDateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

type FormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  enquiryType: string;
  service: string;
  eventDate: string;
  eventLocation: string;
  eventType: string;
  expectedAudience: string;
  brandName: string;
  campaignProduct: string;
  campaignObjective: string;
  preferredTiming: string;
  budget: string;
  message: string;
  consent: boolean;
};

const initialState: FormState = {
  fullName: "", company: "", email: "", phone: "",
  enquiryType: "", service: "",
  eventDate: "", eventLocation: "", eventType: "", expectedAudience: "",
  brandName: "", campaignProduct: "", campaignObjective: "", preferredTiming: "",
  budget: "", message: "", consent: false,
};

export function BookingFormSection() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const today = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.fullName || !form.email || !form.enquiryType || !form.service) {
      setError("Please fill in your name, email, enquiry type and service.");
      return;
    }
    if (!form.consent) {
      setError("Please confirm the consent statement before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed. Please try again.");
      }
      setSubmitted(true);
      setForm(initialState);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="enquiry-form" className="section-light py-20 scroll-mt-24">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto bg-white border border-charcoal-100 rounded-lg p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/10 mb-6">
              <CheckCircle2 className="text-gold-500 w-8 h-8" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 mb-4">Enquiry Received</h2>
            <p className="text-charcoal-600 leading-relaxed">
              Thank you for reaching out. Your request has been received and will
              be reviewed by the team.
            </p>
          </motion.div>
        </Container>
      </section>
    );
  }

  const showEventFields = form.enquiryType === "Event / Hosting";
  const showBrandFields = form.enquiryType === "Brand Collaboration";

  // Calendar grid
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
    <section id="enquiry-form" className="section-cream py-20 scroll-mt-24">
      <Container>
        <div className="max-w-4xl mx-auto bg-white border border-charcoal-100 rounded-lg p-8 md:p-10 shadow-sm">
          <div className="text-center mb-8">
            <span className="kicker block mb-3">ENQUIRY FORM</span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">Book / Enquire</h2>
            <p className="text-charcoal-500 text-sm mt-3">
              Fill in the details below and the team will review your request.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Full Name *" name="fullName" value={form.fullName} onChange={handleChange} required />
              <Field label="Company / Organization" name="company" value={form.company} onChange={handleChange} />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Email Address *" name="email" type="email" value={form.email} onChange={handleChange} required />
              <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <SelectField label="Enquiry Type *" name="enquiryType" value={form.enquiryType} onChange={handleChange} options={ENQUIRY_TYPES} required />
              <SelectField label="Service / Opportunity *" name="service" value={form.service} onChange={handleChange} options={SERVICE_OPTIONS} required />
            </div>

            {/* Event fields */}
            {showEventFields && (
              <div className="border border-charcoal-100 rounded-lg p-5 bg-charcoal-50/40 space-y-5">
                <p className="text-gold-500 text-xs uppercase tracking-wider font-semibold">Event Details</p>
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Calendar picker */}
                  <div>
                    <label className="block text-charcoal-700 text-sm font-semibold mb-2">Event Date</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setCalendarOpen((v) => !v)}
                        className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded text-charcoal-900 text-left flex items-center justify-between focus:border-gold-500 focus:outline-none"
                      >
                        <span className={form.eventDate ? "text-charcoal-900" : "text-charcoal-400"}>
                          {form.eventDate
                            ? new Date(form.eventDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
                            : "Pick a date"}
                        </span>
                        <Calendar size={16} className="text-charcoal-400" />
                      </button>
                      {calendarOpen && (
                        <div className="absolute z-20 mt-1 bg-white border border-charcoal-200 rounded-lg shadow-lg p-3 w-full sm:w-80">
                          <div className="flex items-center justify-between mb-2">
                            <button type="button" onClick={() => {
                              const m = calMonth - 1;
                              if (m < 0) { setCalMonth(11); setCalYear(calYear - 1); }
                              else setCalMonth(m);
                            }} className="p-1 hover:bg-ivory-100 rounded" aria-label="Previous month">
                              <ChevronLeft size={16} />
                            </button>
                            <p className="font-semibold text-sm">{MONTHS[calMonth]} {calYear}</p>
                            <button type="button" onClick={() => {
                              const m = calMonth + 1;
                              if (m > 11) { setCalMonth(0); setCalYear(calYear + 1); }
                              else setCalMonth(m);
                            }} className="p-1 hover:bg-ivory-100 rounded" aria-label="Next month">
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
                                  onClick={() => {
                                    setForm((f) => ({ ...f, eventDate: formatDateKey(d) }));
                                    setCalendarOpen(false);
                                  }}
                                  className={`aspect-square text-sm rounded ${
                                    selected ? "bg-gold-500 text-charcoal-900 font-bold" :
                                    past ? "text-charcoal-300 cursor-not-allowed" :
                                    "hover:bg-ivory-100 text-charcoal-700"
                                  }`}
                                >
                                  {d.getDate()}
                                </button>
                              );
                            })}
                          </div>
                          <button
                            type="button"
                            onClick={() => { setForm((f) => ({ ...f, eventDate: "" })); setCalendarOpen(false); }}
                            className="mt-2 text-xs text-charcoal-500 hover:text-charcoal-800"
                          >
                            Clear
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <Field label="Event Location" name="eventLocation" value={form.eventLocation} onChange={handleChange} placeholder="City or venue" />
                </div>
                <Field label="Event Type" name="eventType" value={form.eventType} onChange={handleChange} placeholder="e.g. corporate conference, awards night, brand activation" />
                <Field label="Expected Audience" name="expectedAudience" value={form.expectedAudience} onChange={handleChange} placeholder="e.g. 200 guests, broadcast audience" />
              </div>
            )}

            {showBrandFields && (
              <div className="border border-charcoal-100 rounded-lg p-5 bg-charcoal-50/40 space-y-5">
                <p className="text-gold-500 text-xs uppercase tracking-wider font-semibold">Brand Collaboration Details</p>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Brand / Company Name" name="brandName" value={form.brandName} onChange={handleChange} />
                  <Field label="Campaign / Product" name="campaignProduct" value={form.campaignProduct} onChange={handleChange} />
                </div>
                <Field label="Campaign Objective" name="campaignObjective" value={form.campaignObjective} onChange={handleChange} placeholder="e.g. product launch, audience awareness" />
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Preferred Timing" name="preferredTiming" value={form.preferredTiming} onChange={handleChange} />
                  <Field label="Budget / Budget Range" name="budget" value={form.budget} onChange={handleChange} placeholder="Optional" />
                </div>
              </div>
            )}

            {/* Always-shown extras when no specific conditional section */}
            {!showEventFields && !showBrandFields && (
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Event Date (optional)" name="eventDate" type="date" value={form.eventDate} onChange={handleChange} />
                <Field label="Event Location (optional)" name="eventLocation" value={form.eventLocation} onChange={handleChange} placeholder="Optional" />
              </div>
            )}

            <div>
              <label className="block text-charcoal-700 text-sm font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us more about your opportunity, event or collaboration..."
                className="w-full px-4 py-3 bg-ivory-100 border border-charcoal-200 rounded text-charcoal-900 placeholder:text-charcoal-400 focus:border-gold-500 focus:outline-none resize-none"
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-charcoal-600">
              <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="mt-1 accent-gold-500" />
              <span>By submitting this form, you agree that the information provided may be used to respond to your enquiry.</span>
            </label>

            <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 text-charcoal-900 font-semibold py-3.5 rounded hover:bg-gold-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
              <Send size={16} />
              {submitting ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

function Field({ label, name, value, onChange, type = "text", required, placeholder }: any) {
  return (
    <div>
      <label className="block text-charcoal-700 text-sm font-semibold mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-ivory-100 border border-charcoal-200 rounded text-charcoal-900 placeholder:text-charcoal-400 focus:border-gold-500 focus:outline-none"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required }: any) {
  return (
    <div>
      <label className="block text-charcoal-700 text-sm font-semibold mb-2">{label}</label>
      <select name={name} value={value} onChange={onChange} required={required} className="w-full px-4 py-3 bg-ivory-100 border border-charcoal-200 rounded text-charcoal-900 focus:border-gold-500 focus:outline-none">
        <option value="">Select an option</option>
        {options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
