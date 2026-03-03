import { NextRequest, NextResponse } from "next/server";
import { generateWithClaude } from "@/lib/ai/claude";
import { SYSTEM_PROMPT_SELECT_SKELETON } from "@/lib/ai/prompts";

export async function POST(request: NextRequest) {
  try {
    const { description, objective, targetAudience, productName } =
      await request.json();

    if (!description) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    const userPrompt = `Select the best skeleton for this SaaS :

Product Name: ${productName || "Unknown"}
Description: ${description}
Objective: ${objective || "general"}
Target Audience: ${targetAudience || "general"}

Choose the skeleton that best fits this product's needs.`;

    const response = await generateWithClaude(
      SYSTEM_PROMPT_SELECT_SKELETON,
      userPrompt,
      {
        maxTokens: 500,
        temperature: 0.3,
      }
    );

    let selectionData;
    try {
      selectionData = JSON.parse(response as string);
    } catch (parseError) {
      console.error("Failed to parse skeleton selection:", parseError);
      return NextResponse.json(
        { error: "Failed to parse skeleton selection" },
        { status: 500 }
      );
    }

    if (!selectionData.skeleton_id) {
      return NextResponse.json(
        { error: "No skeleton selected" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      skeleton_id: selectionData.skeleton_id,
      reasoning: selectionData.reasoning,
    });
  } catch (error) {
    console.error("Error selecting skeleton:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
