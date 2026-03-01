import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { analyzeMultipleImages } from "@/lib/ai/openai";

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

    const { data: assets, error: assetsError } = await supabase
      .from("assets")
      .select("public_url")
      .eq("project_id", projectId)
      .in("file_type", ["image/png", "image/jpeg", "image/jpg"]);

    if (assetsError || !assets || assets.length === 0) {
      return NextResponse.json(
        { error: "No images found for this project" },
        { status: 404 }
      );
    }

    const imageUrls = assets.map((asset) => asset.public_url);

    const analysis = await analyzeMultipleImages(imageUrls);

    const { error: updateError } = await supabase
      .from("projects")
      .update({
        input_data: {
          ...project.input_data,
          image_analysis: analysis,
        },
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId);

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to update project" },
        { status: 500 }
      );
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error analyzing images:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
