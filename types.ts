export type OpioidType =
  | "prescription"
  | "heroin"
  | "fentanyl"
  | "methadone"
  | "other";

export type UsageFrequency = "daily" | "weekly" | "occasionally";

export interface EligibilityAnswers {
  opioidType: OpioidType | null;
  frequency: UsageFrequency | null;
  state: string | null;
}

export interface EligibilityResult {
  eligible: boolean;
  message: string;
  subMessage: string;
  ctaLabel: string;
}

export type Step = "type" | "frequency" | "state" | "result";

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  source: string;
}

export interface UXObservation {
  id: number;
  title: string;
  description: string;
  proposal: string;
  tag: string;
}

export interface SkillBar {
  name: string;
  level: number; // 0–100
  note: string;
  strong: boolean;
}