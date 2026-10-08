import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as LayoutDashboard, c as Plus } from "../_libs/lucide-react.mjs";
import { i as Logo, l as ThemeToggle } from "./primitives-CX4YN4ZH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-B1Rrecic.js
var import_jsx_runtime = require_jsx_runtime();
function AppShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "pt-safe sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-1 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							className: "hidden items-center gap-2 rounded-full px-3 py-2 text-muted-foreground hover:text-foreground sm:flex",
							activeProps: { className: "text-foreground" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-4 w-4" }), "Dashboard"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/interview/new",
							className: "flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "New"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, { className: "ml-1 hidden sm:inline-flex" })
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "pb-safe mx-auto max-w-6xl px-4 py-8 sm:px-6",
			children
		})]
	});
}
function Chip({ active, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: `rounded-full border px-4 py-2 text-sm transition-colors ${active ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"}`,
		children
	});
}
//#endregion
export { Chip as n, AppShell as t };
