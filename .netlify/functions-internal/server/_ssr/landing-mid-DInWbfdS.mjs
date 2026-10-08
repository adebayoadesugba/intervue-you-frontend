import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as ArrowRight, M as Check, N as Briefcase, P as AudioLines, S as Linkedin, l as Play, m as Mic, t as Zap, u as Pause, w as FileText } from "../_libs/lucide-react.mjs";
import { _ as useInView, a as Orbs, c as SkillBar, n as CountUp, o as SKILLS, p as progressSeries, r as Eyebrow, s as ScoreRing, t as AppWindow, u as Waveform, v as useReveal } from "./primitives-CX4YN4ZH.mjs";
import { t as Button } from "./button-DrTf7ZtB.mjs";
import { t as speech } from "./speech-C4A8ENJZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/landing-mid-DInWbfdS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ANSWER = "In my last role our checkout drop-off was around forty percent, so I pulled the session data, mapped where people stalled and proposed a two-step flow to my manager".split(" ");
function YourTurnCard({ compact }) {
	const [n, setN] = (0, import_react.useState)(4);
	const [secs, setSecs] = (0, import_react.useState)(2);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setN(ANSWER.length);
			return;
		}
		const id = setInterval(() => {
			setN((x) => x >= ANSWER.length ? 4 : x + 1);
			setSecs((s) => s >= 40 ? 2 : s + 1);
		}, 380);
		return () => clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: compact ? "space-y-4" : "glass space-y-5 rounded-3xl p-5 sm:p-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-x-4 gap-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid h-14 w-14 shrink-0 place-items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-ring absolute inset-0 rounded-full bg-primary/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-6 w-6" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-semibold tracking-tight",
							children: "Your turn. Speak now"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "We stop listening when you stop talking"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs tabular-nums text-muted-foreground",
						children: [
							"0:",
							String(secs).padStart(2, "0"),
							" recorded"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
					children: "Current question"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[17px] font-medium leading-snug sm:text-lg",
					children: "Tell me about a time you had to change someone's mind."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform, {
				bars: compact ? 28 : 40,
				className: "w-full justify-center"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-h-[4.5rem] text-sm leading-relaxed text-muted-foreground",
				"aria-live": "polite",
				children: ANSWER.slice(0, n).map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: i >= n - 3 ? "word-in text-foreground" : "",
					children: [w, " "]
				}, i + "-" + w))
			})
		]
	});
}
function Hero() {
	const mock = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = mock.current;
		if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const fn = () => {
			el.style.transform = `translateY(${Math.min(window.scrollY * -.06, 0)}px)`;
		};
		window.addEventListener("scroll", fn, { passive: true });
		return () => window.removeEventListener("scroll", fn);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden pb-20 pt-14 sm:pt-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbs, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-fade-up mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-success" }), " Text, audio and video mock interviews"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "animate-fade-up mx-auto mt-6 max-w-4xl text-[2.5rem] font-semibold leading-[1.02] sm:text-6xl lg:text-7xl",
						style: { animationDelay: "80ms" },
						children: ["Practise interviews with an AI that ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display-serif text-primary",
							children: "actually listens."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "animate-fade-up mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg",
						style: { animationDelay: "160ms" },
						children: "Realistic mock interviews tailored to your CV and the exact job you want — with honest scores after every answer."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row",
						style: { animationDelay: "240ms" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "pill",
							size: "lg",
							className: "w-full sm:w-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/signup",
								children: ["Start practising free ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "pillGhost",
							size: "lg",
							className: "w-full sm:w-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								hash: "sample",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), " Watch sample session"]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-x mt-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: mock,
					className: "animate-fade-up relative mx-auto max-w-5xl will-change-transform",
					style: { animationDelay: "320ms" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/20 blur-3xl",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppWindow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 p-4 sm:p-6 md:grid-cols-[1.4fr_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YourTurnCard, { compact: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-2xl border border-border bg-surface p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRing, {
											value: 74,
											size: 84,
											label: "Readiness"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Interview readiness"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display-serif text-2xl",
												children: "Building confidence"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-success",
												children: "+9 this week"
											})
										] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 rounded-2xl border border-border bg-surface p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
											skill: "technical",
											value: 72
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
											skill: "communication",
											value: 70
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
											skill: "problemSolving",
											value: 67
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
											skill: "teamwork",
											value: 58
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-xs text-muted-foreground",
									children: "Question 3 of 6 · 0:47 left"
								})
							]
						})]
					}) })]
				})
			})
		]
	});
}
function FeatureStrip() {
	const ref = useReveal();
	const items = [
		{
			icon: FileText,
			t: "Tailored to your CV and the job",
			d: "Upload your CV and paste the listing — questions target the gaps a real interviewer would."
		},
		{
			icon: AudioLines,
			t: "Talks back with follow-up questions",
			d: "Vague answer? It digs in, just like a hiring manager who wants the real story."
		},
		{
			icon: Zap,
			t: "Scores you after every session",
			d: "Four clear skill scores, specific fixes and a model answer for every question."
		}
	];
	const U = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "underline decoration-primary decoration-2 underline-offset-[6px]",
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "features",
		ref,
		className: "scroll-mt-20 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0",
				children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal p-8",
					style: { transitionDelay: `${i * 100}ms` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "h-6 w-6 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 text-lg font-semibold",
							children: it.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: it.d
						})
					]
				}, it.t))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal mx-auto mt-20 max-w-3xl text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-2xl font-medium leading-snug tracking-tight sm:text-3xl",
					children: [
						"Live interviews are hard. You lose your train of thought, you ramble, and the best example slips your mind. Whether it's ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(U, { children: "design" }),
						", ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(U, { children: "technical" }),
						", ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(U, { children: "product" }),
						" or ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(U, { children: "behavioural" }),
						" — practising out loud makes your answers",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: " sharper, clearer and more confident."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "pill",
					size: "lg",
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						children: "Try your first interview"
					})
				})]
			})]
		})
	});
}
function HowItWorks() {
	const ref = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "how-it-works",
		ref,
		className: "scroll-mt-20 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "How it works" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl font-semibold sm:text-5xl",
					children: "Three steps to your sharpest answers."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid gap-5 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCard, {
						i: 0,
						n: "01",
						title: "Make it about your next role",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 rounded-2xl border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "h-3.5 w-3.5" }), " Job listing · imported from LinkedIn"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-4 w-4 text-primary" }), " Senior Product Designer"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Paystack · Lagos / Remote"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 rounded-xl bg-success/10 px-3 py-2 text-sm text-success",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " CV uploaded"]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCard, {
						i: 1,
						n: "02",
						title: "Answer out loud for five minutes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 rounded-2xl border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Question 3 of 6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: "0:47"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Walk me through a design decision you'd defend to an engineer."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-4 w-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform, {
											bars: 18,
											className: "h-6"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-primary",
											children: "Listening"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1 flex justify-between text-[11px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Interview readiness" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "68" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 rounded-full bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-[68%] rounded-full bg-primary" })
								})] })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCard, {
						i: 2,
						n: "03",
						title: "Know what to practise next",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 rounded-2xl border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display-serif text-xl",
									children: "Building confidence"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: ["Readiness 74 · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-success",
										children: "up 9 this week"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2 text-sm",
									children: [
										[
											"Day 1",
											"Rehearse your opening out loud",
											true
										],
										[
											"Day 2",
											"Teamwork session",
											false
										],
										[
											"Day 3",
											"Explain a difficult decision",
											false
										]
									].map(([d, t, done]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `grid h-4 w-4 shrink-0 place-items-center rounded border ${done ? "border-primary bg-primary text-primary-foreground" : "border-border"}`,
												children: done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: d
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: done ? "text-muted-foreground line-through" : "",
												children: t
											})
										]
									}, t))
								})
							]
						})
					})
				]
			})]
		})
	});
}
function StepCard({ n, title, children, i }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "reveal surface-card flex flex-col gap-6 rounded-3xl p-6",
		style: { transitionDelay: `${i * 120}ms` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm tabular-nums text-muted-foreground",
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-2 text-xl font-semibold",
			children: title
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-auto",
			children
		})]
	});
}
var QUESTION = "Tell me about a time you had to change someone's mind.";
function SampleSession() {
	const ref = useReveal();
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const timer = (0, import_react.useRef)(null);
	const stop = () => {
		speech.stop();
		if (timer.current) clearInterval(timer.current);
		setPlaying(false);
	};
	const play = () => {
		setPlaying(true);
		setProgress(0);
		const start = Date.now();
		timer.current = setInterval(() => {
			const p = Math.min(1, (Date.now() - start) / 3600);
			setProgress(p);
			if (p >= 1 && !speech.supported()) stop();
		}, 60);
		speech.speak(QUESTION, { onEnd: () => {
			setProgress(1);
			stop();
		} });
	};
	(0, import_react.useEffect)(() => () => stop(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "sample",
		ref,
		className: "scroll-mt-20 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Sample session" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl font-semibold sm:text-5xl",
					children: "Hear it. Answer it. See the score."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid gap-5 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card rounded-3xl p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
								children: "The interviewer asks"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-2xl font-medium leading-snug tracking-tight",
								children: QUESTION
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: playing ? stop : play,
									"aria-label": playing ? "Pause interviewer's voice" : "Play interviewer's voice",
									className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform active:scale-95",
									children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5 h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 overflow-hidden rounded-full bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bar-fill h-full rounded-full bg-primary",
											style: {
												transform: `scaleX(${progress})`,
												transitionDuration: "80ms"
											}
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: "Interviewer's voice · captions on"
									})]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card rounded-3xl p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
							children: "Example answer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground",
							children: "\"Our onboarding had a seven-screen setup and completion was low. My manager wanted to keep it because sales liked the data it collected. I ran five quick user calls, showed her clips of people abandoning at step four, and proposed collecting the same data later in the product. She agreed to an A/B test, and we shipped the shorter flow.\""
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal surface-card rounded-3xl p-6",
					style: { transitionDelay: "120ms" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
							children: "Example scores"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
									skill: "technical",
									value: 64
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
									skill: "communication",
									value: 78,
									highlight: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
									skill: "problemSolving",
									value: 71
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
									skill: "teamwork",
									value: 69
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 rounded-2xl border border-border bg-surface p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "What to strengthen"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: "Make the result more convincing: say how much completion improved and what your manager decided afterwards. \"We shipped it\" is an action, not a result — try \"completion rose from 38% to 61%, and she made the short flow the default.\""
							})]
						})
					]
				})]
			})]
		})
	});
}
function ProgressChart() {
	const { ref, inView } = useInView();
	const W = 560, H = 260, P = 28;
	const x = (i) => P + i * 504 / 4;
	const y = (v) => 232 - v / 100 * 204;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "surface-card rounded-3xl p-5 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground",
			children: SKILLS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${s.cls}` }), s.label]
			}, s.key))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 ${W} ${H}`,
			className: "mt-4 h-auto w-full",
			role: "img",
			"aria-label": "Skill scores rising across sessions 1 to 4, session 5 upcoming",
			children: [
				[
					0,
					25,
					50,
					75,
					100
				].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: P,
					x2: 532,
					y1: y(g),
					y2: y(g),
					stroke: "var(--border)"
				}, g)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: x(3.5),
					y: P / 2,
					width: x(4) - x(3.5) + P / 2,
					height: H - P * 1.5,
					fill: "var(--muted)",
					opacity: "0.5",
					rx: "8"
				}),
				SKILLS.map((s, si) => {
					const pts = progressSeries[s.key].map((v, i) => v == null ? null : [x(i), y(v)]).filter(Boolean);
					const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d,
						fill: "none",
						stroke: s.color,
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						pathLength: 1,
						strokeDasharray: 1,
						strokeDashoffset: inView ? 0 : 1,
						style: { transition: `stroke-dashoffset 1.4s ${si * .15}s cubic-bezier(.2,.7,.2,1)` }
					}), pts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: p[0],
						cy: p[1],
						r: "3.5",
						fill: s.color,
						opacity: inView ? 1 : 0,
						style: { transition: `opacity .4s ${.8 + si * .15}s` }
					}, i))] }, s.key);
				}),
				[
					1,
					2,
					3,
					4,
					5
				].map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
					x: x(i),
					y: 254,
					textAnchor: "middle",
					fontSize: "11",
					fill: "var(--muted-foreground)",
					children: ["Session ", n]
				}, n))
			]
		})]
	});
}
function CandidateCard({ pct = 74, status = "Building confidence", change = "+27 across five sessions", footer = "Interview in 7 days · Session 4 of 5", scores = [
	72,
	70,
	67,
	58
] }) {
	const { ref, inView } = useInView();
	const best = scores.indexOf(Math.max(...scores));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "glass rounded-[2rem] p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary",
					children: "AO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Amara Obi"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Product Designer · Flutterwave"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-6xl font-semibold tabular-nums tracking-tighter",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
					to: pct,
					start: inView
				}), "%"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display-serif text-2xl",
				children: status
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-success",
				children: change
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-3",
				children: SKILLS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
					skill: s.key,
					value: scores[i] ?? 0,
					highlight: i === best,
					compact: true
				}, s.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 border-t border-border pt-4 text-xs text-muted-foreground",
				children: footer
			})
		]
	});
}
function ProgressSection() {
	const ref = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative isolate overflow-hidden py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbs, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Progress tracking" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-4xl font-semibold sm:text-5xl",
						children: "Know what to work on before interview day"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid items-center gap-6 lg:grid-cols-[1.6fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "reveal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressChart, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "reveal animate-float mx-auto w-full max-w-sm",
						style: { transitionDelay: "150ms" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandidateCard, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "reveal mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "pill",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signup",
							children: "Get started"
						})
					})
				})
			]
		})]
	});
}
function SkillShowcase() {
	const ref = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref,
		className: "py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x grid gap-5 lg:grid-cols-[1fr_1fr_1.4fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal surface-card rounded-3xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "After your first session"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
								skill: "technical",
								value: 56
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
								skill: "communication",
								value: 54
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
								skill: "problemSolving",
								value: 45
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
								skill: "teamwork",
								value: 25
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "reveal",
					style: { transitionDelay: "100ms" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandidateCard, {
						pct: 47,
						status: "Getting closer",
						change: "+9 since 31 Aug",
						footer: "Scored across 1 session",
						scores: [
							56,
							54,
							45,
							25
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "reveal",
					style: { transitionDelay: "200ms" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YourTurnCard, {})
				})
			]
		})
	});
}
//#endregion
export { ProgressSection as a, HowItWorks as i, FeatureStrip as n, SampleSession as o, Hero as r, SkillShowcase as s, CandidateCard as t };
