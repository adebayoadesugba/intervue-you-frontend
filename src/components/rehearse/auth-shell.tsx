import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Logo, Orbs, ThemeToggle } from "./primitives";
import { CandidateCard } from "./landing-mid";
import { cn } from "@/lib/utils";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="pt-safe pb-safe flex flex-col px-5 py-6 sm:px-10">
        <div className="flex items-center justify-between"><Logo /><ThemeToggle /></div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
      <div className="relative isolate hidden overflow-hidden border-l border-border bg-card lg:flex lg:items-center lg:justify-center">
        <Orbs />
        <div className="w-full max-w-sm space-y-8 p-10">
          <p className="text-3xl font-semibold leading-tight tracking-tight">Every session moves you <span className="font-display-serif text-primary">closer.</span></p>
          <div className="animate-float"><CandidateCard /></div>
        </div>
      </div>
    </div>
  );
}

export function Field({ label, error, type = "text", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string | undefined }) {
  const [show, setShow] = useState(false);
  const id = props.id ?? props.name;
  const isPw = type === "password";
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <div className="relative">
        <input
          id={id} type={isPw && show ? "text" : type} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
          className={cn("h-12 w-full rounded-xl border border-input bg-card px-4 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary", error && "border-destructive", isPw && "pr-12")}
          {...props}
        />
        {isPw && (
          <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center text-muted-foreground">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && <p id={`${id}-err`} className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function GoogleButton({ onClick, loading }: { onClick: () => void; loading?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={loading} className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-card text-sm font-medium transition-colors hover:bg-accent disabled:opacity-60">
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8.1z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.3 1-3.8 1-2.9 0-5.4-2-6.3-4.6H2.1v2.8A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.7 14a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 9.9z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.3 1.7l3.1-3.1A11 11 0 0 0 2.1 7l3.6 2.8C6.6 7.3 9.1 5.4 12 5.4z"/></svg>
      )}
      Continue with Google
    </button>
  );
}

export function Divider() {
  return <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>;
}
