/**
 * Pricing config. Rates are PLACEHOLDERS — replace with live FX or
 * per-currency price IDs from your payment provider.
 */
export type Currency = "USD" | "NGN" | "GBP" | "EUR";

export const currencies: Record<Currency, { symbol: string; rate: number; round: number }> = {
  USD: { symbol: "$", rate: 1, round: 1 },
  NGN: { symbol: "₦", rate: 1550, round: 100 },
  GBP: { symbol: "£", rate: 0.79, round: 1 },
  EUR: { symbol: "€", rate: 0.92, round: 1 },
};

export function formatPrice(usd: number, c: Currency) {
  const { symbol, rate, round } = currencies[c];
  if (usd === 0) return `${symbol}0`;
  const v = Math.round((usd * rate) / round) * round;
  return `${symbol}${v.toLocaleString("en-US")}`;
}

export const plans = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    yearly: 0,
    blurb: "Try a few text sessions and see your first scorecard.",
    features: ["2 text interview sessions", "Basic scorecard", "Question bank access"],
    cta: "Start free",
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 19,
    yearly: 15,
    blurb: "Everything you need to walk in ready.",
    features: [
      "Unlimited text, audio and video sessions",
      "Full feedback and model answers",
      "Progress tracking and daily plan",
      "Questions tailored to your CV and job",
    ],
    cta: "Go Pro",
    recommended: true,
  },
  {
    id: "premium",
    name: "Premium",
    monthly: 39,
    yearly: 31,
    blurb: "For high-stakes interviews and career changers.",
    features: ["Everything in Pro", "Resume review", "Priority speech quality", "Custom interview packs"],
    cta: "Go Premium",
  },
] as const;

export const comparison: { label: string; values: [string | boolean, string | boolean, string | boolean] }[] = [
  { label: "Text sessions", values: ["2", "Unlimited", "Unlimited"] },
  { label: "Audio and video sessions", values: [false, true, true] },
  { label: "Full feedback and model answers", values: [false, true, true] },
  { label: "Progress tracking", values: [false, true, true] },
  { label: "CV and job tailoring", values: [false, true, true] },
  { label: "Resume review", values: [false, false, true] },
  { label: "Custom interview packs", values: [false, false, true] },
];
