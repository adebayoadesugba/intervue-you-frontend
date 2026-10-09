export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const logout = (navigate?: (opts: { to: string }) => void) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
  }
  
  if (navigate) {
    navigate({ to: "/login" });
  } else if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};