"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, MessageCircle } from "lucide-react";

const KNOWN_QA: { keys: string[]; answer: string }[] = [
  {
    keys: ["book", "work with", "hire", "contact", "collaborate", "booking"],
    answer:
      "Use the Work With Us or booking option on the Contact page to submit your request. The team reviews every submission and responds with next steps.",
  },
  {
    keys: ["event", "host", "hosting", "mc"],
    answer:
      "Mutale provides event hosting and audience engagement. The Services page outlines the current categories. For a specific event, please submit a booking request via the Contact page.",
  },
  {
    keys: ["brand", "collab", "partner", "campaign"],
    answer:
      "Brand collaborations are highlighted on the Brands page. To discuss a new partnership, please use the booking form so the team can evaluate fit and timing.",
  },
  {
    keys: ["media", "press", "press kit", "kit", "biography", "bio"],
    answer:
      "The Media Room contains available press materials, biography and featured videos. A direct press contact is also listed there.",
  },
  {
    keys: ["about", "who is", "story", "biography"],
    answer:
      "Mutale is a media personality, TV producer, entrepreneur and philanthropist. The About page covers her story, mission, vision and values in more detail.",
  },
  {
    keys: ["service", "what do you do", "offer"],
    answer:
      "Services include TV & Media, Radio & Media Appearances, Brand Collaborations, and Event & Audience Hosting. See the Services page for full details.",
  },
  {
    keys: ["gallery", "photo", "pictures", "images"],
    answer:
      "Visit the Gallery page to browse curated photos across media, events, fashion, beauty, business and everyday life.",
  },
  {
    keys: ["faq", "question", "help"],
    answer:
      "Most common questions are answered in the FAQ section on the home page and in the Media Room. You can also submit a question through the Contact form.",
  },
];

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const item of KNOWN_QA) {
    if (item.keys.some((k) => lower.includes(k))) {
      return item.answer;
    }
  }
  return "Thanks for your question. For specific details, please visit the relevant page (About, Brands, Services, Media Room) or reach out via the Contact page.";
}

type Message = { role: "user" | "assistant"; text: string };

export function AiChatbotButton() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi, I'm the Mutale Mwanza assistant. Ask me about her work, services, brands, media room, or how to book.",
    },
  ]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "assistant", text: findAnswer(trimmed) },
    ]);
    setInput("");
  };

  return (
    <>
      {/* Floating circle button — bottom right */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-900 shadow-lg flex items-center justify-center transition-all hover:scale-105"
        aria-label="Open AI Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[500px] max-h-[70vh] bg-charcoal-900 rounded-2xl border border-charcoal-700 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-charcoal-700 bg-gradient-to-r from-charcoal-900 to-charcoal-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center">
                  <Sparkles className="text-charcoal-900" size={16} />
                </div>
                <div>
                  <h3 className="text-white font-serif text-sm">Mutale Mwanza</h3>
                  <p className="text-gold-500 text-xs">AI Assistant</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-charcoal-900">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gold-500 text-charcoal-900 rounded-tr-sm"
                        : "bg-charcoal-800 text-white rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-charcoal-700 bg-charcoal-900">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-2.5 bg-charcoal-800 border border-charcoal-700 rounded-full text-white placeholder:text-charcoal-400 focus:border-gold-500 focus:outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={send}
                  className="w-10 h-10 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-900 flex items-center justify-center transition-colors"
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-charcoal-500 text-[10px] mt-2 text-center">
                Powered by verified website content.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
