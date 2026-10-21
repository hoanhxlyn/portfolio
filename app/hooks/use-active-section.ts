import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const sync = () => {
      // The section above the 20% reading line is the one being read; computed
      // fresh per scroll event so both scroll directions agree.
      const line = window.innerHeight * 0.2;
      let active = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) active = id;
      }

      // The last section can sit below the line: there is never enough page
      // below it to bring its top up to the line, so it owns the screen while
      // its top is in the lower half of the viewport or the page is at the
      // bottom.
      const last = document.getElementById(sectionIds[sectionIds.length - 1]);
      if (
        last &&
        (last.getBoundingClientRect().top <= window.innerHeight / 2 ||
          window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 1)
      ) {
        active = last.id;
      }

      // Nothing above the line (the hero) keeps the previous highlight.
      if (active) setActiveId(active);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, [sectionIds]);

  return activeId;
}
