import { useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** Fiche Google Maps officielle de l'usine (Ocibreni Coffee Roasters, Tit Mellil). */
export const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.000894492496!2d-7.49262012430587!3d33.52736237335911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda635bf8d3cf4bb%3A0x3f673d7e949f674d!2sOcibreni%20Coffee%20Roasters%E2%80%93%20Torr%C3%A9faction%20%26%20Marque%20Blanche%20de%20Caf%C3%A9%20au%20Maroc%20%7C%20Import%2C%20Conditionnement%20%26%20Distribution!5e0!3m2!1sfr!2sma!4v1791990318863!5m2!1sfr!2sma";

/** Lien d'itinéraire vers l'usine, utilisé partout sur le site. */
export const DIRECTIONS_URL = "https://maps.app.goo.gl/SV1zAq8SKXqzEA1x5";

/**
 * Carte Google Maps (sans clé API) pour l'adresse de l'usine dans site.ts.
 * La carte est désaturée et teintée pour s'accorder à la charte ; elle reprend ses couleurs
 * au survol ou quand on interagit avec. Une étiquette en bas rappelle l'adresse.
 */
export function MapEmbed({ className }: { className?: string }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={cn("group relative min-h-[320px] overflow-hidden bg-[#E7E2DA]", className)}
      onMouseLeave={() => setActive(false)}
    >
      <iframe
        title={`Plan d’accès — ${site.name}, ${site.city}`}
        src={MAP_EMBED_URL}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
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
            href={DIRECTIONS_URL}
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