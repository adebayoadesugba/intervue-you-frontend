import { createFileRoute, Link, useNavigate, useBlocker } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Loader2, Mic, MicOff, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { interviewService, sessions, type Session } from "@/services/interview";
import { speech } from "@/services/speech";
import { ThemeToggle } from "@/components/intervue-you/primitives";
import { storage } from "@/lib/storage";

export const Route = createFileRoute("/interview/$id")({
  head: () => ({
    meta: [
      { title: "Interview in progress — Intervue You" },
      { name: "description", content: "Your live mock interview with the Intervue You AI interviewer." },
      { property: "og:title", content: "Interview in progress — Intervue You" },
      { property: "og:description", content: "Live AI mock interview." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Room,
});

type SR = { 
  start(): void; 
  stop(): void; 
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null; 
  onend: (() => void) | null; 
  continuous: boolean; 
  interimResults: boolean 
};

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
  const [isFinished, setIsFinished] = useState(false);

  const recRef = useRef<SR | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Sync theme with global HTML element on mount
  useEffect(() => {
    const savedTheme = storage.get<"light" | "dark" | "system">("theme", "dark");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

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

  // 1. Browser Refresh / Tab Close Protection
  useEffect(() => {
    if (!s || isFinished) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "An interview is currently in progress. Are you sure you want to leave?";
      return e.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [s, isFinished]);

  // 2. In-App Navigation Protection (TanStack Router)
  useBlocker({
    shouldBlockFn: () => {
      if (!s || isFinished) return false;
      const confirmLeave = window.confirm(
        "Are you sure you want to cancel this interview? All current progress will be lost."
      );
      return !confirmLeave;
    },
  });

  const ask = async (cur: Session) => {
    setThinking(true);
    const next = await interviewService.nextQuestion(cur);
    setThinking(false);
    setQ(next);
    if (cur.mode !== "text") { setSpeaking(true); speech.speak(next.q, { onEnd: () => setSpeaking(false) }); }
  };

  useEffect(() => { if (s && !q && !thinking && s.turns.length === 0) void ask(s); }, [s]); // eslint-disable-line react-hooks/exhaustive-deps

  if (s === undefined) return <div className="grid min-h-dvh place-items-center bg-background text-foreground"><Loader2 className="animate-spin text-muted-foreground" /></div>;
  if (s === null) return <div className="grid min-h-dvh place-items-center text-center bg-background text-foreground"><div><p>This interview wasn't found.</p><Link to="/interview/new" className="mt-4 inline-block text-primary">Start a new one</Link></div></div>;

  const total = interviewService.questionCount(s.minutes);
  const mainAsked = s.turns.filter((t) => !t.followUp).length;

  const finish = async (cur: Session) => {
    speech.stop();
    recRef.current?.stop();
    setThinking(true);

    try {
      await interviewService.score(cur);
    } catch (err) {
      console.error("Error scoring session:", err);
    }

    // Disable navigation blocker right before routing to results
    setIsFinished(true);
    nav({ to: "/results/$id", params: { id: cur.id } });
  };

  const handleEndClick = () => {
    if (thinking) return;

    if (s.turns.length > 0) {
      const confirmFinish = window.confirm(
        "End interview now and submit your answers for scoring?"
      );
      if (confirmFinish) {
        void finish(s);
      }
    } else {
      // Trigger navigation; useBlocker will prompt "Are you sure you want to cancel?"
      nav({ to: "/dashboard" });
    }
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
  const aiState = speaking ? "speaking" : thinking ? "thinking" : listening ? "listening" : "idle";

  return (
    <div className="pt-safe pb-safe flex h-dvh flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{s.role}</p>
          <p className="text-xs text-muted-foreground">Question {Math.min(mainAsked + 1, total)} of {total} · {mm}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="pillGhost" 
            size="sm" 
            onClick={handleEndClick}
            disabled={thinking}
          >
            <X className="h-4 w-4 mr-1" />
            End
          </Button>
        </div>
      </header>

      {s.mode !== "text" && (
        <div className="grid gap-3 border-b border-border bg-background p-4 sm:grid-cols-2">
          <div className="surface-card flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl bg-zinc-950 text-white py-10 shadow-lg border border-border">
            <AiOrb state={aiState} />
            <p className="font-display-serif text-sm text-zinc-400 mt-8">
              {aiState === "speaking" ? "speaking" : aiState === "thinking" ? "thinking…" : aiState === "listening" ? "listening…" : "ready"}
            </p>
          </div>
          {s.mode === "video" && (
            <video ref={videoRef} autoPlay muted playsInline className="hidden aspect-video w-full -scale-x-100 rounded-2xl bg-zinc-900 object-cover sm:block border border-border" />
          )}
        </div>
      )}

      <div className="flex-1 space-y-4 overflow-y-auto bg-background px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {s.turns.map((t, i) => (
            <div key={i} className="space-y-3">
              <Bubble ai>{t.q}</Bubble>
              <Bubble>{t.a}</Bubble>
            </div>
          ))}
          {q && <Bubble ai>{q.followUp && <span className="mb-1 block text-xs text-primary">Follow-up</span>}{q.q}</Bubble>}
          {thinking && <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Interviewer is thinking…</p>}
          <div ref={endRef} />
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); void submit(); }} className="border-t border-border bg-card p-3">
        <div className="mx-auto flex max-w-2xl items-end gap-2">
          {s.mode !== "text" && (
            <button type="button" onClick={toggleMic} aria-label={listening ? "Stop recording" : "Speak your answer"} className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${listening ? "bg-destructive text-destructive-foreground" : "bg-card border border-border text-foreground hover:bg-accent"}`}>
              {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          )}
          <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={2} disabled={!q}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void submit(); } }}
            placeholder={listening ? "Listening…" : "Type your answer…"} className="min-h-12 flex-1 resize-none rounded-2xl border border-input bg-card px-4 py-3 text-[15px] text-foreground outline-none focus:border-primary disabled:opacity-50 placeholder:text-muted-foreground" />
          <button type="submit" disabled={!q || !answer.trim()} aria-label="Send answer" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90"><Send className="h-5 w-5" /></button>
        </div>
      </form>
    </div>
  );
}

function Bubble({ ai, children }: { ai?: boolean; children: React.ReactNode }) {
  return <div className={`break-words max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${ai ? "bg-card border border-border text-card-foreground" : "ml-auto bg-primary text-primary-foreground"}`}>{children}</div>;
}

// Thick, Sharp, Zigzag Ethereal Ring Animation
function AiOrb({ state }: { state: "idle" | "thinking" | "speaking" | "listening" }) {
  const isSpeaking = state === "speaking";
  const isThinking = state === "thinking";
  const isListening = state === "listening";
  const isIdle = state === "idle";

  return (
    <div className="relative flex h-[140px] w-[140px] place-items-center justify-center">
      <style>{`
        @keyframes ring-spin { 
          0% { transform: rotate(0deg) scale(1); } 
          50% { transform: rotate(180deg) scale(1.05); } 
          100% { transform: rotate(360deg) scale(1); } 
        }
        @keyframes ring-spin-reverse { 
          0% { transform: rotate(360deg) scale(1); } 
          50% { transform: rotate(180deg) scale(1.02); } 
          100% { transform: rotate(0deg) scale(1); } 
        }
        @keyframes ring-pulse-speak { 
          0%, 100% { transform: rotate(0deg) scale(1); } 
          25% { transform: rotate(90deg) scale(1.15); } 
          50% { transform: rotate(180deg) scale(0.95); } 
          75% { transform: rotate(270deg) scale(1.1); } 
        }
        .blob-1 { border-radius: 43% 57% 41% 59% / 54% 45% 55% 46%; }
        .blob-2 { border-radius: 56% 44% 53% 47% / 42% 56% 44% 58%; }
        .blob-3 { border-radius: 48% 52% 45% 55% / 55% 48% 52% 45%; }
        .zigzag-border { border-style: dashed; }
      `}</style>

      {/* Core bright white ring */}
      <div 
        className="absolute h-[120px] w-[120px] blob-1 border-[4px] border-white shadow-[0_0_15px_rgba(255,255,255,1),inset_0_0_10px_rgba(255,255,255,0.8)] z-10 transition-all duration-500"
        style={{ 
          transform: isSpeaking ? 'scale(1.08)' : isListening ? 'scale(1.03)' : 'scale(1)',
          animation: isSpeaking ? 'ring-pulse-speak 3s linear infinite' : 'ring-spin 6s linear infinite' 
        }} 
      />
      
      {/* Cyan / Blue inner offset ring */}
      <div 
        className="absolute h-[120px] w-[120px] blob-2 zigzag-border border-[6px] border-[#00ffff] shadow-[0_0_20px_#00ffff,inset_0_0_15px_#00ffff] mix-blend-screen transition-all duration-500"
        style={{ 
          transformOrigin: '50% 54%', 
          animation: isSpeaking ? 'ring-pulse-speak 2.5s linear infinite' : isListening ? 'ring-spin 4s linear infinite' : 'ring-spin 8s linear infinite',
          opacity: isIdle ? 0.6 : 1
        }} 
      />

      {/* Purple outer offset ring */}
      <div 
        className="absolute h-[120px] w-[120px] blob-3 border-[5px] border-[#b026ff] shadow-[0_0_20px_#b026ff,inset_0_0_15px_#b026ff] mix-blend-screen transition-all duration-500"
        style={{ 
          transformOrigin: '48% 52%', 
          animation: isSpeaking ? 'ring-pulse-speak 2s linear infinite reverse' : isThinking ? 'ring-spin 3s linear infinite' : 'ring-spin 9s linear infinite',
          opacity: isIdle ? 0.7 : 1
        }} 
      />

      {/* Orange / Red outer offset ring */}
      <div 
        className="absolute h-[120px] w-[120px] blob-1 zigzag-border border-[6px] border-[#ff3b00] shadow-[0_0_20px_#ff3b00,inset_0_0_15px_#ff3b00] mix-blend-screen transition-all duration-500"
        style={{ 
          transformOrigin: '53% 47%', 
          animation: isSpeaking ? 'ring-pulse-speak 3s linear infinite' : isThinking ? 'ring-spin-reverse 3s linear infinite' : 'ring-spin-reverse 10s linear infinite',
          opacity: isIdle ? 0.5 : 1
        }} 
      />
    </div>
  );
}