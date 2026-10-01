"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Construction, ArrowLeft } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
  hint?: string;
  list?: string[];
}

export function PlaceholderPage({ title, description, hint, list }: PlaceholderProps) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-2xl md:text-3xl text-charcoal-900">{title}</h1>
        <p className="text-charcoal-500 text-sm mt-1">{description}</p>
      </motion.div>

      <div className="bg-white rounded-xl border border-charcoal-100 p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-ivory-100 flex items-center justify-center mx-auto mb-5">
          <Construction className="text-gold-500" size={24} />
        </div>
        <h2 className="font-serif text-xl text-charcoal-900 mb-2">Coming next</h2>
        <p className="text-charcoal-500 max-w-md mx-auto mb-6 text-sm">
          {hint || "This editor will be built in the next phase of the admin rollout. The data model is already in place — only the editor UI needs to be completed."}
        </p>
        {list && list.length > 0 && (
          <div className="max-w-md mx-auto text-left bg-ivory-100/60 rounded-lg p-4 mb-6">
            <p className="text-xs uppercase tracking-wider text-charcoal-500 mb-2">Will support</p>
            <ul className="space-y-1 text-sm text-charcoal-700">
              {list.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-charcoal-600 hover:text-gold-500"
        >
          <ArrowLeft size={14} />
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
