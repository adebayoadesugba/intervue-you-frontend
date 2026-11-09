import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Loader2, Play, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/intervue-you/app-shell";
import { interviewService } from "@/services/interview";

export const Route = createFileRoute("/interview/new")({
  component: NewInterview,
});

const ROLE_OPTIONS = [
  { value: "frontend", label: "Frontend Engineer" },
  { value: "backend", label: "Backend Engineer" },
  { value: "ai-engineering", label: "AI Engineer" },
  { value: "uiux", label: "UI/UX Designer" },
  { value: "copywriting", label: "Copywriting" },
];

const DIFFICULTY_MAP: Record<string, { value: string; label: string }[]> = {
  "graduate-trainee": [{ value: "general", label: "General" }],
  "nysc-trainee": [{ value: "general", label: "General" }],
  // uiux: [
  //   { value: "entry", label: "Entry Level" },
  //   { value: "advanced", label: "Advanced" },
  //   { value: "expert", label: "Expert" },
  // ],
  // copywriting: [
  //   { value: "entry", label: "Entry Level" },
  //   { value: "expert", label: "Expert" },
  // ],
};

const DEFAULT_DIFFICULTIES = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
];

const STACK_OPTIONS: Record<string, { value: string; label: string }[]> = {
  frontend: [
    { value: "core", label: "Core Fundamentals" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "nextjs", label: "Next.js" },
  ],
  backend: [
    { value: "core", label: "Core Fundamentals" },
    { value: "nodejs", label: "Node.js / Express" },
    { value: "django", label: "Django" },
    { value: "fastapi", label: "FastAPI" },
    //{ value: "mongodb", label: "MongoDB / NoSQL" },
  ],
  "ai-engineering": [
    { value: "core", label: "Core AI" },
    { value: "llm", label: "LLM" },
    { value: "deep-learning", label: "Deep Learning" },
    { value: "ml", label: "Machine Learning" },
    { value: "nlp", label: "NLP" },
    { value: "rag", label: "RAG" },


  ],
  uiux: [
    { value: "core", label: "General UIUX" },
    { value: "product-designer", label: "Product Designer" },
    { value: "ux-researcher", label: "UX Researcher" },
    { value: "ui-designer", label: "UI Designer" },
  ],
  
  copywriting: [
    { value: "core", label: "Content Copywriting" },
    { value: "technical-writer", label: "Technical Writer" },
    { value: "seo-specialist", label: "SEO Specialist" },
  ],
};

const DEFAULT_STACKS = [{ value: "core", label: "Core Fundamentals" }];

/* ------------------------------------------------------------------ */
/* Design-only helpers (no interview logic lives here)                 */
/* ------------------------------------------------------------------ */

const DESIGN_CSS = `
@keyframes iv-pop {
  from { opacity: 0; transform: translateY(-6px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes iv-rise {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.iv-pop  { animation: iv-pop 160ms cubic-bezier(.2,.8,.2,1) both; transform-origin: top; }
.iv-rise { animation: iv-rise 420ms cubic-bezier(.2,.8,.2,1) backwards; }
@media (prefers-reduced-motion: reduce) {
  .iv-pop, .iv-rise { animation: none; }
}
`;

const fieldBase =
  "h-11 w-full rounded-xl border border-input bg-background/60 px-4 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/60 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10";

const optionBtn = (active: boolean) =>
  `h-11 rounded-xl border text-sm font-medium transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 ${
    active
      ? "border-primary bg-primary/10 text-primary shadow-sm"
      : "border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:bg-accent hover:text-foreground"
  }`;

function Dropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`${fieldBase} flex items-center justify-between gap-3 text-left ${
          open ? "border-primary ring-4 ring-primary/10" : ""
        }`}
      >
        <span className="truncate">{selected?.label ?? "Select"}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="iv-pop absolute left-0 right-0 z-40 mt-2 max-h-64 overflow-auto rounded-xl border border-border bg-card p-1.5 shadow-xl shadow-black/10"
        >
          {options.map((o) => {
            const active = o.value === value;
            return (
              <li key={o.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-150 ${
                    active
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <span className="truncate">{o.label}</span>
                  {active && <Check className="h-4 w-4 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function NewInterview() {
  const nav = useNavigate();
  const [role, setRole] = useState("frontend");
  const [mode, setMode] = useState<"text" | "audio" | "video">("text");
  const [minutes, setMinutes] = useState(20);
  const [experience, setExperience] = useState("mid");
  const [selectedStacks, setSelectedStacks] = useState<string[]>(["core"]);
  const [company, setCompany] = useState("");
  const [cv, setCv] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allowedDifficulties = DIFFICULTY_MAP[role] || DEFAULT_DIFFICULTIES;
  const allowedStacks = STACK_OPTIONS[role] || DEFAULT_STACKS;

  useEffect(() => {
    const diffValues = allowedDifficulties.map((d) => d.value);
    if (!diffValues.includes(experience)) {
      setExperience(diffValues[0] || "junior");
    }

    // Reset stacks on role change
    setSelectedStacks(["core"]);
  }, [role]);

  const toggleStack = (stackValue: string) => {
    if (selectedStacks.includes(stackValue)) {
      if (selectedStacks.length === 1) return; // Keep at least 1 stack selected
      setSelectedStacks(selectedStacks.filter((s) => s !== stackValue));
    } else {
      if (selectedStacks.length >= 3) return; // Limit to max 3 selected stacks
      setSelectedStacks([...selectedStacks, stackValue]);
    }
  };

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
        stack: selectedStacks,
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
      <style>{DESIGN_CSS}</style>

      <div className="mx-auto w-[94%] py-6 sm:w-[90%] sm:py-10 lg:w-[88%] lg:py-14 xl:w-[85%]">
        {/* Header */}
        <div className="iv-rise mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Configure your interview
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Pick a role, choose up to 3 focus areas, then set the format and length.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={start}
          className="iv-rise rounded-3xl border border-border bg-card/70 p-5 shadow-sm backdrop-blur sm:p-8"
        >
          <div className="space-y-7">
            {/* Role + Experience: side by side on tablet and up */}
            <div className="relative z-20 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              <Field label="Target Role">
                <Dropdown
                  value={role}
                  onChange={setRole}
                  options={ROLE_OPTIONS}
                />
              </Field>

              <Field label="Experience">
                <Dropdown
                  value={experience}
                  onChange={setExperience}
                  options={allowedDifficulties}
                />
              </Field>

              <div className="sm:col-span-2 lg:col-span-1">
                <Field label="Target Company (Optional)">
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Stripe, Google"
                    className={fieldBase}
                  />
                </Field>
              </div>
            </div>

            <div className="h-px bg-border/70" />

            {/* Technology focus */}
            <Field label="Technology Focus" hint="Select up to 3">
              <div className="flex flex-wrap gap-2">
                {allowedStacks.map((st) => {
                  const isSelected = selectedStacks.includes(st.value);
                  return (
                    <button
                      key={st.value}
                      type="button"
                      onClick={() => toggleStack(st.value)}
                      className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                      {st.label}
                    </button>
                  );
                })}
              </div>
            </Field>

            <div className="h-px bg-border/70" />

            <Field label="Resume / Background Context (Optional)">
              <textarea
                value={cv}
                onChange={(e) => setCv(e.target.value)}
                placeholder="Paste your resume or project background text here so the AI can extract experience details..."
                rows={4}
                className="w-full resize-none rounded-xl border border-input bg-background/60 p-4 text-sm leading-relaxed outline-none transition-all duration-200 placeholder:text-muted-foreground/60 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </Field>

            <div className="h-px bg-border/70" />

            {/* Format + Duration: moderate width buttons */}
            <div className="flex flex-col gap-7">
              <Field label="Interview Format">
                <div className="grid max-w-md grid-cols-3 gap-2.5">
                  {(["text", "audio", "video"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className={`${optionBtn(mode === m)} capitalize`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Duration">
                <div className="grid max-w-lg grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {[15, 20, 30, 40].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setMinutes(mins)}
                      className={optionBtn(minutes === mins)}
                    >
                      {mins} mins
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            {/* Submit */}
            <div className="pt-1">
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-full text-sm font-semibold shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 active:translate-y-0 sm:mx-auto sm:flex sm:w-72"
                disabled={starting}
              >
                {starting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                {starting ? "Connecting to Coach..." : "Start Interview"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AppShell>
  );
}