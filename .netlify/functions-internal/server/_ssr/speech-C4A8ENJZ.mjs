//#region node_modules/.nitro/vite/services/ssr/assets/speech-C4A8ENJZ.js
var speech = {
	supported: () => typeof window !== "undefined" && "speechSynthesis" in window,
	speak(text, opts) {
		if (!this.supported()) return;
		window.speechSynthesis.cancel();
		const u = new SpeechSynthesisUtterance(text);
		u.rate = opts?.rate ?? .98;
		u.onend = () => opts?.onEnd?.();
		u.onerror = () => opts?.onEnd?.();
		window.speechSynthesis.speak(u);
	},
	stop() {
		if (this.supported()) window.speechSynthesis.cancel();
	}
};
//#endregion
export { speech as t };
