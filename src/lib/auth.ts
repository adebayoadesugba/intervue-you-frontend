export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("token");
  if (!raw) return null;

  const cleaned = raw.replace(/^"+|"+$/g, "").trim();
  if (!cleaned || cleaned === "null" || cleaned === "undefined") return null;

  // Self-heal storage if stray quotes were previously saved
  if (cleaned !== raw) {
    localStorage.setItem("token", cleaned);
  }

  return cleaned;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const logout = (navigate?: (opts: { to: string }) => void) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    localStorage.removeItem("onboarded");
  }

  if (navigate) {
    navigate({ to: "/login" });
  } else if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};