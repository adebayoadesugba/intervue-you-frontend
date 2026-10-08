import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Plus } from "lucide-react";
import { Logo, ThemeToggle } from "./primitives";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="pt-safe sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Logo />
          <nav className="flex items-center gap-1 text-sm">
            <Link to="/dashboard" className="hidden items-center gap-2 rounded-full px-3 py-2 text-muted-foreground hover:text-foreground sm:flex" activeProps={{ className: "text-foreground" }}>
              <LayoutDashboard className="h-4 w-4" />Dashboard
            </Link>
            <Link to="/interview/new" className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground">
              <Plus className="h-4 w-4" />New
            </Link>
            <ThemeToggle className="ml-1 hidden sm:inline-flex" />
          </nav>
        </div>
      </header>
      <main className="pb-safe mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

export function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${active ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"}`}>
      {children}
    </button>
  );
}
