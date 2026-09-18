import { ArrowDown } from "@phosphor-icons/react";
import { LinkButton } from "~/components/ui/button";

interface HeroProps {
  name: string;
  englishName: string;
  title: string;
  objective: string;
}

export function Hero({ englishName, title, objective }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <p className="text-sm text-muted-foreground tracking-widest uppercase">
          Hello, I'm
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          {englishName}
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
          {title}
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {objective}
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <LinkButton href="#projects" size="lg">
            View My Work
          </LinkButton>
          <LinkButton href="#contact" variant="outline" size="lg">
            Get In Touch
          </LinkButton>
        </div>
        <div className="pt-12 animate-bounce">
          <ArrowDown size={24} className="mx-auto text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
