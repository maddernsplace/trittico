import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  try {
    const { amount, recipientName, recipientEmail, senderName, message } = await req.json();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: `Trittico Ristorante Gift Card — $${amount}`,
              description: `A gift card from ${senderName}${message ? ` — "${message}"` : ""}`,
              images: [],
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/gift-cards/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/gift-cards`,
      metadata: {
        type: "gift_card",
        recipientName,
        recipientEmail,
        senderName,
        message: message || "",
        amount: String(amount),
      },
      customer_email: recipientEmail || undefined,
      custom_text: {
        submit: {
          message: "Your gift card will be emailed to the recipient within 24 hours of purchase.",
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Gift card checkout error:", error);
    return NextResponse.json({ error: "Failed to create gift card checkout" }, { status: 500 });
  }
}
