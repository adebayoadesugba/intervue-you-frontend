import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/rehearse/info-page";

export const Route = createFileRoute("/about")({
  head: () => meta("About", "Why we built Rehearse: honest, private interview practice for everyone."),
  component: () => (
    <InfoPage
      eyebrow="About"
      title="Practice shouldn't depend on who you know."
      intro="Most people get one or two real mock interviews before the day that matters — if they're lucky. Rehearse gives everyone an interviewer who listens, follows up and tells the truth."
      sections={[
        { h: "What we believe", p: "Confidence comes from repetition, not tricks. We help you rehearse out loud until your best stories come easily, then show you exactly what to sharpen." },
        { h: "Built for practice, not shortcuts", p: "Rehearse is for preparation. We will never build hidden tools that feed you answers during a real interview." },
        { h: "Privacy first", p: "Recordings are off by default, video stays on your device, and you can delete everything in one click." },
      ]}
    />
  ),
});
