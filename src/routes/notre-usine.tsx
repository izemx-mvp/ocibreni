import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";


export const Route = createFileRoute("/notre-usine")({
  head: () => ({ meta: [
    { title: "Notre usine — OCIBRENI" }, { name: "description", content: "Import, torréfaction et conditionnement à Tit Mellil." },
    { property: "og:title", content: "Notre usine — OCIBRENI" }, { property: "og:description", content: "Import, torréfaction et conditionnement à Tit Mellil." },
  ] }),
  component: NotreUsine,
});

function NotreUsine() {
  return (
    <>
      <PageHero eyebrow="OCIBRENI" title="Notre usine" text="Import, torréfaction et conditionnement à Tit Mellil." />
      <CTABand />
    </>
  );
}
