import { SectionWrapper } from "~/components/section-wrapper";
import { TimelineItem } from "~/components/shared/timeline-item";

interface ExperienceProps {
  items: {
    company: string;
    role: string;
    period: string;
    description?: string | null;
  }[];
}

export function Experience({ items }: ExperienceProps) {
  return (
    <SectionWrapper
      id="experience"
      title="Experience"
      subtitle="Where I've worked"
    >
      <div className="max-w-2xl mx-auto">
        {items.map((item, i) => (
          <TimelineItem
            key={item.company}
            company={item.company}
            role={item.role}
            period={item.period}
            description={item.description}
            isLast={i === items.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
