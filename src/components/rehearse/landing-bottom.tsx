import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, Minus, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Eyebrow, Orbs } from "./primitives";
import { useReveal } from "@/hooks/use-reveal";
import { faqs, reviews } from "@/data/marketing";
import { comparison, currencies, formatPrice, plans, type Currency } from "@/config/pricing";
import { cn } from "@/lib/utils";

/* ---------- H) Reviews ---------- */
export function Reviews() {
  const ref = useReveal<HTMLElement>();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const go = useCallback((d: number) => setI((x) => (x + d + reviews.length) % reviews.length), []);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go(1), 6500);
    return () => clearInterval(id);
  }, [paused, go]);
  const r = reviews[i]!;
  return (
    <section id="reviews" ref={ref} className="scroll-mt-20 py-20">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <Eyebrow>Reviews</Eyebrow>
          <h2 className="text-4xl font-semibold sm:text-5xl">What people say after using Rehearse</h2>
        </div>
        <div
          className="reveal surface-card mt-12 grid overflow-hidden rounded-[2rem] md:grid-cols-[1.3fr_1fr]"
          role="region" aria-roledescription="carousel" aria-label="Testimonials"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => { setPaused(true); touchX.current = e.touches[0]!.clientX; }}
          onTouchEnd={(e) => { const s = touchX.current; if (s != null) { const dx = e.changedTouches[0]!.clientX - s; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); } setPaused(false); }}
          onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
        >
          <div className="flex flex-col p-6 sm:p-10">
            <Quote className="h-10 w-10 text-primary" aria-hidden />
            <blockquote key={i} className="animate-fade-up mt-6 flex-1 text-xl font-medium leading-snug tracking-tight sm:text-2xl" aria-live="polite">
              "{r.quote}"
            </blockquote>
            <div className="mt-8">
              <p className="font-medium">{r.name}</p>
              <p className="text-sm text-muted-foreground">{r.role}</p>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-accent"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-accent"><ChevronRight className="h-5 w-5" /></button>
              <div className="ml-2 flex gap-1">
                {reviews.map((_, d) => (
                  <button key={d} onClick={() => setI(d)} aria-label={`Show testimonial ${d + 1}`} aria-current={d === i} className="grid h-11 w-6 place-items-center">
                    <span className={cn("h-1.5 rounded-full transition-all", d === i ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/40")} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto">
            {reviews.map((rv, d) => (
              <img key={rv.name} src={rv.img} alt={`Portrait of ${rv.name}`} width={768} height={960} loading="lazy"
                className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700", d === i ? "opacity-100" : "opacity-0")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- I) Pricing ---------- */
export function Pricing() {
  const ref = useReveal<HTMLElement>();
  const [yearly, setYearly] = useState(false);
  const [cur, setCur] = useState<Currency>("USD");
  return (
    <section id="pricing" ref={ref} className="scroll-mt-20 py-20">
      <div className="container-x">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="text-4xl font-semibold sm:text-5xl">Start free. Upgrade when it clicks.</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-full border border-border bg-card p-1">
              {[["Monthly", false], ["Yearly", true]].map(([l, v]) => (
                <button key={l as string} role="radio" aria-checked={yearly === v} onClick={() => setYearly(v as boolean)}
                  className={cn("h-9 rounded-full px-4 text-sm transition-colors", yearly === v ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
                  {l as string}{v ? <span className="ml-1.5 text-xs opacity-80">−20%</span> : null}
                </button>
              ))}
            </div>
            <label className="sr-only" htmlFor="currency">Currency</label>
            <select id="currency" value={cur} onChange={(e) => setCur(e.target.value as Currency)} className="h-11 rounded-full border border-border bg-card px-4 text-sm">
              {(Object.keys(currencies) as Currency[]).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((p, idx) => {
            const rec = "recommended" in p && p.recommended;
            return (
              <article key={p.id} className={cn("reveal relative flex flex-col rounded-3xl p-7", rec ? "surface-card shadow-glow" : "surface-card")} style={{ transitionDelay: `${idx * 100}ms` }}>
                {rec && <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Recommended</span>}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
                <p className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold tracking-tighter tabular-nums">{formatPrice(yearly ? p.yearly : p.monthly, cur)}</span>
                  <span className="text-sm text-muted-foreground">/ month</span>
                </p>
                <p className="mt-1 h-4 text-xs text-muted-foreground">{yearly && p.yearly > 0 ? `Billed ${formatPrice(p.yearly * 12, cur)} yearly` : ""}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => <li key={f} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>)}
                </ul>
                <Button asChild variant={rec ? "pill" : "pillGhost"} size="lg" className="mt-8 w-full"><Link to="/signup">{p.cta}</Link></Button>
              </article>
            );
          })}
        </div>
        <div className="reveal surface-card mt-8 overflow-x-auto rounded-3xl">
          <table className="w-full min-w-[520px] text-sm">
            <caption className="sr-only">Plan comparison</caption>
            <thead><tr className="border-b border-border text-left"><th className="p-4 font-medium">Compare plans</th>{plans.map((p) => <th key={p.id} className="p-4 text-center font-medium">{p.name}</th>)}</tr></thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <td className="p-4 text-muted-foreground">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="p-4 text-center">
                      {typeof v === "string" ? v : v ? <Check className="mx-auto h-4 w-4 text-primary" aria-label="Included" /> : <Minus className="mx-auto h-4 w-4 text-muted-foreground/50" aria-label="Not included" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">Cancel anytime from Settings. Prices shown in {cur}; local taxes may apply.</p>
      </div>
    </section>
  );
}

/* ---------- J) FAQ ---------- */
export function FAQ() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="faq" ref={ref} className="scroll-mt-20 py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div className="reveal">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-4xl font-semibold sm:text-5xl">Questions, answered.</h2>
          <p className="mt-4 text-muted-foreground">Still unsure? Tap the chat bubble and a human will reply.</p>
        </div>
        <Accordion type="single" collapsible defaultValue="item-0" className="reveal">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------- K) Final CTA ---------- */
export function FinalCTA() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="py-10">
      <div className="container-x">
        <div className="reveal surface-card relative isolate overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:py-24">
          <Orbs />
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold sm:text-6xl">Walk in <span className="font-display-serif text-primary">interview ready.</span></h2>
          <p className="mx-auto mt-5 max-w-md text-muted-foreground">Your first two sessions are free. No card, no pressure — just practice.</p>
          <Button asChild variant="pill" size="lg" className="mt-8"><Link to="/signup">Start practising free</Link></Button>
        </div>
      </div>
    </section>
  );
}
