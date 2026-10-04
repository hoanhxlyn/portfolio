import { ArrowDownIcon } from "@phosphor-icons/react";
import { useMemo } from "react";
import { LinkButton } from "~/components/ui/button";
import { personalInfo } from "~/data/portfolio";
import { entranceUp } from "~/lib/animations";
import { cn } from "~/lib/utils";

const { englishName, title, objective } = personalInfo;

export function Hero() {
  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  return (
    <section className="relative min-h-dvh flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-3xl w-full text-center">
        <p
          className={cn(
            "text-sm font-medium text-primary tracking-widest uppercase mb-4",
            !reducedMotion && cn(entranceUp, "delay-100"),
          )}
        >
          {title}
        </p>
        <h1
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none text-balance",
            !reducedMotion && cn(entranceUp, "delay-200"),
          )}
        >
          {englishName}
        </h1>
        <p
          className={cn(
            "mt-3 text-lg text-muted-foreground font-light tracking-tight",
            !reducedMotion && cn(entranceUp, "delay-300"),
          )}
        >
          Building interfaces that feel inevitable.
        </p>
        <p
          className={cn(
            "mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed text-pretty",
            !reducedMotion && cn(entranceUp, "delay-400"),
          )}
        >
          {objective[0]}
        </p>
        <div
          className={cn(
            "flex items-center justify-center gap-4 mt-8",
            !reducedMotion && cn(entranceUp, "delay-600"),
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
