import { useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Carte Google Maps (sans clé API) pour l'adresse de l'usine dans site.ts.
 * La carte est désaturée et teintée pour s'accorder à la charte ; elle reprend ses couleurs
 * au survol ou quand on interagit avec. Une étiquette en bas rappelle l'adresse.
 */
export function MapEmbed({ className }: { className?: string }) {
  const [active, setActive] = useState(false);
  const q = encodeURIComponent(`${site.address}, Maroc`);
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

  return (
    <div
      className={cn("group relative min-h-[320px] overflow-hidden bg-[#E7E2DA]", className)}
      onMouseLeave={() => setActive(false)}
    >
      <iframe
        title={`Plan d’accès — ${site.name}, ${site.city}`}
        src={`https://maps.google.com/maps?q=${q}&z=14&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onFocus={() => setActive(true)}
        className={cn(
          "absolute inset-0 h-full w-full border-0 transition-[filter] duration-700",
          active ? "[filter:none]" : "[filter:grayscale(1)_sepia(0.25)_contrast(1.05)_brightness(1.02)] group-hover:[filter:none]",
        )}
      />

      {/* Voile prune, retiré au survol */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[#5A1D48] mix-blend-multiply transition-opacity duration-700",
          active ? "opacity-0" : "opacity-[0.12] group-hover:opacity-0",
        )}
      />

      {/* Étiquette d'adresse */}
      <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-start sm:inset-x-4 sm:bottom-4">
        <div className="pointer-events-auto flex max-w-full items-center gap-3 rounded-full bg-white py-2 pl-2 pr-4 shadow-[0_12px_30px_-10px_rgba(42,14,34,0.45)]">
          <span className="relative grid size-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(120deg,#F4522B,#E8202E)]">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#E8202E]/40 motion-reduce:hidden" />
            <span className="relative size-2.5 rounded-full bg-white" />
          </span>
          <span className="min-w-0 truncate text-sm font-medium text-plum">{site.name}, {site.city}</span>
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-semibold text-[#E8202E] underline-offset-4 hover:underline"
          >
            Itinéraire
          </a>
        </div>
      </div>
    </div>
  );
}