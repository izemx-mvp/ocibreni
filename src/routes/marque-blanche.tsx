import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";


export const Route = createFileRoute("/marque-blanche")({
  head: () => ({ meta: [
    { title: "Marque blanche — OCIBRENI" }, { name: "description", content: "Lancez votre marque de café sans usine ni torréfactrice." },
    { property: "og:title", content: "Marque blanche — OCIBRENI" }, { property: "og:description", content: "Lancez votre marque de café sans usine ni torréfactrice." },
  ] }),
  component: MarqueBlanche,
});

function MarqueBlanche() {
  return (
    <>
      <PageHero eyebrow="OCIBRENI" title="Marque blanche" text="Lancez votre marque de café sans usine ni torréfactrice." />
      <CTABand />
    </>
  );
}
