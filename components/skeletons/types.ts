export interface SkeletonData {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta_primary: string;
    cta_secondary?: string;
    badge?: string;
  };
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  pain_points?: Array<{
    problem: string;
    solution: string;
  }>;
  social_proof?: Array<{
    name: string;
    role: string;
    company: string;
    review: string;
  }>;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  comparison?: {
    ourProduct: string;
    competitors: string[];
    features: Array<{
      name: string;
      our_product: boolean;
      competitors: boolean[];
    }>;
  };
  pricing?: Array<{
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
  }>;
  timeline?: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  cta_section: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  footer?: {
    tagline: string;
  };
  trust_badges?: string[];
}

export interface SkeletonMeta {
  id: string;
  name: string;
  description: string;
  sections: string[];
  bestFor: string[];
  complexity: 'simple' | 'medium' | 'complex';
}

export interface Skeleton {
  meta: SkeletonMeta;
  component: React.ComponentType<{ data: SkeletonData; tokens: any }>;
}
