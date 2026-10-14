import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";


export const Route = createFileRoute("/cafe-vert")({
  head: () => ({ meta: [
    { title: "Café vert — OCIBRENI" }, { name: "description", content: "Café vert importé pour les torréfacteurs." },
    { property: "og:title", content: "Café vert — OCIBRENI" }, { property: "og:description", content: "Café vert importé pour les torréfacteurs." },
  ] }),
  component: CafeVert,
});

function CafeVert() {
  return (
    <>
      <PageHero eyebrow="OCIBRENI" title="Café vert" text="Café vert importé pour les torréfacteurs." />
      <CTABand />
    </>
  );
}
