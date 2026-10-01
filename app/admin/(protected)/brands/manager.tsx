"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Trash2, Save, X, GripVertical, Handshake, Upload, CheckCircle2, AlertCircle, Star, ExternalLink } from "lucide-react";

type Brand = {
  id: string;
  name: string;
  category: string | null;
  relationship: string | null;
  description: string | null;
  website: string | null;
  logo: string | null;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
};

const CATEGORIES = ["Fashion", "Beauty", "Retail", "Lifestyle", "Hospitality", "Entrepreneurship"];
const RELATIONSHIPS = ["Featured Brand", "Promotional Collaboration", "Brand Feature", "Entrepreneurship & Business Feature"];

export function BrandsManager({ initialItems }: { initialItems: Brand[] }) {
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
    if (!res.ok) throw new Error(data.error);
    return data.url as string;
  };

  const handleAdd = async (data: Partial<Brand>) => {
    try {
      const res = await fetch("/api/admin/brands", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, sortOrder: items.length }) });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error);
      setItems((p) => [...p, j.item]);
      setShowAdd(false);
      showToast("ok", "Brand added.");
    } catch (err: any) { showToast("err", err.message); }
  };

  const handleUpdate = async (id: string, patch: Partial<Brand>) => {
    try {
      const res = await fetch(`/api/admin/brands/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error);
      setItems((p) => p.map((it) => (it.id === id ? { ...it, ...patch } : it)));
      setEditingId(null);
      showToast("ok", "Saved.");
    } catch (err: any) { showToast("err", err.message); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this brand?")) return;
    try {
      const res = await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });
      if (!res.ok) { const j = await res.json().catch(() => ({})); throw new Error(j.error || "Failed"); }
      setItems((p) => p.filter((it) => it.id !== id));
      showToast("ok", "Deleted.");
    } catch (err: any) { showToast("err", err.message); }
  };

  const persistOrder = async (next: Brand[]) => {
    setItems(next);
    try {
      await fetch("/api/admin/brands/reorder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids: next.map((it) => it.id) }) });
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
          <h1 className="font-serif text-2xl md:text-3xl text-charcoal-900">Brands</h1>
          <p className="text-charcoal-500 text-sm mt-1">Manage featured brands and collaborations.</p>
        </div>
        <button type="button" onClick={() => setShowAdd(true)} className="inline-flex items-center gap-2 bg-gold-500 text-charcoal-900 font-semibold px-4 py-2.5 rounded hover:bg-gold-400 transition-colors text-sm">
          <Plus size={16} /> Add Brand
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-dashed border-charcoal-200 rounded-xl p-12 text-center">
          <Handshake className="text-charcoal-400 mx-auto mb-4" size={32} />
          <p className="text-charcoal-700 font-medium mb-1">No brands yet</p>
          <p className="text-charcoal-500 text-sm mb-4">Add a featured brand or collaboration.</p>
          <button type="button" onClick={() => setShowAdd(true)} className="inline-flex items-center gap-2 bg-gold-500 text-charcoal-900 font-semibold px-4 py-2.5 rounded hover:bg-gold-400 text-sm">
            <Plus size={16} /> Add Brand
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((it) => (
            <div key={it.id} draggable onDragStart={() => setDragId(it.id)} onDragOver={(e) => e.preventDefault()} onDrop={() => onDrop(it.id)} className={`bg-white rounded-xl border ${dragId === it.id ? "border-gold-500 opacity-50" : "border-charcoal-100"} p-4`}>
              {editingId === it.id ? (
                <EditForm item={it} onSave={(p) => handleUpdate(it.id, p)} onCancel={() => setEditingId(null)} onReplaceImage={async (file) => { try { const url = await handleUpload(file); await handleUpdate(it.id, { logo: url }); } catch (err: any) { showToast("err", err.message); } }} />
              ) : (
                <div className="flex items-start gap-3">
                  <div className="cursor-grab pt-1"><GripVertical size={16} className="text-charcoal-300" /></div>
                  {it.logo ? <img src={it.logo} alt="" className="w-12 h-12 rounded-lg object-cover bg-ivory-100" /> : (
                    <div className="w-12 h-12 rounded-lg bg-ivory-100 flex items-center justify-center text-charcoal-400 font-serif text-lg">{it.name.charAt(0)}</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-charcoal-900 truncate">{it.name}</h3>
                      {it.featured && <Star size={12} className="text-gold-500 fill-gold-500" />}
                    </div>
                    <p className="text-xs text-gold-500 uppercase tracking-wider">{it.category}</p>
                    <p className="text-charcoal-500 text-xs mt-1 truncate">{it.description || "—"}</p>
                    {it.website && (
                      <a href={it.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-charcoal-400 hover:text-gold-500 mt-1">
                        <ExternalLink size={10} /> {it.website.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button type="button" onClick={() => setEditingId(it.id)} className="w-8 h-8 rounded bg-ivory-100 hover:bg-gold-500/20 text-charcoal-700 flex items-center justify-center" aria-label="Edit"><Edit3 size={13} /></button>
                    <button type="button" onClick={() => handleDelete(it.id)} className="w-8 h-8 rounded bg-ivory-100 hover:bg-red-50 text-red-600 flex items-center justify-center" aria-label="Delete"><Trash2 size={13} /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showAdd && (
          <AddBrandModal onClose={() => setShowAdd(false)} onUpload={handleUpload} onAdd={handleAdd} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className={`fixed bottom-24 right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 ${toast.kind === "ok" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
            {toast.kind === "ok" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EditForm({ item, onSave, onCancel, onReplaceImage }: { item: Brand; onSave: (p: Partial<Brand>) => void; onCancel: () => void; onReplaceImage: (f: File) => void; }) {
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category ?? "Fashion");
  const [relationship, setRelationship] = useState(item.relationship ?? "Featured Brand");
  const [description, setDescription] = useState(item.description ?? "");
  const [website, setWebsite] = useState(item.website ?? "");
  const [featured, setFeatured] = useState(!!item.featured);
  const [active, setActive] = useState(item.isActive);

  return (
    <div className="space-y-2">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Brand name *" className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm" />
      <div className="grid grid-cols-2 gap-2">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 border border-charcoal-200 rounded text-sm">
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={relationship} onChange={(e) => setRelationship(e.target.value)} className="px-3 py-2 border border-charcoal-200 rounded text-sm">
          {RELATIONSHIPS.map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>
      <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website (optional)" className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={2} className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm resize-none" />
      <div className="flex items-center gap-3 text-sm text-charcoal-600">
        <label className="flex items-center gap-2"><input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} /> Featured</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} /> Published</label>
        <label className="cursor-pointer hover:text-gold-500">Upload logo<input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onReplaceImage(f); }} /></label>
      </div>
      <div className="flex gap-2 pt-1">
        <button type="button" onClick={() => onSave({ name, category, relationship, description, website, featured, isActive: active })} className="bg-gold-500 hover:bg-gold-400 text-charcoal-900 text-sm font-semibold px-4 py-2 rounded flex items-center gap-1"><Save size={14} /> Save</button>
        <button type="button" onClick={onCancel} className="bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 text-sm font-semibold px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  );
}

function AddBrandModal({ onClose, onUpload, onAdd }: { onClose: () => void; onUpload: (f: File) => Promise<string>; onAdd: (d: Partial<Brand>) => void; }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Fashion");
  const [relationship, setRelationship] = useState("Featured Brand");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState("");
  const [uploading, setUploading] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl text-charcoal-900">Add Brand</h2>
          <button onClick={onClose} className="text-charcoal-400 hover:text-charcoal-700" aria-label="Close"><X size={20} /></button>
        </div>
        <div className="space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Brand name *" className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 border border-charcoal-200 rounded text-sm">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
            <select value={relationship} onChange={(e) => setRelationship(e.target.value)} className="px-3 py-2 border border-charcoal-200 rounded text-sm">{RELATIONSHIPS.map((r) => <option key={r}>{r}</option>)}</select>
          </div>
          <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website (optional)" className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={2} className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm resize-none" />
          <div className="border-2 border-dashed border-charcoal-200 rounded-lg p-4 text-center">
            {uploading ? <p className="text-sm text-charcoal-500">Uploading…</p> : logo ? <img src={logo} alt="" className="w-20 h-20 object-cover rounded mx-auto mb-2" /> : (
              <>
                <Upload className="mx-auto mb-1 text-charcoal-400" size={18} />
                <label className="cursor-pointer text-sm text-charcoal-600 underline">
                  Upload logo
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) { setUploading(true); try { setLogo(await onUpload(f)); } finally { setUploading(false); } } }} />
                </label>
              </>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={onClose} className="px-4 py-2 text-sm text-charcoal-600">Cancel</button>
            <button onClick={() => name && onAdd({ name, category, relationship, description, website, logo: logo || null })} disabled={!name || uploading} className="bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold px-4 py-2 rounded text-sm disabled:opacity-50">Save</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
