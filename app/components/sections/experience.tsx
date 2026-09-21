import { SectionWrapper } from "~/components/section-wrapper";
import { TimelineItem } from "~/components/shared/timeline-item";
import { experience } from "~/data/portfolio";

export function Experience() {
  return (
    <SectionWrapper
      id="experience"
      title="Experience"
      subtitle="Where I've worked"
    >
      <div className="max-w-2xl mx-auto">
        {experience.map((item, i) => (
          <TimelineItem
            key={item.company}
            company={item.company}
            role={item.role}
            period={item.period}
            description={item.description}
            isLast={i === experience.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
