import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AuthShell, Divider, Field, GoogleButton } from "@/components/intervue-you/auth-shell";
import { authService } from "@/services/auth";
import { getToken } from "@/lib/auth";
import { storage } from "@/lib/storage";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Intervue You" },
      { name: "description", content: "Log in to Intervue You to continue practising interviews and track your readiness." },
      { property: "og:title", content: "Log in — Intervue You" },
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

  // Redirect authenticated users away from login page
  useEffect(() => {
    if (getToken()) {
      nav({ to: "/dashboard" });
    }
  }, [nav]);

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

      // Check if profile was returned from the API or existing storage
      const profile = storage.get("profile", null);
      if (profile) {
        nav({ to: "/dashboard" });
      } else {
        nav({ to: "/onboarding" });
      }
    } catch (err) {
      setErrors({ form: (err as Error).message || "Invalid credentials. Please try again." });
    } finally {
      setLoading(null); 
    }
  };

  const handleGoogleSuccess = async (accessToken: string) => {
    setLoading("google");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: accessToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google sign-in failed.");

      storage.set("token", data.token);
      storage.set("user", data.user);

      // Store profile returned from backend if user has completed onboarding before
      if (data.profile) {
        storage.set("profile", data.profile);
      }

      toast.success(`Welcome back, ${data.user.name || "user"}.`);

      // If backend returned a profile or local storage has it, skip onboarding
      if (data.profile || storage.get("profile", null)) {
        nav({ to: "/dashboard" });
      } else {
        nav({ to: "/onboarding" });
      }
    } catch (err) {
      setErrors({ form: (err as Error).message || "Google sign-in failed." });
      toast.error("Google sign-in failed.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to keep practising.">
      <GoogleButton onSuccess={handleGoogleSuccess} onClick={() => {}} loading={loading === "google"} />
      <Divider />
      <form onSubmit={submit} noValidate className="space-y-4">
        <Field label="Email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="you@example.com" />
        <Field label="Password" name="password" type="password" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} error={errors.pw} />
        
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
        </div>

        {errors.form && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errors.form}
          </p>
        )}

        <Button type="submit" variant="pill" size="lg" className="w-full" disabled={!!loading}>
          {loading === "form" && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
          Log in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to Intervue You? <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}