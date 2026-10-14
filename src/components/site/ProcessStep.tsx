import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "./Reveal";

export function ProcessStep({ index, title, text, last }: { index: number; title: string; text?: string | undefined; last?: boolean }) {
  return (
    <motion.li variants={fadeUp} className="relative flex gap-5 pb-10 last:pb-0">
      {!last && <span aria-hidden className="absolute left-[23px] top-14 bottom-0 w-px bg-gradient-to-b from-flame/60 to-mist" />}
      <span className={cn("relative grid size-12 shrink-0 place-items-center rounded-full font-display text-sm font-semibold", index === 0 ? "bg-flame-gradient text-primary-foreground shadow-flame" : "bg-card text-plum shadow-soft")}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="pt-2.5">
        <h3 className="text-lg font-semibold">{title}</h3>
        {text && <p className="mt-1.5 max-w-md leading-relaxed text-muted-foreground">{text}</p>}
      </div>
    </motion.li>
  );
}

export function ProcessList({ steps }: { steps: { title: string; text?: string }[] }) {
  return (
    <motion.ol initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}>
      {steps.map((s, i) => (
        <ProcessStep key={s.title} index={i} title={s.title} text={s.text} last={i === steps.length - 1} />
      ))}
    </motion.ol>
  );
}
