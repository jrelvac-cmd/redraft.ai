import type { SkeletonData, SkeletonMeta } from "./types";

export const SKELETON_E_META: SkeletonMeta = {
  id: "skeleton-e",
  name: "Hero + Timeline Process",
  description: "Landing page avec processus : Hero + Timeline + CTA",
  sections: ["hero", "timeline", "cta"],
  bestFor: ["process-oriented", "education", "onboarding"],
  complexity: "simple",
};

interface SkeletonEProps {
  data: SkeletonData;
  tokens: any;
}

export function SkeletonE({ data, tokens }: SkeletonEProps) {
  return (
    <main>
      {/* Hero */}
      <section>
        <div>
          {data.hero.badge && <span>{data.hero.badge}</span>}
          <h1>{data.hero.headline}</h1>
          <p>{data.hero.subheadline}</p>
          <div>
            <button>{data.hero.cta_primary}</button>
            {data.hero.cta_secondary && (
              <button>{data.hero.cta_secondary}</button>
            )}
          </div>
        </div>
      </section>

      {/* Timeline */}
      {data.timeline && data.timeline.length > 0 && (
        <section>
          <h2>How It Works</h2>
          <div>
            {data.timeline.map((item, idx) => (
              <div key={idx}>
                <div>{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section>
        <div>
          <h2>{data.cta_section.headline}</h2>
          <p>{data.cta_section.subheadline}</p>
          <button>{data.cta_section.cta}</button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        {data.footer && <p>{data.footer.tagline}</p>}
      </footer>
    </main>
  );
}
