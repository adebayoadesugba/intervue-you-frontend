import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/intervue-you/app-shell";
import { interviewService } from "@/services/interview";

export const Route = createFileRoute("/interview/new")({
  component: NewInterview,
});

// Role categories matching backend FastAPI ladders
const ROLE_OPTIONS = [
  { value: "frontend", label: "Frontend Engineer" },
  { value: "backend", label: "Backend Engineer" },
  { value: "ai-engineering", label: "AI Engineer" },
  { value: "uiux", label: "UI/UX Designer" },
  { value: "graduate-trainee", label: "Graduate Trainee" },
  { value: "nysc-trainee", label: "NYSC Trainee" },
  { value: "copywriting", label: "Copywriting" },
];

// Difficulty mapping per category
const DIFFICULTY_MAP: Record<string, { value: string; label: string }[]> = {
  "graduate-trainee": [{ value: "general", label: "General" }],
  "nysc-trainee": [{ value: "general", label: "General" }],
  uiux: [
    { value: "entry", label: "Entry Level" },
    { value: "advanced", label: "Advanced" },
    { value: "expert", label: "Expert" },
  ],
  copywriting: [
    { value: "entry", label: "Entry Level" },
    { value: "expert", label: "Expert" },
  ],
};

const DEFAULT_DIFFICULTIES = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
];

// Dynamic stack options per category
const STACK_OPTIONS: Record<string, { value: string; label: string }[]> = {
  frontend: [
    { value: "core", label: "Core (HTML/CSS/JS)" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "nextjs", label: "Next.js" },
  ],
  backend: [
    { value: "core", label: "Core Backend Concepts" },
    { value: "nodejs", label: "Node.js / Express" },
    { value: "django", label: "Python / Django" },
    { value: "fastapi", label: "Python / FastAPI" },
    { value: "mongodb", label: "MongoDB / NoSQL" },
  ],
  "ai-engineering": [
    { value: "core", label: "Core AI & LLM Prompting" },
    { value: "python", label: "Python & Data Science" },
    { value: "langchain", label: "LangChain & RAG Architectures" },
    { value: "pytorch", label: "PyTorch & Fine-Tuning" },
  ],
  uiux: [
    { value: "core", label: "Core Design Fundamentals" },
    { value: "figma", label: "Figma & Design Systems" },
    { value: "prototyping", label: "User Research & Prototyping" },
  ],
};

const DEFAULT_STACKS = [{ value: "core", label: "Core Fundamentals" }];

function NewInterview() {
  const nav = useNavigate();
  const [role, setRole] = useState("frontend");
  const [mode, setMode] = useState<"text" | "audio" | "video">("text");
  const [minutes, setMinutes] = useState(10);
  const [experience, setExperience] = useState("mid");
  const [selectedStack, setSelectedStack] = useState("core");
  const [company, setCompany] = useState("");
  const [cv, setCv] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derive allowed difficulty and stack lists for current role
  const allowedDifficulties = DIFFICULTY_MAP[role] || DEFAULT_DIFFICULTIES;
  const allowedStacks = STACK_OPTIONS[role] || DEFAULT_STACKS;

  // Handle dynamic dropdown resets when switching roles
  useEffect(() => {
    const diffValues = allowedDifficulties.map((d) => d.value);
    if (!diffValues.includes(experience)) {
      setExperience(diffValues[0] || "junior");
    }

    const stackValues = allowedStacks.map((s) => s.value);
    if (!stackValues.includes(selectedStack)) {
      setSelectedStack(stackValues[0] || "core");
    }
  }, [role]);

  const start = async (e: React.FormEvent) => {
    e.preventDefault();
    if (starting) return;

    setStarting(true);
    setError(null);

    try {
      const s = await interviewService.create({
        role,
        category: role,
        mode,
        minutes,
        experienceLevel: experience,
        stack: [selectedStack],
        timeframe,
        cv,
        company,
      } as any);

      const targetId = s.id || s._id;
      if (!targetId || targetId === "undefined") {
        throw new Error("Invalid session ID returned from server.");
      }

      nav({ to: "/interview/$id", params: { id: String(targetId) } });
    } catch (err) {
      console.error("Failed to start interview:", err);
      setError((err as Error).message || "Could not start interview. Please try again.");
      setStarting(false);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-xl py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Configure Your Interview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Select your target role, stack focus, mode, and time limit to start practice.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={start} className="space-y-6">
          {/* Role Selection Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Role / Track</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-11 w-full rounded-2xl border border-input bg-card px-4 text-sm outline-none focus:border-primary"
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Dynamic Experience Level Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty / Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="h-11 w-full rounded-2xl border border-input bg-card px-4 text-sm outline-none focus:border-primary"
              >
                {allowedDifficulties.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Tech Stack Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tech Stack Focus</label>
              <select
                value={selectedStack}
                onChange={(e) => setSelectedStack(e.target.value)}
                className="h-11 w-full rounded-2xl border border-input bg-card px-4 text-sm outline-none focus:border-primary"
              >
                {allowedStacks.map((st) => (
                  <option key={st.value} value={st.value}>
                    {st.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Target Company (Optional)</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google, Stripe"
              className="h-11 w-full rounded-2xl border border-input bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Resume / Background Context (Optional)</label>
            <textarea
              value={cv}
              onChange={(e) => setCv(e.target.value)}
              placeholder="Paste your resume or key background details here so the AI can tailor questions to your experience..."
              rows={3}
              className="w-full resize-none rounded-2xl border border-input bg-card p-4 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Interview Format</label>
            <div className="grid grid-cols-3 gap-3">
              {(["text", "audio", "video"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`h-11 rounded-2xl border text-sm font-medium capitalize transition-colors ${
                    mode === m
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration</label>
            <div className="grid grid-cols-3 gap-3">
              {[10, 15, 20, 30, 40, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setMinutes(mins)}
                  className={`h-11 rounded-2xl border text-sm font-medium transition-colors ${
                    minutes === mins
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {mins} mins
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full rounded-full" disabled={starting}>
            {starting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
            {starting ? "Connecting to Coach..." : "Start Interview"}
          </Button>
        </form>
      </div>
    </AppShell>
  );
}