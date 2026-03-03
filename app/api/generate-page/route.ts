import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateWithClaude } from "@/lib/ai/claude";
import {
  SYSTEM_PROMPT_GENERATE_PAGE,
  getGeneratePagePrompt,
} from "@/lib/ai/prompts";
import { extractDesignTokens } from "@/lib/ai/extractDesignTokens";
import { getSkeletonsInfo } from "@/components/skeletons";
import type { AIGeneratedData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId } = await request.json();

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

    const inputData = project.input_data || {};
    
    const designTokens = extractDesignTokens(
      inputData.heroVariant || "default",
      inputData
    );

    inputData.designTokens = designTokens;

    // Add skeleton information to the prompt
    const skeletonsInfo = getSkeletonsInfo();
    const skeletonsContext = `

AVAILABLE SKELETONS FOR SELECTION:
${JSON.stringify(skeletonsInfo, null, 2)}

Select which skeleton best matches the product based on description and features.
The L'IA will use this skeleton to structure the page.`;

    const userPrompt = getGeneratePagePrompt(inputData) + skeletonsContext;

    const response = await generateWithClaude(
      SYSTEM_PROMPT_GENERATE_PAGE,
      userPrompt,
      {
        maxTokens: 4096,
        temperature: 0.7,
      }
    );

    let aiData: AIGeneratedData;
    try {
      aiData = JSON.parse(response as string);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    aiData.version = (project.ai_data?.version || 0) + 1;

    const { error: updateError } = await supabase
      .from("projects")
      .update({
        ai_data: aiData,
        input_data: inputData,
        status: "preview",
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId);

    if (updateError) {
      console.error("Failed to update project:", updateError);
      return NextResponse.json(
        { error: "Failed to update project" },
        { status: 500 }
      );
    }

    return NextResponse.json({ aiData, designTokens });
  } catch (error) {
    console.error("Error generating page:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
