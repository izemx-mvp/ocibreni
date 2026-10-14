import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { nav, site } from "@/config/site";
import { Swirl } from "./Swirl";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-plum-deep text-on-dark-muted">
      <Swirl className="absolute -left-20 bottom-0 h-full w-[70%] opacity-25" />
      <div className="container-site relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr] md:py-20">
        <div>
          <span className="inline-block rounded-2xl bg-on-dark px-4 py-3">
            <img src={logo} alt="OCIBRENI" className="h-14 w-auto" />
          </span>
          <p className="mt-6 max-w-sm leading-relaxed">{site.shortPitch}</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-on-dark">Navigation</h3>
          <ul className="space-y-2.5">
            {nav.map((n) => (
              <li key={n.to}><Link to={n.to} className="transition-colors hover:text-on-dark">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-on-dark">Contact</h3>
          <ul className="space-y-3.5">
            <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-flame" />{site.address}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-flame" /><a href={site.phoneHref} className="hover:text-on-dark">{site.phone}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-flame" /><a href={`mailto:${site.email}`} className="hover:text-on-dark">{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-on-dark/10">
        <div className="container-site flex flex-col justify-between gap-2 py-6 text-sm md:flex-row">
          <span>© {new Date().getFullYear()} OCIBRENI. Tous droits réservés.</span>
          <span>Fabriqué à Tit Mellil, Casablanca</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label="Nous écrire sur WhatsApp" className="fixed bottom-5 left-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-lift transition-transform hover:-translate-y-1">
      <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2S21.8 6.6 21.8 12 17.4 21.8 12 21.8zM12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12S18.6 0 12 0z"/></svg>
    </a>
  );
}
