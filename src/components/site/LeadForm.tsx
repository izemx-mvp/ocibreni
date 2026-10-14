import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { leadSchema, leadTypes } from "@/lib/lead-schema";
import { submitLead } from "@/lib/leads.functions";
import { cn } from "@/lib/utils";
import { BrandButton } from "./BrandButton";

const field = "h-12 w-full rounded-xl border border-mist bg-background px-4 text-[15px] text-foreground placeholder:text-ash outline-none transition focus:border-flame focus:ring-4 focus:ring-flame/15";

function Field({ label, name, error, children }: { label: string; name: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <label htmlFor={name} className="block">
      <span className="mb-1.5 block text-sm font-medium text-plum">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

export function LeadForm({ defaultType = "Dégustation" }: { defaultType?: (typeof leadTypes)[number] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    <div className="relative rounded-2xl bg-card p-6 shadow-lift md:p-10">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center py-12 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-flame-gradient text-primary-foreground shadow-flame"><CheckCircle2 className="size-8" /></span>
            <h3 className="mt-6 text-2xl font-semibold">Merci, votre demande est bien reçue.</h3>
            <p className="mt-3 max-w-sm text-muted-foreground">Notre équipe revient vers vous pour échanger sur votre projet.</p>
            <BrandButton variant="outline" className="mt-8" onClick={() => setStatus("idle")}>Envoyer une autre demande</BrandButton>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <Field label="Type de demande" name="type_demande">
                <select id="type_demande" name="type_demande" defaultValue={defaultType} className={field}>
                  {leadTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Nom *" name="nom" error={errors["nom"]}><input id="nom" name="nom" autoComplete="name" className={field} /></Field>
            <Field label="Société" name="societe"><input id="societe" name="societe" autoComplete="organization" className={field} /></Field>
            <Field label="Ville" name="ville"><input id="ville" name="ville" className={field} /></Field>
            <Field label="Téléphone" name="telephone" error={errors["telephone"]}><input id="telephone" name="telephone" type="tel" autoComplete="tel" className={field} /></Field>
            <Field label="Email" name="email" error={errors["email"]}><input id="email" name="email" type="email" autoComplete="email" className={field} /></Field>
            <Field label="Volume mensuel estimé" name="volume_mensuel"><input id="volume_mensuel" name="volume_mensuel" placeholder="ex. en kg / mois" className={field} /></Field>
            <div className="md:col-span-2">
              <Field label="Message" name="message">
                <textarea id="message" name="message" rows={4} className={cn(field, "h-auto py-3")} placeholder="Votre projet, vos attentes (grains, moulu, profil de goût…)" />
              </Field>
            </div>
            <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
              <p className="text-xs text-muted-foreground">* Champ obligatoire. Indiquez un téléphone ou un email.</p>
              <BrandButton type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" && <Loader2 className="size-4 animate-spin" />}Envoyer ma demande
              </BrandButton>
            </div>
            {status === "error" && <p role="alert" className="text-sm text-destructive md:col-span-2">L'envoi a échoué. Réessayez ou contactez-nous sur WhatsApp.</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
