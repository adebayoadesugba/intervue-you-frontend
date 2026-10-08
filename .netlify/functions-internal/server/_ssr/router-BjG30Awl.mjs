import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRouteWithContext, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as faqs, g as themeInitScript } from "./primitives-CX4YN4ZH.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as meta } from "./info-page-CH5pXgvb.mjs";
import { t as Route$13 } from "./interview._id-DKlBqoDy.mjs";
import { t as Route$14 } from "./results._id-C3PgbM16.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BjG30Awl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D-uLBsd_.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display-serif text-7xl text-primary",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-2xl font-semibold text-foreground",
					children: "This question isn't in our bank"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground",
						children: "Back to home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#000000"
			},
			{ title: "Rehearse — AI mock interviews" },
			{
				name: "description",
				content: "Practise interviews by text, voice or video with an AI interviewer."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		],
		scripts: [{ children: themeInitScript }]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" })]
	});
}
var $$splitComponentImporter$11 = () => import("./routes-BNgr_Kg2.mjs");
var title = "Rehearse — AI mock interviews by text, voice or video";
var description = "Practise interviews with an AI that listens, follows up and scores you. Tailored to your CV and the job, with a daily improvement plan.";
var Route$11 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./about-BOBr2FV0.mjs");
var Route$10 = createFileRoute("/about")({
	head: () => meta("About", "Why we built Rehearse: honest, private interview practice for everyone."),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./contact-DEcX3M5i.mjs");
var Route$9 = createFileRoute("/contact")({
	head: () => meta("Contact", "Get in touch with the Rehearse team for support, billing or partnerships."),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./cookies-3m5WOFCN.mjs");
var Route$8 = createFileRoute("/cookies")({
	head: () => meta("Cookie Policy", "The small set of cookies and local storage Rehearse uses."),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./dashboard-DVq_2nJQ.mjs");
var Route$7 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "Dashboard — Rehearse" },
		{
			name: "description",
			content: "Your interview readiness, skill scores and recent practice sessions."
		},
		{
			property: "og:title",
			content: "Dashboard — Rehearse"
		},
		{
			property: "og:description",
			content: "Track your interview readiness over time."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./forgot-password-Dd0IZi1W.mjs");
var Route$6 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [
		{ title: "Reset your password — Rehearse" },
		{
			name: "description",
			content: "Get a link to reset your Rehearse password."
		},
		{
			property: "og:title",
			content: "Reset your password — Rehearse"
		},
		{
			property: "og:description",
			content: "We'll email you a secure reset link."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./login-CB5QXLqD.mjs");
var Route$5 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Log in — Rehearse" },
		{
			name: "description",
			content: "Log in to Rehearse to continue practising interviews and track your readiness."
		},
		{
			property: "og:title",
			content: "Log in — Rehearse"
		},
		{
			property: "og:description",
			content: "Pick up where you left off with your AI mock interviews."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./onboarding-CgN06X_t.mjs");
var Route$4 = createFileRoute("/onboarding")({
	head: () => ({ meta: [
		{ title: "Set up your practice — Rehearse" },
		{
			name: "description",
			content: "Tell Rehearse the role you're going for so your interviews match it."
		},
		{
			property: "og:title",
			content: "Set up your practice — Rehearse"
		},
		{
			property: "og:description",
			content: "Three quick questions and you're ready to practise."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./privacy-CIXMnesB.mjs");
var Route$3 = createFileRoute("/privacy")({
	head: () => meta("Privacy Policy", "How Rehearse handles your answers, recordings and personal data."),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./signup-UuvXvXtP.mjs");
var Route$2 = createFileRoute("/signup")({
	head: () => ({ meta: [
		{ title: "Create your account — Rehearse" },
		{
			name: "description",
			content: "Sign up free and start practising interviews with an AI that listens and scores you."
		},
		{
			property: "og:title",
			content: "Create your account — Rehearse"
		},
		{
			property: "og:description",
			content: "Two free text sessions. No card needed."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./terms-q8UIRmOy.mjs");
var Route$1 = createFileRoute("/terms")({
	head: () => meta("Terms of Service", "The terms that apply when you use Rehearse for interview practice."),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./interview.new-CyUhglZp.mjs");
var Route = createFileRoute("/interview/new")({
	head: () => ({ meta: [
		{ title: "New interview — Rehearse" },
		{
			name: "description",
			content: "Choose your role, interview mode and length, then check your mic and camera."
		},
		{
			property: "og:title",
			content: "New interview — Rehearse"
		},
		{
			property: "og:description",
			content: "Set up a mock interview in seconds."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$11.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$12
	}),
	AboutRoute: Route$10.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$12
	}),
	ContactRoute: Route$9.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$12
	}),
	CookiesRoute: Route$8.update({
		id: "/cookies",
		path: "/cookies",
		getParentRoute: () => Route$12
	}),
	DashboardRoute: Route$7.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$12
	}),
	ForgotPasswordRoute: Route$6.update({
		id: "/forgot-password",
		path: "/forgot-password",
		getParentRoute: () => Route$12
	}),
	LoginRoute: Route$5.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$12
	}),
	OnboardingRoute: Route$4.update({
		id: "/onboarding",
		path: "/onboarding",
		getParentRoute: () => Route$12
	}),
	PrivacyRoute: Route$3.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$12
	}),
	SignupRoute: Route$2.update({
		id: "/signup",
		path: "/signup",
		getParentRoute: () => Route$12
	}),
	TermsRoute: Route$1.update({
		id: "/terms",
		path: "/terms",
		getParentRoute: () => Route$12
	}),
	InterviewIdRoute: Route$13.update({
		id: "/interview/$id",
		path: "/interview/$id",
		getParentRoute: () => Route$12
	}),
	InterviewNewRoute: Route.update({
		id: "/interview/new",
		path: "/interview/new",
		getParentRoute: () => Route$12
	}),
	ResultsIdRoute: Route$14.update({
		id: "/results/$id",
		path: "/results/$id",
		getParentRoute: () => Route$12
	})
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
