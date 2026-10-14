import { z } from "zod";

export const leadTypes = [
  "Dégustation",
  "Devis marque blanche",
  "Café torréfié en vrac",
  "Café vert",
  "Autre",
] as const;

export const leadSchema = z
  .object({
    type_demande: z.enum(leadTypes),
    nom: z.string().trim().min(2, "Indiquez votre nom").max(120),
    societe: z.string().trim().max(160).optional().default(""),
    ville: z.string().trim().max(120).optional().default(""),
    telephone: z.string().trim().max(40).optional().default(""),
    email: z.union([z.literal(""), z.string().trim().email("Email invalide").max(200)]).optional().default(""),
    volume_mensuel: z.string().trim().max(120).optional().default(""),
    message: z.string().trim().max(3000).optional().default(""),
  })
  .refine((d) => d.telephone.length >= 6 || d.email.length > 0, {
    message: "Indiquez un téléphone ou un email",
    path: ["telephone"],
  });

export type LeadInput = z.input<typeof leadSchema>;
