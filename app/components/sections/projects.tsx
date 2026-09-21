import { SectionWrapper } from "~/components/section-wrapper";
import { ProjectCard } from "~/components/shared/project-card";
import { projects } from "~/data/portfolio";

export function Projects() {
  return (
    <SectionWrapper
      id="projects"
      title="Projects"
      subtitle="Selected work I've contributed to"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
