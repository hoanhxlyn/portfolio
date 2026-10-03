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
        <div className="absolute left-[5px] top-6 bottom-0 w-px bg-border" />
      )}
      <div
        className="absolute left-0 top-2 w-[11px] h-[11px] rounded-full bg-primary"
        aria-hidden="true"
      />
      <div className="pb-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h3 className="text-base font-semibold">{company}</h3>
          <span className="text-sm text-muted-foreground">{period}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{role}</p>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
