import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, MessageSquare, Mic, Video, XCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell, Chip } from "@/components/intervue-you/app-shell";
import { Waveform } from "@/components/intervue-you/primitives";
import { interviewService, profileStore, type Mode } from "@/services/interview";
import { getToken } from "@/lib/auth";

export const Route = createFileRoute("/interview/new")({
  beforeLoad: () => {
    // SSR Safe Check: Only check localStorage in the browser
    if (typeof window !== "undefined" && !getToken()) {
      throw redirect({ to: "/login" });
    }
  },
  head: () => ({
    meta: [
      { title: "New interview — Intervue You" },
      { name: "description", content: "Choose your role, interview mode and length, then check your mic and camera." },
      { property: "og:title", content: "New interview — Intervue You" },
      { property: "og:description", content: "Set up a mock interview in seconds." },
    ],
  }),
  component: NewInterview,
});

const MODES: { v: Mode; label: string; icon: typeof Mic; desc: string }[] = [
  { v: "text", label: "Text", icon: MessageSquare, desc: "Type your answers" },
  { v: "audio", label: "Audio", icon: Mic, desc: "Speak with the AI" },
  { v: "video", label: "Video", icon: Video, desc: "Face to face" },
];

const ROLE_EXPERIENCE_MAP: Record<string, string[]> = {
  "Frontend Developer": ["Entry level (Junior)", "Mid-level", "Senior", "Expert"],
  "Backend Developer": ["Entry level (Junior)", "Mid-level", "Senior", "Expert"],
  "AI Engineer": ["Entry level (Junior)", "Mid-level", "Senior", "Expert"],
  "NYSC Trainee": ["General", "Trainee"],
  "Product Manager": ["Associate", "Mid-level", "Senior", "Director"],
  "UI/UX Designer": ["Entry level (Junior)", "Mid-level", "Senior"],
  "Other": ["General", "Entry level (Junior)", "Mid-level", "Senior"]
};

const ROLES = Object.keys(ROLE_EXPERIENCE_MAP);

const TIMEFRAMES = ["Today", "Tomorrow", "Next week", "Next month", "Later / Just practicing"];

function NewInterview() {
  const nav = useNavigate();
  const [role, setRole] = useState(ROLES[0]);
  const [experience, setExperience] = useState(ROLE_EXPERIENCE_MAP[ROLES[0]][1]);
  const [timeframe, setTimeframe] = useState(TIMEFRAMES[2]);
  const [cv, setCv] = useState("");
  const [mode, setMode] = useState<Mode>("text");
  const [minutes, setMinutes] = useState(10);
  const [dev, setDev] = useState<"idle" | "ok" | "fail">("idle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Client-side authentication check
  useEffect(() => {
    if (!getToken()) {
      nav({ to: "/login" });
    }
  }, [nav]);

  useEffect(() => { 
    const stored = profileStore.get()?.role;
    setRole(stored && ROLES.includes(stored) ? stored : ROLES[0]); 
  }, []);

  useEffect(() => {
    const validExperiences = ROLE_EXPERIENCE_MAP[role] || ROLE_EXPERIENCE_MAP["Other"];
    if (!validExperiences.includes(experience)) {
      setExperience(validExperiences[0]);
    }
  }, [role, experience]);
  
  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), []);
  useEffect(() => { setDev("idle"); streamRef.current?.getTracks().forEach((t) => t.stop()); streamRef.current = null; }, [mode]);

  const check = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true, video: mode === "video" });
      streamRef.current = s;
      if (videoRef.current) videoRef.current.srcObject = s;
      setDev("ok");
    } catch { setDev("fail"); }
  };
  
  const start = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    const s = (interviewService.create as any)(
      role.trim() || "General", 
      mode, 
      minutes, 
      { experience, timeframe, cv }
    );
    nav({ to: "/interview/$id", params: { id: s.id } });
  };
  
  const ready = mode === "text" || dev === "ok";

  const SelectDropdown = ({ id, value, onChange, options }: { id: string; value: string; onChange: (e: any) => void; options: string[] }) => (
    <div className="relative">
      <select 
        id={id} 
        value={value} 
        onChange={onChange} 
        className="h-12 w-full appearance-none rounded-xl border border-input bg-card pl-4 pr-10 text-[15px] text-foreground outline-none transition-all hover:bg-accent/50 focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
    </div>
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-8 pb-12">
        <h1 className="text-3xl font-semibold">New interview</h1>
        
        {/* Row 1: Role and Experience */}
        <div className="grid gap-6 sm:grid-cols-2">
          <section className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">Role</label>
            <SelectDropdown 
              id="role" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              options={ROLES} 
            />
          </section>

          <section className="space-y-2">
            <label htmlFor="experience" className="text-sm font-medium">Experience Level</label>
            <SelectDropdown 
              id="experience" 
              value={experience} 
              onChange={(e) => setExperience(e.target.value)} 
              options={ROLE_EXPERIENCE_MAP[role] || ROLE_EXPERIENCE_MAP["Other"]} 
            />
          </section>
        </div>

        {/* Row 2: Timeframe */}
        <section className="space-y-2">
          <label htmlFor="timeframe" className="text-sm font-medium">When is the interview happening?</label>
          <SelectDropdown 
            id="timeframe" 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)} 
            options={TIMEFRAMES} 
          />
        </section>

        {/* Row 3: CV / Resume Input */}
        <section className="space-y-2">
          <label htmlFor="cv" className="text-sm font-medium">CV / Resume details (Optional)</label>
          <textarea 
            id="cv" 
            value={cv} 
            onChange={(e) => setCv(e.target.value)} 
            placeholder="Paste your CV text or key bullet points here to get personalized questions..." 
            className="min-h-[120px] w-full resize-y rounded-xl border border-input bg-card p-4 text-[15px] outline-none transition-all hover:bg-accent/50 focus:border-primary focus:ring-2 focus:ring-primary/20" 
          />
        </section>

        {/* Technical Configuration */}
        <section className="space-y-3 pt-6 border-t border-border">
          <p className="text-sm font-medium">Mode</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {MODES.map(({ v, label, icon: I, desc }) => (
              <button key={v} type="button" onClick={() => setMode(v)} aria-pressed={mode === v}
                className={`rounded-2xl border p-4 text-left transition-colors ${mode === v ? "border-primary bg-primary/10" : "border-border bg-card hover:bg-accent"}`}>
                <I className="h-5 w-5 text-primary" /><p className="mt-3 font-medium">{label}</p><p className="text-xs text-muted-foreground">{desc}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <p className="text-sm font-medium">Length</p>
          <div className="flex flex-wrap gap-2">{[5, 10, 15, 30].map((m) => <Chip key={m} active={minutes === m} onClick={() => setMinutes(m)}>{m} min</Chip>)}</div>
        </section>

        {mode !== "text" && (
          <section className="surface-card space-y-4 rounded-3xl p-5">
            <p className="font-medium">Device check</p>
            {mode === "video" && <video ref={videoRef} autoPlay muted playsInline className="aspect-video w-full rounded-2xl bg-muted object-cover" />}
            {dev === "ok" && <div className="flex items-center gap-3 text-sm text-success"><CheckCircle2 className="h-4 w-4" />Devices ready<Waveform bars={16} /></div>}
            {dev === "fail" && <p className="flex items-center gap-2 text-sm text-destructive"><XCircle className="h-4 w-4" />We couldn't access your {mode === "video" ? "camera or microphone" : "microphone"}. Allow access in your browser, or switch to Text.</p>}
            {dev !== "ok" && <Button variant="pillGhost" onClick={check}>Check {mode === "video" ? "camera & mic" : "microphone"}</Button>}
          </section>
        )}

        <Button variant="pill" size="lg" className="w-full" disabled={!ready} onClick={start}>Start interview</Button>
      </div>
    </AppShell>
  );
}