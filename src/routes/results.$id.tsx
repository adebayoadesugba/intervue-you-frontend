import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Send, CheckCircle2, AlertTriangle, TrendingUp, Award, Quote, Check } from "lucide-react";
import { AppShell } from "@/components/intervue-you/app-shell";
import { ScoreRing, SkillBar } from "@/components/intervue-you/primitives";
import { SKILLS } from "@/data/marketing";
import { interviewService, sessions, formatRoleName, type Session } from "@/services/interview";
import { getToken } from "@/lib/auth";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const Route = createFileRoute("/results/$id")({
  beforeLoad: ({ location }) => {
    if (typeof window !== "undefined" && !getToken()) {
      if (location.pathname !== "/login") {
        throw redirect({ to: "/login" });
      }
    }
  },
  head: () => ({
    meta: [
      { title: "Your results — Intervue You" },
      { name: "description", content: "Scorecard, question-by-question feedback and coaching for your mock interview." },
      { property: "og:title", content: "Your results — Intervue You" },
      { property: "og:description", content: "See how you did and what to improve." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Results,
});

function Results() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const [s, setS] = useState<Session | null | undefined>(undefined);
  const [chat, setChat] = useState<{ me: boolean; t: string }[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const token = getToken();

      if (!token) {
        nav({ to: "/login" });
        return;
      }

      const local = sessions.get(id);
      if (local && local.report) {
        setS({ ...local, role: formatRoleName(local.role) });
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/sessions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return setS(null);

        const resData = await res.json();
        const data = resData.session || resData;
        const evalData = data.evaluation;
        const rawReport = data.report || evalData?.report;

        // Un-nest report if nested under rawReport.report
        const reportData = rawReport?.report || rawReport;

        const formattedSession: Session = {
          id: data._id || data.id,
          role: formatRoleName(data.role || "Software Engineer"),
          mode: data.mode || "text",
          minutes: data.minutes || 10,
          createdAt: new Date(data.createdAt || Date.now()).getTime(),
          turns: data.transcript || data.turns || [],
          overall: reportData?.overall_score ?? evalData?.overallScore ?? data.overallScore ?? 0,
          scores: evalData?.scores || data.scores || {
            technical: reportData?.competencies?.technical_depth?.score,
            communication: reportData?.competencies?.communication?.score,
            problemSolving: reportData?.competencies?.problem_solving?.score,
            teamwork: reportData?.competencies?.teamwork?.score,
          },
          speech: data.speech || { wpm: 125, fillers: 2 },
          feedback: typeof data.feedback === "string" ? JSON.parse(data.feedback) : (data.feedback || evalData?.feedback || []),
          evaluation: evalData,
          report: reportData,
        };

        setS(formattedSession);
      } catch (err) {
        console.error("Error fetching session from Express:", err);
        setS(null);
      }
    };

    fetchSession();
  }, [id, nav]);

  if (s === undefined) {
    return (
      <AppShell>
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </AppShell>
    );
  }

  if (!s) {
    return (
      <AppShell>
        <p className="p-8 text-center text-muted-foreground">
          No results found for this session.{" "}
          <Link to="/dashboard" className="text-primary hover:underline">
            Back to dashboard
          </Link>
        </p>
      </AppShell>
    );
  }

  const send = async (text: string) => {
    if (!text.trim() || busy) return;
    setChat((c) => [...c, { me: true, t: text }]);
    setMsg("");
    setBusy(true);

    try {
      const r = await interviewService.coach(text, s);
      setChat((c) => [...c, { me: false, t: r }]);
    } catch (err) {
      console.error("Coach response error:", err);
      setChat((c) => [
        ...c,
        { me: false, t: "I ran into an issue connecting to the AI coach. Please try asking again!" },
      ]);
    } finally {
      setBusy(false);
    }
  };

  // Safely unwrap report object
  const rawReport = s.report || s.evaluation?.report;
  const report = rawReport?.report || rawReport;
  const comps = report?.competencies || {};

  const techComp = comps.technical_depth;
  const problemComp = comps.problem_solving;
  const commComp = comps.communication;
  const teamComp = comps.teamwork;

  // Extract score numbers cleanly
  const techScore = techComp?.score ?? s.scores?.technical ?? 0;
  const problemScore = problemComp?.score ?? s.scores?.problemSolving ?? 0;
  const commScore = commComp?.score ?? s.scores?.communication ?? 0;
  const teamScore = teamComp?.score ?? s.scores?.teamwork ?? 0;
  const overallScore = report?.overall_score ?? s.overall ?? 0;

  // Ensure key lists have fallback elements
  const strengthsList = (report?.strengths && report.strengths.length > 0)
    ? report.strengths
    : ["Active participation demonstrated across evaluated responses."];

  const improvementsList = (report?.areas_for_improvement && report.areas_for_improvement.length > 0)
    ? report.areas_for_improvement
    : ["Provide deeper implementation details and trade-off comparisons in future answers."];

  const feedbackList = (s.feedback && s.feedback.length > 0)
    ? s.feedback
    : s.turns.map((t) => ({
        q: t.q,
        a: t.a,
        score: overallScore || 70,
        note: "Turn evaluated as part of the session.",
        star: null,
        better: "Provide a structured response covering key technical trade-offs and concrete implementation details.",
      }));

  return (
    <AppShell>
      {/* Overall Score Header */}
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <ScoreRing value={overallScore} size={120} label="Overall Score" />
        <div>
          <p className="text-sm text-muted-foreground">
            {formatRoleName(s.role)} · {s.mode.charAt(0).toUpperCase() + s.mode.slice(1)} · {s.turns.length} answers
          </p>
          <h1 className="mt-1 text-3xl font-semibold">
            You're{" "}
            <span className="font-display-serif text-primary">
              {overallScore >= 75 ? "interview-ready." : overallScore >= 60 ? "nearly there." : "building up."}
            </span>
          </h1>
        </div>
      </div>

      {/* 4D Python Competency Scores */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="surface-card flex flex-col items-center justify-center rounded-3xl p-4 text-center">
          <ScoreRing value={techScore} label="Technical" size={80} />
          <p className="mt-2 text-xs font-semibold">Technical Depth</p>
          <span className="mt-1 text-[10px] text-muted-foreground uppercase">{techComp?.status || "assessed"}</span>
        </div>
        <div className="surface-card flex flex-col items-center justify-center rounded-3xl p-4 text-center">
          <ScoreRing value={problemScore} label="Problem" size={80} />
          <p className="mt-2 text-xs font-semibold">Problem Solving</p>
          <span className="mt-1 text-[10px] text-muted-foreground uppercase">{problemComp?.status || "assessed"}</span>
        </div>
        <div className="surface-card flex flex-col items-center justify-center rounded-3xl p-4 text-center">
          <ScoreRing value={commScore} label="Comm" size={80} />
          <p className="mt-2 text-xs font-semibold">Communication</p>
          <span className="mt-1 text-[10px] text-muted-foreground uppercase">{commComp?.status || "assessed"}</span>
        </div>
        <div className="surface-card flex flex-col items-center justify-center rounded-3xl p-4 text-center">
          <ScoreRing value={teamScore} label="Teamwork" size={80} />
          <p className="mt-2 text-xs font-semibold">Teamwork</p>
          <span className="mt-1 text-[10px] text-muted-foreground uppercase">{teamComp?.status || "assessed"}</span>
        </div>
      </div>

      {/* Verified Candidate Evidence Quotes */}
      {(techComp?.evidence_quote || commComp?.evidence_quote || teamComp?.evidence_quote) && (
        <div className="surface-card mt-6 rounded-3xl p-6 space-y-3">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <Quote className="h-4 w-4 text-primary" /> Verified Candidate Evidence Quotes
          </h2>
          <div className="space-y-2 text-xs text-muted-foreground">
            {techComp?.evidence_quote && (
              <p className="rounded-xl bg-accent/40 p-3 border border-border">
                <strong className="text-foreground">Technical Depth:</strong> {techComp.evidence_quote}
                {techComp.evidence_verified && <Check className="ml-1.5 inline h-3.5 w-3.5 text-emerald-500" />}
              </p>
            )}
            {commComp?.evidence_quote && (
              <p className="rounded-xl bg-accent/40 p-3 border border-border">
                <strong className="text-foreground">Communication:</strong> {commComp.evidence_quote}
                {commComp.evidence_verified && <Check className="ml-1.5 inline h-3.5 w-3.5 text-emerald-500" />}
              </p>
            )}
            {teamComp?.evidence_quote && (
              <p className="rounded-xl bg-accent/40 p-3 border border-border">
                <strong className="text-foreground">Teamwork:</strong> {teamComp.evidence_quote}
                {teamComp.evidence_verified && <Check className="ml-1.5 inline h-3.5 w-3.5 text-emerald-500" />}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Executive Performance Summary */}
      <div className="surface-card mt-6 rounded-3xl p-6 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" /> Performance Summary
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {report?.overall_summary || `Candidate completed the interview session across ${s.turns.length} evaluated turns.`}
        </p>

        {report?.difficulty_progression_note && (
          <div className="rounded-2xl bg-accent/40 p-4 text-xs text-muted-foreground flex items-start gap-2 border border-border">
            <TrendingUp className="h-4 w-4 shrink-0 text-primary mt-0.5" />
            <span><strong>Difficulty Progression:</strong> {report.difficulty_progression_note}</span>
          </div>
        )}
      </div>

      {/* Key Strengths & Areas for Improvement */}
      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <div className="surface-card rounded-3xl p-6 space-y-3">
          <h3 className="text-sm font-semibold text-emerald-500 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Key Strengths
          </h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {strengthsList.map((st: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{st}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card rounded-3xl p-6 space-y-3">
          <h3 className="text-sm font-semibold text-amber-500 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> Areas for Improvement
          </h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {improvementsList.map((imp: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Question-by-Question Detailed Feedback */}
      <h2 className="mt-10 text-lg font-semibold">Question by question</h2>
      <div className="mt-3 space-y-3">
        {feedbackList.map((f, i) => (
          <details key={i} className="surface-card group rounded-2xl p-5" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <span className="font-medium text-sm text-foreground">{f.q}</span>
              
            </summary>
            <div className="mt-4 space-y-4 text-sm">
              <p className="rounded-xl bg-muted/60 p-3 text-muted-foreground leading-relaxed">“{f.a}”</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.note}</p>

              {/* STAR Check Badges */}
              <div className="flex items-center gap-2 pt-1">
                {(["S", "T", "A", "R"] as const).map((k) => {
                  const isChecked = Boolean(f.star && f.star[k]);
                  return (
                    <span
                      key={k}
                      className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold transition-colors ${
                        isChecked
                          ? "bg-emerald-500/20 text-emerald-500 dark:bg-emerald-500/30 dark:text-emerald-400"
                          : "bg-muted text-muted-foreground/60"
                      }`}
                    >
                      {k}
                    </span>
                  );
                })}
                <span className="self-center text-xs text-muted-foreground ml-1">STAR check</span>
              </div>

              {/* A Stronger Answer Section */}
              {f.better && (
                <div className="pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">A stronger answer</p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.better}</p>
                </div>
              )}
            </div>
          </details>
        ))}
      </div>

      {/* Ask Your Coach AI Chat */}
      <h2 className="mt-10 text-lg font-semibold">Ask your coach</h2>
      <div className="surface-card mt-3 rounded-3xl p-4">
        <div className="space-y-3">
          {chat.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {["What should I practise next?", "Explain the STAR method", "How do I sound more confident?"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => void send(p)}
                  className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}
          {chat.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                m.me ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {m.t}
            </div>
          ))}
          {busy && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(msg);
          }}
          className="mt-4 flex gap-2"
        >
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Ask about your answers…"
            className="h-11 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={!msg.trim() || busy}
            className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 transition-opacity"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Footer Navigation */}
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/interview/new"
          className="inline-flex h-12 items-center rounded-full bg-primary px-6 font-medium text-primary-foreground"
        >
          Practise again
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex h-12 items-center rounded-full border border-border px-6 font-medium"
        >
          Dashboard
        </Link>
      </div>
    </AppShell>
  );
}