// ============================================================
//  TRITTICO RISTORANTE — main.js
//  Navbar scroll, mobile menu, active link
// ============================================================

(function () {
  'use strict';

  // ----- Navbar scroll effect -----
  var navbar = document.getElementById('navbar');
  if (navbar) {
    // On inner pages, always keep solid background
    if (navbar.classList.contains('solid')) {
      // already solid
    } else {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }
  }

  // ----- Mobile hamburger -----
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ----- Active nav link by filename -----
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = (link.getAttribute('href') || '').split('/').pop();
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

})();
