import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // The band can hold more than one section during a fast scroll; the
        // topmost one is the section the reader is actually looking at.
        let topmost: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (
            !topmost ||
            entry.boundingClientRect.top < topmost.boundingClientRect.top
          ) {
            topmost = entry;
          }
        }
        if (topmost) setActiveId(topmost.target.id);
      },
      { rootMargin: "-20% 0px -80% 0px" },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
