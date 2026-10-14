import { MessageCircle } from "lucide-react";
import { whatsappLink, type ContactType } from "@/config/site";
import { BrandButton } from "./BrandButton";
import { Reveal } from "./Reveal";
import { SmartImage } from "./SmartImage";
import { Swirl } from "./Swirl";

export function CTABand({
  eyebrow = "Dégustation",
  title = "Goûtez avant de vous lancer.",
  text = "Parlez-nous de votre projet : nous organisons une dégustation pour construire ensemble le profil de votre café.",
  cta = "Demander une dégustation",
  type = "degustation",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  cta?: string;
  type?: ContactType;
}) {
  return (
    <section className="container-site py-16 md:py-24">
      <Reveal>
        <div className="noise relative overflow-hidden rounded-3xl bg-plum-deep px-6 py-14 shadow-lift sm:px-10 md:px-16 md:py-24">
          <SmartImage src="/images/cta-beans-dark.webp" alt="Grains de café torréfiés" subject="grains de café, fond sombre" fallback="none" className="absolute inset-0 -z-10" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-dusk opacity-80" />
          <Swirl className="absolute -right-24 -top-10 h-[130%] w-[80%] opacity-70" strokeWidth={2} />
          <div className="relative max-w-xl">
            <p className="eyebrow mb-4 text-flame">{eyebrow}</p>
            <h2 className="text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-on-dark">{title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-on-dark-muted">{text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BrandButton to="/contact" search={{ type }} size="lg">{cta}</BrandButton>
              <BrandButton href={whatsappLink()} variant="ghostDark" size="lg">
                <MessageCircle className="size-4" /> WhatsApp
              </BrandButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
