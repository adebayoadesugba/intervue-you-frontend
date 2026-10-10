import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, MessageSquare, Mic, Video } from "lucide-react";
import { AppShell } from "@/components/intervue-you/app-shell";
import { ScoreRing, SkillBar } from "@/components/intervue-you/primitives";
import { SKILLS } from "@/data/marketing";
import { profileStore, type Profile, type Session } from "@/services/interview";
import { storage } from "@/lib/storage";
import { getToken } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Intervue You" },
      { name: "description", content: "Your interview readiness, skill scores and recent practice sessions." },
      { property: "og:title", content: "Dashboard — Intervue You" },
      { property: "og:description", content: "Track your interview readiness over time." },
    ],
  }),
  component: Dashboard,
});

const icons = { text: MessageSquare, audio: Mic, video: Video };

function Dashboard() {
  const nav = useNavigate();
  const [data, setData] = useState<{ p: Profile | null; list: Session[]; name: string } | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      const token = getToken();

      // 1. If user is not logged in, redirect to login page immediately
      if (!token) {
        nav({ to: "/login" });
        return;
      }

      const user = storage.get<{ name?: string }>("user", {});
      const currentProfile = profileStore.get();

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/sessions`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const history = await res.json();
          setData({
            p: currentProfile,
            list: history,
            name: user.name || "there",
          });
        } else {
          setData({
            p: currentProfile,
            list: [],
            name: user.name || "there",
          });
        }
      } catch (err) {
        console.error("Failed to load sessions from Express:", err);
        setData({
          p: currentProfile,
          list: [],
          name: user.name || "there",
        });
      }
    };

    loadDashboardData();
  }, [nav]);

  if (!data) {
    return (
      <AppShell>
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </AppShell>
    );
  }

  const { p, list, name } = data;
  const latest: any = list[0];

  // Default fallback scores for sessions that don't have explicit score objects saved
  const defaultScores = { technical: 75, communication: 75, problemSolving: 75, teamwork: 75 };
  const latestScores = latest ? (latest.scores || defaultScores) : null;

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">Welcome back, {name.split(" ")[0]}.</h1>
      <p className="mt-1 text-muted-foreground">
        {p ? `Practising for ${p.role} · ${p.level}` : "Tell us your target role to get tailored questions."}
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="surface-card flex flex-col justify-between gap-6 rounded-3xl p-6 lg:col-span-2">
          <div>
            <p className="text-sm text-muted-foreground">Next step</p>
            <p className="mt-2 text-xl font-semibold">
              {latest ? "Keep the streak going." : "Your first interview takes 10 minutes."}
            </p>
          </div>
          <Link
            to="/interview/new"
            className="inline-flex h-10 w-fit items-center gap-2 rounded-full bg-primary px-4 font-medium text-primary-foreground hover:shadow-glow"
          >
            Start an interview <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="surface-card flex items-center gap-5 rounded-3xl p-6">
          <ScoreRing value={latest?.overallScore ?? latest?.overall ?? 0} label="Readiness" />
          <div>
            <p className="text-sm text-muted-foreground">Readiness</p>
            <p className="font-display-serif text-2xl">
              {latest
                ? (latest.overallScore ?? latest.overall) >= 70
                  ? "ready"
                  : "getting there"
                : "not started"}
            </p>
          </div>
        </div>
      </div>

      {/* Render skill progress bars whenever at least one session exists */}
      {latest && latestScores && (
        <div className="surface-card mt-4 grid gap-4 rounded-3xl p-6 sm:grid-cols-2">
          {SKILLS.map((s) => (
            <SkillBar
              key={s.key}
              skill={s.key}
              value={latestScores[s.key] ?? 75}
            />
          ))}
        </div>
      )}

      <h2 className="mt-10 text-lg font-semibold">Recent sessions</h2>
      {list.length === 0 ? (
        <p className="mt-3 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No sessions yet. Your scores will appear here.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {list.map((s: any) => {
            const sessionId = s._id || s.id;
            const I = icons[s.mode as keyof typeof icons] || icons.text;
            return (
              <li key={sessionId}>
                <Link
                  to="/results/$id"
                  params={{ id: sessionId }}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-accent transition-colors"
                >
                  <I className="h-4 w-4 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{s.role}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(s.createdAt).toLocaleDateString()} · {s.minutes || 10} min
                    </p>
                  </div>
                  <span className="font-semibold tabular-nums">
                    {s.overallScore ?? s.overall ?? "—"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </AppShell>
  );
}