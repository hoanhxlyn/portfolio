import { SectionWrapper } from "~/components/section-wrapper";
import { skillCategories } from "~/data/portfolio";

export function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills" className="bg-muted/30">
      <div className="space-y-6">
        {skillCategories.map((cat) => (
          <div
            key={cat.name}
            className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 py-4 border-b border-border/50 last:border-0"
          >
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
              {cat.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {cat.skills.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
