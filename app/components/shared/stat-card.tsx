import {
  animate as animateNumber,
  useInView,
  useReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  className?: string;
  animate?: boolean;
}

function parseStatValue(value: string) {
  const match = value.match(/^([^0-9]*?)(\d+(?:\.\d+)?)([^0-9]*?)$/);
  if (!match) return { prefix: "", number: 0, suffix: "", raw: value };
  return {
    prefix: match[1],
    number: Number.parseFloat(match[2]),
    suffix: match[3],
    raw: value,
  };
}

export function StatCard({
  value,
  label,
  icon,
  className,
  animate = false,
}: StatCardProps) {
  const { prefix, number, suffix, raw } = parseStatValue(value);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();
  const hasDecimals = number % 1 !== 0;
  const shouldAnimate = animate && inView && !reducedMotion;
  const [display, setDisplay] = useState(() =>
    animate && !reducedMotion ? 0 : number,
  );

  useEffect(() => {
    if (!shouldAnimate) return;
    const controls = animateNumber(0, number, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) =>
        setDisplay(hasDecimals ? Math.round(v * 10) / 10 : Math.round(v)),
    });
    return () => controls.stop();
  }, [shouldAnimate, number, hasDecimals]);

  const formatted = animate
    ? `${prefix}${hasDecimals ? display.toFixed(1) : display}${suffix}`
    : raw;

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center p-6 text-center border-t-2 border-primary/20",
        className,
      )}
    >
      {icon && (
        <div className="mb-2 text-primary" aria-hidden="true">
          {icon}
        </div>
      )}
      <span className="text-3xl font-bold tracking-tight tabular-nums">
        {formatted}
      </span>
      <span className="mt-1 text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
