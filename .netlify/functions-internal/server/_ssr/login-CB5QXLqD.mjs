import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-DrTf7ZtB.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as authService, i as GoogleButton, n as Divider, r as Field, t as AuthShell } from "./auth-BIcO_D4S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CB5QXLqD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const nav = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [pw, setPw] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(null);
	const submit = async (e) => {
		e.preventDefault();
		const errs = {};
		if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Enter a valid email address.";
		if (!pw) errs.pw = "Enter your password.";
		setErrors(errs);
		if (Object.keys(errs).length) return;
		setLoading("form");
		try {
			const u = await authService.login(email, pw);
			toast.success(`Welcome back, ${u.name}.`);
			nav({ to: "/dashboard" });
		} catch (err) {
			setErrors({ form: err.message });
		} finally {
			setLoading(null);
		}
	};
	const google = async () => {
		setLoading("google");
		await authService.google();
		toast.success("Signed in with Google.");
		nav({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
		title: "Welcome back",
		subtitle: "Log in to keep practising.",
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
						label: "Email",
						name: "email",
						type: "email",
						autoComplete: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						error: errors.email,
						placeholder: "you@example.com"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Password",
						name: "password",
						type: "password",
						autoComplete: "current-password",
						value: pw,
						onChange: (e) => setPw(e.target.value),
						error: errors.pw
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/forgot-password",
							className: "text-sm text-primary hover:underline",
							children: "Forgot password?"
						})
					}),
					errors.form && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive",
						children: errors.form
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						variant: "pill",
						size: "lg",
						className: "w-full",
						disabled: !!loading,
						children: [loading === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), "Log in"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-center text-sm text-muted-foreground",
				children: ["New to Rehearse? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/signup",
					className: "text-primary hover:underline",
					children: "Create an account"
				})]
			})
		]
	});
}
//#endregion
export { Login as component };
