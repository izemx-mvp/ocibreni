import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useId, useRef, useState } from "react";
import { BrandButton } from "@/components/site/BrandButton";
import { FAQ } from "@/components/site/FAQ";
import { SmartImage } from "@/components/site/SmartImage";
import { Swirl } from "@/components/site/Swirl";
import { homeFaq } from "@/data/faq";
import { cn } from "@/lib/utils";

const title = "OCIBRENI — Lancez votre marque de café, nous nous occupons du reste";
const description =
  "Torréfacteur en marque blanche à Casablanca. Import, torréfaction et conditionnement dans notre usine de Tit Mellil : vous n’investissez que dans votre emballage.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

const ease = [0.22, 1, 0.36, 1] as const;
const nbsp = "\u00A0";
const MAX_NAME = 22;
const DEFAULT_NAME = "Votre marque";

type LabelColor = "flamme" | "prune" | "papier";
type Grind = "Grains" | "Moulu";

/* Page — le nom saisi dans le hero suit le visiteur jusqu'au dernier appel à l'action */
function Index() {
  const [name, setName] = useState("");
  const [label, setLabel] = useState<LabelColor>("flamme");
  const [grind, setGrind] = useState<Grind>("Grains");
  const brand = name.trim() || DEFAULT_NAME;

  return (
    <>
      <Hero name={name} setName={setName} label={label} setLabel={setLabel} grind={grind} setGrind={setGrind} brand={brand} />
      <Receipt brand={brand} />
      <Activities />
      <Chain />
      <Process />
      <Questions />
      <Closing brand={brand} label={label} grind={grind} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 1 — Hero : le visiteur écrit le nom de sa marque sur le sachet      */
/* ------------------------------------------------------------------ */
function Hero(props: {
  name: string;
  setName: (v: string) => void;
  label: LabelColor;
  setLabel: (v: LabelColor) => void;
  grind: Grind;
  setGrind: (v: Grind) => void;
  brand: string;
}) {
  const { name, setName, label, setLabel, grind, setGrind, brand } = props;
  const reduce = useReducedMotion();
  const inputId = useId();

  return (
    <section className="relative overflow-hidden bg-[#F1EFF0] pt-28 pb-20 md:pt-36 md:pb-28">
      <Swirl className="pointer-events-none absolute -right-[20%] -top-[10%] h-[130%] w-[90%] opacity-[0.18]" strokeWidth={3} delay={0.2} />

      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-[clamp(2.9rem,1.6rem+5.6vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-plum"
          >
            Votre nom sur le sachet.
            <span className="mt-2 block text-plum/35">Notre café dedans.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-[34rem] text-lg leading-relaxed text-plum/75 md:text-xl"
          >
            Nous importons le café vert, le torréfions selon votre formule et le conditionnons dans votre emballage, dans notre usine de Tit Mellil. Vous lancez votre marque sans local ni torréfacteur.
          </motion.p>

          {/* Le champ qui pilote le sachet */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-10 max-w-[30rem]"
          >
            <label htmlFor={inputId} className="text-sm font-medium text-plum/70">
              Essayez avec le nom de votre marque
            </label>
            <input
              id={inputId}
              value={name}
              maxLength={MAX_NAME}
              onChange={(e) => setName(e.target.value)}
              placeholder="Café Atlas, Maison Noura…"
              autoComplete="off"
              className="mt-2 w-full border-0 border-b-2 border-plum/25 bg-transparent pb-3 pt-1 font-display text-2xl font-semibold text-plum outline-none transition-colors placeholder:text-plum/25 focus:border-[#E8202E] md:text-3xl"
            />
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <BrandButton to="/contact" search={{ type: "degustation" }} size="lg">
              Demander une dégustation
            </BrandButton>
            <Link to="/marque-blanche" className="font-medium text-plum underline decoration-plum/30 underline-offset-[6px] transition-colors hover:decoration-[#E8202E]">
              Comment fonctionne la marque blanche
            </Link>
          </motion.div>
        </div>

        {/* Sachet + réglages */}
        <div className="relative mx-auto w-full max-w-[440px]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
          >
            <CoffeeBag brand={brand} label={label} grind={grind} />
          </motion.div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <fieldset className="flex items-center gap-3">
              <legend className="sr-only">Couleur de l’étiquette</legend>
              <span className="text-sm text-plum/60">Étiquette</span>
              {labelOptions.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  aria-label={o.name}
                  aria-pressed={label === o.id}
                  onClick={() => setLabel(o.id)}
                  className={cn(
                    "size-8 rounded-full ring-offset-2 ring-offset-[#F1EFF0] transition-shadow",
                    label === o.id ? "ring-2 ring-plum" : "ring-1 ring-plum/15 hover:ring-plum/40",
                  )}
                  style={{ background: o.swatch }}
                />
              ))}
            </fieldset>
            <fieldset className="flex items-center gap-1 rounded-full bg-white/70 p-1">
              <legend className="sr-only">Format</legend>
              {(["Grains", "Moulu"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-pressed={grind === g}
                  onClick={() => setGrind(g)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    grind === g ? "bg-plum text-white" : "text-plum/70 hover:text-plum",
                  )}
                >
                  {g}
                </button>
              ))}
            </fieldset>
          </div>
        </div>
      </div>
    </section>
  );
}

const labelOptions: { id: LabelColor; name: string; swatch: string }[] = [
  { id: "flamme", name: "Étiquette rouge flamme", swatch: "linear-gradient(135deg,#F4522B,#E8202E)" },
  { id: "prune", name: "Étiquette prune", swatch: "#5A1D48" },
  { id: "papier", name: "Étiquette papier", swatch: "#FBF8F4" },
];

/* Sachet kraft dessiné en SVG — l'étiquette affiche le nom saisi */
function CoffeeBag({ brand, label, grind, className }: { brand: string; label: LabelColor; grind: Grind; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const len = brand.length;
  const fontSize = len <= 8 ? 44 : len <= 12 ? 34 : len <= 16 ? 27 : 21;
  const labelFill = label === "flamme" ? `url(#flame-${uid})` : label === "prune" ? "#5A1D48" : "#FBF8F4";
  const ink = label === "papier" ? "#5A1D48" : "#FFFFFF";
  const inkSoft = label === "papier" ? "rgba(90,29,72,0.6)" : "rgba(255,255,255,0.75)";

  return (
    <svg viewBox="0 0 400 540" className={cn("w-full drop-shadow-[0_40px_50px_rgba(42,14,34,0.25)]", className)} role="img" aria-label={`Sachet de café à la marque ${brand}`}>
      <defs>
        <linearGradient id={`kraft-${uid}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#D8B48C" />
          <stop offset="55%" stopColor="#C49A6C" />
          <stop offset="100%" stopColor="#A97F55" />
        </linearGradient>
        <linearGradient id={`sheen-${uid}`} x1="0" x2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`flame-${uid}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#F4522B" />
          <stop offset="100%" stopColor="#E8202E" />
        </linearGradient>
        <filter id={`grain-${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0 0.1  0 0 0 0.18 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <clipPath id={`body-${uid}`}>
          <path d="M66 58 H334 L352 500 Q353 520 333 520 H67 Q47 520 48 500 Z" />
        </clipPath>
      </defs>

      {/* Corps du sachet */}
      <path d="M66 58 H334 L352 500 Q353 520 333 520 H67 Q47 520 48 500 Z" fill={`url(#kraft-${uid})`} />
      <g clipPath={`url(#body-${uid})`}>
        <rect x="0" y="0" width="400" height="540" filter={`url(#grain-${uid})`} />
        <rect x="0" y="0" width="400" height="540" fill={`url(#sheen-${uid})`} />
        {/* Soufflet du fond */}
        <path d="M48 470 Q200 452 352 470" fill="none" stroke="#8E6640" strokeOpacity="0.35" strokeWidth="2" />
      </g>

      {/* Soudure du haut */}
      <rect x="62" y="40" width="276" height="38" rx="3" fill="#B88D61" />
      {Array.from({ length: 34 }).map((_, i) => (
        <line key={i} x1={70 + i * 7.8} x2={70 + i * 7.8} y1="46" y2="72" stroke="#8E6640" strokeOpacity="0.45" strokeWidth="1.4" />
      ))}
      {/* Encoches d'ouverture */}
      <line x1="64" x2="76" y1="98" y2="98" stroke="#8E6640" strokeOpacity="0.6" strokeWidth="2" />
      <line x1="324" x2="336" y1="98" y2="98" stroke="#8E6640" strokeOpacity="0.6" strokeWidth="2" />
      {/* Valve de dégazage */}
      <circle cx="200" cy="132" r="13" fill="#B88D61" />
      <circle cx="200" cy="132" r="7" fill="none" stroke="#8E6640" strokeOpacity="0.6" strokeWidth="1.5" />

      {/* Étiquette */}
      <motion.rect
        x="88"
        y="190"
        width="224"
        height="226"
        rx="8"
        animate={{ fill: labelFill.startsWith("url") ? "#E8202E" : labelFill }}
        transition={{ duration: 0.35 }}
      />
      {label === "flamme" && <rect x="88" y="190" width="224" height="226" rx="8" fill={labelFill} />}
      <rect x="98" y="200" width="204" height="206" rx="4" fill="none" stroke={ink} strokeOpacity="0.35" strokeWidth="1" />

      <text x="200" y="244" textAnchor="middle" fill={inkSoft} fontSize="13" letterSpacing="2" fontFamily="Inter, sans-serif">
        Café torréfié
      </text>

      <AnimatePresence mode="wait">
        <motion.text
          key={brand}
          x="200"
          y="312"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={ink}
          fontSize={fontSize}
          fontWeight={700}
          fontFamily="Sora, sans-serif"
          letterSpacing="-0.5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          {brand}
        </motion.text>
      </AnimatePresence>

      <line x1="160" x2="240" y1="352" y2="352" stroke={ink} strokeOpacity="0.5" strokeWidth="1.5" />
      <text x="200" y="378" textAnchor="middle" fill={ink} fontSize="15" fontWeight={600} fontFamily="Inter, sans-serif">
        {grind}
      </text>
      <text x="200" y="398" textAnchor="middle" fill={inkSoft} fontSize="11" fontFamily="Inter, sans-serif">
        Torréfié à Casablanca
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2 — Ticket : ce que vous financez, et ce que vous ne financez pas   */
/* ------------------------------------------------------------------ */
const receiptLines = [
  { item: "Achat et import du café vert", value: "OCIBRENI" },
  { item: "Local de production", value: "OCIBRENI" },
  { item: "Torréfacteur et réglages", value: "OCIBRENI" },
  { item: "Tests de mélange et dégustation", value: "OCIBRENI" },
  { item: "Équipe de production", value: "OCIBRENI" },
  { item: "Conditionnement", value: "OCIBRENI" },
];

function Receipt({ brand }: { brand: string }) {
  const zig = Array.from({ length: 41 }, (_, i) => `${i * 2.5},${i % 2 === 0 ? 0 : 3}`).join(" ");

  return (
    <section className="noise relative overflow-hidden bg-dusk py-24 md:py-32">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,1.4rem+3.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-on-dark">
            Le seul poste de dépense qui vous reste, c’est votre emballage.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-on-dark-muted">
            Une marque de café demande d’habitude un local, un torréfacteur et une équipe. Chez nous, tout cela existe déjà et travaille pour votre marque.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto w-full max-w-md"
        >
          <div className="bg-[#FBF8F4] px-7 pt-8 pb-6 text-plum shadow-[0_30px_60px_rgba(0,0,0,0.35)] md:px-9">
            <div className="flex items-baseline justify-between border-b-2 border-plum pb-4">
              <span className="font-display text-lg font-bold">OCIBRENI</span>
              <span className="text-xs text-plum/60">Tit Mellil</span>
            </div>
            <p className="mt-4 text-sm text-plum/70">
              Lancement de la marque <span className="font-semibold text-plum">{brand}</span>
            </p>

            <ul className="mt-6 space-y-3 text-[15px]">
              {receiptLines.map((l) => (
                <li key={l.item} className="flex items-baseline gap-2">
                  <span>{l.item}</span>
                  <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-plum/30" />
                  <span className="text-sm font-semibold text-[#E8202E]">{l.value}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t-2 border-dashed border-plum/30 pt-5">
              <div className="flex items-baseline gap-2 text-lg font-semibold">
                <span>Votre emballage</span>
                <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-plum/30" />
                <span>Vous</span>
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-plum/50">Merci de votre confiance{nbsp}!</p>
          </div>
          <svg aria-hidden viewBox="0 0 100 3" preserveAspectRatio="none" className="block h-3 w-full">
            <polygon points={`0,0 ${zig} 100,0`} fill="#FBF8F4" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3 — Trois activités, en lignes typographiques                       */
/* ------------------------------------------------------------------ */
const activities = [
  {
    to: "/marque-blanche" as const,
    name: "Marque blanche",
    who: "Entrepreneurs, cafés, hôtels, distributeurs, entreprises",
    text: "Votre formule, torréfiée et conditionnée dans votre emballage.",
    image: "/images/offer-marque-blanche.png",
    main: true,
  },
  {
    to: "/cafe-torrefie-vrac" as const,
    name: "Café torréfié en vrac",
    who: "Unités régionales d’assemblage et de conditionnement",
    text: "Torréfié chez nous, livré en vrac, assemblé chez vous.",
    image: "/images/offer-vrac.png",
    main: false,
  },
  {
    to: "/cafe-vert" as const,
    name: "Café vert",
    who: "Torréfacteurs",
    text: "Le café vert que nous importons, pour votre propre torréfaction.",
    image: "/images/offer-cafe-vert.png",
    main: false,
  },
];

function Activities() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 className="font-display text-[clamp(2.2rem,1.4rem+3.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-plum">
            Trois façons de travailler avec nous
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:justify-self-end">
            La marque blanche est notre métier principal. Nous vendons aussi notre café torréfié en vrac et notre café vert.
          </p>
        </div>

        <ul className="mt-16 border-t border-plum/15">
          {activities.map((a) => (
            <li key={a.name} className="border-b border-plum/15">
              <Link to={a.to} className="group grid items-center gap-6 py-8 md:grid-cols-[1.4fr_1fr_auto] md:gap-10 md:py-10">
                <div className="flex items-center gap-5">
                  <div className="w-20 shrink-0 overflow-hidden rounded-xl md:w-0 md:opacity-0 md:transition-all md:duration-500 md:group-hover:w-32 md:group-hover:opacity-100">
                    <SmartImage src={a.image} alt="" subject={a.name} className="aspect-[4/3] w-20 md:w-32" />
                  </div>
                  <div>
                    <span className="block font-display text-[clamp(1.9rem,1.2rem+2.8vw,3.6rem)] font-semibold leading-none tracking-[-0.035em] text-plum transition-colors duration-300 group-hover:text-[#E8202E]">
                      {a.name}
                    </span>
                    {a.main && <span className="mt-3 inline-block rounded-full bg-plum px-3 py-1 text-xs font-medium text-white">Notre métier principal</span>}
                  </div>
                </div>
                <div>
                  <p className="text-plum">{a.text}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Pour{nbsp}: {a.who}</p>
                </div>
                <span className="hidden size-14 place-items-center rounded-full border border-plum/20 text-plum transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-[#E8202E] group-hover:text-white md:grid">
                  <ArrowUpRight className="size-6" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 — La chaîne, de la fève verte au sachet                          */
/* ------------------------------------------------------------------ */
const chain = [
  { title: "Import du café vert", text: "Nous achetons et importons nous-mêmes le café vert.", image: "/images/usine-import.png" },
  { title: "Torréfaction", text: "À Tit Mellil, selon la formule de chaque client.", image: "/images/usine-torrefaction.png" },
  { title: "Conditionnement", text: "Dans notre unité, directement dans votre emballage.", image: "/images/usine-conditionnement.png" },
  { title: "Livraison", text: "Votre café arrive prêt à être vendu.", image: "/images/offer-vrac.png" },
];

function Chain() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });

  return (
    <section className="bg-[#EDE4DA] py-24 md:py-32">
      <div className="container-site">
        <h2 className="max-w-3xl font-display text-[clamp(2.2rem,1.4rem+3.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-plum">
          De la fève verte au sachet fermé, tout se passe chez nous.
        </h2>

        <div ref={ref} className="relative mt-16">
          <Swirl variant="line" progress={scrollYProgress} strokeWidth={3} className="absolute left-0 top-[34%] hidden h-16 w-full lg:block" />
          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {chain.map((s, i) => (
              <li key={s.title} className={cn(i % 2 === 1 && "lg:mt-16")}>
                <SmartImage src={s.image} alt={s.title} subject={s.title} className="aspect-[4/5] rounded-2xl" />
                <div className="mt-5 flex gap-4">
                  <span className="font-display text-sm font-semibold text-[#E8202E]">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-plum">{s.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-plum/70">{s.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Link to="/notre-usine" className="mt-14 inline-block font-medium text-plum underline decoration-plum/30 underline-offset-[6px] hover:decoration-[#E8202E]">
          Visiter l’usine en images
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 — Le processus marque blanche (vraie séquence : numérotée)       */
/* ------------------------------------------------------------------ */
const steps = [
  { title: "On parle de votre projet", text: "Votre clientèle, vos volumes estimés, grains ou moulu." },
  { title: "Vous dégustez nos propositions", text: "Nous préparons plusieurs mélanges et torréfactions à goûter avec vous." },
  { title: "Vous choisissez votre formule", text: "Le profil retenu devient celui de votre marque." },
  { title: "Nous l’enregistrons", text: "Origines, proportions et torréfaction sont notés pour être reproduits à l’identique." },
  { title: "Nous produisons dans votre emballage", text: "Vous fournissez l’emballage, nous le remplissons, lot après lot." },
];

function Process() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-[clamp(2.2rem,1.4rem+3.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-plum">
            Votre café, en cinq étapes
          </h2>
          <SmartImage
            src="/images/tasting-cupping.png"
            alt="Dégustation des mélanges"
            subject="dégustation, cupping"
            className="mt-10 aspect-[7/5] rounded-2xl"
          />
        </div>

        <ol>
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-plum/15 py-8 first:border-t-0 first:pt-0 md:grid-cols-[6rem_1fr] md:py-10">
              <span className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-[#E8202E] md:text-6xl">{i + 1}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-plum md:text-[1.7rem]">{s.title}</h3>
                <p className="mt-2 max-w-md text-lg leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6 — Questions                                                       */
/* ------------------------------------------------------------------ */
function Questions() {
  return (
    <section className="border-t border-plum/10 bg-background py-24 md:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,1.4rem+3.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-plum">
            Avant de vous lancer
          </h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted-foreground">
            Les questions qu’on nous pose le plus. Pour le reste, écrivez-nous.
          </p>
        </div>
        <FAQ items={homeFaq} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7 — Clôture : on retrouve le sachet du visiteur                    */
/* ------------------------------------------------------------------ */
function Closing({ brand, label, grind }: { brand: string; label: LabelColor; grind: Grind }) {
  const isDefault = brand === DEFAULT_NAME;

  return (
    <section className="noise relative overflow-hidden bg-dusk py-24 md:py-28">
      <Swirl className="pointer-events-none absolute -left-[15%] top-0 h-full w-[70%] opacity-20" strokeWidth={3} />
      <div className="container-site relative grid items-center gap-12 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <h2 className="font-display text-[clamp(2.4rem,1.4rem+4vw,4.8rem)] font-semibold leading-[1] tracking-[-0.045em] text-on-dark">
            {isDefault ? "Votre marque commence par une dégustation." : `${brand} commence par une dégustation.`}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-on-dark-muted">
            Dites-nous où vous en êtes. Nous préparons des propositions de mélange et nous les goûtons avec vous.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <BrandButton to="/contact" search={{ type: "degustation" }} size="lg">
              Demander une dégustation
            </BrandButton>
            <Link to="/contact" search={{ type: "marque-blanche" }} className="font-medium text-on-dark underline decoration-on-dark/30 underline-offset-[6px] hover:decoration-[#F4522B]">
              Ou demander un devis
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[260px] rotate-3">
          <CoffeeBag brand={brand} label={label} grind={grind} />
        </div>
      </div>
    </section>
  );
}