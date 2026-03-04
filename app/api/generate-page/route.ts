import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateWithClaude } from "@/lib/ai/claude";
import {
  SYSTEM_PROMPT_GENERATE_PAGE,
  getGeneratePagePrompt,
} from "@/lib/ai/prompts";
import { extractDesignTokens } from "@/lib/ai/extractDesignTokens";
import type { AIGeneratedData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY non configurée" },
        { status: 500 }
      );
    }

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

    const userPrompt = getGeneratePagePrompt(inputData);

    let response: string;
    try {
      response = (await generateWithClaude(
        SYSTEM_PROMPT_GENERATE_PAGE,
        userPrompt,
        {
          maxTokens: 4096,
          temperature: 0.7,
        }
      )) as string;
    } catch (claudeError: unknown) {
      const err = claudeError as { message?: string; status?: number; error?: { message?: string } };
      const msg = err?.error?.message || err?.message || String(claudeError);
      console.error("Claude API error:", claudeError);
      return NextResponse.json(
        { error: `Erreur Claude: ${msg}` },
        { status: 500 }
      );
    }

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
    const err = error as { message?: string; cause?: unknown };
    const message =
      err?.message ||
      (err?.cause && typeof err.cause === "object" && "message" in err.cause
        ? String((err.cause as { message: string }).message)
        : null) ||
      String(error);
    return NextResponse.json(
      { error: message || "Erreur inconnue" },
      { status: 500 }
    );
  }
}
