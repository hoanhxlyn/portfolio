import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp } from "~/lib/motion";
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
  return (
    <motion.section
      id={id}
      className={cn("py-20 md:py-28", className)}
      variants={fadeUp}
      initial={animate ? "hidden" : false}
      whileInView={animate ? "show" : undefined}
      viewport={animate ? { once: true, amount: 0.15 } : undefined}
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
    </motion.section>
  );
}
