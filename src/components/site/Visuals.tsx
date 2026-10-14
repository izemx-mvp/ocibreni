import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

export function Bean({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 56" className={className} aria-hidden>
      <ellipse cx="20" cy="28" rx="17" ry="25" fill="currentColor" />
      <path d="M20 5 C 12 18, 28 36, 20 51" stroke="var(--background)" strokeOpacity=".55" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** A bean drifting slowly up and down (static when reduced motion is on). */
export function FloatingBean({ className, delay = 0, rotate = 0 }: { className?: string; delay?: number; rotate?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      style={{ rotate }}
      animate={reduce ? {} : { y: [0, -14, 0], rotate: [rotate, rotate + 10, rotate] }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <Bean className="h-full w-full" />
    </motion.div>
  );
}

const labelVariants = [
  { bg: "var(--background)", fg: "var(--plum)", sub: "var(--on-dark-muted)" },
  { bg: "flame", fg: "#ffffff", sub: "var(--on-dark)" },
  { bg: "var(--plum-deep)", fg: "var(--on-dark)", sub: "var(--flame)" },
] as const;

/** Abstract coffee bag mock-up labelled "VOTRE MARQUE". The label cycles through 3 colour variants. */
export function BagMockup({ className, cycle = true }: { className?: string; cycle?: boolean }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const [variant, setVariant] = useState(0);

  useEffect(() => {
    if (!cycle) return;
    const t = window.setInterval(() => setVariant((v) => (v + 1) % labelVariants.length), 2600);
    return () => window.clearInterval(t);
  }, [cycle]);

  const g = (name: string) => `${name}-${uid}`;

  return (
    <motion.div
      className={cn("relative", className)}
      animate={reduce ? {} : { y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 280 380" className="h-full w-full drop-shadow-[0_40px_40px_color-mix(in_oklab,var(--plum)_30%,transparent)]" role="img" aria-label="Sachet de café à votre marque">
        <defs>
          <linearGradient id={g("bag")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--plum)" />
            <stop offset="100%" stopColor="var(--plum-deep)" />
          </linearGradient>
          <linearGradient id={g("bagShine")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity=".12" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={g("bagFlame")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--flame)" />
            <stop offset="100%" stopColor="var(--flame-deep)" />
          </linearGradient>
        </defs>
        <path d="M44 34 L236 34 L250 70 L262 350 Q262 366 246 366 L34 366 Q18 366 18 350 L30 70 Z" fill={`url(#${g("bag")})`} />
        <path d="M44 34 L236 34 L250 70 L30 70 Z" fill="var(--plum-deep)" />
        <rect x="44" y="18" width="192" height="20" rx="4" fill="var(--plum-deep)" />
        <path d="M30 70 L250 70 L262 350 Q262 366 246 366 L140 366 L140 70 Z" fill={`url(#${g("bagShine")})`} />
        <circle cx="140" cy="170" r="46" fill="none" stroke={`url(#${g("bagFlame")})`} strokeWidth="8" strokeDasharray="210 80" strokeLinecap="round" />
        <circle cx="140" cy="170" r="24" fill="none" stroke="var(--ash)" strokeWidth="5" strokeDasharray="90 60" strokeLinecap="round" />
        <AnimatePresence initial={false}>
          {labelVariants.map((v, i) =>
            i === variant ? (
              <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                <rect x="58" y="248" width="164" height="54" rx="10" fill={v.bg === "flame" ? `url(#${g("bagFlame")})` : v.bg} stroke="var(--on-dark)" strokeOpacity={i === 2 ? 0.25 : 0} />
                <text x="140" y="282" textAnchor="middle" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="15.5" letterSpacing="1.5" fill={v.fg}>VOTRE MARQUE</text>
                <text x="140" y="332" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="3" fill={v.sub}>CAFÉ TORRÉFIÉ</text>
              </motion.g>
            ) : null,
          )}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
}

export function PhotoPlaceholder({ className, label = "OCIBRENI" }: { className?: string; label?: string }) {
  return (
    <div className={cn("grain grid place-items-center rounded-xl border border-dashed border-ash/60 bg-sand", className)}>
      <div className="flex flex-col items-center gap-2 px-4 text-center text-ash">
        <ImageIcon className="size-7" />
        <span className="text-xs font-semibold tracking-[0.2em]">{label}</span>
      </div>
    </div>
  );
}
