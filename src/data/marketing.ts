import r1 from "@/assets/review-1.jpg";
import r2 from "@/assets/review-2.jpg";
import r3 from "@/assets/review-3.jpg";
import r4 from "@/assets/review-4.jpg";
import r5 from "@/assets/review-5.jpg";

export const SKILLS = [
  { key: "technical", label: "Technical", color: "var(--technical)", cls: "bg-technical" },
  { key: "communication", label: "Communication", color: "var(--communication)", cls: "bg-communication" },
  { key: "problemSolving", label: "Problem solving", color: "var(--problem)", cls: "bg-problem" },
  { key: "teamwork", label: "Teamwork", color: "var(--teamwork)", cls: "bg-teamwork" },
] as const;

export type SkillKey = (typeof SKILLS)[number]["key"];

export const progressSeries: Record<SkillKey, (number | null)[]> = {
  technical: [56, 61, 66, 72, null],
  communication: [54, 58, 63, 70, null],
  problemSolving: [45, 52, 60, 67, null],
  teamwork: [25, 36, 48, 58, null],
};

export const reviews = [
  { quote: "I used to ramble through system design questions. After a week of audio sessions I could explain trade-offs in two minutes flat — and I got the offer.", name: "Tolu Adeyemi", role: "Backend engineer, now at a Lagos fintech", img: r1 },
  { quote: "The follow-up questions felt uncomfortably real. It caught me hand-waving the impact of my portfolio projects, which is exactly what my panel did.", name: "Daniel Moreau", role: "Senior product designer", img: r2 },
  { quote: "The STAR check changed how I tell stories. My results used to be vague; now every answer ends with a number and a decision.", name: "Priya Raman", role: "Product manager", img: r3 },
  { quote: "As a graduate I had nothing to compare against. Seeing my readiness move from 41 to 78 gave me confidence I couldn't fake.", name: "Sam Okafor", role: "Graduate analyst", img: r4 },
  { quote: "I practised remote video interviews at 6am before my kids woke up. Coming back after eight years out, that privacy mattered.", name: "Helena Ruiz", role: "Remote customer success lead", img: r5 },
];

export const faqs = [
  { q: "How do I get started?", a: "Create a free account, tell us the role you're going for, and optionally upload your CV and the job listing. Your first interview starts in under two minutes — no card required." },
  { q: "Do I speak or type my answers?", a: "Either. Choose text chat, an audio conversation, or a face-to-face video interview. You can even switch mode mid-interview if you're somewhere you can't talk." },
  { q: "How long is a practice session?", a: "You pick: 5, 10, 15 or 30 minutes, or a fixed number of questions. Most people start with a 10-minute session of five or six questions." },
  { q: "What makes Rehearse useful for interview preparation?", a: "It asks questions based on your CV and the job, follows up when your answer is vague, and scores you on technical depth, communication, problem solving and teamwork — then turns that into a daily plan." },
  { q: "Which roles can I practise for?", a: "Engineering, design, product, data, marketing, sales, finance, healthcare, teaching, civil service and graduate programmes, customer-facing roles, and any custom role you describe." },
  { q: "How will I know what to improve?", a: "Every session ends with a scorecard, question-by-question feedback, an improved sample answer, a STAR-method check and speech analytics like pace and filler words." },
  { q: "Is my practice private?", a: "Yes. Recordings are off by default, video stays on your device, and you can delete everything in one click. Your answers are processed by an AI provider to generate feedback and are never shared with employers." },
  { q: "Can I use video?", a: "Yes, on Pro and Premium. You'll see an animated AI interviewer and your own self-view, with optional tips on eye contact and posture." },
  { q: "Does it work on my phone?", a: "Yes. Rehearse is designed for phones as small as 320px and works in any modern mobile browser. You can also install it to your home screen." },
  { q: "How does billing and cancelling work?", a: "Pay monthly or yearly in USD, NGN, GBP or EUR. Cancel anytime from Settings — you keep access until the end of your billing period." },
];
