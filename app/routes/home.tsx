import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { About } from "~/components/sections/about";
import { Contact } from "~/components/sections/contact";
import { Experience } from "~/components/sections/experience";
import { Hero } from "~/components/sections/hero";
import { Projects } from "~/components/sections/projects";
import { Skills } from "~/components/sections/skills";

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
