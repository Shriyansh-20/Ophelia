import type {
  EligibilityAnswers,
  EligibilityResult,
  OpioidType,
  UsageFrequency,
} from "../types";

export const OPIOID_OPTIONS: { value: OpioidType; label: string }[] = [
  { value: "prescription", label: "Prescription painkillers" },
  { value: "heroin", label: "Heroin" },
  { value: "fentanyl", label: "Fentanyl" },
  { value: "methadone", label: "Methadone" },
  { value: "other", label: "Other / not sure" },
];

export const FREQUENCY_OPTIONS: { value: UsageFrequency; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Several times a week" },
  { value: "occasionally", label: "Occasionally" },
];

export function assessEligibility(
  answers: EligibilityAnswers,
  eligibleStates: string[]
): EligibilityResult {
  const stateEligible =
    answers.state !== null && eligibleStates.includes(answers.state);

  // All opioid types are candidates for MAT — no exclusions by type
  const typeEligible = answers.opioidType !== null;

  // "Occasionally" users may still be eligible — Ophelia evaluates each case
  const frequencyEligible = answers.frequency !== null;

  if (!stateEligible) {
    return {
      eligible: false,
      message: "Ophelia isn't in your state yet",
      subMessage:
        "We're expanding quickly. Leave your email and we'll notify you the moment we launch in your area.",
      ctaLabel: "Notify me",
    };
  }

  if (typeEligible && frequencyEligible) {
    return {
      eligible: true,
      message: "You're likely a good candidate for Ophelia",
      subMessage:
        "Most patients in your situation are eligible and pay less than $10/month with insurance. A clinician will confirm during your free welcome call.",
      ctaLabel: "Explore treatment",
    };
  }

  return {
    eligible: false,
    message: "Let's find out together",
    subMessage:
      "Your situation sounds like it might be a fit, but our care team can give you a definitive answer in a free, no-commitment call.",
    ctaLabel: "Talk to the team",
  };
}

export function getProgressPercent(currentStep: number, totalSteps = 3): number {
  return Math.round((currentStep / totalSteps) * 100);
}