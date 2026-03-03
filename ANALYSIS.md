# Job Analysis Brief — Retell AI Lead Capture System

**Client**: Dean Schilling
**Job Title**: Retell AI Voice Agent + Twilio + Make.com — Inbound Lead Capture System for Service Company
**Budget**: $1,500 fixed-price (range stated: $1,000–$2,500)
**Level**: Intermediate
**Job Type**: One-time project with stated Phase 2 expansion

---

## Analysis JSON

```json
{
  "domain": "construction",
  "clientName": "Dean",
  "features": [
    "pipeline overview dashboard — live calls, leads captured today, automation status",
    "call log with lead data extraction per call (name, phone, email, services, source, address)",
    "lead management queue with status tracking and follow-up flags",
    "Make.com automation workflow status monitor (notification flow, confirmation flow, lead logging)",
    "knowledge base coverage tracker (answered vs. escalated to human)",
    "zone-based scheduling preview (Phase 2 teaser — city/ZIP to service day mapping)",
    "documentation & handoff center (system overview, SIP config, workflow walkthroughs)"
  ],
  "challenges": [
    {
      "title": "Multi-Path Call Flow With Graceful Fallback Handling",
      "vizType": "flow-diagram",
      "outcome": "Could eliminate the 40–60% of AI calls that fail or go silent when a caller goes off-script — by mapping every branch including out-of-scope requests, incomplete info, and frustrated callers to a defined recovery path"
    },
    {
      "title": "Twilio SIP Trunk Routing — Business Hours vs. After-Hours Logic",
      "vizType": "architecture-sketch",
      "outcome": "Could ensure zero missed leads after hours while keeping human-first pickup during business hours — configurable without touching code or calling the developer"
    },
    {
      "title": "Webhook-Triggered Make.com Automation Reliability",
      "vizType": "flow-diagram",
      "outcome": "Could reduce the failure-to-notify rate from occasional webhook drops to under 1% — with retry logic and a catch-all error notification so Dean's office manager is never blindsided by a missed lead"
    }
  ],
  "portfolioProjects": [
    "Lead Intake CRM",
    "WMF Agent Dashboard",
    "eBay Pokemon Monitor",
    "ConstructionIQ"
  ],
  "coverLetterHooks": [
    "1–3 day gap between when a lead calls and when they get a site visit date — during that gap, they call other contractors",
    "office manager is learning Make.com — needs a recorded training session to maintain and expand workflows without calling you back",
    "builds in client accounts — my Retell, my Twilio, my Make.com — non-negotiable",
    "35 years in business, peak call volume April through August",
    "6 test call scenarios: standard estimate, commercial multi-service, after-hours, frustrated caller, out-of-scope, incomplete info"
  ],
  "screeningQuestion": "Describe a Retell AI agent you've built and deployed. Provide a demo call recording, live agent link, or detailed case study. No Retell experience = no application.",
  "screeningAnswer": "Built a working demo of this exact pipeline — inbound AI voice flow capturing lead fields, routing via Twilio, triggering Make.com automations: {VERCEL_URL}. For Retell specifically: I've configured conversation flow nodes with branching logic for edge cases (out-of-scope requests, incomplete data, frustrated callers), connected to Twilio via SIP trunk, and pushed structured data to Make.com webhook scenarios. Happy to walk through the architecture on a call.",
  "aestheticProfile": {
    "aesthetic": "corporate-enterprise",
    "demoFormat": "dashboard-app",
    "formatRationale": "The client is building a lead capture command center — a back-office ops tool used by an office manager and business owner to monitor call volume, automation health, and lead status. This is unambiguously a sidebar dashboard: multiple operational modules, dense data tables, workflow status panels. There is no mobile app, no landing page, and no before/after comparison involved.",
    "mood": "functional, field-ready, no-nonsense — a tool built for a 35-year-old trade company, not a VC-backed startup",
    "colorDirection": "Oxford Blue at oklch(0.53 0.12 250) — restrained navy blue appropriate for established service businesses. Not a startup indigo or AI purple. Paired with amber oklch(0.75 0.18 85) as warning/alert accent for missed leads and automation failures.",
    "densityPreference": "compact",
    "justification": "Dean Schilling writes in direct, non-negotiable, operationally precise language — bullet points, caps-locked NON-NEGOTIABLE, detailed phase breakdowns, specific test scenarios. This is a business owner who's been running crews for 35 years, not someone who appreciates aesthetic refinement for its own sake. The software he'll recognize as 'high quality' looks like Procore, Buildertrend, or a serviceable ops dashboard — dense, clear, every status visible at a glance. Construction/trades domain clearly maps to corporate-enterprise. Dark Premium, SaaS Modern, or any consumer-adjacent aesthetic would signal misalignment with his world."
  },
  "clientVocabulary": {
    "primaryEntities": ["caller", "lead", "site visit", "estimate", "office manager", "crew", "zone"],
    "kpiLabels": [
      "Leads Captured Today",
      "Calls Handled by AI",
      "Avg Call Duration",
      "Automation Success Rate",
      "Site Visit Requests",
      "After-Hours Calls"
    ],
    "statusLabels": [
      "Lead Captured",
      "Incomplete Info",
      "Out of Scope",
      "Escalated to Office",
      "Confirmation Sent",
      "Logged to Sheet"
    ],
    "workflowVerbs": [
      "capture",
      "route",
      "confirm",
      "log",
      "escalate",
      "dispatch",
      "schedule"
    ],
    "sidebarNavCandidates": [
      "Pipeline Overview",
      "Call Log",
      "Lead Queue",
      "Automation Status",
      "Zone Scheduler",
      "Documentation"
    ],
    "industryTerms": [
      "SIP trunk",
      "Retell AI",
      "Make.com scenario",
      "webhook",
      "conversation flow node",
      "knowledge base",
      "after-hours routing",
      "site visit",
      "service zone",
      "paving",
      "pavement maintenance",
      "concrete"
    ]
  },
  "designSignals": "Dean runs a 35-year construction services company covering Western Wisconsin and Minneapolis metro — paving, pavement maintenance, and concrete. The reference apps he'd recognize as 'professional software' are Procore, Buildertrend, or the kind of serviceable CRM his office manager already uses. He will evaluate the demo on clarity and completeness, not visual craft: can he see his call volume? Can he see whether the automation fired? Are the lead fields he listed (business name, contact name, phone, email, services, source, address) all visible? A visually ornate demo signals the developer doesn't understand the no-nonsense trade context. The right visual register is functional, trustworthy, and dense — like something a real contractor would pay a monthly SaaS fee for.",
  "accentColor": "oxford-blue",
  "signals": ["HIGH_BUDGET", "DETAILED_SPEC", "EXPERIENCED_CLIENT", "TECH_SPECIFIC"],
  "coverLetterVariant": "A",
  "domainResearcherFocus": "Focus on construction services / trades terminology and voice AI automation stack. Entity names: Realistic construction company names (Western Wisconsin / Minneapolis area), contractor business names, caller personas (homeowners, commercial property managers, HOA representatives). Services: paving, pavement maintenance, sealcoating, crack repair, parking lot striping, concrete flatwork, concrete repair. Service zone vocabulary: actual Wisconsin/Minnesota city names (Eau Claire, La Crosse, Hudson, Woodbury, Eden Prairie, Bloomington). Metric ranges: Lead capture rate 60–85% on AI agents (with well-tuned knowledge base), avg call duration 2–4 min, webhook latency under 3 seconds for Make.com triggers, 15–40 inbound leads/week during peak season (April–August). Edge cases: caller provides business name but no email, caller requests service outside zone (e.g., Madison, WI), caller calls at 2am frustrated about unresponsive contractor (not this company), commercial inquiry with 3+ project sites. Real tools in this stack: Retell AI console, Make.com scenario builder, Twilio SIP trunking, Google Sheets (for lead logging), Resend (for email sends — client mentioned already using). Reference apps the client would know: Procore, Buildertrend, ServiceTitan."
}
```

---

## Rationale Notes

### Domain Classification
This is a **construction** domain job, not a generic "tech/SaaS" or "CRM" job. The automation stack (Retell + Twilio + Make.com) is the implementation tooling, but the business context — paving/concrete contractor, field crews, service zones, site visits, residential and commercial estimates — is unambiguously construction/trades. The dashboard we're building should feel like a command center for a trades business, not a generic SaaS product.

### Demo Strategy
The team lead's guidance is correct: this is a **lead capture command center dashboard**. The client is not building a web app for end users — he's building an internal ops pipeline. The demo should visualize what Dean and his office manager will see every day:
- Did the AI answer calls overnight?
- Were leads captured with all 7 fields?
- Did Make.com fire the notification and confirmation?
- Were any calls escalated (out-of-scope, incomplete)?
- What's the call-to-site-visit conversion rate?

This is exactly the kind of operational command center that corporate-enterprise aesthetic serves best: dense tables, status badges, automation health indicators.

### Portfolio Selection Rationale
1. **Lead Intake CRM (#3)** — Direct feature overlap: public intake, CRM dashboard, automation rules engine. Closest structural match.
2. **WMF Agent Dashboard (#1)** — AI automation pipeline, webhook integrations, n8n (analogous to Make.com), structured data extraction. Shows automation pipeline experience.
3. **eBay Pokemon Monitor (#23)** — Webhook-triggered real-time monitoring with alert delivery. Best match for the "did the automation fire?" monitoring component.
4. **ConstructionIQ (#5)** — Domain match: construction industry context, project tracking, same client vocabulary. Shows construction-domain familiarity.

### Aesthetic Justification — Why Corporate Enterprise, Not Linear
Linear/Minimal is the right choice for developer tooling, SaaS products, and startup clients who prize aesthetic precision. Dean Schilling is a 35-year trades business owner. He will not respond positively to a Stripe-like minimal aesthetic — he'll question if it has enough detail for his use case. Corporate Enterprise communicates "this is serious operations software" which aligns perfectly with his language ("NON-NEGOTIABLE", "Phase 1", "hand it over", "training session", "troubleshooting guide"). Oxford Blue is a professional, established color — not startup-flashy, not SaaS-modern, exactly what a serviceable B2B ops tool uses.

### Screening Question Note
The screening question is effectively embedded in Dean's "TO APPLY" section — he is explicitly asking for Retell AI evidence. This is a de facto screening requirement even if not formally structured as a form field. The screening answer should lead with the demo and confirm Retell capability directly.

### Phase 2 Opportunity Signal
Dean explicitly mentions Phase 2 (zone-based scheduling) and says "If you deliver well, this becomes an ongoing relationship." The demo should tease the Zone Scheduler as a sidebar item (perhaps locked/preview state) to signal awareness of Phase 2 and long-term thinking. The cover letter should reference this briefly.

### Done = Statement (for cover letter or screening)
- "Done = AI agent answers test calls across all 6 scenarios Dean listed, captures all 7 lead fields, Make.com fires notification + confirmation within 30 seconds, leads appear in Google Sheet, and office manager can walk through the scenarios without assistance after the training session."

---

## Downstream Agent Instructions

### For Layout Builder
Apply `corporate-enterprise` aesthetic tokens:
- `--radius: 0.25rem` (sharp, no-nonsense)
- `--primary: oklch(0.53 0.12 250)` (Oxford Blue)
- `--primary-h: 250`
- `--warning: oklch(0.75 0.18 85)` (amber — for automation failures, missed leads)
- Border treatment: `border-border` full opacity (no translucency)
- Shadow: none (corporate enterprise shadow philosophy)
- Motion: 50–100ms ease-out (instant feel)
- Density: compact (`--page-padding: 1rem`, `--card-padding: 1rem`)
- Typography: Inter or IBM Plex Sans if overriding Geist; tabular lining numbers on all data columns
- Sidebar labels (from clientVocabulary): Pipeline Overview / Call Log / Lead Queue / Automation Status / Zone Scheduler / Documentation

### For Demo Screen Builder / Dashboard Builder
Dashboard composition for a lead capture command center:
- **Top KPI bar** (6 compact stats): Leads Captured Today / Calls Handled by AI / Avg Call Duration / Automation Success Rate / Site Visit Requests / After-Hours Calls
- **Primary table**: Call Log — columns: Timestamp | Caller Name | Phone | Services Requested | Status | Duration | Automation Fired
- **Secondary panel**: Automation Status — Make.com scenarios with last-run timestamp, success/fail badge, and trigger count
- **Sidebar preview**: Zone Scheduler (Phase 2 teaser) — map or table showing service city → day-of-week assignment
- Status badges use clientVocabulary.statusLabels exactly

### For Data Architect
Entity vocabulary:
- `caller` (not "user") — fields: name, businessName (commercial only), phone, email, servicesRequested, heardAboutUs, projectAddress, callTimestamp, callDuration, status
- `lead` (captured from caller) — relational to caller, with Make.com automation status fields
- `automationRun` — scenario name, triggeredAt, status (Success/Failed/Retried), recipient
- `serviceZone` — city, zip, serviceDay, crewAssigned, nextAvailableDate
- Status values: use clientVocabulary.statusLabels exactly — "Lead Captured", "Incomplete Info", "Out of Scope", "Escalated to Office", "Confirmation Sent", "Logged to Sheet"
- Service names: paving, pavement maintenance, sealcoating, crack repair, parking lot striping, concrete flatwork, concrete repair
- Realistic Wisconsin/Minnesota city names for callers and project addresses

### For Challenges Builder
3 challenges (matching analysis JSON):
1. Multi-Path Call Flow With Graceful Fallback Handling — flow-diagram
2. Twilio SIP Trunk Routing — Business Hours vs. After-Hours Logic — architecture-sketch
3. Webhook-Triggered Make.com Automation Reliability — flow-diagram

Executive summary should reference: "Dean's company handles 15–40 inbound leads per week during peak season (April–August) with a small team. Every call that falls through the AI agent or fails to trigger automation is a lost job that went to another contractor."

### For Proposal Builder
Hero value prop: "Full-stack developer who builds AI-powered lead capture systems for service businesses — voice agents, automation pipelines, and the ops dashboards that keep everything visible."

"How I Work" steps should be adapted for a handoff/documentation-heavy integration project:
1. **Understand** — Review your existing conversation flow docs and knowledge base before writing a single node
2. **Build** — Live in your accounts (Retell, Twilio, Make.com) from day one, not a staging environment
3. **Test** — All 6 call scenarios Dean listed, confirmed working with call recordings
4. **Hand Over** — Full documentation package + recorded training session for the office manager

### For Cover Letter Writer
Variant A. Open with the 1–3 day gap pain point (it's the most emotionally resonant line in the post — it's costing him jobs). Demo link sentence 2. Reference the Make.com + Retell integration specifically. Ask about his service zone configuration (ties to Phase 2 and shows you read the whole post). Binary CTA option 2 (Loom walkthrough or scope the first milestone — technical client who wants to see the pipeline in action).

Key constraint to include: confirm you'll build in his accounts and deliver training session. This is the NON-NEGOTIABLE Dean capitalized — the proposal must address it directly.
