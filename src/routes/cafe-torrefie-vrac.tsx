import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { BrandButton } from "@/components/site/BrandButton";
import { SmartImage } from "@/components/site/SmartImage";
import { Swirl } from "@/components/site/Swirl";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

const title = "Café torréfié en vrac — OCIBRENI, Casablanca";
const description =
  "Café torréfié dans notre usine de Tit Mellil et livré en vrac aux unités régionales qui assemblent et conditionnent elles-mêmes.";

export const Route = createFileRoute("/cafe-torrefie-vrac")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CafeTorrefieVrac,
});

const ease = [0.22, 1, 0.36, 1] as const;
const nbsp = "\u00A0";
const h2 = "font-display text-[clamp(2.2rem,1.4rem+3.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]";

type Roast = "Claire" | "Moyenne" | "Foncée";
const roastColor: Record<Roast, string> = { Claire: "#B07A4E", Moyenne: "#7A4228", Foncée: "#3A1C12" };

function CafeTorrefieVrac() {
  return (
    <>
      <Hero />
      <Roles />
      <Catalogue />
      <Delivery />
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
      <Swirl className="pointer-events-none absolute -right-[20%] -top-[10%] h-[130%] w-[85%] opacity-[0.15]" strokeWidth={3} />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-[clamp(2.9rem,1.6rem+5.6vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-plum"
          >
            Torréfié chez nous.
            <span className="block text-plum/35">Conditionné chez vous.</span>
          </motion.h1>
          <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-plum/75 md:text-xl">
            Vous avez votre propre unité, vous assemblez et vous conditionnez vous-même. Nous vous livrons du café torréfié dans notre usine de Tit Mellil, en vrac.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <BrandButton to="/contact" search={{ type: "vrac" }} size="lg">
              Demander un devis vrac
            </BrandButton>
            <Link
              to="/marque-blanche"
              className="font-medium text-plum underline decoration-plum/30 underline-offset-[6px] transition-colors hover:decoration-[#E8202E]"
            >
              Vous n’avez pas d’unité{nbsp}? Voir la marque blanche
            </Link>
          </div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
        >
          <SmartImage
            src="/images/offer-vrac.png"
            alt="Sacs de café torréfié en vrac"
            subject="café en vrac"
            priority
            className="aspect-[4/5] w-full rounded-[28px] shadow-[0_40px_60px_rgba(42,14,34,0.2)]"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 — Qui fait quoi + les 3 étapes                                    */
/* ------------------------------------------------------------------ */
const ourPart = ["Import du café vert", "Torréfaction dans notre usine", "Livraison en vrac"];
const yourPart = ["Assemblage de vos mélanges", "Conditionnement dans votre unité", "Vente sous votre propre marque"];
const steps = [
  { title: "Vous commandez", text: "Cafés, degré de torréfaction et volumes." },
  { title: "Nous torréfions", text: "Votre commande passe dans notre usine de Tit Mellil." },
  { title: "Nous livrons en vrac", text: "Prêt à être assemblé et conditionné chez vous." },
];

function Roles() {
  return (
    <section className="bg-[#EDE4DA] py-24 md:py-32">
      <div className="container-site">
        <h2 className={cn(h2, "max-w-3xl text-plum")}>Nous torréfions. Vous gardez la main sur vos mélanges.</h2>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className="text-sm font-semibold text-[#E8202E]">OCIBRENI</p>
            <ul className="mt-3">
              {ourPart.map((t) => (
                <li key={t} className="flex items-center gap-3 border-b border-plum/15 py-4 font-display text-xl font-semibold text-plum md:text-2xl">
                  <Check className="size-5 shrink-0 text-[#E8202E]" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm text-plum/55">Votre unité</p>
            <ul className="mt-3">
              {yourPart.map((t) => (
                <li key={t} className="border-b border-plum/15 py-4 font-display text-xl font-semibold text-plum/60 md:text-2xl">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ol className="mt-20 grid gap-10 border-t-2 border-plum pt-10 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-3">
              <span className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-[#E8202E]">{i + 1}</span>
              <div>
                <h3 className="font-display text-xl font-semibold text-plum">{s.title}</h3>
                <p className="mt-1.5 leading-relaxed text-plum/70">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3 — Catalogue : on choisit d'abord un degré de torréfaction         */
/* ------------------------------------------------------------------ */
const ALL = "Tous";

function Bean({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} aria-hidden>
      <ellipse cx="30" cy="40" rx="26" ry="36" fill={color} />
      <ellipse cx="22" cy="28" rx="8" ry="14" fill="#fff" opacity="0.12" />
      <path d="M30 6 C 20 26, 40 54, 30 74" fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function Catalogue() {
  const [roast, setRoast] = useState<Roast | typeof ALL>(ALL);
  const [origin, setOrigin] = useState<string>(ALL);
  const roasts = useMemo(() => (["Claire", "Moyenne", "Foncée"] as const).filter((r) => products.some((p) => p.roast === r)), []);
  const origins = useMemo(() => [ALL, ...new Set(products.map((p) => p.origin))], []);
  const filtered = products.filter((p) => (roast === ALL || p.roast === roast) && (origin === ALL || p.origin === origin));

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className={cn(h2, "text-plum")}>Nos cafés torréfiés en vrac</h2>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:justify-self-end">
            Commencez par le degré de torréfaction, puis l’origine. Chaque café est torréfié à la commande, pour vous arriver frais.
          </p>
        </div>

        {/* Sélecteur de torréfaction */}
        <div role="group" aria-label="Degré de torréfaction" className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <RoastButton active={roast === ALL} onClick={() => setRoast(ALL)} label="Toutes les torréfactions">
            <span className="flex -space-x-3">
              {roasts.map((r) => (
                <Bean key={r} color={roastColor[r]} className="h-12 w-9" />
              ))}
            </span>
          </RoastButton>
          {roasts.map((r) => (
            <RoastButton key={r} active={roast === r} onClick={() => setRoast(r)} label={`Torréfaction ${r.toLowerCase()}`}>
              <Bean color={roastColor[r]} className="h-12 w-9" />
            </RoastButton>
          ))}
        </div>

        {/* Origine */}
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="text-plum/55">Origine</span>
          {origins.map((o) => (
            <button
              key={o}
              type="button"
              aria-pressed={origin === o}
              onClick={() => setOrigin(o)}
              className={cn(
                "py-1 font-medium underline-offset-[6px] transition-colors",
                origin === o ? "text-plum underline decoration-[#E8202E] decoration-2" : "text-plum/50 hover:text-plum",
              )}
            >
              {o}
            </button>
          ))}
        </div>

        {/* Liste */}
        <div className="mt-12">
          <div className="hidden grid-cols-[2fr_1.2fr_1.6fr_1fr_auto] gap-6 border-b-2 border-plum pb-3 text-sm text-plum/55 md:grid">
            <span>Café</span>
            <span>Origine</span>
            <span>Profil</span>
            <span>Format</span>
            <span className="w-36" />
          </div>
          <LayoutGroup>
            <motion.ul layout aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((p) => (
                  <motion.li
                    key={p.name}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-b border-plum/15"
                  >
                    <div className="group grid gap-3 py-6 md:grid-cols-[2fr_1.2fr_1.6fr_1fr_auto] md:items-center md:gap-6">
                      <div className="flex items-center gap-4">
                        <Bean color={roastColor[p.roast as Roast]} className="h-9 w-7 shrink-0" />
                        <div>
                          <p className="font-display text-xl font-semibold text-plum">{p.name}</p>
                          <p className="text-sm text-plum/55">Torréfaction {p.roast.toLowerCase()}</p>
                        </div>
                      </div>
                      <Cell label="Origine">{p.origin}</Cell>
                      <Cell label="Profil">{p.profile}</Cell>
                      <Cell label="Format">{p.format}</Cell>
                      <Link
                        to="/contact"
                        search={{ type: "vrac" }}
                        className="inline-flex w-36 items-center gap-1.5 text-sm font-semibold text-plum transition-colors hover:text-[#E8202E]"
                      >
                        Demander un devis
                        <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                      </Link>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-plum/60">
              Aucun café pour ce choix.{" "}
              <button
                type="button"
                onClick={() => {
                  setRoast(ALL);
                  setOrigin(ALL);
                }}
                className="font-semibold text-plum underline underline-offset-4"
              >
                Voir tous les cafés
              </button>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function RoastButton({ active, onClick, label, children }: { active: boolean; onClick: () => void; label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-4 rounded-2xl border-2 p-5 text-left transition-colors duration-300",
        active ? "border-plum bg-plum text-white" : "border-plum/10 bg-[#F1EFF0] text-plum hover:border-plum/30",
      )}
    >
      {children}
      <span className="font-display text-base font-semibold leading-tight">{label}</span>
    </button>
  );
}

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p className="text-plum">
      <span className="mr-2 text-sm text-plum/50 md:hidden">{label}</span>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* 4 — Livraison hors Casablanca                                       */
/* ------------------------------------------------------------------ */
// CONTENU GÉNÉRÉ — à valider avec le client avant mise en ligne.
const deliveryFacts = [
  ["Zones desservies", "Tout le Maroc, au départ de notre usine de Tit Mellil."],
  ["Délais de livraison", "Quelques jours après torréfaction, selon votre ville et vos volumes."],
  ["Conditions", "Livraison par transporteur, en sacs fermés, prêts à entrer en production."],
] as const;

function Delivery() {
  return (
    <section className="noise relative overflow-hidden bg-dusk py-24 md:py-32">
      <div className="container-site">
        <h2 className={cn(h2, "max-w-3xl text-on-dark")}>Votre unité est ailleurs au Maroc{nbsp}?</h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-dark-muted">
          Indiquez-nous votre ville et vos volumes. Nous étudions avec vous la livraison de votre café en vrac.
        </p>

        {/* Trajet */}
        <div className="mt-16 flex items-center gap-4 md:gap-8">
          <div className="shrink-0">
            <p className="font-display text-2xl font-semibold text-on-dark md:text-4xl">Tit Mellil</p>
            <p className="text-sm text-on-dark-muted">Notre usine</p>
          </div>
          <svg aria-hidden viewBox="0 0 400 60" preserveAspectRatio="none" className="h-12 flex-1 md:h-16">
            <motion.path
              d="M4 50 C 120 0, 280 0, 396 50"
              fill="none"
              stroke="#F4522B"
              strokeWidth="2.5"
              strokeDasharray="8 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, ease }}
            />
          </svg>
          <div className="shrink-0 text-right">
            <p className="font-display text-2xl font-semibold text-on-dark/50 md:text-4xl">Votre ville</p>
            <p className="text-sm text-on-dark-muted">Votre unité</p>
          </div>
        </div>

        <dl className="mt-16 grid border-t border-on-dark/15 sm:grid-cols-3">
          {deliveryFacts.map(([k, v], i) => (
            <div key={k} className={cn("border-b border-on-dark/15 py-6 sm:border-b-0 sm:px-6", i === 0 && "sm:pl-0", i > 0 && "sm:border-l")}>
              <dt className="text-on-dark">{k}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-on-dark-muted">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          <BrandButton to="/contact" search={{ type: "vrac" }} size="lg">
            Nous indiquer votre ville
          </BrandButton>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 — Clôture                                                         */
/* ------------------------------------------------------------------ */
function Closing() {
  return (
    <section className="relative overflow-hidden bg-[#F1EFF0] py-24 md:py-28">
      <Swirl className="pointer-events-none absolute -left-[15%] top-0 h-full w-[70%] opacity-20" strokeWidth={3} />
      <div className="container-site relative max-w-4xl text-center">
        <h2 className="font-display text-[clamp(2.4rem,1.4rem+4vw,4.8rem)] font-semibold leading-[1] tracking-[-0.045em] text-plum">
          Un besoin régulier en café torréfié{nbsp}?
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-plum/70">
          Parlez-nous de vos volumes et de vos cafés. Nous revenons vers vous avec une proposition.
        </p>
        <div className="mt-10 flex justify-center">
          <BrandButton to="/contact" search={{ type: "vrac" }} size="lg">
            Demander un devis vrac
          </BrandButton>
        </div>
      </div>
    </section>
  );
}