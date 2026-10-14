import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { BrandButton } from "./BrandButton";
import { Reveal } from "./Reveal";
import { Swirl } from "./Swirl";

export function NotFound() {
  useEffect(() => {
    document.title = "Page introuvable — OCIBRENI";
  }, []);
  return (
    <section className="noise relative flex min-h-[100svh] items-center overflow-hidden bg-dusk pt-28 pb-20">
      <Swirl className="absolute inset-x-0 top-1/2 h-[70%] w-full -translate-y-1/2 opacity-80" strokeWidth={2.5} />
      <div className="container-site relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-5 text-flame">Erreur 404</p>
          <h1 className="text-display-sm text-on-dark">Cette page s’est évaporée comme un arôme.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-on-dark-muted">
            Le lien est peut-être ancien, ou l’adresse contient une faute de frappe. Repartons de l’accueil.
          </p>
          <div className="mt-10">
            <BrandButton to="/" size="lg">
              <ArrowLeft className="size-4" /> Retour à l’accueil
            </BrandButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
