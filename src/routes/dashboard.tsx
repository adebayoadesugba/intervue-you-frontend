import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, MessageSquare, Mic, Video } from "lucide-react";
import { AppShell } from "@/components/rehearse/app-shell";
import { ScoreRing, SkillBar } from "@/components/rehearse/primitives";
import { SKILLS } from "@/data/marketing";
import { profileStore, sessions, type Profile, type Session } from "@/services/interview";
import { storage } from "@/lib/storage";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Rehearse" },
      { name: "description", content: "Your interview readiness, skill scores and recent practice sessions." },
      { property: "og:title", content: "Dashboard — Rehearse" },
      { property: "og:description", content: "Track your interview readiness over time." },
    ],
  }),
  component: Dashboard,
});

const icons = { text: MessageSquare, audio: Mic, video: Video };

function Dashboard() {
  const [data, setData] = useState<{ p: Profile | null; list: Session[]; name: string } | null>(null);
  useEffect(() => {
    setData({ p: profileStore.get(), list: sessions.all().filter((s) => s.scores), name: storage.get<{ name: string } | null>("user", null)?.name ?? "there" });
  }, []);
  if (!data) return <AppShell><div className="h-64" /></AppShell>;
  const { p, list, name } = data;
  const latest = list[0];

  return (
    <AppShell>
      <h1 className="text-3xl font-semibold">Welcome back, {name.split(" ")[0]}.</h1>
      <p className="mt-1 text-muted-foreground">{p ? `Practising for ${p.role} · ${p.level}` : "Tell us your target role to get tailored questions."}</p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="surface-card flex flex-col justify-between gap-6 rounded-3xl p-6 lg:col-span-2">
          <div>
            <p className="text-sm text-muted-foreground">Next step</p>
            <p className="mt-2 text-2xl font-semibold">{latest ? "Keep the streak going." : "Your first interview takes 10 minutes."}</p>
          </div>
          <Link to="/interview/new" className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground hover:shadow-glow">
            Start an interview <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="surface-card flex items-center gap-5 rounded-3xl p-6">
          <ScoreRing value={latest?.overall ?? 0} label="Readiness" />
          <div><p className="text-sm text-muted-foreground">Readiness</p><p className="font-display-serif text-2xl">{latest ? (latest.overall! >= 70 ? "ready" : "getting there") : "not started"}</p></div>
        </div>
      </div>

      {latest?.scores && (
        <div className="surface-card mt-4 grid gap-4 rounded-3xl p-6 sm:grid-cols-2">
          {SKILLS.map((s) => <SkillBar key={s.key} skill={s.key} value={latest.scores![s.key]} />)}
        </div>
      )}

      <h2 className="mt-10 text-lg font-semibold">Recent sessions</h2>
      {list.length === 0 ? (
        <p className="mt-3 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No sessions yet. Your scores will appear here.</p>
      ) : (
        <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {list.map((s) => {
            const I = icons[s.mode];
            return (
              <li key={s.id}>
                <Link to="/results/$id" params={{ id: s.id }} className="flex items-center gap-4 px-5 py-4 hover:bg-accent">
                  <I className="h-4 w-4 text-muted-foreground" />
                  <div className="min-w-0 flex-1"><p className="truncate font-medium">{s.role}</p><p className="text-xs text-muted-foreground">{new Date(s.createdAt).toLocaleDateString()} · {s.minutes} min</p></div>
                  <span className="font-semibold tabular-nums">{s.overall}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </AppShell>
  );
}
