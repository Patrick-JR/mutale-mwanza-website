"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Mail, Phone, Building, Calendar, MapPin, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";

type Booking = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  company: string | null;
  enquiryType: string;
  service: string;
  eventDate: string | null;
  eventLocation: string | null;
  budget: string | null;
  message: string | null;
  status: string;
  createdAt: string;
};

const STATUSES = ["NEW", "REVIEWING", "CONTACTED", "CONFIRMED", "DECLINED", "COMPLETED"];

export function BookingsManager({ initialItems }: { initialItems: Booking[] }) {
  const [items, setItems] = useState(initialItems);
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("ALL");
  const [toast, setToast] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const showToast = (kind: "ok" | "err", msg: string) => {
    setToast({ kind, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = filter === "ALL" ? items : items.filter((i) => i.status === filter);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error);
      setItems((p) => p.map((it) => (it.id === id ? { ...it, status } : it)));
      showToast("ok", `Status updated to ${status}.`);
    } catch (err: any) {
      showToast("err", err.message);
    }
  };

  const deleteOne = async (id: string) => {
    if (!confirm("Delete this enquiry permanently?")) return;
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setItems((p) => p.filter((it) => it.id !== id));
      setOpenId(null);
      showToast("ok", "Deleted.");
    } catch (err: any) {
      showToast("err", err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl text-charcoal-900">Bookings &amp; Enquiries</h1>
        <p className="text-charcoal-500 text-sm mt-1">All Work With Us submissions. Click a row to view details and update status.</p>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        {["ALL", ...STATUSES].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filter === s ? "bg-gold-500 text-charcoal-900" : "bg-white border border-charcoal-200 text-charcoal-600 hover:border-gold-500"
            }`}
          >
            {s} {s !== "ALL" && `(${items.filter((i) => i.status === s).length})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-dashed border-charcoal-200 rounded-xl p-12 text-center">
          <Mail className="text-charcoal-400 mx-auto mb-4" size={32} />
          <p className="text-charcoal-700 font-medium">No enquiries yet</p>
          <p className="text-charcoal-500 text-sm">New submissions from the Work With Us form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => {
            const isOpen = openId === b.id;
            return (
              <div key={b.id} className="bg-white rounded-xl border border-charcoal-100 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : b.id)}
                  className="w-full p-4 flex items-center gap-4 text-left hover:bg-ivory-100/40"
                >
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-500 text-sm font-semibold">{b.fullName.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-charcoal-900 truncate">{b.fullName}</p>
                    <p className="text-charcoal-500 text-sm truncate">
                      {b.enquiryType} · {b.service}
                    </p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end text-xs text-charcoal-400 mr-3">
                    <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                    <span>{new Date(b.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    b.status === "NEW" ? "bg-gold-500/10 text-gold-500" :
                    b.status === "REVIEWING" || b.status === "CONTACTED" ? "bg-blue-50 text-blue-600" :
                    b.status === "CONFIRMED" || b.status === "COMPLETED" ? "bg-green-50 text-green-600" :
                    b.status === "DECLINED" ? "bg-red-50 text-red-600" : "bg-charcoal-100 text-charcoal-700"
                  }`}>
                    {b.status}
                  </span>
                  <ChevronRight size={16} className={`text-charcoal-400 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                </button>

                {isOpen && (
                  <div className="border-t border-charcoal-100 p-5 bg-ivory-100/40">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <Field icon={Mail} label="Email" value={b.email} href={`mailto:${b.email}`} />
                        <Field icon={Phone} label="Phone" value={b.phone || "—"} href={b.phone ? `tel:${b.phone}` : undefined} />
                        <Field icon={Building} label="Company" value={b.company || "—"} />
                        <Field icon={Calendar} label="Event date" value={b.eventDate || "—"} />
                        <Field icon={MapPin} label="Event location" value={b.eventLocation || "—"} />
                        <Field label="Budget" value={b.budget || "—"} />
                      </div>
                      <div>
                        <div className="text-xs text-charcoal-500 uppercase tracking-wider mb-1">Service</div>
                        <p className="text-charcoal-900 mb-4">{b.service}</p>
                        <div className="text-xs text-charcoal-500 uppercase tracking-wider mb-1">Enquiry type</div>
                        <p className="text-charcoal-900 mb-4">{b.enquiryType}</p>
                        <div className="text-xs text-charcoal-500 uppercase tracking-wider mb-1">Message</div>
                        <p className="text-charcoal-700 whitespace-pre-wrap text-sm">{b.message || "—"}</p>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-charcoal-200 flex flex-wrap items-center gap-3">
                      <span className="text-sm text-charcoal-500 mr-2">Update status:</span>
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => updateStatus(b.id, s)}
                          disabled={b.status === s}
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            b.status === s ? "bg-gold-500 text-charcoal-900" : "bg-white border border-charcoal-200 text-charcoal-600 hover:border-gold-500"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => deleteOne(b.id)}
                        className="ml-auto inline-flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {toast && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`fixed bottom-24 right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 ${toast.kind === "ok" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {toast.kind === "ok" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </motion.div>
      )}
    </div>
  );
}

function Field({ icon: Icon, label, value, href }: { icon?: any; label: string; value: string; href?: string; }) {
  const content = (
    <>
      {Icon && <Icon size={14} className="text-charcoal-400" />}
      <span className="text-charcoal-900">{value}</span>
    </>
  );
  return (
    <div className="mb-3">
      <div className="text-xs text-charcoal-500 uppercase tracking-wider mb-1">{label}</div>
      {href ? (
        <a href={href} className="inline-flex items-center gap-1.5 text-sm text-charcoal-900 hover:text-gold-500">
          {content}
        </a>
      ) : (
        <div className="inline-flex items-center gap-1.5 text-sm">{content}</div>
      )}
    </div>
  );
}
