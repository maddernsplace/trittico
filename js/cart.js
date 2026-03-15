// ============================================================
//  TRITTICO RISTORANTE — cart.js
//  Shopping cart for online ordering — loads from data/menu.json
// ============================================================

var MENU_ITEMS = [];
var STRIPE_LINK = 'https://buy.stripe.com/YOUR_PAYMENT_LINK_ID';
var cart = {};
var orderType = 'pickup';

// ---- Helpers ----
function getTotal() {
  return MENU_ITEMS.reduce(function(sum, item) {
    return sum + (cart[item.id] || 0) * item.price;
  }, 0);
}
function getCount() {
  return Object.values(cart).reduce(function(a,b){ return a+b; }, 0);
}
function fmt(n) { return '$' + n.toFixed(2); }
function tagHTML(t) {
  var cls = t === 'V' ? 'tag-v' : t === 'VG' ? 'tag-vg' : 'tag-gf';
  return '<span class="tag ' + cls + '">' + t + '</span>';
}

// ---- Render item grid ----
function renderItems(cat) {
  var items = MENU_ITEMS.filter(function(i){ return i.cat === cat && i.available !== false; });
  if (!items.length) {
    return '<p style="padding:2rem;color:var(--muted);text-align:center;">No items available in this category right now.</p>';
  }
  return items.map(function(item) {
    var qty = cart[item.id] || 0;
    var tagsHTML = (item.tags || []).map(tagHTML).join('');
    var controls = qty === 0
      ? '<button class="add-btn" onclick="addItem(\'' + item.id + '\')">+ Add to Order</button>'
      : '<div class="qty-controls"><button class="qty-btn minus" onclick="removeItem(\'' + item.id + '\')">&#8722;</button><span class="qty-num">' + qty + '</span><button class="qty-btn plus" onclick="addItem(\'' + item.id + '\')">+</button></div>';
    return '<div class="order-item-card" id="card-' + item.id + '">' +
      '<div class="order-item-top"><span class="order-item-name">' + item.name + '</span><span class="order-item-price">$' + item.price + '</span></div>' +
      '<p class="order-item-desc">' + item.desc + '</p>' +
      '<div class="order-item-tags">' + tagsHTML + '</div>' +
      controls +
      '</div>';
  }).join('');
}

function renderAllCategories() {
  var cats = [];
  MENU_ITEMS.forEach(function(i) { if (i.available !== false && cats.indexOf(i.cat) === -1) cats.push(i.cat); });
  if (!cats.length) cats = ['Starters','Pasta','Pizza','Mains','Desserts','Drinks'];

  var tabs = cats.map(function(c, idx) {
    return '<button class="menu-tab' + (idx===0?' active':'') + '" data-cat="' + c + '">' + c + '</button>';
  }).join('');
  document.getElementById('order-tabs').innerHTML = tabs;
  renderCategoryGrid(cats[0]);

  document.querySelectorAll('#order-tabs .menu-tab').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#order-tabs .menu-tab').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      renderCategoryGrid(btn.dataset.cat);
    });
  });
}

function renderCategoryGrid(cat) {
  document.getElementById('items-grid').innerHTML = renderItems(cat);
}

// ---- Cart ops ----
function addItem(id) { cart[id] = (cart[id] || 0) + 1; updateUI(); }
function removeItem(id) {
  if (cart[id] > 0) cart[id]--;
  if (cart[id] === 0) delete cart[id];
  updateUI();
}
window.addItem = addItem;
window.removeItem = removeItem;

function updateUI() {
  var activeBtn = document.querySelector('#order-tabs .menu-tab.active');
  if (activeBtn) renderCategoryGrid(activeBtn.dataset.cat);
  renderSidebar();
  renderMobileBar();
}

function renderSidebar() {
  var count = getCount();
  var total = getTotal();
  var countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = count;

  var body = document.getElementById('cart-body');
  if (!body) return;

  if (count === 0) {
    body.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty.<br>Add items to get started!</p></div>';
  } else {
    var lines = MENU_ITEMS.filter(function(i){ return cart[i.id]; }).map(function(item) {
      return '<div class="cart-line">' +
        '<div class="cart-line-left"><span class="cart-line-badge">' + cart[item.id] + '</span><span>' + item.name + '</span></div>' +
        '<span class="cart-line-price">$' + (item.price * cart[item.id]).toFixed(2) + '</span></div>';
    }).join('');
    body.innerHTML =
      '<div class="cart-items">' + lines + '</div>' +
      '<div class="cart-note"><textarea class="form-input form-textarea" id="cartNote" rows="2" placeholder="Special instructions, dietary notes..." style="font-size:0.8rem;resize:none;"></textarea></div>' +
      '<div class="cart-total-row"><span class="cart-total-label">Total</span><span class="cart-total-amount">' + fmt(total) + '</span></div>' +
      '<div style="font-size:0.72rem;background:var(--cream);padding:0.5rem 0.75rem;border-radius:2px;margin-bottom:0.75rem;color:var(--muted);">' +
        (orderType === 'pickup' ? '🥡 Pickup — ready in approx. 25–35 min' : '🍽️ Dine In — table service') +
      '</div>' +
      '<button class="checkout-btn" onclick="openModal()">Pay ' + fmt(total) + '</button>' +
      '<p class="cart-stripe-note">🔒 Secure payment via Stripe</p>';
  }
}

function renderMobileBar() {
  var count = getCount();
  var bar = document.getElementById('mobile-cart-bar');
  if (!bar) return;
  if (count > 0) {
    bar.style.display = 'block';
    bar.innerHTML = '<button class="mobile-cart-btn" onclick="openModal()">' +
      '<span class="mobile-cart-badge">' + count + '</span>' +
      '<span>View Order &amp; Pay</span>' +
      '<span>' + fmt(getTotal()) + '</span></button>';
  } else {
    bar.style.display = 'none';
  }
}

// ---- Save pending order to localStorage before Stripe ----
function savePendingOrder(items, total, type, note) {
  var id = 'T' + Date.now().toString(36).toUpperCase();
  var order = {
    id:    id,
    ts:    Date.now(),
    type:  type,
    note:  note,
    total: total,
    items: items.map(function(item) {
      return { id: item.id, name: item.name, price: item.price, qty: cart[item.id] };
    })
  };
  localStorage.setItem('tr_pending_order', JSON.stringify(order));
  return order;
}

// ---- Checkout modal ----
function openModal() {
  if (getCount() === 0) return;
  var note  = (document.getElementById('cartNote') || {}).value || '';
  var items = MENU_ITEMS.filter(function(i){ return cart[i.id]; });
  var lines = items.map(function(item) {
    return '<div class="modal-order-line"><span>' + cart[item.id] + '&times; ' + item.name + '</span><span>$' + (item.price * cart[item.id]).toFixed(2) + '</span></div>';
  }).join('');
  var total = getTotal();

  // Save order so order-complete.html can read it after Stripe redirects back
  var pendingOrder = savePendingOrder(items, total, orderType, note);

  document.getElementById('modal-content').innerHTML =
    '<button class="modal-close" onclick="closeModal()">&#10005;</button>' +
    '<h3>Your Order</h3>' +
    '<div style="font-size:0.78rem;background:var(--cream);padding:0.5rem 0.75rem;border-radius:2px;margin-bottom:0.75rem;color:var(--muted);">' +
      (orderType === 'pickup' ? '🥡 Pickup — ready in approx. 25–35 min' : '🍽️ Dine In — table service') +
    '</div>' +
    '<div class="modal-order-list">' + lines + '</div>' +
    (note ? '<p style="font-size:0.8rem;color:var(--muted);margin:0.5rem 0;font-style:italic;">Note: ' + note + '</p>' : '') +
    '<div class="modal-total"><span>Total</span><span class="modal-total-amount">' + fmt(total) + '</span></div>' +
    '<div class="modal-actions">' +
      '<a href="' + STRIPE_LINK + '" target="_blank" rel="noopener" class="btn-primary" style="text-align:center;width:100%;">Pay Online via Stripe</a>' +
      '<a href="tel:+61883813446" class="btn-outline" style="text-align:center;width:100%;">📞 Call to Order: (08) 8381 3446</a>' +
    '</div>' +
    '<p style="text-align:center;font-size:0.72rem;color:var(--muted);margin-top:0.75rem;">🔒 Payment processed securely via Stripe</p>';

  document.getElementById('checkout-modal').classList.add('open');
}
window.openModal = openModal;

function closeModal() { document.getElementById('checkout-modal').classList.remove('open'); }
window.closeModal = closeModal;

// ---- Order type toggle ----
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.order-type-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      orderType = btn.dataset.type;
      document.querySelectorAll('.order-type-btn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      renderSidebar();
      renderMobileBar();
    });
  });
  document.getElementById('checkout-modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  // Load menu and site config from JSON, then render
  Promise.all([
    fetch('data/menu.json').then(function(r){ return r.json(); }),
    fetch('data/site.json').then(function(r){ return r.json(); })
  ]).then(function(results) {
    MENU_ITEMS  = results[0];
    var siteData = results[1];
    if (siteData.stripe_link && siteData.stripe_link !== 'https://buy.stripe.com/YOUR_PAYMENT_LINK_ID') {
      STRIPE_LINK = siteData.stripe_link;
    }
    if (siteData.ordering_enabled === false) {
      document.getElementById('items-grid').innerHTML =
        '<div style="padding:3rem;text-align:center;color:var(--muted);">' +
        '<p style="font-size:1.1rem;margin-bottom:0.5rem;">Online ordering is currently unavailable.</p>' +
        '<p>Please call us on <a href="tel:+61883813446" style="color:var(--gold);">(08) 8381 3446</a> to place your order.</p>' +
        '</div>';
      document.getElementById('order-tabs').innerHTML = '';
      return;
    }
    renderAllCategories();
    renderSidebar();
    renderMobileBar();
  }).catch(function() {
    // Fallback: if JSON fetch fails, show message
    document.getElementById('items-grid').innerHTML =
      '<p style="padding:2rem;text-align:center;color:var(--muted);">Menu could not be loaded. Please call us on (08) 8381 3446.</p>';
  });
});
