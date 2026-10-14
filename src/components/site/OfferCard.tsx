import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FlameBorder } from "./LiftCard";
import { SmartImage } from "./SmartImage";

export function OfferCard({
  title,
  text,
  to,
  image,
  imageSubject,
  audience,
  featured,
  badge,
  className,
}: {
  title: string;
  text: string;
  to: string;
  image: string;
  imageSubject: string;
  audience: string;
  featured?: boolean;
  badge?: string;
  className?: string;
}) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className={cn("h-full", className)}>
      <Link
        to={to}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-xl border transition-shadow",
          featured ? "noise border-on-dark/10 bg-dusk text-on-dark shadow-lift lg:flex-row" : "border-mist bg-card shadow-soft hover:shadow-lift",
        )}
      >
        <FlameBorder />
        <SmartImage
          src={image}
          alt={title}
          subject={imageSubject}
          className={cn("aspect-[4/3] w-full shrink-0", featured && "lg:aspect-auto lg:min-h-[420px] lg:w-[52%]")}
          imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className={cn("flex flex-1 flex-col p-7 md:p-8", featured && "lg:p-12")}>
          {badge && (
            <span className="mb-5 self-start rounded-full bg-flame-gradient px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
              {badge}
            </span>
          )}
          <h3 className={cn("font-semibold", featured ? "text-2xl text-on-dark md:text-4xl" : "text-xl")}>{title}</h3>
          <p className={cn("mt-3 leading-relaxed", featured ? "text-on-dark-muted md:text-lg" : "text-muted-foreground")}>{text}</p>
          <p className={cn("mt-5 text-sm", featured ? "text-on-dark-muted" : "text-muted-foreground")}>
            <span className={cn("eyebrow mr-2", featured ? "text-flame" : "text-flame-deep")}>Pour</span>
            {audience}
          </p>
          <span className={cn("mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold", featured ? "text-on-dark" : "text-flame-deep")}>
            Découvrir
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
