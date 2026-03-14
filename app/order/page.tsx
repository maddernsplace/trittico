"use client";

import { useState } from "react";
import { orderableItems, type MenuItem } from "@/lib/menu-items";

type CartItem = MenuItem & { qty: number };

const categories = Array.from(new Set(orderableItems.map((i) => i.category)));

const tagColors: Record<string, { bg: string; text: string }> = {
  V: { bg: "#e8f5e9", text: "#2e7d32" },
  VG: { bg: "#e0f2f1", text: "#00695c" },
  GF: { bg: "#fff8e1", text: "#f57f17" },
};

export default function OrderPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [orderType, setOrderType] = useState<"pickup" | "dine-in">("pickup");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing && existing.qty > 1) {
        return prev.map((c) => c.id === id ? { ...c, qty: c.qty - 1 } : c);
      }
      return prev.filter((c) => c.id !== id);
    });
  };

  const getQty = (id: string) => cart.find((c) => c.id === id)?.qty ?? 0;
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const itemCount = cart.reduce((sum, c) => sum + c.qty, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((c) => ({ id: c.id, name: c.name, price: c.price, qty: c.qty })),
          orderType,
          note,
        }),
      });
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again or call us on (08) 8381 3446.");
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = orderableItems.filter((i) => i.category === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-16 px-6 text-center" style={{ backgroundColor: "#1A1008" }}>
        <p
          className="text-sm tracking-widest uppercase mb-3"
          style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.3em" }}
        >
          Trittico Ristorante
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold italic mb-4"
          style={{ color: "white", fontFamily: "Georgia, serif" }}
        >
          Order Online
        </h1>
        <div className="h-px w-20 mx-auto" style={{ background: "#C9A84C" }} />
        <div className="flex justify-center gap-4 mt-8">
          {(["pickup", "dine-in"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className="px-6 py-2.5 rounded-sm text-sm transition-all duration-200"
              style={{
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                letterSpacing: "0.05em",
                textTransform: "capitalize",
                background: orderType === type ? "#C9A84C" : "rgba(255,255,255,0.1)",
                color: orderType === type ? "#1A1008" : "rgba(255,255,255,0.7)",
                fontWeight: orderType === type ? 700 : 400,
                border: "none",
                cursor: "pointer",
              }}
            >
              {type === "pickup" ? "🥡 Pickup" : "🍽️ Dine In"}
            </button>
          ))}
        </div>
      </section>

      {/* Category tabs */}
      <div
        className="sticky top-16 z-40 overflow-x-auto border-b"
        style={{ backgroundColor: "#FDFAF4", borderColor: "rgba(0,0,0,0.08)" }}
      >
        <div className="flex min-w-max max-w-full px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-3.5 text-sm whitespace-nowrap transition-all duration-200 border-b-2"
              style={{
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                fontWeight: activeCategory === cat ? 600 : 400,
                color: activeCategory === cat ? "#8B1A1A" : "#6B5744",
                borderColor: activeCategory === cat ? "#8B1A1A" : "transparent",
                background: "none",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="py-8 px-6" style={{ backgroundColor: "#F8F3E9", minHeight: "60vh" }}>
        <div className="max-w-7xl mx-auto flex gap-8">
          {/* Menu items grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => {
                const qty = getQty(item.id);
                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-sm"
                    style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3
                        className="text-base font-bold italic leading-tight flex-1 pr-2"
                        style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}
                      >
                        {item.name}
                      </h3>
                      <span
                        className="text-base font-bold"
                        style={{ color: "#8B1A1A", fontFamily: "Georgia, serif", whiteSpace: "nowrap" }}
                      >
                        ${item.price}
                      </span>
                    </div>
                    <p
                      className="text-xs leading-relaxed mb-4"
                      style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                    >
                      {item.desc}
                    </p>
                    <div className="flex gap-1 mb-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-1.5 py-0.5 rounded-sm"
                          style={{
                            background: tagColors[tag]?.bg ?? "#f0f0f0",
                            color: tagColors[tag]?.text ?? "#333",
                            fontFamily: "Helvetica Neue, Arial, sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full py-2 text-sm rounded-sm transition-all duration-200"
                        style={{
                          background: "#8B1A1A",
                          color: "white",
                          fontFamily: "Helvetica Neue, Arial, sans-serif",
                          fontWeight: 600,
                          border: "none",
                          cursor: "pointer",
                          letterSpacing: "0.05em",
                        }}
                      >
                        + Add to Order
                      </button>
                    ) : (
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-9 h-9 rounded-sm text-lg font-bold transition-colors"
                          style={{ background: "#F8F3E9", color: "#8B1A1A", border: "none", cursor: "pointer" }}
                        >
                          −
                        </button>
                        <span className="text-lg font-bold" style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}>
                          {qty}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-9 h-9 rounded-sm text-lg font-bold transition-colors"
                          style={{ background: "#8B1A1A", color: "white", border: "none", cursor: "pointer" }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart sidebar */}
          <div
            className="hidden lg:block w-80 flex-shrink-0"
            style={{ position: "sticky", top: "120px", alignSelf: "flex-start" }}
          >
            <div
              className="rounded-sm p-6"
              style={{ background: "white", boxShadow: "0 4px 25px rgba(0,0,0,0.1)" }}
            >
              <div className="flex justify-between items-center mb-5">
                <h3
                  className="text-xl font-bold italic"
                  style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}
                >
                  Your Order
                </h3>
                {itemCount > 0 && (
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ background: "#8B1A1A", color: "white", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 700 }}
                  >
                    {itemCount}
                  </span>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🛒</div>
                  <p className="text-sm" style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                    Your cart is empty.<br />Add items to get started!
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: "#8B1A1A", color: "white" }}
                          >
                            {item.qty}
                          </span>
                          <span style={{ color: "#2C1810", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                            {item.name}
                          </span>
                        </div>
                        <span style={{ color: "#8B1A1A", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-5" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Special instructions, dietary notes..."
                      className="form-input text-sm"
                      rows={2}
                      style={{ resize: "none", fontSize: "0.8rem" }}
                    />
                  </div>

                  <div
                    className="flex justify-between items-center py-4 border-t border-b mb-5"
                    style={{ borderColor: "rgba(0,0,0,0.08)" }}
                  >
                    <span
                      className="font-bold"
                      style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", color: "#1A1008" }}
                    >
                      Total
                    </span>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "#8B1A1A", fontFamily: "Georgia, serif" }}
                    >
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <div
                    className="text-xs mb-4 px-3 py-2 rounded-sm"
                    style={{ background: "#F8F3E9", color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                  >
                    {orderType === "pickup" ? "🥡 Pickup — Ready in approx. 25–35 min" : "🍽️ Dine In — Table service"}
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full py-3 rounded-sm text-sm font-bold transition-all duration-200"
                    style={{
                      background: loading ? "#6B5744" : "#8B1A1A",
                      color: "white",
                      fontFamily: "Helvetica Neue, Arial, sans-serif",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Redirecting..." : `Pay $${total.toFixed(2)}`}
                  </button>

                  <p
                    className="text-xs text-center mt-3"
                    style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                  >
                    Secure payment via Stripe
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile cart bar */}
        {cart.length > 0 && (
          <div
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4"
            style={{ background: "#1A1008", borderTop: "1px solid rgba(201,168,76,0.3)" }}
          >
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 rounded-sm flex justify-between items-center px-5"
              style={{
                background: "#8B1A1A",
                color: "white",
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.05em",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                {itemCount}
              </span>
              <span>{loading ? "Redirecting..." : "View Order & Pay"}</span>
              <span>${total.toFixed(2)}</span>
            </button>
          </div>
        )}
      </section>
    </>
  );
}
