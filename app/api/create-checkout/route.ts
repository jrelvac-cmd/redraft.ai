import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createLemonCheckout, PRODUCT_IDS } from "@/lib/lemon-squeezy/client";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId, type } = await request.json();

    if (!projectId || !type) {
      return NextResponse.json(
        { error: "Project ID and type are required" },
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

    const { data: profile } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", user.id)
      .single();

    let variantId: string;
    let productId: string;

    if (type === "unlock") {
      variantId = PRODUCT_IDS.UNLOCK_PAGE;
      productId = "unlock-page";
    } else if (type === "subscription") {
      variantId = PRODUCT_IDS.BUILDER;
      productId = "builder";
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const checkout = await createLemonCheckout({
      productId,
      variantId,
      checkoutData: {
        email: profile?.email || user.email,
        name: profile?.full_name || undefined,
        custom: {
          user_id: user.id,
          project_id: projectId,
          type,
        },
      },
    });

    const checkoutUrl = (checkout as any).data?.attributes?.url;
    
    if (!checkoutUrl) {
      throw new Error("No checkout URL returned");
    }

    const { error: paymentError } = await supabase.from("payments").insert({
      user_id: user.id,
      project_id: type === "unlock" ? projectId : null,
      amount: type === "unlock" ? 19 : 39,
      currency: "EUR",
      status: "pending",
      payment_type: type,
      lemon_squeezy_order_id: (checkout as any).data?.id,
    });

    if (paymentError) {
      console.error("Failed to create payment record:", paymentError);
    }

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Error creating checkout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
