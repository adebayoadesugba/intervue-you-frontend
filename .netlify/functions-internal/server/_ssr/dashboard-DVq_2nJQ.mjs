import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as ArrowRight, g as MessageSquare, m as Mic, r as Video } from "../_libs/lucide-react.mjs";
import { c as SkillBar, h as storage, o as SKILLS, s as ScoreRing } from "./primitives-CX4YN4ZH.mjs";
import { t as AppShell } from "./app-shell-B1Rrecic.mjs";
import { n as profileStore, r as sessions } from "./interview-DWUVa8mw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DVq_2nJQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var icons = {
	text: MessageSquare,
	audio: Mic,
	video: Video
};
function Dashboard() {
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setData({
			p: profileStore.get(),
			list: sessions.all().filter((s) => s.scores),
			name: storage.get("user", null)?.name ?? "there"
		});
	}, []);
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64" }) });
	const { p, list, name } = data;
	const latest = list[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "text-3xl font-semibold",
			children: [
				"Welcome back, ",
				name.split(" ")[0],
				"."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: p ? `Practising for ${p.role} · ${p.level}` : "Tell us your target role to get tailored questions."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-4 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex flex-col justify-between gap-6 rounded-3xl p-6 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Next step"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-2xl font-semibold",
					children: latest ? "Keep the streak going." : "Your first interview takes 10 minutes."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/interview/new",
					className: "inline-flex h-12 w-fit items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground hover:shadow-glow",
					children: ["Start an interview ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex items-center gap-5 rounded-3xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRing, {
					value: latest?.overall ?? 0,
					label: "Readiness"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Readiness"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display-serif text-2xl",
					children: latest ? latest.overall >= 70 ? "ready" : "getting there" : "not started"
				})] })]
			})]
		}),
		latest?.scores && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "surface-card mt-4 grid gap-4 rounded-3xl p-6 sm:grid-cols-2",
			children: SKILLS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
				skill: s.key,
				value: latest.scores[s.key]
			}, s.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 text-lg font-semibold",
			children: "Recent sessions"
		}),
		list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground",
			children: "No sessions yet. Your scores will appear here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card",
			children: list.map((s) => {
				const I = icons[s.mode];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/results/$id",
					params: { id: s.id },
					className: "flex items-center gap-4 px-5 py-4 hover:bg-accent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "h-4 w-4 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: s.role
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									new Date(s.createdAt).toLocaleDateString(),
									" · ",
									s.minutes,
									" min"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold tabular-nums",
							children: s.overall
						})
					]
				}) }, s.id);
			})
		})
	] });
}
//#endregion
export { Dashboard as component };
