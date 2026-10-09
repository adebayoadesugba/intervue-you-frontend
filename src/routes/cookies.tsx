import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/intervue-you/info-page";

export const Route = createFileRoute("/cookies")({
  head: () => meta("Cookie Policy", "The small set of cookies and local storage  Intervue You uses."),
  component: () => (
    <InfoPage
      eyebrow="Legal"
      title="Cookie Policy"
      intro="We keep it minimal: only what's needed to run the app and remember your preferences."
      sections={[
        { h: "Essential", p: "Keep you signed in and protect your account." },
        { h: "Preferences", p: "Remember your theme, interview defaults and performance settings on this device." },
        { h: "Analytics", p: "Anonymous product events (like 'session completed') with no personal data, to help us improve." },
      ]}
    />
  ),
});
