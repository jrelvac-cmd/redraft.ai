import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  sendWelcomeEmail,
  sendProjectUnlockedEmail,
  sendFeedbackRequestEmail,
} from "@/lib/resend/client";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, projectId } = await request.json();

    const { data: profile } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const userName = profile.full_name || profile.email.split("@")[0];

    switch (type) {
      case "welcome":
        await sendWelcomeEmail(profile.email, userName);
        break;

      case "unlock":
        if (!projectId) {
          return NextResponse.json(
            { error: "Project ID required for unlock email" },
            { status: 400 }
          );
        }

        const { data: project } = await supabase
          .from("projects")
          .select("name")
          .eq("id", projectId)
          .single();

        if (!project) {
          return NextResponse.json(
            { error: "Project not found" },
            { status: 404 }
          );
        }

        await sendProjectUnlockedEmail(
          profile.email,
          userName,
          project.name,
          projectId
        );
        break;

      case "feedback":
        if (!projectId) {
          return NextResponse.json(
            { error: "Project ID required for feedback email" },
            { status: 400 }
          );
        }

        const { data: feedbackProject } = await supabase
          .from("projects")
          .select("name")
          .eq("id", projectId)
          .single();

        if (!feedbackProject) {
          return NextResponse.json(
            { error: "Project not found" },
            { status: 404 }
          );
        }

        await sendFeedbackRequestEmail(
          profile.email,
          userName,
          feedbackProject.name
        );
        break;

      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
