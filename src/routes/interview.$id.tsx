import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Loader2, Mic, MicOff, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/rehearse/primitives";
import { interviewService, sessions, type Session } from "@/services/interview";
import { speech } from "@/services/speech";

export const Route = createFileRoute("/interview/$id")({
  head: () => ({
    meta: [
      { title: "Interview in progress — Rehearse" },
      { name: "description", content: "Your live mock interview with the Rehearse AI interviewer." },
      { property: "og:title", content: "Interview in progress — Rehearse" },
      { property: "og:description", content: "Live AI mock interview." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Room,
});

type SR = { start(): void; stop(): void; onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null; onend: (() => void) | null; continuous: boolean; interimResults: boolean };

function Room() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const [s, setS] = useState<Session | null | undefined>(undefined);
  const [q, setQ] = useState<{ q: string; followUp: boolean } | null>(null);
  const [answer, setAnswer] = useState("");
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const recRef = useRef<SR | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setS(sessions.get(id)); }, [id]);
  useEffect(() => { const t = setInterval(() => setElapsed((e) => e + 1), 1000); return () => clearInterval(t); }, []);
  useEffect(() => {
    if (s?.mode !== "video") return;
    let stream: MediaStream | null = null;
    navigator.mediaDevices?.getUserMedia({ video: true }).then((st) => { stream = st; if (videoRef.current) videoRef.current.srcObject = st; }).catch(() => {});
    return () => stream?.getTracks().forEach((t) => t.stop());
  }, [s?.mode]);
  useEffect(() => () => { speech.stop(); recRef.current?.stop(); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [s?.turns.length, q]);

  const ask = async (cur: Session) => {
    setThinking(true);
    const next = await interviewService.nextQuestion(cur);
    setThinking(false);
    setQ(next);
    if (cur.mode !== "text") { setSpeaking(true); speech.speak(next.q, { onEnd: () => setSpeaking(false) }); }
  };
  useEffect(() => { if (s && !q && !thinking && s.turns.length === 0) void ask(s); }, [s]); // eslint-disable-line react-hooks/exhaustive-deps

  if (s === undefined) return <div className="grid min-h-dvh place-items-center"><Loader2 className="animate-spin text-muted-foreground" /></div>;
  if (s === null) return <div className="grid min-h-dvh place-items-center text-center"><div><p>This interview wasn't found.</p><Link to="/interview/new" className="mt-4 inline-block text-primary">Start a new one</Link></div></div>;

  const total = interviewService.questionCount(s.minutes);
  const mainAsked = s.turns.filter((t) => !t.followUp).length;

  const finish = async (cur: Session) => {
    speech.stop();
    setThinking(true);
    await interviewService.score(cur);
    nav({ to: "/results/$id", params: { id: cur.id } });
  };

  const submit = async () => {
    if (!q || !answer.trim()) return;
    recRef.current?.stop();
    speech.stop();
    const cur = { ...s, turns: [...s.turns, { q: q.q, a: answer.trim(), followUp: q.followUp }] };
    sessions.save(cur); setS(cur); setAnswer(""); setQ(null);
    const doneMain = cur.turns.filter((t) => !t.followUp).length;
    const lastShort = !q.followUp && answer.trim().split(/\s+/).length < 25;
    if (doneMain >= total && !lastShort) return finish(cur);
    await ask(cur);
  };

  const toggleMic = () => {
    const W = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
    const Ctor = W.SpeechRecognition ?? W.webkitSpeechRecognition;
    if (listening) { recRef.current?.stop(); return; }
    if (!Ctor) { setAnswer((a) => a || ""); alert("Voice input isn't supported in this browser. Type your answer instead."); return; }
    const rec = new Ctor();
    rec.continuous = true; rec.interimResults = false;
    const base = answer ? answer + " " : "";
    let acc = "";
    rec.onresult = (e) => { for (let i = e.resultIndex; i < e.results.length; i++) if (e.results[i]!.isFinal) acc += e.results[i]![0]!.transcript + " "; setAnswer(base + acc.trim()); };
    rec.onend = () => setListening(false);
    recRef.current = rec; rec.start(); setListening(true);
  };

  const mm = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;

  return (
    <div className="pt-safe pb-safe flex h-dvh flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="min-w-0"><p className="truncate text-sm font-medium">{s.role}</p><p className="text-xs text-muted-foreground">Question {Math.min(mainAsked + 1, total)} of {total} · {mm}</p></div>
        <Button variant="pillGhost" size="sm" onClick={() => (s.turns.length ? finish(s) : nav({ to: "/dashboard" }))}><X />End</Button>
      </header>

      {s.mode !== "text" && (
        <div className="grid gap-3 border-b border-border p-4 sm:grid-cols-2">
          <div className="surface-card flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl">
            <div className={`grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground ${speaking ? "shadow-glow" : ""}`}>AI</div>
            <Waveform bars={20} active={speaking} />
            <p className="font-display-serif text-sm text-muted-foreground">{thinking ? "thinking…" : speaking ? "speaking" : "listening"}</p>
          </div>
          {s.mode === "video" && <video ref={videoRef} autoPlay muted playsInline className="hidden aspect-video w-full -scale-x-100 rounded-2xl bg-muted object-cover sm:block" />}
        </div>
      )}

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {s.turns.map((t, i) => (
            <div key={i} className="space-y-3">
              <Bubble ai>{t.q}</Bubble><Bubble>{t.a}</Bubble>
            </div>
          ))}
          {q && <Bubble ai>{q.followUp && <span className="mb-1 block text-xs text-primary">Follow-up</span>}{q.q}</Bubble>}
          {thinking && <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Interviewer is thinking…</p>}
          <div ref={endRef} />
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); void submit(); }} className="border-t border-border p-3">
        <div className="mx-auto flex max-w-2xl items-end gap-2">
          {s.mode !== "text" && (
            <button type="button" onClick={toggleMic} aria-label={listening ? "Stop recording" : "Speak your answer"} className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${listening ? "bg-destructive text-destructive-foreground" : "bg-card border border-border"}`}>
              {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          )}
          <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={2} disabled={!q}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void submit(); } }}
            placeholder={listening ? "Listening…" : "Type your answer…"} className="min-h-12 flex-1 resize-none rounded-2xl border border-input bg-card px-4 py-3 text-[15px] outline-none focus:border-primary disabled:opacity-50" />
          <button type="submit" disabled={!q || !answer.trim()} aria-label="Send answer" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-40"><Send className="h-5 w-5" /></button>
        </div>
      </form>
    </div>
  );
}

function Bubble({ ai, children }: { ai?: boolean; children: React.ReactNode }) {
  return <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${ai ? "bg-card border border-border" : "ml-auto bg-primary text-primary-foreground"}`}>{children}</div>;
}
