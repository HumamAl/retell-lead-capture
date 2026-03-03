"use client";

import { useState } from "react";
import { PhoneOff, Webhook, Workflow, Mail, MessageSquare, Sheet, RefreshCw, AlertTriangle, ChevronRight, ChevronLeft } from "lucide-react";

interface PipelineStep {
  id: string;
  label: string;
  sub: string;
  icon: React.ElementType;
  detail: string;
  variant: "primary" | "step" | "success" | "warning" | "error";
}

const steps: PipelineStep[] = [
  {
    id: "call-end",
    label: "Retell Call Complete",
    sub: "Call ends, data captured",
    icon: PhoneOff,
    detail: "Retell AI finishes the call and prepares a structured JSON payload: caller name, phone, email, services requested, project address, referral source, call duration, transcript link, and after_hours flag.",
    variant: "primary",
  },
  {
    id: "webhook",
    label: "Webhook Fired",
    sub: "POST to Make.com endpoint",
    icon: Webhook,
    detail: "Retell posts the payload to Make.com's webhook URL within ~3 seconds of call end. The webhook URL is configured in the Retell agent settings. If Make.com is temporarily unavailable, Retell retries automatically up to 3 times.",
    variant: "step",
  },
  {
    id: "make",
    label: "Make.com Receives",
    sub: "Triggers 3 parallel scenarios",
    icon: Workflow,
    detail: "Make.com's webhook module receives the payload and fans out to three parallel scenario paths. Each scenario runs independently — a failure in one path does not block the others. Error handling is configured per scenario.",
    variant: "step",
  },
];

const parallelPaths: Array<{
  id: string;
  label: string;
  sub: string;
  icon: React.ElementType;
  variant: "success";
  detail: string;
}> = [
  {
    id: "notify",
    label: "Lead Notification",
    sub: "Email + SMS to Sandra",
    icon: Mail,
    variant: "success",
    detail: "Scenario 1: Sends an SMS and email to Sandra (Office Manager) with the lead summary. Includes: caller name, phone, service requested, and project address. Fires within 15–30 seconds of call end. Uses Resend for email, Twilio Messaging for SMS.",
  },
  {
    id: "confirm",
    label: "Caller Confirmation",
    sub: "SMS + email to caller",
    icon: MessageSquare,
    variant: "success",
    detail: "Scenario 2: Sends a confirmation to the caller — 'Thank you for calling Schilling Paving. We received your request for [service] at [address] and will be in touch within 1 business day.' Builds trust and reduces repeat calls.",
  },
  {
    id: "log",
    label: "Lead Logging",
    sub: "Row written to Google Sheets",
    icon: Sheet,
    variant: "success",
    detail: "Scenario 3: Writes a row to Dean's Google Sheet: timestamp, name, phone, email, service type, address, referral source, call duration, transcript link, after_hours flag. This is Dean's persistent lead record, visible to the whole office.",
  },
];

const retryNode = {
  id: "retry",
  label: "Retry + Error Alert",
  sub: "Catch-all failure handler",
  icon: RefreshCw,
  detail: "Each scenario has a built-in retry path: if the first attempt fails, Make.com retries up to 3 times with exponential backoff (15s, 60s, 5min). If all retries fail, a catch-all scenario fires an alert SMS to Sandra: 'Warning: lead notification failed for [caller name]. Manual review needed.' This ensures no lead is silently lost.",
  variant: "warning" as const,
};

const variantStyles: Record<string, { bg: string; border: string; text: string }> = {
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
    text: "color-mix(in oklch, var(--warning) 70%, var(--foreground))",
  },
  error: {
    bg: "color-mix(in oklch, var(--destructive) 8%, transparent)",
    border: "color-mix(in oklch, var(--destructive) 25%, transparent)",
    text: "var(--destructive)",
  },
};

function PipelineNode({
  label,
  sub,
  icon: Icon,
  variant,
  active,
}: {
  label: string;
  sub: string;
  icon: React.ElementType;
  variant: string;
  active: boolean;
}) {
  const s = variantStyles[variant] ?? variantStyles.step;

  return (
    <div
      className="flex items-start gap-2 px-3 py-2 border"
      style={{
        backgroundColor: active ? s.bg : "var(--card)",
        borderColor: active ? s.border : "var(--border)",
        borderRadius: "var(--radius-sm, 0.125rem)",
        borderWidth: active ? "1.5px" : "1px",
        transition: "background-color 60ms ease-out, border-color 60ms ease-out",
        minWidth: "9rem",
        opacity: active ? 1 : 0.55,
      }}
    >
      <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: active ? s.text : "var(--muted-foreground)" }} />
      <div>
        <p className="text-xs font-semibold leading-tight" style={{ color: active ? s.text : "var(--muted-foreground)" }}>
          {label}
        </p>
        <p className="text-[10px] leading-tight mt-0.5 text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

const allStepIds = [
  "call-end",
  "webhook",
  "make",
  "notify",
  "confirm",
  "log",
  "retry",
];

export function AutomationReliabilityViz() {
  const [activeStep, setActiveStep] = useState(0);

  const currentId = allStepIds[activeStep];
  const totalSteps = allStepIds.length;

  const getDetail = (id: string): { label: string; detail: string } | null => {
    const found =
      steps.find((s) => s.id === id) ??
      parallelPaths.find((s) => s.id === id) ??
      (id === "retry" ? retryNode : null);
    return found ? { label: found.label, detail: found.detail } : null;
  };

  const isActive = (id: string) => id === currentId;

  const current = getDetail(currentId);

  return (
    <div className="space-y-3">
      {/* Step counter */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-muted-foreground">
          Step {activeStep + 1} of {totalSteps} — follow the pipeline
        </p>
        <div className="flex items-center gap-1">
          {allStepIds.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className="h-1.5 rounded-full"
              style={{
                width: i === activeStep ? "1.25rem" : "0.375rem",
                backgroundColor: i === activeStep ? "var(--primary)" : "var(--border)",
                transition: "width 60ms ease-out, background-color 60ms ease-out",
              }}
            />
          ))}
        </div>
      </div>

      {/* Pipeline diagram */}
      <div className="space-y-2">
        {/* Main pipeline: call-end → webhook → make */}
        <div className="flex flex-wrap items-center gap-1.5">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-1.5">
              <PipelineNode
                label={step.label}
                sub={step.sub}
                icon={step.icon}
                variant={step.variant}
                active={isActive(step.id)}
              />
              {i < steps.length - 1 && (
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Parallel fan-out from Make.com */}
        <div
          className="ml-4 border-l-2 pl-3 space-y-1.5"
          style={{ borderColor: "color-mix(in oklch, var(--success) 30%, transparent)" }}
        >
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            3 parallel scenarios
          </p>
          <div className="flex flex-wrap gap-1.5">
            {parallelPaths.map((path) => (
              <PipelineNode
                key={path.id}
                label={path.label}
                sub={path.sub}
                icon={path.icon}
                variant={path.variant}
                active={isActive(path.id)}
              />
            ))}
          </div>
        </div>

        {/* Retry / error path */}
        <div
          className="ml-4 border-l-2 pl-3"
          style={{ borderColor: "color-mix(in oklch, var(--warning) 35%, transparent)" }}
        >
          <PipelineNode
            label={retryNode.label}
            sub={retryNode.sub}
            icon={retryNode.icon}
            variant={retryNode.variant}
            active={isActive(retryNode.id)}
          />
        </div>
      </div>

      {/* Detail panel */}
      {current && (
        <div
          className="p-3 border"
          style={{
            backgroundColor: "var(--muted)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius-sm, 0.125rem)",
          }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "var(--primary)" }}>
            {current.label}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">{current.detail}</p>
        </div>
      )}

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
          disabled={activeStep === 0}
          className="flex items-center gap-1 text-xs font-medium px-2 py-1 border disabled:opacity-30"
          style={{
            borderRadius: "var(--radius-sm, 0.125rem)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
            transition: "background-color 60ms ease-out",
          }}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Previous
        </button>
        <span className="text-[10px] text-muted-foreground">
          {activeStep < totalSteps - 1 ? "Step through each stage →" : "Full pipeline covered"}
        </span>
        <button
          onClick={() => setActiveStep((p) => Math.min(totalSteps - 1, p + 1))}
          disabled={activeStep === totalSteps - 1}
          className="flex items-center gap-1 text-xs font-medium px-2 py-1 border disabled:opacity-30"
          style={{
            borderRadius: "var(--radius-sm, 0.125rem)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
            transition: "background-color 60ms ease-out",
          }}
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
