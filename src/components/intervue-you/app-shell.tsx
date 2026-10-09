import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, Plus, Settings } from "lucide-react";
import { Logo, ThemeToggle } from "./primitives";
import { storage } from "@/lib/storage";

export function AppShell({ children }: { children: React.ReactNode }) {
  const nav = useNavigate();
  const [openSettings, setOpenSettings] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    storage.remove("token");
    storage.remove("user");
    storage.remove("profile");
    storage.remove("sessions");
    nav({ to: "/login" });
  };

  // Close mobile settings menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenSettings(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="pt-safe sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          {/* Logo handles its own Link internally */}
          <Logo to="/dashboard" />

          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/dashboard"
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-muted-foreground hover:text-foreground sm:flex"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>

            <Link
              to="/interview/new"
              className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
              New
            </Link>

            {/* Desktop Theme Toggle & Logout (hidden on mobile) */}
            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full px-3 py-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </div>

            {/* Mobile Settings Gear Button & Popover (visible under 640px) */}
            <div className="relative flex items-center sm:hidden" ref={menuRef}>
              <button
                type="button"
                onClick={() => setOpenSettings((prev) => !prev)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>

              {openSettings && (
                <div className="absolute right-0 top-12 w-60 rounded-2xl border border-border bg-card p-4 shadow-xl z-50 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Appearance
                    </p>
                    <ThemeToggle className="w-full justify-between" />
                  </div>

                  <div className="border-t border-border pt-3">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="pb-safe mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

export function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
        active
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}