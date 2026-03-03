"use client";

import { useState } from "react";
import { Phone, Clock, Bot, User, Building2, ArrowRight, ArrowDown } from "lucide-react";

type TimeMode = "business" | "afterhours";

export function TwilioRoutingViz() {
  const [mode, setMode] = useState<TimeMode>("business");

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex items-center gap-0">
        <button
          onClick={() => setMode("business")}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-r-0"
          style={{
            borderRadius: "var(--radius-sm, 0.125rem) 0 0 var(--radius-sm, 0.125rem)",
            backgroundColor:
              mode === "business"
                ? "var(--primary)"
                : "var(--card)",
            color:
              mode === "business"
                ? "var(--primary-foreground)"
                : "var(--muted-foreground)",
            borderColor: mode === "business" ? "var(--primary)" : "var(--border)",
            transition: "background-color 60ms ease-out, color 60ms ease-out",
          }}
        >
          <Clock className="h-3 w-3" />
          Business Hours (7am–5pm)
        </button>
        <button
          onClick={() => setMode("afterhours")}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border"
          style={{
            borderRadius: "0 var(--radius-sm, 0.125rem) var(--radius-sm, 0.125rem) 0",
            backgroundColor:
              mode === "afterhours"
                ? "var(--primary)"
                : "var(--card)",
            color:
              mode === "afterhours"
                ? "var(--primary-foreground)"
                : "var(--muted-foreground)",
            borderColor: mode === "afterhours" ? "var(--primary)" : "var(--border)",
            transition: "background-color 60ms ease-out, color 60ms ease-out",
          }}
        >
          <Bot className="h-3 w-3" />
          After-Hours (5pm–7am + Weekends)
        </button>
      </div>

      {/* Diagram */}
      <div className="space-y-2">
        {/* Incoming call row */}
        <div className="flex items-center gap-2">
          <ArchNode
            icon={Phone}
            label="Incoming Call"
            sub="Caller dials Dean's Twilio number"
            variant="primary"
          />
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <ArchNode
            icon={Clock}
            label="Twilio Time Check"
            sub={mode === "business" ? "7am–5pm CST, Mon–Fri" : "Outside business hours"}
            variant={mode === "business" ? "step" : "warning"}
          />
        </div>

        {/* Arrow down */}
        <div className="flex items-center ml-[3.5rem]">
          <ArrowDown className="h-3.5 w-3.5 text-muted-foreground" />
        </div>

        {/* Routing outcome */}
        {mode === "business" ? (
          <div className="space-y-2">
            {/* Business hours: ring office first */}
            <div className="border-l-2 pl-3 space-y-2" style={{ borderColor: "color-mix(in oklch, var(--primary) 30%, transparent)" }}>
              <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Business hours routing
              </p>
              <div className="flex flex-wrap items-start gap-2">
                <ArchNode
                  icon={User}
                  label="Ring Office First"
                  sub="Sandra's desk line (15s)"
                  variant="step"
                />
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">Answered</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                    <ArchNode
                      icon={User}
                      label="Human Pickup"
                      sub="Sandra handles call"
                      variant="success"
                      compact
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">No answer</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                    <ArchNode
                      icon={Bot}
                      label="AI Overflow"
                      sub="Retell AI captures lead"
                      variant="primary"
                      compact
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {/* After-hours: direct to AI */}
            <div className="border-l-2 pl-3 space-y-2" style={{ borderColor: "color-mix(in oklch, var(--warning) 35%, transparent)" }}>
              <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                After-hours routing
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <ArchNode
                  icon={Bot}
                  label="Direct to AI Agent"
                  sub="Retell AI — after-hours greeting"
                  variant="primary"
                />
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <ArchNode
                  icon={Building2}
                  label="Lead Captured"
                  sub='Tagged after_hours: true in Sheets'
                  variant="success"
                />
              </div>
              <div
                className="px-3 py-2 text-xs mt-1 border"
                style={{
                  backgroundColor: "color-mix(in oklch, var(--warning) 6%, transparent)",
                  borderColor: "color-mix(in oklch, var(--warning) 20%, transparent)",
                  borderRadius: "var(--radius-sm, 0.125rem)",
                  color: "color-mix(in oklch, var(--warning) 70%, var(--foreground))",
                }}
              >
                After-hours greeting: &quot;Thanks for calling Schilling Paving. Our office is closed but I can take down your information so we can call you first thing in the morning.&quot;
              </div>
            </div>
          </div>
        )}

        {/* Config note */}
        <div
          className="px-3 py-2 text-xs border mt-2"
          style={{
            backgroundColor: "var(--muted)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius-sm, 0.125rem)",
            color: "var(--muted-foreground)",
          }}
        >
          Routing rules live in Twilio Studio — Dean&apos;s office manager can adjust business hours without touching any code.
        </div>
      </div>
    </div>
  );
}

function ArchNode({
  icon: Icon,
  label,
  sub,
  variant,
  compact = false,
}: {
  icon: React.ElementType;
  label: string;
  sub?: string;
  variant: "primary" | "step" | "success" | "warning";
  compact?: boolean;
}) {
  const styles: Record<typeof variant, { bg: string; border: string; text: string }> = {
    primary: {
      bg: "color-mix(in oklch, var(--primary) 10%, transparent)",
      border: "color-mix(in oklch, var(--primary) 30%, transparent)",
      text: "var(--primary)",
    },
    step: {
      bg: "var(--card)",
      border: "var(--border)",
      text: "var(--foreground)",
    },
    success: {
      bg: "color-mix(in oklch, var(--success) 8%, transparent)",
      border: "color-mix(in oklch, var(--success) 25%, transparent)",
      text: "var(--success)",
    },
    warning: {
      bg: "color-mix(in oklch, var(--warning) 8%, transparent)",
      border: "color-mix(in oklch, var(--warning) 25%, transparent)",
      text: "color-mix(in oklch, var(--warning) 80%, var(--foreground))",
    },
  };

  const s = styles[variant];

  return (
    <div
      className={`flex items-start gap-2 border ${compact ? "px-2 py-1" : "px-3 py-2"}`}
      style={{
        backgroundColor: s.bg,
        borderColor: s.border,
        borderRadius: "var(--radius-sm, 0.125rem)",
        minWidth: compact ? "7rem" : "8rem",
      }}
    >
      <Icon className={`${compact ? "h-3 w-3" : "h-3.5 w-3.5"} mt-0.5 shrink-0`} style={{ color: s.text }} />
      <div>
        <p className={`${compact ? "text-[10px]" : "text-xs"} font-semibold leading-tight`} style={{ color: s.text }}>
          {label}
        </p>
        {sub && (
          <p className="text-[10px] leading-tight mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
