import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getRemoteConfig } from "firebase/remote-config";
import { getAnalytics } from "firebase/analytics";

// Firebase config — replace with real project credentials
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "ophelia-app.firebaseapp.com",
  projectId: "ophelia-app",
  storageBucket: "ophelia-app.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const remoteConfig = getRemoteConfig(app);
export const analytics = getAnalytics(app);

// Remote Config defaults — in production these are overridden by Firebase console
// This lets you toggle eligible states, feature flags etc. without a redeploy
remoteConfig.defaultConfig = {
  eligible_states: JSON.stringify([
    "Pennsylvania", "New York", "New Jersey", "Virginia",
    "Maryland", "Ohio", "Florida", "Texas", "Illinois",
    "Michigan", "Connecticut", "Delaware", "Georgia",
    "Indiana", "Kentucky", "Massachusetts", "Minnesota",
    "Missouri", "North Carolina", "Washington"
  ]),
  eligibility_widget_enabled: "true",
};