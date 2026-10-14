import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — OCIBRENI" }, { name: "description", content: "Demandez une dégustation ou un devis." },
    { property: "og:title", content: "Contact — OCIBRENI" }, { property: "og:description", content: "Demandez une dégustation ou un devis." },
  ] }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="OCIBRENI" title="Contact" text="Demandez une dégustation ou un devis." />
      <section className="container-site pb-24"><LeadForm /></section>
    </>
  );
}
