"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

type VideoItem = {
  id: string;
  title: string;
  category: "Media" | "Events" | "Interviews" | "Featured Moments" | "Radio";
  description: string;
  thumbnail: string;
  sourceUrl: string | null; // null = placeholder, no real asset yet
};

const videos: VideoItem[] = [
  {
    id: "kwacha-2025",
    title: "Kwacha Music Awards 2025",
    category: "Events",
    description: "Audience Host",
    thumbnail:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    sourceUrl: null,
  },
  {
    id: "hot-fm",
    title: "Hot FM — Red Hot Breakfast",
    category: "Radio",
    description:
      "Mutale's Hot FM journey and Red Hot Breakfast Show appearance.",
    thumbnail:
      "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800&q=80",
    sourceUrl: null,
  },
  {
    id: "media-appearance",
    title: "Media Appearance",
    category: "Media",
    description: "Selected media moment.",
    thumbnail:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    sourceUrl: null,
  },
  {
    id: "event-hosting",
    title: "Event Hosting Moment",
    category: "Featured Moments",
    description: "Selected event hosting moment.",
    thumbnail:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    sourceUrl: null,
  },
  {
    id: "professional-introduction",
    title: "Professional Introduction",
    category: "Featured Moments",
    description: "A short professional introduction video.",
    thumbnail:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80",
    sourceUrl: null,
  },
];

const filters = [
  "All",
  "Media",
  "Interviews",
  "Events",
  "Featured Moments",
];

export function FeaturedVideosSection() {
  const [active, setActive] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered =
    active === "All" ? videos : videos.filter((v) => v.category === active);
  const openVideo = openId ? videos.find((v) => v.id === openId) : null;
  const openIdx = openId ? filtered.findIndex((v) => v.id === openId) : -1;

  return (
    <section className="section-light py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="kicker block mb-3">FEATURED VIDEOS</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
            Featured Videos
          </h2>
          <p className="text-charcoal-500 mt-4 max-w-2xl mx-auto">
            Selected video moments from Mutale Mwanza's media, event and
            professional presence.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`px-5 py-2 rounded text-sm font-medium transition-colors ${
                active === filter
                  ? "bg-gold-500 text-charcoal-900"
                  : "border border-charcoal-200 text-charcoal-700 hover:border-gold-500"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-charcoal-100 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <button
                type="button"
                onClick={() => setOpenId(video.id)}
                className="block w-full text-left"
              >
                <div className="relative aspect-video overflow-hidden bg-charcoal-800">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-charcoal-900/30 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gold-500/90 flex items-center justify-center shadow-lg">
                      <Play
                        className="text-charcoal-900 w-6 h-6 ml-0.5"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-gold-500 text-xs uppercase tracking-wider">
                    {video.category}
                  </span>
                  <h3 className="font-serif text-lg text-charcoal-900 font-semibold mt-1 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-charcoal-500 text-sm">{video.description}</p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Lightbox — only shows a clean placeholder, never a fake URL */}
      {openVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setOpenId(null)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenId(null);
            }}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-charcoal-800 flex items-center justify-center text-white hover:bg-charcoal-700"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          {openIdx > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const prev = filtered[(openIdx - 1 + filtered.length) % filtered.length];
                setOpenId(prev.id);
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal-800 flex items-center justify-center text-white hover:bg-charcoal-700"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {openIdx >= 0 && openIdx < filtered.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const next = filtered[(openIdx + 1) % filtered.length];
                setOpenId(next.id);
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal-800 flex items-center justify-center text-white hover:bg-charcoal-700"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          )}
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-charcoal-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gold-500/90 flex items-center justify-center mx-auto mb-4">
                  <Play
                    className="text-charcoal-900 w-8 h-8 ml-1"
                    fill="currentColor"
                  />
                </div>
                <p className="text-white font-serif text-xl">{openVideo.title}</p>
                <p className="text-gold-500 text-sm mt-1">{openVideo.category}</p>
                <p className="text-charcoal-300 text-sm mt-2">
                  Video file not yet uploaded — to be added through the admin panel.
                </p>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-white font-serif text-2xl">{openVideo.title}</p>
              <p className="text-gold-500 text-sm mt-1">{openVideo.category}</p>
              <p className="text-charcoal-300 text-sm mt-1">
                {openVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
