import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function analyzeImageWithGPT4o(
  imageUrl: string
): Promise<{
  dominant_colors: string[];
  style: string;
  detected_type: "screenshot" | "mockup" | "logo" | "other";
  layout_notes: string;
}> {
  const systemPrompt = `Analyze this image and extract:
1. Dominant colors (hex codes, 3-5 colors)
2. Visual style (e.g., "dark-premium", "light-minimal", "colorful-saas", "neon-tech")
3. Type of image (screenshot, mockup, logo, other)
4. Layout notes if it's a screenshot (navigation position, hero style, etc.)

Respond ONLY with valid JSON following this schema:
{
  "dominant_colors": ["#hex1", "#hex2", "#hex3"],
  "style": "string",
  "detected_type": "screenshot | mockup | logo | other",
  "layout_notes": "string"
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
              detail: "high",
            },
          },
        ],
      },
    ],
    max_tokens: 500,
    temperature: 0.3,
  });

  const content = response.choices[0]?.message?.content || "{}";
  
  try {
    return JSON.parse(content);
  } catch {
    return {
      dominant_colors: ["#3B82F6", "#8B5CF6", "#EC4899"],
      style: "colorful-saas",
      detected_type: "other",
      layout_notes: "Unable to analyze image",
    };
  }
}

export async function analyzeMultipleImages(
  imageUrls: string[]
): Promise<{
  dominant_colors: string[];
  style: string;
  detected_type: string;
  layout_notes: string;
}> {
  const analyses = await Promise.all(
    imageUrls.map((url) => analyzeImageWithGPT4o(url))
  );

  const allColors = analyses.flatMap((a) => a.dominant_colors);
  const uniqueColors = Array.from(new Set(allColors)).slice(0, 5);

  const styleCount: Record<string, number> = {};
  analyses.forEach((a) => {
    styleCount[a.style] = (styleCount[a.style] || 0) + 1;
  });
  const dominantStyle = Object.entries(styleCount).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] || "light-minimal";

  const layoutNotes = analyses
    .filter((a) => a.detected_type === "screenshot")
    .map((a) => a.layout_notes)
    .join(" | ");

  return {
    dominant_colors: uniqueColors,
    style: dominantStyle,
    detected_type: analyses[0]?.detected_type || "other",
    layout_notes: layoutNotes || "No specific layout detected",
  };
}
