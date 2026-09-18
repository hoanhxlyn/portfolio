import { Briefcase, Certificate, Clock, Trophy } from "@phosphor-icons/react";
import { SectionWrapper } from "~/components/section-wrapper";
import { StatCard } from "~/components/shared/stat-card";

interface AboutProps {
  objective: string;
  stats: { value: string; label: string }[];
}

const iconMap: Record<string, React.ReactNode> = {
  "Years Experience": <Clock size={24} />,
  "Projects Delivered": <Trophy size={24} />,
  Companies: <Briefcase size={24} />,
  "IELTS Score": <Certificate size={24} />,
};

export function About({ objective, stats }: AboutProps) {
  return (
    <SectionWrapper id="about" title="About Me">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">{objective}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              icon={iconMap[stat.label]}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
