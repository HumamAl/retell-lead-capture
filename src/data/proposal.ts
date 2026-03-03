import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline:
    "Full-stack developer who builds AI-powered lead capture systems for service businesses — voice agents, automation pipelines, and the ops dashboards that keep everything visible.",
  bio: "I build things that work in the real world — not just demos. For a system like this one (Retell + Twilio + Make.com), I build in your accounts from day one, document every configuration decision, and hand over something your office manager can actually maintain.",
  approach: [
    {
      title: "Understand",
      description:
        "Review your existing conversation flow docs and knowledge base before writing a single node. Ask the one question that clarifies the call script structure for all 6 scenarios.",
    },
    {
      title: "Build",
      description:
        "Live in your accounts — your Retell, your Twilio, your Make.com — from day one. No staging environment, no handoff surprises. You can watch every scenario take shape as I configure it.",
    },
    {
      title: "Test",
      description:
        "Run all 6 call scenarios Dean listed: standard estimate, commercial multi-service, after-hours, frustrated caller, out-of-scope, incomplete info. Confirmed working with call recordings you can replay.",
    },
    {
      title: "Hand Over",
      description:
        "Full documentation package — SIP config, Make.com scenario walkthroughs, Retell conversation flow map — plus a recorded training session your office manager can reference any time.",
    },
  ],
  skillCategories: [
    {
      name: "Voice AI",
      skills: [
        "Retell AI",
        "Conversation Flow Design",
        "Knowledge Base Configuration",
        "Call Transcript Processing",
      ],
    },
    {
      name: "Telephony",
      skills: [
        "Twilio SIP Trunking",
        "Call Routing",
        "Business Hours Logic",
        "After-Hours Handling",
      ],
    },
    {
      name: "Automation",
      skills: [
        "Make.com",
        "Webhook Configuration",
        "Multi-Step Scenarios",
        "Google Sheets API",
      ],
    },
    {
      name: "Frontend",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    },
    {
      name: "Integration",
      skills: [
        "REST APIs",
        "Webhook Design",
        "Data Pipeline",
        "n8n",
      ],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "lead-crm",
    title: "Lead Intake CRM",
    description:
      "Custom lead intake and automation system with public intake form, CRM dashboard, lead scoring, pipeline management, and automation rules engine — end-to-end from first contact to pipeline status.",
    outcome:
      "End-to-end lead flow — public intake form to scored pipeline with configurable automation rules",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    relevance:
      "Direct structural match: public intake, CRM dashboard, and a configurable automation rules engine are all core components of Dean's lead capture pipeline.",
  },
  {
    id: "wmf-agent",
    title: "WMF Agent Dashboard",
    description:
      "AI-powered automation pipeline for Windsor Metal Finishing. Email classification, RFQ data extraction with confidence scoring, and human-in-the-loop approval workflow. Webhook-driven from trigger to output.",
    outcome:
      "Replaced a 4-hour manual quote review process with a 20-minute structured extraction and approval flow",
    tech: ["Next.js", "TypeScript", "Claude API", "n8n", "Microsoft Graph"],
    liveUrl: "https://wmf-agent-dashboard.vercel.app",
    relevance:
      "Shows the same webhook-triggered automation pipeline pattern — trigger fires, data is extracted and routed, humans see what they need to see. Same architecture, different domain.",
  },
  {
    id: "ebay-pokemon-monitor",
    title: "eBay Pokemon Monitor",
    description:
      "Real-time listing monitor using the eBay Browse API — webhook-triggered Discord alerts fire the moment a matching listing appears, with price tracking across time.",
    outcome:
      "Real-time listing monitor with webhook-based Discord alerts and price trend tracking",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    liveUrl: "https://ebay-pokemon-monitor.vercel.app",
    relevance:
      "Best match for the Make.com reliability piece: event happens, webhook fires, alert is delivered. The same failure modes (missed triggers, retry logic, alert delivery confirmation) apply here.",
  },
  {
    id: "construction-iq",
    title: "ConstructionIQ",
    description:
      "Construction project intelligence platform with real-time project tracking, permit monitoring, supplier matching, and regional analytics across 8 markets. Built for the same industry Dean's in.",
    outcome:
      "Multi-region project intelligence dashboard tracking pipeline, permits, and supplier matches across 8 markets",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Recharts"],
    liveUrl: "https://construction-intel-ivory.vercel.app",
    relevance:
      "Same domain: construction operations, status tracking, and a dashboard that tells the owner what matters at a glance. Dean will recognize the vocabulary.",
  },
];
