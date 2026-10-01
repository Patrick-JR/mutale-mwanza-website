"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Login failed. Please try again.");
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 border border-red-200 bg-red-50 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-charcoal-700 text-sm font-semibold mb-2">
          Username
        </label>
        <div className="relative">
          <User
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400"
          />
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            autoComplete="username"
            className="w-full pl-10 pr-4 py-3 bg-white border border-charcoal-200 rounded-lg text-charcoal-900 placeholder:text-charcoal-400 focus:border-gold-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-charcoal-700 text-sm font-semibold mb-2">
          Password
        </label>
        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400"
          />
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            className="w-full pl-10 pr-10 py-3 bg-white border border-charcoal-200 rounded-lg text-charcoal-900 placeholder:text-charcoal-400 focus:border-gold-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 text-charcoal-900 font-semibold py-3 rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Signing in..." : "Sign In"}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-900 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center">
              <span className="font-serif text-charcoal-900 font-bold text-lg">
                M
              </span>
            </div>
            <div className="text-left leading-tight">
              <p className="text-white font-serif text-base font-semibold">MUTALE</p>
              <p className="text-charcoal-400 text-xs tracking-[0.25em]">MWANZA</p>
            </div>
          </Link>
          <h1 className="font-serif text-3xl text-white">Admin Sign In</h1>
          <p className="text-charcoal-400 mt-2 text-sm">Access the website management dashboard.</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <Suspense fallback={<div className="text-charcoal-500 text-sm">Loading…</div>}>
            <LoginForm />
          </Suspense>

          <div className="mt-6 flex items-start gap-2 text-xs text-charcoal-500">
            <ShieldCheck size={14} className="flex-shrink-0 mt-0.5" />
            <span>
              This area is restricted to authorized administrators only.
            </span>
          </div>
        </div>

        <p className="text-center text-charcoal-500 text-xs mt-6">
          <Link href="/" className="hover:text-gold-500">
            ← Back to website
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
