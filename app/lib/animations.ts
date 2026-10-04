import { cn } from "~/lib/utils";

export const entranceUp =
  "animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards duration-500";

export const entranceLeft =
  "animate-in fade-in slide-in-from-left-8 fill-mode-forwards duration-700";

export function reveal(isVisible: boolean, animationClass: string) {
  return cn(!isVisible && "invisible", isVisible && animationClass);
}
