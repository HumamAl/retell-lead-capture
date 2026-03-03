import type { Challenge } from "@/lib/types";

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most developers wire up a Retell AI agent, connect it to a Twilio number, and call it done — leaving edge cases (off-script callers, after-hours routing gaps, webhook drop-outs) as the client's problem to discover in production.",
  differentApproach:
    "I build the full failure map first: every conversation branch, every routing rule, every Make.com retry path — then configure the agent. Dean's company handles 15–40 inbound leads per week during peak season (April–August) with a small team. Every call that falls through the AI agent or fails to trigger automation is a lost job that went to another contractor.",
  accentWord: "full failure map",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Multi-Path Call Flow With Graceful Fallback Handling",
    description:
      "Most AI voice agents are built for the happy path — caller says what they need, agent captures the fields, done. But 40–60% of real inbound calls deviate: callers go off-script, give partial info, get frustrated, or ask questions outside the agent's knowledge base. Without defined fallback nodes for each branch, the call goes silent or the agent loops — and the caller hangs up.",
    visualizationType: "flow",
    outcome:
      "Could eliminate the 40–60% of AI calls that fail or go silent when a caller goes off-script — by mapping every branch including out-of-scope requests, incomplete info, and frustrated callers to a defined recovery path",
  },
  {
    id: "challenge-2",
    title: "Twilio SIP Trunk Routing — Business Hours vs. After-Hours Logic",
    description:
      "Dean's office is staffed 7am–5pm CST, Monday–Friday. But homeowners call evenings, weekends, and early mornings — times when the AI agent should handle the call directly rather than ring an unmanned office. The routing logic lives in Twilio's SIP configuration, and setting it up incorrectly means either missed after-hours leads or the AI intercepting calls during business hours when Sandra can answer.",
    visualizationType: "architecture",
    outcome:
      "Could ensure zero missed leads after hours while keeping human-first pickup during business hours — configurable without touching code or calling the developer",
  },
  {
    id: "challenge-3",
    title: "Webhook-Triggered Make.com Automation Reliability",
    description:
      "When Retell AI finishes a call, it posts a webhook to Make.com — which then fans out to three parallel scenarios: notify Sandra (Office Manager) via SMS + email, send caller confirmation, and log the lead to Google Sheets. Webhooks occasionally drop, Make.com scenarios occasionally fail. Without retry logic and error routing, a single webhook failure means Sandra never gets the lead notification and Dean's team starts the next business day blind.",
    visualizationType: "flow",
    outcome:
      "Could reduce the failure-to-notify rate from occasional webhook drops to under 1% — with retry logic and a catch-all error notification so Dean's office manager is never blindsided by a missed lead",
  },
];
