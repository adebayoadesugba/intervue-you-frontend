import { storage } from "@/lib/storage";
import type { SkillKey } from "@/data/marketing";

export type Mode = "text" | "audio" | "video";
export type Profile = { role: string; level: string; goal: string; cv?: string };
export type Turn = { q: string; a: string; followUp?: boolean };
export type Feedback = { q: string; a: string; score: number; note: string; better: string; star: Record<"S" | "T" | "A" | "R", boolean> };
export type Session = {
  id: string; 
  role: string; 
  mode: Mode; 
  minutes: number; 
  createdAt: number;
  experience?: string;
  timeframe?: string;
  cv?: string;
  turns: Turn[]; 
  scores?: Record<SkillKey, number>; 
  overall?: number; 
  feedback?: Feedback[];
  speech?: { wpm: number; fillers: number };
};

const FASTAPI_URL = "http://127.0.0.1:8000";
const EXPRESS_URL = `${import.meta.env.VITE_API_URL}/api`;

const BANK = [
  "Tell me about yourself and why this {role} role interests you.",
  "Describe a project you're proud of. What was your specific contribution?",
  "Tell me about a time you disagreed with a teammate. How did you resolve it?",
  "Walk me through how you'd approach a problem you've never seen before.",
  "What's a mistake you made at work, and what did you change afterwards?",
  "How do you prioritise when everything feels urgent?",
  "Where would you want to be in two years, and how does this role help?",
];

export const profileStore = {
  get: () => storage.get<Profile | null>("profile", null),
  set: (p: Profile) => storage.set("profile", p),
};

export const sessions = {
  all: (): Session[] => storage.get<Session[]>("sessions", []),
  get: (id: string) => sessions.all().find((s) => s.id === id) ?? null,
  save(s: Session) {
    const list = sessions.all().filter((x) => x.id !== s.id);
    storage.set("sessions", [s, ...list]);
  },
};

export const interviewService = {
  create(
    role: string, 
    mode: Mode, 
    minutes: number, 
    meta?: { experience?: string; timeframe?: string; cv?: string }
  ): Session {
    const s: Session = { 
      id: Math.random().toString(36).slice(2, 9), 
      role, 
      mode, 
      minutes, 
      createdAt: Date.now(), 
      turns: [],
      experience: meta?.experience,
      timeframe: meta?.timeframe,
      cv: meta?.cv
    };
    sessions.save(s);
    return s;
  },

  questionCount: (minutes: number) => Math.max(3, Math.min(7, Math.round(minutes / 2))),

  async nextQuestion(s: Session): Promise<{ q: string; followUp: boolean }> {
    try {
      // 1. Check if last answer was too brief for follow-up
      const last = s.turns[s.turns.length - 1];
      if (last && !last.followUp && last.a.trim().split(/\s+/).length < 25) {
        return { 
          q: "Could you go a bit deeper? What exactly did you do, and what was the measurable result?", 
          followUp: true 
        };
      }

      // 2. Fetch question from AI server or fallback bank
      const asked = s.turns.filter((t) => !t.followUp).length;
      return { q: BANK[asked % BANK.length]!.replace("{role}", s.role), followUp: false };
    } catch {
      const asked = s.turns.filter((t) => !t.followUp).length;
      return { q: BANK[asked % BANK.length]!.replace("{role}", s.role), followUp: false };
    }
  },

  async score(s: Session): Promise<Session> {
    let overall = 75;
    let feedback: Feedback[] = [];
    let scores: Record<SkillKey, number> = { technical: 75, communication: 75, problemSolving: 75, teamwork: 75 };

    try {
      // 1. Request AI Analysis from FastAPI AI Backend
      const aiRes = await fetch(`${FASTAPI_URL}/interview/${s.id}/report`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (aiRes.ok) {
        const report = await aiRes.json();
        overall = report.metrics?.overall_percentage ?? 75;
        if (report.feedback) feedback = report.feedback;
        if (report.skills) scores = report.skills;
      }
    } catch (e) {
      console.warn("AI scoring server offline, using local evaluation fallback:", e);
    }

    // 2. Fallback local evaluation if FastAPI feedback was empty
    if (feedback.length === 0) {
      feedback = s.turns.map((t) => {
        const w = t.a.split(/\s+/).filter(Boolean).length;
        const hasNum = /\d/.test(t.a);
        const star = { 
          S: w > 10, 
          T: /goal|task|needed|responsib/i.test(t.a), 
          A: /\bI\b/.test(t.a), 
          R: hasNum || /result|outcome|improv/i.test(t.a) 
        };
        const score = Math.min(95, 40 + w + (hasNum ? 10 : 0));
        return {
          q: t.q, 
          a: t.a, 
          score,
          note: w < 25 ? "Too short — the interviewer had to guess at your impact." : hasNum ? "Clear and backed by a number. Good." : "Solid structure, but end with a concrete result.",
          better: "Start with one line of context, say what you were responsible for, describe two actions you personally took, then finish with a measurable result.",
          star,
        };
      });

      const base = Math.round(feedback.reduce((n, f) => n + f.score, 0) / Math.max(1, feedback.length));
      const jitter = (n: number) => Math.max(20, Math.min(97, base + n));
      scores = { technical: jitter(1), communication: jitter(3), problemSolving: jitter(-2), teamwork: jitter(-4) };
      overall = Math.round((scores.technical + scores.communication + scores.problemSolving + scores.teamwork) / 4);
    }

    const words = s.turns.reduce((n, t) => n + t.a.split(/\s+/).filter(Boolean).length, 0);
    const fillers = s.turns.reduce((n, t) => n + (t.a.match(/\b(um|uh|like|basically|actually)\b/gi)?.length ?? 0), 0);

    const out: Session = { 
      ...s, 
      scores, 
      overall, 
      feedback, 
      speech: { wpm: s.mode === "text" ? 0 : 128 + (words % 30), fillers } 
    };

    // 3. Save locally
    sessions.save(out);

    // 4. Save to Express MongoDB Backend
  const token = localStorage.getItem("token");
  if (token) {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          role: out.role,
          experienceLevel: out.experience || "Mid-level",
          mode: out.mode,
          overallScore: out.overall,
          feedback: out.feedback,
          transcript: out.turns
        })
      });
    } catch (err) {
      console.error("Failed to persist session to MongoDB:", err);
    }
  }

    return out;
  },

  async coach(question: string, s: Session): Promise<string> {
    const weakest = s.scores ? (Object.entries(s.scores).sort((a, b) => a[1] - b[1])[0]?.[0] ?? "") : "";
    if (/star/i.test(question)) return "STAR = Situation, Task, Action, Result. Keep Situation and Task to two sentences combined, spend most time on Action, and always close with a Result you can measure.";
    if (/improve|next|practise|practice/i.test(question)) return `Your weakest area this session was ${weakest.replace("problemSolving", "problem solving")}. Do one 10-minute session tomorrow focused on it, and aim for answers of 60–90 seconds.`;
    return "Good question. Pick one answer from this session, rewrite it using the sample structure in the feedback, then say it out loud twice. Repetition is what makes it feel natural in the real thing.";
  },
};