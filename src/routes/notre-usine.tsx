import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Navigation } from "lucide-react";
import { useState } from "react";
import { BrandButton } from "@/components/site/BrandButton";
import { DIRECTIONS_URL, MapEmbed } from "@/components/site/MapEmbed";
import { SmartImage } from "@/components/site/SmartImage";
import { Swirl } from "@/components/site/Swirl";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const title = "Notre usine à Tit Mellil — OCIBRENI";
const description =
  "Import du café vert, torréfaction et conditionnement : découvrez l’usine OCIBRENI à Tit Mellil, Casablanca, de la fève verte au sachet fermé.";

export const Route = createFileRoute("/notre-usine")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: NotreUsine,
});

const ease = [0.22, 1, 0.36, 1] as const;
const nbsp = " ";
const h2 = "font-display text-[clamp(2.2rem,1.4rem+3.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]";

function NotreUsine() {
  return (
    <>
      <Hero />
      <FloorPlanTour />
      <Commitments />
      <Visit />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 1 — Hero : grand titre puis une bande photo pleine largeur          */
/* ------------------------------------------------------------------ */
function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="noise relative overflow-hidden bg-dusk pt-28 md:pt-36">
      <Swirl className="pointer-events-none absolute -right-[15%] -top-[20%] h-[110%] w-[70%] opacity-[0.16]" strokeWidth={3} />
      <div className="container-site relative grid gap-10 pb-16 md:grid-cols-[1.3fr_0.7fr] md:items-end md:pb-20">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="font-display text-[clamp(2.9rem,1.6rem+5.6vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-on-dark"
        >
          De la fève verte
          <span className="block text-on-dark/40">au sachet fermé.</span>
        </motion.h1>
        <div>
          <p className="text-lg leading-relaxed text-on-dark-muted">
            Import, torréfaction et conditionnement réunis sur un seul site, à Tit Mellil, aux portes de Casablanca.
          </p>
          <div className="mt-8">
            <BrandButton to="/contact" search={{ type: "degustation" }} size="lg">
              Demander une dégustation
            </BrandButton>
          </div>
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease }}
        className="relative"
      >
        <SmartImage
          src="/images/usine-torrefaction.png"
          alt="Torréfacteur de l’usine OCIBRENI à Tit Mellil"
          subject="usine, torréfaction"
          priority
          className="aspect-[16/9] w-full md:aspect-[21/8]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#2A0E22] to-transparent" />
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 — La visite sur plan : le parcours du grain dans le bâtiment      */
/* ------------------------------------------------------------------ */
const zones = [
  {
    name: "Entrepôt café vert",
    title: "Les sacs arrivent ici.",
    text: "Le café vert que nous importons est stocké dans notre entrepôt, à l’abri de l’humidité et de la chaleur. C’est la matière première de nos trois activités : marque blanche, vrac et café vert.",
    facts: ["Achat et import par nos soins", "Stockage au sec, par lot"],
    image: "/images/usine-import.png",
  },
  {
    name: "Torréfaction",
    title: "Chaque formule a son profil.",
    text: "Les grains passent dans nos torréfacteurs selon la formule enregistrée pour chaque client : origines, proportions et courbe de torréfaction. C’est ce qui garantit le même goût d’une production à l’autre.",
    facts: ["Torréfaction à la commande", "Profil enregistré par client"],
    image: "/images/usine-torrefaction.png",
  },
  {
    name: "Conditionnement",
    title: "Dans votre emballage, directement.",
    text: "Une fois refroidi, le café est moulu ou laissé en grains, puis conditionné dans notre unité. Pour la marque blanche, il part directement dans l’emballage que vous nous avez fourni.",
    facts: ["Grains ou moulu", "Sachets fermés et identifiés par lot"],
    image: "/images/usine-conditionnement.png",
  },
  {
    name: "Quai d’expédition",
    title: "Prêt à vendre, prêt à partir.",
    text: "Les commandes sont préparées sur notre quai et partent vers Casablanca et le reste du Maroc. Pour le vrac et le café vert, les sacs sont livrés fermés, prêts à entrer en production chez vous.",
    facts: ["Livraison dans tout le Maroc", "Départ depuis Tit Mellil"],
    image: "/images/offer-vrac.png",
  },
];

function FloorPlanTour() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#F1EFF0] py-24 md:py-32">
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className={cn(h2, "text-plum")}>Suivez le grain dans l’usine</h2>
          <p className="max-w-md text-lg leading-relaxed text-plum/70 md:justify-self-end">
            Quatre zones, un seul bâtiment. Faites défiler pour suivre le parcours du café, de l’entrepôt jusqu’au quai.
          </p>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Plan collant (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <FloorPlan active={active} onSelect={setActive} />
            </div>
          </div>
          {/* Plan complet (mobile) */}
          <div className="lg:hidden">
            <FloorPlan active={zones.length - 1} onSelect={() => {}} />
          </div>

          {/* Zones */}
          <ol>
            {zones.map((z, i) => (
              <motion.li
                key={z.name}
                id={`zone-${i + 1}`}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className={cn(
                  "scroll-mt-28 border-t border-plum/15 py-12 transition-opacity duration-500 first:border-t-0 first:pt-0 lg:min-h-[70vh]",
                  i === active ? "opacity-100" : "lg:opacity-35",
                )}
              >
                <p className="flex items-baseline gap-3 font-display text-plum">
                  <span className="text-4xl font-semibold text-[#E8202E]">{i + 1}</span>
                  <span className="text-lg font-semibold">{z.name}</span>
                </p>
                <h3 className="mt-5 font-display text-[clamp(1.7rem,1.3rem+1.4vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-plum">
                  {z.title}
                </h3>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-plum/70">{z.text}</p>
                <SmartImage src={z.image} alt={z.name} subject={z.name} className="mt-8 aspect-[16/10] rounded-2xl" />
                <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
                  {z.facts.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-plum">
                      <span className="size-1.5 rounded-full bg-[#E8202E]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* Plan d'usine en SVG — le trajet rouge avance avec la zone active */
const zoneRects = [
  { x: 40, y: 40, w: 220, h: 170, cx: 150, cy: 125 },
  { x: 280, y: 40, w: 280, h: 170, cx: 420, cy: 125 },
  { x: 280, y: 230, w: 280, h: 150, cx: 420, cy: 305 },
  { x: 40, y: 230, w: 220, h: 150, cx: 150, cy: 305 },
];
// Longueurs cumulées du trajet M150 125 H420 V305 H150 H30 (total 840)
const routeProgress = [0.03, 270 / 840, 450 / 840, 1];

function FloorPlan({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const dot = zoneRects[active];

  return (
    <div className="relative bg-[#FBF8F4] p-4 shadow-[0_30px_60px_rgba(42,14,34,0.14)] sm:p-6">
      <div className="mb-3 flex items-baseline justify-between text-plum">
        <span className="font-display text-lg font-bold">Usine OCIBRENI</span>
        <span className="text-xs text-plum/55">Tit Mellil, plan de principe</span>
      </div>

      <svg viewBox="0 0 600 420" className="w-full" role="img" aria-label="Plan de l’usine et parcours du café">
        <defs>
          <pattern id="plan-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0 H0 V20" fill="none" stroke="#5A1D48" strokeOpacity="0.07" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="600" height="420" fill="url(#plan-grid)" />

        {/* Murs extérieurs, avec la porte du quai à gauche */}
        <path d="M20 20 H580 V400 H20 V340 M20 270 V20" fill="none" stroke="#5A1D48" strokeWidth="4" />

        {/* Zones cliquables */}
        {zoneRects.map((r, i) => {
          const isActive = i === active;
          return (
            <g key={i} onClick={() => onSelect(i)} className="cursor-pointer">
              <motion.rect
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                animate={{
                  fill: isActive ? "rgba(232,32,46,0.08)" : "rgba(90,29,72,0)",
                  stroke: isActive ? "#E8202E" : "rgba(90,29,72,0.45)",
                }}
                strokeWidth={isActive ? 2.5 : 1.5}
                strokeDasharray={isActive ? "0" : "6 4"}
                transition={{ duration: 0.35 }}
              />
              <text x={r.x + 14} y={r.y + 26} fill={isActive ? "#E8202E" : "#5A1D48"} fontSize="15" fontWeight={700} fontFamily="Sora, sans-serif">
                {i + 1}
              </text>
              <text x={r.x + 34} y={r.y + 26} fill="#5A1D48" fillOpacity={isActive ? 1 : 0.6} fontSize="13" fontFamily="Inter, sans-serif">
                {zones[i].name}
              </text>
            </g>
          );
        })}

        {/* Détails d'équipement */}
        {/* 1 — palettes de sacs */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect key={`p${row}${col}`} x={62 + col * 46} y={58 + 38 + row * 34} width="36" height="24" rx="4" fill="#C9AB80" fillOpacity="0.55" stroke="#5A1D48" strokeOpacity="0.25" />
          )),
        )}
        {/* 2 — deux torréfacteurs */}
        {[360, 480].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="140" r="34" fill="none" stroke="#5A1D48" strokeOpacity="0.4" strokeWidth="2" />
            <circle cx={cx} cy="140" r="14" fill="#5A1D48" fillOpacity="0.12" />
            <rect x={cx - 6} y="82" width="12" height="24" fill="#5A1D48" fillOpacity="0.2" />
          </g>
        ))}
        {/* 3 — ligne de conditionnement */}
        <line x1="300" x2="540" y1="320" y2="320" stroke="#5A1D48" strokeOpacity="0.35" strokeWidth="10" strokeLinecap="round" />
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} cx={312 + i * 24} cy="320" r="3" fill="#FBF8F4" />
        ))}
        {[330, 390, 450, 510].map((x) => (
          <rect key={x} x={x - 8} y="290" width="16" height="20" rx="2" fill="#C9AB80" fillOpacity="0.7" />
        ))}
        {/* 4 — camion à quai */}
        <rect x="70" y="300" width="110" height="46" rx="4" fill="none" stroke="#5A1D48" strokeOpacity="0.4" strokeWidth="2" />
        <rect x="180" y="314" width="34" height="32" rx="4" fill="none" stroke="#5A1D48" strokeOpacity="0.4" strokeWidth="2" />

        {/* Trajet du grain */}
        <path d="M150 125 H420 V305 H150 H30" fill="none" stroke="#5A1D48" strokeOpacity="0.12" strokeWidth="3" strokeDasharray="4 6" />
        <motion.path
          d="M150 125 H420 V305 H150 H30"
          fill="none"
          stroke="#E8202E"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: routeProgress[active] }}
          transition={{ duration: 0.8, ease }}
        />
        <motion.circle
          r="9"
          fill="#E8202E"
          stroke="#FBF8F4"
          strokeWidth="3"
          initial={false}
          animate={{ cx: active === 3 ? 30 : dot.cx, cy: dot.cy }}
          transition={{ duration: 0.8, ease }}
        />
      </svg>

      <p className="mt-3 text-xs text-plum/50">Cliquez sur une zone pour vous y rendre.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3 — Engagements qualité (contenu généré, à valider)                 */
/* ------------------------------------------------------------------ */
// CONTENU GÉNÉRÉ — à valider avec le client avant mise en ligne.
const commitments = [
  {
    title: "Une fiche par formule",
    text: "Chaque formule client est enregistrée : origines, proportions et profil de torréfaction. La production suit la fiche, lot après lot.",
  },
  {
    title: "Une dégustation de contrôle",
    text: "Chaque lot torréfié est goûté et comparé à la formule de référence avant d’être conditionné.",
  },
  {
    title: "Des lots identifiés",
    text: "Chaque production porte un numéro de lot, du sac de café vert jusqu’au sachet fermé.",
  },
  {
    title: "Un stockage maîtrisé",
    text: "Le café vert est stocké au sec et à l’abri de la chaleur, et le café torréfié est conditionné rapidement après refroidissement.",
  },
];

function Commitments() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className={cn(h2, "text-plum")}>Ce qui ne change pas d’un lot à l’autre</h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted-foreground">
            La marque blanche repose sur une promesse simple{nbsp}: votre café a toujours le même goût.
          </p>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {commitments.map((c) => (
            <li key={c.title} className="border-t-2 border-plum py-8">
              <h3 className="font-display text-2xl font-semibold leading-tight text-plum">{c.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 — Venir nous voir                                                 */
/* ------------------------------------------------------------------ */
function Visit() {
  return (
    <section className="noise relative overflow-hidden bg-dusk py-24 md:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col">
          <h2 className={cn(h2, "text-on-dark")}>Venez goûter à l’usine.</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-on-dark-muted">
            Les dégustations et les visites se font sur rendez-vous, à Tit Mellil. Prévenez-nous quelques jours avant pour que nous préparions vos propositions.
          </p>

          <div className="mt-10 border-t border-on-dark/15 pt-6">
            <p className="text-sm text-on-dark-muted">Adresse</p>
            <p className="mt-1 font-display text-xl font-semibold text-on-dark">{site.address}</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <BrandButton to="/contact" search={{ type: "degustation" }} size="lg">
              Prendre rendez-vous
            </BrandButton>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-on-dark underline decoration-on-dark/30 underline-offset-[6px] hover:decoration-[#F4522B]"
            >
              <Navigation className="size-4" /> Itinéraire
            </a>
          </div>

          <Link
            to="/marque-blanche"
            className="mt-auto inline-flex items-center gap-2 pt-12 text-sm font-medium text-on-dark-muted hover:text-on-dark"
          >
            Comment se passe une marque blanche <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <MapEmbed className="h-[360px] lg:h-full lg:min-h-[480px]" />
        </div>
      </div>
    </section>
  );
}