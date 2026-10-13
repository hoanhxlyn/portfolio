import type { MouseEvent } from "react";
import { SheetContent, SheetTitle } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

interface MobileDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  activeId: string;
  links: { label: string; href: string }[];
  onNavigate: (e: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Split into its own module so react-aria's dialog/overlay code stays off the
 * critical path: the drawer is only reachable below the md breakpoint.
 *
 * Open state is owned by the header, which keeps the hamburger itself always
 * mounted: a tap that lands before this chunk arrives still opens the drawer.
 */
export function MobileDrawer({
  isOpen,
  onOpenChange,
  activeId,
  links,
  onNavigate,
}: MobileDrawerProps) {
  return (
    <SheetContent
      side="right"
      className="w-64"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <SheetTitle className="sr-only">Navigation</SheetTitle>
      <nav className="flex flex-col gap-2 mt-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onNavigate}
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
  );
}
