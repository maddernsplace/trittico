import Link from "next/link";
import ReviewsSection from "@/components/ReviewsSection";

const features = [
  { icon: "🍝", title: "Authentic Italian", desc: "Every dish crafted from traditional recipes passed down through generations, using the finest imported ingredients." },
  { icon: "🍕", title: "Wood-Fired Pizzas", desc: "Our pizza dough slow-ferments for 48 hours, topped with San Marzano tomatoes and fresh mozzarella." },
  { icon: "🥂", title: "Fine Dining", desc: "An intimate, elegant atmosphere perfect for romantic dinners, family celebrations, and corporate events." },
  { icon: "⭐", title: "4.8★ Rated", desc: "Consistently rated one of Adelaide's top Italian restaurants with over 439 glowing reviews." },
];

const menuHighlights = [
  { name: "Arancini Trio", desc: "Italian rice balls — Bolognese, mushroom, or pumpkin", price: "$22", category: "Starters" },
  { name: "Pumpkin Ravioli", desc: "House-made ravioli with creamy roasted pumpkin & spinach", price: "$28", category: "Pasta" },
  { name: "Spaghetti Mare", desc: "Mixed seafood, fresh tomatoes, hint of chilli", price: "$35", category: "Pasta" },
  { name: "Lasagna Bolognese", desc: "Layers of pasta, homemade Bolognese, mozzarella & parmesan", price: "$22", category: "Classics" },
  { name: "Penne al Pollo", desc: "Chicken, mushroom, pancetta & parmesan in rosé sauce", price: "$26", category: "Pasta" },
  { name: "Tiramisu", desc: "Classic Italian tiramisu, made fresh daily", price: "$14", category: "Desserts" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#2C1810" }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)`,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-8 fade-up">
            <div className="h-px w-12" style={{ background: "#C9A84C" }} />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.3em" }}
            >
              Authentic Italian Cuisine — Hackham, Adelaide
            </span>
            <div className="h-px w-12" style={{ background: "#C9A84C" }} />
          </div>

          <h1
            className="text-6xl md:text-8xl font-bold italic mb-2 fade-up-delay"
            style={{ color: "white", fontFamily: "Georgia, serif", lineHeight: 1.1 }}
          >
            Trittico
          </h1>
          <p
            className="text-2xl md:text-3xl fade-up-delay"
            style={{ color: "#C9A84C", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Ristorante
          </p>
          <p
            className="text-base md:text-lg mt-8 mb-10 fade-up-delay-2 max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Helvetica Neue, Arial, sans-serif", lineHeight: 1.8 }}
          >
            A culinary journey through Italy, right here in South Adelaide.
            Freshly made pasta, wood-fired pizza, and the warmth of la famiglia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up-delay-2">
            <Link href="/order" className="btn-primary">Order Online</Link>
            <Link href="/menu" className="btn-outline">View Menu</Link>
          </div>

          <div className="flex justify-center gap-12 mt-20 fade-up-delay-2">
            {[
              { num: "4.8★", label: "Google Rating" },
              { num: "439+", label: "Reviews" },
              { num: "5+", label: "Years Serving" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold" style={{ color: "#C9A84C", fontFamily: "Georgia, serif" }}>{num}</div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>SCROLL</span>
          <div className="w-px h-10 animate-pulse" style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)" }} />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6" style={{ backgroundColor: "#FDFAF4" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm tracking-widest uppercase mb-3"
              style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.25em" }}
            >
              Why Choose Us
            </p>
            <h2 className="text-4xl md:text-5xl font-bold italic" style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}>
              La Nostra Passione
            </h2>
            <div className="gold-divider mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="text-center p-8 rounded-sm"
                style={{ background: "white", boxShadow: "0 2px 15px rgba(0,0,0,0.06)" }}
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-lg font-bold mb-3 italic" style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-24 px-6" style={{ backgroundColor: "#1A1008" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-sm tracking-widest uppercase mb-3"
              style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.25em" }}
            >
              Our Story
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold italic mb-6"
              style={{ color: "white", fontFamily: "Georgia, serif", lineHeight: 1.2 }}
            >
              Benvenuti alla<br />Famiglia Trittico
            </h2>
            <div className="h-px w-20 mb-8" style={{ background: "#C9A84C" }} />
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Trittico Ristorante was born from a deep love of Italian food and the belief that great
              cooking should be shared with everyone. Our name — Trittico, meaning &quot;triptych&quot; in Italian —
              represents the three pillars of our kitchen: quality ingredients, traditional technique, and heartfelt hospitality.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Located at 154 Main South Road, Hackham, we&apos;ve been proudly serving Adelaide&apos;s south
              with authentic Italian flavours. Every dish tells a story of Italy.
            </p>
            <Link href="/about" className="btn-outline">Our Story</Link>
          </div>
          <div className="relative">
            <div
              className="rounded-sm overflow-hidden flex items-center justify-center"
              style={{ background: "#2C1810", aspectRatio: "4/3" }}
            >
              <div className="text-center p-12">
                <div className="text-8xl mb-6">🇮🇹</div>
                <p className="text-xl italic" style={{ color: "#C9A84C", fontFamily: "Georgia, serif" }}>
                  &ldquo;The secret ingredient<br />is always love.&rdquo;
                </p>
              </div>
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border-2 rounded-sm pointer-events-none"
              style={{ borderColor: "#C9A84C", opacity: 0.3 }}
            />
          </div>
        </div>
      </section>

      {/* Menu highlights */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F8F3E9" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm tracking-widest uppercase mb-3"
              style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.25em" }}
            >
              From Our Kitchen
            </p>
            <h2 className="text-4xl md:text-5xl font-bold italic" style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}>
              Menu Highlights
            </h2>
            <div className="gold-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuHighlights.map(({ name, desc, price, category }) => (
              <div
                key={name}
                className="p-6 rounded-sm"
                style={{ background: "white", boxShadow: "0 2px 15px rgba(0,0,0,0.06)" }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className="text-xs uppercase tracking-wider px-2 py-1 rounded-sm"
                    style={{ background: "#F8F3E9", color: "#8B1A1A", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                  >
                    {category}
                  </span>
                  <span className="text-lg font-bold" style={{ color: "#8B1A1A", fontFamily: "Georgia, serif" }}>{price}</span>
                </div>
                <h3 className="text-xl font-bold italic mb-2" style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}>{name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu" className="btn-primary">View Full Menu</Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection />

      {/* Opening hours */}
      <section className="py-20 px-6" style={{ backgroundColor: "#2C1810" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm tracking-widest uppercase mb-3"
              style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.25em" }}
            >
              We&apos;re Open
            </p>
            <h2 className="text-4xl font-bold italic" style={{ color: "white", fontFamily: "Georgia, serif" }}>Opening Hours</h2>
            <div className="h-px w-20 mx-auto mt-4" style={{ background: "#C9A84C" }} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { day: "Monday", hours: null },
              { day: "Tue – Thu", hours: "11:30am – 9:00pm" },
              { day: "Friday", hours: "11:30am – 10:00pm" },
              { day: "Saturday", hours: "8:00am – 10:00pm" },
              { day: "Sunday", hours: "8:00am – 3:00pm" },
            ].map(({ day, hours }) => (
              <div
                key={day}
                className="text-center p-6 rounded-sm"
                style={{
                  background: hours ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${hours ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                <p
                  className="text-xs uppercase tracking-widest mb-3"
                  style={{ color: hours ? "#C9A84C" : "rgba(255,255,255,0.3)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  {day}
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: hours ? "white" : "#8B1A1A", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  {hours ?? "Closed"}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="tel:+61883813446" className="btn-outline">
              Reservations: (08) 8381 3446
            </a>
          </div>
        </div>
      </section>

      {/* Gift cards CTA */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "#8B1A1A" }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6">🎁</div>
          <h2
            className="text-4xl md:text-5xl font-bold italic mb-4"
            style={{ color: "white", fontFamily: "Georgia, serif" }}
          >
            Gift the Taste of Italy
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Give the gift of an unforgettable dining experience with a Trittico Ristorante gift card.
            Perfect for birthdays, anniversaries, and special occasions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gift-cards" className="btn-outline">Buy a Gift Card</Link>
            <Link
              href="/order"
              className="btn-primary"
              style={{ backgroundColor: "white", color: "#8B1A1A", borderColor: "white" }}
            >
              Order Online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
