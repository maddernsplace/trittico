"use client";

import { useState } from "react";

const hours = [
  { day: "Monday", hours: null },
  { day: "Tuesday", hours: "11:30am – 9:00pm" },
  { day: "Wednesday", hours: "11:30am – 9:00pm" },
  { day: "Thursday", hours: "11:30am – 9:00pm" },
  { day: "Friday", hours: "11:30am – 10:00pm" },
  { day: "Saturday", hours: "8:00am – 10:00pm" },
  { day: "Sunday", hours: "8:00am – 3:00pm" },
];

const today = new Date().toLocaleDateString("en-AU", { weekday: "long" });

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // In production, connect to email/booking API
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
  };

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
          Get in Touch
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold italic mb-4"
          style={{ color: "white", fontFamily: "Georgia, serif" }}
        >
          Contact Us
        </h1>
        <div className="h-px w-20 mx-auto" style={{ background: "#C9A84C" }} />
      </section>

      <section className="py-16 px-6" style={{ backgroundColor: "#F8F3E9" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info + hours */}
          <div className="space-y-10">
            {/* Contact details */}
            <div>
              <h2
                className="text-2xl font-bold italic mb-6"
                style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}
              >
                Find Us
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: "📍",
                    label: "Address",
                    content: "154 Main South Rd, Hackham SA 5163",
                    link: "https://maps.google.com/?q=154+Main+South+Rd+Hackham+SA+5163",
                  },
                  {
                    icon: "📞",
                    label: "Phone",
                    content: "(08) 8381 3446",
                    link: "tel:+61883813446",
                  },
                  {
                    icon: "✉️",
                    label: "Email",
                    content: "info@tritticoristorante.com",
                    link: "mailto:info@tritticoristorante.com",
                  },
                  {
                    icon: "📸",
                    label: "Instagram",
                    content: "@trittico_ristorante",
                    link: "https://www.instagram.com/trittico_ristorante/",
                  },
                ].map(({ icon, label, content, link }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: "#1A1008" }}
                    >
                      {icon}
                    </div>
                    <div>
                      <p
                        className="text-xs uppercase tracking-wider mb-1"
                        style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                      >
                        {label}
                      </p>
                      <a
                        href={link}
                        target={link.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-base transition-colors"
                        style={{ color: "#1A1008", fontFamily: "Helvetica Neue, Arial, sans-serif", textDecoration: "none" }}
                        onMouseOver={(e) => (e.currentTarget.style.color = "#8B1A1A")}
                        onMouseOut={(e) => (e.currentTarget.style.color = "#1A1008")}
                      >
                        {content}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div>
              <h2
                className="text-2xl font-bold italic mb-6"
                style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}
              >
                Opening Hours
              </h2>
              <div
                className="rounded-sm overflow-hidden"
                style={{ background: "white", boxShadow: "0 2px 15px rgba(0,0,0,0.06)" }}
              >
                {hours.map(({ day, hours: h }) => {
                  const isToday = day === today;
                  return (
                    <div
                      key={day}
                      className="flex justify-between items-center px-5 py-3 border-b"
                      style={{
                        borderColor: "rgba(0,0,0,0.06)",
                        background: isToday ? "rgba(201,168,76,0.08)" : "transparent",
                      }}
                    >
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: isToday ? "#8B1A1A" : "#2C1810",
                          fontFamily: "Helvetica Neue, Arial, sans-serif",
                          fontWeight: isToday ? 700 : 400,
                        }}
                      >
                        {day} {isToday && <span className="text-xs ml-1" style={{ color: "#C9A84C" }}>(Today)</span>}
                      </span>
                      <span
                        className="text-sm"
                        style={{
                          color: h ? (isToday ? "#8B1A1A" : "#6B5744") : "#8B1A1A",
                          fontFamily: "Helvetica Neue, Arial, sans-serif",
                          fontWeight: isToday ? 700 : 400,
                        }}
                      >
                        {h ?? "Closed"}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p
                className="text-xs mt-3"
                style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              >
                * Hours may vary on public holidays. Please call ahead to confirm.
              </p>
            </div>

            {/* Map embed placeholder */}
            <div>
              <h2
                className="text-2xl font-bold italic mb-4"
                style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}
              >
                Getting Here
              </h2>
              <a
                href="https://maps.google.com/?q=154+Main+South+Rd+Hackham+SA+5163"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-sm overflow-hidden transition-opacity hover:opacity-90"
                style={{ background: "#2C1810", aspectRatio: "16/9" }}
              >
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-3"
                  style={{ minHeight: "200px" }}
                >
                  <div className="text-4xl">📍</div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                  >
                    154 Main South Rd, Hackham SA
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                  >
                    Click to open in Google Maps
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Reservation form */}
          <div
            className="p-8 rounded-sm"
            style={{ background: "white", boxShadow: "0 4px 30px rgba(0,0,0,0.08)" }}
          >
            <h2
              className="text-2xl font-bold italic mb-2"
              style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}
            >
              Make a Reservation
            </h2>
            <p
              className="text-sm mb-8"
              style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Reserve your table or send us a message. We&apos;ll confirm within 24 hours.
            </p>

            {status === "sent" ? (
              <div
                className="text-center py-12"
              >
                <div className="text-5xl mb-4">✅</div>
                <h3
                  className="text-2xl font-bold italic mb-3"
                  style={{ color: "#1A1008", fontFamily: "Georgia, serif" }}
                >
                  Grazie!
                </h3>
                <p
                  style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  Your reservation request has been received. We&apos;ll be in touch shortly to confirm.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider mb-2"
                      style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider mb-2"
                      style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                    >
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="04xx xxx xxx"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider mb-2"
                      style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                    >
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={form.date}
                      onChange={handleChange}
                      className="form-input"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider mb-2"
                      style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                    >
                      Time *
                    </label>
                    <select
                      name="time"
                      required
                      value={form.time}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select</option>
                      {["11:30", "12:00", "12:30", "13:00", "13:30", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"].map((t) => (
                        <option key={t} value={t}>{t.replace(":", ":")}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider mb-2"
                      style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                    >
                      Guests *
                    </label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="form-input"
                    >
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map((n) => (
                        <option key={n} value={n}>{n} {n === "1" ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 600 }}
                  >
                    Special Requests
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Dietary requirements, special occasions, high chairs, etc."
                    style={{ resize: "none" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full text-center"
                  style={{ opacity: status === "sending" ? 0.7 : 1 }}
                >
                  {status === "sending" ? "Sending..." : "Request Reservation"}
                </button>

                <p
                  className="text-center text-xs"
                  style={{ color: "#6B5744", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  Or call us directly:{" "}
                  <a
                    href="tel:+61883813446"
                    style={{ color: "#8B1A1A", fontWeight: 600 }}
                  >
                    (08) 8381 3446
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
