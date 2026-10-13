import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "~/hooks/use-prefers-reduced-motion";
import { cn } from "~/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
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

function getInitialDisplay(
  animate: boolean,
  reducedMotion: boolean,
  number: number,
): number {
  if (!animate || reducedMotion) return number;
  return 0;
}

export function StatCard({
  value,
  label,
  icon,
  className,
  style,
  animate = false,
}: StatCardProps) {
  const { prefix, number, suffix, raw } = parseStatValue(value);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(() =>
    getInitialDisplay(animate, prefersReducedMotion, number),
  );
  const hasDecimals = number % 1 !== 0;
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || prefersReducedMotion || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = eased * number;
      setDisplay(
        hasDecimals ? Math.round(current * 10) / 10 : Math.round(current),
      );
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [animate, number, hasDecimals, prefersReducedMotion]);

  const formatted = animate
    ? `${prefix}${hasDecimals ? display.toFixed(1) : display}${suffix}`
    : raw;

  return (
    <div
      className={cn(
        "flex flex-col items-center p-6 text-center border-t-2 border-primary/20",
        className,
      )}
      style={style}
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
