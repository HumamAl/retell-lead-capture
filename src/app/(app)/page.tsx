"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Phone,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  CalendarDays,
  Moon,
  Percent,
  Filter,
  Zap,
  XCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { APP_CONFIG } from "@/lib/config";
import {
  leads,
  automationRuns,
  pipelineStats,
  monthlyCallVolume,
  serviceBreakdown,
} from "@/data/mock-data";
import type { LeadStatus, AutomationStatus, ScenarioName } from "@/lib/types";
import { cn } from "@/lib/utils";

// ─── Dynamic chart imports (SSR-safe) ─────────────────────────────────────────

const CallVolumeChart = dynamic(
  () =>
    import("@/components/dashboard/call-volume-chart").then(
      (m) => m.CallVolumeChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[260px] bg-muted/30 rounded animate-pulse" />
    ),
  }
);

const ServiceBreakdownChart = dynamic(
  () =>
    import("@/components/dashboard/service-breakdown-chart").then(
      (m) => m.ServiceBreakdownChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[220px] bg-muted/30 rounded animate-pulse" />
    ),
  }
);

// ─── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number = 1000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ─── Stat card component ───────────────────────────────────────────────────────

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  icon: React.ReactNode;
  description: string;
  index: number;
}

function StatCard({
  title,
  value,
  change,
  suffix = "",
  prefix = "",
  decimals = 0,
  icon,
  description,
  index,
}: StatCardProps) {
  const displayTarget = Math.round(value * Math.pow(10, decimals));
  const { count, ref } = useCountUp(displayTarget, 1000 + index * 80);
  const displayValue =
    decimals > 0
      ? (count / Math.pow(10, decimals)).toFixed(decimals)
      : count.toString();

  const isPositive = change >= 0;

  return (
    <div
      ref={ref}
      className="linear-card animate-fade-up-in"
      style={{
        padding: "var(--card-padding)",
        animationDelay: `${index * 50}ms`,
        animationDuration: "150ms",
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </p>
        <span className="text-muted-foreground/60">{icon}</span>
      </div>
      <div className="text-2xl font-bold font-mono tabular-nums text-foreground">
        {prefix}
        {displayValue}
        {suffix}
      </div>
      <div className="flex items-center gap-1.5 mt-1.5">
        <span
          className={cn(
            "flex items-center gap-0.5 text-xs font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {isPositive ? "+" : ""}
          {change.toFixed(1)}%
        </span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </div>
  );
}

// ─── Status badge helpers ──────────────────────────────────────────────────────

function getStatusVariant(
  status: LeadStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "Booked":
      return "default";
    case "Estimate Scheduled":
    case "Estimate Sent":
    case "New":
      return "secondary";
    case "Incomplete":
    case "Call Back Required":
    case "Outside Service Area":
      return "destructive";
    default:
      return "outline";
  }
}

function getStatusColor(status: LeadStatus): string {
  switch (status) {
    case "Booked":
      return "bg-success/10 text-success border-success/30";
    case "Estimate Scheduled":
      return "bg-primary/10 text-primary border-primary/30";
    case "Estimate Sent":
      return "bg-blue-500/10 text-blue-700 border-blue-500/30";
    case "Following Up":
      return "bg-warning/10 text-warning-foreground border-warning/30";
    case "New":
      return "bg-muted text-muted-foreground border-border";
    case "Incomplete":
    case "Call Back Required":
      return "bg-destructive/10 text-destructive border-destructive/30";
    case "Outside Service Area":
      return "bg-muted text-muted-foreground border-border";
    case "No Response":
    case "Declined":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

// ─── Automation status helpers ─────────────────────────────────────────────────

function getAutomationStatusColor(status: AutomationStatus): string {
  switch (status) {
    case "Success":
      return "bg-success/10 text-success border-success/30";
    case "Failed":
      return "bg-destructive/10 text-destructive border-destructive/30";
    case "Retrying":
      return "bg-warning/10 text-warning-foreground border-warning/30";
  }
}

function getScenarioIcon(name: ScenarioName) {
  switch (name) {
    case "Lead Notification":
      return <Zap className="w-3.5 h-3.5" />;
    case "Caller Confirmation":
      return <CheckCircle2 className="w-3.5 h-3.5" />;
    case "Lead Logging":
      return <CalendarDays className="w-3.5 h-3.5" />;
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  const now = new Date("2026-03-03T23:59:59Z");
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMin < 2) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return `${diffDays}d ago`;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── STATUS FILTER OPTIONS ─────────────────────────────────────────────────────

const STATUS_FILTERS: { label: string; value: LeadStatus | "All" }[] = [
  { label: "All Leads", value: "All" },
  { label: "New", value: "New" },
  { label: "Estimate Scheduled", value: "Estimate Scheduled" },
  { label: "Following Up", value: "Following Up" },
  { label: "Booked", value: "Booked" },
  { label: "Incomplete", value: "Incomplete" },
];

// ─── CHART PERIOD OPTIONS ──────────────────────────────────────────────────────

type ChartPeriod = "6m" | "12m";

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function PipelineOverviewPage() {
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("12m");

  // Filter leads by status
  const filteredLeads = useMemo(() => {
    const sorted = [...leads].sort(
      (a, b) =>
        new Date(b.callTimestamp).getTime() - new Date(a.callTimestamp).getTime()
    );
    if (statusFilter === "All") return sorted.slice(0, 10);
    return sorted.filter((l) => l.status === statusFilter).slice(0, 10);
  }, [statusFilter]);

  // Filter chart data by period
  const chartData = useMemo(() => {
    if (chartPeriod === "6m") return monthlyCallVolume.slice(-6);
    return monthlyCallVolume;
  }, [chartPeriod]);

  // Latest automation runs per scenario (one card per scenario)
  const latestAutomationByScenario = useMemo(() => {
    const scenarios: ScenarioName[] = [
      "Lead Notification",
      "Caller Confirmation",
      "Lead Logging",
    ];
    return scenarios.map((scenario) => {
      const runs = automationRuns
        .filter((r) => r.scenarioName === scenario)
        .sort(
          (a, b) =>
            new Date(b.triggeredAt).getTime() -
            new Date(a.triggeredAt).getTime()
        );
      const latest = runs[0];
      const successCount = runs.filter((r) => r.status === "Success").length;
      const totalCount = runs.length;
      const avgDeliveryMs =
        runs
          .filter((r) => r.deliveryMs)
          .reduce((sum, r) => sum + (r.deliveryMs ?? 0), 0) /
          runs.filter((r) => r.deliveryMs).length || 0;
      return { scenario, latest, successCount, totalCount, avgDeliveryMs };
    });
  }, []);

  const stats: {
    title: string;
    value: number;
    change: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    icon: React.ReactNode;
    description: string;
  }[] = [
    {
      title: "Leads Captured Today",
      value: pipelineStats.leadsToday,
      change: pipelineStats.leadsTodayChange,
      icon: <TrendingUp className="w-4 h-4" />,
      description: "vs. yesterday",
    },
    {
      title: "Calls Handled by AI",
      value: pipelineStats.callsHandledByAI,
      change: pipelineStats.callsHandledChange,
      icon: <Phone className="w-4 h-4" />,
      description: "this week",
    },
    {
      title: "Avg Call Duration",
      value: pipelineStats.avgCallDuration,
      change: pipelineStats.avgCallDurationChange,
      suffix: "s",
      icon: <Clock className="w-4 h-4" />,
      description: "per AI-handled call",
    },
    {
      title: "Automation Success",
      value: pipelineStats.automationSuccessRate,
      change: pipelineStats.automationSuccessChange,
      suffix: "%",
      decimals: 1,
      icon: <CheckCircle2 className="w-4 h-4" />,
      description: "Make.com scenarios",
    },
    {
      title: "Site Visit Requests",
      value: pipelineStats.siteVisitRequests,
      change: pipelineStats.siteVisitChange,
      icon: <CalendarDays className="w-4 h-4" />,
      description: "estimate requests",
    },
    {
      title: "After-Hours Captures",
      value: pipelineStats.afterHoursCalls,
      change: pipelineStats.afterHoursChange,
      icon: <Moon className="w-4 h-4" />,
      description: "calls outside 7am–5pm",
    },
    {
      title: "Capture Rate",
      value: pipelineStats.captureRate,
      change: pipelineStats.captureRateChange,
      suffix: "%",
      decimals: 1,
      icon: <Percent className="w-4 h-4" />,
      description: `avg notify: ${pipelineStats.avgNotificationDelivery}s`,
    },
  ];

  return (
    <div style={{ padding: "var(--content-padding)" }} className="space-y-4">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Lead Capture Pipeline
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Retell AI + Twilio + Make.com — March 3, 2026 · Paving Season Opening
        </p>
      </div>

      {/* ── KPI Stat Cards ──────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            suffix={stat.suffix}
            prefix={stat.prefix}
            decimals={stat.decimals}
            icon={stat.icon}
            description={stat.description}
            index={index}
          />
        ))}
      </div>

      {/* ── Charts Row ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Call Volume Area Chart */}
        <div className="linear-card lg:col-span-2" style={{ padding: "var(--card-padding)" }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Seasonal Call Volume
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                April–August paving season spike
              </p>
            </div>
            <div className="flex gap-1">
              {(["6m", "12m"] as ChartPeriod[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className={cn(
                    "px-2.5 py-1 text-xs rounded border transition-colors",
                    "duration-[60ms]",
                    chartPeriod === p
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  {p === "6m" ? "6 mo" : "12 mo"}
                </button>
              ))}
            </div>
          </div>
          <CallVolumeChart data={chartData} />
        </div>

        {/* Service Breakdown */}
        <div className="linear-card" style={{ padding: "var(--card-padding)" }}>
          <div className="mb-3">
            <p className="text-sm font-semibold text-foreground">
              Service Requests
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              By service type — this season
            </p>
          </div>
          <ServiceBreakdownChart data={serviceBreakdown} />
        </div>
      </div>

      {/* ── Recent Leads Table ──────────────────────────────── */}
      <div className="linear-card overflow-hidden">
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border"
          style={{ padding: "var(--card-padding)" }}
        >
          <div>
            <p className="text-sm font-semibold text-foreground">
              Recent Lead Captures
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              AI-handled inbound calls — most recent first
            </p>
          </div>
          {/* Status filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={cn(
                  "px-2 py-0.5 text-xs rounded border transition-colors duration-[60ms]",
                  statusFilter === f.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:bg-muted/50"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left font-medium text-muted-foreground px-3 py-2 whitespace-nowrap">
                  Time
                </th>
                <th className="text-left font-medium text-muted-foreground px-3 py-2 whitespace-nowrap">
                  Caller
                </th>
                <th className="text-left font-medium text-muted-foreground px-3 py-2 whitespace-nowrap">
                  Phone
                </th>
                <th className="text-left font-medium text-muted-foreground px-3 py-2">
                  Service Requested
                </th>
                <th className="text-left font-medium text-muted-foreground px-3 py-2 whitespace-nowrap">
                  City
                </th>
                <th className="text-left font-medium text-muted-foreground px-3 py-2 whitespace-nowrap">
                  Status
                </th>
                <th className="text-right font-medium text-muted-foreground px-3 py-2 whitespace-nowrap">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-muted-foreground py-8"
                  >
                    No leads match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, i) => (
                  <tr
                    key={lead.id}
                    className={cn(
                      "border-b border-border/60 hover:bg-surface-hover transition-colors duration-[60ms]",
                      i % 2 === 0 ? "" : "bg-muted/20"
                    )}
                  >
                    <td className="px-3 py-2 font-mono text-muted-foreground whitespace-nowrap">
                      {formatTimestamp(lead.callTimestamp)}
                      {lead.afterHours && (
                        <Moon className="inline w-3 h-3 ml-1 text-warning opacity-80" />
                      )}
                    </td>
                    <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">
                      {lead.callerName}
                      {lead.businessName && (
                        <span className="block text-muted-foreground font-normal text-[10px] leading-tight">
                          {lead.businessName}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 font-mono text-muted-foreground whitespace-nowrap">
                      {lead.phone}
                    </td>
                    <td className="px-3 py-2 text-foreground max-w-[200px]">
                      {lead.servicesRequested.length > 0
                        ? lead.servicesRequested[0].split(" — ")[0]
                        : "—"}
                      {lead.servicesRequested.length > 1 && (
                        <span className="text-muted-foreground ml-1">
                          +{lead.servicesRequested.length - 1}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">
                      {lead.city}, {lead.state}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border",
                          getStatusColor(lead.status)
                        )}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-mono text-right text-muted-foreground whitespace-nowrap">
                      {formatDuration(lead.callDuration)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Automation Status Panel ─────────────────────────── */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-2">
          Make.com Automation Status
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {latestAutomationByScenario.map(
            ({ scenario, latest, successCount, totalCount, avgDeliveryMs }, index) => (
              <div
                key={scenario}
                className="linear-card animate-fade-up-in"
                style={{
                  padding: "var(--card-padding)",
                  animationDelay: `${index * 60}ms`,
                  animationDuration: "150ms",
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5 text-foreground">
                    <span className="text-primary">
                      {getScenarioIcon(scenario)}
                    </span>
                    <span className="text-xs font-semibold">{scenario}</span>
                  </div>
                  {latest && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium border",
                        getAutomationStatusColor(latest.status)
                      )}
                    >
                      {latest.status === "Success" && (
                        <CheckCircle2 className="w-2.5 h-2.5" />
                      )}
                      {latest.status === "Failed" && (
                        <XCircle className="w-2.5 h-2.5" />
                      )}
                      {latest.status === "Retrying" && (
                        <RefreshCw className="w-2.5 h-2.5" />
                      )}
                      {latest.status}
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Last Run</span>
                    <span className="text-foreground font-mono">
                      {latest ? formatTimestamp(latest.triggeredAt) : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <span className="text-foreground font-mono font-medium">
                      {totalCount > 0
                        ? Math.round((successCount / totalCount) * 100)
                        : 0}
                      %{" "}
                      <span className="text-muted-foreground font-normal">
                        ({successCount}/{totalCount})
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Delivery</span>
                    <span className="text-foreground font-mono">
                      {avgDeliveryMs > 0
                        ? `${(avgDeliveryMs / 1000).toFixed(0)}s`
                        : "—"}
                    </span>
                  </div>
                </div>

                {latest?.errorMessage && (
                  <div className="mt-2 flex items-start gap-1.5 p-1.5 rounded bg-destructive/5 border border-destructive/20">
                    <AlertCircle className="w-3 h-3 text-destructive shrink-0 mt-0.5" />
                    <p className="text-[10px] text-destructive leading-tight">
                      {latest.errorMessage}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* ── Proposal Banner ─────────────────────────────────── */}
      <div className="linear-card p-4 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">
            This is a live demo built for{" "}
            {APP_CONFIG.clientName ?? APP_CONFIG.projectName}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Humam · Full-Stack Developer · Retell AI + Make.com + Twilio
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/challenges"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-[60ms]"
          >
            My Approach →
          </a>
          <a
            href="/proposal"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 transition-colors duration-[60ms]"
          >
            Work with me
          </a>
        </div>
      </div>
    </div>
  );
}
