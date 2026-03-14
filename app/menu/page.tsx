"use client";

import { useState } from "react";
import Link from "next/link";

const menuData = {
  "Starters": [
    { name: "Garlic Bread", desc: "Garlic buttered ciabatta bread", price: 8, tags: ["V"] },
    { name: "Bruschetta al Pomodoro", desc: "Toasted sourdough, fresh Roma tomatoes, basil, extra virgin olive oil", price: 14, tags: ["V", "VG"] },
    { name: "Arancini Trio", desc: "Three Italian rice balls — choose Bolognese, mushroom, or pumpkin", price: 22, tags: [] },
    { name: "Caprese Salad", desc: "Buffalo mozzarella, heirloom tomatoes, fresh basil, balsamic glaze", price: 18, tags: ["V", "GF"] },
    { name: "Calamari Fritti", desc: "Lightly crumbed calamari, served with aioli and lemon", price: 20, tags: [] },
    { name: "Antipasto Board", desc: "Selection of cured meats, artisan cheeses, olives, and house pickles (serves 2)", price: 32, tags: [] },
  ],
  "Soups & Salads": [
    { name: "Zuppa del Giorno", desc: "Chef's soup of the day, served with crusty bread", price: 14, tags: ["V"] },
    { name: "Caesar Salad", desc: "Cos lettuce, house dressing, parmesan, croutons, and crispy pancetta", price: 18, tags: [] },
    { name: "Insalata Mista", desc: "Mixed seasonal greens, cherry tomatoes, cucumber, olives, house vinaigrette", price: 15, tags: ["V", "VG", "GF"] },
  ],
  "Pasta": [
    { name: "Lasagna Bolognese", desc: "Layers of pasta, homemade slow-cooked Bolognese, mozzarella & parmesan", price: 22, tags: [] },
    { name: "Spaghetti Mare", desc: "Spaghetti with mixed seafood, fresh tomatoes, white wine, and a hint of chilli", price: 35, tags: ["GF option"] },
    { name: "Penne al Pollo", desc: "Penne with chicken, mushroom, pancetta & parmesan in rosé sauce", price: 26, tags: [] },
    { name: "Ravioli Italiani", desc: "House-made spinach and ricotta ravioli, creamy roasted pumpkin and spinach sauce", price: 28, tags: ["V"] },
    { name: "Gnocchi della Casa", desc: "Potato gnocchi, fresh tomato sauce, parmesan cheese & basil oil", price: 24, tags: ["V", "GF"] },
    { name: "Orecchiette Calabrese", desc: "Orecchiette with spicy Calabrese sausage, cherry tomatoes, broccoli", price: 27, tags: [] },
    { name: "Linguini al Granchio", desc: "Linguini with mud crab, cherry tomatoes, garlic, and fresh herbs", price: 38, tags: [] },
    { name: "Risotto ai Funghi", desc: "Arborio rice, wild mushroom, truffle oil, parmesan & thyme", price: 26, tags: ["V", "GF"] },
    { name: "Carbonara", desc: "Spaghetti with guanciale, egg yolk, pecorino romano, freshly cracked black pepper", price: 24, tags: [] },
    { name: "Pappardelle al Cinghiale", desc: "House-made pappardelle with slow-braised wild boar ragù", price: 32, tags: [] },
  ],
  "Pizza": [
    { name: "Margherita", desc: "San Marzano tomato, fior di latte mozzarella, fresh basil", price: 20, tags: ["V"] },
    { name: "Prosciutto e Rucola", desc: "Prosciutto di Parma, rocket, parmesan, cherry tomatoes, olive oil", price: 26, tags: [] },
    { name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, fontina, parmesan", price: 24, tags: ["V"] },
    { name: "Diavola", desc: "Spicy Calabrese salami, mozzarella, chilli", price: 25, tags: [] },
    { name: "Pizza del Bosco", desc: "Wild mushrooms, truffle cream, mozzarella, rosemary", price: 27, tags: ["V"] },
    { name: "Frutti di Mare", desc: "Mixed seafood, cherry tomatoes, garlic, fresh herbs", price: 32, tags: [] },
  ],
  "Mains": [
    { name: "Pollo Parmigiana", desc: "Crumbed chicken breast, house-made tomato sauce, mozzarella, ham", price: 30, tags: [] },
    { name: "Saltimbocca alla Romana", desc: "Pan-fried veal, prosciutto, sage, white wine & butter sauce", price: 38, tags: ["GF"] },
    { name: "Bistecca alla Fiorentina", desc: "500g T-bone steak, truffle butter, rosemary potatoes", price: 52, tags: ["GF"] },
    { name: "Branzino al Forno", desc: "Whole baked sea bass, lemon, capers, cherry tomatoes, olive oil", price: 42, tags: ["GF"] },
    { name: "Ossobuco alla Milanese", desc: "Braised veal shank, gremolata, saffron risotto", price: 45, tags: ["GF"] },
  ],
  "Kids Menu": [
    { name: "Kids Pasta al Pomodoro", desc: "Penne or spaghetti with fresh tomato sauce and parmesan", price: 12, tags: ["V"] },
    { name: "Kids Margherita Pizza", desc: "Small wood-fired pizza with tomato and mozzarella", price: 14, tags: ["V"] },
    { name: "Kids Chicken Schnitzel", desc: "Crumbed chicken breast with chips and salad", price: 14, tags: [] },
  ],
  "Desserts": [
    { name: "Tiramisu", desc: "Classic Italian tiramisu — espresso-soaked sponge, mascarpone cream, cocoa", price: 14, tags: ["V"] },
    { name: "Panna Cotta", desc: "Vanilla panna cotta with seasonal berry compote", price: 12, tags: ["V", "GF"] },
    { name: "Cannoli Siciliani", desc: "Crispy pastry shells filled with sweet ricotta, chocolate chips, orange zest", price: 13, tags: ["V"] },
    { name: "Affogato", desc: "Double espresso poured over a scoop of vanilla gelato", price: 10, tags: ["V", "GF"] },
    { name: "Gelato del Giorno", desc: "Three scoops of chef's daily gelato selection", price: 11, tags: ["V", "GF"] },
  ],
  "Drinks": [
    { name: "Sparkling Water", desc: "500ml Pellegrino sparkling mineral water", price: 5, tags: [] },
    { name: "Still Water", desc: "500ml still water", price: 4, tags: [] },
    { name: "Italian Soda", desc: "San Pellegrino Limonata, Aranciata, or Chinotto", price: 6, tags: [] },
    { name: "Espresso / Macchiato", desc: "Single origin Italian roast", price: 4, tags: [] },
    { name: "Cappuccino / Latte / Flat White", desc: "Traditional Italian coffee", price: 5, tags: [] },
    { name: "House Wine (Glass)", desc: "Ask your server for today's selection — red, white, or rosé", price: 12, tags: [] },
    { name: "Aperol Spritz", desc: "Aperol, prosecco, soda, orange", price: 16, tags: [] },
    { name: "Negroni", desc: "Campari, gin, sweet vermouth", price: 18, tags: [] },
  ],
};

const tagColors: Record<string, { bg: string; text: string }> = {
  V: { bg: "#e8f5e9", text: "#2e7d32" },
  VG: { bg: "#e0f2f1", text: "#00695c" },
  GF: { bg: "#fff8e1", text: "#f57f17" },
  "GF option": { bg: "#fff3e0", text: "#e65100" },
};

export default function MenuPage() {
  const categories = Object.keys(menuData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <>
      {/* Header */}
      <section
        className="pt-40 pb-20 px-6 text-center"
        style={{ backgroundColor: "#1A1008" }}
      >
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
          Our Menu
        </h1>
        <div className="h-px w-20 mx-auto" style={{ background: "#C9A84C" }} />
        <p
          className="mt-6 max-w-xl mx-auto text-base"
          style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Helvetica Neue, Arial, sans-serif", lineHeight: 1.8 }}
        >
          All dishes are prepared fresh daily using quality local and imported ingredients.
          Seasonal specials are available — ask your server.
        </p>
        {/* Dietary key */}
        <div className="flex justify-center flex-wrap gap-3 mt-8">
          {Object.entries(tagColors).map(([tag, { bg, text }]) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: bg, color: text, fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              {tag === "V" ? "V — Vegetarian" : tag === "VG" ? "VG — Vegan" : tag === "GF" ? "GF — Gluten Free" : "GF option — GF Available"}
            </span>
          ))}
        </div>
      </section>

      {/* Category tabs */}
      <div
        className="sticky top-16 z-40 overflow-x-auto border-b"
        style={{ backgroundColor: "#FDFAF4", borderColor: "rgba(0,0,0,0.08)" }}
      >
        <div className="flex min-w-max max-w-6xl mx-auto px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-4 text-sm whitespace-nowrap transition-all duration-200 border-b-2"
              style={{
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                letterSpacing: "0.05em",
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

      {/* Menu items */}
      <section className="py-16 px-6" style={{ backgroundColor: "#F8F3E9", minHeight: "60vh" }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-bold italic mb-8"
            style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}
          >
            {activeCategory}
          </h2>
          <div>
            {menuData[activeCategory as keyof typeof menuData].map((item) => (
              <div key={item.name} className="menu-item">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3
                      className="text-lg font-bold italic"
                      style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}
                    >
                      {item.name}
                    </h3>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-1.5 py-0.5 rounded-sm font-semibold"
                        style={{
                          background: tagColors[tag]?.bg ?? "#f0f0f0",
                          color: tagColors[tag]?.text ?? "#333",
                          fontFamily: "Helvetica Neue, Arial, sans-serif",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
                <div className="menu-price">${item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order CTA */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: "#1A1008" }}>
        <p
          className="text-sm tracking-widest uppercase mb-3"
          style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.25em" }}
        >
          Ready to Order?
        </p>
        <h2
          className="text-3xl font-bold italic mb-6"
          style={{ color: "white", fontFamily: "Georgia, serif" }}
        >
          Order Online or Call Us
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/order" className="btn-primary">Order Online</Link>
          <a href="tel:+61883813446" className="btn-outline">(08) 8381 3446</a>
        </div>
        <p
          className="mt-6 text-sm"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          Allergen information available on request. Prices include GST.
        </p>
      </section>
    </>
  );
}
