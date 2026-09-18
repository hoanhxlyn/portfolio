import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

interface SectionWrapperProps {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
}

export function SectionWrapper({
  id,
  title,
  subtitle,
  className,
  children,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {title && (
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-muted-foreground text-lg">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
