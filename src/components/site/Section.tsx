import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page section with the light / cream / deep-plum rhythm. Dark sections get the grain overlay. */
export function Section({
  tone = "light",
  children,
  className,
  id,
  container = true,
}: {
  tone?: "light" | "cream" | "dark";
  children: ReactNode;
  className?: string;
  id?: string;
  container?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "section-y relative overflow-hidden",
        tone === "cream" && "bg-sand",
        tone === "dark" && "noise bg-dusk text-on-dark-muted",
        className,
      )}
    >
      {container ? <div className="container-site relative">{children}</div> : children}
    </section>
  );
}
