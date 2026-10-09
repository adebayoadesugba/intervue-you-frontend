import { SiteLayout } from "./site-chrome";
import { Eyebrow, Orbs } from "./primitives";

export function InfoPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: { h: string; p: string }[] }) {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden pb-8 pt-16 sm:pt-24">
        <Orbs />
        <div className="container-x max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-4xl font-semibold sm:text-6xl">{title}</h1>
          <p className="mt-6 text-lg text-muted-foreground">{intro}</p>
        </div>
      </section>
      <div className="container-x max-w-3xl space-y-10 py-10">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-xl font-semibold">{s.h}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{s.p}</p>
          </section>
        ))}
        <p className="text-sm text-muted-foreground">Last updated 1 October 2026.</p>
      </div>
    </SiteLayout>
  );
}

export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} —  Intervue You` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} —  Intervue You` },
    { property: "og:description", content: description },
  ],
});
