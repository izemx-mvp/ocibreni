import { createFileRoute } from "@tanstack/react-router";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from "ai";
import { z } from "zod";

const SYSTEM = `Tu es l'assistant d'OCIBRENI, torréfacteur basé à Tit Mellil (Casablanca). Tu réponds uniquement en français, avec un ton chaleureux, confiant et expert, en réponses courtes.

OCIBRENI importe du café vert, le torréfie dans sa propre usine et le conditionne dans sa propre unité. Trois activités :
1. Marque blanche (offre principale) : une entreprise lance sa propre marque de café sans investir dans un local ni une torréfactrice ; elle fournit uniquement son emballage. Processus : échange → tests de mélange → choix de la formule → formule enregistrée et reproduite à l'identique → production dans l'emballage du client.
2. Café torréfié en vrac : pour les unités régionales qui assemblent et conditionnent elles-mêmes.
3. Café vert : pour d'autres torréfacteurs.

Ta mission : comprendre le besoin et qualifier le visiteur en posant une question à la fois : activité concernée, ville, volume mensuel estimé, grains ou moulu. Propose ensuite une dégustation ou un devis.
Règles strictes : n'invente JAMAIS de prix, délais, quantités minimales, origines, certifications ou clients. Si on te le demande, dis que l'équipe confirmera lors de l'échange.
Quand tu as au minimum le nom et un téléphone ou un email, et que le visiteur est d'accord, appelle l'outil create_lead, puis confirme que l'équipe va le recontacter.`;

const bodySchema = z.object({ messages: z.array(z.any()).min(1).max(40) });

export const Route = createFileRoute("/api/public/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = bodySchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "Requête invalide" }, { status: 400 });
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "Assistant indisponible" }, { status: 500 });

        const lovable = createOpenAICompatible({
          name: "lovable",
          baseURL: "https://ai.gateway.lovable.dev/v1",
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
        });

        const result = streamText({
          model: lovable("google/gemini-3-flash-preview"),
          system: SYSTEM,
          messages: await convertToModelMessages(parsed.data.messages as UIMessage[]),
          maxRetries: 0,
          stopWhen: stepCountIs(5),
          tools: {
            create_lead: tool({
              description: "Enregistre la demande d'un prospect qualifié pour que l'équipe OCIBRENI le recontacte.",
              inputSchema: z.object({
                nom: z.string().describe("Nom du contact"),
                telephone: z.string().describe("Téléphone, chaîne vide si inconnu"),
                email: z.string().describe("Email, chaîne vide si inconnu"),
                societe: z.string().describe("Société, chaîne vide si inconnue"),
                ville: z.string().describe("Ville, chaîne vide si inconnue"),
                type_demande: z.string().describe("Marque blanche, Café torréfié en vrac, Café vert, Dégustation ou Autre"),
                volume_mensuel: z.string().describe("Volume mensuel estimé, chaîne vide si inconnu"),
                message: z.string().describe("Résumé du besoin : grains/moulu, attentes"),
              }),
              execute: async (input) => {
                const clip = (s: string, n: number) => (s ?? "").trim().slice(0, n);
                const row = {
                  source: "chatbot",
                  nom: clip(input.nom, 120),
                  telephone: clip(input.telephone, 40),
                  email: clip(input.email, 200),
                  societe: clip(input.societe, 160),
                  ville: clip(input.ville, 120),
                  type_demande: clip(input.type_demande, 60),
                  volume_mensuel: clip(input.volume_mensuel, 120),
                  message: clip(input.message, 3000),
                };
                if (row.nom.length < 2 || (row.telephone.length < 6 && !row.email.includes("@"))) {
                  return { ok: false, reason: "Nom et téléphone ou email requis." };
                }
                const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
                const { error } = await supabaseAdmin.from("prospects").insert(row);
                return error ? { ok: false, reason: "Erreur d'enregistrement" } : { ok: true };
              },
            }),
          },
        });

        return result.toUIMessageStreamResponse({
          onError: (err) => {
            const status = (err as { statusCode?: number })?.statusCode;
            if (status === 429) return "RATE_LIMIT";
            if (status === 402) return "NO_CREDITS";
            console.error("chat error", err);
            return "GENERIC";
          },
        });
      },
    },
  },
});
