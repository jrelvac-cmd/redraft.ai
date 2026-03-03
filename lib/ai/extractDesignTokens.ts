import type { DesignTokens } from "@/types";

const tailwindColorMap: Record<string, string> = {
  "slate-900": "#0f172a",
  "slate-800": "#1e293b",
  "slate-700": "#334155",
  "slate-600": "#475569",
  "slate-500": "#64748b",
  "slate-400": "#94a3b8",
  "slate-300": "#cbd5e1",
  "slate-200": "#e2e8f0",
  "slate-100": "#f1f5f9",
  "slate-50": "#f8fafc",
  "white": "#ffffff",
  "black": "#000000",
  "blue-600": "#2563eb",
  "blue-700": "#1d4fe0",
  "blue-500": "#3b82f6",
  "blue-50": "#eff6ff",
  "gray-900": "#111827",
  "gray-800": "#1f2937",
  "gray-700": "#374151",
  "gray-600": "#4b5563",
  "gray-500": "#6b7280",
  "gray-400": "#9ca3af",
  "gray-300": "#d1d5db",
  "gray-200": "#e5e7eb",
  "gray-100": "#f3f4f6",
  "gray-50": "#f9fafb",
  "purple-600": "#7c3aed",
  "purple-50": "#faf5ff",
  "emerald-50": "#f0fdf4",
  "red-600": "#dc2626",
  "amber-500": "#f59e0b",
  "green-600": "#16a34a",
};

function resolveTailwindColor(colorClass: string): string {
  const match = colorClass.match(/(?:bg|text|border)-(.+?)(?:\s|$)/);
  if (match) {
    const colorName = match[1];
    return tailwindColorMap[colorName] || "#000000";
  }
  return "#000000";
}

function extractColorsFromClasses(classes: string[]): Record<string, string> {
  const colors: Record<string, string> = {};

  classes.forEach((className) => {
    if (className.includes("bg-slate-900") || className.includes("bg-gray-900")) {
      colors.background = tailwindColorMap["slate-900"];
    }
    if (className.includes("text-white")) {
      colors.text = tailwindColorMap["white"];
    }
    if (className.includes("bg-blue-600")) {
      colors.primary = tailwindColorMap["blue-600"];
    }
    if (className.includes("text-blue-")) {
      colors.accent = resolveTailwindColor(className);
    }
  });

  return colors;
}

export function extractDesignTokens(
  heroStyle: string,
  inputData?: Record<string, any>
): DesignTokens {
  let tokens: DesignTokens = getDefaultTokens();

  if (heroStyle.toLowerCase().includes("dark")) {
    tokens = getDarkTokens();
  } else if (heroStyle.toLowerCase().includes("gradient")) {
    tokens = getGradientTokens();
  } else if (heroStyle.toLowerCase().includes("minimal")) {
    tokens = getMinimalTokens();
  } else if (heroStyle.toLowerCase().includes("playful")) {
    tokens = getPlayfulTokens();
  }

  if (inputData?.image_analysis?.dominant_colors?.length > 0) {
    const imageAnalysis = inputData?.image_analysis;
    if (imageAnalysis?.dominant_colors) {
      tokens.colors.primary = imageAnalysis.dominant_colors[0];
      if (imageAnalysis.dominant_colors[1]) {
        tokens.colors.secondary = imageAnalysis.dominant_colors[1];
      }
    }
  }

  return tokens;
}

function getDefaultTokens(): DesignTokens {
  return {
    colors: {
      primary: "#2563eb",
      secondary: "#60a5fa",
      accent: "#2563eb",
      background: "#ffffff",
      text: "#1f2937",
      muted: "#f3f4f6",
      border: "#e5e7eb",
      success: "#16a34a",
      warning: "#f59e0b",
      error: "#dc2626",
    },
    typography: {
      h1: "text-5xl md:text-7xl font-bold tracking-tight",
      h2: "text-4xl md:text-5xl font-bold",
      h3: "text-2xl md:text-3xl font-semibold",
      body: "text-base md:text-lg text-gray-600",
      small: "text-sm text-gray-500",
      fontFamily: "Inter",
      fontWeights: {
        regular: 400,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      gap: "24px",
      padding: "32px",
    },
    effects: {
      shadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      shadowHover: "0 20px 40px rgba(0, 0, 0, 0.15)",
      borderRadius: "12px",
      transition: "all 0.3s ease",
    },
    heroStyle: "default",
    layout: "centered",
  };
}

function getDarkTokens(): DesignTokens {
  return {
    colors: {
      primary: "#60a5fa",
      secondary: "#93c5fd",
      accent: "#60a5fa",
      background: "#0f172a",
      text: "#f1f5f9",
      muted: "#1e293b",
      border: "#334155",
      success: "#34d399",
      warning: "#fbbf24",
      error: "#f87171",
    },
    typography: {
      h1: "text-5xl md:text-7xl font-bold tracking-tight",
      h2: "text-4xl md:text-5xl font-bold",
      h3: "text-2xl md:text-3xl font-semibold",
      body: "text-base md:text-lg text-slate-300",
      small: "text-sm text-slate-400",
      fontFamily: "Inter",
      fontWeights: {
        regular: 400,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      gap: "28px",
      padding: "40px",
    },
    effects: {
      shadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
      shadowHover: "0 20px 60px rgba(0, 0, 0, 0.7)",
      borderRadius: "16px",
      transition: "all 0.3s ease",
    },
    heroStyle: "dark",
    layout: "centered",
  };
}

function getGradientTokens(): DesignTokens {
  return {
    colors: {
      primary: "#7c3aed",
      secondary: "#a78bfa",
      accent: "#7c3aed",
      background: "#ffffff",
      text: "#1f2937",
      muted: "#f5f3ff",
      border: "#e9d5ff",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
    },
    typography: {
      h1: "text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
      h2: "text-4xl md:text-5xl font-bold",
      h3: "text-2xl md:text-3xl font-semibold",
      body: "text-base md:text-lg text-gray-600",
      small: "text-sm text-gray-500",
      fontFamily: "Inter",
      fontWeights: {
        regular: 400,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      gap: "24px",
      padding: "32px",
    },
    effects: {
      shadow: "0 10px 35px rgba(124, 58, 237, 0.2)",
      shadowHover: "0 20px 50px rgba(124, 58, 237, 0.3)",
      borderRadius: "14px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    heroStyle: "gradient",
    layout: "centered",
  };
}

function getMinimalTokens(): DesignTokens {
  return {
    colors: {
      primary: "#1f2937",
      secondary: "#6b7280",
      accent: "#000000",
      background: "#ffffff",
      text: "#111827",
      muted: "#f9fafb",
      border: "#f3f4f6",
      success: "#059669",
      warning: "#d97706",
      error: "#dc2626",
    },
    typography: {
      h1: "text-6xl md:text-8xl font-bold tracking-tight",
      h2: "text-4xl md:text-5xl font-bold",
      h3: "text-2xl font-semibold",
      body: "text-base text-gray-700",
      small: "text-sm text-gray-600",
      fontFamily: "Inter",
      fontWeights: {
        regular: 400,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "20px",
      xl: "28px",
      gap: "20px",
      padding: "28px",
    },
    effects: {
      shadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      shadowHover: "0 8px 20px rgba(0, 0, 0, 0.12)",
      borderRadius: "8px",
      transition: "all 0.2s ease",
    },
    heroStyle: "minimal",
    layout: "split",
  };
}

function getPlayfulTokens(): DesignTokens {
  return {
    colors: {
      primary: "#ec4899",
      secondary: "#f472b6",
      accent: "#ec4899",
      background: "#fdf2f8",
      text: "#1f2937",
      muted: "#fce7f3",
      border: "#fbcfe8",
      success: "#059669",
      warning: "#f59e0b",
      error: "#dc2626",
    },
    typography: {
      h1: "text-5xl md:text-7xl font-bold tracking-tight",
      h2: "text-4xl md:text-5xl font-bold",
      h3: "text-2xl md:text-3xl font-semibold",
      body: "text-base md:text-lg text-gray-700",
      small: "text-sm text-gray-600",
      fontFamily: "Inter",
      fontWeights: {
        regular: 400,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      gap: "24px",
      padding: "32px",
    },
    effects: {
      shadow: "0 10px 30px rgba(236, 72, 153, 0.15)",
      shadowHover: "0 15px 40px rgba(236, 72, 153, 0.25)",
      borderRadius: "20px",
      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
    heroStyle: "playful",
    layout: "centered",
  };
}
