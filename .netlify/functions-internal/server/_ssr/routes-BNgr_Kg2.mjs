import { r as __toESM } from "../_runtime.mjs";
import { a as AccordionTrigger$1, c as require_jsx_runtime, i as AccordionItem$1, l as require_react, n as AccordionContent$1, r as AccordionHeader, t as Accordion$1 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ChevronLeft, M as Check, j as ChevronDown, k as ChevronRight, p as Minus, s as Quote } from "../_libs/lucide-react.mjs";
import { a as Orbs, d as cn, f as faqs, m as reviews, r as Eyebrow, v as useReveal } from "./primitives-CX4YN4ZH.mjs";
import { t as Button } from "./button-DrTf7ZtB.mjs";
import { t as SiteLayout } from "./site-chrome-BIe8zkaj.mjs";
import { a as ProgressSection, i as HowItWorks, n as FeatureStrip, o as SampleSession, r as Hero, s as SkillShowcase } from "./landing-mid-DInWbfdS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BNgr_Kg2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Accordion$1;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItem$1, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionHeader, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionTrigger$1, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = AccordionTrigger$1.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent$1, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = AccordionContent$1.displayName;
var currencies = {
	USD: {
		symbol: "$",
		rate: 1,
		round: 1
	},
	NGN: {
		symbol: "₦",
		rate: 1550,
		round: 100
	},
	GBP: {
		symbol: "£",
		rate: .79,
		round: 1
	},
	EUR: {
		symbol: "€",
		rate: .92,
		round: 1
	}
};
function formatPrice(usd, c) {
	const { symbol, rate, round } = currencies[c];
	if (usd === 0) return `${symbol}0`;
	return `${symbol}${(Math.round(usd * rate / round) * round).toLocaleString("en-US")}`;
}
var plans = [
	{
		id: "free",
		name: "Free",
		monthly: 0,
		yearly: 0,
		blurb: "Try a few text sessions and see your first scorecard.",
		features: [
			"2 text interview sessions",
			"Basic scorecard",
			"Question bank access"
		],
		cta: "Start free"
	},
	{
		id: "pro",
		name: "Pro",
		monthly: 19,
		yearly: 15,
		blurb: "Everything you need to walk in ready.",
		features: [
			"Unlimited text, audio and video sessions",
			"Full feedback and model answers",
			"Progress tracking and daily plan",
			"Questions tailored to your CV and job"
		],
		cta: "Go Pro",
		recommended: true
	},
	{
		id: "premium",
		name: "Premium",
		monthly: 39,
		yearly: 31,
		blurb: "For high-stakes interviews and career changers.",
		features: [
			"Everything in Pro",
			"Resume review",
			"Priority speech quality",
			"Custom interview packs"
		],
		cta: "Go Premium"
	}
];
var comparison = [
	{
		label: "Text sessions",
		values: [
			"2",
			"Unlimited",
			"Unlimited"
		]
	},
	{
		label: "Audio and video sessions",
		values: [
			false,
			true,
			true
		]
	},
	{
		label: "Full feedback and model answers",
		values: [
			false,
			true,
			true
		]
	},
	{
		label: "Progress tracking",
		values: [
			false,
			true,
			true
		]
	},
	{
		label: "CV and job tailoring",
		values: [
			false,
			true,
			true
		]
	},
	{
		label: "Resume review",
		values: [
			false,
			false,
			true
		]
	},
	{
		label: "Custom interview packs",
		values: [
			false,
			false,
			true
		]
	}
];
function Reviews() {
	const ref = useReveal();
	const [i, setI] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const touchX = (0, import_react.useRef)(null);
	const go = (0, import_react.useCallback)((d) => setI((x) => (x + d + reviews.length) % reviews.length), []);
	(0, import_react.useEffect)(() => {
		if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const id = setInterval(() => go(1), 6500);
		return () => clearInterval(id);
	}, [paused, go]);
	const r = reviews[i];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "reviews",
		ref,
		className: "scroll-mt-20 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Reviews" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl font-semibold sm:text-5xl",
					children: "What people say after using Rehearse"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal surface-card mt-12 grid overflow-hidden rounded-[2rem] md:grid-cols-[1.3fr_1fr]",
				role: "region",
				"aria-roledescription": "carousel",
				"aria-label": "Testimonials",
				onMouseEnter: () => setPaused(true),
				onMouseLeave: () => setPaused(false),
				onTouchStart: (e) => {
					setPaused(true);
					touchX.current = e.touches[0].clientX;
				},
				onTouchEnd: (e) => {
					const s = touchX.current;
					if (s != null) {
						const dx = e.changedTouches[0].clientX - s;
						if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
					}
					setPaused(false);
				},
				onKeyDown: (e) => {
					if (e.key === "ArrowRight") go(1);
					if (e.key === "ArrowLeft") go(-1);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col p-6 sm:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, {
							className: "h-10 w-10 text-primary",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "animate-fade-up mt-6 flex-1 text-xl font-medium leading-snug tracking-tight sm:text-2xl",
							"aria-live": "polite",
							children: [
								"\"",
								r.quote,
								"\""
							]
						}, i),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: r.role
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => go(-1),
									"aria-label": "Previous testimonial",
									className: "grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => go(1),
									"aria-label": "Next testimonial",
									className: "grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "ml-2 flex gap-1",
									children: reviews.map((_, d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setI(d),
										"aria-label": `Show testimonial ${d + 1}`,
										"aria-current": d === i,
										className: "grid h-11 w-6 place-items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 rounded-full transition-all", d === i ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/40") })
									}, d))
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative aspect-[4/5] md:aspect-auto",
					children: reviews.map((rv, d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: rv.img,
						alt: `Portrait of ${rv.name}`,
						width: 768,
						height: 960,
						loading: "lazy",
						className: cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700", d === i ? "opacity-100" : "opacity-0")
					}, rv.name))
				})]
			})]
		})
	});
}
function Pricing() {
	const ref = useReveal();
	const [yearly, setYearly] = (0, import_react.useState)(false);
	const [cur, setCur] = (0, import_react.useState)("USD");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "pricing",
		ref,
		className: "scroll-mt-20 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal flex flex-col justify-between gap-6 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Pricing" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-4xl font-semibold sm:text-5xl",
							children: "Start free. Upgrade when it clicks."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								role: "radiogroup",
								"aria-label": "Billing period",
								className: "inline-flex rounded-full border border-border bg-card p-1",
								children: [["Monthly", false], ["Yearly", true]].map(([l, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									role: "radio",
									"aria-checked": yearly === v,
									onClick: () => setYearly(v),
									className: cn("h-9 rounded-full px-4 text-sm transition-colors", yearly === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"),
									children: [l, v ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1.5 text-xs opacity-80",
										children: "−20%"
									}) : null]
								}, l))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "sr-only",
								htmlFor: "currency",
								children: "Currency"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: "currency",
								value: cur,
								onChange: (e) => setCur(e.target.value),
								className: "h-11 rounded-full border border-border bg-card px-4 text-sm",
								children: Object.keys(currencies).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: c
								}, c))
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-5 lg:grid-cols-3",
					children: plans.map((p, idx) => {
						const rec = "recommended" in p && p.recommended;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: cn("reveal relative flex flex-col rounded-3xl p-7", rec ? "surface-card shadow-glow" : "surface-card"),
							style: { transitionDelay: `${idx * 100}ms` },
							children: [
								rec && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground",
									children: "Recommended"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-semibold",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: p.blurb
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-6 flex items-baseline gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-5xl font-semibold tracking-tighter tabular-nums",
										children: formatPrice(yearly ? p.yearly : p.monthly, cur)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground",
										children: "/ month"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 h-4 text-xs text-muted-foreground",
									children: yearly && p.yearly > 0 ? `Billed ${formatPrice(p.yearly * 12, cur)} yearly` : ""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-6 flex-1 space-y-3 text-sm",
									children: p.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), f]
									}, f))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: rec ? "pill" : "pillGhost",
									size: "lg",
									className: "mt-8 w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/signup",
										children: p.cta
									})
								})
							]
						}, p.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "reveal surface-card mt-8 overflow-x-auto rounded-3xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[520px] text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
								className: "sr-only",
								children: "Plan comparison"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 font-medium",
									children: "Compare plans"
								}), plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 text-center font-medium",
									children: p.name
								}, p.id))]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: comparison.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border last:border-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 text-muted-foreground",
									children: row.label
								}), row.values.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 text-center",
									children: typeof v === "string" ? v : v ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										className: "mx-auto h-4 w-4 text-primary",
										"aria-label": "Included"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
										className: "mx-auto h-4 w-4 text-muted-foreground/50",
										"aria-label": "Not included"
									})
								}, i))]
							}, row.label)) })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-center text-sm text-muted-foreground",
					children: [
						"Cancel anytime from Settings. Prices shown in ",
						cur,
						"; local taxes may apply."
					]
				})
			]
		})
	});
}
function FAQ() {
	const ref = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		ref,
		className: "scroll-mt-20 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "FAQ" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-4xl font-semibold sm:text-5xl",
						children: "Questions, answered."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground",
						children: "Still unsure? Tap the chat bubble and a human will reply."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				defaultValue: "item-0",
				className: "reveal",
				children: faqs.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: `item-${i}`,
					className: "border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "py-5 text-left text-base font-medium hover:no-underline",
						children: f.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						className: "pb-5 text-[15px] leading-relaxed text-muted-foreground",
						children: f.a
					})]
				}, f.q))
			})]
		})
	});
}
function FinalCTA() {
	const ref = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref,
		className: "py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-x",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal surface-card relative isolate overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbs, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mx-auto max-w-3xl text-4xl font-semibold sm:text-6xl",
						children: ["Walk in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display-serif text-primary",
							children: "interview ready."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-5 max-w-md text-muted-foreground",
						children: "Your first two sessions are free. No card, no pressure — just practice."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "pill",
						size: "lg",
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signup",
							children: "Start practising free"
						})
					})
				]
			})
		})
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureStrip, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleSession, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillShowcase, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reviews, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCTA, {})
	] });
}
//#endregion
export { Index as component };
