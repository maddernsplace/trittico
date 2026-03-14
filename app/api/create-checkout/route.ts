import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  try {
    const { items, orderType, note } = await req.json();

    const lineItems = items.map((item: { name: string; price: number; qty: number }) => ({
      price_data: {
        currency: "aud",
        product_data: {
          name: item.name,
          metadata: { note: note || "" },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }));

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/order`,
      metadata: {
        orderType,
        note: note || "",
        restaurant: "Trittico Ristorante",
      },
      custom_text: {
        submit: {
          message: orderType === "pickup"
            ? "Your order will be ready for pickup in approximately 25–35 minutes."
            : "Thank you for dining with us at Trittico Ristorante.",
        },
      },
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
