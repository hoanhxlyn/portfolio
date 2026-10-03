import { ArrowDownIcon } from "@phosphor-icons/react";
import { useMemo } from "react";
import { LinkButton } from "~/components/ui/button";
import { personalInfo } from "~/data/portfolio";
import { cn } from "~/lib/utils";

const { englishName, title, objective } = personalInfo;

const entrance =
  "animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards duration-500";

export function Hero() {
  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  return (
    <section className="relative min-h-dvh flex items-end pb-24 px-4 sm:px-6">
      <div className="relative max-w-5xl mx-auto w-full">
        <p
          className={cn(
            "text-sm font-medium text-primary tracking-widest uppercase mb-4",
            !reducedMotion && cn(entrance, "delay-100"),
          )}
        >
          {title}
        </p>
        <h1
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none",
            !reducedMotion && cn(entrance, "delay-200"),
          )}
        >
          {englishName}
        </h1>
        <p
          className={cn(
            "mt-6 text-muted-foreground max-w-xl leading-relaxed text-lg",
            !reducedMotion && cn(entrance, "delay-300"),
          )}
        >
          {objective[0]}
        </p>
        <div
          className={cn(
            "flex items-center gap-4 mt-8",
            !reducedMotion && cn(entrance, "delay-500"),
          )}
        >
          <LinkButton href="#projects" size="lg">
            View My Work
          </LinkButton>
          <LinkButton href="#contact" variant="outline" size="lg">
            Get In Touch
          </LinkButton>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse">
        <ArrowDownIcon
          size={20}
          className="text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
