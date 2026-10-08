import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AuthShell, Divider, Field, GoogleButton } from "@/components/rehearse/auth-shell";
import { authService } from "@/services/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — Rehearse" },
      { name: "description", content: "Sign up free and start practising interviews with an AI that listens and scores you." },
      { property: "og:title", content: "Create your account — Rehearse" },
      { property: "og:description", content: "Two free text sessions. No card needed." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", email: "", pw: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof f, string>>>({});
  const [loading, setLoading] = useState<"form" | "google" | null>(null);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (f.name.trim().length < 2) errs.name = "Tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) errs.email = "Enter a valid email address.";
    if (f.pw.length < 8) errs.pw = "Use at least 8 characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading("form");
    await authService.signup(f.name, f.email, f.pw);
    toast.success("Account created. Let's set up your first interview.");
    nav({ to: "/onboarding" });
  };
  const google = async () => { setLoading("google"); await authService.google(); toast.success("Signed up with Google."); nav({ to: "/onboarding" }); };
  const strength = Math.min(4, [/.{8,}/, /[A-Z]/, /\d/, /[^\w]/].filter((r) => r.test(f.pw)).length);

  return (
    <AuthShell title="Start practising free" subtitle="Two free sessions. No card needed.">
      <GoogleButton onClick={google} loading={loading === "google"} />
      <Divider />
      <form onSubmit={submit} noValidate className="space-y-4">
        <Field label="Full name" name="name" autoComplete="name" value={f.name} onChange={set("name")} error={errors.name} placeholder="Amara Obi" />
        <Field label="Email" name="email" type="email" autoComplete="email" value={f.email} onChange={set("email")} error={errors.email} placeholder="you@example.com" />
        <div>
          <Field label="Password" name="password" type="password" autoComplete="new-password" value={f.pw} onChange={set("pw")} error={errors.pw} />
          <div className="mt-2 grid grid-cols-4 gap-1" aria-hidden>
            {[0, 1, 2, 3].map((i) => <span key={i} className={`h-1 rounded-full ${i < strength ? (strength > 2 ? "bg-success" : "bg-warning") : "bg-muted"}`} />)}
          </div>
        </div>
        <Button type="submit" variant="pill" size="lg" className="w-full" disabled={!!loading}>{loading === "form" && <Loader2 className="animate-spin" />}Create account</Button>
        <p className="text-center text-xs text-muted-foreground">By signing up you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.</p>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link></p>
    </AuthShell>
  );
}
