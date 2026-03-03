import type { SkeletonData, SkeletonMeta } from "./types";

export const SKELETON_C_META: SkeletonMeta = {
  id: "skeleton-c",
  name: "Hero + Comparison + CTA",
  description: "Landing page vs concurrence : Hero + Comparison table + CTA",
  sections: ["hero", "comparison", "cta"],
  bestFor: ["vs-competitors", "differentiation", "b2b"],
  complexity: "complex",
};

interface SkeletonCProps {
  data: SkeletonData;
  tokens: any;
}

export function SkeletonC({ data, tokens }: SkeletonCProps) {
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

      {/* Comparison */}
      {data.comparison && (
        <section>
          <h2>How We Compare</h2>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>{data.comparison.ourProduct}</th>
                {data.comparison.competitors.map((competitor, idx) => (
                  <th key={idx}>{competitor}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.comparison.features.map((feature, idx) => (
                <tr key={idx}>
                  <td>{feature.name}</td>
                  <td>{feature.our_product ? "✓" : "✗"}</td>
                  {feature.competitors.map((has, idx) => (
                    <td key={idx}>{has ? "✓" : "✗"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
