import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const brandButton = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        flame: "bg-flame-gradient text-primary-foreground shadow-flame",
        outline: "border border-plum/20 bg-card text-plum hover:border-plum/40",
        ghostDark: "border border-on-dark/25 text-on-dark hover:bg-on-dark/10",
        light: "bg-on-dark text-plum",
      },
      size: { md: "h-11 px-5 text-sm", lg: "h-13 px-7 text-[15px]" },
    },
    defaultVariants: { variant: "flame", size: "md" },
  },
);

type Props = VariantProps<typeof brandButton> & {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function BrandButton({ to, href, children, className, variant, size, type = "button", onClick, disabled }: Props) {
  const cls = cn(brandButton({ variant, size }), className);
  const hover = { whileHover: { y: -2 }, whileTap: { scale: 0.98 } };
  if (to)
    return (
      <motion.span {...hover} className="inline-flex">
        <Link to={to} className={cls}>{children}</Link>
      </motion.span>
    );
  if (href)
    return (
      <motion.a {...hover} href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </motion.a>
    );
  return (
    <motion.button {...hover} type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </motion.button>
  );
}
