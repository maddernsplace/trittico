import Link from "next/link";

const values = [
  {
    icon: "🌿",
    title: "Quality Ingredients",
    desc: "We source the finest local produce from South Australian farms and import specialty items directly from Italy — San Marzano tomatoes, Parmigiano-Reggiano, prosciutto di Parma.",
  },
  {
    icon: "👨‍🍳",
    title: "Traditional Technique",
    desc: "Our chefs trained in Italy and bring authentic culinary tradition to every dish. From hand-rolled pasta to 48-hour fermented pizza dough, we never cut corners.",
  },
  {
    icon: "❤️",
    title: "Heartfelt Hospitality",
    desc: "At Trittico, you're not just a customer — you're family. We take pride in creating warm, memorable experiences for every guest who walks through our doors.",
  },
];

const team = [
  {
    name: "Marco Trittico",
    role: "Head Chef & Founder",
    bio: "Born in Naples, Marco trained under Michelin-starred chefs in Rome and Milan before bringing his passion for authentic Italian cuisine to Adelaide. His philosophy: respect the ingredients, honour the tradition.",
    emoji: "👨‍🍳",
  },
  {
    name: "Sofia Trittico",
    role: "Restaurant Manager",
    bio: "Sofia oversees the dining experience at Trittico, ensuring every guest feels the warmth of Italian hospitality. Her attention to detail and infectious smile set the tone for every meal.",
    emoji: "👩",
  },
  {
    name: "Luca Bianchi",
    role: "Sous Chef",
    bio: "A Sicilian native, Luca brings bold flavours and creative flair to our kitchen. His seafood dishes and wood-fired pizzas are beloved by regulars and newcomers alike.",
    emoji: "👨‍🍳",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-40 pb-24 px-6 relative"
        style={{ backgroundColor: "#1A1008" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p
            className="text-sm tracking-widest uppercase mb-3"
            style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.3em" }}
          >
            Our Story
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold italic mb-6"
            style={{ color: "white", fontFamily: "Georgia, serif", lineHeight: 1.2 }}
          >
            About Trittico Ristorante
          </h1>
          <div className="h-px w-20 mx-auto mb-8" style={{ background: "#C9A84C" }} />
          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            A story of passion, family, and the pursuit of perfect Italian food in the heart of South Adelaide.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F8F3E9" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            className="rounded-sm overflow-hidden flex items-center justify-center"
            style={{ background: "#1A1008", aspectRatio: "4/3", minHeight: "350px" }}
          >
            <div className="text-center p-12">
              <div className="text-7xl mb-6">🇮🇹</div>
              <p
                className="text-2xl italic mb-2"
                style={{ color: "#C9A84C", fontFamily: "Georgia, serif" }}
              >
                Dal cuore dell&apos;Italia
              </p>
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              >
                From the heart of Italy
              </p>
            </div>
          </div>

          <div>
            <p
              className="text-sm tracking-widest uppercase mb-3"
              style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.25em" }}
            >
              How It Began
            </p>
            <h2
              className="text-4xl font-bold italic mb-6"
              style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}
            >
              A Dream from Naples
            </h2>
            <div className="h-px w-16 mb-8" style={{ background: "#C9A84C" }} />
            <div className="space-y-4" style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif", lineHeight: 1.8 }}>
              <p>
                Trittico Ristorante was founded with a single dream: to bring the true taste of Italy to Adelaide&apos;s south.
                The name &ldquo;Trittico&rdquo; — Italian for &ldquo;triptych&rdquo; — reflects our founding philosophy: three pillars
                that guide everything we do.
              </p>
              <p>
                Located at 154 Main South Road in Hackham, we opened our doors with a small but passionate team,
                a wood-fired oven shipped from Naples, and recipes that had been perfected over decades.
                The response from our community was overwhelming.
              </p>
              <p>
                Today, Trittico is proudly rated 4.8 stars across 439+ reviews — a testament to our commitment
                to authenticity, quality, and the kind of service that makes every guest feel at home.
                Whether you&apos;re joining us for a weekend breakfast, a long lunch, or a celebratory dinner,
                we promise to deliver an experience that transports you straight to Italy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6" style={{ backgroundColor: "#1A1008" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm tracking-widest uppercase mb-3"
              style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.25em" }}
            >
              What Drives Us
            </p>
            <h2
              className="text-4xl font-bold italic"
              style={{ color: "white", fontFamily: "Georgia, serif" }}
            >
              Our Three Pillars
            </h2>
            <div className="h-px w-20 mx-auto mt-4" style={{ background: "#C9A84C" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="p-8 rounded-sm text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)" }}
              >
                <div className="text-5xl mb-5">{icon}</div>
                <h3
                  className="text-xl font-bold italic mb-4"
                  style={{ color: "#C9A84C", fontFamily: "Georgia, serif" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6" style={{ backgroundColor: "#FDFAF4" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm tracking-widest uppercase mb-3"
              style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.25em" }}
            >
              The People Behind the Food
            </p>
            <h2
              className="text-4xl font-bold italic"
              style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}
            >
              Meet Our Team
            </h2>
            <div className="gold-divider mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map(({ name, role, bio, emoji }) => (
              <div
                key={name}
                className="p-8 rounded-sm text-center"
                style={{ background: "white", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-5"
                  style={{ background: "#F8F3E9" }}
                >
                  {emoji}
                </div>
                <h3
                  className="text-xl font-bold italic mb-1"
                  style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}
                >
                  {name}
                </h3>
                <p
                  className="text-sm mb-4 uppercase tracking-wider"
                  style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                >
                  {role}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  {bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 px-6" style={{ backgroundColor: "#8B1A1A" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold italic"
              style={{ color: "white", fontFamily: "Georgia, serif" }}
            >
              Our Journey
            </h2>
          </div>
          <div className="space-y-0">
            {[
              { year: "2019", event: "Trittico Ristorante opens at 154 Main South Rd, Hackham" },
              { year: "2020", event: "Adapted to takeaway and delivery — community support was incredible" },
              { year: "2021", event: "Expanded dining room and launched weekend breakfast service" },
              { year: "2022", event: "Introduced our online ordering system and gift card program" },
              { year: "2024", event: "Achieved 4.8★ rating with 400+ reviews. Named Best Italian, Adelaide South" },
              { year: "2025+", event: "Continuing to grow, innovate, and bring Italy to your table" },
            ].map(({ year, event }, i) => (
              <div key={year} className="flex gap-6 items-start pb-8">
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.15)", color: "white", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                  >
                    {year}
                  </div>
                  {i < 5 && <div className="w-px flex-1 mt-2" style={{ background: "rgba(255,255,255,0.2)", minHeight: "20px" }} />}
                </div>
                <p
                  className="text-base pt-3"
                  style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  {event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#1A1008" }}>
        <h2
          className="text-4xl font-bold italic mb-4"
          style={{ color: "white", fontFamily: "Georgia, serif" }}
        >
          Come Experience It Yourself
        </h2>
        <p
          className="mb-8 text-base"
          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          We&apos;d love to welcome you to our table.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-primary">Book a Table</Link>
          <Link href="/menu" className="btn-outline">View Our Menu</Link>
        </div>
      </section>
    </>
  );
}
