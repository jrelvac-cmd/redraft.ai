import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId, rating, comment } = await request.json();

    if (!projectId || !rating) {
      return NextResponse.json(
        { error: "Project ID and rating are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const feedbackData = {
      user_id: user.id,
      project_id: projectId,
      rating,
      comment: comment || null,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("feedbacks")
      .insert(feedbackData);

    if (error) {
      console.error("Error saving feedback:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
