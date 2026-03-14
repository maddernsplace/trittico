# Trittico Ristorante — Website

A full restaurant website built with **Next.js 16**, **Tailwind CSS**, and **Stripe** payments.

**Features:** Menu, Online Ordering, Gift Cards (Stripe), Reservations, Reviews, About, Contact, Opening Hours.

---

## Self-Hosting via GitHub Actions

The repo includes a CI/CD pipeline that automatically builds and deploys to your VPS every time you push to `main`.

### How it works

1. You push code to `main`
2. GitHub Actions builds a Docker image and pushes it to GitHub Container Registry (GHCR) — free
3. GitHub Actions SSHes into your server, pulls the new image, and restarts the container

---

## One-time Setup

### 1. Server requirements

Your VPS needs:
- **Docker** and **Docker Compose** installed
- An SSH user with Docker access
- Port **3000** open (or 80/443 if using nginx)

Install Docker on Ubuntu:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

### 2. Add GitHub Secrets

Go to your GitHub repo → **Settings → Secrets and variables → Actions** and add:

| Secret | Value |
|---|---|
| `DEPLOY_HOST` | Your server IP or domain, e.g. `123.456.789.0` |
| `DEPLOY_USER` | SSH username, e.g. `ubuntu` or `root` |
| `DEPLOY_SSH_KEY` | Your **private** SSH key (paste the full contents of `~/.ssh/id_rsa`) |
| `STRIPE_SECRET_KEY` | From [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) — `sk_live_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | From Stripe dashboard — `pk_live_...` |
| `NEXT_PUBLIC_BASE_URL` | Your site URL, e.g. `https://www.tritticoristorante.com` |

> To generate an SSH key pair: `ssh-keygen -t ed25519 -C "github-deploy"`
> Add the **public key** (`id_ed25519.pub`) to `~/.ssh/authorized_keys` on your server.
> Paste the **private key** into the `DEPLOY_SSH_KEY` secret.

### 3. Push to main to trigger first deploy

```bash
git push origin main
```

GitHub Actions will:
- Build the Docker image (~2–3 min)
- Push it to `ghcr.io/your-username/trittico:latest`
- SSH to your server and start the container

Your site will be live at `http://your-server-ip:3000`.

---

## Optional: Add a domain + HTTPS with Nginx

On your server:

```bash
# Install certbot
sudo apt install nginx certbot python3-certbot-nginx -y

# Create nginx config
sudo nano /etc/nginx/sites-available/trittico
```

Paste:
```nginx
server {
    server_name www.tritticoristorante.com tritticoristorante.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/trittico /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Get SSL certificate (free)
sudo certbot --nginx -d tritticoristorante.com -d www.tritticoristorante.com
```

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/your-username/trittico.git
cd trittico

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your Stripe test keys

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Stripe Setup

1. Create an account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Use **test keys** (`sk_test_...` / `pk_test_...`) for development
4. Use **live keys** (`sk_live_...` / `pk_live_...`) in production
5. Set up a webhook in Stripe Dashboard → Developers → Webhooks pointing to `https://yourdomain.com/api/webhook` to receive order confirmations

---

## Project Structure

```
app/
  page.tsx              # Homepage
  menu/page.tsx         # Full menu with tabs
  order/page.tsx        # Online ordering cart
  order/success/        # Post-payment confirmation
  gift-cards/page.tsx   # Gift card purchase
  gift-cards/success/   # Post-payment confirmation
  about/page.tsx        # About us
  contact/page.tsx      # Contact + reservation form
  api/
    create-checkout/    # Stripe Checkout for food orders
    gift-card-checkout/ # Stripe Checkout for gift cards
components/
  Navbar.tsx
  Footer.tsx
  ReviewsSection.tsx
lib/
  menu-items.ts         # Menu data used for ordering
```
