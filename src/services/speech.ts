/**
 * Enhanced Speech Service with Natural Voice Selection.
 */
export interface SpeechService {
  supported(): boolean;
  speak(text: string, opts?: { onEnd?: () => void; rate?: number; pitch?: number; voiceIndex?: number }): void;
  stop(): void;
  getVoices(): SpeechSynthesisVoice[];
}

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  if (cachedVoices.length > 0) return cachedVoices;
  
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedVoices = voices;
  }
  return cachedVoices;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export const speech: SpeechService = {
  supported: () => typeof window !== "undefined" && "speechSynthesis" in window,

  getVoices() {
    return loadVoices();
  },

  speak(text, opts) {
    if (!this.supported()) return;
    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.rate = opts?.rate ?? 0.98;
    u.pitch = opts?.pitch ?? 1.0;

    const voices = loadVoices();
    if (voices.length > 0) {
      if (opts?.voiceIndex !== undefined && voices[opts.voiceIndex]) {
        u.voice = voices[opts.voiceIndex]!;
      } else {
        // Priority filter for natural-sounding English voices
        const preferredVoice = voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.includes("Natural") ||
             v.name.includes("Google US English") ||
             v.name.includes("Samantha") ||
             v.name.includes("Microsoft Jenny") ||
             v.name.includes("Microsoft Guy") ||
             v.name.includes("Karen") ||
             v.name.includes("Daniel"))
        ) || voices.find((v) => v.lang.startsWith("en"));

        if (preferredVoice) {
          u.voice = preferredVoice;
        }
      }
    }

    u.onend = () => opts?.onEnd?.();
    u.onerror = () => opts?.onEnd?.();
    window.speechSynthesis.speak(u);
  },

  stop() {
    if (this.supported()) window.speechSynthesis.cancel();
  },
};