import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Image de /public/images, référencée par son chemin.
 * - Pendant le chargement : un fond kraft avec un léger balayage lumineux.
 * - Une fois chargée : l'image apparaît en fondu, avec un très léger dézoom.
 * - Si le fichier n'existe pas encore : une illustration de marque (toile kraft + grains de café),
 *   jamais de texte « à fournir ». L'image prend sa place dès que le fichier est déposé.
 * La taille et le ratio viennent de `className` (ex. "aspect-[4/3]").
 */
export function SmartImage({
  src,
  alt,
  className,
  subject,
  imgClassName,
  priority = false,
  fallback = "placeholder",
}: {
  src: string;
  alt: string;
  className?: string;
  /** Conservé pour compatibilité ; sert d'intitulé accessible de l'illustration de repli. */
  subject?: string;
  imgClassName?: string;
  priority?: boolean;
  /** "none" pour les fonds décoratifs : rien au lieu de l'illustration. */
  fallback?: "placeholder" | "none";
}) {
  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading");
  const ref = useRef<HTMLImageElement>(null);

  // L'événement error peut partir avant l'hydratation : on vérifie l'élément une fois monté.
  useEffect(() => {
    setState("loading");
    const img = ref.current;
    if (!img || !img.complete) return;
    setState(img.naturalWidth === 0 ? "failed" : "loaded");
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden bg-[#D9C3A3]", className)}>
      {state === "failed" ? (
        fallback === "none" ? null : <BrandFallback label={subject ?? alt} />
      ) : (
        <>
          {state === "loading" && (
            <div aria-hidden className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-y-0 -left-1/2 w-1/2 animate-[smartimg-shimmer_1.6s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] motion-reduce:hidden" />
              <style>{`@keyframes smartimg-shimmer{to{transform:translateX(400%)}}`}</style>
            </div>
          )}
          <img
            ref={ref}
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setState("loaded")}
            onError={() => setState("failed")}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:transition-none",
              state === "loaded" ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
              imgClassName,
            )}
          />
        </>
      )}
    </div>
  );
}

/* Illustration de repli : toile kraft, grains de café épars, et un fin tourbillon aux couleurs du logo */
function BrandFallback({ label }: { label: string }) {
  const beans = [
    [18, 22, -30],
    [72, 18, 25],
    [44, 48, 70],
    [82, 66, -15],
    [24, 74, 40],
    [60, 84, -60],
  ] as const;

  return (
    <div
      role="img"
      aria-label={label}
      className="absolute inset-0 rounded-[inherit]"
      style={{
        backgroundColor: "#CDB08A",
        backgroundImage: [
          "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.25), transparent 60%)",
          "repeating-linear-gradient(0deg, rgba(80,52,24,0.07) 0 2px, transparent 2px 5px)",
          "repeating-linear-gradient(90deg, rgba(80,52,24,0.08) 0 2px, transparent 2px 6px)",
        ].join(","),
      }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        {beans.map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
            <ellipse rx="4.2" ry="5.8" fill="#5A3A1C" fillOpacity="0.55" />
            <path d="M0 -5.2 C -1.6 -1.6, 1.6 1.6, 0 5.2" fill="none" stroke="#2E1A0C" strokeOpacity="0.55" strokeWidth="0.7" strokeLinecap="round" />
          </g>
        ))}
        <path d="M-5 70 C 20 40, 45 95, 70 60 S 100 30, 110 40" fill="none" stroke="#E8202E" strokeOpacity="0.55" strokeWidth="0.8" />
        <path d="M-5 74 C 20 44, 45 99, 70 64 S 100 34, 110 44" fill="none" stroke="#5A1D48" strokeOpacity="0.45" strokeWidth="0.8" />
      </svg>
    </div>
  );
}