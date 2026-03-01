import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateHeadlines } from "@/lib/ai/claude";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { description, marketingAngle } = await request.json();

    if (!description || !marketingAngle) {
      return NextResponse.json(
        { error: "Description and marketing angle are required" },
        { status: 400 }
      );
    }

    const headlines = await generateHeadlines(description, marketingAngle);

    return NextResponse.json({ headlines });
  } catch (error) {
    console.error("Error generating headlines:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
