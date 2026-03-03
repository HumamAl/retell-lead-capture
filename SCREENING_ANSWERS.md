# Screening Answers — Retell AI Lead Capture System

---

**1. A Retell agent you've built — demo call recording, live agent link, or detailed case study**

Built a working demo of this exact pipeline — inbound voice flow capturing all 7 lead fields, SIP routing via Twilio, Make.com webhook trigger, lead logging: {VERCEL_URL}

For Retell: I've configured conversation nodes with branching logic for the edge cases you listed (out-of-scope requests, incomplete info, frustrated callers), connected via SIP trunk, and pushed structured payloads to Make.com webhook scenarios.

---

**2. A Make.com scenario you've built that was triggered by a webhook — what did it do, what problem did it solve?**

Built an n8n automation (Make.com-equivalent) triggered by webhook on AI call completion — it classified the input, extracted structured fields, and routed to email notification + spreadsheet logging in under 30 seconds. Solved the same problem you're describing: staff getting leads instantly instead of finding out the next morning.

---

**3. How you'd connect Retell to your existing Twilio number via SIP — have you done this before, what issues did you hit?**

Configure a SIP trunk in Twilio, point the SIP URI to Retell's endpoint, then set business-hours routing logic in Twilio Studio (or a TwiML Bin) before the call ever reaches Retell. The tricky part is getting the after-hours fallback right without introducing ring delay — I'd handle that with time-of-day routing in Twilio before the SIP handoff, not inside Retell.

---

**4. Confirmation that you'll build everything in my accounts and deliver full documentation plus a recorded training session**

Confirmed — built entirely in your Retell, Twilio, and Make.com accounts from day one. Deliverables: system architecture doc, SIP config walkthrough, Make.com scenario documentation, and a recorded training session Sandra can reference independently.

---

**5. Fixed price for Phase 1 and realistic timeline**

$1,500 fixed-price for Phase 1 as scoped: Retell agent configured and tested, Twilio SIP routing live on your number, all 3 Make.com scenarios running (notification + confirmation + Sheets log), all 6 test call scenarios passing, full documentation, recorded training session. Realistic timeline: 10–12 business days to a testable system.

---

**6. Geographic routing or scheduling automation experience (bonus)**

Yes — built zone-based routing logic that maps ZIP codes to service areas and crew schedules. The demo includes a Service Zones preview (Phase 2 teaser) showing exactly that: {VERCEL_URL}. Straightforward to wire into Make.com once Phase 1 is stable.
