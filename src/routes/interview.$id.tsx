import { createFileRoute, Link, useNavigate, useBlocker } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Loader2, Mic, MicOff, Send, X, Laptop, AlertCircle, RefreshCw } from "lucide-react";
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
  onerror: ((e: any) => void) | null;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
};

function Room() {
  const { id } = Route.useParams();
  const nav = useNavigate();

  // State Management
  const [s, setS] = useState<Session | null | undefined>(undefined);
  const [q, setQ] = useState<{ q: string; followUp: boolean } | null>(null);
  const [answer, setAnswer] = useState("");
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [askError, setAskError] = useState<string | null>(null);
  const [scoringError, setScoringError] = useState<string | null>(null);

  // Refs for persistent synchronous tracking
  const recRef = useRef<SR | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const isMountedRef = useRef(true);
  const askingRef = useRef(false);

  // Unmount Safety Flag
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      speech.stop();
      recRef.current?.stop();
    };
  }, []);

  // Theme Syncing
  useEffect(() => {
    const savedTheme = storage.get<"light" | "dark" | "system">("theme", "dark");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Session Hydration & Sync
  useEffect(() => {
    const loadSession = async () => {
      if (!id || id === "undefined") {
        if (isMountedRef.current) setS(null);
        return;
      }

      const local = sessions.get(id);
      if (local) {
        if (isMountedRef.current) setS(local);
        return;
      }

      try {
        const remote = await interviewService.getSession(id);
        if (isMountedRef.current) setS(remote);
      } catch (err) {
        console.error("Failed to load session:", err);
        if (isMountedRef.current) setS(null);
      }
    };

    void loadSession();
  }, [id]);

  // Persistent Timer (Derived from Session `createdAt`)
  useEffect(() => {
    if (!s?.createdAt) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((now - s.createdAt) / 1000));
      if (isMountedRef.current) setElapsed(diff);
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [s?.createdAt]);

  // Video Stream Management & Leak Prevention
  useEffect(() => {
    if (s?.mode !== "video") return;

    // Skip requesting media devices on mobile screens
    const isDesktop = window.matchMedia("(min-width: 640px)").matches;
    if (!isDesktop) return;

    let isCancelled = false;
    let stream: MediaStream | null = null;

    navigator.mediaDevices
      ?.getUserMedia({ video: true })
      .then((st) => {
        if (isCancelled) {
          st.getTracks().forEach((t) => t.stop());
          return;
        }
        stream = st;
        if (videoRef.current) videoRef.current.srcObject = st;
      })
      .catch((err) => console.warn("Camera access restricted or unreadable:", err));

    return () => {
      isCancelled = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [s?.mode]);

  // Auto-scroll on transcript changes
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [s?.turns?.length, q, thinking, askError, scoringError]);

  // Browser Exit Protection
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!s || finishedRef.current) return;
      e.preventDefault();
      e.returnValue = "An interview is currently in progress. Are you sure you want to leave?";
      return e.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [s]);

  // TanStack Router Navigation Blocker
  useBlocker({
    shouldBlockFn: () => {
      if (!s || finishedRef.current || !s.turns?.length) return false;
      return !window.confirm("Cancel this interview? Progress will be lost.");
    },
  });

  // Safe Question Fetcher
  const ask = async (cur: Session) => {
    if (askingRef.current) return;
    askingRef.current = true;
    setThinking(true);
    setAskError(null);

    try {
      const next = await interviewService.nextQuestion(cur);
      if (!isMountedRef.current) return;
      setQ(next);
      if (cur.mode !== "text") {
        setSpeaking(true);
        speech.speak(next.q, {
          onEnd: () => {
            if (isMountedRef.current) setSpeaking(false);
          },
        });
      }
    } catch (err) {
      console.error("Failed to generate question:", err);
      if (isMountedRef.current) {
        setAskError("Unable to load the next question. Please check your connection and retry.");
      }
    } finally {
      if (isMountedRef.current) setThinking(false);
      askingRef.current = false;
    }
  };

  // Resume / Auto-Start Logic
  useEffect(() => {
    if (s && !q && !thinking && !askError && !finishedRef.current && !askingRef.current) {
      void ask(s);
    }
  }, [s, q, thinking, askError]);

  // Finish Interview Handler
  const finish = async (cur: Session) => {
    speech.stop();
    recRef.current?.stop();
    setThinking(true);
    setScoringError(null);

    try {
      await interviewService.score(cur);
      if (!isMountedRef.current) return;
      finishedRef.current = true;
      nav({ to: "/results/$id", params: { id: cur.id } });
    } catch (err) {
      console.error("Error scoring session:", err);
      if (isMountedRef.current) {
        setScoringError("Failed to complete evaluation. Please retry.");
        setThinking(false);
      }
    }
  };

  const handleEndClick = () => {
    if (thinking) return;

    if (s && s.turns && s.turns.length > 0) {
      if (window.confirm("End interview now and submit your answers for scoring?")) {
        void finish(s);
      }
    } else {
      finishedRef.current = true;
      nav({ to: "/dashboard" });
    }
  };

  const submit = async () => {
    if (!q || !answer.trim() || thinking) return;
    recRef.current?.stop();
    speech.stop();

    const cur: Session = {
      ...s!,
      turns: [...(s!.turns || []), { q: q.q, a: answer.trim(), followUp: q.followUp }],
    };

    sessions.save(cur);
    setS(cur);
    setAnswer("");
    setQ(null);

    const totalQuestions = interviewService.questionCount(cur.minutes);
    const doneMain = cur.turns.filter((t) => !t.followUp).length;
    const lastShort = !q.followUp && answer.trim().split(/\s+/).length < 25;

    if (doneMain >= totalQuestions && !lastShort) {
      return finish(cur);
    }
    await ask(cur);
  };

  const toggleMic = () => {
    // Interrupt AI speech if active when toggling mic
    speech.stop();

    const W = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
    const Ctor = W.SpeechRecognition ?? W.webkitSpeechRecognition;

    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }

    if (!Ctor) {
      alert("Voice input isn't supported in this browser. Type your answer instead.");
      return;
    }

    try {
      const rec = new Ctor();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = navigator.language || "en-US";

      rec.onresult = (e) => {
        let acc = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i]!.isFinal) {
            acc += e.results[i]![0]!.transcript + " ";
          }
        }
        if (acc) {
          setAnswer((prev) => (prev ? `${prev.trim()} ${acc.trim()}` : acc.trim()));
        }
      };

      rec.onerror = (err) => {
        console.error("Speech recognition error:", err);
        if (isMountedRef.current) setListening(false);
      };

      rec.onend = () => {
        if (isMountedRef.current) setListening(false);
      };

      recRef.current = rec;
      rec.start();
      setListening(true);
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setListening(false);
    }
  };

  if (s === undefined) {
    return (
      <div className="grid min-h-dvh place-items-center bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (s === null) {
    return (
      <div className="grid min-h-dvh place-items-center p-4 text-center bg-background text-foreground">
        <div>
          <p className="text-lg font-medium">This interview wasn't found.</p>
          <Link to="/interview/new" className="mt-4 inline-block font-medium text-primary hover:underline">
            Start a new interview
          </Link>
        </div>
      </div>
    );
  }

  const total = interviewService.questionCount(s.minutes);
  const mainAsked = (s.turns || []).filter((t) => !t.followUp).length;
  const mm = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;
  const aiState = speaking ? "speaking" : thinking ? "thinking" : listening ? "listening" : "idle";

  return (
    <div className="pt-safe pb-safe flex h-dvh flex-col bg-background text-foreground">
      {/* Header Bar */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{s.role}</p>
          <p className="text-xs text-muted-foreground">
            Question {Math.min(mainAsked + 1, total)} of {total} · {mm}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="pillGhost" size="sm" onClick={handleEndClick} disabled={thinking}>
            <X className="mr-1 h-4 w-4" />
            End
          </Button>
        </div>
      </header>

      {/* AI Visualizer & Video Section */}
      {s.mode !== "text" && (
        <div className="w-full border-b border-border bg-background p-4">
          <div className={`mx-auto grid max-w-4xl gap-4 items-center justify-center ${s.mode === "video" ? "sm:grid-cols-2" : "grid-cols-1 max-w-md"}`}>
            {/* AI Orb Canvas */}
            <div className="isolate flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl bg-[#09090b] text-white py-6 shadow-xl border border-zinc-800">
              <AiOrb state={aiState} />
              <p className="font-display-serif text-sm text-zinc-400 mt-6 capitalize">
                {aiState === "speaking" ? "speaking" : aiState === "thinking" ? "thinking…" : aiState === "listening" ? "listening…" : "ready"}
              </p>
            </div>

            {/* Video Mode Preview */}
            {s.mode === "video" && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="hidden aspect-video w-full -scale-x-100 rounded-2xl bg-zinc-900 object-cover sm:block border border-zinc-800 shadow-md"
                />

                <div className="flex aspect-video w-full flex-col items-center justify-center rounded-2xl bg-card p-5 text-center border border-border sm:hidden shadow-sm">
                  <div className="rounded-full bg-primary/10 p-3 text-primary mb-2">
                    <Laptop className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Desktop Required for Video</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Camera preview is optimized for computer screens. Switch to a laptop or desktop for video recording.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Conversation Stream */}
      <div className="flex-1 space-y-4 overflow-y-auto bg-background px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {(s.turns || []).map((t, i) => (
            <div key={i} className="space-y-3">
              <Bubble ai>{t.q}</Bubble>
              <Bubble>{t.a}</Bubble>
            </div>
          ))}

          {q && (
            <Bubble ai>
              {q.followUp && <span className="mb-1 block text-xs font-medium text-primary">Follow-up</span>}
              {q.q}
            </Bubble>
          )}

          {thinking && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Interviewer is thinking…
            </p>
          )}

          {/* Ask Failure Retry State */}
          {askError && (
            <div className="flex items-center justify-between rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{askError}</span>
              </div>
              <Button size="sm" variant="outline" onClick={() => void ask(s)}>
                <RefreshCw className="mr-1 h-3.5 w-3.5" /> Retry
              </Button>
            </div>
          )}

          {/* Scoring Failure Retry State */}
          {scoringError && (
            <div className="flex items-center justify-between rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{scoringError}</span>
              </div>
              <Button size="sm" variant="outline" onClick={() => void finish(s)}>
                <RefreshCw className="mr-1 h-3.5 w-3.5" /> Retry Scoring
              </Button>
            </div>
          )}

          <div ref={endRef} />
        </div>
      </div>

      {/* Answer Form Input */}
      <form onSubmit={(e) => { e.preventDefault(); void submit(); }} className="border-t border-border bg-card p-3">
        <div className="mx-auto flex max-w-2xl items-end gap-2">
          {s.mode !== "text" && (
            <button
              type="button"
              onClick={toggleMic}
              aria-label={listening ? "Stop recording" : "Speak your answer"}
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition-colors ${
                listening ? "bg-destructive text-destructive-foreground" : "bg-card border border-border text-foreground hover:bg-accent"
              }`}
            >
              {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          )}

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={2}
            disabled={!q || thinking}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                void submit();
              }
            }}
            placeholder={listening ? "Listening…" : "Type your answer…"}
            className="min-h-12 flex-1 resize-none rounded-2xl border border-input bg-card px-4 py-3 text-[15px] text-foreground outline-none focus:border-primary disabled:opacity-50 placeholder:text-muted-foreground"
          />

          <button
            type="submit"
            disabled={!q || !answer.trim() || thinking}
            aria-label="Send answer"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

function Bubble({ ai, children }: { ai?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`break-words max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
        ai ? "bg-card border border-border text-card-foreground" : "ml-auto bg-primary text-primary-foreground"
      }`}
    >
      {children}
    </div>
  );
}

function AiOrb({ state }: { state: "idle" | "thinking" | "speaking" | "listening" }) {
  const isSpeaking = state === "speaking";
  const isThinking = state === "thinking";
  const isListening = state === "listening";
  const isIdle = state === "idle";

  return (
    <div className="relative flex h-[140px] w-[140px] place-items-center justify-center">
      <style>{`
        @keyframes ring-spin { 
          0% { transform: rotate(0deg); } 
          50% { transform: rotate(180deg); } 
          100% { transform: rotate(360deg); } 
        }
        @keyframes ring-spin-reverse { 
          0% { transform: rotate(360deg); } 
          50% { transform: rotate(180deg); } 
          100% { transform: rotate(0deg); } 
        }
        @keyframes ring-pulse-speak { 
          0%, 100% { transform: rotate(0deg); } 
          25% { transform: rotate(90deg); } 
          50% { transform: rotate(180deg); } 
          75% { transform: rotate(270deg); } 
        }
        .blob-1 { border-radius: 43% 57% 41% 59% / 54% 45% 55% 46%; }
        .blob-2 { border-radius: 56% 44% 53% 47% / 42% 56% 44% 58%; }
        .blob-3 { border-radius: 48% 52% 45% 55% / 55% 48% 52% 45%; }
        .zigzag-border { border-style: dashed; }

        @media (prefers-reduced-motion: reduce) {
          .orb-ring { animation: none !important; }
        }
      `}</style>

      {/* Core Ring */}
      <div
        className="orb-ring absolute h-[120px] w-[120px] blob-1 border-[4px] border-white shadow-[0_0_15px_rgba(255,255,255,1),inset_0_0_10px_rgba(255,255,255,0.8)] z-10 transition-transform duration-500"
        style={{
          animation: isSpeaking ? "ring-pulse-speak 3s linear infinite" : "ring-spin 6s linear infinite",
        }}
      />

      {/* Cyan Inner Ring */}
      <div
        className="orb-ring absolute h-[120px] w-[120px] blob-2 zigzag-border border-[6px] border-[#00ffff] shadow-[0_0_20px_#00ffff,inset_0_0_15px_#00ffff] mix-blend-screen transition-opacity duration-500"
        style={{
          transformOrigin: "50% 54%",
          animation: isSpeaking ? "ring-pulse-speak 2.5s linear infinite" : isListening ? "ring-spin 4s linear infinite" : "ring-spin 8s linear infinite",
          opacity: isIdle ? 0.6 : 1,
        }}
      />

      {/* Purple Outer Ring */}
      <div
        className="orb-ring absolute h-[120px] w-[120px] blob-3 border-[5px] border-[#b026ff] shadow-[0_0_20px_#b026ff,inset_0_0_15px_#b026ff] mix-blend-screen transition-opacity duration-500"
        style={{
          transformOrigin: "48% 52%",
          animation: isSpeaking ? "ring-pulse-speak 2s linear infinite reverse" : isThinking ? "ring-spin 3s linear infinite" : "ring-spin 9s linear infinite",
          opacity: isIdle ? 0.7 : 1,
        }}
      />

      {/* Orange Outer Ring */}
      <div
        className="orb-ring absolute h-[120px] w-[120px] blob-1 zigzag-border border-[6px] border-[#ff3b00] shadow-[0_0_20px_#ff3b00,inset_0_0_15px_#ff3b00] mix-blend-screen transition-opacity duration-500"
        style={{
          transformOrigin: "53% 47%",
          animation: isSpeaking ? "ring-pulse-speak 3s linear infinite" : isThinking ? "ring-spin-reverse 3s linear infinite" : "ring-spin-reverse 10s linear infinite",
          opacity: isIdle ? 0.5 : 1,
        }}
      />
    </div>
  );
}