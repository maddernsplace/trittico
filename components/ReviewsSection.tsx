"use client";

import { useState } from "react";

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    date: "December 2024",
    text: "Absolutely incredible! The pumpkin ravioli is the best pasta I've ever had in my life. The atmosphere is warm and romantic, service was impeccable. We'll definitely be back for our anniversary.",
    platform: "Google",
  },
  {
    name: "James T.",
    rating: 5,
    date: "November 2024",
    text: "The carbonara here is genuinely the best I've tasted — even compared to what I had in Rome! The chef clearly knows their craft. Generous portions and fantastic value for money.",
    platform: "Google",
  },
  {
    name: "Maria K.",
    rating: 5,
    date: "October 2024",
    text: "Trittico has become our family's go-to Italian restaurant. The kids love the pasta and the staff are so welcoming. The arancini trio is a must-order. 10/10 every single time.",
    platform: "TripAdvisor",
  },
  {
    name: "David L.",
    rating: 5,
    date: "October 2024",
    text: "Came here for a work dinner and everyone was blown away. The Spaghetti Mare was perfectly cooked with the freshest seafood. Beautiful setting, excellent wine list, attentive service.",
    platform: "Google",
  },
  {
    name: "Priya N.",
    rating: 5,
    date: "September 2024",
    text: "Best Italian in Adelaide, hands down. The tiramisu was divine and the wood-fired pizza crust was perfectly crispy. Such an authentic experience — you feel like you've been transported to Italy!",
    platform: "TripAdvisor",
  },
  {
    name: "Chris B.",
    rating: 5,
    date: "August 2024",
    text: "We celebrated our wedding anniversary here and it was magical. Private booth, complimentary dessert, and the most attentive service. The Gnocchi della Casa melted in my mouth. Perfecto!",
    platform: "Google",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          fill={i < count ? "#C9A84C" : "rgba(0,0,0,0.15)"}
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(current * perPage, current * perPage + perPage);

  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#1A1008" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <p
            className="text-sm tracking-widest uppercase mb-3"
            style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.25em" }}
          >
            What Our Guests Say
          </p>
          <h2 className="text-4xl md:text-5xl font-bold italic" style={{ color: "white", fontFamily: "Georgia, serif" }}>
            Guest Reviews
          </h2>
          <div className="h-px w-20 mx-auto mt-4" style={{ background: "#C9A84C" }} />
        </div>

        {/* Overall rating */}
        <div className="flex justify-center items-center gap-4 mb-14">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="24" height="24" fill="#C9A84C" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="text-4xl font-bold italic" style={{ color: "#C9A84C", fontFamily: "Georgia, serif" }}>4.8</span>
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
            Based on 439+ reviews
          </span>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {visible.map((review) => (
            <div
              key={review.name + review.date}
              className="p-6 rounded-sm"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.15)" }}
            >
              <div className="flex justify-between items-start mb-4">
                <Stars count={review.rating} />
                <span
                  className="text-xs px-2 py-1 rounded-sm"
                  style={{
                    background: "rgba(201,168,76,0.1)",
                    color: "#C9A84C",
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                    fontSize: "0.7rem",
                  }}
                >
                  {review.platform}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mb-5 italic"
                style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Georgia, serif" }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold" style={{ color: "white", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                    {review.name}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                    {review.date}
                  </p>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "#C9A84C", color: "#1A1008" }}
                >
                  {review.name[0]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "32px" : "8px",
                height: "8px",
                background: i === current ? "#C9A84C" : "rgba(201,168,76,0.3)",
              }}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps/place/Trittico+Ristorante"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Leave a Review
          </a>
        </div>
      </div>
    </section>
  );
}
