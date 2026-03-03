import type { ExecutiveSummaryData } from "@/data/challenges";

interface ExecutiveSummaryProps {
  data: ExecutiveSummaryData;
}

export function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
  const { commonApproach, differentApproach, accentWord } = data;

  const renderDifferentApproach = () => {
    if (!accentWord) return <span>{differentApproach}</span>;
    const escaped = accentWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = differentApproach.split(new RegExp(`(${escaped})`, "i"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === accentWord.toLowerCase() ? (
            <span key={i} className="text-primary font-semibold">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div
      className="relative overflow-hidden p-5 md:p-6"
      style={{
        background: "oklch(0.10 0.02 250)",
        backgroundImage:
          "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.03), transparent 70%)",
        borderRadius: "var(--radius)",
        border: "1px solid oklch(1 0 0 / 0.08)",
      }}
    >
      <p className="text-sm leading-relaxed text-white/50">{commonApproach}</p>
      <hr className="my-4 border-white/10" />
      <p className="text-sm md:text-base leading-relaxed font-medium text-white/90">
        {renderDifferentApproach()}
      </p>
      <p className="text-xs text-white/35 mt-4">
        &larr;{" "}
        <a
          href="/"
          className="hover:text-white/60 transition-colors duration-100 underline underline-offset-2"
        >
          Back to the live demo
        </a>
      </p>
    </div>
  );
}
