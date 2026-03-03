import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaCloser() {
  return (
    <section
      className="border p-5"
      style={{
        borderRadius: "var(--radius)",
        borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
        backgroundColor: "color-mix(in oklch, var(--primary) 4%, transparent)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold mb-1">Ready to discuss the approach?</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            I&apos;ve mapped out the full pipeline architecture. Happy to walk through any of this on a call or answer questions about the Make.com scenario structure.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/proposal"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-100"
          >
            See the proposal
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <span
            className="text-xs font-medium px-3 py-1.5 border"
            style={{
              borderRadius: "var(--radius-sm, 0.125rem)",
              backgroundColor: "color-mix(in oklch, var(--primary) 10%, transparent)",
              borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
              color: "var(--primary)",
            }}
          >
            Reply on Upwork to start
          </span>
        </div>
      </div>
    </section>
  );
}
