import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-DrTf7ZtB.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as authService, i as GoogleButton, n as Divider, r as Field, t as AuthShell } from "./auth-BIcO_D4S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-UuvXvXtP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Signup() {
	const nav = useNavigate();
	const [f, setF] = (0, import_react.useState)({
		name: "",
		email: "",
		pw: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(null);
	const set = (k) => (e) => setF({
		...f,
		[k]: e.target.value
	});
	const submit = async (e) => {
		e.preventDefault();
		const errs = {};
		if (f.name.trim().length < 2) errs.name = "Tell us your name.";
		if (!/^\S+@\S+\.\S+$/.test(f.email)) errs.email = "Enter a valid email address.";
		if (f.pw.length < 8) errs.pw = "Use at least 8 characters.";
		setErrors(errs);
		if (Object.keys(errs).length) return;
		setLoading("form");
		await authService.signup(f.name, f.email, f.pw);
		toast.success("Account created. Let's set up your first interview.");
		nav({ to: "/onboarding" });
	};
	const google = async () => {
		setLoading("google");
		await authService.google();
		toast.success("Signed up with Google.");
		nav({ to: "/onboarding" });
	};
	const strength = Math.min(4, [
		/.{8,}/,
		/[A-Z]/,
		/\d/,
		/[^\w]/
	].filter((r) => r.test(f.pw)).length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
		title: "Start practising free",
		subtitle: "Two free sessions. No card needed.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleButton, {
				onClick: google,
				loading: loading === "google"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				noValidate: true,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Full name",
						name: "name",
						autoComplete: "name",
						value: f.name,
						onChange: set("name"),
						error: errors.name,
						placeholder: "Amara Obi"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						name: "email",
						type: "email",
						autoComplete: "email",
						value: f.email,
						onChange: set("email"),
						error: errors.email,
						placeholder: "you@example.com"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Password",
						name: "password",
						type: "password",
						autoComplete: "new-password",
						value: f.pw,
						onChange: set("pw"),
						error: errors.pw
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-4 gap-1",
						"aria-hidden": true,
						children: [
							0,
							1,
							2,
							3
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1 rounded-full ${i < strength ? strength > 2 ? "bg-success" : "bg-warning" : "bg-muted"}` }, i))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						variant: "pill",
						size: "lg",
						className: "w-full",
						disabled: !!loading,
						children: [loading === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), "Create account"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-xs text-muted-foreground",
						children: [
							"By signing up you agree to our ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "underline",
								children: "Terms"
							}),
							" and ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "underline",
								children: "Privacy Policy"
							}),
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-center text-sm text-muted-foreground",
				children: ["Already have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "text-primary hover:underline",
					children: "Log in"
				})]
			})
		]
	});
}
//#endregion
export { Signup as component };
