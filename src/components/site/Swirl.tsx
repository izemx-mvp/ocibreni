import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";

const paths = {
  hero: {
    d: "M40 300 C 40 120, 260 40, 380 140 C 480 225, 420 380, 290 370 C 180 362, 170 230, 270 210 C 360 192, 420 280, 560 250 C 680 225, 720 120, 780 90",
    vb: "0 0 820 420",
  },
  line: {
    d: "M0 40 C 120 40, 160 8, 260 14 C 360 20, 380 66, 480 62 C 580 58, 620 20, 720 24",
    vb: "0 0 720 80",
  },
  vertical: {
    d: "M40 0 C 40 120, 8 160, 14 260 C 20 360, 66 380, 62 480 C 58 580, 20 620, 24 720",
    vb: "0 0 80 720",
  },
} as const;

/* Les trois bandes du logo : rouge flamme, prune, gris acier */
const bandColors = ["#E8202E", "#5A1D48", "#9B9A9F"] as const;

/**
 * Motif signature inspiré du logo.
 * - Par défaut sur la variante "hero" : trois bandes parallèles (flamme, prune, gris) qui se tracent
 *   l'une après l'autre, comme les trois anneaux du logo.
 * - Sur "line" et "vertical" : un seul trait en dégradé, plus discret.
 * Se trace à l'entrée dans l'écran, ou suit `progress` (0 → 1) quand on lui passe une valeur de scroll.
 */
export function Swirl({
  className,
  strokeWidth = 1.5,
  variant = "hero",
  progress,
  delay = 0,
  bands,
}: {
  className?: string;
  strokeWidth?: number;
  variant?: keyof typeof paths;
  progress?: MotionValue<number>;
  delay?: number;
  /** Force (ou retire) le rendu en trois bandes. Par défaut : activé pour "hero". */
  bands?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const { d, vb } = paths[variant];
  const vertical = variant === "vertical";
  const threeBands = bands ?? variant === "hero";

  const draw = (i: number) =>
    reduce
      ? { initial: { pathLength: 1, opacity: 0 }, whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.8 } }
      : progress
        ? { style: { pathLength: progress } }
        : {
            initial: { pathLength: 0, opacity: 0 },
            whileInView: { pathLength: 1, opacity: 1 },
            viewport: { once: true },
            transition: { duration: 2.4, delay: delay + i * 0.18, ease: [0.65, 0, 0.35, 1] as const },
          };

  // Décalage entre les bandes, proportionnel à l'épaisseur du trait
  const gap = strokeWidth * 2.6;

  return (
    <svg viewBox={vb} fill="none" aria-hidden className={cn("pointer-events-none", className)} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sw-${id}`} x1="0" y1="0" x2={vertical ? "0" : "1"} y2={vertical ? "1" : "0"}>
          <stop offset="0%" stopColor="#F4522B" />
          <stop offset="40%" stopColor="#E8202E" />
          <stop offset="72%" stopColor="#5A1D48" />
          <stop offset="100%" stopColor="#9B9A9F" />
        </linearGradient>
      </defs>

      {threeBands ? (
        bandColors.map((color, i) => (
          <motion.path
            key={color}
            d={d}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            transform={vertical ? `translate(${i * gap} 0)` : `translate(0 ${i * gap})`}
            {...draw(i)}
          />
        ))
      ) : (
        <motion.path d={d} stroke={`url(#sw-${id})`} strokeWidth={strokeWidth} strokeLinecap="round" {...draw(0)} />
      )}
    </svg>
  );
}