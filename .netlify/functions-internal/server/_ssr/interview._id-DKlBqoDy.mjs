import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/interview._id-DKlBqoDy.js
var $$splitComponentImporter = () => import("./interview._id-DkAYFY8o.mjs");
var Route = createFileRoute("/interview/$id")({
	head: () => ({ meta: [
		{ title: "Interview in progress — Rehearse" },
		{
			name: "description",
			content: "Your live mock interview with the Rehearse AI interviewer."
		},
		{
			property: "og:title",
			content: "Interview in progress — Rehearse"
		},
		{
			property: "og:description",
			content: "Live AI mock interview."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
