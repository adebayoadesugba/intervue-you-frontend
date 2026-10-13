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

export interface Turn { q: string; a: string; followUp?: boolean; }
export interface SkillScores { technical?: number; communication?: number; problemSolving?: number; teamwork?: number; }
export interface QuestionFeedback { q: string; a: string; score: number; note: string; star: { S: boolean; T: boolean; A: boolean; R: boolean; }; better: string; }
export interface StarAssessment { situation: string; task: string; action: string; result: string; }
export interface SessionEvaluation { overallScore: number; readinessLabel: string; scores: SkillScores; starAssessment?: StarAssessment; feedback: QuestionFeedback[]; strengths?: string[]; improvements?: string[]; }

export interface Session {
  id: string;
  _id?: string;
  role: string;
  mode: "text" | "audio" | "video";
  minutes: number;
  experienceLevel?: string;
  timeframe?: string;
  cv?: string;
  createdAt: number;
  turns: Turn[];
  company?: string;
  overall?: number;
  scores?: SkillScores;
  feedback?: QuestionFeedback[];
  evaluation?: SessionEvaluation;
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
    } catch (e) { return null; }
  }
  save(session: Session): void {
    if (typeof window === "undefined" || !session || !session.id) return;
    try {
      localStorage.setItem(`${this.prefix}${session.id}`, JSON.stringify(session));
      if (session._id) localStorage.setItem(`${this.prefix}${session._id}`, JSON.stringify(session));
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

export const interviewService = {
  questionCount(minutes: number): number {
    return minutes <= 5 ? 3 : minutes <= 10 ? 5 : 8;
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
      role: formatRoleName(raw.role || payload.role),
      mode: raw.mode || payload.mode,
      minutes: raw.minutes || payload.minutes,
      experienceLevel: raw.experienceLevel || payload.experienceLevel,
      timeframe: raw.timeframe || payload.timeframe,
      cv: raw.cv || payload.cv,
      createdAt: new Date(raw.createdAt || Date.now()).getTime(),
      turns: raw.transcript || raw.turns || [],
      company: raw.company || payload.company || "",
    };

    (formattedSession as any).session = formattedSession;
    sessions.save(formattedSession);
    return formattedSession;
  },

  async nextQuestion(session: Session): Promise<{ q: string; followUp: boolean }> {
    try {
      const targetId = session.id || session._id;
      
      const cleanSession = { ...session };
      delete (cleanSession as any).session; 

      const data = await apiFetch<{ q: string; followUp?: boolean; is_follow_up?: boolean }>(
        `/api/interview/session/${targetId}/next-question`,
        {
          method: "POST",
          body: JSON.stringify({ session: cleanSession }),
        }
      );

      return {
        q: data.q || "Tell me about a challenging project you delivered and the technical trade-offs you navigated.",
        followUp: Boolean(data.followUp || data.is_follow_up),
      };
    } catch (err) {
      console.error("Error fetching next question from endpoint:", err);

      const fallbackQuestions = [
        "Tell me about a time you had a technical disagreement with a peer. How did you resolve it?",
        "How do you approach breaking down an ambiguous product requirement into architecture and engineering tasks?",
        "Describe a time a production bug occurred under your watch. How did you diagnose, fix, and prevent it from recurring?",
      ];

      const randomIndex = Math.floor(Math.random() * fallbackQuestions.length);
      return {
        q: fallbackQuestions[randomIndex],
        followUp: false,
      };
    }
  },

  async score(session: Session): Promise<SessionEvaluation> {
    const targetId = session.id || session._id;
    const data = await apiFetch<{ evaluation?: SessionEvaluation; session?: any }>(`/api/interview/session/${targetId}/evaluate`, {
      method: "POST",
      body: JSON.stringify({ transcript: session.turns }),
    });

    const evaluation = data.evaluation || data.session?.evaluation;
    if (!evaluation) throw new Error("Evaluation failed to generate");

    const updatedSession: Session = {
      ...session,
      overall: evaluation.overallScore,
      scores: evaluation.scores,
      feedback: evaluation.feedback,
      evaluation,
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
      const sessionId = String(raw._id || raw.id || id);

      const formatted: Session = {
        id: sessionId,
        _id: sessionId,
        role: formatRoleName(raw.role || "Software Engineer"),
        mode: raw.mode || "text",
        minutes: raw.minutes || 10,
        createdAt: new Date(raw.createdAt || Date.now()).getTime(),
        turns: raw.transcript || raw.turns || [],
        company: raw.company || "",
        overall: evalData?.overallScore ?? raw.overallScore,
        scores: evalData?.scores || raw.scores,
        feedback: evalData?.feedback || raw.feedback || [],
        evaluation: evalData,
      };

      (formatted as any).session = formatted;
      sessions.save(formatted);
      return formatted;
    } catch (err) {
      return cached;
    }
  },
};