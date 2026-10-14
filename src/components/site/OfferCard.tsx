import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function OfferCard({
  title,
  text,
  to,
  icon,
  highlighted,
  badge,
}: {
  title: string;
  text: string;
  to: string;
  icon: ReactNode;
  highlighted?: boolean;
  badge?: string;
}) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="h-full">
      <Link
        to={to}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-xl p-7 transition-shadow md:p-8",
          highlighted ? "bg-dusk text-on-dark shadow-lift" : "bg-card shadow-soft hover:shadow-lift",
        )}
      >
        {badge && (
          <span className="absolute right-6 top-6 rounded-full bg-flame-gradient px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
            {badge}
          </span>
        )}
        <div className={cn("mb-8 grid size-14 place-items-center rounded-2xl", highlighted ? "bg-on-dark/10" : "bg-sand")}>{icon}</div>
        <h3 className={cn("text-xl font-semibold", highlighted && "text-on-dark")}>{title}</h3>
        <p className={cn("mt-3 flex-1 leading-relaxed", highlighted ? "text-on-dark-muted" : "text-muted-foreground")}>{text}</p>
        <span className={cn("mt-8 inline-flex items-center gap-1.5 text-sm font-semibold", highlighted ? "text-on-dark" : "text-flame-deep")}>
          Découvrir
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}
