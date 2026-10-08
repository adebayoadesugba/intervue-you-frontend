import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/rehearse/site-chrome";
import { Hero, FeatureStrip, HowItWorks } from "@/components/rehearse/landing-top";
import { SampleSession, ProgressSection, SkillShowcase } from "@/components/rehearse/landing-mid";
import { Reviews, Pricing, FAQ, FinalCTA } from "@/components/rehearse/landing-bottom";
import { faqs } from "@/data/marketing";

const title = "Rehearse — AI mock interviews by text, voice or video";
const description = "Practise interviews with an AI that listens, follows up and scores you. Tailored to your CV and the job, with a daily improvement plan.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <FeatureStrip />
      <HowItWorks />
      <SampleSession />
      <ProgressSection />
      <SkillShowcase />
      <Reviews />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </SiteLayout>
  );
}
