import { memo, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme, type ThemeChoice } from "@/hooks/use-theme";
import { useInView } from "@/hooks/use-reveal";
import { SKILLS, type SkillKey } from "@/data/marketing";
import { getToken } from "@/lib/auth";

export function Logo({ className, to }: { className?: string; to?: string }) {
  // If 'to' is not explicitly passed, route logged-in users to /dashboard and guests to /
  const destination = to ?? (typeof window !== "undefined" && getToken() ? "/dashboard" : "/");

  return (
    <Link 
      to={destination} 
      className={cn("flex items-center gap-2 font-semibold tracking-tight", className)} 
      aria-label="Intervue You home"
    >
      <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
          <path d="M5 10v4M9 7v10M13 4v16M17 8v8M21 11v2" />
        </svg>
      </span>
      <span className="text-[17px]">Intervue You</span>
    </Link>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const opts: { v: ThemeChoice; icon: typeof Sun; label: string }[] = [
    { v: "dark", icon: Moon, label: "Dark theme" },
    { v: "light", icon: Sun, label: "Light theme" },
    { v: "system", icon: Monitor, label: "System theme" },
  ];

  const handleThemeChange = (newTheme: ThemeChoice) => {
    setTheme(newTheme);
    const root = document.documentElement;

    if (newTheme === "light") {
      root.classList.remove("dark");
    } else if (newTheme === "dark") {
      root.classList.add("dark");
    } else if (newTheme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn("inline-flex items-center rounded-full border border-border bg-card/60 p-0.5", className)}
    >
      {opts.map(({ v, icon: Icon, label }) => (
        <button
          key={v}
          role="radio"
          aria-checked={theme === v}
          aria-label={label}
          onClick={() => handleThemeChange(v)}
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors",
            theme === v && "bg-accent text-foreground",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}

/** Animated count-up number. */
export function CountUp({ to, start = true, duration = 1200 }: { to: number; start?: boolean; duration?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(to);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, start, duration]);
  return <>{v}</>;
}

export const SkillBar = memo(function SkillBar({
  skill, value, highlight, compact,
}: { skill: SkillKey; value: number; highlight?: boolean; compact?: boolean }) {
  const s = SKILLS.find((x) => x.key === skill)!;
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("space-y-1.5", compact && "space-y-1")}>
      <div className="flex items-center justify-between text-[13px]">
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className={cn("h-2 w-2 rounded-full", s.cls)} aria-hidden />
          {s.label}
        </span>
        <span className={cn("font-medium tabular-nums", highlight && "text-success")}>
          <CountUp to={value} start={inView} />
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={s.label}>
        <div className={cn("bar-fill h-full rounded-full", s.cls)} style={{ transform: `scaleX(${inView ? value / 100 : 0})` }} />
      </div>
    </div>
  );
});

export function ScoreRing({ value, size = 96, stroke = 8, label }: { value: number; size?: number; stroke?: number; label?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="relative grid place-items-center" style={{ width: size, height: size }} role="img" aria-label={`${label ?? "Score"} ${value} out of 100`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--muted)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--primary)" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={inView ? c * (1 - value / 100) : c}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.2,.7,.2,1)" }}
        />
      </svg>
      <span className="absolute text-xl font-semibold tabular-nums">
        <CountUp to={value} start={inView} />
      </span>
    </div>
  );
}

export const Waveform = memo(function Waveform({ bars = 24, active = true, className }: { bars?: number; active?: boolean; className?: string }) {
  return (
    <div className={cn("flex h-8 items-center gap-[3px]", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn("w-[3px] rounded-full bg-primary", active && "wave-bar")}
          style={{
            height: `${30 + ((i * 37) % 70)}%`,
            animationDelay: `${(i % 8) * 0.09}s`,
            transform: active ? undefined : "scaleY(0.3)",
          }}
        />
      ))}
    </div>
  );
});

export function AppWindow({ children, className, title = "intervue-you.app/interview" }: { children: React.ReactNode; className?: string; title?: string }) {
  return (
    <div className={cn("surface-card overflow-hidden rounded-3xl", className)}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-destructive/80" />
        <span className="h-3 w-3 rounded-full bg-warning/80" />
        <span className="h-3 w-3 rounded-full bg-success/80" />
        <span className="mx-auto truncate rounded-full bg-muted px-3 py-0.5 text-[11px] text-muted-foreground">{title}</span>
        <span className="w-12" />
      </div>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-primary">{children}</p>;
}

export function Orbs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="orb orb-blue left-[10%] top-[-10%] h-[28rem] w-[28rem]" />
      <div className="orb orb-violet right-[5%] top-[20%] h-[22rem] w-[22rem]" />
      <div className="orb orb-warm bottom-[-10%] left-[35%] h-[20rem] w-[20rem]" />
    </div>
  );
}