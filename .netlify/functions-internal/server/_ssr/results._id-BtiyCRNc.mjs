import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Send, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { c as SkillBar, o as SKILLS, s as ScoreRing } from "./primitives-CX4YN4ZH.mjs";
import { t as AppShell } from "./app-shell-B1Rrecic.mjs";
import { r as sessions, t as interviewService } from "./interview-DWUVa8mw.mjs";
import { t as Route } from "./results._id-C3PgbM16.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/results._id-BtiyCRNc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Results() {
	const { id } = Route.useParams();
	const [s, setS] = (0, import_react.useState)(void 0);
	const [chat, setChat] = (0, import_react.useState)([]);
	const [msg, setMsg] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setS(sessions.get(id));
	}, [id]);
	if (s === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64" }) });
	if (!s?.scores) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["No results for this session yet. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/dashboard",
		className: "text-primary",
		children: "Back to dashboard"
	})] }) });
	const send = async (text) => {
		if (!text.trim() || busy) return;
		setChat((c) => [...c, {
			me: true,
			t: text
		}]);
		setMsg("");
		setBusy(true);
		const r = await interviewService.coach(text, s);
		setChat((c) => [...c, {
			me: false,
			t: r
		}]);
		setBusy(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-start gap-6 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRing, {
				value: s.overall,
				size: 120,
				label: "Overall"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					s.role,
					" · ",
					s.mode,
					" · ",
					s.turns.length,
					" answers"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-1 text-3xl font-semibold",
				children: ["You're ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display-serif text-primary",
					children: s.overall >= 75 ? "interview-ready." : s.overall >= 60 ? "nearly there." : "building up."
				})]
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-4 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-card space-y-4 rounded-3xl p-6 lg:col-span-2",
				children: SKILLS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
					skill: k.key,
					value: s.scores[k.key]
				}, k.key))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card grid grid-cols-2 gap-4 rounded-3xl p-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl font-semibold tabular-nums",
					children: s.speech?.wpm || "—"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "words / min"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl font-semibold tabular-nums",
					children: s.speech?.fillers ?? 0
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "filler words"
				})] })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 text-lg font-semibold",
			children: "Question by question"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 space-y-3",
			children: s.feedback?.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "surface-card group rounded-2xl p-5",
				open: i === 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "flex cursor-pointer list-none items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: f.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 font-semibold tabular-nums",
						children: f.score
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "rounded-xl bg-muted p-3 text-muted-foreground",
							children: [
								"“",
								f.a,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: f.note }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [[
								"S",
								"T",
								"A",
								"R"
							].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${f.star[k] ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`,
								children: k
							}, k)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "self-center text-xs text-muted-foreground",
								children: "STAR check"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-wider text-primary",
							children: "A stronger answer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted-foreground",
							children: f.better
						})] })
					]
				})]
			}, i))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 text-lg font-semibold",
			children: "Ask your coach"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card mt-3 rounded-3xl p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					chat.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							"What should I practise next?",
							"Explain the STAR method",
							"How do I sound more confident?"
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => send(p),
							className: "rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground",
							children: p
						}, p))
					}),
					chat.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.me ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`,
						children: m.t
					}, i)),
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					send(msg);
				},
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: msg,
					onChange: (e) => setMsg(e.target.value),
					placeholder: "Ask about your answers…",
					className: "h-11 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none focus:border-primary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					"aria-label": "Send",
					className: "grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 flex flex-wrap gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/interview/new",
				className: "inline-flex h-12 items-center rounded-full bg-primary px-6 font-medium text-primary-foreground",
				children: "Practise again"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/dashboard",
				className: "inline-flex h-12 items-center rounded-full border border-border px-6 font-medium",
				children: "Dashboard"
			})]
		})
	] });
}
//#endregion
export { Results as component };
