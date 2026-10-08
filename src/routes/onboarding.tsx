import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/rehearse/primitives";
import { Chip } from "@/components/rehearse/app-shell";
import { profileStore } from "@/services/interview";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your practice — Rehearse" },
      { name: "description", content: "Tell Rehearse the role you're going for so your interviews match it." },
      { property: "og:title", content: "Set up your practice — Rehearse" },
      { property: "og:description", content: "Three quick questions and you're ready to practise." },
    ],
  }),
  component: Onboarding,
});

const ROLES = ["Software engineer", "Product designer", "Product manager", "Data analyst", "Marketing", "Sales", "Graduate programme"];
const LEVELS = ["Student / graduate", "Junior", "Mid-level", "Senior", "Lead / manager"];
const GOALS = ["Interview this week", "Interview this month", "Just building confidence"];

function Onboarding() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [p, setP] = useState({ role: "", level: "", goal: "", cv: "" });
  const steps = [
    { t: "What role are you going for?", k: "role" as const, opts: ROLES },
    { t: "What's your experience level?", k: "level" as const, opts: LEVELS },
    { t: "When is your interview?", k: "goal" as const, opts: GOALS },
  ];
  const last = step === steps.length;
  const cur = steps[step];
  const canNext = last || (cur && p[cur.k]);
  const next = () => {
    if (!last) return setStep(step + 1);
    profileStore.set(p);
    nav({ to: "/dashboard" });
  };

  return (
    <div className="pt-safe pb-safe mx-auto flex min-h-dvh max-w-xl flex-col px-5 py-6">
      <div className="flex items-center justify-between"><Logo /><span className="text-xs text-muted-foreground">Step {step + 1} of 4</span></div>
      <div className="mt-6 grid grid-cols-4 gap-1.5">{[0, 1, 2, 3].map((i) => <span key={i} className={`h-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />)}</div>
      <div className="flex flex-1 flex-col justify-center py-10">
        {cur ? (
          <>
            <h1 className="text-3xl font-semibold">{cur.t}</h1>
            <div className="mt-8 flex flex-wrap gap-2">
              {cur.opts.map((o) => <Chip key={o} active={p[cur.k] === o} onClick={() => setP({ ...p, [cur.k]: o })}>{o}</Chip>)}
            </div>
            {cur.k === "role" && (
              <input placeholder="Or type a custom role…" value={ROLES.includes(p.role) ? "" : p.role} onChange={(e) => setP({ ...p, role: e.target.value })}
                className="mt-4 h-12 w-full rounded-xl border border-input bg-card px-4 outline-none focus:border-primary" />
            )}
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold">Paste your CV <span className="font-display-serif text-primary">(optional)</span></h1>
            <p className="mt-2 text-sm text-muted-foreground">We'll use it to ask about your real experience. You can skip this.</p>
            <textarea rows={8} value={p.cv} onChange={(e) => setP({ ...p, cv: e.target.value })} placeholder="Paste your CV or a short summary of your experience…"
              className="mt-6 w-full rounded-xl border border-input bg-card p-4 text-sm outline-none focus:border-primary" />
          </>
        )}
      </div>
      <div className="flex gap-3">
        {step > 0 && <Button variant="pillGhost" size="lg" onClick={() => setStep(step - 1)}><ArrowLeft />Back</Button>}
        <Button variant="pill" size="lg" className="flex-1" disabled={!canNext} onClick={next}>{last ? "Go to dashboard" : "Continue"}<ArrowRight /></Button>
      </div>
    </div>
  );
}
