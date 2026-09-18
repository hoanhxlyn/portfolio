import { useDarkMode, useIsomorphicLayoutEffect } from "usehooks-ts";

export function useTheme() {
  const { isDarkMode, toggle } = useDarkMode({
    defaultValue: true,
  });

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return { isDarkMode, toggle };
}
