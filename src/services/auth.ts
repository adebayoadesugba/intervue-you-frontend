/**
 * Mock auth service. REAL BACKEND: replace these functions with calls to
 * your auth API (e.g. POST /api/auth/login). Keep the same signatures.
 */
import { storage } from "@/lib/storage";

export type User = { id: string; name: string; email: string };
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const authService = {
  async login(email: string, password: string): Promise<User> {
    await wait(700);
    if (password.length < 8) throw new Error("That email and password don't match. Try again or reset your password.");
    const user = { id: "u_1", name: email.split("@")[0] ?? "there", email };
    storage.set("user", user);
    return user;
  },
  async signup(name: string, email: string, _password: string): Promise<User> {
    await wait(800);
    const user = { id: "u_1", name, email };
    storage.set("user", user);
    return user;
  },
  async google(): Promise<User> {
    // REAL API: start your Google OAuth flow here.
    await wait(600);
    const user = { id: "u_g", name: "Guest", email: "guest@rehearse.app" };
    storage.set("user", user);
    return user;
  },
  async resetPassword(_email: string) {
    await wait(700);
  },
};
