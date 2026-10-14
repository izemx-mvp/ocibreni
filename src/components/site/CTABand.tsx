import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { BrandButton } from "./BrandButton";
import { Reveal } from "./Reveal";
import { Swirl } from "./Swirl";

export function CTABand({
  title = "Goûtez avant de vous lancer.",
  text = "Parlez-nous de votre projet : nous organisons une dégustation pour construire ensemble le profil de votre café.",
}: { title?: string; text?: string }) {
  return (
    <section className="container-site py-20 md:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-dusk px-7 py-14 md:px-16 md:py-20">
          <Swirl className="absolute -right-24 -top-10 h-[130%] w-[80%] opacity-70" strokeWidth={2} />
          <div className="relative max-w-xl">
            <h2 className="text-3xl font-semibold text-on-dark md:text-5xl">{title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-on-dark-muted">{text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BrandButton to="/contact" size="lg">Demander une dégustation</BrandButton>
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
