import { useIntersectionObserver } from "usehooks-ts";
import { usePrefersReducedMotion } from "~/hooks/use-prefers-reduced-motion";

export function useScrollReveal(options?: {
  threshold?: number;
  enabled?: boolean;
}) {
  const enabled = options?.enabled ?? true;
  const prefersReducedMotion = usePrefersReducedMotion();

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: options?.threshold ?? 0.15,
    freezeOnceVisible: true,
  });

  if (!enabled) return { ref: undefined, isVisible: true };

  return { ref, isVisible: prefersReducedMotion || isIntersecting };
}
