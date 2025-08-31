"use client";
import { motion } from "framer-motion";

export type Job = {
  title: string;
  type: string; // Full-time, Part-time, Contract
  location: string; // Remote, Kyiv, etc.
  tags: string[];
  accent?: "pink" | "blue" | "yellow" | "green";
  applyHref?: string;
};

export default function JobCard({ job, i = 0 }: { job: Job; i?: number }) {
  const accent = job.accent ?? "pink";
  const border =
    accent === "pink"
      ? "border-cyberpunk-pink/70"
      : accent === "blue"
      ? "border-cyberpunk-blue/70"
      : accent === "yellow"
      ? "border-cyberpunk-yellow/70"
      : "border-cyberpunk-green/70";
  const bg =
    accent === "pink"
      ? "bg-cyberpunk-pink/10"
      : accent === "blue"
      ? "bg-cyberpunk-blue/10"
      : accent === "yellow"
      ? "bg-cyberpunk-yellow/10"
      : "bg-cyberpunk-green/10";
  const titleColor =
    accent === "pink"
      ? "text-cyberpunk-pink"
      : accent === "blue"
      ? "text-cyberpunk-blue"
      : accent === "yellow"
      ? "text-cyberpunk-yellow"
      : "text-cyberpunk-green";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl border-2 ${border} ${bg} p-6 md:p-7 backdrop-blur-md shadow-cyberpunk`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={`text-2xl md:text-3xl font-extrabold mb-2 ${titleColor}`}>{job.title}</h3>
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm opacity-90">
            <span className="px-2 py-1 rounded-full bg-black/50 border border-white/20">{job.type}</span>
            <span className="px-2 py-1 rounded-full bg-black/50 border border-white/20">{job.location}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {job.tags.map((t, idx) => (
          <span key={idx} className="px-2 py-1 rounded bg-black/40 border border-white/15 text-xs md:text-sm">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <a
          href="#"
          className="px-4 py-2 rounded-lg border border-white/25 hover:border-cyberpunk-yellow neon-hover text-sm md:text-base"
        >
          Детальніше
        </a>
        <a
          href={job.applyHref ?? "mailto:hr@example.com?subject=CV"}
          className="px-4 py-2 rounded-lg bg-cyberpunk-pink text-cyberpunk-dark font-bold hover:bg-cyberpunk-yellow hover:text-cyberpunk-pink transition-colors text-sm md:text-base"
        >
          Надіслати CV
        </a>
      </div>
    </motion.div>
  );
}
