import {
  DatabaseIcon,
  DesktopIcon,
  GitBranchIcon,
  HardDrivesIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { SectionWrapper } from "~/components/section-wrapper";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { skillCategories } from "~/data/portfolio";
import { fadeUp, stagger } from "~/lib/motion";

const iconMap: Record<string, React.ReactNode> = {
  Frontend: <DesktopIcon size={20} weight="duotone" />,
  Backend: <HardDrivesIcon size={20} weight="duotone" />,
  Databases: <DatabaseIcon size={20} weight="duotone" />,
  "Version Control": <GitBranchIcon size={20} weight="duotone" />,
  "AI Tools": <SparkleIcon size={20} weight="duotone" />,
};

const container = stagger(0.15);

const viewport = { once: true, amount: 0.15 } as const;

export function Skills() {
  return (
    <SectionWrapper
      id="skills"
      title="Skills"
      className="bg-muted/30"
      animate={false}
    >
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {skillCategories.map((cat) => (
          <motion.div key={cat.name} variants={fadeUp} whileHover={{ y: -4 }}>
            <Card className="h-full transition-shadow hover:shadow-lg hover:shadow-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary" aria-hidden="true">
                    {iconMap[cat.name]}
                  </span>
                  {cat.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
