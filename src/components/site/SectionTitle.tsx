import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionTitle({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Reveal className={cn("relative mb-12 md:mb-16", align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {eyebrow && <p className={cn("eyebrow mb-4", tone === "dark" ? "text-flame" : "text-flame-deep")}>{eyebrow}</p>}
      <h2 className={cn("text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance", tone === "dark" && "text-on-dark")}>{title}</h2>
      {intro && (
        <p className={cn("mt-5 text-base leading-relaxed md:text-lg", tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground")}>{intro}</p>
      )}
    </Reveal>
  );
}
