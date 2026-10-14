import { useLocation, useRouter } from "@tanstack/react-router";
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useId, type ReactNode } from "react";
import { nav, whatsappLink } from "@/config/site";
import { Footer, WhatsAppButton } from "./Footer";
import { Header } from "./Header";

/** Subtle swirl line at the top of the viewport that draws itself as the page scrolls. */
function ScrollProgress() {
  const id = useId().replace(/:/g, "");
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <svg aria-hidden viewBox="0 0 1440 8" preserveAspectRatio="none" className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1.5 w-full">
      <defs>
        <linearGradient id={`sp-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--flame)" />
          <stop offset="45%" stopColor="var(--flame-deep)" />
          <stop offset="80%" stopColor="var(--plum)" />
          <stop offset="100%" stopColor="var(--ash)" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 4 C 180 1, 300 7, 480 4 S 780 1, 960 4 S 1260 7, 1440 4"
        fill="none"
        stroke={`url(#sp-${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ pathLength: reduce ? scrollYProgress : spring }}
      />
    </svg>
  );
}

/** New navigations start at the top; back/forward keeps the router's scroll restoration. */
function ScrollToTop() {
  const router = useRouter();
  useEffect(
    () =>
      router.history.subscribe(({ action, location }) => {
        if ((action.type === "PUSH" || action.type === "REPLACE") && !location.hash) window.scrollTo({ top: 0, behavior: "instant" });
      }),
    [router],
  );
  return null;
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const known = nav.some((n) => n.to === pathname || (n.to !== "/" && pathname === `${n.to}/`));

  return (
    // reducedMotion="user": with the OS setting on, transform animations are skipped and only fades remain.
    <MotionConfig reducedMotion="user">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-card focus:px-4 focus:py-2 focus:text-plum">
        Aller au contenu
      </a>
      <ScrollProgress />
      <ScrollToTop />
      <Header dark={!known} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="contenu"
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          className="min-h-[70vh]"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton href={whatsappLink()} />
    </MotionConfig>
  );
}
