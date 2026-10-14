import { motion } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";

/** Signature motif: thin animated swirl line (flame → plum → grey), inspired by the logo. */
export function Swirl({ className, strokeWidth = 1.5, variant = "hero" }: { className?: string; strokeWidth?: number; variant?: "hero" | "line" }) {
  const id = useId().replace(/:/g, "");
  const d =
    variant === "hero"
      ? "M40 300 C 40 120, 260 40, 380 140 C 480 225, 420 380, 290 370 C 180 362, 170 230, 270 210 C 360 192, 420 280, 560 250 C 680 225, 720 120, 780 90"
      : "M0 40 C 120 40, 160 8, 260 14 C 360 20, 380 66, 480 62 C 580 58, 620 20, 720 24";
  const vb = variant === "hero" ? "0 0 820 420" : "0 0 720 80";
  return (
    <svg viewBox={vb} fill="none" aria-hidden className={cn("pointer-events-none", className)} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sw-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--flame)" />
          <stop offset="40%" stopColor="var(--flame-deep)" />
          <stop offset="72%" stopColor="var(--plum)" />
          <stop offset="100%" stopColor="var(--ash)" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        stroke={`url(#sw-${id})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
