/**
 * Mock auth service. REAL BACKEND: replace these functions with calls to
 * your auth API (e.g. POST /api/auth/login). Keep the same signatures.
 */
import { storage } from "@/lib/storage";

export type User = { id: string; name: string; email: string };
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const authService = {
    login: async (email: string, pw: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pw })
    });
    
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Login failed");
    }
    
    const data = await res.json();
    // Save the real user data and JWT token to local storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  },
  async signup(name: string, email: string, _password: string): Promise<User> {
    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password: _password })
    });
    const user = { id: "u_1", name, email };
    storage.set("user", user);
    return user;
  },
  google: async (credentialToken: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: credentialToken }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Google Authentication failed");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  },
  async resetPassword(_email: string) {
    await wait(700);
  },
};

