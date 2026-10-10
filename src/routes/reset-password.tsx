import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AuthShell, Field } from "@/components/intervue-you/auth-shell";

export const Route = createFileRoute("/reset-password")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: (search.token as string) || "",
    id: (search.id as string) || "",
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const { token, id } = Route.useSearch();
  const nav = useNavigate();
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, userId: id, newPassword: pw }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Password updated successfully! Please log in.");
      nav({ to: "/login" });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Set new password" subtitle="Choose a strong password for your account.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="New Password" name="password" type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
        <Button type="submit" variant="pill" size="lg" className="w-full" disabled={loading}>
          {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
          Update password
        </Button>
      </form>
    </AuthShell>
  );
}