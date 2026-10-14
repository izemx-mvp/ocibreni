import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { Swirl } from "./Swirl";

export function PageHero({ eyebrow, title, text, children, aside }: { eyebrow: string; title: string; text: string; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <Swirl className="absolute -right-40 top-10 h-[90%] w-[90%] opacity-50 md:w-[70%]" />
      <div className="container-site relative grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-flame-deep">{eyebrow}</p>
          <h1 className="text-4xl font-semibold leading-[1.08] md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{text}</p>
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
        {aside && <Reveal delay={0.15}>{aside}</Reveal>}
      </div>
    </section>
  );
}
