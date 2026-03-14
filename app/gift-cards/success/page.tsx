import Link from "next/link";

export default function GiftCardSuccessPage() {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "#1A1008" }}
    >
      <div className="text-center max-w-xl">
        <div className="text-7xl mb-8">🎁</div>
        <h1
          className="text-4xl md:text-5xl font-bold italic mb-4"
          style={{ color: "white", fontFamily: "Georgia, serif" }}
        >
          Gift Card Purchased!
        </h1>
        <p
          className="text-lg mb-3"
          style={{ color: "#C9A84C", fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          What a wonderful gift!
        </p>
        <p
          className="text-base mb-8"
          style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Helvetica Neue, Arial, sans-serif", lineHeight: 1.8 }}
        >
          Your gift card has been purchased successfully. The recipient will receive
          an email with their gift card details within{" "}
          <strong style={{ color: "white" }}>24 hours</strong>.
        </p>
        <p
          className="text-sm mb-10"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          Questions? Contact us at{" "}
          <a href="mailto:info@tritticoristorante.com" style={{ color: "#C9A84C" }}>
            info@tritticoristorante.com
          </a>{" "}
          or call{" "}
          <a href="tel:+61883813446" style={{ color: "#C9A84C" }}>
            (08) 8381 3446
          </a>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/gift-cards" className="btn-primary">Buy Another</Link>
          <Link href="/" className="btn-outline">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
