import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as MicOff, m as Mic, n as X, o as Send, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { u as Waveform } from "./primitives-CX4YN4ZH.mjs";
import { t as Button } from "./button-DrTf7ZtB.mjs";
import { r as sessions, t as interviewService } from "./interview-DWUVa8mw.mjs";
import { t as speech } from "./speech-C4A8ENJZ.mjs";
import { t as Route } from "./interview._id-DKlBqoDy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/interview._id-DkAYFY8o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Room() {
	const { id } = Route.useParams();
	const nav = useNavigate();
	const [s, setS] = (0, import_react.useState)(void 0);
	const [q, setQ] = (0, import_react.useState)(null);
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [thinking, setThinking] = (0, import_react.useState)(false);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [speaking, setSpeaking] = (0, import_react.useState)(false);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const recRef = (0, import_react.useRef)(null);
	const videoRef = (0, import_react.useRef)(null);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setS(sessions.get(id));
	}, [id]);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setElapsed((e) => e + 1), 1e3);
		return () => clearInterval(t);
	}, []);
	(0, import_react.useEffect)(() => {
		if (s?.mode !== "video") return;
		let stream = null;
		navigator.mediaDevices?.getUserMedia({ video: true }).then((st) => {
			stream = st;
			if (videoRef.current) videoRef.current.srcObject = st;
		}).catch(() => {});
		return () => stream?.getTracks().forEach((t) => t.stop());
	}, [s?.mode]);
	(0, import_react.useEffect)(() => () => {
		speech.stop();
		recRef.current?.stop();
	}, []);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [s?.turns.length, q]);
	const ask = async (cur) => {
		setThinking(true);
		const next = await interviewService.nextQuestion(cur);
		setThinking(false);
		setQ(next);
		if (cur.mode !== "text") {
			setSpeaking(true);
			speech.speak(next.q, { onEnd: () => setSpeaking(false) });
		}
	};
	(0, import_react.useEffect)(() => {
		if (s && !q && !thinking && s.turns.length === 0) ask(s);
	}, [s]);
	if (s === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin text-muted-foreground" })
	});
	if (s === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This interview wasn't found." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/interview/new",
			className: "mt-4 inline-block text-primary",
			children: "Start a new one"
		})] })
	});
	const total = interviewService.questionCount(s.minutes);
	const mainAsked = s.turns.filter((t) => !t.followUp).length;
	const finish = async (cur) => {
		speech.stop();
		setThinking(true);
		await interviewService.score(cur);
		nav({
			to: "/results/$id",
			params: { id: cur.id }
		});
	};
	const submit = async () => {
		if (!q || !answer.trim()) return;
		recRef.current?.stop();
		speech.stop();
		const cur = {
			...s,
			turns: [...s.turns, {
				q: q.q,
				a: answer.trim(),
				followUp: q.followUp
			}]
		};
		sessions.save(cur);
		setS(cur);
		setAnswer("");
		setQ(null);
		const doneMain = cur.turns.filter((t) => !t.followUp).length;
		const lastShort = !q.followUp && answer.trim().split(/\s+/).length < 25;
		if (doneMain >= total && !lastShort) return finish(cur);
		await ask(cur);
	};
	const toggleMic = () => {
		const W = window;
		const Ctor = W.SpeechRecognition ?? W.webkitSpeechRecognition;
		if (listening) {
			recRef.current?.stop();
			return;
		}
		if (!Ctor) {
			setAnswer((a) => a || "");
			alert("Voice input isn't supported in this browser. Type your answer instead.");
			return;
		}
		const rec = new Ctor();
		rec.continuous = true;
		rec.interimResults = false;
		const base = answer ? answer + " " : "";
		let acc = "";
		rec.onresult = (e) => {
			for (let i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) acc += e.results[i][0].transcript + " ";
			setAnswer(base + acc.trim());
		};
		rec.onend = () => setListening(false);
		recRef.current = rec;
		rec.start();
		setListening(true);
	};
	const mm = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pt-safe pb-safe flex h-dvh flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium",
						children: s.role
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Question ",
							Math.min(mainAsked + 1, total),
							" of ",
							total,
							" · ",
							mm
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "pillGhost",
					size: "sm",
					onClick: () => s.turns.length ? finish(s) : nav({ to: "/dashboard" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), "End"]
				})]
			}),
			s.mode !== "text" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 border-b border-border p-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground ${speaking ? "shadow-glow" : ""}`,
							children: "AI"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform, {
							bars: 20,
							active: speaking
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display-serif text-sm text-muted-foreground",
							children: thinking ? "thinking…" : speaking ? "speaking" : "listening"
						})
					]
				}), s.mode === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					autoPlay: true,
					muted: true,
					playsInline: true,
					className: "hidden aspect-video w-full -scale-x-100 rounded-2xl bg-muted object-cover sm:block"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 space-y-4 overflow-y-auto px-4 py-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl space-y-4",
					children: [
						s.turns.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bubble, {
								ai: true,
								children: t.q
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bubble, { children: t.a })]
						}, i)),
						q && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bubble, {
							ai: true,
							children: [q.followUp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-xs text-primary",
								children: "Follow-up"
							}), q.q]
						}),
						thinking && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Interviewer is thinking…"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					submit();
				},
				className: "border-t border-border p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-2xl items-end gap-2",
					children: [
						s.mode !== "text" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: toggleMic,
							"aria-label": listening ? "Stop recording" : "Speak your answer",
							className: `grid h-12 w-12 shrink-0 place-items-center rounded-full ${listening ? "bg-destructive text-destructive-foreground" : "bg-card border border-border"}`,
							children: listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: answer,
							onChange: (e) => setAnswer(e.target.value),
							rows: 2,
							disabled: !q,
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									submit();
								}
							},
							placeholder: listening ? "Listening…" : "Type your answer…",
							className: "min-h-12 flex-1 resize-none rounded-2xl border border-input bg-card px-4 py-3 text-[15px] outline-none focus:border-primary disabled:opacity-50"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !q || !answer.trim(),
							"aria-label": "Send answer",
							className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-5 w-5" })
						})
					]
				})
			})
		]
	});
}
function Bubble({ ai, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${ai ? "bg-card border border-border" : "ml-auto bg-primary text-primary-foreground"}`,
		children
	});
}
//#endregion
export { Room as component };
