export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  credits: number;
  subscription_status: "free" | "pro" | "cancelled";
  subscription_id?: string;
  affiliate_code?: string;
  referred_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  status: "draft" | "preview" | "unlocked" | "published";
  input_data?: Record<string, any>;
  ai_data?: AIGeneratedData;
  code_data?: Record<string, any>;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AIGeneratedData {
  meta: {
    title: string;
    description: string;
    og_title: string;
    og_description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta_primary: string;
    cta_secondary: string;
    badge?: string;
  };
  features: Feature[];
  pain_points: PainPoint[];
  social_proof: Testimonial[];
  faq: FAQ[];
  cta_section: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  footer: {
    tagline: string;
    legal: string;
    rgpd_placeholder: string;
  };
  trust_badges: string[];
  ai_critique: string[];
  version?: number;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface PainPoint {
  problem: string;
  solution: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  review: string;
  avatar_url?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Payment {
  id: string;
  user_id: string;
  project_id?: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  payment_type: "unlock" | "subscription";
  lemon_squeezy_order_id?: string;
  created_at: string;
}

export interface Asset {
  id: string;
  project_id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  public_url: string;
  created_at: string;
}

export interface DetectedInfo {
  productName?: string;
  objective?: "email" | "sell" | "demo" | "inform";
  marketingAngle?: "time" | "money" | "status" | "simplicity" | "security" | "fun";
  competitors?: string[];
  targetAudience?: string;
  suggestedFramework?: string;
  hasImages?: boolean;
}

export interface ImageAnalysis {
  dominant_colors: string[];
  style: string;
  detected_type: "screenshot" | "mockup" | "logo" | "other";
  layout_notes: string;
}

export interface GeneratedCode {
  files: CodeFile[];
  preview_url?: string;
}

export interface CodeFile {
  path: string;
  content: string;
  language: string;
}

export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
    border: string;
    success?: string;
    warning?: string;
    error?: string;
  };
  typography: {
    h1: string;
    h2: string;
    h3: string;
    body: string;
    small: string;
    fontFamily?: string;
    fontWeights?: {
      regular: number;
      semibold: number;
      bold: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    gap: string;
    padding: string;
  };
  effects: {
    shadow: string;
    shadowHover?: string;
    borderRadius: string;
    transition?: string;
  };
  heroStyle?: string;
  layout?: string;
}
