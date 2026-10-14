import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Coffee, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

function errorText(msg?: string) {
  if (msg?.includes("RATE_LIMIT")) return "Beaucoup de demandes en ce moment. Réessayez dans un instant, ou écrivez-nous sur WhatsApp.";
  if (msg?.includes("NO_CREDITS")) return "L'assistant est momentanément indisponible. Écrivez-nous directement sur WhatsApp.";
  return "Un souci technique est survenu. Vous pouvez nous joindre sur WhatsApp.";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/public/chat" }),
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, status]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ y: -3 }}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant"}
        className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-flame-gradient text-primary-foreground shadow-flame"
      >
        {open ? <X className="size-6" /> : <Coffee className="size-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            className="fixed inset-x-3 bottom-24 z-40 flex h-[min(600px,calc(100dvh-8rem))] flex-col overflow-hidden rounded-2xl border border-mist bg-card shadow-lift sm:left-auto sm:right-5 sm:w-[380px]"
            role="dialog"
            aria-label="Assistant OCIBRENI"
          >
            <div className="glass flex items-center gap-3 border-b border-mist px-5 py-4">
              <span className="grid size-10 place-items-center rounded-full bg-dusk text-on-dark"><Coffee className="size-5" /></span>
              <div>
                <p className="font-display text-sm font-semibold text-plum">Conseiller OCIBRENI</p>
                <p className="text-xs text-muted-foreground">Marque blanche, vrac, café vert</p>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-foreground">Bonjour ! Vous souhaitez lancer votre marque de café, acheter du café torréfié en vrac ou du café vert ? Dites-m'en plus.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Lancer ma marque de café", "Café torréfié en vrac", "Café vert"].map((s) => (
                      <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-mist bg-background px-3 py-1.5 text-xs font-medium text-plum hover:border-flame">{s}</button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m) => {
                const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
                const savedLead = m.parts.some((p) => p.type === "tool-create_lead" && "state" in p && p.state === "output-available");
                if (!text && !savedLead) return null;
                return (
                  <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[85%] text-sm leading-relaxed", m.role === "user" ? "rounded-2xl rounded-br-md bg-plum px-4 py-2.5 text-on-dark" : "text-foreground")}>
                      {savedLead && <p className="mb-2 rounded-lg bg-sand px-3 py-2 text-xs font-medium text-plum">✓ Demande transmise à l'équipe</p>}
                      <div className="space-y-2 [&_ul]:list-disc [&_ul]:pl-4 [&_strong]:text-plum"><ReactMarkdown>{text}</ReactMarkdown></div>
                    </div>
                  </div>
                );
              })}
              {status === "submitted" && <p className="text-xs text-muted-foreground animate-pulse">L'assistant écrit…</p>}
              {error && (
                <div className="rounded-xl bg-sand p-3 text-sm text-plum">
                  {errorText(error.message)}{" "}
                  <a href={whatsappLink()} target="_blank" rel="noreferrer" className="font-semibold text-flame-deep underline">Ouvrir WhatsApp</a>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-end gap-2 border-t border-mist p-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                rows={1}
                placeholder="Votre message…"
                aria-label="Votre message"
                className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-mist bg-background px-3.5 py-2.5 text-sm outline-none focus:border-flame"
              />
              <button type="submit" disabled={busy || !input.trim()} aria-label="Envoyer" className="grid size-11 shrink-0 place-items-center rounded-xl bg-flame-gradient text-primary-foreground disabled:opacity-40">
                <ArrowUp className="size-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
