"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Search,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { callLogs } from "@/data/mock-data";
import type { CallOutcome } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Outcome Badge ────────────────────────────────────────────────────────────

function OutcomeBadge({ outcome }: { outcome: CallOutcome }) {
  const config: Record<CallOutcome, { label: string; colorClass: string }> = {
    "Lead Captured": {
      label: "Lead Captured",
      colorClass:
        "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20",
    },
    "Incomplete Info": {
      label: "Incomplete Info",
      colorClass:
        "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20",
    },
    "Escalated to Office": {
      label: "Escalated",
      colorClass: "text-destructive bg-destructive/10 border-destructive/20",
    },
    "Out of Scope": {
      label: "Out of Scope",
      colorClass: "text-muted-foreground bg-muted border-border",
    },
    "Duplicate Caller": {
      label: "Duplicate",
      colorClass: "text-muted-foreground bg-muted border-border",
    },
    "Wrong Number": {
      label: "Wrong Number",
      colorClass: "text-muted-foreground bg-muted border-border",
    },
  };

  const c = config[outcome] ?? {
    label: outcome,
    colorClass: "text-muted-foreground bg-muted border-border",
  };

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium rounded-sm border", c.colorClass)}
    >
      {c.label}
    </Badge>
  );
}

// ─── AI Score ─────────────────────────────────────────────────────────────────

function AIScore({ score }: { score: number }) {
  const colorClass =
    score >= 85
      ? "text-[color:var(--success)]"
      : score >= 60
      ? "text-[color:var(--warning)]"
      : "text-destructive";
  return (
    <span className={cn("font-mono text-xs font-semibold tabular-nums", colorClass)}>
      {score}
    </span>
  );
}

// ─── Expanded Row Detail ──────────────────────────────────────────────────────

function ExpandedDetail({ log }: { log: (typeof callLogs)[0] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
      <div>
        <p className="text-muted-foreground uppercase tracking-wide font-medium mb-1">
          Call ID
        </p>
        <p className="font-mono text-foreground/80">{log.id}</p>
      </div>
      <div>
        <p className="text-muted-foreground uppercase tracking-wide font-medium mb-1">
          Linked Lead
        </p>
        <p className="font-mono text-foreground/80">
          {log.leadId ?? "— No lead created"}
        </p>
      </div>
      <div>
        <p className="text-muted-foreground uppercase tracking-wide font-medium mb-1">
          After Hours
        </p>
        <p
          className={
            log.afterHours
              ? "text-[color:var(--warning)] font-medium"
              : "text-muted-foreground"
          }
        >
          {log.afterHours
            ? "Yes — captured outside 7am–5pm CST"
            : "No — standard business hours"}
        </p>
      </div>
      <div className="md:col-span-3">
        <p className="text-muted-foreground uppercase tracking-wide font-medium mb-1">
          Transcript Summary
        </p>
        <p className="text-foreground/80 leading-relaxed">
          {log.transcriptSummary}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type SortKey = "timestamp" | "duration" | "aiConfidenceScore";
type SortDir = "asc" | "desc";

const outcomeOptions = [
  { value: "all", label: "All Outcomes" },
  { value: "Lead Captured", label: "Lead Captured" },
  { value: "Incomplete Info", label: "Incomplete Info" },
  { value: "Escalated to Office", label: "Escalated to Office" },
  { value: "Out of Scope", label: "Out of Scope" },
  { value: "Duplicate Caller", label: "Duplicate Caller" },
  { value: "Wrong Number", label: "Wrong Number" },
];

export default function CallLogPage() {
  const [search, setSearch] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [afterHoursOnly, setAfterHoursOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayed = useMemo(() => {
    return [...callLogs]
      .filter((log) => {
        if (outcomeFilter !== "all" && log.outcome !== outcomeFilter) return false;
        if (afterHoursOnly && !log.afterHours) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            log.callerName.toLowerCase().includes(q) ||
            log.callerPhone.includes(q) ||
            log.id.toLowerCase().includes(q) ||
            log.outcome.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, outcomeFilter, afterHoursOnly, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortDir === "asc" ? (
        <ChevronUp className="w-3 h-3" />
      ) : (
        <ChevronDown className="w-3 h-3" />
      )
    ) : null;

  const leadCapturedCount = callLogs.filter(
    (l) => l.outcome === "Lead Captured"
  ).length;
  const afterHoursCount = callLogs.filter((l) => l.afterHours).length;

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Call Log</h1>
          <p className="text-sm text-muted-foreground mt-1">
            All inbound calls handled by the Retell AI agent — click any row for
            transcript summary
          </p>
        </div>
        <Button variant="outline" size="sm" className="rounded-sm">
          Export to Sheet
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total Calls",
            value: callLogs.length,
            sub: "all captured",
          },
          {
            label: "Leads Captured",
            value: leadCapturedCount,
            sub: `${Math.round((leadCapturedCount / callLogs.length) * 100)}% capture rate`,
          },
          {
            label: "After-Hours Calls",
            value: afterHoursCount,
            sub: `${Math.round((afterHoursCount / callLogs.length) * 100)}% of total`,
          },
        ].map((stat) => (
          <Card
            key={stat.label}
            className="rounded-sm border border-border p-4"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              {stat.label}
            </p>
            <p className="text-2xl font-bold tabular-nums mt-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search caller name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 text-sm rounded-sm"
          />
        </div>
        <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
          <SelectTrigger className="w-44 h-8 text-sm rounded-sm">
            <SelectValue placeholder="All Outcomes" />
          </SelectTrigger>
          <SelectContent>
            {outcomeOptions.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-sm">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant={afterHoursOnly ? "default" : "outline"}
          size="sm"
          className="h-8 text-xs rounded-sm"
          onClick={() => setAfterHoursOnly((v) => !v)}
        >
          After Hours Only
        </Button>
        <span className="text-xs text-muted-foreground shrink-0">
          {displayed.length} of {callLogs.length} calls
        </span>
      </div>

      {/* Table */}
      <Card className="rounded-sm border border-border p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide w-8" />
                <TableHead
                  className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("timestamp")}
                >
                  <div className="flex items-center gap-1">
                    Timestamp
                    <SortIcon col="timestamp" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Caller
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Phone
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Outcome
                </TableHead>
                <TableHead
                  className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("duration")}
                >
                  <div className="flex items-center gap-1">
                    Duration
                    <SortIcon col="duration" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("aiConfidenceScore")}
                >
                  <div className="flex items-center gap-1">
                    AI Score
                    <SortIcon col="aiConfidenceScore" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  After Hrs
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-28 text-center text-sm text-muted-foreground"
                  >
                    No calls match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.flatMap((log) => {
                  const rows = [
                    <TableRow
                      key={log.id}
                      className="cursor-pointer hover:bg-[color:var(--surface-hover)] transition-colors duration-100 border-b border-border/40"
                      onClick={() =>
                        setExpandedId((prev) =>
                          prev === log.id ? null : log.id
                        )
                      }
                    >
                      <TableCell className="w-8 pl-4">
                        <ChevronRight
                          className={cn(
                            "w-3 h-3 text-muted-foreground transition-transform duration-100",
                            expandedId === log.id && "rotate-90"
                          )}
                        />
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                        {formatTimestamp(log.timestamp)}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {log.callerName}
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">
                        {log.callerPhone}
                      </TableCell>
                      <TableCell>
                        <OutcomeBadge outcome={log.outcome} />
                      </TableCell>
                      <TableCell className="text-xs font-mono tabular-nums">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatDuration(log.duration)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <AIScore score={log.aiConfidenceScore} />
                      </TableCell>
                      <TableCell className="text-center">
                        {log.afterHours ? (
                          <span className="text-[color:var(--warning)] text-xs font-medium">
                            Yes
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </TableCell>
                    </TableRow>,
                  ];
                  if (expandedId === log.id) {
                    rows.push(
                      <TableRow
                        key={`${log.id}-expanded`}
                        className="border-b border-border/40"
                      >
                        <TableCell
                          colSpan={8}
                          className="bg-muted/30 px-6 py-4"
                        >
                          <ExpandedDetail log={log} />
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return rows;
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
