import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, FileText, AudioLines, Zap, Mic, Play, Linkedin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppWindow, Eyebrow, Orbs, ScoreRing, SkillBar, Waveform } from "./primitives";
import { useReveal } from "@/hooks/use-reveal";

/* ---------- G) Live "Your turn" card (reused in hero) ---------- */
const ANSWER = "In my last role our checkout drop-off was around forty percent, so I pulled the session data, mapped where people stalled and proposed a two-step flow to my manager".split(" ");

export function YourTurnCard({ compact }: { compact?: boolean }) {
  const [n, setN] = useState(4);
  const [secs, setSecs] = useState(2);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(ANSWER.length); return; }
    const id = setInterval(() => {
      setN((x) => (x >= ANSWER.length ? 4 : x + 1));
      setSecs((s) => (s >= 40 ? 2 : s + 1));
    }, 380);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={compact ? "space-y-4" : "glass space-y-5 rounded-3xl p-5 sm:p-7"}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="relative grid h-14 w-14 shrink-0 place-items-center">
          <span className="pulse-ring absolute inset-0 rounded-full bg-primary/40" />
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow"><Mic className="h-6 w-6" /></span>
        </div>
        <div className="min-w-0">
          <p className="text-lg font-semibold tracking-tight">Your turn. Speak now</p>
          <p className="text-sm text-muted-foreground">We stop listening when you stop talking</p>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs tabular-nums text-muted-foreground">0:{String(secs).padStart(2, "0")} recorded</span>
      </div>
      <div className="rounded-2xl border border-border bg-surface p-4">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Current question</p>
        <p className="mt-2 text-[17px] font-medium leading-snug sm:text-lg">Tell me about a time you had to change someone's mind.</p>
      </div>
      <Waveform bars={compact ? 28 : 40} className="w-full justify-center" />
      <p className="min-h-[4.5rem] text-sm leading-relaxed text-muted-foreground" aria-live="polite">
        {ANSWER.slice(0, n).map((w, i) => (
          <span key={i + "-" + w} className={i >= n - 3 ? "word-in text-foreground" : ""}>{w} </span>
        ))}
      </p>
    </div>
  );
}

/* ---------- A) Hero ---------- */
export function Hero() {
  const mock = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = mock.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fn = () => { el.style.transform = `translateY(${Math.min(window.scrollY * -0.06, 0)}px)`; };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-14 sm:pt-20">
      <Orbs />
      <div className="container-x text-center">
        <div className="animate-fade-up mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Text, audio and video mock interviews
        </div>
        <h1 className="animate-fade-up mx-auto mt-6 max-w-4xl text-[2.5rem] font-semibold leading-[1.02] sm:text-6xl lg:text-7xl" style={{ animationDelay: "80ms" }}>
          Practise interviews with an AI that <span className="font-display-serif text-primary">actually listens.</span>
        </h1>
        <p className="animate-fade-up mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg" style={{ animationDelay: "160ms" }}>
          Realistic mock interviews tailored to your CV and the exact job you want — with honest scores after every answer.
        </p>
        <div className="animate-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
          <Button asChild variant="pill" size="lg" className="w-full sm:w-auto"><Link to="/signup">Start practising free <ArrowRight /></Link></Button>
          <Button asChild variant="pillGhost" size="lg" className="w-full sm:w-auto"><Link to="/" hash="sample"><Play /> Watch sample session</Link></Button>
        </div>
      </div>

      <div className="container-x mt-16">
        <div ref={mock} className="animate-fade-up relative mx-auto max-w-5xl will-change-transform" style={{ animationDelay: "320ms" }}>
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/20 blur-3xl" aria-hidden />
          <AppWindow>
            <div className="grid gap-5 p-4 sm:p-6 md:grid-cols-[1.4fr_1fr]">
              <YourTurnCard compact />
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <div className="flex items-center gap-4">
                    <ScoreRing value={74} size={84} label="Readiness" />
                    <div>
                      <p className="text-xs text-muted-foreground">Interview readiness</p>
                      <p className="font-display-serif text-2xl">Building confidence</p>
                      <p className="text-xs text-success">+9 this week</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 rounded-2xl border border-border bg-surface p-4">
                  <SkillBar skill="technical" value={72} />
                  <SkillBar skill="communication" value={70} />
                  <SkillBar skill="problemSolving" value={67} />
                  <SkillBar skill="teamwork" value={58} />
                </div>
                <p className="text-center text-xs text-muted-foreground">Question 3 of 6 · 0:47 left</p>
              </div>
            </div>
          </AppWindow>
        </div>
      </div>
    </section>
  );
}

/* ---------- B) Feature strip ---------- */
export function FeatureStrip() {
  const ref = useReveal<HTMLElement>();
  const items = [
    { icon: FileText, t: "Tailored to your CV and the job", d: "Upload your CV and paste the listing — questions target the gaps a real interviewer would." },
    { icon: AudioLines, t: "Talks back with follow-up questions", d: "Vague answer? It digs in, just like a hiring manager who wants the real story." },
    { icon: Zap, t: "Scores you after every session", d: "Four clear skill scores, specific fixes and a model answer for every question." },
  ];
  const U = ({ children }: { children: React.ReactNode }) => <span className="underline decoration-primary decoration-2 underline-offset-[6px]">{children}</span>;
  return (
    <section id="features" ref={ref} className="scroll-mt-20 py-20">
      <div className="container-x">
        <div className="grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.map((it, i) => (
            <div key={it.t} className="reveal p-8" style={{ transitionDelay: `${i * 100}ms` }}>
              <it.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-5 text-lg font-semibold">{it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
            </div>
          ))}
        </div>
        <div className="reveal mx-auto mt-20 max-w-3xl text-center">
          <p className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            Live interviews are hard. You lose your train of thought, you ramble, and the best example slips your mind.
            Whether it's <U>design</U>, <U>technical</U>, <U>product</U> or <U>behavioural</U> — practising out loud makes your answers
            <span className="text-muted-foreground"> sharper, clearer and more confident.</span>
          </p>
          <Button asChild variant="pill" size="lg" className="mt-10"><Link to="/signup">Try your first interview</Link></Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- C) How it works ---------- */
export function HowItWorks() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="how-it-works" ref={ref} className="scroll-mt-20 py-20">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-4xl font-semibold sm:text-5xl">Three steps to your sharpest answers.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <StepCard i={0} n="01" title="Make it about your next role">
            <div className="space-y-3 rounded-2xl border border-border bg-surface p-4">
              <p className="flex items-center gap-2 text-xs text-muted-foreground"><Linkedin className="h-3.5 w-3.5" /> Job listing · imported from LinkedIn</p>
              <p className="flex items-center gap-2 font-medium"><Briefcase className="h-4 w-4 text-primary" /> Senior Product Designer</p>
              <p className="text-xs text-muted-foreground">Paystack · Lagos / Remote</p>
              <div className="flex items-center gap-2 rounded-xl bg-success/10 px-3 py-2 text-sm text-success"><Check className="h-4 w-4" /> CV uploaded</div>
            </div>
          </StepCard>
          <StepCard i={1} n="02" title="Answer out loud for five minutes">
            <div className="space-y-3 rounded-2xl border border-border bg-surface p-4">
              <div className="flex justify-between text-xs text-muted-foreground"><span>Question 3 of 6</span><span className="tabular-nums">0:47</span></div>
              <p className="text-sm font-medium">Walk me through a design decision you'd defend to an engineer.</p>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Mic className="h-4 w-4" /></span>
                <Waveform bars={18} className="h-6" />
                <span className="text-xs text-primary">Listening</span>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-[11px] text-muted-foreground"><span>Interview readiness</span><span>68</span></div>
                <div className="h-1.5 rounded-full bg-muted"><div className="h-full w-[68%] rounded-full bg-primary" /></div>
              </div>
            </div>
          </StepCard>
          <StepCard i={2} n="03" title="Know what to practise next">
            <div className="space-y-3 rounded-2xl border border-border bg-surface p-4">
              <p className="font-display-serif text-xl">Building confidence</p>
              <p className="text-xs text-muted-foreground">Readiness 74 · <span className="text-success">up 9 this week</span></p>
              <ul className="space-y-2 text-sm">
                {[["Day 1", "Rehearse your opening out loud", true], ["Day 2", "Teamwork session", false], ["Day 3", "Explain a difficult decision", false]].map(([d, t, done]) => (
                  <li key={t as string} className="flex items-center gap-2.5">
                    <span className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${done ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{done && <Check className="h-3 w-3" />}</span>
                    <span className="text-muted-foreground">{d as string}</span>
                    <span className={done ? "text-muted-foreground line-through" : ""}>{t as string}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StepCard>
        </div>
      </div>
    </section>
  );
}

function StepCard({ n, title, children, i }: { n: string; title: string; children: React.ReactNode; i: number }) {
  return (
    <article className="reveal surface-card flex flex-col gap-6 rounded-3xl p-6" style={{ transitionDelay: `${i * 120}ms` }}>
      <div>
        <span className="text-sm tabular-nums text-muted-foreground">{n}</span>
        <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      </div>
      <div className="mt-auto">{children}</div>
    </article>
  );
}
