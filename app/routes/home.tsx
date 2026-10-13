import { useEffect } from "react";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { About } from "~/components/sections/about";
import { Contact } from "~/components/sections/contact";
import { Experience } from "~/components/sections/experience";
import { Hero } from "~/components/sections/hero";
import { Projects } from "~/components/sections/projects";
import { Skills } from "~/components/sections/skills";

const SCROLL_KEY = "home-scroll";

export function meta() {
  return [
    { title: "Andrew Nguyen — Software Engineer" },
    {
      name: "description",
      content: "Portfolio of Andrew Nguyen",
    },
  ];
}

export default function Home() {
  // Returning from a project restores where the reader was in the list; a
  // project page itself always opens at the top (see routes/project.tsx).
  // Saving on scroll (not on unmount) avoids capturing a value already clamped
  // to the shorter page that replaces this one.
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved !== null) {
      window.scrollTo({ top: Number(saved), behavior: "instant" });
    }
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
