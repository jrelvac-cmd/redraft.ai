import type { SkeletonData, SkeletonMeta } from "./types";

export const SKELETON_A_META: SkeletonMeta = {
  id: "skeleton-a",
  name: "Hero + Features (Simple)",
  description: "Landing page simple : Hero + Features grid + CTA",
  sections: ["hero", "features", "cta"],
  bestFor: ["product-focused", "simple", "b2b-tools"],
  complexity: "simple",
};

interface SkeletonAProps {
  data: SkeletonData;
  tokens: any;
}

export function SkeletonA({ data, tokens }: SkeletonAProps) {
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

      {/* Features */}
      {data.features && data.features.length > 0 && (
        <section>
          <h2>Features</h2>
          <div>
            {data.features.map((feature, idx) => (
              <div key={idx}>
                <div>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
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
