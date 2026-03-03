import { APP_CONFIG } from "@/lib/config";
import { profile, portfolioProjects } from "@/data/proposal";
import { ExternalLink, TrendingUp, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Corporate Enterprise aesthetic treatment for the proposal page.
// Sharp 0.25rem radius, full-opacity borders, no shadows on light surfaces,
// Oxford Blue primary (oklch 0.53 0.12 250), 50–100ms motion.
// Structure: Hero → Proof of Work → How I Work → Skills → CTA

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">

        {/* ─────────────────────────────────────────────────────────────
            Section 1: Hero — Project First
            Dark panel, structured layout, "Built for your project" badge.
            Corporate enterprise: credential-forward, no decoration.
        ───────────────────────────────────────────────────────────── */}
        <section
          className="overflow-hidden"
          style={{
            background: "oklch(0.10 0.02 250)",
            borderRadius: "var(--radius)",
          }}
        >
          <div className="p-8">
            {/* Effort badge — mandatory */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-white/10 bg-white/5"
              style={{ borderRadius: "var(--radius)" }}>
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="text-xs font-mono tracking-widest uppercase text-white/60">
                Built this demo for your project
              </span>
            </div>

            {/* Role label — corporate style */}
            <p className="text-xs font-mono tracking-widest uppercase text-white/40 mb-3">
              Full-Stack Developer · Voice AI &amp; Automation
            </p>

            {/* Name with weight contrast */}
            <h1 className="text-4xl md:text-5xl leading-none mb-4" style={{ letterSpacing: "-0.02em" }}>
              <span className="font-light text-white/70">Hi, I&apos;m</span>{" "}
              <span className="font-semibold text-white">{profile.name}</span>
            </h1>

            {/* Tailored value prop — specific to this job */}
            <p className="text-base md:text-lg text-white/65 max-w-2xl leading-relaxed mb-6">
              {profile.tagline}
            </p>

            {/* Secondary context line */}
            <p className="text-sm text-white/45 max-w-2xl leading-relaxed">
              {APP_CONFIG.clientName
                ? `${APP_CONFIG.clientName}'s pipeline`
                : APP_CONFIG.projectName}{" "}
              is already running in Tab 1 — voice agent, Make.com automations,
              lead pipeline dashboard. That&apos;s what I&apos;d ship.
            </p>
          </div>

          {/* Stats shelf — structured, tabular, corporate */}
          <div
            className="border-t border-white/10 bg-white/5 px-8 py-4"
          >
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "24+", label: "Projects Shipped" },
                { value: "< 48hr", label: "Demo Turnaround" },
                { value: "15+", label: "Industries Served" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-semibold text-white tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/45 mt-0.5 font-mono tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            Section 2: Proof of Work
            3-4 projects. Outcome-first format. Corporate: dense list
            style with structured rows, outcome in success color.
        ───────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="border-b border-border pb-3">
            <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-1">
              02 / Proof of Work
            </p>
            <h2 className="text-xl font-semibold tracking-tight">
              Relevant Projects
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {portfolioProjects.map((project) => (
              <div
                key={project.id}
                className="bg-card border border-border p-4 space-y-3 aesthetic-transition hover:border-primary/40"
                style={{ borderRadius: "var(--radius)" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-snug">
                    {project.title}
                  </h3>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                      style={{ transitionDuration: "var(--dur-fast)" }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Outcome — always present, exact text from developer-profile.md */}
                {project.outcome && (
                  <div className="flex items-start gap-1.5 text-xs text-[color:var(--success)]">
                    <TrendingUp className="w-3 h-3 mt-0.5 shrink-0" />
                    <span className="leading-snug">{project.outcome}</span>
                  </div>
                )}

                {/* Relevance note — explains the connection to this job */}
                {project.relevance && (
                  <p className="text-xs text-primary/70 italic leading-snug border-t border-border pt-2">
                    {project.relevance}
                  </p>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 text-[10px] font-mono border border-border bg-muted/60 text-muted-foreground"
                      style={{ borderRadius: "var(--radius-sm)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            Section 3: How I Work
            4 steps adapted to this job: handoff/documentation-heavy
            integration project (Understand → Build → Test → Hand Over).
            Corporate: numbered list with formal deliverable descriptions.
        ───────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="border-b border-border pb-3">
            <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-1">
              03 / Process
            </p>
            <h2 className="text-xl font-semibold tracking-tight">
              How I Work
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {profile.approach.map((step, i) => (
              <div
                key={step.title}
                className="bg-card border border-border p-4 space-y-2 aesthetic-transition hover:border-primary/40"
                style={{ borderRadius: "var(--radius)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                    Step 0{i + 1}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary/40" />
                </div>
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Scope note — addresses Dean's NON-NEGOTIABLE directly */}
          <div
            className="flex items-start gap-3 bg-primary/5 border border-primary/20 p-3"
            style={{ borderRadius: "var(--radius)" }}
          >
            <div className="w-1 h-full bg-primary/40 shrink-0 rounded-full mt-0.5" />
            <p className="text-xs text-foreground/70 leading-relaxed">
              <span className="font-semibold text-foreground">Builds in your accounts.</span>{" "}
              I work inside your Retell, Twilio, and Make.com instances — not a
              staging copy. Everything is live and yours from the first configuration.
              No migration step at the end.
            </p>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            Section 4: Skills Grid
            Filtered to relevant tech for this job only.
            Corporate: structured category headers, dense skill tags.
        ───────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="border-b border-border pb-3">
            <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-1">
              04 / Tech Stack
            </p>
            <h2 className="text-xl font-semibold tracking-tight">
              What I Build With
            </h2>
          </div>

          <div className="space-y-2">
            {profile.skillCategories.map((category) => (
              <div
                key={category.name}
                className="bg-card border border-border p-3 flex items-start gap-4"
                style={{ borderRadius: "var(--radius)" }}
              >
                <p className="text-xs font-mono text-muted-foreground w-28 shrink-0 pt-0.5 tracking-wide">
                  {category.name}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-xs border border-border bg-muted/40 text-foreground/80 font-mono"
                      style={{ borderRadius: "var(--radius-sm)" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            Section 5: CTA — Close
            Dark panel matching hero. Pulsing availability dot.
            "Reply on Upwork to start" as text — not a dead button.
            Signed by Humam.
        ───────────────────────────────────────────────────────────── */}
        <section
          className="overflow-hidden"
          style={{
            background: "oklch(0.10 0.02 250)",
            borderRadius: "var(--radius)",
          }}
        >
          <div className="p-8 space-y-4">
            {/* Availability indicator */}
            <div className="flex items-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--success)]" />
              </span>
              <span className="text-xs font-mono text-white/50 tracking-wide">
                Currently available for new projects
              </span>
            </div>

            {/* Headline — tailored to this specific job */}
            <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug" style={{ letterSpacing: "-0.01em" }}>
              Ready to wire up your lead capture system —
              <br />
              <span className="text-white/70 font-normal">
                zero missed leads after hours, office manager trained on day one.
              </span>
            </h2>

            {/* Body — references the demo already in Tab 1 */}
            <p className="text-sm text-white/55 leading-relaxed max-w-lg">
              The demo in Tab 1 shows the full pipeline: Retell captures the
              lead, Make.com fires the notification, the dashboard shows you
              what came in. The production system works the same way — in your
              accounts, tested against Dean&apos;s 6 call scenarios, documented
              for Sandra to maintain.
            </p>

            {/* Primary action — text, not a dead-end button */}
            <div className="pt-1">
              <p className="text-base font-semibold text-white">
                Reply on Upwork to start
              </p>
              <p className="text-xs text-white/40 mt-1">
                Happy to scope Milestone 1 on a call, or send a 2-slide plan first — your pick.
              </p>
            </div>

            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/55 transition-colors mt-2"
              style={{ transitionDuration: "var(--dur-fast)" }}
            >
              <ArrowLeft className="w-3 h-3" />
              Back to the demo
            </Link>

            {/* Signature */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-white/35">— Humam</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
