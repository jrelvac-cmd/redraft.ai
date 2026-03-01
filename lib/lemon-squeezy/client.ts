import {
  lemonSqueezySetup,
  createCheckout,
  getSubscription,
  cancelSubscription,
} from "@lemonsqueezy/lemonsqueezy.js";

let isSetup = false;

function ensureSetup() {
  if (!isSetup) {
    const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
    if (!apiKey) {
      throw new Error("LEMON_SQUEEZY_API_KEY is not configured");
    }
    lemonSqueezySetup({
      apiKey,
      onError: (error) => {
        console.error("Lemon Squeezy Error:", error);
      },
    });
    isSetup = true;
  }
}

export interface CheckoutOptions {
  productId: string;
  variantId: string;
  customData?: Record<string, any>;
  checkoutData?: {
    email?: string;
    name?: string;
    custom?: Record<string, any>;
  };
}

export async function createLemonCheckout(options: CheckoutOptions) {
  ensureSetup();
  const storeId = process.env.LEMON_SQUEEZY_STORE_ID!;

  try {
    const checkout = await createCheckout(storeId, options.variantId, {
      checkoutData: {
        email: options.checkoutData?.email,
        name: options.checkoutData?.name,
        custom: options.checkoutData?.custom,
      },
      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      },
    });

    return checkout;
  } catch (error) {
    console.error("Error creating checkout:", error);
    throw error;
  }
}

export async function getLemonSubscription(subscriptionId: string) {
  ensureSetup();
  try {
    const subscription = await getSubscription(subscriptionId);
    return subscription;
  } catch (error) {
    console.error("Error getting subscription:", error);
    throw error;
  }
}

export async function cancelLemonSubscription(subscriptionId: string) {
  ensureSetup();
  try {
    const result = await cancelSubscription(subscriptionId);
    return result;
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    throw error;
  }
}

export const PRODUCT_IDS = {
  UNLOCK_PAGE: process.env.LEMON_SQUEEZY_UNLOCK_VARIANT_ID || "",
  BUILDER: process.env.LEMON_SQUEEZY_BUILDER_VARIANT_ID || "",
  BUILDER_YEARLY: process.env.LEMON_SQUEEZY_BUILDER_YEARLY_VARIANT_ID || "",
  STUDIO: process.env.LEMON_SQUEEZY_STUDIO_VARIANT_ID || "",
  STUDIO_YEARLY: process.env.LEMON_SQUEEZY_STUDIO_YEARLY_VARIANT_ID || "",
};
