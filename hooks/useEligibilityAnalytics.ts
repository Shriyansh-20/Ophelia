import { useCallback } from "react";
import type { EligibilityAnswers, Step } from "../../types";

// In production this logs to Firestore + Firebase Analytics:
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { logEvent } from "firebase/analytics";
// import { db, analytics } from "../firebase";

export function useEligibilityAnalytics() {
  const logStep = useCallback((step: Step, value?: string) => {
    // In production:
    // logEvent(analytics, "eligibility_step", { step, value });
    console.debug("[Analytics] eligibility_step", { step, value });
  }, []);

  const logCompletion = useCallback(async (
    answers: EligibilityAnswers,
    eligible: boolean
  ) => {
    // In production this writes an anonymised record to Firestore:
    // await addDoc(collection(db, "eligibility_checks"), {
    //   opioidType: answers.opioidType,
    //   frequency: answers.frequency,
    //   state: answers.state,
    //   eligible,
    //   timestamp: serverTimestamp(),
    // });
    console.debug("[Firestore] eligibility_check", { answers, eligible });
  }, []);

  const logAbandonment = useCallback((lastStep: Step) => {
    // logEvent(analytics, "eligibility_abandoned", { last_step: lastStep });
    console.debug("[Analytics] eligibility_abandoned", { lastStep });
  }, []);

  return { logStep, logCompletion, logAbandonment };
}