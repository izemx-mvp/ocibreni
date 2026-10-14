import { createServerFn } from "@tanstack/react-start";
import { leadSchema } from "./lead-schema";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("prospects").insert({ ...data, source: "formulaire" });
    if (error) {
      console.error("prospects insert failed", error);
      throw new Error("Envoi impossible pour le moment.");
    }
    return { ok: true };
  });
