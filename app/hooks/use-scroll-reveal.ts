import { useMemo } from "react";
import { useIntersectionObserver } from "usehooks-ts";

export function useScrollReveal(options?: {
  threshold?: number;
  enabled?: boolean;
}) {
  const enabled = options?.enabled ?? true;

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: options?.threshold ?? 0.15,
    freezeOnceVisible: true,
  });

  if (!enabled) return { ref: undefined, isVisible: true };

  return { ref, isVisible: prefersReducedMotion || isIntersecting };
}
