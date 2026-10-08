import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Moon, f as Monitor, i as Sun } from "../_libs/lucide-react.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/primitives-CX4YN4ZH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Safe localStorage wrapper — never throws (private mode, SSR, quota). */
var PREFIX = "rehearse:";
var storage = {
	get(key, fallback) {
		if (typeof window === "undefined") return fallback;
		try {
			const raw = window.localStorage.getItem(PREFIX + key);
			return raw === null ? fallback : JSON.parse(raw);
		} catch {
			return fallback;
		}
	},
	set(key, value) {
		if (typeof window === "undefined") return;
		try {
			window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
		} catch {}
	}
};
/** Inline script run before first paint (see __root.tsx) to avoid a theme flash. */
var themeInitScript = `(function(){try{var t=JSON.parse(localStorage.getItem('rehearse:theme')||'"dark"');var d=t==='system'?matchMedia('(prefers-color-scheme: dark)').matches:t!=='light';document.documentElement.classList.toggle('dark',d);if(JSON.parse(localStorage.getItem('rehearse:perf')||'false'))document.documentElement.classList.add('perf-mode')}catch(e){}})();`;
function apply(choice) {
	const dark = choice === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches : choice !== "light";
	document.documentElement.classList.toggle("dark", dark);
}
function useTheme() {
	const [theme, setThemeState] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		setThemeState(storage.get("theme", "dark"));
	}, []);
	(0, import_react.useEffect)(() => {
		if (theme !== "system") return;
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const fn = () => apply("system");
		mq.addEventListener("change", fn);
		return () => mq.removeEventListener("change", fn);
	}, [theme]);
	const setTheme = (0, import_react.useCallback)((t) => {
		storage.set("theme", t);
		setThemeState(t);
		apply(t);
		window.dispatchEvent(new CustomEvent("rehearse-theme", { detail: t }));
	}, []);
	(0, import_react.useEffect)(() => {
		const fn = (e) => setThemeState(e.detail);
		window.addEventListener("rehearse-theme", fn);
		return () => window.removeEventListener("rehearse-theme", fn);
	}, []);
	return {
		theme,
		setTheme
	};
}
var review_1_default = "/assets/review-1-nuwMXn3a.jpg";
var review_2_default = "/assets/review-2-BHT7vGBH.jpg";
var review_3_default = "/assets/review-3-CBhqBrwS.jpg";
var review_4_default = "/assets/review-4-U1404TAn.jpg";
var review_5_default = "/assets/review-5-Ce8GK9YN.jpg";
var SKILLS = [
	{
		key: "technical",
		label: "Technical",
		color: "var(--technical)",
		cls: "bg-technical"
	},
	{
		key: "communication",
		label: "Communication",
		color: "var(--communication)",
		cls: "bg-communication"
	},
	{
		key: "problemSolving",
		label: "Problem solving",
		color: "var(--problem)",
		cls: "bg-problem"
	},
	{
		key: "teamwork",
		label: "Teamwork",
		color: "var(--teamwork)",
		cls: "bg-teamwork"
	}
];
var progressSeries = {
	technical: [
		56,
		61,
		66,
		72,
		null
	],
	communication: [
		54,
		58,
		63,
		70,
		null
	],
	problemSolving: [
		45,
		52,
		60,
		67,
		null
	],
	teamwork: [
		25,
		36,
		48,
		58,
		null
	]
};
var reviews = [
	{
		quote: "I used to ramble through system design questions. After a week of audio sessions I could explain trade-offs in two minutes flat — and I got the offer.",
		name: "Tolu Adeyemi",
		role: "Backend engineer, now at a Lagos fintech",
		img: review_1_default
	},
	{
		quote: "The follow-up questions felt uncomfortably real. It caught me hand-waving the impact of my portfolio projects, which is exactly what my panel did.",
		name: "Daniel Moreau",
		role: "Senior product designer",
		img: review_2_default
	},
	{
		quote: "The STAR check changed how I tell stories. My results used to be vague; now every answer ends with a number and a decision.",
		name: "Priya Raman",
		role: "Product manager",
		img: review_3_default
	},
	{
		quote: "As a graduate I had nothing to compare against. Seeing my readiness move from 41 to 78 gave me confidence I couldn't fake.",
		name: "Sam Okafor",
		role: "Graduate analyst",
		img: review_4_default
	},
	{
		quote: "I practised remote video interviews at 6am before my kids woke up. Coming back after eight years out, that privacy mattered.",
		name: "Helena Ruiz",
		role: "Remote customer success lead",
		img: review_5_default
	}
];
var faqs = [
	{
		q: "How do I get started?",
		a: "Create a free account, tell us the role you're going for, and optionally upload your CV and the job listing. Your first interview starts in under two minutes — no card required."
	},
	{
		q: "Do I speak or type my answers?",
		a: "Either. Choose text chat, an audio conversation, or a face-to-face video interview. You can even switch mode mid-interview if you're somewhere you can't talk."
	},
	{
		q: "How long is a practice session?",
		a: "You pick: 5, 10, 15 or 30 minutes, or a fixed number of questions. Most people start with a 10-minute session of five or six questions."
	},
	{
		q: "What makes Rehearse useful for interview preparation?",
		a: "It asks questions based on your CV and the job, follows up when your answer is vague, and scores you on technical depth, communication, problem solving and teamwork — then turns that into a daily plan."
	},
	{
		q: "Which roles can I practise for?",
		a: "Engineering, design, product, data, marketing, sales, finance, healthcare, teaching, civil service and graduate programmes, customer-facing roles, and any custom role you describe."
	},
	{
		q: "How will I know what to improve?",
		a: "Every session ends with a scorecard, question-by-question feedback, an improved sample answer, a STAR-method check and speech analytics like pace and filler words."
	},
	{
		q: "Is my practice private?",
		a: "Yes. Recordings are off by default, video stays on your device, and you can delete everything in one click. Your answers are processed by an AI provider to generate feedback and are never shared with employers."
	},
	{
		q: "Can I use video?",
		a: "Yes, on Pro and Premium. You'll see an animated AI interviewer and your own self-view, with optional tips on eye contact and posture."
	},
	{
		q: "Does it work on my phone?",
		a: "Yes. Rehearse is designed for phones as small as 320px and works in any modern mobile browser. You can also install it to your home screen."
	},
	{
		q: "How does billing and cancelling work?",
		a: "Pay monthly or yearly in USD, NGN, GBP or EUR. Cancel anytime from Settings — you keep access until the end of your billing period."
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/** Returns true once the element enters the viewport. */
/** Adds `is-visible` to the element (and `.reveal` children) when scrolled into view. */
function useReveal() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const targets = [el, ...Array.from(el.querySelectorAll(".reveal"))];
		const io = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("is-visible");
					io.unobserve(e.target);
				}
			});
		}, {
			threshold: .15,
			rootMargin: "0px 0px -40px 0px"
		});
		targets.forEach((t) => io.observe(t));
		return () => io.disconnect();
	}, []);
	return ref;
}
function useInView() {
	const ref = (0, import_react.useRef)(null);
	const [inView, setInView] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) => {
			if (!e) return;
			if (e.isIntersecting) {
				setInView(true);
				io.disconnect();
			}
		}, { threshold: .3 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return {
		ref,
		inView
	};
}
function Logo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: cn("flex items-center gap-2 font-semibold tracking-tight", className),
		"aria-label": "Rehearse home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 24 24",
				className: "h-4 w-4",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.4",
				strokeLinecap: "round",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 10v4M9 7v10M13 4v16M17 8v8M21 11v2" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[17px]",
			children: "Rehearse"
		})]
	});
}
function ThemeToggle({ className }) {
	const { theme, setTheme } = useTheme();
	const opts = [
		{
			v: "dark",
			icon: Moon,
			label: "Dark theme"
		},
		{
			v: "light",
			icon: Sun,
			label: "Light theme"
		},
		{
			v: "system",
			icon: Monitor,
			label: "System theme"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "radiogroup",
		"aria-label": "Theme",
		className: cn("inline-flex items-center rounded-full border border-border bg-card/60 p-0.5", className),
		children: opts.map(({ v, icon: Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			role: "radio",
			"aria-checked": theme === v,
			"aria-label": label,
			onClick: () => setTheme(v),
			className: cn("grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors", theme === v && "bg-accent text-foreground"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" })
		}, v))
	});
}
/** Animated count-up number. */
function CountUp({ to, start = true, duration = 1200 }) {
	const [v, setV] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!start) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(to);
		let raf = 0;
		const t0 = performance.now();
		const tick = (t) => {
			const p = Math.min(1, (t - t0) / duration);
			setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [
		to,
		start,
		duration
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: v });
}
var SkillBar = (0, import_react.memo)(function SkillBar({ skill, value, highlight, compact }) {
	const s = SKILLS.find((x) => x.key === skill);
	const { ref, inView } = useInView();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("space-y-1.5", compact && "space-y-1"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-[13px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("h-2 w-2 rounded-full", s.cls),
					"aria-hidden": true
				}), s.label]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("font-medium tabular-nums", highlight && "text-success"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
					to: value,
					start: inView
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 overflow-hidden rounded-full bg-muted",
			role: "progressbar",
			"aria-valuenow": value,
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-label": s.label,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("bar-fill h-full rounded-full", s.cls),
				style: { transform: `scaleX(${inView ? value / 100 : 0})` }
			})
		})]
	});
});
function ScoreRing({ value, size = 96, stroke = 8, label }) {
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;
	const { ref, inView } = useInView();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative grid place-items-center",
		style: {
			width: size,
			height: size
		},
		role: "img",
		"aria-label": `${label ?? "Score"} ${value} out of 100`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className: "-rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "var(--muted)",
				strokeWidth: stroke
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "var(--primary)",
				strokeWidth: stroke,
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: inView ? c * (1 - value / 100) : c,
				style: { transition: "stroke-dashoffset 1.2s cubic-bezier(.2,.7,.2,1)" }
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute text-xl font-semibold tabular-nums",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
				to: value,
				start: inView
			})
		})]
	});
}
var Waveform = (0, import_react.memo)(function Waveform({ bars = 24, active = true, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex h-8 items-center gap-[3px]", className),
		"aria-hidden": true,
		children: Array.from({ length: bars }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("w-[3px] rounded-full bg-primary", active && "wave-bar"),
			style: {
				height: `${30 + i * 37 % 70}%`,
				animationDelay: `${i % 8 * .09}s`,
				transform: active ? void 0 : "scaleY(0.3)"
			}
		}, i))
	});
});
function AppWindow({ children, className, title = "rehearse.app/interview" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("surface-card overflow-hidden rounded-3xl", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-border px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-destructive/80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-warning/80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-success/80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto truncate rounded-full bg-muted px-3 py-0.5 text-[11px] text-muted-foreground",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-12" })
			]
		}), children]
	});
}
function Eyebrow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-4 text-xs font-medium uppercase tracking-[0.18em] text-primary",
		children
	});
}
function Orbs() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb orb-blue left-[10%] top-[-10%] h-[28rem] w-[28rem]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb orb-violet right-[5%] top-[20%] h-[22rem] w-[22rem]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb orb-warm bottom-[-10%] left-[35%] h-[20rem] w-[20rem]" })
		]
	});
}
//#endregion
export { useInView as _, Orbs as a, SkillBar as c, cn as d, faqs as f, themeInitScript as g, storage as h, Logo as i, ThemeToggle as l, reviews as m, CountUp as n, SKILLS as o, progressSeries as p, Eyebrow as r, ScoreRing as s, AppWindow as t, Waveform as u, useReveal as v };
