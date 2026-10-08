import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as ArrowRight, L as ArrowLeft } from "../_libs/lucide-react.mjs";
import { i as Logo } from "./primitives-CX4YN4ZH.mjs";
import { t as Button } from "./button-DrTf7ZtB.mjs";
import { n as Chip } from "./app-shell-B1Rrecic.mjs";
import { n as profileStore } from "./interview-DWUVa8mw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-CgN06X_t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROLES = [
	"Software engineer",
	"Product designer",
	"Product manager",
	"Data analyst",
	"Marketing",
	"Sales",
	"Graduate programme"
];
var LEVELS = [
	"Student / graduate",
	"Junior",
	"Mid-level",
	"Senior",
	"Lead / manager"
];
var GOALS = [
	"Interview this week",
	"Interview this month",
	"Just building confidence"
];
function Onboarding() {
	const nav = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [p, setP] = (0, import_react.useState)({
		role: "",
		level: "",
		goal: "",
		cv: ""
	});
	const steps = [
		{
			t: "What role are you going for?",
			k: "role",
			opts: ROLES
		},
		{
			t: "What's your experience level?",
			k: "level",
			opts: LEVELS
		},
		{
			t: "When is your interview?",
			k: "goal",
			opts: GOALS
		}
	];
	const last = step === steps.length;
	const cur = steps[step];
	const canNext = last || cur && p[cur.k];
	const next = () => {
		if (!last) return setStep(step + 1);
		profileStore.set(p);
		nav({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pt-safe pb-safe mx-auto flex min-h-dvh max-w-xl flex-col px-5 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: [
						"Step ",
						step + 1,
						" of 4"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-4 gap-1.5",
				children: [
					0,
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}` }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-1 flex-col justify-center py-10",
				children: cur ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold",
						children: cur.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-wrap gap-2",
						children: cur.opts.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: p[cur.k] === o,
							onClick: () => setP({
								...p,
								[cur.k]: o
							}),
							children: o
						}, o))
					}),
					cur.k === "role" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						placeholder: "Or type a custom role…",
						value: ROLES.includes(p.role) ? "" : p.role,
						onChange: (e) => setP({
							...p,
							role: e.target.value
						}),
						className: "mt-4 h-12 w-full rounded-xl border border-input bg-card px-4 outline-none focus:border-primary"
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-3xl font-semibold",
						children: ["Paste your CV ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display-serif text-primary",
							children: "(optional)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "We'll use it to ask about your real experience. You can skip this."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 8,
						value: p.cv,
						onChange: (e) => setP({
							...p,
							cv: e.target.value
						}),
						placeholder: "Paste your CV or a short summary of your experience…",
						className: "mt-6 w-full rounded-xl border border-input bg-card p-4 text-sm outline-none focus:border-primary"
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [step > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "pillGhost",
					size: "lg",
					onClick: () => setStep(step - 1),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), "Back"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "pill",
					size: "lg",
					className: "flex-1",
					disabled: !canNext,
					onClick: next,
					children: [last ? "Go to dashboard" : "Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
				})]
			})
		]
	});
}
//#endregion
export { Onboarding as component };
