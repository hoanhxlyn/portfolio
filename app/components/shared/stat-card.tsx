import type { ReactNode } from "react";

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="flex flex-col items-center p-6 rounded-lg border bg-card text-center">
      {icon && <div className="mb-2 text-primary">{icon}</div>}
      <span className="text-3xl font-bold tracking-tight">{value}</span>
      <span className="mt-1 text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
