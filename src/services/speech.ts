/**
 * Speech service. Default: browser Web Speech API.
 * REAL API: swap `speak` for ElevenLabs / OpenAI TTS, and add recognition
 * via Whisper / Deepgram behind the same interface.
 */
export interface SpeechService {
  supported(): boolean;
  speak(text: string, opts?: { onEnd?: () => void; rate?: number }): void;
  stop(): void;
}

export const speech: SpeechService = {
  supported: () => typeof window !== "undefined" && "speechSynthesis" in window,
  speak(text, opts) {
    if (!this.supported()) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = opts?.rate ?? 0.98;
    u.onend = () => opts?.onEnd?.();
    u.onerror = () => opts?.onEnd?.();
    window.speechSynthesis.speak(u);
  },
  stop() {
    if (this.supported()) window.speechSynthesis.cancel();
  },
};
