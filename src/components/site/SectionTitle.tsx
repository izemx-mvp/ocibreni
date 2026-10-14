import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Swirl } from "./Swirl";

export function SectionTitle({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <Reveal className={cn("relative mb-12 md:mb-16", align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl")}>
      <Swirl variant="line" className={cn("absolute -top-4 h-16 w-[120%] opacity-40", align === "center" ? "left-1/2 -translate-x-1/2" : "-left-6")} />
      {eyebrow && (
        <p className="relative mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-flame-deep">{eyebrow}</p>
      )}
      <h2 className={cn("relative text-3xl font-semibold leading-tight md:text-[2.6rem]", tone === "dark" && "text-on-dark")}>{title}</h2>
      {intro && (
        <p className={cn("relative mt-4 text-base leading-relaxed md:text-lg", tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground")}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
