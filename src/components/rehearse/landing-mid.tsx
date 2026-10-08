import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Orbs, SkillBar, CountUp } from "./primitives";
import { YourTurnCard } from "./landing-top";
import { useReveal, useInView } from "@/hooks/use-reveal";
import { SKILLS, progressSeries } from "@/data/marketing";
import { speech } from "@/services/speech";

const QUESTION = "Tell me about a time you had to change someone's mind.";

/* ---------- D) Sample session ---------- */
export function SampleSession() {
  const ref = useReveal<HTMLElement>();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    speech.stop();
    if (timer.current) clearInterval(timer.current);
    setPlaying(false);
  };
  const play = () => {
    setPlaying(true);
    setProgress(0);
    const start = Date.now();
    timer.current = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / 3600);
      setProgress(p);
      if (p >= 1 && !speech.supported()) stop();
    }, 60);
    speech.speak(QUESTION, { onEnd: () => { setProgress(1); stop(); } });
  };
  useEffect(() => () => stop(), []);

  return (
    <section id="sample" ref={ref} className="scroll-mt-20 py-20">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <Eyebrow>Sample session</Eyebrow>
          <h2 className="text-4xl font-semibold sm:text-5xl">Hear it. Answer it. See the score.</h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="reveal space-y-5">
            <div className="surface-card rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">The interviewer asks</p>
              <p className="mt-3 text-2xl font-medium leading-snug tracking-tight">{QUESTION}</p>
              <div className="mt-6 flex items-center gap-4">
                <button onClick={playing ? stop : play} aria-label={playing ? "Pause interviewer's voice" : "Play interviewer's voice"} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform active:scale-95">
                  {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
                </button>
                <div className="flex-1">
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="bar-fill h-full rounded-full bg-primary" style={{ transform: `scaleX(${progress})`, transitionDuration: "80ms" }} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Interviewer's voice · captions on</p>
                </div>
              </div>
            </div>
            <div className="surface-card rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Example answer</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                "Our onboarding had a seven-screen setup and completion was low. My manager wanted to keep it because sales liked the data it collected.
                I ran five quick user calls, showed her clips of people abandoning at step four, and proposed collecting the same data later in the product.
                She agreed to an A/B test, and we shipped the shorter flow."
              </p>
            </div>
          </div>
          <div className="reveal surface-card rounded-3xl p-6" style={{ transitionDelay: "120ms" }}>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Example scores</p>
            <div className="mt-6 space-y-5">
              <SkillBar skill="technical" value={64} />
              <SkillBar skill="communication" value={78} highlight />
              <SkillBar skill="problemSolving" value={71} />
              <SkillBar skill="teamwork" value={69} />
            </div>
            <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
              <p className="text-sm font-medium">What to strengthen</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Make the result more convincing: say how much completion improved and what your manager decided afterwards.
                "We shipped it" is an action, not a result — try "completion rose from 38% to 61%, and she made the short flow the default."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- E) Progress tracking (SVG chart) ---------- */
function ProgressChart() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const W = 560, H = 260, P = 28;
  const x = (i: number) => P + (i * (W - P * 2)) / 4;
  const y = (v: number) => H - P - (v / 100) * (H - P * 2);
  return (
    <div ref={ref} className="surface-card rounded-3xl p-5 sm:p-6">
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {SKILLS.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5"><span className={`h-2 w-2 rounded-full ${s.cls}`} />{s.label}</li>
        ))}
      </ul>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 h-auto w-full" role="img" aria-label="Skill scores rising across sessions 1 to 4, session 5 upcoming">
        {[0, 25, 50, 75, 100].map((g) => (
          <line key={g} x1={P} x2={W - P} y1={y(g)} y2={y(g)} stroke="var(--border)" />
        ))}
        <rect x={x(3.5)} y={P / 2} width={x(4) - x(3.5) + P / 2} height={H - P * 1.5} fill="var(--muted)" opacity="0.5" rx="8" />
        {SKILLS.map((s, si) => {
          const pts = progressSeries[s.key].map((v, i) => (v == null ? null : [x(i), y(v)])).filter(Boolean) as number[][];
          const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
          return (
            <g key={s.key}>
              <path d={d} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                pathLength={1} strokeDasharray={1} strokeDashoffset={inView ? 0 : 1}
                style={{ transition: `stroke-dashoffset 1.4s ${si * 0.15}s cubic-bezier(.2,.7,.2,1)` }} />
              {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill={s.color} opacity={inView ? 1 : 0} style={{ transition: `opacity .4s ${0.8 + si * 0.15}s` }} />)}
            </g>
          );
        })}
        {[1, 2, 3, 4, 5].map((n, i) => (
          <text key={n} x={x(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">Session {n}</text>
        ))}
      </svg>
    </div>
  );
}

export function CandidateCard({ pct = 74, status = "Building confidence", change = "+27 across five sessions", footer = "Interview in 7 days · Session 4 of 5", scores = [72, 70, 67, 58] }: { pct?: number; status?: string; change?: string; footer?: string; scores?: number[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const best = scores.indexOf(Math.max(...scores));
  return (
    <div ref={ref} className="glass rounded-[2rem] p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">AO</span>
        <div>
          <p className="font-medium">Amara Obi</p>
          <p className="text-xs text-muted-foreground">Product Designer · Flutterwave</p>
        </div>
      </div>
      <p className="mt-6 text-6xl font-semibold tabular-nums tracking-tighter"><CountUp to={pct} start={inView} />%</p>
      <p className="font-display-serif text-2xl">{status}</p>
      <p className="mt-1 text-sm text-success">{change}</p>
      <div className="mt-6 space-y-3">
        {SKILLS.map((s, i) => <SkillBar key={s.key} skill={s.key} value={scores[i] ?? 0} highlight={i === best} compact />)}
      </div>
      <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">{footer}</p>
    </div>
  );
}

export function ProgressSection() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="relative isolate overflow-hidden py-20">
      <Orbs />
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <Eyebrow>Progress tracking</Eyebrow>
          <h2 className="text-4xl font-semibold sm:text-5xl">Know what to work on before interview day</h2>
        </div>
        <div className="mt-12 grid items-center gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="reveal"><ProgressChart /></div>
          <div className="reveal animate-float mx-auto w-full max-w-sm" style={{ transitionDelay: "150ms" }}><CandidateCard /></div>
        </div>
        <div className="reveal mt-10"><Button asChild variant="pill" size="lg"><Link to="/signup">Get started</Link></Button></div>
      </div>
    </section>
  );
}

/* ---------- F + G) Skill cards & live card showcase ---------- */
export function SkillShowcase() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="py-20">
      <div className="container-x grid gap-5 lg:grid-cols-[1fr_1fr_1.4fr]">
        <div className="reveal surface-card rounded-3xl p-6">
          <p className="text-sm font-medium">After your first session</p>
          <div className="mt-6 space-y-4">
            <SkillBar skill="technical" value={56} />
            <SkillBar skill="communication" value={54} />
            <SkillBar skill="problemSolving" value={45} />
            <SkillBar skill="teamwork" value={25} />
          </div>
        </div>
        <div className="reveal" style={{ transitionDelay: "100ms" }}>
          <CandidateCard pct={47} status="Getting closer" change="+9 since 31 Aug" footer="Scored across 1 session" scores={[56, 54, 45, 25]} />
        </div>
        <div className="reveal" style={{ transitionDelay: "200ms" }}><YourTurnCard /></div>
      </div>
    </section>
  );
}
