/**
 * Trittico Ristorante — Cloudflare Worker
 *
 * Routes:
 *   POST /          — create Stripe Checkout session
 *   POST /webhook   — Stripe webhook (checkout.session.completed)
 *   GET  /orders    — kitchen: poll for new orders
 *   POST /done      — kitchen: mark order as done
 *
 * Environment variables (set via Cloudflare Dashboard → Worker → Settings → Variables):
 *   STRIPE_SECRET_KEY       — Stripe secret key (sk_live_... or sk_test_...)
 *   STRIPE_WEBHOOK_SECRET   — Stripe webhook signing secret (optional but recommended)
 *   KITCHEN_TOKEN           — Simple auth token for kitchen page (optional)
 *
 * KV namespace binding (Cloudflare Dashboard → Workers & Pages → KV):
 *   1. Create a KV namespace called "trittico-orders"
 *   2. Copy the namespace ID
 *   3. Go to your Worker → Settings → Variables → KV Namespace Bindings
 *   4. Add binding: name = ORDERS_KV, namespace = trittico-orders
 *
 * Stripe webhook setup:
 *   1. Stripe Dashboard → Developers → Webhooks → Add endpoint
 *   2. URL: https://trittico-checkout.maddernsplace.workers.dev/webhook
 *   3. Event: checkout.session.completed
 *   4. Copy signing secret → add as STRIPE_WEBHOOK_SECRET in Worker settings
 */

const ALLOWED_ORIGIN = 'https://maddernsplace.github.io';
const SUCCESS_URL    = 'https://maddernsplace.github.io/trittico/order-complete.html';
const CANCEL_URL     = 'https://maddernsplace.github.io/trittico/order.html';

const CORS_SITE = {
  'Access-Control-Allow-Origin':  ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const CORS_KITCHEN = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env) {
    const url  = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      const cors = (path === '/orders' || path === '/done') ? CORS_KITCHEN : CORS_SITE;
      return new Response(null, { status: 204, headers: cors });
    }

    if (path === '/webhook' && request.method === 'POST') return handleWebhook(request, env);
    if (path === '/orders' && request.method === 'GET')   return handleGetOrders(request, env);
    if (path === '/done'   && request.method === 'POST')  return handleDone(request, env);
    if (path === '/'       && request.method === 'POST')  return handleCheckout(request, env);

    return new Response('Not found', { status: 404 });
  }
};

// ── Stripe Checkout ────────────────────────────────────────────────────────────

async function handleCheckout(request, env) {
  let body;
  try { body = await request.json(); }
  catch { return json({ error: 'Invalid JSON' }, 400, CORS_SITE); }

  const { items, orderType, note, orderId } = body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return json({ error: 'No items in order' }, 400, CORS_SITE);
  }
  if (!env.STRIPE_SECRET_KEY) {
    return json({ error: 'Stripe not configured' }, 500, CORS_SITE);
  }

  const params = new URLSearchParams();
  params.append('mode', 'payment');
  params.append('success_url', SUCCESS_URL + '?session_id={CHECKOUT_SESSION_ID}');
  params.append('cancel_url',  CANCEL_URL);
  params.append('payment_method_types[]', 'card');
  params.append('metadata[order_id]',   orderId   || '');
  params.append('metadata[order_type]', orderType || 'pickup');
  params.append('metadata[note]',       note      || '');

  items.forEach(function(item, i) {
    params.append('line_items[' + i + '][price_data][currency]',                  'aud');
    params.append('line_items[' + i + '][price_data][unit_amount]',               String(Math.round(item.price * 100)));
    params.append('line_items[' + i + '][price_data][product_data][name]',        item.name);
    if (item.desc) {
      params.append('line_items[' + i + '][price_data][product_data][description]', item.desc);
    }
    params.append('line_items[' + i + '][quantity]', String(item.qty));
  });

  params.append('custom_text[submit][message]',
    (orderType === 'pickup' ? '🥡 Pickup order' : '🍽️ Dine In') +
    (note ? ' — Note: ' + note : '')
  );

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
      return json({ error: session.error?.message || 'Stripe error' }, 502, CORS_SITE);
    }
  } catch (err) {
    console.error('Fetch error:', err);
    return json({ error: 'Could not reach Stripe' }, 502, CORS_SITE);
  }

  // Store pending order in KV while awaiting payment
  if (env.ORDERS_KV && orderId) {
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    await env.ORDERS_KV.put('order:' + orderId, JSON.stringify({
      id: orderId,
      items,
      type: orderType || 'pickup',
      note: note || '',
      total,
      ts: Date.now(),
      status: 'pending',
      sessionId: session.id,
    }), { expirationTtl: 86400 });
  }

  return json({ url: session.url }, 200, CORS_SITE);
}

// ── Stripe Webhook ─────────────────────────────────────────────────────────────

async function handleWebhook(request, env) {
  const rawBody = await request.text();

  if (env.STRIPE_WEBHOOK_SECRET) {
    const sig = request.headers.get('stripe-signature');
    if (!sig) return new Response('No signature', { status: 400 });
    const valid = await verifyStripeSignature(rawBody, sig, env.STRIPE_WEBHOOK_SECRET);
    if (!valid) return new Response('Invalid signature', { status: 400 });
  }

  let event;
  try { event = JSON.parse(rawBody); }
  catch { return new Response('Invalid JSON', { status: 400 }); }

  if (event.type === 'checkout.session.completed' && env.ORDERS_KV) {
    const session = event.data.object;
    const orderId = session.metadata?.order_id;

    if (orderId) {
      const raw = await env.ORDERS_KV.get('order:' + orderId);
      if (raw) {
        const order = JSON.parse(raw);
        order.status = 'new';
        order.paidAt = Date.now();
        await env.ORDERS_KV.put('order:' + orderId, JSON.stringify(order), { expirationTtl: 86400 });

        // Append to new orders index
        const listRaw = await env.ORDERS_KV.get('new_orders_list');
        const list = listRaw ? JSON.parse(listRaw) : [];
        if (!list.includes(orderId)) list.push(orderId);
        await env.ORDERS_KV.put('new_orders_list', JSON.stringify(list.slice(-50)), { expirationTtl: 86400 });
      }
    }
  }

  return new Response('ok', { status: 200 });
}

// ── Kitchen: Poll Orders ───────────────────────────────────────────────────────

async function handleGetOrders(request, env) {
  if (!checkAuth(request, env)) return json({ error: 'Unauthorized' }, 401, CORS_KITCHEN);
  if (!env.ORDERS_KV)          return json({ orders: [], error: 'KV not configured — see worker setup comments' }, 200, CORS_KITCHEN);

  const listRaw = await env.ORDERS_KV.get('new_orders_list');
  const list = listRaw ? JSON.parse(listRaw) : [];

  const orders = [];
  for (const id of list) {
    const raw = await env.ORDERS_KV.get('order:' + id);
    if (raw) {
      const order = JSON.parse(raw);
      if (order.status === 'new') orders.push(order);
    }
  }

  orders.sort((a, b) => a.ts - b.ts);
  return json({ orders }, 200, CORS_KITCHEN);
}

// ── Kitchen: Mark Done ─────────────────────────────────────────────────────────

async function handleDone(request, env) {
  if (!checkAuth(request, env)) return json({ error: 'Unauthorized' }, 401, CORS_KITCHEN);
  if (!env.ORDERS_KV)          return json({ error: 'KV not configured' }, 500, CORS_KITCHEN);

  let body;
  try { body = await request.json(); }
  catch { return json({ error: 'Invalid JSON' }, 400, CORS_KITCHEN); }

  const { id } = body;
  if (!id) return json({ error: 'Missing id' }, 400, CORS_KITCHEN);

  const raw = await env.ORDERS_KV.get('order:' + id);
  if (raw) {
    const order = JSON.parse(raw);
    order.status = 'done';
    order.doneAt = Date.now();
    await env.ORDERS_KV.put('order:' + id, JSON.stringify(order), { expirationTtl: 86400 });
  }

  const listRaw = await env.ORDERS_KV.get('new_orders_list');
  if (listRaw) {
    const list = JSON.parse(listRaw).filter(oid => oid !== id);
    await env.ORDERS_KV.put('new_orders_list', JSON.stringify(list), { expirationTtl: 86400 });
  }

  return json({ ok: true }, 200, CORS_KITCHEN);
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function checkAuth(request, env) {
  if (!env.KITCHEN_TOKEN) return true;
  const auth = request.headers.get('Authorization') || '';
  return auth === 'Bearer ' + env.KITCHEN_TOKEN;
}

async function verifyStripeSignature(payload, sigHeader, secret) {
  const parts = sigHeader.split(',');
  let timestamp = '';
  const signatures = [];
  for (const part of parts) {
    if (part.startsWith('t='))  timestamp = part.slice(2);
    if (part.startsWith('v1=')) signatures.push(part.slice(3));
  }
  if (!timestamp || !signatures.length) return false;

  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(timestamp + '.' + payload));
  const computed = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
  return signatures.some(s => s === computed);
}

function json(data, status, cors) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json' }, cors || CORS_SITE),
  });
}
