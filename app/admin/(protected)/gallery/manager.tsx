"use client";

import { useState, useRef, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, Edit3, Save, X, Plus, GripVertical, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";

type GalleryItem = {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  caption: string | null;
  sortOrder: number;
  isActive: boolean;
};

const CATEGORIES = [
  "Media",
  "Events & Hosting",
  "Fashion & Style",
  "Beauty",
  "Brands & Business",
  "Lifestyle",
];

export function GalleryManager({ initialItems }: { initialItems: GalleryItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

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

  const handleAdd = async (form: { title: string; category: string; caption: string; imageUrl: string }) => {
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sortOrder: items.length }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setItems((prev) => [...prev, data.item]);
      setShowAdd(false);
      showToast("ok", "Image added to gallery.");
    } catch (err: any) {
      showToast("err", err.message || "Could not save.");
    }
  };

  const handleUpdate = async (id: string, patch: Partial<GalleryItem>) => {
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
      setEditingId(null);
      showToast("ok", "Saved.");
    } catch (err: any) {
      showToast("err", err.message || "Could not save.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image permanently?")) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Delete failed");
      }
      setItems((prev) => prev.filter((it) => it.id !== id));
      showToast("ok", "Deleted.");
    } catch (err: any) {
      showToast("err", err.message || "Could not delete.");
    }
  };

  const persistOrder = async (newOrder: GalleryItem[]) => {
    setItems(newOrder);
    try {
      await fetch("/api/admin/gallery/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: newOrder.map((it) => it.id) }),
      });
    } catch {}
  };

  const onDragStart = (id: string) => setDragId(id);
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  const onDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const from = items.findIndex((i) => i.id === dragId);
    const to = items.findIndex((i) => i.id === targetId);
    if (from < 0 || to < 0) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    persistOrder(next);
    setDragId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-charcoal-900">Gallery</h1>
          <p className="text-charcoal-500 text-sm mt-1">Upload, edit, reorder and delete gallery images.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 bg-gold-500 text-charcoal-900 font-semibold px-4 py-2.5 rounded hover:bg-gold-400 transition-colors text-sm"
        >
          <Plus size={16} />
          Add Image
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-dashed border-charcoal-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-ivory-100 flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="text-charcoal-400" size={24} />
          </div>
          <p className="text-charcoal-700 font-medium mb-1">No gallery images yet</p>
          <p className="text-charcoal-500 text-sm mb-4">Upload your first image to get started.</p>
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 bg-gold-500 text-charcoal-900 font-semibold px-4 py-2.5 rounded hover:bg-gold-400 transition-colors text-sm"
          >
            <Plus size={16} />
            Add Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((it) => (
            <div
              key={it.id}
              draggable
              onDragStart={() => onDragStart(it.id)}
              onDragOver={onDragOver}
              onDrop={() => onDrop(it.id)}
              className={`bg-white rounded-xl border ${
                dragId === it.id ? "border-gold-500 opacity-50" : "border-charcoal-100"
              } overflow-hidden group transition-all`}
            >
              <div className="relative aspect-square bg-ivory-100">
                <img src={it.imageUrl} alt={it.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => setEditingId(it.id)}
                    className="w-9 h-9 rounded-full bg-white text-charcoal-700 flex items-center justify-center hover:bg-gold-500"
                    aria-label="Edit"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(it.id)}
                    className="w-9 h-9 rounded-full bg-white text-red-600 flex items-center justify-center hover:bg-red-50"
                    aria-label="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="absolute top-2 left-2 w-7 h-7 rounded bg-white/80 backdrop-blur flex items-center justify-center cursor-grab active:cursor-grabbing">
                  <GripVertical size={14} className="text-charcoal-700" />
                </div>
              </div>
              <div className="p-4">
                {editingId === it.id ? (
                  <EditForm
                    item={it}
                    onSave={(patch) => handleUpdate(it.id, patch)}
                    onCancel={() => setEditingId(null)}
                    onReplaceImage={async (file) => {
                      try {
                        const url = await handleUpload(file);
                        await handleUpdate(it.id, { imageUrl: url });
                      } catch (err: any) {
                        showToast("err", err.message);
                      }
                    }}
                  />
                ) : (
                  <>
                    <p className="font-semibold text-charcoal-900 text-sm truncate">{it.title}</p>
                    <p className="text-charcoal-500 text-xs mt-1 truncate">
                      {it.category}
                      {it.caption ? ` · ${it.caption}` : ""}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <AddModal
            onClose={() => setShowAdd(false)}
            onUpload={handleUpload}
            onAdd={handleAdd}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
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
  item,
  onSave,
  onCancel,
  onReplaceImage,
}: {
  item: GalleryItem;
  onSave: (patch: Partial<GalleryItem>) => void;
  onCancel: () => void;
  onReplaceImage: (file: File) => void;
}) {
  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category);
  const [caption, setCaption] = useState(item.caption ?? "");
  const [active, setActive] = useState(item.isActive);

  return (
    <div className="space-y-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full px-2 py-1.5 text-sm border border-charcoal-200 rounded"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-2 py-1.5 text-sm border border-charcoal-200 rounded"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Caption (optional)"
        className="w-full px-2 py-1.5 text-sm border border-charcoal-200 rounded"
      />
      <label className="flex items-center gap-2 text-xs text-charcoal-600">
        <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
        Published
      </label>
      <div className="flex gap-2 pt-2">
        <label className="flex-1 cursor-pointer text-center bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 text-xs font-semibold py-1.5 rounded">
          Replace Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onReplaceImage(f);
            }}
          />
        </label>
        <button
          type="button"
          onClick={() => onSave({ title, category, caption, isActive: active })}
          className="flex-1 bg-gold-500 hover:bg-gold-400 text-charcoal-900 text-xs font-semibold py-1.5 rounded flex items-center justify-center gap-1"
        >
          <Save size={12} /> Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 text-xs font-semibold py-1.5 px-2 rounded"
          aria-label="Cancel"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}

function AddModal({
  onClose,
  onUpload,
  onAdd,
}: {
  onClose: () => void;
  onUpload: (file: File) => Promise<string>;
  onAdd: (data: { title: string; category: string; caption: string; imageUrl: string }) => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const url = await onUpload(file);
      setImageUrl(url);
      if (!title) setTitle(file.name.replace(/\.[^.]+$/, ""));
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl text-charcoal-900">Add Gallery Image</h2>
          <button onClick={onClose} className="text-charcoal-400 hover:text-charcoal-700" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            onFile(e.dataTransfer.files[0]);
          }}
          className={`border-2 border-dashed rounded-xl p-6 text-center mb-4 transition-colors ${
            dragOver ? "border-gold-500 bg-gold-50" : "border-charcoal-200"
          }`}
        >
          {uploading ? (
            <p className="text-charcoal-500 text-sm">Uploading…</p>
          ) : imageUrl ? (
            <div>
              <img src={imageUrl} alt="" className="w-full h-40 object-cover rounded mb-2" />
              <p className="text-xs text-green-600">Image uploaded.</p>
            </div>
          ) : (
            <>
              <Upload className="mx-auto mb-2 text-charcoal-400" size={24} />
              <p className="text-sm text-charcoal-600 mb-1">Drag &amp; drop or click to upload</p>
              <p className="text-xs text-charcoal-400">JPG, PNG, WEBP up to 8MB</p>
              <label className="inline-block mt-3 cursor-pointer bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 text-xs font-semibold px-3 py-1.5 rounded">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFile(e.target.files?.[0])}
                />
              </label>
            </>
          )}
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title *"
          className="w-full px-3 py-2 border border-charcoal-200 rounded mb-3 text-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-charcoal-200 rounded mb-3 text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption (optional)"
          className="w-full px-3 py-2 border border-charcoal-200 rounded mb-4 text-sm"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-charcoal-600">Cancel</button>
          <button
            onClick={() => imageUrl && title && onAdd({ title, category, caption, imageUrl })}
            disabled={!imageUrl || !title || uploading}
            className="bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold px-4 py-2 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
