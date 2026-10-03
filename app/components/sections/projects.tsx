import { SectionWrapper } from "~/components/section-wrapper";
import { Badge } from "~/components/ui/badge";
import { projects } from "~/data/portfolio";

export function Projects() {
  return (
    <SectionWrapper
      id="projects"
      title="Projects"
      subtitle="Selected work I've contributed to"
    >
      <div className="space-y-0">
        {projects.map((project) => (
          <div
            key={project.name}
            className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-8 py-8 border-b border-border/50 last:border-0"
          >
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {project.period}
              </p>
              <h3 className="text-base font-semibold leading-snug">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {project.role}
                {project.teamSize && ` · Team: ${project.teamSize}`}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
