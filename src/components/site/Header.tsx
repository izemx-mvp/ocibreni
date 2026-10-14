import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import { nav, site, whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";
import { BrandButton } from "./BrandButton";
import { Swirl } from "./Swirl";

/* Pages dont le haut est sur fond prune : l'en-tête transparent y passe en texte clair. */
const darkTopRoutes = ["/notre-usine"];

/**
 * En-tête.
 * - En haut de page : transparent, pleine largeur.
 * - Après défilement : se détache en barre flottante arrondie, fond blanc, ombre douce.
 * - Se cache quand on descend, revient dès qu'on remonte.
 * - Le lien actif est marqué par une pastille prune qui glisse d'un lien à l'autre.
 * `dark` force le texte clair (404).
 */
export function Header({ dark = false }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const lastY = useRef(0);
  const onDark = (dark || darkTopRoutes.includes(pathname)) && !scrolled;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setScrolled(y > 24);
      if (y < 240) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      if (Math.abs(delta) > 6 || y < 240) lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open && !reduce ? -120 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn("fixed inset-x-0 top-0 z-50 transition-[padding] duration-500", scrolled ? "px-3 pt-3 md:px-6" : "px-0 pt-0")}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-6 transition-all duration-500",
            scrolled
              ? "max-w-[1240px] rounded-full border border-plum/10 bg-white/90 py-2 pl-3 pr-2 shadow-[0_16px_40px_-18px_rgba(42,14,34,0.45)] backdrop-blur-xl md:pl-4"
              : "container-site py-4 md:py-6",
          )}
        >
          <Link to="/" aria-label="OCIBRENI, accueil" className={cn("flex shrink-0 items-center rounded-2xl transition-all", onDark && "bg-white px-2.5 py-1.5")}>
            <img src={logo} alt="OCIBRENI" width={823} height={974} className={cn("w-auto transition-all duration-500", scrolled ? "h-10" : "h-12 md:h-14")} />
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center lg:flex">
            {nav.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                    active ? "text-white" : onDark ? "text-white/75 hover:text-white" : "text-plum/70 hover:text-plum",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className={cn("absolute inset-0 -z-10 rounded-full", onDark ? "bg-white/15" : "bg-plum")}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <BrandButton to="/contact" search={{ type: "degustation" }} className="hidden sm:inline-flex">
              Demander une dégustation
            </BrandButton>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              className={cn(
                "flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium lg:hidden",
                onDark ? "bg-white/15 text-white" : "bg-plum text-white",
              )}
            >
              <span className="flex flex-col gap-1" aria-hidden>
                <span className="h-0.5 w-4 rounded-full bg-current" />
                <span className="h-0.5 w-4 rounded-full bg-current" />
              </span>
              Menu
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="noise fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-dusk lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <Swirl className="pointer-events-none absolute -right-[30%] top-[20%] h-[70%] w-[130%] opacity-20" strokeWidth={3} />
            <div className="container-site relative flex items-center justify-between py-4">
              <span className="rounded-2xl bg-white px-2.5 py-1.5">
                <img src={logo} alt="OCIBRENI" className="h-10 w-auto" />
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="flex h-11 items-center gap-2 rounded-full border-2 border-white/25 px-4 text-sm font-medium text-white"
              >
                <span className="relative size-3" aria-hidden>
                  <span className="absolute left-0 top-1/2 h-0.5 w-3 rotate-45 rounded-full bg-current" />
                  <span className="absolute left-0 top-1/2 h-0.5 w-3 -rotate-45 rounded-full bg-current" />
                </span>
                Fermer
              </button>
            </div>

            <motion.nav
              className="container-site relative mt-10 flex flex-col"
              initial="h"
              animate="s"
              variants={{ h: {}, s: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              {nav.map((n) => {
                const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
                return (
                  <motion.div key={n.to} variants={{ h: { opacity: 0, y: 24 }, s: { opacity: 1, y: 0 } }} className="border-b border-white/10">
                    <Link
                      to={n.to}
                      className={cn(
                        "flex items-center justify-between py-4 font-display text-[2.1rem] font-semibold leading-none tracking-[-0.03em]",
                        active ? "text-white" : "text-white/55",
                      )}
                    >
                      {n.label}
                      {active && <span className="size-2.5 rounded-full bg-[#E8202E]" />}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <div className="container-site relative mt-auto space-y-4 pb-10 pt-10">
              <BrandButton to="/contact" search={{ type: "degustation" }} size="lg" className="w-full">
                Demander une dégustation
              </BrandButton>
              <div className="flex items-center justify-between text-sm text-white/70">
                <a href={site.phoneHref} className="font-medium hover:text-white">
                  {site.phone}
                </a>
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="font-medium hover:text-white">
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}