import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateWithClaude } from "@/lib/ai/claude";
import {
  SYSTEM_PROMPT_GENERATE_PAGE,
  getGeneratePagePrompt,
} from "@/lib/ai/prompts";
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

    const { projectId, section } = await request.json();

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
        { error: "No AI data to regenerate" },
        { status: 400 }
      );
    }

    const inputData = project.input_data || {};
    let userPrompt: string;

    if (section) {
      userPrompt = `Regénère uniquement la section "${section}" pour cette landing page.

CONTEXTE ACTUEL :
${JSON.stringify(project.ai_data, null, 2)}

INPUT DATA :
${JSON.stringify(inputData, null, 2)}

Génère une nouvelle version de la section "${section}" en gardant la cohérence avec le reste.
Réponds UNIQUEMENT avec un JSON valide contenant la section mise à jour.`;
    } else {
      userPrompt = getGeneratePagePrompt(inputData);
    }

    const response = await generateWithClaude(
      SYSTEM_PROMPT_GENERATE_PAGE,
      userPrompt,
      {
        maxTokens: 4096,
        temperature: 0.8,
      }
    );

    let newAiData: AIGeneratedData;
    try {
      const parsedResponse = JSON.parse(response as string);
      
      if (section) {
        newAiData = {
          ...project.ai_data,
          [section]: parsedResponse[section] || parsedResponse,
          version: (project.ai_data.version || 0) + 1,
        };
      } else {
        newAiData = {
          ...parsedResponse,
          version: (project.ai_data.version || 0) + 1,
        };
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const { error: updateError } = await supabase
      .from("projects")
      .update({
        ai_data: newAiData,
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

    return NextResponse.json({ aiData: newAiData });
  } catch (error) {
    console.error("Error regenerating:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
