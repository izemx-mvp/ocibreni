import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";


export const Route = createFileRoute("/cafe-torrefie-vrac")({
  head: () => ({ meta: [
    { title: "Café torréfié en vrac — OCIBRENI" }, { name: "description", content: "Café torréfié en vrac pour les unités régionales." },
    { property: "og:title", content: "Café torréfié en vrac — OCIBRENI" }, { property: "og:description", content: "Café torréfié en vrac pour les unités régionales." },
  ] }),
  component: CafeTorrefieVrac,
});

function CafeTorrefieVrac() {
  return (
    <>
      <PageHero eyebrow="OCIBRENI" title="Café torréfié en vrac" text="Café torréfié en vrac pour les unités régionales." />
      <CTABand />
    </>
  );
}
