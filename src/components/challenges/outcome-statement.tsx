import { TrendingUp } from "lucide-react";

interface OutcomeStatementProps {
  outcome: string;
}

export function OutcomeStatement({ outcome }: OutcomeStatementProps) {
  return (
    <div
      className="flex items-start gap-2 px-3 py-2"
      style={{
        backgroundColor: "color-mix(in oklch, var(--success) 6%, transparent)",
        borderColor: "color-mix(in oklch, var(--success) 18%, transparent)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "var(--radius-sm, 0.125rem)",
      }}
    >
      <TrendingUp
        className="h-4 w-4 mt-0.5 shrink-0"
        style={{ color: "var(--success)" }}
      />
      <p
        className="text-sm font-medium"
        style={{ color: "var(--success)" }}
      >
        {outcome}
      </p>
    </div>
  );
}
