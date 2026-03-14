# Trittico Ristorante — Website

Pure HTML/CSS/JavaScript restaurant website, hosted free on **GitHub Pages**.

**Pages:** Home · Menu · Order Online · Gift Cards · About · Contact

---

## How to Enable GitHub Pages

1. Push this repo to GitHub (if not already)
2. Go to your repo → **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. Push any commit to `main` — the site deploys automatically

Your site will be live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

To use a custom domain (e.g. `www.tritticoristorante.com`), add it under **Settings → Pages → Custom domain**.

---

## Setup Checklist

### 1. Stripe Payment Links (for online ordering + gift cards)

Go to [dashboard.stripe.com/payment-links](https://dashboard.stripe.com/payment-links) and create:

**For gift cards** (one link per denomination):
- A payment link for $25, $50, $75, $100, $150, $200
- For custom amounts: create a link with "Customer chooses price" enabled

Then open `gift-cards.html` and replace the placeholder URLs:
```js
var STRIPE_LINKS = {
  25:  'https://buy.stripe.com/YOUR_LINK_FOR_25',   // ← replace
  50:  'https://buy.stripe.com/YOUR_LINK_FOR_50',   // ← replace
  ...
};
```

**For food ordering**, open `js/cart.js` and replace:
```js
var baseLink = 'https://buy.stripe.com/YOUR_PAYMENT_LINK_ID';  // ← replace
```
Create this as a "Customer chooses price" payment link in Stripe.

### 2. Contact Form (for reservations)

The contact form uses [Formspree](https://formspree.io) — free for up to 50 submissions/month.

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form, copy the form ID
3. Open `contact.html` and replace:
```js
var FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORMSPREE_ID';  // ← replace
```
Form submissions go straight to your email inbox.

---

## Local Development

No build tools needed. Just open any HTML file in your browser, or use a simple local server:

```bash
# Python (built in on most systems)
python3 -m http.server 8000
# Then open http://localhost:8000
```

---

## File Structure

```
├── index.html          Homepage
├── menu.html           Full menu with tabs
├── order.html          Online ordering cart
├── gift-cards.html     Gift card purchase
├── about.html          About us & team
├── contact.html        Contact & reservations
├── css/
│   └── style.css       All styles
├── js/
│   ├── main.js         Navbar, mobile menu
│   ├── components.js   Shared nav & footer
│   └── cart.js         Shopping cart logic
└── .github/
    └── workflows/
        └── pages.yml   GitHub Pages auto-deploy
```
