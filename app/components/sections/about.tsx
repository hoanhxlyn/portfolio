import {
  BriefcaseIcon,
  CertificateIcon,
  ClockIcon,
  CodeIcon,
  MapPinIcon,
  TrophyIcon,
} from "@phosphor-icons/react";
import { SectionWrapper } from "~/components/section-wrapper";
import { StatCard } from "~/components/shared/stat-card";
import { personalInfo, stats } from "~/data/portfolio";
import { useScrollReveal } from "~/hooks/use-scroll-reveal";
import { cn } from "~/lib/utils";

const { objective } = personalInfo;

const iconMap: Record<string, React.ReactNode> = {
  "Years Experience": <ClockIcon size={24} />,
  "Projects Delivered": <TrophyIcon size={24} />,
  Companies: <BriefcaseIcon size={24} />,
  "IELTS Score": <CertificateIcon size={24} />,
};

const highlightKeywords = (text: string) => {
  const parts = text.split(
    /(~?\d+\+?\s*(?:years?|Projects? Delivered)?|\bReact\.js\b|\bNext\.js\b|\bTypeScript\b|\bAgile\/Scrum\b)/gi,
  );
  let hlCount = 0;
  return parts.map((part) => {
    if (
      /^~?\d/.test(part) ||
      /React\.js|Next\.js|TypeScript|Agile\/Scrum/i.test(part)
    ) {
      hlCount++;
      return (
        <span key={`hl-${hlCount}`} className="text-foreground font-medium">
          {part}
        </span>
      );
    }
    return part;
  });
};

const anim = (isVisible: boolean, ...classes: string[]) =>
  cn(!isVisible && "invisible", isVisible && classes.join(" "));

export function About() {
  const photo = useScrollReveal();
  const text = useScrollReveal();
  const statsRef = useScrollReveal();

  return (
    <SectionWrapper id="about" title="About Me" animate={false}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div
          ref={photo.ref}
          className={anim(
            photo.isVisible,
            "animate-in fade-in slide-in-from-left-8 fill-mode-forwards duration-700",
          )}
        >
          <div className="relative mx-auto w-48 h-64 sm:w-64 sm:h-80 md:w-72 md:h-96">
            <div
              className="absolute -inset-2 bg-primary/10 -rotate-2"
              aria-hidden="true"
            />
            <img
              src="/avatar.jpg"
              alt=""
              className="relative w-full h-full object-cover"
            />
          </div>
        </div>

        <div
          ref={text.ref}
          className={cn(
            "space-y-4",
            anim(
              text.isVisible,
              "animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards duration-500 delay-200",
            ),
          )}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPinIcon size={16} className="text-primary" aria-hidden="true" />
            <span>
              Currently at{" "}
              <span className="text-foreground font-medium">TECHVIFY</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CodeIcon size={16} className="text-primary" aria-hidden="true" />
            <span>
              Focus on{" "}
              <span className="text-foreground font-medium">
                Frontend Engineering
              </span>
            </span>
          </div>
          {objective.map((paragraph) => (
            <p
              key={paragraph}
              className="text-muted-foreground leading-relaxed"
            >
              {highlightKeywords(paragraph)}
            </p>
          ))}
        </div>
      </div>

      <div
        ref={statsRef.ref}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
      >
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            icon={iconMap[stat.label]}
            animate={statsRef.isVisible}
            className={anim(
              statsRef.isVisible,
              "animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards duration-500",
            )}
            style={{ animationDelay: `${(i + 1) * 100}ms` }}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
