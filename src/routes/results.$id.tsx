import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { AppShell } from "@/components/rehearse/app-shell";
import { ScoreRing, SkillBar } from "@/components/rehearse/primitives";
import { SKILLS } from "@/data/marketing";
import { interviewService, sessions, type Session } from "@/services/interview";

export const Route = createFileRoute("/results/$id")({
  head: () => ({
    meta: [
      { title: "Your results — Rehearse" },
      { name: "description", content: "Scorecard, question-by-question feedback and coaching for your mock interview." },
      { property: "og:title", content: "Your results — Rehearse" },
      { property: "og:description", content: "See how you did and what to improve." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Results,
});

function Results() {
  const { id } = Route.useParams();
  const [s, setS] = useState<Session | null | undefined>(undefined);
  const [chat, setChat] = useState<{ me: boolean; t: string }[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { setS(sessions.get(id)); }, [id]);

  if (s === undefined) return <AppShell><div className="h-64" /></AppShell>;
  if (!s?.scores) return <AppShell><p>No results for this session yet. <Link to="/dashboard" className="text-primary">Back to dashboard</Link></p></AppShell>;

  const send = async (text: string) => {
    if (!text.trim() || busy) return;
    setChat((c) => [...c, { me: true, t: text }]); setMsg(""); setBusy(true);
    const r = await interviewService.coach(text, s);
    setChat((c) => [...c, { me: false, t: r }]); setBusy(false);
  };

  return (
    <AppShell>
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <ScoreRing value={s.overall!} size={120} label="Overall" />
        <div>
          <p className="text-sm text-muted-foreground">{s.role} · {s.mode} · {s.turns.length} answers</p>
          <h1 className="mt-1 text-3xl font-semibold">You're <span className="font-display-serif text-primary">{s.overall! >= 75 ? "interview-ready." : s.overall! >= 60 ? "nearly there." : "building up."}</span></h1>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="surface-card space-y-4 rounded-3xl p-6 lg:col-span-2">{SKILLS.map((k) => <SkillBar key={k.key} skill={k.key} value={s.scores![k.key]} />)}</div>
        <div className="surface-card grid grid-cols-2 gap-4 rounded-3xl p-6 text-center">
          <div><p className="text-2xl font-semibold tabular-nums">{s.speech?.wpm || "—"}</p><p className="text-xs text-muted-foreground">words / min</p></div>
          <div><p className="text-2xl font-semibold tabular-nums">{s.speech?.fillers ?? 0}</p><p className="text-xs text-muted-foreground">filler words</p></div>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-semibold">Question by question</h2>
      <div className="mt-3 space-y-3">
        {s.feedback?.map((f, i) => (
          <details key={i} className="surface-card group rounded-2xl p-5" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <span className="font-medium">{f.q}</span><span className="shrink-0 font-semibold tabular-nums">{f.score}</span>
            </summary>
            <div className="mt-4 space-y-4 text-sm">
              <p className="rounded-xl bg-muted p-3 text-muted-foreground">“{f.a}”</p>
              <p>{f.note}</p>
              <div className="flex gap-2">{(["S", "T", "A", "R"] as const).map((k) => <span key={k} className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${f.star[k] ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`}>{k}</span>)}<span className="self-center text-xs text-muted-foreground">STAR check</span></div>
              <div><p className="text-xs font-medium uppercase tracking-wider text-primary">A stronger answer</p><p className="mt-1 text-muted-foreground">{f.better}</p></div>
            </div>
          </details>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold">Ask your coach</h2>
      <div className="surface-card mt-3 rounded-3xl p-4">
        <div className="space-y-3">
          {chat.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {["What should I practise next?", "Explain the STAR method", "How do I sound more confident?"].map((p) => (
                <button key={p} onClick={() => send(p)} className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">{p}</button>
              ))}
            </div>
          )}
          {chat.map((m, i) => <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.me ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}>{m.t}</div>)}
          {busy && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); void send(msg); }} className="mt-4 flex gap-2">
          <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Ask about your answers…" className="h-11 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none focus:border-primary" />
          <button type="submit" aria-label="Send" className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground"><Send className="h-4 w-4" /></button>
        </form>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/interview/new" className="inline-flex h-12 items-center rounded-full bg-primary px-6 font-medium text-primary-foreground">Practise again</Link>
        <Link to="/dashboard" className="inline-flex h-12 items-center rounded-full border border-border px-6 font-medium">Dashboard</Link>
      </div>
    </AppShell>
  );
}
