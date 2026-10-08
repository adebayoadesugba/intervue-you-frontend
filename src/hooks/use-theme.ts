import { useCallback, useEffect, useState } from "react";
import { storage } from "@/lib/storage";

export type ThemeChoice = "dark" | "light" | "system";

/** Inline script run before first paint (see __root.tsx) to avoid a theme flash. */
export const themeInitScript = `(function(){try{var t=JSON.parse(localStorage.getItem('rehearse:theme')||'"dark"');var d=t==='system'?matchMedia('(prefers-color-scheme: dark)').matches:t!=='light';document.documentElement.classList.toggle('dark',d);if(JSON.parse(localStorage.getItem('rehearse:perf')||'false'))document.documentElement.classList.add('perf-mode')}catch(e){}})();`;

function apply(choice: ThemeChoice) {
  const dark =
    choice === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches : choice !== "light";
  document.documentElement.classList.toggle("dark", dark);
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeChoice>("dark");

  useEffect(() => {
    setThemeState(storage.get<ThemeChoice>("theme", "dark"));
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const fn = () => apply("system");
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, [theme]);

  const setTheme = useCallback((t: ThemeChoice) => {
    storage.set("theme", t);
    setThemeState(t);
    apply(t);
    window.dispatchEvent(new CustomEvent("rehearse-theme", { detail: t }));
  }, []);

  useEffect(() => {
    const fn = (e: Event) => setThemeState((e as CustomEvent<ThemeChoice>).detail);
    window.addEventListener("rehearse-theme", fn);
    return () => window.removeEventListener("rehearse-theme", fn);
  }, []);

  return { theme, setTheme };
}
