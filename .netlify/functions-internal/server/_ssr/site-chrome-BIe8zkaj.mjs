import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ArrowUp, _ as MessageCircle, a as ShieldCheck, b as Lock, n as X, v as Menu, y as Mail } from "../_libs/lucide-react.mjs";
import { d as cn, i as Logo, l as ThemeToggle } from "./primitives-CX4YN4ZH.mjs";
import { t as Button } from "./button-DrTf7ZtB.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-chrome-BIe8zkaj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		label: "Features",
		hash: "features"
	},
	{
		label: "How it works",
		hash: "how-it-works"
	},
	{
		label: "Reviews",
		hash: "reviews"
	},
	{
		label: "Pricing",
		hash: "pricing"
	},
	{
		label: "FAQ",
		hash: "faq"
	}
];
function Navbar() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const fn = () => setScrolled(window.scrollY > 8);
		fn();
		window.addEventListener("scroll", fn, { passive: true });
		return () => window.removeEventListener("scroll", fn);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("pt-safe sticky top-0 z-50 transition-colors duration-200", scrolled ? "glass border-x-0 border-t-0 shadow-none" : "border-b border-transparent"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "container-x flex h-16 items-center justify-between gap-4",
			"aria-label": "Main",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "hidden items-center gap-1 lg:flex",
					children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						hash: n.hash,
						className: "rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
						children: n.label
					}) }, n.hash))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-2 lg:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							className: "rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Log in"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "pill",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/signup",
								children: "Get started"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "grid h-11 w-11 place-items-center rounded-full lg:hidden",
					"aria-label": open ? "Close menu" : "Open menu",
					"aria-expanded": open,
					onClick: () => setOpen((o) => !o),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("fixed inset-x-0 top-16 bottom-0 z-40 bg-background/95 backdrop-blur-xl transition-[opacity,transform] duration-300 lg:hidden", open ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x flex h-full flex-col gap-1 py-6",
				children: [NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					hash: n.hash,
					onClick: () => setOpen(false),
					className: "rounded-2xl px-3 py-4 text-2xl font-medium tracking-tight",
					children: n.label
				}, n.hash)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto space-y-3 pb-safe pb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "pillGhost",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								onClick: () => setOpen(false),
								children: "Log in"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "pill",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/signup",
								onClick: () => setOpen(false),
								children: "Get started"
							})
						})]
					})]
				})]
			})
		})]
	});
}
var soon = (label) => () => toast(`${label} is arriving in the next update.`);
var COLS = [
	{
		title: "Product",
		links: [
			{
				label: "Features",
				to: "/",
				hash: "features"
			},
			{
				label: "How it works",
				to: "/",
				hash: "how-it-works"
			},
			{
				label: "Pricing",
				to: "/",
				hash: "pricing"
			},
			{ label: "Roles" }
		]
	},
	{
		title: "Resources",
		links: [
			{ label: "Interview tips" },
			{ label: "Question bank" },
			{ label: "Blog" },
			{
				label: "FAQ",
				to: "/",
				hash: "faq"
			}
		]
	},
	{
		title: "Company",
		links: [
			{
				label: "About",
				to: "/about"
			},
			{ label: "Careers" },
			{
				label: "Contact",
				to: "/contact"
			}
		]
	},
	{
		title: "Legal",
		links: [
			{
				label: "Terms",
				to: "/terms"
			},
			{
				label: "Privacy",
				to: "/privacy"
			},
			{
				label: "Cookie policy",
				to: "/cookies"
			}
		]
	}
];
function SocialIcon({ name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "h-4 w-4",
		fill: "currentColor",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: {
			LinkedIn: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.84 0-2.12 1.43-2.12 2.9V21H9z",
			X: "M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.5 3h6.4l4.4 5.9zm-1.1 16.2h1.7L7 4.7H5.2z",
			TikTok: "M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.6V9a7.4 7.4 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5z",
			YouTube: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15V9l5.7 3z",
			Instagram: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 2.2c-2.7 0-3 0-4 .1C4.6 2.4 2.5 4.5 2.3 8c0 1-.1 1.3-.1 4s0 3 .1 4c.2 3.4 2.3 5.5 5.7 5.7 1 0 1.3.1 4 .1s3 0 4-.1c3.4-.2 5.5-2.3 5.7-5.7 0-1 .1-1.3.1-4s0-3-.1-4C21.5 4.6 19.4 2.5 16 2.3c-1 0-1.3-.1-4-.1z",
			Facebook: "M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.6V13h2.7v8z",
			WhatsApp: "M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1a7.4 7.4 0 0 1-3.7-3.2c-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4l-.5-.3zM12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2z"
		}[name] })
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative mt-24 border-t border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-xs text-sm text-muted-foreground",
							children: "Practise interviews out loud with an AI that listens, follows up and tells you exactly what to fix."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								"LinkedIn",
								"X",
								"TikTok",
								"YouTube",
								"Instagram",
								"Facebook",
								"WhatsApp"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								onClick: (e) => {
									e.preventDefault();
									soon(`Our ${s} page`)();
								},
								"aria-label": s,
								className: "grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, { name: s })
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "mailto:support@rehearse.app",
							className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), " support@rehearse.app"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-8 sm:grid-cols-4",
					children: COLS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-4 text-sm font-medium",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1",
						children: c.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: l.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							...l.hash ? { hash: l.hash } : {},
							className: "block py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
							children: l.label
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: soon(l.label),
							className: "block py-1.5 text-left text-sm text-muted-foreground transition-colors hover:text-foreground",
							children: l.label
						}) }, l.label))
					})] }, c.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x flex flex-col gap-4 border-t border-border py-6 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mr-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5" }), " Secure payments"]
					}), [
						"Visa",
						"Mastercard",
						"PayPal",
						"Bank transfer",
						"Paystack",
						"Flutterwave"
					].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-md border border-border bg-card px-2 py-1 text-[11px] font-medium text-muted-foreground",
						children: p
					}, p))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 self-start rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs text-success md:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), " Your practice is private"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x pb-safe flex flex-col-reverse gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Rehearse. For practice and preparation only."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "lang",
							children: "Language"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "lang",
							defaultValue: "en",
							onChange: (e) => e.target.value !== "en" && toast("More languages are on the way."),
							className: "h-9 rounded-full border border-border bg-card px-3 text-xs text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "en",
									children: "English"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "fr",
									children: "Français"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "yo",
									children: "Yorùbá"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "es",
									children: "Español"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => window.scrollTo({
								top: 0,
								behavior: "smooth"
							}),
							"aria-label": "Back to top",
							className: "grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4" })
						})
					]
				})]
			})
		]
	});
}
function HelpBubble() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-50",
		children: [open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-label": "Help",
			className: "glass animate-fade-up absolute bottom-16 right-0 w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Hi there 👋"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Questions about plans, privacy or getting started? We usually reply within a few hours."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "pill",
					className: "mt-4 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "mailto:support@rehearse.app",
						children: "Email support"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setOpen((o) => !o),
			"aria-label": open ? "Close help" : "Open help chat",
			"aria-expanded": open,
			className: "grid h-13 w-13 h-[52px] w-[52px] place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform active:scale-95",
			children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" })
		})]
	});
}
function SiteLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpBubble, {})
		]
	});
}
//#endregion
export { SiteLayout as t };
