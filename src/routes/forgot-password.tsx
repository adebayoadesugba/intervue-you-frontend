import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthShell, Field } from "@/components/rehearse/auth-shell";
import { authService } from "@/services/auth";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Rehearse" },
      { name: "description", content: "Get a link to reset your Rehearse password." },
      { property: "og:title", content: "Reset your password — Rehearse" },
      { property: "og:description", content: "We'll email you a secure reset link." },
    ],
  }),
  component: Forgot,
});

function Forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    setError(undefined); setState("loading");
    await authService.resetPassword(email);
    setState("sent");
  };
  return (
    <AuthShell title="Reset your password" subtitle="We'll email you a secure link to choose a new one.">
      {state === "sent" ? (
        <div role="status" className="surface-card rounded-2xl p-6 text-center">
          <CheckCircle2 className="mx-auto h-8 w-8 text-success" />
          <p className="mt-3 font-medium">Check your inbox</p>
          <p className="mt-1 text-sm text-muted-foreground">If an account exists for {email}, a reset link is on its way.</p>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4">
          <Field label="Email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error} placeholder="you@example.com" />
          <Button type="submit" variant="pill" size="lg" className="w-full" disabled={state === "loading"}>{state === "loading" && <Loader2 className="animate-spin" />}Send reset link</Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted-foreground"><Link to="/login" className="text-primary hover:underline">Back to log in</Link></p>
    </AuthShell>
  );
}
