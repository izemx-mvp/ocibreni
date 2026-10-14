import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import type { FaqItem } from "@/data/faq";
import { cn } from "@/lib/utils";

/**
 * Questions fréquentes en liste typographique : un filet prune en haut, des questions en grand,
 * une croix qui devient un moins rouge à l'ouverture. Pas de carte autour, pour se fondre dans
 * les sections à deux colonnes des pages.
 */
export function FAQ({ items, tone = "light" }: { items: FaqItem[]; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const dark = tone === "dark";

  return (
    <div className={cn("border-t-2", dark ? "border-white/80" : "border-plum")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-${uid}-${i}`;
        return (
          <div key={item.q} className={cn("border-b", dark ? "border-white/15" : "border-plum/15")}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-start justify-between gap-6 py-6 text-left outline-none md:py-7"
            >
              <span
                className={cn(
                  "font-display text-lg font-semibold leading-snug transition-colors md:text-xl",
                  dark ? "text-white" : isOpen ? "text-plum" : "text-plum/80 group-hover:text-plum",
                  "group-focus-visible:underline group-focus-visible:decoration-[#E8202E] group-focus-visible:underline-offset-4",
                )}
              >
                {item.q}
              </span>
              <span
                aria-hidden
                className={cn(
                  "relative mt-1 grid size-8 shrink-0 place-items-center rounded-full border-2 transition-colors duration-300",
                  isOpen ? "border-[#E8202E] bg-[#E8202E]" : dark ? "border-white/30" : "border-plum/25 group-hover:border-plum",
                )}
              >
                <span className={cn("absolute h-0.5 w-3 rounded-full", isOpen ? "bg-white" : dark ? "bg-white" : "bg-plum")} />
                <motion.span
                  className={cn("absolute h-3 w-0.5 rounded-full", dark ? "bg-white" : "bg-plum")}
                  animate={{ scaleY: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.25 }}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className={cn("max-w-2xl pb-7 pr-14 text-[17px] leading-relaxed", dark ? "text-white/70" : "text-plum/70")}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}