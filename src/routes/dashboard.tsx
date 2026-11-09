import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, MessageSquare, Mic, Video, Trash2 } from "lucide-react";
import { AppShell } from "@/components/intervue-you/app-shell";
import { ScoreRing, SkillBar } from "@/components/intervue-you/primitives";
import { SKILLS } from "@/data/marketing";
import { profileStore, formatRoleName, interviewService, type ProfileData, type Session } from "@/services/interview";
import { storage } from "@/lib/storage";
import { getToken } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Intervue You" },
      { name: "description", content: "Your interview readiness, skill scores and recent practice sessions." },
    ],
  }),
  component: Dashboard,
});

const icons = { text: MessageSquare, audio: Mic, video: Video };

// Helper to safely extract a numeric timestamp from any date format (MongoDB, string, timestamp)
function getSessionTime(s: any): number {
  const rawDate = s?.createdAt || s?.created_at || s?.date || s?.timestamp;
  if (!rawDate) return 0;
  if (typeof rawDate === "number") return rawDate;
  if (typeof rawDate === "string") {
    const t = new Date(rawDate).getTime();
    return isNaN(t) ? 0 : t;
  }
  if (rawDate.$date) {
    const t = new Date(rawDate.$date).getTime();
    return isNaN(t) ? 0 : t;
  }
  return 0;
}

function Dashboard() {
  const nav = useNavigate();
  const [data, setData] = useState<{ p: ProfileData | null; list: Session[]; name: string } | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      const token = getToken();

      if (!token) {
        nav({ to: "/login" });
        return;
      }

      const user = storage.get<{ name?: string }>("user", {});
      const currentProfile = profileStore.get();

      // Gather local sessions stored in localStorage as fallback
      const localSessions: Session[] = [];
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("intervue_session_") && !key.includes("undefined")) {
            const item = localStorage.getItem(key);
            if (item) {
              const parsed = JSON.parse(item);
              if (parsed && (parsed.id || parsed._id)) {
                localSessions.push(parsed);
              }
            }
          }
        }
      } catch (e) {
        console.warn("Could not read local session fallback:", e);
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/sessions`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const history = await res.json();
          
          // Safely extract session list from array or wrapper object ({ sessions: [...] }, { data: [...] })
          const apiList: Session[] = Array.isArray(history)
            ? history
            : Array.isArray(history?.sessions)
            ? history.sessions
            : Array.isArray(history?.data)
            ? history.data
            : [];

          // Deduplicate and merge API sessions with LocalStorage sessions
          const combinedMap = new Map<string, Session>();
          
          // 1. Load LocalStorage items first
          localSessions.forEach((s) => {
            const sId = String(s._id || s.id);
            if (sId && sId !== "undefined") {
              combinedMap.set(sId, s);
            }
          });

          // 2. Merge API items (updating local items or adding database-only items for Incognito mode)
          apiList.forEach((s: any) => {
            const sId = String(s._id || s.id);
            if (sId && sId !== "undefined") {
              const existing = combinedMap.get(sId);
              // Merge object fields so scores and reports are preserved in incognito
              combinedMap.set(sId, {
                ...existing,
                ...s,
                id: sId,
                _id: sId,
                createdAt: getSessionTime(s) || getSessionTime(existing),
              });
            }
          });

          // 3. Sort strictly from NEWEST to OLDEST
          const mergedList = Array.from(combinedMap.values()).sort(
            (a, b) => getSessionTime(b) - getSessionTime(a)
          );

          setData({
            p: currentProfile,
            list: mergedList,
            name: user.name || "there",
          });
        } else {
          const sortedLocal = localSessions.sort((a, b) => getSessionTime(b) - getSessionTime(a));
          setData({
            p: currentProfile,
            list: sortedLocal,
            name: user.name || "there",
          });
        }
      } catch (err) {
        console.error("Failed to load sessions from Express:", err);
        const sortedLocal = localSessions.sort((a, b) => getSessionTime(b) - getSessionTime(a));
        setData({
          p: currentProfile,
          list: sortedLocal,
          name: user.name || "there",
        });
      }
    };

    loadDashboardData();
  }, [nav]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this session?")) return;

    // Optimistically update the UI
    setData((prev) => (prev ? { ...prev, list: prev.list.filter((s) => String(s._id || s.id) !== String(id)) } : prev));
    await interviewService.delete(id);
  };

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

  // Extract score values directly from report or evaluation competencies
  const latestReport = latest?.evaluation?.report || latest?.report;
  const latestCompetencies = latestReport?.competencies;

  const derivedScores = {
    technical:
      latestCompetencies?.technical_depth?.score ??
      latest?.scores?.technical ??
      0,
    communication:
      latestCompetencies?.communication?.score ??
      latest?.scores?.communication ??
      0,
    problemSolving:
      latestCompetencies?.problem_solving?.score ??
      latest?.scores?.problemSolving ??
      0,
    teamwork:
      latestCompetencies?.teamwork?.score ??
      latest?.scores?.teamwork ??
      0,
  };

  const overallScore =
    latestReport?.overall_score ??
    latest?.evaluation?.overallScore ??
    latest?.overallScore ??
    latest?.overall ??
    0;

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">Welcome back, {name.split(" ")[0]}.</h1>
      <p className="mt-1 text-muted-foreground">
        {p ? `Practising for ${formatRoleName(p.role)} · ${p.level}` : "Select your target role to get tailored questions."}
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
          <ScoreRing value={overallScore} label="Readiness" />
          <div>
            <p className="text-sm text-muted-foreground">Readiness</p>
            <p className="font-display-serif text-2xl">
              {latest
                ? overallScore >= 70
                  ? "ready"
                  : "getting there"
                : "not started"}
            </p>
          </div>
        </div>
      </div>

      {latest && (
        <div className="surface-card mt-4 grid gap-4 rounded-3xl p-6 sm:grid-cols-2">
          {SKILLS.map((s) => (
            <SkillBar
              key={s.key}
              skill={s.key}
              value={derivedScores[s.key as keyof typeof derivedScores] ?? 75}
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
            const sessionId = String(s._id || s.id);
            const I = icons[s.mode as keyof typeof icons] || icons.text;
            const sessionOverall =
              s.evaluation?.report?.overall_score ??
              s.report?.overall_score ??
              s.overallScore ??
              s.overall ??
              "—";

            const timestamp = getSessionTime(s);
            const dateDisplay = timestamp > 0 ? new Date(timestamp).toLocaleDateString() : "Recent";

            return (
              <li key={sessionId} className="group relative flex items-center hover:bg-accent transition-colors">
                <Link
                  to="/results/$id"
                  params={{ id: sessionId }}
                  className="flex flex-1 items-center gap-4 px-5 py-4"
                >
                  <I className="h-4 w-4 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{formatRoleName(s.role)}</p>
                    <p className="text-xs text-muted-foreground">
                      {dateDisplay} · {s.minutes || 10} min
                    </p>
                  </div>
                  <span className="font-semibold tabular-nums">{sessionOverall}</span>
                </Link>
                <button
                  onClick={(e) => handleDelete(e, sessionId)}
                  className="absolute right-16 rounded p-2 text-muted-foreground opacity-0 hover:bg-muted hover:text-red-500 group-hover:opacity-100 transition-all"
                  aria-label="Delete session"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </AppShell>
  );
}