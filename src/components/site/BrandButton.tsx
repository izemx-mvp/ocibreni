import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Bouton de la marque.
 * - flame : dégradé du logo ; au survol, un reflet traverse le bouton et le dégradé glisse vers le prune.
 * - plum : aplat prune, pour les fonds clairs quand le rouge est déjà présent ailleurs.
 * - outline / ghostDark / light : variantes secondaires.
 */
export const brandButton = cva(
  [
    "group/btn relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium whitespace-nowrap",
    "transition-[color,background-color,border-color,box-shadow] duration-300",
    "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E8202E] focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-60",
  ].join(" "),
  {
    variants: {
      variant: {
        flame: [
          "bg-[linear-gradient(120deg,#F4522B,#E8202E)] text-white shadow-[0_10px_24px_-8px_rgba(232,32,46,0.55)]",
          // dégradé qui glisse vers le prune
          "before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(120deg,#E8202E,#5A1D48_130%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
          // reflet qui traverse le bouton
          "after:absolute after:inset-y-0 after:-left-1/2 after:-z-10 after:w-1/3 after:skew-x-[-20deg] after:bg-white/25 after:blur-[2px] after:transition-transform after:duration-700 hover:after:translate-x-[420%]",
          "hover:shadow-[0_14px_30px_-8px_rgba(90,29,72,0.55)]",
        ].join(" "),
        plum: "bg-plum text-white hover:bg-[#3E1231] shadow-[0_10px_24px_-10px_rgba(90,29,72,0.6)]",
        outline: "border-2 border-plum/20 bg-transparent text-plum hover:border-plum hover:bg-plum hover:text-white",
        ghostDark: "border-2 border-white/25 text-white hover:border-white hover:bg-white hover:text-plum",
        light: "bg-white text-plum hover:bg-[#F1EFF0]",
      },
      size: {
        md: "h-11 px-5 text-sm",
        lg: "h-14 pl-7 pr-2.5 text-[15px]",
      },
    },
    defaultVariants: { variant: "flame", size: "md" },
  },
);

type Props = VariantProps<typeof brandButton> & {
  to?: string;
  search?: Record<string, string>;
  href?: string;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

/* Pastille ronde à droite des grands boutons : la flèche tourne au survol */
function ArrowChip({ dark }: { dark: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "ml-2 grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-500 group-hover/btn:rotate-45",
        dark ? "bg-white/20" : "bg-plum/10 group-hover/btn:bg-white/20",
      )}
    >
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 11 11 5M6 5h5v5" />
      </svg>
    </span>
  );
}

export function BrandButton({ to, search, href, children, className, variant, size, type = "button", onClick, disabled }: Props) {
  const reduce = useReducedMotion();
  const isLarge = size === "lg";
  const filled = variant === undefined || variant === "flame" || variant === "plum";
  const cls = cn(brandButton({ variant, size }), className);
  const hover = reduce ? {} : { whileTap: { scale: 0.97 } };
  const content = (
    <>
      <span className="relative">{children}</span>
      {isLarge && <ArrowChip dark={filled} />}
    </>
  );

  if (to)
    return (
      <motion.span {...hover} className={cn("inline-flex", className?.includes("w-full") && "w-full")}>
        <Link to={to} search={search ?? {}} className={cls}>
          {content}
        </Link>
      </motion.span>
    );
  if (href)
    return (
      <motion.a {...hover} href={href} target="_blank" rel="noreferrer" className={cls}>
        {content}
      </motion.a>
    );
  return (
    <motion.button {...hover} type={type} onClick={onClick} disabled={disabled} className={cls}>
      {content}
    </motion.button>
  );
}