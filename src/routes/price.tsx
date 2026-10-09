import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/intervue-you/site-chrome";
import { Pricing } from "@/components/intervue-you/landing-bottom";

const title = "Pricing — Intervue You";
const description = "Choose the right plan to practice your interviews with our AI.";

export const Route = createFileRoute("/price")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteLayout>
      {/* Added some padding-top to account for the header since it's now at the top of the page */}
      <main className="pt-1 pb-16 min-h-screen">
        <Pricing />
      </main>
    </SiteLayout>
  );
}