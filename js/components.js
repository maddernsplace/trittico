// ============================================================
//  Shared nav + footer HTML injection
// ============================================================
(function () {
  'use strict';

  var NAV_HTML = `
<header class="navbar" id="navbar">
  <div class="nav-container">
    <a href="index.html" class="logo">
      <span class="logo-primary">Trittico</span>
      <span class="logo-sub">Ristorante</span>
    </a>
    <nav class="nav-links" id="navLinks">
      <a href="index.html"       class="nav-link">Home</a>
      <a href="menu.html"        class="nav-link">Menu</a>
      <a href="order.html"       class="nav-link">Order Online</a>
      <a href="gift-cards.html"  class="nav-link">Gift Cards</a>
      <a href="about.html"       class="nav-link">About</a>
      <a href="contact.html"     class="nav-link">Contact</a>
      <a href="contact.html"     class="btn-reserve">Book a Table</a>
    </nav>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;

  var FOOTER_HTML = `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">Trittico</div>
        <div class="footer-logo-sub">Ristorante</div>
        <p>Authentic Italian cuisine in the heart of Hackham, Adelaide. A culinary journey through Italy since 2019.</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/trittico_ristorante/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener" aria-label="Facebook">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="menu.html">Our Menu</a></li>
          <li><a href="order.html">Order Online</a></li>
          <li><a href="gift-cards.html">Gift Cards</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Opening Hours</h4>
        <ul>
          <li><div class="footer-hours-row"><span class="footer-hours-day">Monday</span><span class="footer-hours-time closed">Closed</span></div></li>
          <li><div class="footer-hours-row"><span class="footer-hours-day">Tue–Thu</span><span class="footer-hours-time">11:30am–9pm</span></div></li>
          <li><div class="footer-hours-row"><span class="footer-hours-day">Friday</span><span class="footer-hours-time">11:30am–10pm</span></div></li>
          <li><div class="footer-hours-row"><span class="footer-hours-day">Saturday</span><span class="footer-hours-time">8am–10pm</span></div></li>
          <li><div class="footer-hours-row"><span class="footer-hours-day">Sunday</span><span class="footer-hours-time">8am–3pm</span></div></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Find Us</h4>
        <ul>
          <li><span>154 Main South Rd</span><span>Hackham SA 5163</span></li>
          <li><a href="tel:+61883813446">(08) 8381 3446</a></li>
          <li><a href="mailto:info@tritticoristorante.com">info@tritticoristorante.com</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">&copy; <span id="footerYear"></span> Trittico Ristorante. All rights reserved.</p>
      <p class="footer-copy">154 Main South Rd, Hackham SA 5163 &bull; (08) 8381 3446</p>
    </div>
  </div>
</footer>`;

  // Inject nav
  var navTarget = document.getElementById('nav-placeholder');
  if (navTarget) navTarget.outerHTML = NAV_HTML;

  // Inject footer
  var footerTarget = document.getElementById('footer-placeholder');
  if (footerTarget) footerTarget.outerHTML = FOOTER_HTML;

  // Footer year
  var fy = document.getElementById('footerYear');
  if (fy) fy.textContent = new Date().getFullYear();

})();
