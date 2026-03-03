# Domain Knowledge Brief — Paving, Pavement Maintenance & Concrete Services (Voice AI Lead Capture)

## Sub-Domain Classification

Small established paving and pavement maintenance contractor (2-5 crews, 1-3 office staff, $800K-$3M annual revenue). Full-service: new asphalt paving, pavement maintenance (sealcoating, crack filling, line striping), and concrete work for residential driveways and commercial parking lots. Service area: Western Wisconsin (La Crosse, Eau Claire, Chippewa Valley) and Minneapolis/St. Paul metro. Peak season: April–August. Off-season: November–March (minimal inbound volume). Specific client: Dean Schilling, owner-operator, ~35 years in business.

---

## Job Analyst Vocabulary — Confirmed and Extended

The Job Analyst brief noted: voice AI pipeline, lead capture, SIP integration, Make.com automation, webhook workflows, Google Sheets logging. This brief extends with the paving industry's operational vocabulary that must appear across all UI labels.

### Confirmed Primary Entity Names

These are the exact words that must appear in sidebar nav, table headers, KPI card titles, status badges, and search placeholders:

- Primary record type: **Lead** (not "inquiry", not "contact", not "prospect" — paving companies call incoming phone inquiries "leads")
- Caller type residential: **Homeowner** (not "residential customer")
- Caller type commercial: **Property Manager** or **Facility Manager** (commercial clients are almost never "owners" — they manage the property)
- Services: use exact trade names — "Sealcoating", "Crack Filling", "Line Striping", "Asphalt Overlay", "Full Depth Reclamation", "Pothole Repair", "Concrete Work"
- Service area zones: **Zone** (Dean's territory has a geographic routing need — each zone = a service radius from a dispatch point)
- Estimates: **Estimate** or **Quote** (not "proposal", not "bid" for residential; commercial uses "bid")
- The pipeline stage before booking a site visit: **Estimate Request** (not "appointment")
- Scheduled visit: **Site Visit** (not "appointment", not "meeting")
- The person answering the phone / routing leads: **Office Manager** (this is the role receiving notifications)

### Expanded KPI Vocabulary

These are the metrics a paving company owner/office manager actually tracks:

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Calls Answered | Total inbound calls handled (AI or human) | count |
| Leads Captured | Calls where lead data was fully collected | count |
| Capture Rate | Leads Captured / Calls Answered | % |
| Estimate Requests | Leads that requested a site visit/quote | count |
| Conversion Rate | Estimate Requests / Leads Captured | % |
| Response Time | Time from call end to office notification | seconds/minutes |
| After-Hours Captures | Leads captured outside 7am-5pm CST | count |
| Missed Call Recovery | After-hours calls captured vs. abandoned | % |
| Lead-to-Estimate | Leads that converted to a scheduled estimate | % |
| Estimate-to-Close | Estimates that turned into booked jobs | % |
| Avg. Project Value | Mean quoted project amount | $ |
| Peak Day Volume | Highest single-day call count | count |

### Status Label Vocabulary

Exact status strings for the lead pipeline — these go directly into data tables, badges, and filter dropdowns:

**Active pipeline states:**
- `New` — Call just captured, data logged, notification sent
- `Estimate Scheduled` — Office manager booked a site visit
- `Estimate Sent` — Quote delivered to caller (email/mail)
- `Following Up` — Awaiting response from caller after estimate

**Decision states:**
- `Booked` — Job accepted, added to crew schedule
- `Declined` — Caller received estimate but chose another contractor
- `No Response` — Estimate sent, no reply after 5+ days

**Problem/exception states:**
- `Outside Service Area` — Caller location not in Western WI / Minneapolis metro
- `Incomplete` — Call ended before all required fields captured (partial data)
- `Duplicate` — Same phone number called multiple times; merged records
- `Call Back Required` — AI could not handle; needs human follow-up

**Seasonal states:**
- `Waitlisted` — Booked but scheduled into the next season's queue (common in spring backlog)
- `Weather Hold` — Job delayed due to temperature or precipitation restrictions

### Workflow and Action Vocabulary

Verbs used in this domain for button labels, action menu items, empty state messages:

- Primary actions: **Schedule Estimate**, **Send Quote**, **Book Job**, **Mark Closed**, **Follow Up**, **Route to Office**
- Secondary actions: **Merge Duplicate**, **Update Service Area**, **Reassign Zone**, **Add Note**, **Flag for Review**
- AI-specific actions: **Review Transcript**, **Replay Call**, **Re-trigger Notification**, **Export to Sheet**

### Sidebar Navigation Candidates

Domain-specific nav items — NOT generic labels:

- **Lead Pipeline** (not "Dashboard" — this is the primary view for an inbound lead capture tool)
- **Call Log** (timestamped log of all AI-handled calls with transcript links)
- **Estimate Queue** (leads that have been qualified and are awaiting site visit scheduling)
- **Automation Status** (Make.com scenario health — shows last run, success/fail per workflow)
- **Service Zones** (map or list of geographic service zones for routing site visits)
- **Seasonal Analytics** (call volume trends by month, showing the April-August paving season pattern)

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

Paving contractors and their office managers are practical, no-nonsense operators. They spend their days in truck cabs and on job sites, not in front of computers. Their software expectations are set by tools like QuickBooks (their billing software), Google Sheets (their lead tracker), and basic email/SMS. Premium, to them, does not mean visually complex or dense — it means clear, fast, and functional.

The most important visual signal in this space is **clarity under volume**. During peak season (May-August), a busy week might have 40+ leads coming in. The office manager needs to triage at a glance. Status badges with high-contrast colors (green = booked, amber = following up, red = incomplete) communicate faster than prose. A pipeline view that shows every lead's current stage without clicking into it is valued over a CRM with 50 fields.

The secondary signal is **professional credibility**. This is Dean's pitch to his own clients — commercial property managers, facility directors, and homeowners who are writing $3K-$50K+ checks. The tool should look like something a legitimate regional contractor uses, not a free Google Form and a sticky note.

This is a **field service / home services** aesthetic context. Think: Jobber, Housecall Pro, ServiceTitan (though those are overkill for Dean's scale). Clean, functional, mobile-responsive. Card-based pipeline with badge statuses. Not a financial terminal. Not a healthcare EHR. Warm but professional — this is a family business, not a corporation.

### Real-World Apps Clients Would Recognize as "Premium"

1. **Jobber** — The go-to field service management app for contractors at Dean's scale. Card-based lead/job pipeline, mobile-friendly, status badges everywhere. Dean has likely seen or used Jobber. A demo that feels like a purpose-built Jobber for paving with voice AI integration would land immediately.

2. **Housecall Pro** — Similar to Jobber, used by HVAC, plumbing, and paving contractors. Emphasizes the "call → estimate → job" funnel clearly. Visual pipeline stages are a signature element.

3. **PavementSoft / Bitumio** — Niche paving-specific software. Less polished than Jobber, but understood by paving shop owners. If Dean has explored paving software, he's likely seen these. A demo that looks cleaner than PavementSoft but shares its paving vocabulary is a strong signal.

### Aesthetic Validation

- **Job Analyst chose**: SaaS Modern (likely) — appropriate for a tech-forward automation tool
- **Domain validation**: Confirmed with adjustment. SaaS Modern is correct — this is a software tool for a service business, not the service business itself. The voice AI + automation angle is tech product-like. However, density should be slightly reduced from typical SaaS Modern: Dean is not a software power user. Card-based pipeline over dense data tables. Warm secondary color accent (optional) — this is a family/regional business, not a tech startup. Avoid overly clinical blues; a slate-blue or teal-forward primary reads professional for this sector.
- **One adjustment**: Slightly warmer than default SaaS Modern. Consider a teal or slate-blue primary rather than pure corporate blue. The company has 35 years of local history — warmth matters.

### Format Validation

- **Job Analyst chose**: dashboard-app (most likely)
- **Domain validation**: Confirmed — this is an inbound lead capture pipeline dashboard. An ops tool for the office manager and owner to monitor AI-handled calls. Sidebar + pipeline dashboard is the exact right format. Mobile-app-preview would be wrong (this is an ops tool, not consumer). Admin-console would be too dense for a 2-person office team.
- **Format-specific design notes**: The main dashboard should lead with KPI cards (calls today, leads captured, conversion rate), followed by the live lead pipeline table/list, followed by a call volume trend chart (monthly, showing the seasonal April-August paving season spike). The sidebar should reflect the pipeline metaphor, not generic analytics labels.

### Density and Layout Expectations

Standard density — not compact, not spacious. Paving contractors are not power users, so overwhelming them with information is counterproductive. The lead pipeline view should prioritize scannability: status badge, caller name, service requested, and phone number visible without horizontal scrolling.

This domain tends toward **list-heavy views** (lead table/queue) rather than card-heavy views. Cards work for the top KPI row. The main content area is a sortable, filterable table of leads with inline status badges.

---

## Entity Names (10+ realistic names)

### Companies / Organizations (commercial clients)

Western WI and Minneapolis metro flavor — regional Midwest business names:

1. Ridgecrest Property Management (commercial property manager, Eau Claire WI)
2. Lakeland Business Park LLC (commercial lot, La Crosse WI)
3. Valley Crossing Shopping Center (retail strip, Onalaska WI)
4. Northside Industrial Park (manufacturing/warehouse, Menomonie WI)
5. Chippewa Commons HOA (homeowners association, Chippewa Falls WI)
6. Prairie Gateway Apartments (multifamily complex, Hudson WI)
7. River Bluff Church (nonprofit, Winona MN)
8. Blaine Square Commercial (retail, Blaine MN)
9. Stillwater Commons (mixed-use, Stillwater MN)
10. Elk River Fleet Services (commercial, Elk River MN)
11. Maple Grove Plaza Management (retail, Maple Grove MN)
12. Dells Industrial Group (commercial, Wisconsin Dells WI)

### People Names (callers — homeowners and property managers)

Regional Midwest naming conventions:

Homeowners: Randy Kowalczyk, Brenda Olson, Tom Halverson, Diane Schroeder, Mike Gunderson, Patty Kaminski, Gary Westphal, Carol Brekke, Jim Thorsen, Dave Hagen

Property Managers / Facility Managers: Kyle Lindstrom (Ridgecrest PM), Sharon Nystrom (Valley Crossing), Brett Hanson (Lakeland Business Park), Jenna Mikkelsen (Prairie Gateway), Todd Mayer (Northside Industrial), Amy Bergstrom (Chippewa Commons HOA)

Office Staff (Dean's team): Dean Schilling (Owner), Sandra Prill (Office Manager), Ryan Schilling (Salesperson)

### Services / Products

Exact service names used in paving trade quotes and work orders:

1. Residential Driveway — Full Replacement (asphalt)
2. Residential Driveway — Overlay (1.5" asphalt overlay over existing base)
3. Commercial Parking Lot — Full Depth Reclamation
4. Commercial Parking Lot — Mill & Overlay
5. Sealcoating — Residential Driveway
6. Sealcoating — Commercial Parking Lot
7. Crack Filling — Hot Pour Rubberized
8. Crack Sealing — Routing & Sealing
9. Pothole Repair — Infrared Patching
10. Line Striping — Parking Stall Layout
11. Line Striping — ADA Compliance Restripe
12. Concrete Apron — Driveway Approach
13. Concrete Curb & Gutter — Commercial
14. Concrete Flat Work — Sidewalk / Pad

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Inbound calls per week (peak season) | 8 | 22 | 45 | April–August; drops to 2-5/week off-season |
| Inbound calls per week (off-season) | 1 | 4 | 9 | Nov–March; mostly existing customer inquiries |
| After-hours calls captured (as % of total) | 12% | 28% | 41% | Many homeowners call evenings/weekends |
| Lead capture rate (AI-handled calls) | 62% | 79% | 91% | Partial captures from caller hang-ups skew low |
| Lead-to-estimate conversion | 45% | 61% | 78% | Depends on location fit and project size |
| Estimate-to-close rate | 28% | 42% | 68% | Referrals close highest; cold leads lowest |
| Residential driveway (sealcoat only) | $285 | $440 | $780 | Based on ~500-1,500 sq ft |
| Residential driveway (full replacement) | $3,800 | $7,200 | $14,500 | Size and base prep drive variance |
| Commercial sealcoat (parking lot) | $1,200 | $4,800 | $18,000 | Per visit; 10K-80K sq ft range |
| Commercial lot (mill & overlay) | $22,000 | $48,000 | $115,000 | Depends on area and depth |
| Crack filling (per job) | $180 | $420 | $1,100 | Linear footage varies widely |
| Line striping (per job) | $380 | $875 | $4,200 | Stall count; ADA adds cost |
| AI call handling time (per call) | 90s | 2m 40s | 5m 10s | Complex service questions extend duration |
| Notification delivery time (Make.com) | 8s | 22s | 75s | Webhook → SMS+email round trip |
| Leads per paving season (full year) | 140 | 310 | 580 | Small 2-crew to busy 4-crew operation |

---

## Industry Terminology Glossary (15+ terms)

| Term | Definition | Usage Context |
|------|-----------|---------------|
| Sealcoating | Protective coal-tar or asphalt emulsion applied to asphalt surface to resist oxidation, water, and UV damage | Service type; recommended every 2-3 years |
| Crack Filling | Filling asphalt cracks with rubberized hot-pour filler to prevent water infiltration | Maintenance service; separate from sealcoating |
| Crack Sealing | More thorough crack repair: routing the crack then sealing with polymer material | Higher-end repair for wide or moving cracks |
| Line Striping / Pavement Marking | Painted or thermoplastic markings for parking stalls, fire lanes, ADA spaces, crosswalks | Often requested alongside sealcoating |
| Asphalt Overlay | New layer of asphalt applied over existing pavement when base is sound | Cost-effective alternative to full replacement |
| Mill & Overlay | Existing surface milled off (ground up), new asphalt laid | Commercial standard for worn lots with good base |
| Full Depth Reclamation (FDR) | Entire pavement and base ground up, mixed, recompacted as new base | Heavy-duty commercial/industrial lots |
| Infrared Patching | Heating existing asphalt, raking, and recompacting for seamless pothole repair | Fast, less visible than cold-patch |
| Alligator Cracking | Interconnected web of surface cracks resembling alligator skin; indicates base failure | Diagnostic term; signals need for more than sealcoat |
| Birdbath | Small low spot or depression that holds water | Diagnostic term; water infiltration risk |
| ADA Compliance | Americans with Disabilities Act requirements for accessible parking, ramps, markings | Compliance driver for commercial clients |
| Tack Coat | Adhesive asphalt emulsion applied before overlay to bond layers | Mentioned in commercial estimates |
| Paving Season | The warm-weather window when asphalt work is feasible — typically April–October in Wisconsin/MN | Seasonal planning term |
| Spring Thaw | Post-winter period when frost leaves ground; reveals winter damage, triggers paving calls | Seasonal demand driver |
| Aggregate | Gravel/stone component of asphalt mix; type affects durability and surface texture | Used in technical estimates |
| SIP Trunk | Session Initiation Protocol channel connecting Twilio phone system to Retell AI voice agent | Tech integration term for this project |
| Webhook | HTTP callback triggered when Retell AI call ends, passing data to Make.com | Automation term for this project |
| Make Scenario | Make.com automation workflow with defined trigger → action sequence | Automation term; replaces "workflow" in Make context |
| Conversation Node | Retell AI agent conversation tree step — each node handles a specific question or response | Retell AI configuration term |
| Call Transcript | Full text record of the AI-caller conversation | Stored per lead for office review |
| Google Sheets Log | The destination spreadsheet where Make.com writes each captured lead | Part of Dean's existing tech stack |

---

## Common Workflows

### Workflow 1: Inbound Lead Capture (AI-Handled Call)

This is the primary system being built. Every step maps to a system component.

1. Homeowner or property manager dials Dean's Twilio number
2. During business hours (7am-5pm CST Mon-Fri): Twilio SIP routes to Retell AI voice agent
3. Retell AI agent greets caller, asks for service type needed
4. Agent captures: business/property name (if commercial), contact name, callback phone, email address, service type requested, project address, referral source ("How did you hear about us?")
5. Agent confirms captured data with caller, thanks them, explains next steps ("Someone from our team will call you within 1 business day to schedule a site visit")
6. Call ends → Retell posts webhook payload to Make.com
7. Make.com Scenario 1: Sends notification SMS + email to Sandra (Office Manager) with lead summary
8. Make.com Scenario 2: Sends confirmation SMS + email to caller ("Thank you for calling Schilling Paving — we'll be in touch within 1 business day")
9. Make.com Scenario 3: Logs lead row to Google Sheets (columns: timestamp, name, phone, email, service, address, referral source, call duration, transcript link)
10. Office Manager calls back during business hours to schedule site visit

### Workflow 2: After-Hours Call Handling

1. Caller dials after 5pm CST or on weekends
2. Twilio detects outside business hours → routes to Retell AI after-hours agent
3. After-hours agent has a different opening: "Thanks for calling Schilling Paving. Our office is closed but I can take down your information so we can call you first thing in the morning."
4. Same data capture as standard workflow
5. Same Make.com notification — but Sandra gets it the next business morning
6. Lead tagged with `after_hours: true` and `captured_at: [timestamp]` in Google Sheets

### Workflow 3: Site Visit Estimate Request (Phase 2 concept)

1. Office Manager reviews lead in dashboard
2. Selects lead, clicks "Schedule Estimate"
3. System checks zone availability (Dean's crew coverage area by ZIP code)
4. Suggests available dates based on crew schedule
5. Office Manager confirms date with caller via phone
6. Site visit scheduled; job card moves to "Estimate Scheduled"
7. After site visit: estimate amount entered, status moves to "Estimate Sent"
8. Follow-up reminder triggered at T+5 days if no response

---

## Common Edge Cases

1. **Caller outside service area** — Someone from Duluth MN or Milwaukee WI calls; agent captures data anyway, but lead flagged as `outside_service_area`. Dean may still quote if project is large enough.
2. **Incomplete call / hang-up** — Caller provides name and phone but hangs up before giving address. Partial lead captured with `incomplete` flag; Office Manager calls back to complete.
3. **Duplicate caller** — Same phone number calls twice in one season. Second record created with `duplicate` flag linking to original. Common when caller shopped around and came back.
4. **Commercial multi-location inquiry** — Property manager calls about 3 different parking lots at different addresses. Single call but multiple project records needed.
5. **Wrong season request** — Caller wants sealcoating in November; AI captures lead, notes seasonal restriction in confirmation message. Lead tagged `waitlisted` for spring.
6. **Weather-canceled job follow-up** — Returning caller checking on rescheduled job. AI captures and routes to callback queue; these aren't new leads but appear in call log.
7. **AI confusion / escalation** — Caller speaks very quickly, has strong accent, or asks complex technical question AI can't handle (e.g., "Can you do FDR with cement stabilization?"). AI falls back: "I'll have Dean call you directly." Lead flagged `call_back_required`.
8. **No-show for site visit** — Office Manager scheduled estimate visit but nobody was home. Status updated to `no_show`; reschedule attempt logged.

---

## What Would Impress a Domain Expert

1. **Seasonal call volume chart** — A chart showing the dramatic April–August peak vs. near-flat November–March is immediately recognizable to any paving contractor. Include the exact pattern: volume spikes in May (spring thaw cleanup), July (summer maintenance season), with a secondary bump in September (fall final sealing before winter). If the dashboard shows this curve, Dean will say "that's exactly what our phones look like."

2. **After-hours capture as a KPI** — The biggest pain point for small paving companies is missed calls after 5pm and on weekends. Showing "After-Hours Captures: 47 this season" as a KPI card with upward trend immediately communicates the core value of the AI system.

3. **Service-type breakdown in the pipeline** — A paving contractor thinks in services, not in "leads." Showing a breakdown like: Sealcoating (38%), Driveway Replacement (22%), Parking Lot Work (19%), Crack Filling (12%), Concrete (9%) is more meaningful than a generic lead count by source.

4. **Response time metric** — "Avg notification time: 23 seconds" on the dashboard shows Dean that his office manager gets the lead instantly — directly answering his real concern about slow follow-up costing him jobs. 91% of leads within 1 minute would be a credibility signal.

5. **Referral source tracking** — In the paving business, referrals are gold. "How did you hear about us?" is Dean's most important marketing question. Showing a referral source breakdown (Neighbor referral, Google Search, Yard Sign, Previous Customer, Other) in the analytics view shows that the system captures what matters, not just what's easy.

---

## Common Systems & Tools Used

1. **Twilio** — Cloud telephony platform; Dean already uses this for his business number. SIP trunking connects to Retell AI.
2. **Retell AI** — Voice AI platform for building conversational phone agents. Handles the call, captures data, posts webhook on call end.
3. **Make.com** (formerly Integromat) — No-code automation platform. Receives Retell webhook, orchestrates email/SMS/Sheets logging.
4. **Google Sheets** — Dean's current lead logging method; Make.com writes rows to a defined spreadsheet.
5. **Resend** — Transactional email API; sends confirmation and notification emails via Make.com.
6. **Jobber** — Industry-standard field service CRM for small contractors. Dean's team may use or know this tool.
7. **QuickBooks** — Almost universal billing/accounting for contractors at this scale.
8. **ServiceTitan** — Enterprise field service platform (too large for Dean, but the benchmark for the industry).
9. **Bitumio / PavementSoft** — Niche paving estimating software; less likely for a small operation.
10. **HubSpot (free tier)** — Some small contractors use this for basic CRM/lead tracking before graduating to Jobber.

---

## Geographic / Cultural Considerations

**Service Area**: Western Wisconsin (La Crosse, Eau Claire, Chippewa Falls, Menomonie, Hudson, River Falls, Onalaska, Holmen) and Minneapolis/St. Paul eastern metro (Stillwater, Woodbury, Oakdale, Maplewood, Blaine, Elk River, Maple Grove, Minnetonka, Eden Prairie).

**Wisconsin ZIP Codes for mock data**: 54601 (La Crosse), 54701 (Eau Claire), 54729 (Chippewa Falls), 54751 (Menomonie), 54016 (Hudson), 54022 (River Falls), 54650 (Onalaska), 54636 (Holmen)

**Minnesota ZIP Codes for mock data**: 55082 (Stillwater), 55125 (Woodbury), 55128 (Oakdale), 55109 (Maplewood), 55014 (Blaine), 55330 (Elk River), 55369 (Maple Grove)

**Seasonal climate context**: Upper Midwest. Frost-free paving window roughly May 1 – October 15. Sealcoating requires 50°F minimum and no rain for 24 hours after application — critical constraint for scheduling. Spring thaw brings freeze-thaw heave damage; this is when call volume spikes.

**Currency**: USD only. No international considerations.

**Business hours**: 7:00am - 5:00pm CST, Monday-Friday. Many callers are homeowners calling on weekends and after 5pm — the after-hours capture is a core value proposition of the Retell AI system.

---

## Data Architect Notes

### Entity names to use
- Primary table: `leads` (not "contacts", not "inquiries")
- People table: split into `callers` (the people who called) and `staff` (Dean's team)
- Services lookup: `serviceTypes` — use exact trade names listed above
- Status union: `"new" | "estimate_scheduled" | "estimate_sent" | "following_up" | "booked" | "declined" | "no_response" | "outside_service_area" | "incomplete" | "duplicate" | "call_back_required" | "waitlisted" | "weather_hold"`
- Call records: `callLogs` — separate from leads; a lead is created FROM a call log
- Automation: `automationRuns` — Make.com scenario execution records (for Automation Status page)

### Metric field values
- `projectValue`: residential driveway replacement $3,800–$14,500; sealcoat $285–$780; commercial lot $4,800–$115,000
- `callDurationSeconds`: 90–310 seconds (typical AI capture call)
- `notificationDeliveryMs`: 8000–75000 milliseconds (Make.com webhook round trip)
- `capturedAt`: skew 60% to business hours (7am-5pm), 40% outside (after-hours value prop)
- Monthly call volume array: see Seasonal Analytics section — spike May-August, near-flat Nov-Feb

### Status distribution for 20-lead dataset
- `new`: 3 (15%) — recently captured, not yet acted on
- `estimate_scheduled`: 4 (20%) — actively in pipeline
- `estimate_sent`: 3 (15%) — awaiting client decision
- `following_up`: 2 (10%) — office chasing response
- `booked`: 4 (20%) — converted jobs
- `declined`: 1 (5%) — lost to competitor
- `no_response`: 1 (5%) — estimate expired
- `incomplete`: 1 (5%) — partial capture (hang-up)
- `outside_service_area`: 1 (5%) — flagged geographic miss

### Edge cases to include as specific records
- One lead with `incomplete` status where `email: null` and `projectAddress: null` — the caller hung up
- One lead with `outside_service_area` from ZIP 53703 (Madison WI — well outside service area)
- One lead with `callBackRequired: true` and `aiEscalationReason: "Caller asked about FDR with cement stabilization — routed to owner"`
- One lead from `capturedAt: "2026-03-03T21:47:00"` (after hours on a Sunday) showing the off-hours value
- One duplicate lead with `duplicateOfId: "LEAD-0041"` reference
- One lead with very high project value ($87,400 — commercial lot, Maple Grove MN) that's `booked`

### Chart time-series: monthly call volume (paving season pattern)
```
Nov 2025: 6 calls
Dec 2025: 4 calls
Jan 2026: 3 calls
Feb 2026: 5 calls
Mar 2026: 11 calls  (spring anticipation — customers planning)
Apr 2026: 28 calls  (spring thaw damage visible, season opens)
May 2026: 41 calls  (peak spring)
Jun 2026: 37 calls  (steady summer)
Jul 2026: 44 calls  (summer peak)
Aug 2026: 38 calls  (late summer sealcoating rush)
Sep 2026: 22 calls  (fall final sealing)
Oct 2026: 9 calls   (season closing)
```

### Date patterns
- Current season (2026): March 3, 2026 is today — early in paving season ramp-up
- Use `daysAgo()` pattern but keep most leads in last 45 days (Feb–Mar 2026)
- Site visit dates: scheduled 3-14 days out from lead date
- Call log timestamps: include time-of-day, not just date — shows after-hours captures

---

## Layout Builder Notes

### Density
Standard (not compact). The office manager is not a power user. Readable text, adequate spacing between table rows. `--content-padding: 1.5rem`, `--card-padding: 1.5rem`.

### Domain-specific visual patterns
- **Status badge system** is the primary visual language in this domain. Every lead row needs a color-coded badge. Use: `green = booked`, `emerald = estimate_scheduled`, `blue = estimate_sent`, `amber = following_up`, `red = incomplete | call_back_required`, `gray = outside_service_area | no_response | declined`. Practitioners in this space (Jobber, Housecall Pro users) expect colorful status badges — they scan by color, not by reading.
- **Pipeline stages as visual metaphor** — a horizontal pipeline stage indicator (New → Estimate Scheduled → Estimate Sent → Booked) is immediately understood by any contractor.
- **KPI cards at top** — always: Leads Today, Capture Rate, Avg Response Time, Booked This Month. These four numbers tell Dean everything he needs to know in 10 seconds.

### Sidebar width
Standard 16rem. Navigation labels fit without truncation.

### Color nuance
The SaaS Modern aesthetic's default blue is fine. For this domain, consider a teal-forward primary (e.g., `oklch(0.55 0.16 195)` — a trustworthy, professional teal) rather than pure corporate blue. Teal reads as modern-professional without feeling like a generic SaaS tool. Paving is an outdoor, blue-collar industry; the color should feel grounded.

---

## Demo Screen Builder Notes

### Most important metric (hero stat)
**Leads Captured This Season: 247** — with the sub-label "vs. 0 before AI integration." This is the answer to Dean's core question: "Is this worth it?"

### Chart type for trend data
**Area chart** for monthly call volume (not line — area chart visually emphasizes the paving season swell and winter valley). Show 12 months, label the April-August peak zone. Secondary chart: **horizontal bar chart** showing service type breakdown (what services are callers requesting).

### Domain-specific panel that would impress a practitioner
**Live Call Feed / Recent Captures** — a real-time-style activity feed showing the last 8-10 calls with: caller name, time captured, service requested, and capture status (complete / incomplete). Paving contractors are used to watching their phone — this feed replicates that feeling digitally. "You can see exactly what your AI captured while you were at the job site."

### For dashboard-app format
- Hero stat row: 4 KPI cards (Leads Captured, Capture Rate, Avg Response Time, Booked This Month)
- Below: area chart (monthly call volume, 12 months) + horizontal bar (service type breakdown)
- Below: Recent Captures feed (last 10 leads, with status badges and time-since-call)
- Below: Quick-glance Automation Status widget (Make.com Scenario 1/2/3: last run time, success/fail indicator)
- Bottom: standard attribution banner
