import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateWithClaude } from "@/lib/ai/claude";
import { SYSTEM_PROMPT_GENERATE_CODE } from "@/lib/ai/prompts";
import { extractDesignTokens } from "@/lib/ai/extractDesignTokens";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId, streaming = false } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .eq("user_id", user.id)
      .single();

    if (projectError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (!project.ai_data) {
      return NextResponse.json(
        { error: "AI data not generated yet" },
        { status: 400 }
      );
    }

    const inputData = project.input_data || {};
    const aiData = project.ai_data;

    const designTokens = extractDesignTokens(
      inputData.heroVariant || "default",
      inputData
    );

    const userPrompt = `Génère le code Next.js 15 complet pour cette landing page :

DESIGN TOKENS (À UTILISER STRICTEMENT) :
${JSON.stringify(designTokens, null, 2)}

DONNÉES AI GÉNÉRÉES :
${JSON.stringify(aiData, null, 2)}

CONFIGURATION DESIGN :
- Palette de couleurs : ${JSON.stringify(inputData.palette || {})}
- Mode : ${inputData.mode || "light"}
- Police : ${inputData.font || "Inter"}
- Hero variant : ${inputData.heroVariant || "v1"}

RÈGLES ABSOLUES :
- Utilise UNIQUEMENT les couleurs des design tokens
- Utilise UNIQUEMENT les espacements des design tokens
- Utilise UNIQUEMENT la typographie des design tokens
- Code production-ready
- Aucun commentaire
- Responsive mobile-first
- Animations Framer Motion subtiles
- Icônes Lucide React
- Tailwind CSS uniquement

Génère tous les fichiers nécessaires :
1. app/page.tsx (page principale avec tokens.heroStyle)
2. components/Hero.tsx
3. components/Features.tsx
4. components/PainPoints.tsx
5. components/SocialProof.tsx
6. components/FAQ.tsx
7. components/CTASection.tsx
8. components/Footer.tsx

Sépare chaque fichier avec : // === FICHIER: path/to/file.tsx ===`;

    if (streaming) {
      const stream = await generateWithClaude(
        SYSTEM_PROMPT_GENERATE_CODE,
        userPrompt,
        {
          maxTokens: 8192,
          temperature: 0.3,
          stream: true,
        }
      );

      return new NextResponse(stream as ReadableStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    const response = await generateWithClaude(
      SYSTEM_PROMPT_GENERATE_CODE,
      userPrompt,
      {
        maxTokens: 8192,
        temperature: 0.3,
      }
    );

    const files = parseCodeFiles(response as string);

    const { error: updateError } = await supabase
      .from("projects")
      .update({
        code_data: { files, designTokens },
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId);

    if (updateError) {
      console.error("Failed to update project:", updateError);
    }

    return NextResponse.json({ files, designTokens });
  } catch (error) {
    console.error("Error generating code:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function parseCodeFiles(codeString: string): Array<{ path: string; content: string; language: string }> {
  const files: Array<{ path: string; content: string; language: string }> = [];
  const fileRegex = /\/\/ === FICHIER: (.+?) ===\n([\s\S]*?)(?=\/\/ === FICHIER:|$)/g;

  let match;
  while ((match = fileRegex.exec(codeString)) !== null) {
    const path = match[1].trim();
    const content = match[2].trim();
    const language = path.endsWith(".tsx") || path.endsWith(".ts") ? "typescript" : "javascript";

    files.push({ path, content, language });
  }

  if (files.length === 0 && codeString.trim()) {
    files.push({
      path: "app/page.tsx",
      content: codeString.trim(),
      language: "typescript",
    });
  }

  return files;
}
