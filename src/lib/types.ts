import type { LucideIcon } from "lucide-react";

// ─── Sidebar / Navigation ───────────────────────────────────────────────────

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ─── Lead Pipeline ──────────────────────────────────────────────────────────

export type LeadStatus =
  | "New"
  | "Estimate Scheduled"
  | "Estimate Sent"
  | "Following Up"
  | "Booked"
  | "Declined"
  | "No Response"
  | "Outside Service Area"
  | "Incomplete"
  | "Call Back Required"
  | "Duplicate"
  | "Waitlisted"
  | "Weather Hold";

export type CallerType = "Homeowner" | "Property Manager" | "Facility Manager";

export type HeardAboutUs =
  | "Neighbor Referral"
  | "Google Search"
  | "Yard Sign"
  | "Previous Customer"
  | "Google Maps"
  | "Facebook"
  | "Door Hanger"
  | "Other";

export type ServiceType =
  | "Sealcoating — Residential Driveway"
  | "Sealcoating — Commercial Parking Lot"
  | "Crack Filling — Hot Pour Rubberized"
  | "Crack Sealing — Routing & Sealing"
  | "Line Striping — Parking Stall Layout"
  | "Line Striping — ADA Compliance Restripe"
  | "Residential Driveway — Full Replacement"
  | "Residential Driveway — Overlay"
  | "Commercial Parking Lot — Mill & Overlay"
  | "Commercial Parking Lot — Full Depth Reclamation"
  | "Pothole Repair — Infrared Patching"
  | "Concrete Apron — Driveway Approach"
  | "Concrete Curb & Gutter — Commercial"
  | "Concrete Flat Work — Sidewalk / Pad";

export interface Lead {
  id: string;
  /** Prefixed: "lead_xxxxx" */
  callerName: string;
  /** Null for residential homeowners */
  businessName: string | null;
  phone: string;
  /** Null for incomplete captures */
  email: string | null;
  callerType: CallerType;
  servicesRequested: ServiceType[];
  heardAboutUs: HeardAboutUs;
  /** Null for incomplete captures */
  projectAddress: string | null;
  city: string;
  state: "WI" | "MN";
  zip: string;
  zoneId: string;
  callTimestamp: string;
  /** Call duration in seconds */
  callDuration: number;
  status: LeadStatus;
  /** True when the call was received outside 7am–5pm CST Mon–Fri */
  afterHours: boolean;
  /** True when Retell AI handled the call without human intervention */
  aiHandled: boolean;
  /** Populated when status is "Call Back Required" */
  aiEscalationReason?: string | null;
  /** Reference to original lead when status is "Duplicate" */
  duplicateOfId?: string | null;
  /** Estimated project value in USD */
  estimatedValue?: number | null;
  notes?: string | null;
  callLogId: string;
}

// ─── Call Log ────────────────────────────────────────────────────────────────

export type CallOutcome =
  | "Lead Captured"
  | "Incomplete Info"
  | "Escalated to Office"
  | "Out of Scope"
  | "Duplicate Caller"
  | "Wrong Number";

export interface CallLog {
  id: string;
  leadId: string | null;
  timestamp: string;
  /** Duration in seconds */
  duration: number;
  callerPhone: string;
  callerName: string;
  outcome: CallOutcome;
  afterHours: boolean;
  /** Short summary of what the AI captured during the call */
  transcriptSummary: string;
  /** 0–100 score from Retell AI conversation analysis */
  aiConfidenceScore: number;
}

// ─── Make.com Automation Runs ────────────────────────────────────────────────

export type ScenarioName =
  | "Lead Notification"
  | "Caller Confirmation"
  | "Lead Logging";

export type AutomationStatus = "Success" | "Failed" | "Retrying";

export interface AutomationRun {
  id: string;
  scenarioName: ScenarioName;
  triggeredAt: string;
  completedAt: string | null;
  status: AutomationStatus;
  leadId: string;
  /** Office manager email for notification runs */
  recipientEmail: string | null;
  /** Caller or office phone for confirmation/notification runs */
  recipientPhone: string | null;
  /** Populated on failure */
  errorMessage: string | null;
  /** Round-trip delivery time in milliseconds */
  deliveryMs: number | null;
}

// ─── Service Zones ────────────────────────────────────────────────────────────

export type ServiceDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

export interface ServiceZone {
  id: string;
  zoneName: string;
  cities: string[];
  zipCodes: string[];
  serviceDay: ServiceDay;
  crewAssigned: string;
  nextAvailableDate: string;
  /** True when the zone is actively accepting new estimate requests */
  accepting: boolean;
}

// ─── Dashboard / KPI Stats ────────────────────────────────────────────────────

export interface PipelineStats {
  leadsToday: number;
  leadsTodayChange: number;
  callsHandledByAI: number;
  callsHandledChange: number;
  /** Average call duration in seconds */
  avgCallDuration: number;
  avgCallDurationChange: number;
  /** Percentage of automation runs that succeeded */
  automationSuccessRate: number;
  automationSuccessChange: number;
  siteVisitRequests: number;
  siteVisitChange: number;
  afterHoursCalls: number;
  afterHoursChange: number;
  /** Percentage of calls that resulted in a fully captured lead */
  captureRate: number;
  captureRateChange: number;
  /** Notification delivery time in seconds */
  avgNotificationDelivery: number;
}

// ─── Chart Data ───────────────────────────────────────────────────────────────

export interface MonthlyCallVolume {
  month: string;
  totalCalls: number;
  leadsCaptured: number;
  estimateRequests: number;
  bookedJobs: number;
}

export interface ServiceBreakdown {
  service: string;
  /** Short display label */
  label: string;
  count: number;
  percentage: number;
}

export interface WeeklyTrendPoint {
  week: string;
  leads: number;
  conversions: number;
}

// ─── Challenge & Proposal Types ───────────────────────────────────────────────

export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ─── Frame / Screen types ─────────────────────────────────────────────────────

export interface DemoScreen {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
}

export type ConversionVariant = "sidebar" | "inline" | "floating" | "banner";
