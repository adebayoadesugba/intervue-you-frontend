import { getToken } from "@/lib/auth";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function formatRoleName(role?: string): string {
  if (!role) return "Software Engineer";
  const normalized = role.toLowerCase().trim();
  const map: Record<string, string> = {
    frontend: "Frontend Engineer",
    backend: "Backend Engineer",
    "ai-engineering": "AI Engineer",
    uiux: "UI/UX Designer",
    "graduate-trainee": "Graduate Trainee",
    "nysc-trainee": "NYSC Trainee",
    copywriting: "Copywriter",
  };
  if (map[normalized]) return map[normalized]!;
  return role
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export interface Turn {
  q: string;
  a: string;
  followUp?: boolean;
}

export interface SkillScores {
  technical?: number | null;
  communication?: number | null;
  problemSolving?: number | null;
  teamwork?: number | null;
}

export interface CompetencyDetail {
  score: number | null;
  status: "assessed" | "not_assessed" | string;
  evidence_quote: string | null;
  evidence_verified: boolean;
}

export interface ReportData {
  overall_summary?: string;
  overall_score?: number;
  strengths?: string[];
  areas_for_improvement?: string[];
  difficulty_progression_note?: string;
  follow_up_count?: number;
  incomplete_technical_slots?: number;
  competencies?: {
    technical_depth?: CompetencyDetail;
    problem_solving?: CompetencyDetail;
    communication?: CompetencyDetail;
    teamwork?: CompetencyDetail;
  };
  session_meta?: {
    prompt_version?: string;
    rubric_version?: string;
    question_bank_version?: string;
  };
}

export interface FeedbackItem {
  q: string;
  a: string;
  score: number;
  note: string;
  star?: { S: boolean; T: boolean; A: boolean; R: boolean } | null;
  better: string;
}

export interface SessionEvaluation {
  overallScore: number;
  readinessLabel?: string;
  scores: SkillScores;
  feedback: FeedbackItem[];
  strengths?: string[];
  improvements?: string[];
  report?: ReportData;
}

export interface Session {
  id: string;
  _id?: string;
  pendingQuestion?: string;
  role: string;
  mode: "text" | "audio" | "video";
  minutes: number;
  experienceLevel?: string;
  stack?: string[];
  timeframe?: string;
  cv?: string;
  createdAt: number;
  turns: Turn[];
  company?: string;
  overall?: number;
  scores?: SkillScores;
  speech?: { wpm: number; fillers: number };
  feedback?: FeedbackItem[];
  evaluation?: SessionEvaluation;
  report?: ReportData;
}

export interface CreateSessionPayload {
  role: string;
  mode: "text" | "audio" | "video";
  minutes: number;
  experienceLevel?: string;
  timeframe?: string;
  cv?: string;
  company?: string;
  category?: string;
  stack?: string[];
}

class SessionStore {
  private prefix = "intervue_session_";
  get(id: string): Session | null {
    if (typeof window === "undefined" || !id || id === "undefined") return null;
    try {
      const stored = localStorage.getItem(`${this.prefix}${id}`);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }
  save(session: Session): void {
    if (typeof window === "undefined" || !session || !session.id) return;
    try {
      localStorage.setItem(`${this.prefix}${session.id}`, JSON.stringify(session));
      if (session._id) localStorage.setItem(`${this.prefix}${session._id}`, JSON.stringify(session));
    } catch (e) {}
  }
  remove(id: string): void {
    if (typeof window === "undefined" || !id) return;
    try {
      localStorage.removeItem(`${this.prefix}${id}`);
    } catch (e) {}
  }
}

export const sessions = new SessionStore();

export interface ProfileData {
  role: string;
  level?: string;
  company?: string;
}

class ProfileStore {
  private key = "intervue_profile";

  get(): ProfileData {
    if (typeof window === "undefined") return { role: "Software Engineer", level: "Mid-level" };
    try {
      const stored = localStorage.getItem(this.key);
      if (stored) return JSON.parse(stored);
      const userProfile = localStorage.getItem("profile");
      if (userProfile) return JSON.parse(userProfile);
    } catch (e) {
      console.error("Failed to read profile from local storage:", e);
    }
    return { role: "Software Engineer", level: "Mid-level" };
  }

  save(data: ProfileData): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
      localStorage.setItem("profile", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save profile to local storage:", e);
    }
  }
}

export const profileStore = new ProfileStore();

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || data.message || `API request failed with status ${response.status}`);
  return data as T;
}

function normalizeTurns(raw: any): Turn[] {
  const list = raw?.transcript || raw?.turns || [];
  if (!Array.isArray(list)) return [];
  return list.map((t: any) => ({
    q: t.q ?? t.question ?? "",
    a: t.a ?? t.userAnswer ?? "",
    followUp: Boolean(t.followUp),
  }));
}

export const interviewService = {
  questionCount(minutes: number): number {
    
    if (minutes <= 10) return 4;  // 3 Base + 1 Tech
    if (minutes <= 15) return 5;  // 3 Base + 2 Tech
    if (minutes <= 20) return 7;  // 3 Base + 4 Tech
    if (minutes <= 30) return 9;  // 3 Base + 6 Tech
    return 11;                    // 3 Base + 8 Tech
  },

  async create(payload: CreateSessionPayload): Promise<Session> {
    const data = await apiFetch<any>("/api/interview/session", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const raw = data.session || data;
    const sessionId = String(raw._id || raw.id);

    const formattedSession: Session = {
      id: sessionId,
      _id: sessionId,
      pendingQuestion: raw.pendingQuestion,
      role: formatRoleName(raw.role || payload.role),
      mode: raw.mode || payload.mode,
      minutes: raw.minutes || payload.minutes,
      experienceLevel: raw.experienceLevel || payload.experienceLevel,
      stack: raw.stack || payload.stack || ["core"],
      timeframe: raw.timeframe || payload.timeframe,
      cv: raw.cv || payload.cv,
      createdAt: new Date(raw.createdAt || Date.now()).getTime(),
      turns: normalizeTurns(raw),
      company: raw.company || payload.company || "",
    };

    sessions.save(formattedSession);
    return formattedSession;
  },

  async score(session: Session): Promise<SessionEvaluation> {
    const targetId = session.id || session._id;
    const data = await apiFetch<{ evaluation?: SessionEvaluation; session?: any; report?: ReportData }>(
      `/api/interview/session/${targetId}/evaluate`,
      {
        method: "POST",
        body: JSON.stringify({ transcript: session.turns }),
      }
    );

    const raw = data.session || data;
    const reportData: ReportData | undefined = data.report || raw?.report || raw?.evaluation?.report;

    const evaluation: SessionEvaluation = data.evaluation || raw?.evaluation || {
      overallScore: reportData?.overall_score ?? raw?.overallScore ?? 0,
      scores: raw?.scores || {
        technical: reportData?.competencies?.technical_depth?.score ?? null,
        communication: reportData?.competencies?.communication?.score ?? null,
        problemSolving: reportData?.competencies?.problem_solving?.score ?? null,
        teamwork: reportData?.competencies?.teamwork?.score ?? null,
      },
      feedback: raw?.feedback || [],
      strengths: reportData?.strengths,
      improvements: reportData?.areas_for_improvement,
      report: reportData,
    };

    const updatedSession: Session = {
      ...session,
      overall: evaluation.overallScore,
      scores: evaluation.scores,
      evaluation,
      report: reportData || evaluation.report,
    };
    sessions.save(updatedSession);
    return evaluation;
  },

  async coach(message: string, session: Session): Promise<string> {
    const targetId = session.id || session._id;
    const data = await apiFetch<{ reply: string }>(`/api/interview/session/${targetId}/coach`, {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    return data.reply;
  },

  async getSession(id: string): Promise<Session | null> {
    if (!id || id === "undefined") return null;
    const cached = sessions.get(id);

    try {
      const data = await apiFetch<{ session: any }>(`/api/interview/session/${id}`);
      const raw = data.session || data;
      if (!raw) return cached;

      const evalData: SessionEvaluation | undefined = raw.evaluation;
      const reportData: ReportData | undefined = raw.report || evalData?.report || cached?.report;
      const sessionId = String(raw._id || raw.id || id);
      const remoteTurns = normalizeTurns(raw);

      const formatted: Session = {
        id: sessionId,
        _id: sessionId,
        pendingQuestion: raw.pendingQuestion ?? cached?.pendingQuestion,
        role: formatRoleName(raw.role || "Software Engineer"),
        mode: raw.mode || "text",
        minutes: raw.minutes || 10,
        experienceLevel: raw.experienceLevel ?? cached?.experienceLevel,
        stack: raw.stack || cached?.stack || ["core"],
        timeframe: raw.timeframe ?? cached?.timeframe,
        cv: raw.cv ?? cached?.cv,
        createdAt: new Date(raw.createdAt || cached?.createdAt || Date.now()).getTime(),
        turns: (cached?.turns?.length ?? 0) > remoteTurns.length ? cached!.turns : remoteTurns,
        company: raw.company || cached?.company || "",
        overall: reportData?.overall_score ?? evalData?.overallScore ?? raw.overallScore,
        scores: evalData?.scores || raw.scores || {
          technical: reportData?.competencies?.technical_depth?.score ?? null,
          communication: reportData?.competencies?.communication?.score ?? null,
          problemSolving: reportData?.competencies?.problem_solving?.score ?? null,
          teamwork: reportData?.competencies?.teamwork?.score ?? null,
        },
        feedback: typeof raw.feedback === "string" ? JSON.parse(raw.feedback) : (raw.feedback || evalData?.feedback || cached?.feedback || []),
        evaluation: evalData,
        report: reportData,
      };

      sessions.save(formatted);
      return formatted;
    } catch (err) {
      return cached;
    }
  },

  async delete(id: string): Promise<boolean> {
    sessions.remove(id);
    try {
      await apiFetch(`/api/interview/session/${id}`, { method: "DELETE" });
      return true;
    } catch (err) {
      console.error("Failed to delete session remotely", err);
      return false;
    }
  },
};