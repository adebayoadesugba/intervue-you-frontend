import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as Orbs, r as Eyebrow } from "./primitives-CX4YN4ZH.mjs";
import { t as SiteLayout } from "./site-chrome-BIe8zkaj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/info-page-CH5pXgvb.js
var import_jsx_runtime = require_jsx_runtime();
function InfoPage({ eyebrow, title, intro, sections }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden pb-8 pt-16 sm:pt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbs, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: eyebrow }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-semibold sm:text-6xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-lg text-muted-foreground",
					children: intro
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-x max-w-3xl space-y-10 py-10",
		children: [sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-semibold",
			children: s.h
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 leading-relaxed text-muted-foreground",
			children: s.p
		})] }, s.h)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Last updated 1 October 2026."
		})]
	})] });
}
var meta = (title, description) => ({ meta: [
	{ title: `${title} — Rehearse` },
	{
		name: "description",
		content: description
	},
	{
		property: "og:title",
		content: `${title} — Rehearse`
	},
	{
		property: "og:description",
		content: description
	}
] });
//#endregion
export { meta as n, InfoPage as t };
