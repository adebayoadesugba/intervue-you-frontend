import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react, s as Slot } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { d as cn } from "./primitives-CX4YN4ZH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DrTf7ZtB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
			pill: "rounded-full bg-primary text-primary-foreground hover:shadow-glow",
			pillGhost: "rounded-full border border-border bg-card/60 text-foreground hover:bg-accent"
		},
		size: {
			default: "h-11 px-5",
			sm: "h-9 rounded-md px-3 text-xs",
			lg: "h-12 px-7 text-[15px]",
			icon: "h-11 w-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { Button as t };
