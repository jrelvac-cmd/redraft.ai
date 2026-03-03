import type { SkeletonData, SkeletonMeta } from "./types";

export const SKELETON_F_META: SkeletonMeta = {
  id: "skeleton-f",
  name: "Hero + Features + Pricing",
  description: "Landing page avec pricing : Hero + Features + Pricing table + CTA",
  sections: ["hero", "features", "pricing", "cta"],
  bestFor: ["saas-monetized", "pricing-focus", "b2b-tools"],
  complexity: "complex",
};

interface SkeletonFProps {
  data: SkeletonData;
  tokens: any;
}

export function SkeletonF({ data, tokens }: SkeletonFProps) {
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

      {/* Pricing */}
      {data.pricing && data.pricing.length > 0 && (
        <section>
          <h2>Simple, Transparent Pricing</h2>
          <div>
            {data.pricing.map((plan, idx) => (
              <div key={idx}>
                <h3>{plan.name}</h3>
                <div>
                  <span>{plan.price}</span>
                  <span>/month</span>
                </div>
                <p>{plan.description}</p>
                <ul>
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx}>{feature}</li>
                  ))}
                </ul>
                <button>{plan.cta}</button>
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
