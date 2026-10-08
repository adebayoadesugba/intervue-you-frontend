/**
 * Mock interview service. REAL API: replace question generation, follow-ups,
 * scoring and coach replies with server calls to an AI model. Keep signatures.
 */
import { storage } from "@/lib/storage";
import type { SkillKey } from "@/data/marketing";

export type Mode = "text" | "audio" | "video";
export type Profile = { role: string; level: string; goal: string; cv?: string };
export type Turn = { q: string; a: string; followUp?: boolean };
export type Feedback = { q: string; a: string; score: number; note: string; better: string; star: Record<"S" | "T" | "A" | "R", boolean> };
export type Session = {
  id: string; role: string; mode: Mode; minutes: number; createdAt: number;
  turns: Turn[]; scores?: Record<SkillKey, number>; overall?: number; feedback?: Feedback[];
  speech?: { wpm: number; fillers: number };
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
  all: () => storage.get<Session[]>("sessions", []),
  get: (id: string) => sessions.all().find((s) => s.id === id) ?? null,
  save(s: Session) {
    const list = sessions.all().filter((x) => x.id !== s.id);
    storage.set("sessions", [s, ...list]);
  },
};

export const interviewService = {
  create(role: string, mode: Mode, minutes: number): Session {
    const s: Session = { id: Math.random().toString(36).slice(2, 9), role, mode, minutes, createdAt: Date.now(), turns: [] };
    sessions.save(s);
    return s;
  },
  questionCount: (minutes: number) => Math.max(3, Math.min(7, Math.round(minutes / 2))),
  async nextQuestion(s: Session): Promise<{ q: string; followUp: boolean }> {
    await wait(900);
    const last = s.turns[s.turns.length - 1];
    if (last && !last.followUp && last.a.trim().split(/\s+/).length < 25) {
      return { q: "Could you go a bit deeper? What exactly did you do, and what was the measurable result?", followUp: true };
    }
    const asked = s.turns.filter((t) => !t.followUp).length;
    return { q: BANK[asked % BANK.length]!.replace("{role}", s.role), followUp: false };
  },
  async score(s: Session): Promise<Session> {
    await wait(1400);
    const feedback: Feedback[] = s.turns.map((t) => {
      const w = t.a.split(/\s+/).filter(Boolean).length;
      const hasNum = /\d/.test(t.a);
      const star = { S: w > 10, T: /goal|task|needed|responsib/i.test(t.a), A: /\bI\b/.test(t.a), R: hasNum || /result|outcome|improv/i.test(t.a) };
      const score = Math.min(95, 40 + w + (hasNum ? 10 : 0));
      return {
        q: t.q, a: t.a, score,
        note: w < 25 ? "Too short — the interviewer had to guess at your impact." : hasNum ? "Clear and backed by a number. Good." : "Solid structure, but end with a concrete result.",
        better: "Start with one line of context, say what you were responsible for, describe two actions you personally took, then finish with a measurable result (e.g. \"cut load time by 40%\").",
        star,
      };
    });
    const words = s.turns.reduce((n, t) => n + t.a.split(/\s+/).filter(Boolean).length, 0);
    const base = Math.round(feedback.reduce((n, f) => n + f.score, 0) / Math.max(1, feedback.length));
    const jitter = (n: number) => Math.max(20, Math.min(97, base + n));
    const scores = { technical: jitter(1), communication: jitter(3), problemSolving: jitter(-2), teamwork: jitter(-4) };
    const fillers = s.turns.reduce((n, t) => n + (t.a.match(/\b(um|uh|like|basically|actually)\b/gi)?.length ?? 0), 0);
    const out: Session = { ...s, scores, overall: Math.round((scores.technical + scores.communication + scores.problemSolving + scores.teamwork) / 4), feedback, speech: { wpm: s.mode === "text" ? 0 : 128 + (words % 30), fillers } };
    sessions.save(out);
    return out;
  },
  async coach(question: string, s: Session): Promise<string> {
    await wait(900);
    const weakest = s.scores ? (Object.entries(s.scores).sort((a, b) => a[1] - b[1])[0]?.[0] ?? "") : "";
    if (/star/i.test(question)) return "STAR = Situation, Task, Action, Result. Keep Situation and Task to two sentences combined, spend most time on Action, and always close with a Result you can measure.";
    if (/improve|next|practise|practice/i.test(question)) return `Your weakest area this session was ${weakest.replace("problemSolving", "problem solving")}. Do one 10-minute session tomorrow focused on it, and aim for answers of 60–90 seconds.`;
    return "Good question. Pick one answer from this session, rewrite it using the sample structure in the feedback, then say it out loud twice. Repetition is what makes it feel natural in the real thing.";
  },
};
