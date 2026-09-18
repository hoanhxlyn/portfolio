interface TimelineItemProps {
  company: string;
  role: string;
  period: string;
  description?: string | null;
  isLast?: boolean;
}

export function TimelineItem({
  company,
  role,
  period,
  description,
  isLast,
}: TimelineItemProps) {
  return (
    <div className="relative pl-8">
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
      )}
      <div className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full border-2 border-primary bg-background" />
      <div className="pb-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h3 className="text-lg font-semibold">{company}</h3>
          <span className="text-sm text-muted-foreground">{period}</span>
        </div>
        <p className="text-sm text-primary font-medium">{role}</p>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
