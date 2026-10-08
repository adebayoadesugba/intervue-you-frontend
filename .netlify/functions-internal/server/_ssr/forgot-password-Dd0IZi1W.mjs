import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as CircleCheck, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-DrTf7ZtB.mjs";
import { a as authService, r as Field, t as AuthShell } from "./auth-BIcO_D4S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-Dd0IZi1W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Forgot() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)();
	const [state, setState] = (0, import_react.useState)("idle");
	const submit = async (e) => {
		e.preventDefault();
		if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
		setError(void 0);
		setState("loading");
		await authService.resetPassword(email);
		setState("sent");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
		title: "Reset your password",
		subtitle: "We'll email you a secure link to choose a new one.",
		children: [state === "sent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "status",
			className: "surface-card rounded-2xl p-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-8 w-8 text-success" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-medium",
					children: "Check your inbox"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"If an account exists for ",
						email,
						", a reset link is on its way."
					]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			noValidate: true,
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Email",
				name: "email",
				type: "email",
				autoComplete: "email",
				value: email,
				onChange: (e) => setEmail(e.target.value),
				error,
				placeholder: "you@example.com"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				variant: "pill",
				size: "lg",
				className: "w-full",
				disabled: state === "loading",
				children: [state === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), "Send reset link"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-center text-sm text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "text-primary hover:underline",
				children: "Back to log in"
			})
		})]
	});
}
//#endregion
export { Forgot as component };
