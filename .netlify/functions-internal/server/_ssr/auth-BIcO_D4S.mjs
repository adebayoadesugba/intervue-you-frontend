import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { E as EyeOff, T as Eye, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as Orbs, d as cn, h as storage, i as Logo, l as ThemeToggle } from "./primitives-CX4YN4ZH.mjs";
import { t as CandidateCard } from "./landing-mid-DInWbfdS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BIcO_D4S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthShell({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-dvh lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-safe pb-safe flex flex-col px-5 py-6 sm:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative isolate hidden overflow-hidden border-l border-border bg-card lg:flex lg:items-center lg:justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbs, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm space-y-8 p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-3xl font-semibold leading-tight tracking-tight",
					children: ["Every session moves you ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display-serif text-primary",
						children: "closer."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "animate-float",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandidateCard, {})
				})]
			})]
		})]
	});
}
function Field({ label, error, type = "text", ...props }) {
	const [show, setShow] = (0, import_react.useState)(false);
	const id = props.id ?? props.name;
	const isPw = type === "password";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: id,
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id,
					type: isPw && show ? "text" : type,
					"aria-invalid": !!error,
					"aria-describedby": error ? `${id}-err` : void 0,
					className: cn("h-12 w-full rounded-xl border border-input bg-card px-4 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary", error && "border-destructive", isPw && "pr-12"),
					...props
				}), isPw && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setShow((s) => !s),
					"aria-label": show ? "Hide password" : "Show password",
					className: "absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center text-muted-foreground",
					children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${id}-err`,
				className: "text-xs text-destructive",
				children: error
			})
		]
	});
}
function GoogleButton({ onClick, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		disabled: loading,
		className: "flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-card text-sm font-medium transition-colors hover:bg-accent disabled:opacity-60",
		children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			className: "h-4 w-4",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#4285F4",
					d: "M22.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8.1z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#34A853",
					d: "M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.3 1-3.8 1-2.9 0-5.4-2-6.3-4.6H2.1v2.8A11 11 0 0 0 12 23z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#FBBC05",
					d: "M5.7 14a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 9.9z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#EA4335",
					d: "M12 5.4c1.6 0 3.1.6 4.3 1.7l3.1-3.1A11 11 0 0 0 2.1 7l3.6 2.8C6.6 7.3 9.1 5.4 12 5.4z"
				})
			]
		}), "Continue with Google"]
	});
}
function Divider() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-6 flex items-center gap-3 text-xs text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
			"or",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
		]
	});
}
/**
* Mock auth service. REAL BACKEND: replace these functions with calls to
* your auth API (e.g. POST /api/auth/login). Keep the same signatures.
*/
var wait = (ms) => new Promise((r) => setTimeout(r, ms));
var authService = {
	async login(email, password) {
		await wait(700);
		if (password.length < 8) throw new Error("That email and password don't match. Try again or reset your password.");
		const user = {
			id: "u_1",
			name: email.split("@")[0] ?? "there",
			email
		};
		storage.set("user", user);
		return user;
	},
	async signup(name, email, _password) {
		await wait(800);
		const user = {
			id: "u_1",
			name,
			email
		};
		storage.set("user", user);
		return user;
	},
	async google() {
		await wait(600);
		const user = {
			id: "u_g",
			name: "Guest",
			email: "guest@rehearse.app"
		};
		storage.set("user", user);
		return user;
	},
	async resetPassword(_email) {
		await wait(700);
	}
};
//#endregion
export { authService as a, GoogleButton as i, Divider as n, Field as r, AuthShell as t };
