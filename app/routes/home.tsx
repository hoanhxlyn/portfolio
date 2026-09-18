import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { About } from "~/components/sections/about";
import { Contact } from "~/components/sections/contact";
import { Experience } from "~/components/sections/experience";
import { Hero } from "~/components/sections/hero";
import { Projects } from "~/components/sections/projects";
import { Skills } from "~/components/sections/skills";
import {
  experience,
  personalInfo,
  projects,
  skillCategories,
  stats,
} from "~/data/portfolio";

export function meta() {
  return [
    { title: "Andrew Nguyen — Software Engineer" },
    {
      name: "description",
      content:
        "Portfolio of Andrew Nguyen, a software engineer specializing in frontend development with React, Next.js, and TypeScript.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero
          name={personalInfo.name}
          englishName={personalInfo.englishName}
          title={personalInfo.title}
          objective={personalInfo.objective}
        />
        <About objective={personalInfo.objective} stats={stats} />
        <Skills categories={skillCategories} />
        <Experience items={experience} />
        <Projects items={projects} />
        <Contact
          email={personalInfo.email}
          phone={personalInfo.phone}
          location={personalInfo.location}
        />
      </main>
      <Footer />
    </>
  );
}
