/**
 * Trittico Ristorante — Stripe Checkout Worker
 * Deploy to Cloudflare Workers (free tier)
 *
 * Environment variable required:
 *   STRIPE_SECRET_KEY  — your Stripe secret key (sk_live_... or sk_test_...)
 *
 * Set via: Cloudflare Dashboard → Workers → your worker → Settings → Variables
 */

const ALLOWED_ORIGIN = 'https://maddernsplace.github.io';
const SUCCESS_URL    = 'https://maddernsplace.github.io/trittico/order-complete.html';
const CANCEL_URL     = 'https://maddernsplace.github.io/trittico/order.html';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: CORS_HEADERS });
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400);
    }

    const { items, orderType, note, orderId } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return json({ error: 'No items in order' }, 400);
    }

    if (!env.STRIPE_SECRET_KEY) {
      return json({ error: 'Stripe not configured' }, 500);
    }

    // Build URL-encoded Stripe Checkout Session payload
    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('success_url', SUCCESS_URL + '?session_id={CHECKOUT_SESSION_ID}');
    params.append('cancel_url',  CANCEL_URL);
    params.append('payment_method_types[]', 'card');
    params.append('metadata[order_id]',   orderId   || '');
    params.append('metadata[order_type]', orderType || 'pickup');
    params.append('metadata[note]',       note      || '');

    // Add each item as a line item
    items.forEach(function(item, i) {
      params.append('line_items[' + i + '][price_data][currency]',                  'aud');
      params.append('line_items[' + i + '][price_data][unit_amount]',               String(Math.round(item.price * 100)));
      params.append('line_items[' + i + '][price_data][product_data][name]',        item.name);
      if (item.desc) {
        params.append('line_items[' + i + '][price_data][product_data][description]', item.desc);
      }
      params.append('line_items[' + i + '][quantity]', String(item.qty));
    });

    // Add order type as a custom text field visible on the Stripe checkout page
    params.append('custom_text[submit][message]',
      (orderType === 'pickup' ? '🥡 Pickup order' : '🍽️ Dine In') +
      (note ? ' — Note: ' + note : '')
    );

    // Create Stripe Checkout Session
    let session;
    try {
      const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method:  'POST',
        headers: {
          'Authorization': 'Bearer ' + env.STRIPE_SECRET_KEY,
          'Content-Type':  'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      session = await stripeRes.json();

      if (!stripeRes.ok) {
        console.error('Stripe error:', session);
        return json({ error: session.error?.message || 'Stripe error' }, 502);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      return json({ error: 'Could not reach Stripe' }, 502);
    }

    return json({ url: session.url });
  }
};

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status:  status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json' }, CORS_HEADERS),
  });
}
