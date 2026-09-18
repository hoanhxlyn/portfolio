import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface ProjectCardProps {
  name: string;
  period: string;
  role: string;
  description: string;
  teamSize?: string | null;
  technologies: string[];
}

export function ProjectCard({
  name,
  period,
  role,
  description,
  teamSize,
  technologies,
}: ProjectCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug">{name}</CardTitle>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {period}
          </span>
        </div>
        <CardDescription>{role}</CardDescription>
        {teamSize && (
          <p className="text-xs text-muted-foreground">
            Team: {teamSize} members
          </p>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
