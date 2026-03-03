"use client";

import { useState, useMemo } from "react";
import { MapPin, Calendar, Users, Search, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceZones } from "@/data/mock-data";
import type { ServiceDay } from "@/lib/types";
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

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Accepting Badge ──────────────────────────────────────────────────────────

function AcceptingBadge({ accepting }: { accepting: boolean }) {
  if (accepting) {
    return (
      <Badge
        variant="outline"
        className="text-xs font-medium rounded-sm border text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20"
      >
        Accepting
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className="text-xs font-medium rounded-sm border text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20"
    >
      At Capacity
    </Badge>
  );
}

// ─── Weekly Schedule Grid ─────────────────────────────────────────────────────

const DAYS: ServiceDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const DAY_ABBREV: Record<ServiceDay, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
};

function WeeklySchedule({
  selectedDay,
  onSelectDay,
}: {
  selectedDay: ServiceDay | "all";
  onSelectDay: (day: ServiceDay | "all") => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
        Weekly Zone Schedule — Click to filter
      </p>
      <div className="grid grid-cols-5 gap-2">
        {DAYS.map((day) => {
          const zonesOnDay = serviceZones.filter((z) => z.serviceDay === day);
          const isActive = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => onSelectDay(isActive ? "all" : day)}
              className={cn(
                "rounded-sm border p-3 text-left transition-colors duration-100 cursor-pointer",
                isActive
                  ? "border-primary bg-primary/8"
                  : "border-border hover:bg-[color:var(--surface-hover)]"
              )}
            >
              <p
                className={cn(
                  "text-xs font-semibold",
                  isActive ? "text-primary" : "text-foreground"
                )}
              >
                {DAY_ABBREV[day]}
              </p>
              <div className="mt-1.5 space-y-0.5">
                {zonesOnDay.map((z) => (
                  <p key={z.id} className="text-[10px] text-muted-foreground leading-tight truncate">
                    {z.zoneName}
                  </p>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Phase 2 Teaser ───────────────────────────────────────────────────────────

function Phase2Teaser() {
  return (
    <Card className="rounded-sm border border-primary/20 bg-primary/5 p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold">Phase 2: Zone-Based Scheduling</p>
            <Badge
              variant="outline"
              className="text-xs rounded-sm border border-primary/30 text-primary bg-primary/10"
            >
              Coming in Phase 2
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Auto-assign estimate requests to the correct crew and service day
            based on caller ZIP code. When a lead comes in from Hudson, WI — the
            system will instantly know it belongs to Wednesday&apos;s St. Croix
            Valley route and suggest open estimate slots for Crew A. No manual
            zone lookup, no scheduling back-and-forth.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              {
                label: "ZIP-to-Zone Routing",
                desc: "Caller ZIP maps to zone automatically",
              },
              {
                label: "Crew Availability Check",
                desc: "See open slots before scheduling",
              },
              {
                label: "Estimate Confirmation",
                desc: "Auto-send date/time to caller via SMS",
              },
            ].map((f) => (
              <div key={f.label} className="border border-border/50 rounded-sm p-2.5 bg-background">
                <p className="text-xs font-semibold text-foreground/80">{f.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ZonesPage() {
  const [search, setSearch] = useState("");
  const [dayFilter, setDayFilter] = useState<ServiceDay | "all">("all");
  const [acceptingFilter, setAcceptingFilter] = useState("all");

  const displayed = useMemo(() => {
    return serviceZones.filter((zone) => {
      if (dayFilter !== "all" && zone.serviceDay !== dayFilter) return false;
      if (
        acceptingFilter === "accepting" && !zone.accepting
      )
        return false;
      if (acceptingFilter === "full" && zone.accepting) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          zone.zoneName.toLowerCase().includes(q) ||
          zone.cities.some((c) => c.toLowerCase().includes(q)) ||
          zone.zipCodes.some((z) => z.includes(q)) ||
          zone.crewAssigned.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, dayFilter, acceptingFilter]);

  const acceptingCount = serviceZones.filter((z) => z.accepting).length;
  const totalCities = serviceZones.reduce((sum, z) => sum + z.cities.length, 0);

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Service Zones</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Geographic routing — each zone maps to a crew, service day, and
            next available estimate date
          </p>
        </div>
        <Button variant="outline" size="sm" className="rounded-sm">
          Manage Zones
        </Button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Active Zones",
            value: serviceZones.length,
            sub: `${acceptingCount} accepting new leads`,
          },
          {
            label: "Cities Covered",
            value: totalCities,
            sub: "Western WI + Minneapolis metro",
          },
          {
            label: "Crews Operating",
            value: 2,
            sub: "Crew A (Ryan) + Crew B (Mike)",
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

      {/* Weekly schedule grid */}
      <WeeklySchedule selectedDay={dayFilter} onSelectDay={setDayFilter} />

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search zone name, city, or ZIP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 text-sm rounded-sm"
          />
        </div>
        <Select value={acceptingFilter} onValueChange={setAcceptingFilter}>
          <SelectTrigger className="w-40 h-8 text-sm rounded-sm">
            <SelectValue placeholder="All Zones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Zones</SelectItem>
            <SelectItem value="accepting">Accepting</SelectItem>
            <SelectItem value="full">At Capacity</SelectItem>
          </SelectContent>
        </Select>
        {dayFilter !== "all" && (
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs rounded-sm"
            onClick={() => setDayFilter("all")}
          >
            Clear Day Filter
          </Button>
        )}
        <span className="text-xs text-muted-foreground shrink-0">
          {displayed.length} of {serviceZones.length} zones
        </span>
      </div>

      {/* Zone table */}
      <Card className="rounded-sm border border-border p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Zone Name
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Cities Covered
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  ZIP Codes
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Service Day
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Crew
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Next Available
                </TableHead>
                <TableHead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Status
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
                    No service zones match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((zone) => (
                  <TableRow
                    key={zone.id}
                    className="hover:bg-[color:var(--surface-hover)] transition-colors duration-100 border-b border-border/40"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="text-sm font-medium">{zone.zoneName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-0.5">
                        {zone.cities.slice(0, 3).map((c) => (
                          <p key={c} className="text-xs text-muted-foreground leading-snug">
                            {c}
                          </p>
                        ))}
                        {zone.cities.length > 3 && (
                          <p className="text-xs text-muted-foreground/60">
                            +{zone.cities.length - 3} more
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-0.5">
                        {zone.zipCodes.slice(0, 3).map((z) => (
                          <p key={z} className="text-xs font-mono text-muted-foreground">
                            {z}
                          </p>
                        ))}
                        {zone.zipCodes.length > 3 && (
                          <p className="text-xs text-muted-foreground/60 font-mono">
                            +{zone.zipCodes.length - 3}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        <span
                          className={cn(
                            dayFilter === zone.serviceDay
                              ? "text-primary font-semibold"
                              : "text-foreground/80"
                          )}
                        >
                          {zone.serviceDay}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />
                        {zone.crewAssigned}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {formatDate(zone.nextAvailableDate)}
                    </TableCell>
                    <TableCell>
                      <AcceptingBadge accepting={zone.accepting} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Phase 2 teaser */}
      <Phase2Teaser />
    </div>
  );
}
