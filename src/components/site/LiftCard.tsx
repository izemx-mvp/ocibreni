import { motion } from "framer-motion";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Flame outline that draws itself around the nearest `group` on hover (stroke-dashoffset). */
export function FlameBorder({ radius = 20 }: { radius?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible">
      <defs>
        <linearGradient id={`fb-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--flame)" />
          <stop offset="100%" stopColor="var(--flame-deep)" />
        </linearGradient>
      </defs>
      <rect
        x="0.75"
        y="0.75"
        rx={radius}
        pathLength={1}
        fill="none"
        stroke={`url(#fb-${id})`}
        strokeWidth="1.5"
        strokeDasharray="1"
        className="[stroke-dashoffset:1] transition-[stroke-dashoffset] duration-700 ease-out group-hover:[stroke-dashoffset:0] group-focus-within:[stroke-dashoffset:0] motion-reduce:transition-none"
        style={{ width: "calc(100% - 1.5px)", height: "calc(100% - 1.5px)" }}
      />
    </svg>
  );
}

/** Card with soft plum shadow, thin border, hover lift and the flame border drawing in. */
export function LiftCard({ children, className, tone = "light" }: { children: ReactNode; className?: string; tone?: "light" | "dark" | "cream" }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative h-full rounded-xl border",
        tone === "light" && "border-mist bg-card shadow-soft",
        tone === "cream" && "border-plum/10 bg-sand",
        tone === "dark" && "noise overflow-hidden border-on-dark/10 bg-dusk text-on-dark shadow-lift",
        className,
      )}
    >
      <FlameBorder />
      {children}
    </motion.div>
  );
}
