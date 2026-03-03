import type { SkeletonData, SkeletonMeta } from "./types";

export const SKELETON_D_META: SkeletonMeta = {
  id: "skeleton-d",
  name: "Hero + Stats + Features",
  description: "Landing page avec métriques : Hero + Stats + Features + CTA",
  sections: ["hero", "stats", "features", "cta"],
  bestFor: ["metrics-driven", "performance-focused", "analytics"],
  complexity: "medium",
};

interface SkeletonDProps {
  data: SkeletonData;
  tokens: any;
}

export function SkeletonD({ data, tokens }: SkeletonDProps) {
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

      {/* Stats */}
      {data.stats && data.stats.length > 0 && (
        <section>
          <div>
            {data.stats.map((stat, idx) => (
              <div key={idx}>
                <div>{stat.value}</div>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      {data.features && data.features.length > 0 && (
        <section>
          <h2>Why Choose Us</h2>
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
