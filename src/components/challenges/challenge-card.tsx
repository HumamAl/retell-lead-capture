import type { ReactNode } from "react";
import { OutcomeStatement } from "./outcome-statement";

interface ChallengeCardProps {
  index: number;
  title: string;
  description: string;
  outcome?: string;
  children?: ReactNode;
}

export function ChallengeCard({
  index,
  title,
  description,
  outcome,
  children,
}: ChallengeCardProps) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className="bg-card border border-border p-5 space-y-4"
      style={{
        borderRadius: "var(--radius)",
        boxShadow: "var(--card-shadow)",
        transition: "border-color var(--t-interactive), box-shadow var(--t-interactive)",
      }}
    >
      {/* Header row: step number + title */}
      <div className="flex items-baseline gap-3">
        <span
          className="text-sm font-bold tabular-nums shrink-0 w-6"
          style={{ color: "var(--primary)", opacity: 0.7 }}
        >
          {stepNumber}
        </span>
        <h3 className="text-base font-semibold leading-snug">{title}</h3>
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed pl-9"
        style={{ color: "var(--muted-foreground)" }}
      >
        {description}
      </p>

      {/* Visualization slot */}
      {children && <div className="pl-0">{children}</div>}

      {/* Outcome statement */}
      {outcome && <OutcomeStatement outcome={outcome} />}
    </div>
  );
}
