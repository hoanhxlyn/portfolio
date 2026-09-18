import { List } from "@phosphor-icons/react";
import { useState } from "react";
import { useEventListener } from "usehooks-ts";
import { ThemeToggle } from "~/components/shared/theme-toggle";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { useActiveSection } from "~/hooks/use-active-section";
import { cn } from "~/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = navLinks.map((l) => l.href.slice(1));

export function Header() {
  const activeId = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);

  useEventListener("scroll", () => setScrolled(window.scrollY > 50));

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors",
        scrolled && "bg-background/80 backdrop-blur-sm border-b",
      )}
    >
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-lg font-bold tracking-tight">
          AN
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm rounded-md transition-colors hover:text-primary",
                  activeId === link.href.slice(1)
                    ? "text-primary font-medium"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Menu"
              >
                <List size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 text-sm rounded-md transition-colors hover:bg-accent",
                      activeId === link.href.slice(1)
                        ? "text-primary font-medium"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
