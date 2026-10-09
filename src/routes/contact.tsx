import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/intervue-you/info-page";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact", "Get in touch with the  Intervue You team for support, billing or partnerships."),
  component: () => (
    <InfoPage
      eyebrow="Contact"
      title="We'd love to hear from you."
      intro="Email support@intervueyou.app — a real person replies, usually within a few hours on weekdays."
      sections={[
        { h: "Support", p: "Trouble with your microphone, camera or a session? Email support@intervueyou.app with your device and browser and we'll help." },
        { h: "Billing", p: "Questions about plans, currencies or refunds: billing@intervueyou.app." },
        { h: "Universities and teams", p: "Running a careers service or bootcamp? Ask about group plans at partners@intervueyou.app." },
      ]}
    />
  ),
});
