import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "~/components/theme-provider";
import { Button } from "~/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function toggle() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </Button>
  );
}
