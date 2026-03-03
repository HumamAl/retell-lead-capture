"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, Calendar, DollarSign, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { leads } from "@/data/mock-data";
import type { LeadStatus } from "@/lib/types";
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

// ─── Pipeline statuses shown in Estimate Queue ────────────────────────────────

const QUEUE_STATUSES: LeadStatus[] = [
  "New",
  "Estimate Scheduled",
  "Estimate Sent",
  "Following Up",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function daysSince(iso: string): number {
  const diff = Date.now() - new Date(iso).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function formatValue(val: number | null | undefined): string {
  if (!val) return "—";
  return val >= 1000
    ? `$${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}K`
    : `$${val}`;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const config: Partial<
    Record<LeadStatus, { label: string; colorClass: string }>
  > = {
    New: {
      label: "New",
      colorClass:
        "text-primary bg-primary/10 border-primary/20",
    },
    "Estimate Scheduled": {
      label: "Estimate Scheduled",
      colorClass:
        "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20",
    },
    "Estimate Sent": {
      label: "Estimate Sent",
      colorClass:
        "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20",
    },
    "Following Up": {
      label: "Following Up",
      colorClass:
        "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20",
    },
  };

  const c = config[status] ?? {
    label: status,
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

// ─── Action Button ────────────────────────────────────────────────────────────

function ActionButton({
  status,
  leadId,
  onAction,
}: {
  status: LeadStatus;
  leadId: string;
  onAction: (id: string, next: LeadStatus) => void;
}) {
  const actionMap: Partial<Record<LeadStatus, { label: string; next: LeadStatus }>> = {
    New: { label: "Schedule Estimate", next: "Estimate Scheduled" },
    "Estimate Scheduled": { label: "Send Quote", next: "Estimate Sent" },
    "Estimate Sent": { label: "Follow Up", next: "Following Up" },
    "Following Up": { label: "Mark Closed", next: "Declined" },
  };

  const action = actionMap[status];
  if (!action) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-7 text-xs rounded-sm whitespace-nowrap"
      onClick={(e) => {
        e.stopPropagation();
        onAction(leadId, action.next);
      }}
    >
      {action.label}
    </Button>
  );
}

// ─── Pipeline Stage Indicator ─────────────────────────────────────────────────

const stages: LeadStatus[] = [
  "New",
  "Estimate Scheduled",
  "Estimate Sent",
  "Following Up",
];

function StageBar({ status }: { status: LeadStatus }) {
  const idx = stages.indexOf(status);
  return (
    <div className="flex items-center gap-1">
      {stages.map((s, i) => (
        <div
          key={s}
          className={cn(
            "h-1 flex-1 rounded-sm transition-colors duration-100",
            i <= idx ? "bg-primary" : "bg-border"
          )}
          title={s}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type SortKey = "callTimestamp" | "estimatedValue" | "daysSince";
type SortDir = "asc" | "desc";

const statusFilterOptions = [
  { value: "all", label: "All Pipeline Stages" },
  { value: "New", label: "New" },
  { value: "Estimate Scheduled", label: "Estimate Scheduled" },
  { value: "Estimate Sent", label: "Estimate Sent" },
  { value: "Following Up", label: "Following Up" },
];

export default function EstimateQueuePage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("callTimestamp");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [localLeads, setLocalLeads] = useState(
    leads.filter((l) => QUEUE_STATUSES.includes(l.status))
  );
  const [toastedId, setToastedId] = useState<string | null>(null);

  function handleAction(id: string, next: LeadStatus) {
    setLocalLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: next } : l))
    );
    setToastedId(id);
    setTimeout(() => setToastedId(null), 2000);
  }

  const displayed = useMemo(() => {
    return [...localLeads]
      .filter((lead) => {
        if (statusFilter !== "all" && lead.status !== statusFilter) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            lead.callerName.toLowerCase().includes(q) ||
            (lead.businessName?.toLowerCase().includes(q) ?? false) ||
            lead.city.toLowerCase().includes(q) ||
            lead.servicesRequested.some((s) => s.toLowerCase().includes(q))
          );
        }
        return true;
      })
      .sort((a, b) => {
        let av: string | number;
        let bv: string | number;
        if (sortKey === "daysSince") {
          av = daysSince(a.callTimestamp);
          bv = daysSince(b.callTimestamp);
        } else if (sortKey === "estimatedValue") {
          av = a.estimatedValue ?? 0;
          bv = b.estimatedValue ?? 0;
        } else {
          av = a.callTimestamp;
          bv = b.callTimestamp;
        }
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, statusFilter, sortKey, sortDir, localLeads]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "estimatedValue" ? "desc" : "desc");
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

  // Summary counts
  const countByStatus = stages.reduce<Record<string, number>>((acc, s) => {
    acc[s] = localLeads.filter((l) => l.status === s).length;
    return acc;
  }, {});
  const totalValue = localLeads.reduce(
    (sum, l) => sum + (l.estimatedValue ?? 0),
    0
  );

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Estimate Queue</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Qualified leads in the estimate pipeline — use action buttons to
            advance each lead
          </p>
        </div>
        <Button variant="outline" size="sm" className="rounded-sm">
          Export Queue
        </Button>
      </div>

      {/* Pipeline summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stages.map((s) => (
          <Card key={s} className="rounded-sm border border-border p-3">
            <p className="text-xs text-muted-foreground font-medium truncate">{s}</p>
            <p className="text-xl font-bold tabular-nums mt-0.5">
              {countByStatus[s] ?? 0}
            </p>
          </Card>
        ))}
      </div>

      {/* Total pipeline value */}
      <div className="flex items-center gap-2 text-sm">
        <DollarSign className="w-4 h-4 text-muted-foreground" />
        <span className="text-muted-foreground">Pipeline value:</span>
        <span className="font-semibold tabular-nums">
          ${totalValue.toLocaleString()}
        </span>
        <span className="text-muted-foreground">across {localLeads.length} active leads</span>
      </div>

      {/* Toast */}
      {toastedId && (
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-[color:var(--success)]/30 bg-[color:var(--success)]/10 text-xs text-[color:var(--success)] font-medium">
          Lead status updated
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search leads by name, city, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 text-sm rounded-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-52 h-8 text-sm rounded-sm">
            <SelectValue placeholder="All Pipeline Stages" />
          </SelectTrigger>
          <SelectContent>
            {statusFilterOptions.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-sm">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground shrink-0">
          {displayed.length} lead{displayed.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <Card className="rounded-sm border border-border p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Caller / Company
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Services Requested
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  City / Zone
                </TableHead>
                <TableHead
                  className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("estimatedValue")}
                >
                  <div className="flex items-center gap-1">
                    Est. Value
                    <SortIcon col="estimatedValue" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("daysSince")}
                >
                  <div className="flex items-center gap-1">
                    Days Since
                    <SortIcon col="daysSince" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Stage
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-28 text-center text-sm text-muted-foreground"
                  >
                    No leads match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((lead) => {
                  const ds = daysSince(lead.callTimestamp);
                  const isStale = ds >= 5;
                  return (
                    <TableRow
                      key={lead.id}
                      className={cn(
                        "hover:bg-[color:var(--surface-hover)] transition-colors duration-100 border-b border-border/40",
                        toastedId === lead.id && "bg-[color:var(--success)]/5"
                      )}
                    >
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{lead.callerName}</p>
                          {lead.businessName && (
                            <p className="text-xs text-muted-foreground">
                              {lead.businessName}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {lead.callerType}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-0.5">
                          {lead.servicesRequested.slice(0, 2).map((s) => (
                            <p
                              key={s}
                              className="text-xs text-foreground/80 leading-snug"
                            >
                              {s}
                            </p>
                          ))}
                          {lead.servicesRequested.length > 2 && (
                            <p className="text-xs text-muted-foreground">
                              +{lead.servicesRequested.length - 2} more
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {lead.city}, {lead.state}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-mono font-semibold tabular-nums text-right">
                        {formatValue(lead.estimatedValue)}
                      </TableCell>
                      <TableCell>
                        <div
                          className={cn(
                            "flex items-center gap-1 text-xs font-mono tabular-nums",
                            isStale
                              ? "text-[color:var(--warning)] font-medium"
                              : "text-muted-foreground"
                          )}
                        >
                          <Clock className="w-3 h-3" />
                          {ds}d
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1.5 min-w-[140px]">
                          <LeadStatusBadge status={lead.status} />
                          <StageBar status={lead.status} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <ActionButton
                          status={lead.status}
                          leadId={lead.id}
                          onAction={handleAction}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
