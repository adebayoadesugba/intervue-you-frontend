import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/rehearse/info-page";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact", "Get in touch with the Rehearse team for support, billing or partnerships."),
  component: () => (
    <InfoPage
      eyebrow="Contact"
      title="We'd love to hear from you."
      intro="Email support@rehearse.app — a real person replies, usually within a few hours on weekdays."
      sections={[
        { h: "Support", p: "Trouble with your microphone, camera or a session? Email support@rehearse.app with your device and browser and we'll help." },
        { h: "Billing", p: "Questions about plans, currencies or refunds: billing@rehearse.app." },
        { h: "Universities and teams", p: "Running a careers service or bootcamp? Ask about group plans at partners@rehearse.app." },
      ]}
    />
  ),
});
