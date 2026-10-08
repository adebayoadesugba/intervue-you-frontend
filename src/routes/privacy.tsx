import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/rehearse/info-page";

export const Route = createFileRoute("/privacy")({
  head: () => meta("Privacy Policy", "How Rehearse handles your answers, recordings and personal data."),
  component: () => (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Your practice is private. Here's exactly what we collect and why."
      sections={[
        { h: "What we collect", p: "Your account details, the answers you give during sessions, and any CV or job listing you upload." },
        { h: "How answers are processed", p: "Your answers are sent to an AI provider to generate questions and feedback. They are never shared with employers or used to advertise to you." },
        { h: "Recordings", p: "Audio and video recording is off by default. Video stays on your device unless you choose to save a recording." },
        { h: "Your controls", p: "Export or delete all your data at any time from Settings → Privacy." },
      ]}
    />
  ),
});
