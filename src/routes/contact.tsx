import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Navigation } from "lucide-react";
import { LeadForm } from "@/components/site/LeadForm";
import { DIRECTIONS_URL, MapEmbed } from "@/components/site/MapEmbed";
import { Swirl } from "@/components/site/Swirl";
import { contactTypes, site, whatsappLink, type ContactType } from "@/config/site";
import type { leadTypes } from "@/lib/lead-schema";
import { cn } from "@/lib/utils";

const title = "Contact — Dégustation et devis — OCIBRENI";
const description =
  "Demandez une dégustation ou un devis : marque blanche, café torréfié en vrac ou café vert. OCIBRENI, Tit Mellil, Casablanca.";

const typeToLead: Record<ContactType, (typeof leadTypes)[number]> = {
  degustation: "Dégustation",
  "marque-blanche": "Devis marque blanche",
  vrac: "Café torréfié en vrac",
  vert: "Café vert",
  autre: "Autre",
};

const typeMeta: Record<ContactType, { label: string; hint: string; reply: string }> = {
  degustation: {
    label: "Une dégustation",
    hint: "Goûter des profils pour votre future marque",
    reply: "Nous préparons plusieurs propositions de mélange à goûter avec vous.",
  },
  "marque-blanche": {
    label: "Un devis marque blanche",
    hint: "Lancer votre café sous votre propre nom",
    reply: "Nous revenons vers vous avec une proposition adaptée à vos volumes et à votre format.",
  },
  vrac: {
    label: "Du café torréfié en vrac",
    hint: "Approvisionner votre unité d’assemblage",
    reply: "Nous vous envoyons les cafés disponibles et les conditions de livraison pour votre ville.",
  },
  vert: {
    label: "Du café vert",
    hint: "Approvisionner votre torréfaction",
    reply: "Nous vous répondons avec les origines et les lots disponibles.",
  },
  autre: {
    label: "Autre chose",
    hint: "Une question, un partenariat, une visite",
    reply: "Votre message arrive directement à notre équipe.",
  },
};

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { type?: ContactType } => {
    const t = search["type"];
    return contactTypes.includes(t as ContactType) ? { type: t as ContactType } : {};
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Contact,
});

const ease = [0.22, 1, 0.36, 1] as const;
const nbsp = " ";
const h2 = "font-display text-[clamp(2.2rem,1.4rem+3.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]";

function Contact() {
  const { type } = Route.useSearch();
  const active: ContactType = type ?? "degustation";

  return (
    <>
      <Hero />
      <RequestDesk active={active} />
      <NextSteps />
      <QuickAnswers />
      <FindUs />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 1 — Hero : les trois façons de nous joindre, en grand               */
/* ------------------------------------------------------------------ */
function Hero() {
  const reduce = useReducedMotion();
  const channels = [
    { label: "Téléphone", value: site.phone, href: site.phoneHref, external: false },
    { label: "WhatsApp", value: "Écrire sur WhatsApp", href: whatsappLink(), external: true },
    { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F1EFF0] pt-28 pb-16 md:pt-36 md:pb-20">
      <Swirl className="pointer-events-none absolute -right-[20%] -top-[10%] h-[120%] w-[80%] opacity-[0.15]" strokeWidth={3} />
      <div className="container-site relative">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-4xl font-display text-[clamp(2.9rem,1.6rem+5.6vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-plum"
        >
          Parlons de
          <span className="block text-plum/35">votre café.</span>
        </motion.h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-plum/75 md:text-xl">
          Une dégustation, un devis ou une simple question{nbsp}: écrivez-nous, appelez-nous, ou passez par le formulaire juste en dessous.
        </p>

        <ul className="mt-14 grid border-t border-plum/20 md:grid-cols-3">
          {channels.map((c, i) => (
            <li key={c.label} className={cn("border-b border-plum/20 md:border-b-0", i > 0 && "md:border-l md:pl-8", i < 2 && "md:pr-8")}>
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noreferrer" : undefined}
                className="group flex items-end justify-between gap-4 py-6"
              >
                <span>
                  <span className="block text-sm text-plum/55">{c.label}</span>
                  <span className="mt-1 block break-all font-display text-xl font-semibold text-plum transition-colors group-hover:text-[#E8202E] md:text-2xl">
                    {c.value}
                  </span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-plum/40 transition-all group-hover:rotate-45 group-hover:text-[#E8202E]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 — Le bureau des demandes : on choisit le sujet, le bon se remplit */
/* ------------------------------------------------------------------ */
function RequestDesk({ active }: { active: ContactType }) {
  const meta = typeMeta[active];
  const leadType = typeToLead[active];

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Choix du sujet */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className={cn(h2, "text-plum")}>Votre demande concerne…</h2>
          <nav aria-label="Type de demande" className="mt-10 border-t border-plum/15">
            {contactTypes.map((t) => {
              const m = typeMeta[t];
              const isActive = t === active;
              return (
                <Link
                  key={t}
                  to="/contact"
                  search={{ type: t }}
                  replace
                  resetScroll={false}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative flex items-center gap-5 border-b border-plum/15 py-5"
                >
                  <span className="relative grid size-6 shrink-0 place-items-center rounded-full border-2 border-plum/30 transition-colors group-hover:border-plum">
                    {isActive && <motion.span layoutId="contact-radio" className="size-3 rounded-full bg-[#E8202E]" />}
                  </span>
                  <span>
                    <span
                      className={cn(
                        "block font-display text-xl font-semibold transition-colors md:text-2xl",
                        isActive ? "text-plum" : "text-plum/50 group-hover:text-plum",
                      )}
                    >
                      {m.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-plum/55">{m.hint}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bon de demande */}
        <div>
          <div className="relative bg-[#FBF8F4] shadow-[0_30px_60px_rgba(42,14,34,0.14)]">
            <div aria-hidden className="h-2 bg-[linear-gradient(90deg,#F4522B,#E8202E)]" />
            <div className="border-b-2 border-plum px-6 pb-5 pt-7 md:px-9">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-xl font-bold text-plum">Bon de demande</span>
                <span className="text-xs text-plum/50">OCIBRENI, Tit Mellil</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease }}
                  className="mt-4"
                >
                  <p className="font-display text-2xl font-semibold text-[#E8202E] md:text-3xl">{meta.label}</p>
                  <p className="mt-2 text-plum/70">{meta.reply}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="px-3 pb-4 pt-2 sm:px-5 md:px-6">
              <LeadForm key={leadType} defaultType={leadType} />
            </div>
          </div>
          <p className="mt-5 text-sm text-plum/55">
            Vos coordonnées servent uniquement à vous répondre. Elles ne sont ni revendues ni partagées.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3 — Après l'envoi                                                   */
/* ------------------------------------------------------------------ */
// CONTENU GÉNÉRÉ — délais à valider avec le client.
const steps = [
  { title: "Nous lisons votre demande", text: "Elle arrive directement chez notre équipe commerciale, pas dans une boîte générique." },
  { title: "Nous vous rappelons", text: "En général sous 24 à 48 heures ouvrées, par téléphone ou par email, pour préciser votre besoin." },
  { title: "Dégustation ou devis", text: "Selon votre projet, nous préparons des échantillons à goûter ou une proposition chiffrée." },
];

function NextSteps() {
  return (
    <section className="bg-[#EDE4DA] py-24 md:py-32">
      <div className="container-site">
        <h2 className={cn(h2, "max-w-3xl text-plum")}>Ce qui se passe après l’envoi</h2>
        <ol className="mt-14 grid border-t-2 border-plum md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className={cn("grid grid-cols-[3.5rem_1fr] gap-3 py-8 md:py-10", i > 0 && "border-t border-plum/15 md:border-l md:border-t-0 md:pl-8", i < 2 && "md:pr-8")}>
              <span className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-[#E8202E]">{i + 1}</span>
              <div>
                <h3 className="font-display text-xl font-semibold text-plum">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-plum/70">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 — Avant de nous écrire                                            */
/* ------------------------------------------------------------------ */
// CONTENU GÉNÉRÉ — à valider avec le client.
const answers = [
  {
    q: "Faut-il déjà avoir un emballage pour demander une dégustation ?",
    a: "Non. La dégustation sert d’abord à choisir votre formule. L’emballage vient ensuite, et nous pouvons vous indiquer les formats qui conviennent à notre ligne de conditionnement.",
  },
  {
    q: "Peut-on goûter à l’usine ?",
    a: "Oui, sur rendez-vous à Tit Mellil. Si vous êtes loin de Casablanca, nous pouvons aussi vous envoyer des échantillons.",
  },
  {
    q: "Quelles informations préparer ?",
    a: "Votre type de clientèle, une estimation de vos volumes mensuels et votre préférence grains ou moulu. C’est suffisant pour un premier échange.",
  },
];

function QuickAnswers() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <h2 className={cn(h2, "text-plum")}>Avant de nous écrire</h2>
        <dl>
          {answers.map((x) => (
            <div key={x.q} className="border-t border-plum/15 py-8 first:border-t-0 first:pt-0">
              <dt className="font-display text-xl font-semibold leading-snug text-plum md:text-2xl">{x.q}</dt>
              <dd className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">{x.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 — Nous trouver                                                    */
/* ------------------------------------------------------------------ */
function FindUs() {
  return (
    <section className="noise relative overflow-hidden bg-dusk py-24 md:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <h2 className={cn(h2, "text-on-dark")}>L’usine, à Tit Mellil</h2>
          <dl className="mt-10 border-t border-on-dark/15">
            {[
              ["Adresse", site.address],
              ["Horaires", site.hours],
              ["Téléphone", site.phone],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 border-b border-on-dark/15 py-5 sm:flex-row sm:gap-6">
                <dt className="w-28 shrink-0 text-sm text-on-dark-muted">{k}</dt>
                <dd className="text-lg text-on-dark">{v}</dd>
              </div>
            ))}
          </dl>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-medium text-on-dark underline decoration-on-dark/30 underline-offset-[6px] hover:decoration-[#F4522B]"
          >
            <Navigation className="size-4" /> Itinéraire jusqu’à l’usine
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl">
          <MapEmbed className="h-[340px] lg:h-full lg:min-h-[420px]" />
        </div>
      </div>
    </section>
  );
}