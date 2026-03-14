import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "#1A1008" }}
    >
      <div className="text-center max-w-xl">
        <div className="text-7xl mb-8">🎉</div>
        <h1
          className="text-4xl md:text-5xl font-bold italic mb-4"
          style={{ color: "white", fontFamily: "Georgia, serif" }}
        >
          Grazie mille!
        </h1>
        <p
          className="text-lg mb-3"
          style={{ color: "#C9A84C", fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          Your order has been placed successfully.
        </p>
        <p
          className="text-base mb-8"
          style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Helvetica Neue, Arial, sans-serif", lineHeight: 1.8 }}
        >
          We&apos;ve received your order and are preparing it with love.
          You&apos;ll receive a confirmation email shortly.
          For pickup orders, your food will be ready in approximately <strong style={{ color: "white" }}>25–35 minutes</strong>.
        </p>
        <p
          className="text-sm mb-10"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          Questions? Call us on{" "}
          <a href="tel:+61883813446" style={{ color: "#C9A84C" }}>(08) 8381 3446</a>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/order" className="btn-primary">Order More</Link>
          <Link href="/" className="btn-outline">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
