import { useState, useEffect } from "react";
import type { EligibilityAnswers, OpioidType, Step, UsageFrequency } from "../types";
import {
  OPIOID_OPTIONS,
  FREQUENCY_OPTIONS,
  assessEligibility,
} from "../lib/Eligibility";
import { useRemoteConfig } from "../hooks/useRemoteConfig";
import { useEligibilityAnalytics } from "../hooks/useEligibilityAnalytics";
import styles from "./EligibilityWidget.module.css";

const STEP_ORDER: Step[] = ["type", "frequency", "state", "result"];

export default function EligibilityWidget() {
  const { eligibleStates, widgetEnabled, loading } = useRemoteConfig();
  const { logStep, logCompletion, logAbandonment } = useEligibilityAnalytics();

  const [step, setStep] = useState<Step>("type");
  const [answers, setAnswers] = useState<EligibilityAnswers>({
    opioidType: null,
    frequency: null,
    state: null,
  });

  const stepIndex = STEP_ORDER.indexOf(step);

  // Log abandonment when user leaves mid-flow
  useEffect(() => {
    return () => {
      if (step !== "result" && step !== "type") {
        logAbandonment(step);
      }
    };
  }, []);

  const selectOpioidType = (type: OpioidType) => {
    setAnswers((prev) => ({ ...prev, opioidType: type }));
    logStep("type", type);
    setStep("frequency");
  };

  const selectFrequency = (freq: UsageFrequency) => {
    setAnswers((prev) => ({ ...prev, frequency: freq }));
    logStep("frequency", freq);
    setStep("state");
  };

  const selectState = async (state: string) => {
    const updated = { ...answers, state };
    setAnswers(updated);
    logStep("state", state);
    const result = assessEligibility(updated, eligibleStates);
    await logCompletion(updated, result.eligible);
    setStep("result");
  };

  const reset = () => {
    setAnswers({ opioidType: null, frequency: null, state: null });
    setStep("type");
  };

  if (loading) {
    return (
      <div className={styles.widget}>
        <div className={styles.loadingDots}>
          <span /><span /><span />
        </div>
      </div>
    );
  }

  if (!widgetEnabled) return null;

  const result =
    step === "result"
      ? assessEligibility(answers, eligibleStates)
      : null;

  return (
    <div className={styles.widget}>
      {/* Browser chrome mockup */}
      <div className={styles.chromeBar}>
        <div className={styles.dots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <div className={styles.urlBar}>ophelia.com — anonymous eligibility check</div>
      </div>

      <div className={styles.body}>
        <p className={styles.intro}>
          Answer 3 quick questions — no account needed, completely private.
        </p>

        {/* Progress bar */}
        {step !== "type" && step !== "result" && (
          <div className={styles.progressWrap}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${styles.progressSeg} ${
                  i < stepIndex ? styles.progressDone : ""
                }`}
              />
            ))}
          </div>
        )}

        {/* Step: opioid type */}
        {step === "type" && (
          <div className={styles.stepWrap}>
            <h3 className={styles.question}>What type of opioids are you using?</h3>
            <div className={styles.optionGrid}>
              {OPIOID_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={styles.optBtn}
                  onClick={() => selectOpioidType(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: frequency */}
        {step === "frequency" && (
          <div className={styles.stepWrap}>
            <h3 className={styles.question}>How often are you using?</h3>
            <div className={styles.optionGrid}>
              {FREQUENCY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={styles.optBtn}
                  onClick={() => selectFrequency(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: state */}
        {step === "state" && (
          <div className={styles.stepWrap}>
            <h3 className={styles.question}>Which state are you in?</h3>
            <div className={styles.allStates}>
              {["Alabama","Alaska","Arizona","Arkansas","California","Colorado",
                "Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",
                "Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana",
                "Maine","Maryland","Massachusetts","Michigan","Minnesota",
                "Mississippi","Missouri","Montana","Nebraska","Nevada",
                "New Hampshire","New Jersey","New Mexico","New York",
                "North Carolina","North Dakota","Ohio","Oklahoma","Oregon",
                "Pennsylvania","Rhode Island","South Carolina","South Dakota",
                "Tennessee","Texas","Utah","Vermont","Virginia","Washington",
                "West Virginia","Wisconsin","Wyoming"].map((s) => (
                <button
                  key={s}
                  className={`${styles.stateBtn} ${
                    eligibleStates.includes(s) ? styles.stateBtnEligible : styles.stateBtnNot
                  }`}
                  onClick={() => selectState(s)}
                  title={eligibleStates.includes(s) ? "Ophelia is available here" : "Not yet available"}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className={styles.stateHint}>
              <span className={styles.hintDotGreen} /> Available &nbsp;&nbsp;
              <span className={styles.hintDotGray} /> Coming soon
            </p>
          </div>
        )}

        {/* Step: result */}
        {step === "result" && result && (
          <div className={styles.stepWrap}>
            <div
              className={`${styles.resultBox} ${
                result.eligible ? styles.resultSuccess : styles.resultNeutral
              }`}
            >
              <div className={styles.resultIcon}>{result.eligible ? "✓" : "→"}</div>
              <div>
                <div className={styles.resultTitle}>{result.message}</div>
                <div className={styles.resultSub}>{result.subMessage}</div>
              </div>
            </div>

            <div className={styles.resultActions}>
              <a
                href="https://my.ophelia.com/welcome"
                target="_blank"
                rel="noreferrer"
                className={styles.ctaBtn}
              >
                {result.ctaLabel} →
              </a>
              <button className={styles.resetBtn} onClick={reset}>
                Start over
              </button>
            </div>

            <p className={styles.disclaimer}>
              This is not a medical assessment. A licensed Ophelia clinician
              will confirm your eligibility during a free welcome call.
              No information entered here is stored or shared.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}