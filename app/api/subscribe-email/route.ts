import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    // Insérer l'email dans la table coming_soon_subscribers
    const { error } = await supabase
      .from("coming_soon_subscribers")
      .insert([
        {
          email,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      // Si l'email existe déjà, ce n'est pas une erreur
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "Email déjà inscrit" },
          { status: 200 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      { message: "Email inscrit avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
