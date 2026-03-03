import { NextRequest, NextResponse } from "next/server";
import { extractDesignTokens } from "@/lib/ai/extractDesignTokens";

export async function POST(request: NextRequest) {
  try {
    const { heroStyle, inputData } = await request.json();

    if (!heroStyle) {
      return NextResponse.json(
        { error: "heroStyle is required" },
        { status: 400 }
      );
    }

    const designTokens = extractDesignTokens(heroStyle, inputData);

    return NextResponse.json({ designTokens });
  } catch (error) {
    console.error("Error extracting design tokens:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
