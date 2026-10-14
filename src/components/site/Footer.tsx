import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import logo from "@/assets/logo.png";
import { nav, site, whatsappLink } from "@/config/site";
import { Swirl } from "./Swirl";

const activities = [
  { to: "/marque-blanche", label: "Marque blanche" },
  { to: "/cafe-torrefie-vrac", label: "Café torréfié en vrac" },
  { to: "/cafe-vert", label: "Café vert" },
];

/**
 * Pied de page.
 * Une dernière phrase en très grand avec l'appel à la dégustation, puis les colonnes utiles,
 * et le nom OCIBRENI en lettres géantes, coupé par le bas de la page.
 */
export function Footer() {
  const company = nav.filter((n) => !activities.some((a) => a.to === n.to));

  return (
    <footer className="noise relative overflow-hidden bg-[#2A0E22] text-white/65">
      <Swirl className="pointer-events-none absolute -right-[10%] top-0 h-[70%] w-[75%] opacity-20" strokeWidth={3} />

      {/* Dernière phrase */}
      <div className="container-site relative border-b border-white/10 pb-16 pt-20 md:pb-20 md:pt-28">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <p className="font-display text-[clamp(2.2rem,1.3rem+3.6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            Votre marque de café,
            <span className="block text-white/40">notre savoir-faire de torréfacteur.</span>
          </p>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <Link
              to="/contact"
              search={{ type: "degustation" }}
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-white pl-7 pr-2.5 text-[15px] font-medium text-plum transition-colors hover:bg-[#F1EFF0]"
            >
              Demander une dégustation
              <span className="grid size-9 place-items-center rounded-full bg-[linear-gradient(120deg,#F4522B,#E8202E)] text-white transition-transform duration-500 group-hover:rotate-45">
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 11 11 5M6 5h5v5" />
                </svg>
              </span>
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="text-sm font-medium text-white/70 underline decoration-white/25 underline-offset-[6px] hover:text-white hover:decoration-[#F4522B]">
              Ou écrivez-nous sur WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Colonnes */}
      <div className="container-site relative grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr]">
        <div>
          <span className="inline-block rounded-2xl bg-white px-3 py-2">
            <img src={logo} alt="OCIBRENI" className="h-12 w-auto" />
          </span>
          <p className="mt-6 max-w-xs leading-relaxed">{site.shortPitch}</p>
        </div>

        <FooterColumn title="Nos activités">
          {activities.map((a) => (
            <FooterLink key={a.to} to={a.to}>
              {a.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="L’entreprise">
          {company.map((n) => (
            <FooterLink key={n.to} to={n.to}>
              {n.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <div>
          <p className="mb-5 font-display text-base font-semibold text-white">Nous joindre</p>
          <dl className="space-y-4 text-[15px]">
            <div>
              <dt className="text-xs text-white/45">Usine</dt>
              <dd className="mt-0.5 text-white/80">{site.address}</dd>
            </div>
            <div>
              <dt className="text-xs text-white/45">Téléphone</dt>
              <dd className="mt-0.5">
                <a href={site.phoneHref} className="text-white/80 hover:text-white">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-white/45">Email</dt>
              <dd className="mt-0.5">
                <a href={`mailto:${site.email}`} className="break-all text-white/80 hover:text-white">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-white/45">Horaires</dt>
              <dd className="mt-0.5 text-white/80">{site.hours}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Bas de page */}
      <div className="container-site relative flex flex-col justify-between gap-2 border-t border-white/10 py-6 text-sm text-white/45 md:flex-row">
        <span>© {new Date().getFullYear()} OCIBRENI. Tous droits réservés.</span>
        <span>Importé, torréfié et conditionné à Tit Mellil</span>
      </div>

      {/* Nom géant, coupé par le bas */}
      <div aria-hidden className="pointer-events-none relative -mb-[0.22em] select-none overflow-hidden">
        <p className="text-center font-display text-[clamp(4.5rem,1rem+19vw,18rem)] font-bold leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.14)]">
          OCIBRENI
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-5 font-display text-base font-semibold text-white">{title}</p>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <li>
      <Link to={to} className="group inline-flex items-center gap-2 text-[15px] text-white/70 transition-colors hover:text-white">
        <span className="h-px w-0 bg-[#E8202E] transition-all duration-300 group-hover:w-4" />
        {children}
      </Link>
    </li>
  );
}

/**
 * Bouton WhatsApp flottant. Une bulle « Une question ? » s'ouvre une seule fois, quelques secondes
 * après l'arrivée, puis se replie ; elle se rouvre au survol.
 */
export function WhatsAppButton({ href }: { href: string }) {
  const reduce = useReducedMotion();
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const show = window.setTimeout(() => setHint(true), 4000);
    const hide = window.setTimeout(() => setHint(false), 9000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [reduce]);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Nous écrire sur WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      onMouseEnter={() => setHint(true)}
      onMouseLeave={() => setHint(false)}
      onFocus={() => setHint(true)}
      onBlur={() => setHint(false)}
      className="fixed bottom-4 right-4 z-40 flex h-14 items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-10px_rgba(18,140,70,0.6)] md:bottom-6 md:right-6"
    >
      <AnimatePresence initial={false}>
        {hint && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden whitespace-nowrap pl-5 text-sm font-semibold"
          >
            Une question{" "}? Écrivez-nous
          </motion.span>
        )}
      </AnimatePresence>
      <span className="grid size-14 shrink-0 place-items-center">
        <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden>
          <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2S21.8 6.6 21.8 12 17.4 21.8 12 21.8zM12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12S18.6 0 12 0z" />
        </svg>
      </span>
    </motion.a>
  );
}