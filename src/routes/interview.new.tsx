import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, MessageSquare, Mic, Video, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell, Chip } from "@/components/rehearse/app-shell";
import { Waveform } from "@/components/rehearse/primitives";
import { interviewService, profileStore, type Mode } from "@/services/interview";

export const Route = createFileRoute("/interview/new")({
  head: () => ({
    meta: [
      { title: "New interview — Rehearse" },
      { name: "description", content: "Choose your role, interview mode and length, then check your mic and camera." },
      { property: "og:title", content: "New interview — Rehearse" },
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

function NewInterview() {
  const nav = useNavigate();
  const [role, setRole] = useState("");
  const [mode, setMode] = useState<Mode>("text");
  const [minutes, setMinutes] = useState(10);
  const [dev, setDev] = useState<"idle" | "ok" | "fail">("idle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => { setRole(profileStore.get()?.role ?? "Software engineer"); }, []);
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
    const s = interviewService.create(role.trim() || "General", mode, minutes);
    nav({ to: "/interview/$id", params: { id: s.id } });
  };
  const ready = mode === "text" || dev === "ok";

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-3xl font-semibold">New interview</h1>
        <section className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium">Role</label>
          <input id="role" value={role} onChange={(e) => setRole(e.target.value)} className="h-12 w-full rounded-xl border border-input bg-card px-4 outline-none focus:border-primary" />
        </section>
        <section className="space-y-3">
          <p className="text-sm font-medium">Mode</p>
          <div className="grid grid-cols-3 gap-2">
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
