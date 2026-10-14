import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { nav } from "@/config/site";
import { cn } from "@/lib/utils";
import { BrandButton } from "./BrandButton";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "glass border-b border-mist/70 py-2.5" : "py-5")}>
        <div className="container-site flex items-center justify-between gap-6">
          <Link to="/" aria-label="OCIBRENI — Accueil" className="flex items-center">
            <img src={logo} alt="OCIBRENI" className={cn("w-auto transition-all", scrolled ? "h-11" : "h-14")} />
          </Link>
          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-plum/75 transition-colors hover:text-plum data-[status=active]:bg-sand data-[status=active]:text-plum"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <BrandButton to="/contact" className="hidden sm:inline-flex">Demander une dégustation</BrandButton>
            <button type="button" onClick={() => setOpen(true)} aria-label="Ouvrir le menu" className="grid size-11 place-items-center rounded-full bg-card text-plum shadow-soft lg:hidden">
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex flex-col bg-dusk lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="container-site flex items-center justify-between py-5">
              <span className="rounded-2xl bg-on-dark px-3 py-2"><img src={logo} alt="OCIBRENI" className="h-10 w-auto" /></span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu" className="grid size-11 place-items-center rounded-full border border-on-dark/25 text-on-dark">
                <X className="size-5" />
              </button>
            </div>
            <motion.nav className="container-site mt-8 flex flex-col gap-1" initial="h" animate="s" variants={{ h: {}, s: { transition: { staggerChildren: 0.06 } } }}>
              {nav.map((n) => (
                <motion.div key={n.to} variants={{ h: { opacity: 0, x: -16 }, s: { opacity: 1, x: 0 } }}>
                  <Link to={n.to} activeOptions={{ exact: n.to === "/" }} className="block py-3 font-display text-3xl font-semibold text-on-dark/70 data-[status=active]:text-on-dark">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <div className="container-site mt-auto pb-10">
              <BrandButton to="/contact" size="lg" className="w-full">Demander une dégustation</BrandButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
