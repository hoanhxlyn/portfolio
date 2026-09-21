import { SectionWrapper } from "~/components/section-wrapper";
import { SkillBadge } from "~/components/shared/skill-badge";
import { skillCategories } from "~/data/portfolio";

export function Skills() {
  return (
    <SectionWrapper
      id="skills"
      title="Skills"
      subtitle="Technologies and tools I work with"
      className="bg-muted/30"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((cat) => (
          <div key={cat.name} className="space-y-3">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
              {cat.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <SkillBadge key={skill} name={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
