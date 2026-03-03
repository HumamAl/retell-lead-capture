"use client";

import { useState } from "react";
import { Phone, GitBranch, CheckCircle, AlertCircle, UserX, MessageSquare, HelpCircle, ArrowRight } from "lucide-react";

interface FlowNode {
  id: string;
  label: string;
  sub?: string;
  type: "start" | "step" | "decision" | "success" | "warning" | "error";
  detail: string;
}

const nodes: FlowNode[] = [
  {
    id: "greeting",
    label: "Greeting",
    sub: "AI answers",
    type: "start",
    detail: "Retell AI answers: 'Thanks for calling Schilling Paving. I can help you get a free estimate — what type of work are you looking to have done?'",
  },
  {
    id: "service",
    label: "Service Inquiry",
    sub: "Identifies need",
    type: "step",
    detail: "Agent identifies the service type (sealcoating, driveway, parking lot, crack repair, etc.) and maps it to the knowledge base. In-scope requests proceed to field capture.",
  },
  {
    id: "capture",
    label: "Capture Fields",
    sub: "7 required fields",
    type: "step",
    detail: "Captures: contact name, callback phone, email, service requested, project address, referral source. Commercial callers also provide business name. Agent confirms each field before proceeding.",
  },
  {
    id: "edge",
    label: "Edge Case?",
    sub: "Branch point",
    type: "decision",
    detail: "The agent checks for 4 edge case conditions: out-of-scope service, incomplete info (hang-up or missing field), frustrated caller (elevated tone, repetitive), or question outside knowledge base.",
  },
];

const edgePaths: FlowNode[] = [
  {
    id: "oos",
    label: "Out of Scope",
    sub: "e.g. FDR with cement stabilization",
    type: "warning",
    detail: "Caller asks for a service Schilling Paving doesn't offer (e.g., concrete removal, FDR with cement stabilization). Agent: 'That's outside what we typically handle, but I can take down your info and have Dean reach out directly.' Lead captured with out-of-scope flag.",
  },
  {
    id: "incomplete",
    label: "Incomplete Info",
    sub: "Partial capture / hang-up",
    type: "warning",
    detail: "Caller provides name and phone but hangs up before giving address or email. Agent attempts recovery: 'I just need one more thing — your project address?' If caller disconnects, partial lead is saved with Incomplete status. Sandra calls back to complete the record.",
  },
  {
    id: "frustrated",
    label: "Frustrated Caller",
    sub: "Tone or repetition detected",
    type: "error",
    detail: "Retell detects elevated frustration (repeated answers, short phrases like 'just transfer me'). Agent de-escalates: 'I want to make sure Dean's team can help you right away. Let me get your name and number so he can call you directly.' Routes to Call Back Required.",
  },
];

const successNode: FlowNode = {
  id: "complete",
  label: "Lead Captured",
  sub: "Webhook fires to Make.com",
  type: "success",
  detail: "All 7 fields captured and confirmed. Call ends, Retell posts webhook to Make.com within seconds. Three parallel scenarios fire: (1) SMS + email to Sandra, (2) confirmation to caller, (3) row logged to Google Sheets.",
};

const colors: Record<FlowNode["type"], { bg: string; border: string; text: string }> = {
  start: {
    bg: "color-mix(in oklch, var(--primary) 10%, transparent)",
    border: "color-mix(in oklch, var(--primary) 30%, transparent)",
    text: "var(--primary)",
  },
  step: {
    bg: "var(--card)",
    border: "var(--border)",
    text: "var(--foreground)",
  },
  decision: {
    bg: "color-mix(in oklch, var(--warning) 10%, transparent)",
    border: "color-mix(in oklch, var(--warning) 30%, transparent)",
    text: "color-mix(in oklch, var(--warning) 80%, var(--foreground))",
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
  error: {
    bg: "color-mix(in oklch, var(--destructive) 8%, transparent)",
    border: "color-mix(in oklch, var(--destructive) 25%, transparent)",
    text: "var(--destructive)",
  },
};

const icons: Record<string, React.ElementType> = {
  greeting: Phone,
  service: MessageSquare,
  capture: CheckCircle,
  edge: GitBranch,
  oos: HelpCircle,
  incomplete: AlertCircle,
  frustrated: UserX,
  complete: CheckCircle,
};

function FlowNodeBox({
  node,
  isSelected,
  onClick,
}: {
  node: FlowNode;
  isSelected: boolean;
  onClick: () => void;
}) {
  const c = colors[node.type];
  const Icon = icons[node.id] ?? CheckCircle;

  return (
    <button
      onClick={onClick}
      className="flex items-start gap-2 px-3 py-2 text-left w-full border cursor-pointer"
      style={{
        backgroundColor: isSelected
          ? "color-mix(in oklch, var(--primary) 8%, transparent)"
          : c.bg,
        borderColor: isSelected ? "var(--primary)" : c.border,
        borderRadius: "var(--radius-sm, 0.125rem)",
        borderWidth: isSelected ? "1.5px" : "1px",
        transition: "background-color 60ms ease-out, border-color 60ms ease-out",
        minWidth: "7rem",
      }}
    >
      <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: c.text }} />
      <div>
        <p className="text-xs font-semibold leading-tight" style={{ color: c.text }}>
          {node.label}
        </p>
        {node.sub && (
          <p className="text-[10px] leading-tight mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {node.sub}
          </p>
        )}
      </div>
    </button>
  );
}

export function CallFlowViz() {
  const [selected, setSelected] = useState<FlowNode | null>(null);

  const toggle = (node: FlowNode) => {
    setSelected((prev) => (prev?.id === node.id ? null : node));
  };

  return (
    <div className="space-y-3">
      {/* Instruction */}
      <p className="text-[11px] text-muted-foreground">
        Click any node to see the logic at that branch point
      </p>

      {/* Main happy path — horizontal */}
      <div className="flex flex-wrap items-center gap-1.5">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center gap-1.5">
            <FlowNodeBox
              node={node}
              isSelected={selected?.id === node.id}
              onClick={() => toggle(node)}
            />
            {i < nodes.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Edge case branches — from the decision node */}
      <div className="ml-4 border-l-2 pl-3 space-y-1.5" style={{ borderColor: "color-mix(in oklch, var(--warning) 30%, transparent)" }}>
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-1">
          Edge case paths
        </p>
        <div className="flex flex-wrap gap-1.5">
          {edgePaths.map((node) => (
            <FlowNodeBox
              key={node.id}
              node={node}
              isSelected={selected?.id === node.id}
              onClick={() => toggle(node)}
            />
          ))}
        </div>
      </div>

      {/* Success node */}
      <div className="flex items-center gap-1.5">
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-1" />
        <FlowNodeBox
          node={successNode}
          isSelected={selected?.id === successNode.id}
          onClick={() => toggle(successNode)}
        />
      </div>

      {/* Detail panel */}
      {selected && (
        <div
          className="p-3 border text-sm leading-relaxed"
          style={{
            backgroundColor: "var(--muted)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius-sm, 0.125rem)",
            transition: "opacity 60ms ease-out",
          }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "var(--primary)" }}>
            {selected.label}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">{selected.detail}</p>
        </div>
      )}
    </div>
  );
}
