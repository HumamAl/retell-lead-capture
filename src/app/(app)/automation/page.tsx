"use client";

import { useState, useMemo } from "react";
import { CheckCircle2, XCircle, RefreshCw, Clock, Zap, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { automationRuns } from "@/data/mock-data";
import type { ScenarioName, AutomationStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDelivery(ms: number | null): string {
  if (!ms) return "—";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(0)}s`;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function RunStatusBadge({ status }: { status: AutomationStatus }) {
  const config: Record<AutomationStatus, { colorClass: string }> = {
    Success: {
      colorClass:
        "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20",
    },
    Failed: {
      colorClass: "text-destructive bg-destructive/10 border-destructive/20",
    },
    Retrying: {
      colorClass:
        "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20",
    },
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium rounded-sm border",
        config[status].colorClass
      )}
    >
      {status}
    </Badge>
  );
}

// ─── Scenario health summary ──────────────────────────────────────────────────

const SCENARIOS: ScenarioName[] = [
  "Lead Notification",
  "Caller Confirmation",
  "Lead Logging",
];

const SCENARIO_DESCRIPTIONS: Record<ScenarioName, string> = {
  "Lead Notification":
    "Fires after each captured call. Sends SMS + email to Sandra (Office Manager) with full lead summary.",
  "Caller Confirmation":
    "Sends a confirmation SMS + email to the caller: We\u2019ll be in touch within 1 business day.",
  "Lead Logging":
    "Writes a new row to the Google Sheets lead tracker — all 9 captured fields.",
};

function ScenarioHealthIcon({ runs }: { runs: typeof automationRuns }) {
  const failed = runs.some((r) => r.status === "Failed");
  const retrying = runs.some((r) => r.status === "Retrying");
  if (failed)
    return <XCircle className="w-4 h-4 text-destructive shrink-0" />;
  if (retrying)
    return <RefreshCw className="w-4 h-4 text-[color:var(--warning)] shrink-0" />;
  return <CheckCircle2 className="w-4 h-4 text-[color:var(--success)] shrink-0" />;
}

function ScenarioHealthLabel({ runs }: { runs: typeof automationRuns }) {
  const failed = runs.some((r) => r.status === "Failed");
  const retrying = runs.some((r) => r.status === "Retrying");
  if (failed) return <span className="text-xs text-destructive font-medium">Failing</span>;
  if (retrying)
    return (
      <span className="text-xs text-[color:var(--warning)] font-medium">
        Retrying
      </span>
    );
  return (
    <span className="text-xs text-[color:var(--success)] font-medium">Healthy</span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AutomationPage() {
  const [scenarioFilter, setScenarioFilter] = useState<ScenarioName | "all">(
    "all"
  );
  const [statusFilter, setStatusFilter] = useState<AutomationStatus | "all">(
    "all"
  );

  // Group runs by scenario
  const runsByScenario = useMemo(() => {
    const map: Record<ScenarioName, typeof automationRuns> = {
      "Lead Notification": [],
      "Caller Confirmation": [],
      "Lead Logging": [],
    };
    automationRuns.forEach((r) => {
      map[r.scenarioName].push(r);
    });
    return map;
  }, []);

  // Global stats
  const totalRuns = automationRuns.length;
  const successRuns = automationRuns.filter((r) => r.status === "Success").length;
  const successRate = Math.round((successRuns / totalRuns) * 100);
  const avgDelivery = Math.round(
    automationRuns
      .filter((r) => r.deliveryMs !== null)
      .reduce((sum, r) => sum + (r.deliveryMs ?? 0), 0) /
      automationRuns.filter((r) => r.deliveryMs !== null).length /
      1000
  );

  // Filtered run table
  const filteredRuns = useMemo(() => {
    return automationRuns.filter((r) => {
      if (scenarioFilter !== "all" && r.scenarioName !== scenarioFilter)
        return false;
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      return true;
    });
  }, [scenarioFilter, statusFilter]);

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Automation Status
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Make.com scenario health — real-time trigger log for all 3 webhook
            workflows
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative inline-flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)]/60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--success)]" />
          </span>
          <span className="text-xs text-[color:var(--success)] font-medium">
            Connected to Make.com
          </span>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total Runs",
            value: totalRuns,
            sub: "all scenarios",
          },
          {
            label: "Success Rate",
            value: `${successRate}%`,
            sub: `${successRuns} of ${totalRuns} succeeded`,
          },
          {
            label: "Avg Delivery Time",
            value: `${avgDelivery}s`,
            sub: "webhook → notification",
          },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-sm border border-border p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              {stat.label}
            </p>
            <p className="text-2xl font-bold tabular-nums mt-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
          </Card>
        ))}
      </div>

      {/* Scenario health panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SCENARIOS.map((scenario) => {
          const runs = runsByScenario[scenario];
          const successCount = runs.filter((r) => r.status === "Success").length;
          const lastRun = runs[0];
          return (
            <Card
              key={scenario}
              className="rounded-sm border border-border p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  <p className="text-sm font-semibold">{scenario}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <ScenarioHealthIcon runs={runs} />
                  <ScenarioHealthLabel runs={runs} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {SCENARIO_DESCRIPTIONS[scenario]}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/50">
                <span>
                  {successCount}/{runs.length} runs succeeded
                </span>
                {lastRun && (
                  <span className="font-mono">
                    Last: {formatTimestamp(lastRun.triggeredAt)}
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Run table filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </div>
        <Select
          value={scenarioFilter}
          onValueChange={(v) => setScenarioFilter(v as ScenarioName | "all")}
        >
          <SelectTrigger className="w-48 h-8 text-sm rounded-sm">
            <SelectValue placeholder="All Scenarios" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Scenarios</SelectItem>
            {SCENARIOS.map((s) => (
              <SelectItem key={s} value={s} className="text-sm">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(v) =>
            setStatusFilter(v as AutomationStatus | "all")
          }
        >
          <SelectTrigger className="w-36 h-8 text-sm rounded-sm">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Success">Success</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
            <SelectItem value="Retrying">Retrying</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground shrink-0">
          {filteredRuns.length} of {totalRuns} runs
        </span>
      </div>

      {/* Run log table */}
      <Card className="rounded-sm border border-border p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Triggered
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Scenario
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Lead ID
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Delivery Time
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Error / Recipient
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRuns.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-28 text-center text-sm text-muted-foreground"
                  >
                    No automation runs match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRuns.map((run) => (
                  <TableRow
                    key={run.id}
                    className="hover:bg-[color:var(--surface-hover)] transition-colors duration-100 border-b border-border/40"
                  >
                    <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {formatTimestamp(run.triggeredAt)}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-medium">
                        {run.scenarioName}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground">
                      {run.leadId}
                    </TableCell>
                    <TableCell>
                      <RunStatusBadge status={run.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs font-mono tabular-nums text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatDelivery(run.deliveryMs)}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[240px] truncate">
                      {run.errorMessage
                        ? (
                          <span className="text-destructive">{run.errorMessage}</span>
                        )
                        : run.recipientEmail ?? run.recipientPhone ?? "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
