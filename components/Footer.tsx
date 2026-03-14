"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1A1008", color: "white" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-3xl font-bold italic mb-1" style={{ color: "#C9A84C", fontFamily: "Georgia, serif" }}>
              Trittico
            </h3>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.25em", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Ristorante
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Authentic Italian cuisine in the heart of Hackham, Adelaide.
              A culinary journey through Italy since 2019.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/trittico_ristorante/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                aria-label="Instagram"
                style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#C9A84C")}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/tritticoristorante"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#C9A84C")}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/menu", label: "Our Menu" },
                { href: "/order", label: "Order Online" },
                { href: "/gift-cards", label: "Gift Cards" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Helvetica Neue, Arial, sans-serif", textDecoration: "none" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#C9A84C")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Opening Hours
            </h4>
            <ul className="space-y-2" style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              {[
                { day: "Monday", hours: "Closed" },
                { day: "Tuesday–Thursday", hours: "11:30am – 9:00pm" },
                { day: "Friday", hours: "11:30am – 10:00pm" },
                { day: "Saturday", hours: "8:00am – 10:00pm" },
                { day: "Sunday", hours: "8:00am – 3:00pm" },
              ].map(({ day, hours }) => (
                <li key={day} className="flex justify-between text-sm gap-3">
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>{day}</span>
                  <span style={{ color: hours === "Closed" ? "#8B1A1A" : "rgba(255,255,255,0.85)" }}>{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "#C9A84C", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Find Us
            </h4>
            <address className="not-italic space-y-3" style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                154 Main South Rd<br />
                Hackham SA 5163<br />
                Australia
              </p>
              <p>
                <a href="tel:+61883813446" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#C9A84C")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
                  (08) 8381 3446
                </a>
              </p>
              <p>
                <a href="mailto:info@tritticoristorante.com" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#C9A84C")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
                  info@tritticoristorante.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
            © {new Date().getFullYear()} Trittico Ristorante. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms & Conditions"].map((item) => (
              <span key={item} className="text-xs cursor-pointer" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
