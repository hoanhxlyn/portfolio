import { SectionWrapper } from "~/components/section-wrapper";
import { ProjectCard } from "~/components/shared/project-card";

interface ProjectsProps {
  items: {
    name: string;
    period: string;
    role: string;
    description: string;
    teamSize?: string | null;
    technologies: string[];
  }[];
}

export function Projects({ items }: ProjectsProps) {
  return (
    <SectionWrapper
      id="projects"
      title="Projects"
      subtitle="Selected work I've contributed to"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
