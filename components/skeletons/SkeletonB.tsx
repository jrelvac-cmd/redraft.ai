import type { SkeletonData, SkeletonMeta } from "./types";

export const SKELETON_B_META: SkeletonMeta = {
  id: "skeleton-b",
  name: "Hero + Features + Testimonials",
  description: "Landing page avec social proof : Hero + Features + Testimonials + CTA",
  sections: ["hero", "features", "social_proof", "cta"],
  bestFor: ["saas-conversion", "trust-focused", "marketplace"],
  complexity: "medium",
};

interface SkeletonBProps {
  data: SkeletonData;
  tokens: any;
}

export function SkeletonB({ data, tokens }: SkeletonBProps) {
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
          <h2>Key Features</h2>
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

      {/* Testimonials */}
      {data.social_proof && data.social_proof.length > 0 && (
        <section>
          <h2>What Customers Say</h2>
          <div>
            {data.social_proof.map((testimonial, idx) => (
              <div key={idx}>
                <div>★★★★★</div>
                <p>{testimonial.review}</p>
                <div>
                  <strong>{testimonial.name}</strong>
                  <p>{testimonial.role} at {testimonial.company}</p>
                </div>
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
