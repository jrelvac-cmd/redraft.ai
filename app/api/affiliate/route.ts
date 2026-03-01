import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("affiliate_code")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const { data: referrals, error: referralsError } = await supabase
      .from("profiles")
      .select("id, email, created_at, subscription_status")
      .eq("referred_by", profile.affiliate_code);

    if (referralsError) {
      console.error("Error fetching referrals:", referralsError);
    }

    const { data: payments, error: paymentsError } = await supabase
      .from("payments")
      .select("amount, created_at")
      .in(
        "user_id",
        referrals?.map((r) => r.id) || []
      )
      .eq("status", "completed");

    if (paymentsError) {
      console.error("Error fetching payments:", paymentsError);
    }

    const totalEarnings = payments?.reduce((sum, p) => sum + p.amount * 0.3, 0) || 0;

    return NextResponse.json({
      affiliateCode: profile.affiliate_code,
      affiliateUrl: `${process.env.NEXT_PUBLIC_APP_URL}/?ref=${profile.affiliate_code}`,
      referralsCount: referrals?.length || 0,
      totalEarnings: Math.round(totalEarnings * 100) / 100,
      referrals: referrals || [],
    });
  } catch (error) {
    console.error("Error fetching affiliate data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
