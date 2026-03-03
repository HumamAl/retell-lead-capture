"use client";

import type React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import type { MonthlyCallVolume } from "@/lib/types";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded border border-border bg-background p-3 text-xs shadow-sm">
      <p className="font-semibold mb-1.5 text-foreground">{label}</p>
      {payload.map((entry, i) => (
        <p
          key={i}
          className="flex items-center gap-2 text-muted-foreground leading-5"
        >
          <span
            className="inline-block w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}:{" "}
          <span className="font-mono font-medium text-foreground">
            {entry.value}
          </span>
        </p>
      ))}
    </div>
  );
};

export function CallVolumeChart({ data }: { data: MonthlyCallVolume[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart
        data={data}
        margin={{ top: 4, right: 16, bottom: 0, left: -8 }}
      >
        <defs>
          <linearGradient id="fillTotalCalls" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.22} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillLeadsCaptured" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-4)" stopOpacity={0.22} />
            <stop offset="95%" stopColor="var(--chart-4)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillBookedJobs" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.22} />
            <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          strokeOpacity={0.7}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          interval={1}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={28}
        />
        {/* @ts-expect-error — Recharts TooltipContentProps type mismatch with React 19 */}
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
          iconType="circle"
          iconSize={8}
        />
        <Area
          type="monotone"
          dataKey="totalCalls"
          name="Total Calls"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="url(#fillTotalCalls)"
          dot={false}
          activeDot={{ r: 3, strokeWidth: 0 }}
        />
        <Area
          type="monotone"
          dataKey="leadsCaptured"
          name="Leads Captured"
          stroke="var(--chart-4)"
          strokeWidth={2}
          fill="url(#fillLeadsCaptured)"
          dot={false}
          activeDot={{ r: 3, strokeWidth: 0 }}
        />
        <Area
          type="monotone"
          dataKey="bookedJobs"
          name="Booked Jobs"
          stroke="var(--chart-3)"
          strokeWidth={2}
          fill="url(#fillBookedJobs)"
          dot={false}
          activeDot={{ r: 3, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
