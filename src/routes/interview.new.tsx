import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/intervue-you/app-shell";
import { interviewService } from "@/services/interview";

export const Route = createFileRoute("/interview/new")({
  component: NewInterview,
});

function NewInterview() {
  const nav = useNavigate();
  const [role, setRole] = useState("Software Engineer");
  const [mode, setMode] = useState<"text" | "audio" | "video">("text");
  const [minutes, setMinutes] = useState(10);
  const [experience, setExperience] = useState("Mid-level");
  const [company, setCompany] = useState("");
  const [cv, setCv] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = async (e: React.FormEvent) => {
    e.preventDefault();
    if (starting) return;
    
    setStarting(true);
    setError(null);

    try {
      // Pass all fields safely in the payload object
      const s = await interviewService.create({
        role: role.trim() || "General",
        mode,
        minutes,
        experienceLevel: experience,
        timeframe,
        cv,
        company,
      });

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
            Select your target role, mode, and time limit to start practice.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={start} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="h-11 w-full rounded-2xl border border-input bg-card px-4 text-sm outline-none focus:border-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="h-11 w-full rounded-2xl border border-input bg-card px-4 text-sm outline-none focus:border-primary"
              >
                <option value="Junior">Junior</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
                <option value="Lead/Manager">Lead/Manager</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Company (Optional)</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google"
                className="h-11 w-full rounded-2xl border border-input bg-card px-4 text-sm outline-none focus:border-primary"
              />
            </div>
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
              {[5, 10, 15].map((mins) => (
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