import { ListIcon } from "@phosphor-icons/react";
import { lazy, Suspense, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { ThemeToggle } from "~/components/shared/theme-toggle";
import { Button } from "~/components/ui/button";
import { useActiveSection } from "~/hooks/use-active-section";
import { cn } from "~/lib/utils";

const MobileDrawer = lazy(() =>
  import("~/components/mobile-nav").then((m) => ({ default: m.MobileDrawer })),
);

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = navLinks.map((l) => l.href.slice(1));

function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>) {
  const id = e.currentTarget.getAttribute("href")?.slice(1);
  if (!id) return;
  e.preventDefault();
  // No behavior option: the CSS scroll-behavior decides, so reduced motion is respected.
  document.getElementById(id)?.scrollIntoView();
}

export function Header() {
  const activeId = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEventListener("scroll", () => setScrolled(window.scrollY > 50));

  function handleMobileNav(e: React.MouseEvent<HTMLAnchorElement>) {
    scrollToSection(e);
    setNavOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors",
        scrolled && "bg-background/80 backdrop-blur-sm border-b",
      )}
    >
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-lg font-bold tracking-tight text-primary">
          AN
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={scrollToSection}
                className={cn(
                  "relative px-3 py-2 text-sm rounded-md transition-colors hover:text-primary",
                  "after:absolute after:bottom-1 after:left-1/2 after:h-[1.5px] after:w-0 after:bg-current after:transition-all after:duration-250 after:ease-in-out",
                  "hover:after:left-[20%] hover:after:w-[60%]",
                  activeId === link.href.slice(1)
                    ? "text-primary font-medium after:left-[20%] after:w-[60%]"
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
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setNavOpen(true)}
          >
            <ListIcon size={24} />
          </Button>
          <Suspense fallback={null}>
            <MobileDrawer
              isOpen={navOpen}
              onOpenChange={setNavOpen}
              activeId={activeId}
              links={navLinks}
              onNavigate={handleMobileNav}
            />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
