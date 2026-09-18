import { Moon, Sun } from "@phosphor-icons/react";
import { Button } from "~/components/ui/button";
import { useTheme } from "~/hooks/use-theme";

export function ThemeToggle() {
  const { isDarkMode, toggle } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
