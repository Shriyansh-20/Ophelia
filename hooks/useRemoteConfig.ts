import { useState, useEffect } from "react";

// In a real Firebase setup, this would use:
// import { fetchAndActivate, getString } from "firebase/remote-config";
// import { remoteConfig } from "../firebase";
//
// For this demo, we simulate Remote Config with a local default
// that mirrors what Firebase Remote Config would return.

const DEFAULT_ELIGIBLE_STATES = [
  "Pennsylvania", "New York", "New Jersey", "Virginia",
  "Maryland", "Ohio", "Florida", "Texas", "Illinois",
  "Michigan", "Connecticut", "Delaware", "Georgia",
  "Indiana", "Kentucky", "Massachusetts", "Minnesota",
  "Missouri", "North Carolina", "Washington",
];

interface RemoteConfigValues {
  eligibleStates: string[];
  widgetEnabled: boolean;
  loading: boolean;
}

export function useRemoteConfig(): RemoteConfigValues {
  const [eligibleStates, setEligibleStates] = useState<string[]>([]);
  const [widgetEnabled, setWidgetEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulates the async Firebase Remote Config fetch
    // In production:
    //   await fetchAndActivate(remoteConfig);
    //   const states = JSON.parse(getString(remoteConfig, "eligible_states"));
    //   const enabled = getString(remoteConfig, "eligibility_widget_enabled") === "true";
    const timer = setTimeout(() => {
      setEligibleStates(DEFAULT_ELIGIBLE_STATES);
      setWidgetEnabled(true);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return { eligibleStates, widgetEnabled, loading };
}