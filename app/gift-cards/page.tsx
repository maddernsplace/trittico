"use client";

import { useState } from "react";
const presetAmounts = [25, 50, 75, 100, 150, 200];

export default function GiftCardsPage() {
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState({
    recipientName: "",
    recipientEmail: "",
    senderName: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const finalAmount = customAmount ? parseInt(customAmount) : amount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 10) {
      alert("Minimum gift card amount is $10.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/gift-card-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, ...form }),
      });
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <section
        className="pt-40 pb-20 px-6 relative text-center"
        style={{ backgroundColor: "#1A1008" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative">
          <div className="text-6xl mb-4">🎁</div>
          <p
            className="text-sm tracking-widest uppercase mb-3"
            style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.3em" }}
          >
            The Perfect Gift
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold italic mb-4"
            style={{ color: "white", fontFamily: "Georgia, serif" }}
          >
            Gift Cards
          </h1>
          <div className="h-px w-20 mx-auto mb-6" style={{ background: "#C9A84C" }} />
          <p
            className="max-w-xl mx-auto text-base"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Helvetica Neue, Arial, sans-serif", lineHeight: 1.8 }}
          >
            Give the gift of authentic Italian dining. Our gift cards are valid for
            dine-in, takeaway, and online orders — no expiry date.
          </p>
        </div>
      </section>

      {/* Gift card form */}
      <section className="py-16 px-6" style={{ backgroundColor: "#F8F3E9" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Preview */}
          <div>
            {/* Card preview */}
            <div
              className="rounded-lg p-8 mb-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1A1008 0%, #2C1810 50%, #3D2010 100%)",
                minHeight: "220px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)`,
                  backgroundSize: "15px 15px",
                }}
              />
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/2 translate-x-1/4 opacity-10" style={{ background: "#C9A84C" }} />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p
                      className="text-3xl font-bold italic"
                      style={{ color: "#C9A84C", fontFamily: "Georgia, serif" }}
                    >
                      Trittico
                    </p>
                    <p
                      className="text-xs tracking-widest"
                      style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.2em" }}
                    >
                      RISTORANTE
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-xs uppercase tracking-wider mb-1"
                      style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                    >
                      Gift Card Value
                    </p>
                    <p
                      className="text-4xl font-bold"
                      style={{ color: "white", fontFamily: "Georgia, serif" }}
                    >
                      ${finalAmount || "—"}
                    </p>
                  </div>
                </div>
                <div>
                  {form.recipientName ? (
                    <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Helvetica Neue, Arial, sans-serif", fontSize: "0.9rem" }}>
                      For: <strong style={{ color: "white" }}>{form.recipientName}</strong>
                    </p>
                  ) : (
                    <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Helvetica Neue, Arial, sans-serif", fontSize: "0.9rem", fontStyle: "italic" }}>
                      Recipient&apos;s name will appear here
                    </p>
                  )}
                  {form.message && (
                    <p
                      className="mt-2 text-sm italic"
                      style={{ color: "#C9A84C", fontFamily: "Georgia, serif" }}
                    >
                      &ldquo;{form.message}&rdquo;
                    </p>
                  )}
                </div>
              </div>
              {/* Gold strip at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "#C9A84C" }} />
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: "✉️", title: "Instant Digital Delivery", desc: "Emailed to recipient within 24 hours of purchase" },
                { icon: "♾️", title: "No Expiry Date", desc: "Valid forever — use it at any time" },
                { icon: "🍝", title: "Valid for Everything", desc: "Dine-in, takeaway, online orders, and drinks" },
                { icon: "🔒", title: "Secure Payment", desc: "Processed securely via Stripe — no card details stored" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "#1A1008" }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold mb-0.5"
                      style={{ color: "#1A1008", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                    >
                      {title}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            className="p-8 rounded-sm"
            style={{ background: "white", boxShadow: "0 4px 30px rgba(0,0,0,0.08)" }}
          >
            <h2
              className="text-2xl font-bold italic mb-6"
              style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}
            >
              Purchase a Gift Card
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount selection */}
              <div>
                <label
                  className="block text-xs uppercase tracking-wider mb-3"
                  style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                >
                  Select Amount *
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {presetAmounts.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { setAmount(a); setCustomAmount(""); }}
                      className="py-3 rounded-sm text-sm font-bold transition-all duration-200"
                      style={{
                        background: amount === a && !customAmount ? "#1A1008" : "#F8F3E9",
                        color: amount === a && !customAmount ? "#C9A84C" : "#2C1810",
                        border: `2px solid ${amount === a && !customAmount ? "#1A1008" : "transparent"}`,
                        fontFamily: "Georgia, serif",
                        cursor: "pointer",
                      }}
                    >
                      ${a}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm" style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>Custom:</span>
                  <div className="flex items-center border rounded-sm overflow-hidden flex-1" style={{ borderColor: "#d1c4b0" }}>
                    <span className="px-3 py-2.5 text-sm font-bold" style={{ background: "#F8F3E9", color: "#6B5744", fontFamily: "Georgia, serif" }}>$</span>
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); }}
                      onFocus={() => setAmount(0)}
                      placeholder="Enter amount"
                      className="flex-1 px-3 py-2.5 text-sm outline-none"
                      style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", color: "#1A1008" }}
                    />
                  </div>
                </div>
              </div>

              {/* Recipient */}
              <div className="space-y-4">
                <h3
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  Recipient Details
                </h3>
                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                  >
                    Recipient&apos;s Name *
                  </label>
                  <input
                    type="text"
                    name="recipientName"
                    required
                    value={form.recipientName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. Sarah Smith"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                  >
                    Recipient&apos;s Email *
                  </label>
                  <input
                    type="email"
                    name="recipientEmail"
                    required
                    value={form.recipientEmail}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="sarah@example.com"
                  />
                </div>
              </div>

              {/* Sender */}
              <div className="space-y-4">
                <h3
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  From You
                </h3>
                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    required
                    value={form.senderName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. John Smith"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                  >
                    Personal Message (optional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    className="form-input"
                    placeholder="Happy birthday! Enjoy a beautiful Italian dinner..."
                    style={{ resize: "none" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !finalAmount}
                className="w-full py-4 rounded-sm text-base font-bold transition-all duration-200"
                style={{
                  background: loading || !finalAmount ? "#6B5744" : "#8B1A1A",
                  color: "white",
                  fontFamily: "Helvetica Neue, Arial, sans-serif",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: loading || !finalAmount ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Redirecting to Payment..." : `Buy $${finalAmount || "—"} Gift Card`}
              </button>

              <p
                className="text-center text-xs"
                style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              >
                🔒 Secure checkout via Stripe. All major cards accepted.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6" style={{ backgroundColor: "#1A1008" }}>
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl font-bold italic text-center mb-10"
            style={{ color: "white", fontFamily: "Georgia, serif" }}
          >
            Gift Card FAQs
          </h2>
          <div className="space-y-5">
            {[
              {
                q: "When will the recipient receive their gift card?",
                a: "Gift cards are emailed to the recipient within 24 hours of purchase. For urgent gifts, please call us on (08) 8381 3446.",
              },
              {
                q: "Do gift cards expire?",
                a: "No — our gift cards have no expiry date. They can be used at any time for dine-in, takeaway, or online ordering.",
              },
              {
                q: "Can I use a gift card for online orders?",
                a: "Yes! Simply enter your gift card code at checkout when ordering online.",
              },
              {
                q: "What if I want to spend less than the gift card value?",
                a: "No problem — any remaining balance stays on the card for future use.",
              },
              {
                q: "Can I buy a gift card in-store?",
                a: "Absolutely! Visit us at 154 Main South Rd, Hackham, or call (08) 8381 3446 to arrange a physical gift card.",
              },
            ].map(({ q, a }) => (
              <div
                key={q}
                className="p-6 rounded-sm"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.15)" }}
              >
                <p
                  className="font-semibold mb-2"
                  style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  {q}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
