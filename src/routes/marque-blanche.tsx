import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { BrandButton } from "@/components/site/BrandButton";
import { FAQ } from "@/components/site/FAQ";
import { SmartImage } from "@/components/site/SmartImage";
import { Swirl } from "@/components/site/Swirl";
import { marqueBlancheFaq } from "@/data/faq";
import { cn } from "@/lib/utils";

const title = "Café en marque blanche à Casablanca — OCIBRENI";
const description =
  "Votre café, votre nom, notre usine. OCIBRENI crée votre formule, la torréfie et la conditionne dans votre emballage à Tit Mellil. Sans local ni torréfacteur.";

export const Route = createFileRoute("/marque-blanche")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: MarqueBlanche,
});

const ease = [0.22, 1, 0.36, 1] as const;
const nbsp = "\u00A0";
const h2 = "font-display text-[clamp(2.2rem,1.4rem+3.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]";

function MarqueBlanche() {
  return (
    <>
      <Hero />
      <ForWhom />
      <FormulaJourney />
      <Split />
      <Questions />
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
      <Swirl className="pointer-events-none absolute -left-[25%] top-[5%] h-[110%] w-[80%] opacity-[0.15]" strokeWidth={3} />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-[clamp(2.9rem,1.6rem+5.6vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-plum"
          >
            Votre café.
            <span className="block">Votre nom.</span>
            <span className="block text-plum/35">Notre usine.</span>
          </motion.h1>
          <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-plum/75 md:text-xl">
            Nous créons avec vous la formule de votre café, puis nous l’importons, la torréfions et la conditionnons dans votre emballage. Vous vous occupez de votre marque et de vos clients.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <BrandButton to="/contact" search={{ type: "degustation" }} size="lg">
              Demander une dégustation
            </BrandButton>
            <Link
              to="/contact"
              search={{ type: "marque-blanche" }}
              className="font-medium text-plum underline decoration-plum/30 underline-offset-[6px] transition-colors hover:decoration-[#E8202E]"
            >
              Demander un devis
            </Link>
          </div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="mx-auto w-full max-w-[420px]"
        >
          <SmartImage
            src="/images/bag-mockup.png"
            alt="Sachet de café à étiquette vierge, prêt à recevoir votre marque"
            subject="sachet à votre marque"
            priority
            className="aspect-[4/5] w-full rounded-[28px] shadow-[0_40px_60px_rgba(42,14,34,0.22)]"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 — Pour qui : quatre colonnes typographiques                       */
/* ------------------------------------------------------------------ */
const audiences = [
  { title: "Entrepreneurs", text: "Vous lancez votre marque de café sans usine ni torréfacteur à financer." },
  { title: "Cafés, hôtels, restaurants", text: "Un café à votre nom, servi à vos clients et vendu sur place." },
  { title: "Distributeurs et commerces", text: "Une gamme en propre pour vos rayons et votre réseau." },
  { title: "Entreprises", text: "Un café à votre image pour vos équipes, vos clients ou vos cadeaux." },
];

function ForWhom() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container-site">
        <h2 className={cn(h2, "max-w-3xl text-plum")}>Une marque de café, quel que soit votre métier</h2>
        <ul className="mt-16 grid border-t border-plum/15 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <li
              key={a.title}
              className={cn(
                "border-b border-plum/15 py-8 sm:px-6 lg:border-b-0 lg:py-10",
                i % 2 === 1 && "sm:border-l",
                i > 0 && "lg:border-l",
                "sm:first:pl-0 lg:pl-8 lg:first:pl-0",
              )}
            >
              <h3 className="font-display text-2xl font-semibold leading-tight text-plum">{a.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3 — Le parcours : la fiche formule se remplit à chaque étape        */
/* ------------------------------------------------------------------ */
const steps = [
  {
    title: "On parle de votre projet",
    you: "Vous présentez votre marque, votre clientèle et vos volumes estimés.",
    us: "Nous vous orientons vers les profils de café adaptés.",
  },
  {
    title: "Vous dégustez nos propositions",
    you: "Vous goûtez et vous donnez votre avis.",
    us: "Nous préparons plusieurs mélanges et torréfactions.",
  },
  {
    title: "Vous choisissez votre formule",
    you: "Vous retenez le profil qui sera celui de votre marque.",
    us: "Nous l’ajustons si besoin.",
  },
  {
    title: "Nous enregistrons la formule",
    you: "Vous la validez.",
    us: "Origines, proportions et profil de torréfaction sont enregistrés pour être reproduits à l’identique.",
  },
  {
    title: "Nous produisons dans votre emballage",
    you: "Vous fournissez votre emballage.",
    us: "Nous importons, torréfions et conditionnons, lot après lot.",
  },
];

function FormulaJourney() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#EDE4DA] py-24 md:py-32">
      <div className="container-site">
        <h2 className={cn(h2, "max-w-3xl text-plum")}>Comment votre formule voit le jour</h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-plum/70">
          Cinq étapes. À chacune, ce que vous faites et ce que nous prenons en charge.
        </p>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <ol>
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className={cn(
                  "grid grid-cols-[4rem_1fr] gap-4 border-t border-plum/15 py-10 transition-opacity duration-500 first:border-t-0 first:pt-0 md:grid-cols-[5.5rem_1fr] lg:min-h-[44vh]",
                  i === active ? "opacity-100" : "lg:opacity-40",
                )}
              >
                <span className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-[#E8202E] md:text-6xl">{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-plum md:text-[1.8rem]">{s.title}</h3>
                  <dl className="mt-5 space-y-3 text-[17px] leading-relaxed">
                    <div className="grid grid-cols-[5.5rem_1fr] gap-3">
                      <dt className="text-plum/50">Vous</dt>
                      <dd className="text-plum">{s.you}</dd>
                    </div>
                    <div className="grid grid-cols-[5.5rem_1fr] gap-3">
                      <dt className="font-semibold text-[#E8202E]">OCIBRENI</dt>
                      <dd className="text-plum">{s.us}</dd>
                    </div>
                  </dl>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* Desktop : fiche collante qui se remplit */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <FormulaSheet step={active} />
            </div>
          </div>
          {/* Mobile : fiche complète après les étapes */}
          <div className="lg:hidden">
            <FormulaSheet step={steps.length - 1} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Fiche de démonstration — formule fictive.
const samples = ["A", "B", "C"];
const blend = [
  { label: "Brésil Sul de Minas", value: 60 },
  { label: "Colombie Huila", value: 30 },
  { label: "Ouganda Robusta", value: 10 },
];

function FormulaSheet({ step }: { step: number }) {
  const reveal = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.35, ease },
  };

  return (
    <div className="relative rotate-[-1deg] bg-[#FBF8F4] p-7 text-plum shadow-[0_30px_60px_rgba(42,14,34,0.18)] md:p-9">
      <div className="flex items-baseline justify-between border-b-2 border-plum pb-4">
        <span className="font-display text-xl font-bold">Fiche formule</span>
        <span className="text-xs text-plum/50">N°{nbsp}0427</span>
      </div>

      {/* 1 — Projet */}
      <Row label="Marque">
        <span className="font-semibold">Votre marque</span>
      </Row>
      <Row label="Projet">
        <AnimatePresence>
          {step >= 0 && (
            <motion.span key="projet" {...reveal}>
              Clientèle, volumes et format notés
            </motion.span>
          )}
        </AnimatePresence>
      </Row>

      {/* 2 et 3 — Dégustation et choix */}
      <Row label="Dégustation">
        <span className="flex gap-2">
          {samples.map((s) => {
            const tasted = step >= 1;
            const chosen = step >= 2 && s === "B";
            return (
              <motion.span
                key={s}
                animate={{
                  backgroundColor: chosen ? "#E8202E" : "rgba(90,29,72,0)",
                  color: chosen ? "#FFFFFF" : tasted ? "#5A1D48" : "rgba(90,29,72,0.3)",
                  borderColor: chosen ? "#E8202E" : tasted ? "rgba(90,29,72,0.4)" : "rgba(90,29,72,0.15)",
                }}
                transition={{ duration: 0.3 }}
                className="grid size-9 place-items-center rounded-full border text-sm font-semibold"
              >
                {s}
              </motion.span>
            );
          })}
        </span>
      </Row>

      <div className="mt-5 space-y-3">
        {blend.map((b, i) => (
          <div key={b.label}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className={cn(step >= 2 ? "text-plum" : "text-plum/30")}>{b.label}</span>
              <span className={cn("font-semibold", step >= 2 ? "text-plum" : "text-plum/30")}>
                {step >= 2 ? `${b.value}${nbsp}%` : "—"}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-plum/10">
              <motion.div
                className="h-full origin-left rounded-full bg-[linear-gradient(90deg,#F4522B,#E8202E)]"
                style={{ width: `${b.value}%` }}
                animate={{ scaleX: step >= 2 ? 1 : 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
              />
            </div>
          </div>
        ))}
      </div>

      <Row label="Torréfaction">
        <span className={cn(step >= 2 ? "" : "text-plum/30")}>{step >= 2 ? "Moyenne" : "—"}</span>
      </Row>

      {/* 5 — Production */}
      <Row label="Emballage">
        <AnimatePresence>
          {step >= 4 && (
            <motion.span key="emb" {...reveal} className="inline-flex items-center gap-2">
              <Check className="size-4 text-[#E8202E]" /> Fourni par vous
            </motion.span>
          )}
        </AnimatePresence>
      </Row>
      <Row label="Production">
        <AnimatePresence>
          {step >= 4 && (
            <motion.span key="prod" {...reveal}>
              Selon cette fiche, à chaque lot
            </motion.span>
          )}
        </AnimatePresence>
      </Row>

      {/* 4 — Tampon */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            key="stamp"
            initial={{ opacity: 0, scale: 1.6, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="pointer-events-none absolute right-6 top-24 rounded-md border-[3px] border-[#E8202E] px-4 py-1.5 font-display text-lg font-bold text-[#E8202E] opacity-90 md:right-8"
          >
            Enregistrée
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-h-[3.25rem] items-center gap-4 border-b border-dotted border-plum/25 py-3 text-[15px]">
      <span className="w-28 shrink-0 text-sm text-plum/55">{label}</span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4 — Ce que chacun apporte                                           */
/* ------------------------------------------------------------------ */
const youBring = ["Votre emballage", "Votre nom et votre identité", "Votre choix de formule"];
const weBring = [
  "Import du café vert",
  "Tests de mélange et dégustation",
  "Enregistrement de votre formule",
  "Torréfaction dans notre usine",
  "Conditionnement dans votre emballage",
  "Livraison",
];

function Split() {
  return (
    <section className="noise relative overflow-hidden bg-dusk py-24 md:py-32">
      <div className="container-site">
        <h2 className={cn(h2, "max-w-3xl text-on-dark")}>Vous apportez trois choses. Nous faisons le reste.</h2>
        <div className="mt-16 grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <p className="text-sm text-on-dark-muted">Vous</p>
            <ul className="mt-4">
              {youBring.map((t) => (
                <li key={t} className="border-b border-on-dark/15 py-4 font-display text-2xl font-semibold text-on-dark md:text-3xl">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#F4522B]">OCIBRENI</p>
            <ul className="mt-4 grid sm:grid-cols-2 sm:gap-x-8">
              {weBring.map((t) => (
                <li key={t} className="flex items-center gap-3 border-b border-on-dark/15 py-4 text-lg text-on-dark/85">
                  <Check className="size-4 shrink-0 text-[#F4522B]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 — Questions                                                       */
/* ------------------------------------------------------------------ */
function Questions() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div>
          <h2 className={cn(h2, "text-plum")}>La marque blanche en questions</h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted-foreground">
            Minimum de commande, emballage, délais{nbsp}: ce qu’on nous demande le plus souvent.
          </p>
        </div>
        <FAQ items={marqueBlancheFaq} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6 — Clôture                                                         */
/* ------------------------------------------------------------------ */
function Closing() {
  return (
    <section className="relative overflow-hidden bg-[#F1EFF0] py-24 md:py-28">
      <Swirl className="pointer-events-none absolute -right-[15%] top-0 h-full w-[70%] opacity-20" strokeWidth={3} />
      <div className="container-site relative max-w-4xl text-center">
        <h2 className="font-display text-[clamp(2.4rem,1.4rem+4vw,4.8rem)] font-semibold leading-[1] tracking-[-0.045em] text-plum">
          Parlons de votre marque.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-plum/70">
          Une dégustation, un devis ou un premier échange{nbsp}: dites-nous où vous en êtes.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <BrandButton to="/contact" search={{ type: "degustation" }} size="lg">
            Demander une dégustation
          </BrandButton>
          <Link
            to="/contact"
            search={{ type: "marque-blanche" }}
            className="font-medium text-plum underline decoration-plum/30 underline-offset-[6px] hover:decoration-[#E8202E]"
          >
            Demander un devis marque blanche
          </Link>
        </div>
      </div>
    </section>
  );
}