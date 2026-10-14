import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { leadSchema, leadTypes } from "@/lib/lead-schema";
import { submitLead } from "@/lib/leads.functions";
import { cn } from "@/lib/utils";
import { BrandButton } from "./BrandButton";

/**
 * Formulaire de demande, pensé pour s'imprimer sur le « bon de demande » de la page Contact :
 * champs soulignés plutôt qu'encadrés, comme sur un document papier.
 * La logique (validation zod, envoi vers la table prospects) est inchangée.
 */

const field = cn(
  "peer w-full border-0 border-b-2 border-plum/20 bg-transparent px-0 pb-2.5 pt-1 text-[17px] text-plum outline-none",
  "transition-colors placeholder:text-plum/30 focus:border-[#E8202E]",
  "aria-[invalid=true]:border-[#E8202E]",
);

function Field({ label, name, error, children, className }: { label: string; name: string; error?: string | undefined; children: ReactNode; className?: string }) {
  return (
    <label htmlFor={name} className={cn("block", className)}>
      <span className="mb-1 block text-sm text-plum/60">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 block text-sm font-medium text-[#C21A27]"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

// Volumes proposés en un clic ; le champ reste libre.
const volumeHints = ["Moins de 50 kg", "50 à 200 kg", "200 à 500 kg", "Plus de 500 kg"];

export function LeadForm({ defaultType = "Dégustation" }: { defaultType?: (typeof leadTypes)[number] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [volume, setVolume] = useState("");
  const reduce = useReducedMotion();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] ??= issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await submitLead({ data: parsed.data });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative px-3 py-6 sm:px-4 md:py-8">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col items-center py-10 text-center"
            role="status"
          >
            {/* Tampon « Demande reçue » qui s'imprime sur le bon */}
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.8, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.1 }}
              className="rounded-lg border-4 border-[#E8202E] px-6 py-3 text-[#E8202E]"
            >
              <span className="block font-display text-3xl font-bold leading-none md:text-4xl">Demande reçue</span>
              <span className="mt-1 block text-xs font-semibold">OCIBRENI · Tit Mellil</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
              <h3 className="mt-10 font-display text-2xl font-semibold text-plum md:text-3xl">Merci, nous avons bien votre demande.</h3>
              <p className="mx-auto mt-3 max-w-sm leading-relaxed text-plum/70">
                Notre équipe vous recontacte rapidement pour échanger sur votre projet.
              </p>
              <BrandButton variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
                Envoyer une autre demande
              </BrandButton>
            </motion.div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid gap-x-8 gap-y-7 md:grid-cols-2"
          >
            <Field label="Type de demande" name="type_demande" className="md:col-span-2">
              <div className="relative">
                <select id="type_demande" name="type_demande" defaultValue={defaultType} className={cn(field, "cursor-pointer appearance-none pr-8 font-medium")}>
                  {leadTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none absolute right-0 top-2 size-4 text-plum/60" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </div>
            </Field>

            <Field label="Nom *" name="nom" error={errors["nom"]}>
              <input id="nom" name="nom" autoComplete="name" aria-invalid={!!errors["nom"]} className={field} placeholder="Prénom et nom" />
            </Field>
            <Field label="Société" name="societe">
              <input id="societe" name="societe" autoComplete="organization" className={field} placeholder="Nom de votre entreprise" />
            </Field>
            <Field label="Ville" name="ville">
              <input id="ville" name="ville" className={field} placeholder="Casablanca, Fès, Agadir…" />
            </Field>
            <Field label="Téléphone" name="telephone" error={errors["telephone"]}>
              <input id="telephone" name="telephone" type="tel" autoComplete="tel" aria-invalid={!!errors["telephone"]} className={field} placeholder="06 00 00 00 00" />
            </Field>
            <Field label="Email" name="email" error={errors["email"]} className="md:col-span-2">
              <input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors["email"]} className={field} placeholder="vous@entreprise.ma" />
            </Field>

            <div className="md:col-span-2">
              <Field label="Volume mensuel estimé" name="volume_mensuel">
                <input
                  id="volume_mensuel"
                  name="volume_mensuel"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className={field}
                  placeholder="En kg par mois"
                />
              </Field>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Volumes fréquents">
                {volumeHints.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVolume(v)}
                    aria-pressed={volume === v}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                      volume === v ? "border-plum bg-plum text-white" : "border-plum/20 text-plum/70 hover:border-plum/50 hover:text-plum",
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <Field label="Message" name="message" className="md:col-span-2">
              <textarea
                id="message"
                name="message"
                rows={3}
                className={cn(field, "resize-none leading-relaxed")}
                placeholder="Votre projet, vos attentes : grains ou moulu, profil de goût, délais…"
              />
            </Field>

            <div className="flex flex-col gap-4 border-t border-dashed border-plum/25 pt-6 md:col-span-2 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-plum/55">* Obligatoire. Laissez un téléphone ou un email.</p>
              <BrandButton type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" && <Loader2 className="mr-1 inline size-4 animate-spin" />}
                {status === "sending" ? "Envoi en cours" : "Envoyer ma demande"}
              </BrandButton>
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm font-medium text-[#C21A27] md:col-span-2">
                L’envoi n’a pas abouti. Réessayez dans un instant, ou écrivez-nous directement sur WhatsApp.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}