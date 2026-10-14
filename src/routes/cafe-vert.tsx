import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { BrandButton } from "@/components/site/BrandButton";
import { SmartImage } from "@/components/site/SmartImage";
import { Swirl } from "@/components/site/Swirl";
import { origins, type Origin } from "@/data/origins";
import { cn } from "@/lib/utils";

const title = "Café vert pour torréfacteurs — OCIBRENI, Casablanca";
const description =
  "OCIBRENI importe du café vert et le propose aux torréfacteurs. Découvrez nos origines et demandez la disponibilité.";

export const Route = createFileRoute("/cafe-vert")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Police pochoir : celle des marquages imprimés sur les sacs de café vert
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Allerta+Stencil&display=swap" },
    ],
  }),
  component: CafeVert,
});

const ease = [0.22, 1, 0.36, 1] as const;
const nbsp = " ";
const h2 = "font-display text-[clamp(2.2rem,1.4rem+3.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]";
const stencil = { fontFamily: "'Allerta Stencil', 'Sora', sans-serif" };

/* Toile de jute : deux trames croisées sur un fond chanvre */
const jute = {
  backgroundColor: "#C9AB80",
  backgroundImage: [
    "repeating-linear-gradient(0deg, rgba(80,52,24,0.10) 0 2px, transparent 2px 5px)",
    "repeating-linear-gradient(90deg, rgba(80,52,24,0.12) 0 2px, transparent 2px 6px)",
    "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.18), transparent 60%)",
  ].join(","),
};

const availabilityInk: Record<Origin["availability"], string> = {
  Disponible: "#2F6B3F",
  "Sur commande": "#C21A27",
};

function CafeVert() {
  return (
    <>
      <Hero />
      <Warehouse />
      <Reasons />
      <Order />
      <Closing />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 1 — Hero                                                            */
/* ------------------------------------------------------------------ */
function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[#F1EFF0] pt-28 pb-20 md:pt-36 md:pb-28">
      <Swirl className="pointer-events-none absolute -left-[20%] top-0 h-[120%] w-[80%] opacity-[0.14]" strokeWidth={3} />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-[clamp(2.9rem,1.6rem+5.6vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-plum"
          >
            Du café vert,
            <span className="block text-plum/35">choisi par un torréfacteur.</span>
          </motion.h1>
          <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-plum/75 md:text-xl">
            Nous importons le café vert que nous torréfions chaque jour à Tit Mellil. Torréfacteurs, vous pouvez vous approvisionner aux mêmes sacs que nous.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <BrandButton to="/contact" search={{ type: "vert" }} size="lg">
              Demander la disponibilité
            </BrandButton>
            <a href="#entrepot" className="font-medium text-plum underline decoration-plum/30 underline-offset-[6px] transition-colors hover:decoration-[#E8202E]">
              Voir nos origines
            </a>
          </div>
        </div>

        {/* Photo + sac en pochoir posé devant */}
        <div className="relative mx-auto w-full max-w-[480px] pb-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
          >
            <SmartImage
              src="/images/offer-cafe-vert.png"
              alt="Grains de café vert dans un sac de jute"
              subject="café vert"
              priority
              className="aspect-[4/5] w-full rounded-[28px] shadow-[0_40px_60px_rgba(42,14,34,0.2)]"
            />
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="absolute -left-6 bottom-0 w-[46%] sm:-left-12"
          >
            <div className="rounded-xl p-4 shadow-[0_24px_40px_rgba(42,14,34,0.3)]" style={jute}>
              <p className="text-[#3B2614]" style={stencil}>
                <span className="block text-[11px] tracking-[0.25em] opacity-70">CAFÉ VERT</span>
                <span className="mt-1 block text-2xl leading-none sm:text-3xl">ORIGINE</span>
                <span className="mt-1 block text-[11px] tracking-[0.2em] opacity-70">IMPORT OCIBRENI</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 — L'entrepôt : chaque origine est un sac, on l'ouvre pour lire    */
/*     sa fiche lot                                                    */
/* ------------------------------------------------------------------ */
function Warehouse() {
  const [selected, setSelected] = useState(0);
  const current = origins[selected] ?? origins[0]!;

  return (
    <section id="entrepot" className="scroll-mt-24 bg-[#E7E2DA] py-24 md:py-32">
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className={cn(h2, "text-plum")}>L’entrepôt</h2>
          <p className="max-w-md text-lg leading-relaxed text-plum/70 md:justify-self-end">
            Chaque sac est une origine. Choisissez-en un pour lire sa fiche&nbsp;: région, variété, process et notes de dégustation.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          {/* Les sacs */}
          <div role="listbox" aria-label="Origines de café vert" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
            {origins.map((o, i) => (
              <Sack key={o.country} origin={o} index={i} active={i === selected} onSelect={() => setSelected(i)} />
            ))}
          </div>

          {/* Fiche lot */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.country}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease }}
              >
                <LotSheet origin={current} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sack({ origin, index, active, onSelect }: { origin: Origin; index: number; active: boolean; onSelect: () => void }) {
  const ink = availabilityInk[origin.availability];
  const lot = String(index + 1).padStart(3, "0");

  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      onClick={onSelect}
      className="group relative text-left outline-none"
    >
      <motion.div
        animate={{ y: active ? -10 : 0, rotate: active ? 0 : index % 2 === 0 ? -1.2 : 1.2 }}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={cn(
          "relative overflow-hidden rounded-[18px_18px_26px_26px] shadow-[0_18px_30px_rgba(60,38,20,0.22)] ring-offset-4 ring-offset-[#E7E2DA] transition-shadow group-focus-visible:ring-2 group-focus-visible:ring-plum",
          active && "ring-[3px] ring-[#E8202E]",
        )}
        style={jute}
      >
        {/* Fronce du haut du sac */}
        <div className="h-5 bg-[linear-gradient(180deg,rgba(60,38,20,0.35),rgba(60,38,20,0))]" />
        <svg aria-hidden viewBox="0 0 100 8" preserveAspectRatio="none" className="absolute inset-x-0 top-3 h-2 w-full">
          <path d="M0 4 Q 5 0 10 4 T 20 4 T 30 4 T 40 4 T 50 4 T 60 4 T 70 4 T 80 4 T 90 4 T 100 4" fill="none" stroke="#5A3A1C" strokeOpacity="0.45" strokeWidth="1.2" />
        </svg>

        <div className="flex aspect-[3/4] flex-col justify-between px-4 pb-5 pt-4 text-[#3B2614]" style={stencil}>
          <div className="flex items-start justify-between text-[10px] tracking-[0.2em] opacity-70">
            <span>LOT {lot}</span>
            <span>CAFÉ VERT</span>
          </div>

          <div>
            <p className="break-words text-[clamp(1.35rem,1rem+1.4vw,2rem)] uppercase leading-[0.95]">{origin.country}</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.15em] opacity-75">{origin.region}</p>
          </div>

          {/* Tampon de disponibilité */}
          <span
            className="self-start -rotate-6 rounded border-2 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em]"
            style={{ color: ink, borderColor: ink, opacity: 0.85 }}
          >
            {origin.availability}
          </span>
        </div>
      </motion.div>
    </button>
  );
}

function LotSheet({ origin }: { origin: Origin }) {
  return (
    <div className="relative bg-[#FBF8F4] p-7 text-plum shadow-[0_30px_60px_rgba(42,14,34,0.16)] md:p-9">
      {/* Trou de perforation, comme une étiquette attachée au sac */}
      <span aria-hidden className="absolute right-7 top-7 size-4 rounded-full border-2 border-plum/25 bg-[#E7E2DA]" />

      <p className="text-sm text-plum/55">Fiche origine</p>
      <h3 className="mt-2 font-display text-4xl font-semibold leading-none tracking-[-0.03em]">{origin.country}</h3>
      <p className="mt-2 text-plum/70">{origin.region}</p>

      <dl className="mt-8 border-t-2 border-plum">
        {[
          ["Variété", origin.variety],
          ["Process", origin.process],
          ["Disponibilité", origin.availability],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline gap-4 border-b border-dotted border-plum/25 py-3.5">
            <dt className="w-28 shrink-0 text-sm text-plum/55">{k}</dt>
            <dd className="font-medium" style={k === "Disponibilité" ? { color: availabilityInk[origin.availability as Origin["availability"]] } : undefined}>
              {v}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-7">
        <p className="text-sm text-plum/55">Notes de dégustation</p>
        <p className="mt-2 font-display text-xl font-semibold leading-snug">{origin.notes.join(", ")}</p>
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
        <BrandButton to="/contact" search={{ type: "vert" }}>
          Demander ce café
        </BrandButton>
        <span className="text-sm text-plum/55">Échantillon disponible sur demande</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3 — Pourquoi nous : trois phrases, pas de cartes                    */
/* ------------------------------------------------------------------ */
// TODO: à valider avec le client — arguments tirés de l'activité réelle (import + torréfaction).
const reasons = [
  {
    lead: "Nous importons nous-mêmes.",
    text: "L’achat et l’import du café vert font partie de notre travail quotidien, pas d’une activité annexe.",
  },
  {
    lead: "Nous torréfions ce que nous vendons.",
    text: "Ces cafés passent aussi dans notre usine. Nous savons comment ils se comportent à la torréfaction, et nous pouvons vous le dire.",
  },
  {
    lead: "Une seule adresse pour vos besoins.",
    text: "Café vert aujourd’hui, café torréfié en vrac si votre production l’exige demain.",
  },
];

function Reasons() {
  return (
    <section className="noise relative overflow-hidden bg-dusk py-24 md:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className={cn(h2, "text-on-dark")}>Pourquoi acheter votre café vert chez un torréfacteur</h2>
          <SmartImage
            src="/images/usine-import.png"
            alt="Sacs de café vert dans l’entrepôt OCIBRENI"
            subject="import, café vert"
            className="mt-10 hidden aspect-[4/3] rounded-2xl lg:block"
          />
        </div>
        <div>
          {reasons.map((r) => (
            <div key={r.lead} className="border-b border-on-dark/15 py-10 first:pt-0">
              <p className="font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-on-dark">{r.lead}</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-on-dark-muted">{r.text}</p>
            </div>
          ))}
          <Link
            to="/cafe-torrefie-vrac"
            className="mt-10 inline-flex items-center gap-2 font-medium text-on-dark underline decoration-on-dark/30 underline-offset-[6px] hover:decoration-[#F4522B]"
          >
            Voir aussi le café torréfié en vrac <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 — Commander : un bordereau en trois cases                         */
/* ------------------------------------------------------------------ */
const orderSteps = [
  { title: "Votre demande", text: "Les origines qui vous intéressent et les volumes souhaités." },
  { title: "Nos disponibilités", text: "Nous revenons vers vous avec les lots disponibles." },
  { title: "La livraison", text: "Les sacs sont livrés à votre torréfaction." },
];

function Order() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container-site">
        <h2 className={cn(h2, "max-w-3xl text-plum")}>Commander du café vert</h2>
        <ol className="mt-14 grid border-2 border-plum md:grid-cols-3">
          {orderSteps.map((s, i) => (
            <li key={s.title} className={cn("p-7 md:p-9", i > 0 && "border-t-2 border-plum md:border-l-2 md:border-t-0")}>
              <span className="text-5xl leading-none text-[#E8202E]" style={stencil}>
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-plum">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-plum/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 — Clôture                                                         */
/* ------------------------------------------------------------------ */
function Closing() {
  return (
    <section className="relative overflow-hidden py-24 md:py-28" style={jute}>
      <div className="container-site relative max-w-4xl text-center text-[#3B2614]">
        <p className="text-[clamp(2.4rem,1.4rem+4vw,4.8rem)] uppercase leading-[0.95]" style={stencil}>
          Besoin de café vert{nbsp}?
        </p>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed">
          Dites-nous quelles origines et quels volumes vous intéressent. Nous vous répondons avec les disponibilités.
        </p>
        <div className="mt-10 flex justify-center">
          <BrandButton to="/contact" search={{ type: "vert" }} size="lg">
            Demander la disponibilité
          </BrandButton>
        </div>
      </div>
    </section>
  );
}