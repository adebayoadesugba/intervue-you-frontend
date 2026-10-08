import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AuthShell, Divider, Field, GoogleButton } from "@/components/rehearse/auth-shell";
import { authService } from "@/services/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Rehearse" },
      { name: "description", content: "Log in to Rehearse to continue practising interviews and track your readiness." },
      { property: "og:title", content: "Log in — Rehearse" },
      { property: "og:description", content: "Pick up where you left off with your AI mock interviews." },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errors, setErrors] = useState<{ email?: string; pw?: string; form?: string }>({});
  const [loading, setLoading] = useState<"form" | "google" | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Enter a valid email address.";
    if (!pw) errs.pw = "Enter your password.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading("form");
    try {
      const u = await authService.login(email, pw);
      toast.success(`Welcome back, ${u.name}.`);
      nav({ to: "/dashboard" });
    } catch (err) {
      setErrors({ form: (err as Error).message });
    } finally { setLoading(null); }
  };
  const google = async () => { setLoading("google"); await authService.google(); toast.success("Signed in with Google."); nav({ to: "/dashboard" }); };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to keep practising.">
      <GoogleButton onClick={google} loading={loading === "google"} />
      <Divider />
      <form onSubmit={submit} noValidate className="space-y-4">
        <Field label="Email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="you@example.com" />
        <Field label="Password" name="password" type="password" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} error={errors.pw} />
        <div className="flex justify-end"><Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link></div>
        {errors.form && <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{errors.form}</p>}
        <Button type="submit" variant="pill" size="lg" className="w-full" disabled={!!loading}>{loading === "form" && <Loader2 className="animate-spin" />}Log in</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">New to Rehearse? <Link to="/signup" className="text-primary hover:underline">Create an account</Link></p>
    </AuthShell>
  );
}
