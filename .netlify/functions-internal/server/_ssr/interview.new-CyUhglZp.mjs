import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as CircleX, O as CircleCheck, g as MessageSquare, m as Mic, r as Video } from "../_libs/lucide-react.mjs";
import { u as Waveform } from "./primitives-CX4YN4ZH.mjs";
import { t as Button } from "./button-DrTf7ZtB.mjs";
import { n as Chip, t as AppShell } from "./app-shell-B1Rrecic.mjs";
import { n as profileStore, t as interviewService } from "./interview-DWUVa8mw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/interview.new-CyUhglZp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MODES = [
	{
		v: "text",
		label: "Text",
		icon: MessageSquare,
		desc: "Type your answers"
	},
	{
		v: "audio",
		label: "Audio",
		icon: Mic,
		desc: "Speak with the AI"
	},
	{
		v: "video",
		label: "Video",
		icon: Video,
		desc: "Face to face"
	}
];
function NewInterview() {
	const nav = useNavigate();
	const [role, setRole] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("text");
	const [minutes, setMinutes] = (0, import_react.useState)(10);
	const [dev, setDev] = (0, import_react.useState)("idle");
	const videoRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setRole(profileStore.get()?.role ?? "Software engineer");
	}, []);
	(0, import_react.useEffect)(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), []);
	(0, import_react.useEffect)(() => {
		setDev("idle");
		streamRef.current?.getTracks().forEach((t) => t.stop());
		streamRef.current = null;
	}, [mode]);
	const check = async () => {
		try {
			const s = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: mode === "video"
			});
			streamRef.current = s;
			if (videoRef.current) videoRef.current.srcObject = s;
			setDev("ok");
		} catch {
			setDev("fail");
		}
	};
	const start = () => {
		streamRef.current?.getTracks().forEach((t) => t.stop());
		const s = interviewService.create(role.trim() || "General", mode, minutes);
		nav({
			to: "/interview/$id",
			params: { id: s.id }
		});
	};
	const ready = mode === "text" || dev === "ok";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold",
				children: "New interview"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "role",
					className: "text-sm font-medium",
					children: "Role"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "role",
					value: role,
					onChange: (e) => setRole(e.target.value),
					className: "h-12 w-full rounded-xl border border-input bg-card px-4 outline-none focus:border-primary"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Mode"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: MODES.map(({ v, label, icon: I, desc }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMode(v),
						"aria-pressed": mode === v,
						className: `rounded-2xl border p-4 text-left transition-colors ${mode === v ? "border-primary bg-primary/10" : "border-border bg-card hover:bg-accent"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "h-5 w-5 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium",
								children: label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: desc
							})
						]
					}, v))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Length"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						5,
						10,
						15,
						30
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: minutes === m,
						onClick: () => setMinutes(m),
						children: [m, " min"]
					}, m))
				})]
			}),
			mode !== "text" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-card space-y-4 rounded-3xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Device check"
					}),
					mode === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: videoRef,
						autoPlay: true,
						muted: true,
						playsInline: true,
						className: "aspect-video w-full rounded-2xl bg-muted object-cover"
					}),
					dev === "ok" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-sm text-success",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
							"Devices ready",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform, { bars: 16 })
						]
					}),
					dev === "fail" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-sm text-destructive",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }),
							"We couldn't access your ",
							mode === "video" ? "camera or microphone" : "microphone",
							". Allow access in your browser, or switch to Text."
						]
					}),
					dev !== "ok" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "pillGhost",
						onClick: check,
						children: ["Check ", mode === "video" ? "camera & mic" : "microphone"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "pill",
				size: "lg",
				className: "w-full",
				disabled: !ready,
				onClick: start,
				children: "Start interview"
			})
		]
	}) });
}
//#endregion
export { NewInterview as component };
