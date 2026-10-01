"use client";

import { useState, useRef, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Trash2, Save, X, GripVertical, Layers, Upload, CheckCircle2, AlertCircle, Star } from "lucide-react";

type Service = {
  id: string;
  title: string;
  shortDescription: string | null;
  fullDescription: string | null;
  description: string;
  features: string | null;
  icon: string | null;
  imageUrl: string | null;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
};

const ICONS = ["Tv", "Radio", "Mic", "Film", "Heart", "Briefcase", "Megaphone", "Camera", "Layers", "Sparkles"];

export function ServicesManager({ initialItems }: { initialItems: Service[] }) {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const showToast = (kind: "ok" | "err", msg: string) => {
    setToast({ kind, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpload = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    form.append("kind", "image");
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data.url as string;
  };

  const handleAdd = async (data: Partial<Service>) => {
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sortOrder: items.length }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error);
      setItems((p) => [...p, j.item]);
      setShowAdd(false);
      showToast("ok", "Service added.");
    } catch (err: any) {
      showToast("err", err.message);
    }
  };

  const handleUpdate = async (id: string, patch: Partial<Service>) => {
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error);
      setItems((p) => p.map((it) => (it.id === id ? { ...it, ...patch } : it)));
      setEditingId(null);
      showToast("ok", "Saved.");
    } catch (err: any) {
      showToast("err", err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (!res.ok) { const j = await res.json().catch(() => ({})); throw new Error(j.error || "Failed"); }
      setItems((p) => p.filter((it) => it.id !== id));
      showToast("ok", "Deleted.");
    } catch (err: any) {
      showToast("err", err.message);
    }
  };

  const persistOrder = async (next: Service[]) => {
    setItems(next);
    try {
      await fetch("/api/admin/services/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: next.map((it) => it.id) }),
      });
    } catch {}
  };

  const onDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const from = items.findIndex((i) => i.id === dragId);
    const to = items.findIndex((i) => i.id === targetId);
    if (from < 0 || to < 0) return;
    const next = [...items];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    persistOrder(next);
    setDragId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-charcoal-900">Services</h1>
          <p className="text-charcoal-500 text-sm mt-1">Add, edit and reorder the services shown on the website.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 bg-gold-500 text-charcoal-900 font-semibold px-4 py-2.5 rounded hover:bg-gold-400 transition-colors text-sm"
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-dashed border-charcoal-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-ivory-100 flex items-center justify-center mx-auto mb-4">
            <Layers className="text-charcoal-400" size={24} />
          </div>
          <p className="text-charcoal-700 font-medium mb-1">No services yet</p>
          <p className="text-charcoal-500 text-sm mb-4">Add the first service to display on the website.</p>
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 bg-gold-500 text-charcoal-900 font-semibold px-4 py-2.5 rounded hover:bg-gold-400 transition-colors text-sm"
          >
            <Plus size={16} />
            Add Service
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <div
              key={it.id}
              draggable
              onDragStart={() => setDragId(it.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(it.id)}
              className={`bg-white rounded-xl border ${
                dragId === it.id ? "border-gold-500 opacity-50" : "border-charcoal-100"
              } p-4 transition-all`}
            >
              {editingId === it.id ? (
                <EditForm
                  item={it}
                  onSave={(p) => handleUpdate(it.id, p)}
                  onCancel={() => setEditingId(null)}
                  onReplaceImage={async (file) => {
                    try {
                      const url = await handleUpload(file);
                      await handleUpdate(it.id, { imageUrl: url });
                    } catch (err: any) { showToast("err", err.message); }
                  }}
                />
              ) : (
                <div className="flex items-center gap-4">
                  <div className="cursor-grab active:cursor-grabbing p-1">
                    <GripVertical size={18} className="text-charcoal-300" />
                  </div>
                  {it.imageUrl && (
                    <img src={it.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover bg-ivory-100" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-charcoal-900 truncate">{it.title}</h3>
                      {it.featured && <Star size={14} className="text-gold-500 fill-gold-500" />}
                    </div>
                    <p className="text-charcoal-500 text-sm truncate">
                      {it.shortDescription || it.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(it.id)}
                      className="w-9 h-9 rounded-lg bg-ivory-100 hover:bg-gold-500/20 text-charcoal-700 flex items-center justify-center"
                      aria-label="Edit"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(it.id)}
                      className="w-9 h-9 rounded-lg bg-ivory-100 hover:bg-red-50 text-red-600 flex items-center justify-center"
                      aria-label="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showAdd && (
          <AddServiceModal
            onClose={() => setShowAdd(false)}
            onUpload={handleUpload}
            onAdd={handleAdd}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-24 right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 ${
              toast.kind === "ok" ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}
          >
            {toast.kind === "ok" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EditForm({
  item, onSave, onCancel, onReplaceImage,
}: { item: Service; onSave: (p: Partial<Service>) => void; onCancel: () => void; onReplaceImage: (f: File) => void; }) {
  const [title, setTitle] = useState(item.title);
  const [short, setShort] = useState(item.shortDescription ?? "");
  const [full, setFull] = useState(item.fullDescription ?? "");
  const [features, setFeatures] = useState(item.features ?? "");
  const [icon, setIcon] = useState(item.icon ?? "");
  const [featured, setFeatured] = useState(!!item.featured);
  const [active, setActive] = useState(item.isActive);

  return (
    <div className="space-y-2">
      <div className="grid md:grid-cols-2 gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Service title *" className="px-3 py-2 border border-charcoal-200 rounded text-sm" />
        <select value={icon} onChange={(e) => setIcon(e.target.value)} className="px-3 py-2 border border-charcoal-200 rounded text-sm">
          <option value="">Select icon</option>
          {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <input value={short} onChange={(e) => setShort(e.target.value)} placeholder="Short description (for homepage cards) *" className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm" />
      <textarea value={full} onChange={(e) => setFull(e.target.value)} placeholder="Full description (for service detail page)" rows={3} className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm resize-none" />
      <input value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Features (pipe-separated: Feature A|Feature B|Feature C)" className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm" />
      <div className="flex flex-wrap items-center gap-3 text-sm text-charcoal-600">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Featured
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          Published
        </label>
        <label className="cursor-pointer text-charcoal-600 hover:text-gold-500">
          Replace image
          <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onReplaceImage(f); }} />
        </label>
      </div>
      <div className="flex gap-2 pt-1">
        <button type="button" onClick={() => onSave({ title, shortDescription: short, fullDescription: full, features, icon, featured, isActive: active })} className="bg-gold-500 hover:bg-gold-400 text-charcoal-900 text-sm font-semibold px-4 py-2 rounded flex items-center gap-1"><Save size={14} /> Save</button>
        <button type="button" onClick={onCancel} className="bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 text-sm font-semibold px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  );
}

function AddServiceModal({
  onClose, onUpload, onAdd,
}: { onClose: () => void; onUpload: (f: File) => Promise<string>; onAdd: (d: Partial<Service>) => void; }) {
  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [full, setFull] = useState("");
  const [features, setFeatures] = useState("");
  const [icon, setIcon] = useState("Tv");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl text-charcoal-900">Add Service</h2>
          <button onClick={onClose} className="text-charcoal-400 hover:text-charcoal-700" aria-label="Close"><X size={20} /></button>
        </div>
        <div className="space-y-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Service title *" className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm" />
          <select value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm">
            {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
          <input value={short} onChange={(e) => setShort(e.target.value)} placeholder="Short description *" className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm" />
          <textarea value={full} onChange={(e) => setFull(e.target.value)} placeholder="Full description (optional)" rows={3} className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm resize-none" />
          <input value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Features (pipe-separated)" className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm" />
          <div className="border-2 border-dashed border-charcoal-200 rounded-lg p-4 text-center">
            {uploading ? <p className="text-sm text-charcoal-500">Uploading…</p> : imageUrl ? <img src={imageUrl} alt="" className="w-full h-32 object-cover rounded mb-2" /> : (
              <>
                <Upload className="mx-auto mb-1 text-charcoal-400" size={18} />
                <label className="cursor-pointer text-sm text-charcoal-600 underline">
                  Upload image
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) { setUploading(true); try { setImageUrl(await onUpload(f)); } finally { setUploading(false); } } }} />
                </label>
              </>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={onClose} className="px-4 py-2 text-sm text-charcoal-600">Cancel</button>
            <button onClick={() => title && short && onAdd({ title, shortDescription: short, fullDescription: full || short, features, icon, imageUrl: imageUrl || null })} disabled={!title || !short || uploading} className="bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold px-4 py-2 rounded text-sm disabled:opacity-50">Save</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
