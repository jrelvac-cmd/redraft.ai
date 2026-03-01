import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 500 }
    );
  }
  const supabaseAdmin = createClient(url, key);

  try{
    const body = await request.text();
    const signature = request.headers.get("x-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 401 }
      );
    }

    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = hmac.update(body).digest("hex");

    if (digest !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(body);
    const eventName = payload.meta?.event_name;

    console.log("Lemon Squeezy Webhook Event:", eventName);

    switch (eventName) {
      case "order_created":
        await handleOrderCreated(payload, supabaseAdmin);
        break;

      case "subscription_created":
        await handleSubscriptionCreated(payload, supabaseAdmin);
        break;

      case "subscription_updated":
        await handleSubscriptionUpdated(payload, supabaseAdmin);
        break;

      case "subscription_cancelled":
        await handleSubscriptionCancelled(payload, supabaseAdmin);
        break;

      default:
        console.log("Unhandled event:", eventName);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleOrderCreated(payload: any, supabaseAdmin: any) {
  const customData = payload.meta?.custom_data;
  const userId = customData?.user_id;
  const projectId = customData?.project_id;
  const type = customData?.type;

  if (!userId) {
    console.error("No user_id in custom_data");
    return;
  }

  const orderId = payload.data?.id;
  const status = payload.data?.attributes?.status;

  if (status === "paid" && type === "unlock" && projectId) {
    await supabaseAdmin
      .from("projects")
      .update({
        status: "unlocked",
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId);

    await supabaseAdmin
      .from("payments")
      .update({ status: "completed" })
      .eq("lemon_squeezy_order_id", orderId);

    console.log(`Project ${projectId} unlocked for user ${userId}`);
  }
}

async function handleSubscriptionCreated(payload: any, supabaseAdmin: any) {
  const customData = payload.meta?.custom_data;
  const userId = customData?.user_id;

  if (!userId) {
    console.error("No user_id in custom_data");
    return;
  }

  const subscriptionId = payload.data?.id;
  const status = payload.data?.attributes?.status;

  if (status === "active") {
    await supabaseAdmin
      .from("profiles")
      .update({
        subscription_status: "pro",
        subscription_id: subscriptionId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    console.log(`Subscription ${subscriptionId} activated for user ${userId}`);
  }
}

async function handleSubscriptionUpdated(payload: any, supabaseAdmin: any) {
  const subscriptionId = payload.data?.id;
  const status = payload.data?.attributes?.status;

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("subscription_id", subscriptionId)
    .single();

  if (!profile) {
    console.error("No profile found for subscription:", subscriptionId);
    return;
  }

  let newStatus: "free" | "pro" | "cancelled" = "free";
  if (status === "active") {
    newStatus = "pro";
  } else if (status === "cancelled") {
    newStatus = "cancelled";
  }

  await supabaseAdmin
    .from("profiles")
    .update({
      subscription_status: newStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", profile.id);

  console.log(
    `Subscription ${subscriptionId} updated to ${newStatus} for user ${profile.id}`
  );
}

async function handleSubscriptionCancelled(payload: any, supabaseAdmin: any) {
  const subscriptionId = payload.data?.id;

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("subscription_id", subscriptionId)
    .single();

  if (!profile) {
    console.error("No profile found for subscription:", subscriptionId);
    return;
  }

  await supabaseAdmin
    .from("profiles")
    .update({
      subscription_status: "cancelled",
      updated_at: new Date().toISOString(),
    })
    .eq("id", profile.id);

  console.log(`Subscription ${subscriptionId} cancelled for user ${profile.id}`);
}
