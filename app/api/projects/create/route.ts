import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Crée un projet en s'assurant que le profil existe (fix pour OAuth où le trigger peut ne pas avoir tourné)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    let admin;
    try {
      admin = createAdminClient();
    } catch {
      return NextResponse.json(
        { error: "Configuration serveur incomplète (SUPABASE_SERVICE_ROLE_KEY)" },
        { status: 500 }
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { description, uploaded_files_count = 0 } = body;

    if (!description || description.trim().length < 50) {
      return NextResponse.json(
        { error: "Description requise (min 50 caractères)" },
        { status: 400 }
      );
    }

    // S'assurer que le profil existe (bypass RLS avec admin)
    const affiliateCode = "rec_" + Math.random().toString(36).slice(2, 10);
    const { error: profileError } = await admin.from("profiles").upsert(
      {
        id: user.id,
        email: user.email || "",
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        avatar_url: user.user_metadata?.avatar_url || null,
        affiliate_code: affiliateCode,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    if (profileError) {
      console.error("Profile upsert error:", profileError);
      // Continue anyway - profile might already exist
    }

    // Créer le projet avec la session utilisateur (RLS s'applique)
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        user_id: user.id,
        name: "Nouveau projet",
        description: description.trim(),
        status: "draft",
        input_data: {
          description: description.trim(),
          uploaded_files_count,
        },
      })
      .select()
      .single();

    if (projectError) {
      console.error("Project creation error:", projectError);
      return NextResponse.json(
        { error: projectError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
