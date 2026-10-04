import type { ReactNode } from "react";
import { useScrollReveal } from "~/hooks/use-scroll-reveal";
import { entranceUp, reveal } from "~/lib/animations";
import { cn } from "~/lib/utils";

interface SectionWrapperProps {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
  animate?: boolean;
  children: ReactNode;
}

export function SectionWrapper({
  id,
  title,
  subtitle,
  className,
  animate = true,
  children,
}: SectionWrapperProps) {
  const { ref, isVisible } = useScrollReveal({ enabled: animate });

  return (
    <section
      id={id}
      ref={animate ? ref : undefined}
      className={cn(
        "py-20 md:py-28",
        animate && reveal(isVisible, entranceUp),
        className,
      )}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {title && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-balance">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            )}
            <div className="mt-4 h-px w-12 bg-primary" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
