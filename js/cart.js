// ============================================================
//  TRITTICO RISTORANTE — cart.js
//  Shopping cart for online ordering
// ============================================================

var MENU_ITEMS = [
  // Starters
  { id:'garlic-bread',   name:'Garlic Bread',              price:8,   cat:'Starters', tags:['V'],       desc:'Garlic buttered ciabatta bread' },
  { id:'bruschetta',     name:'Bruschetta al Pomodoro',    price:14,  cat:'Starters', tags:['V','VG'],   desc:'Toasted sourdough, fresh Roma tomatoes, basil, olive oil' },
  { id:'arancini',       name:'Arancini Trio',             price:22,  cat:'Starters', tags:[],           desc:'Three Italian rice balls — Bolognese, mushroom, or pumpkin' },
  { id:'caprese',        name:'Caprese Salad',             price:18,  cat:'Starters', tags:['V','GF'],   desc:'Buffalo mozzarella, heirloom tomatoes, fresh basil, balsamic glaze' },
  { id:'calamari',       name:'Calamari Fritti',           price:20,  cat:'Starters', tags:[],           desc:'Lightly crumbed calamari with aioli and lemon' },
  // Pasta
  { id:'lasagna',        name:'Lasagna Bolognese',         price:22,  cat:'Pasta',    tags:[],           desc:'Layers of pasta, homemade Bolognese, mozzarella & parmesan' },
  { id:'spaghetti-mare', name:'Spaghetti Mare',            price:35,  cat:'Pasta',    tags:[],           desc:'Mixed seafood, fresh tomatoes, white wine, hint of chilli' },
  { id:'penne-pollo',    name:'Penne al Pollo',            price:26,  cat:'Pasta',    tags:[],           desc:'Chicken, mushroom, pancetta & parmesan in rosé sauce' },
  { id:'ravioli',        name:'Ravioli Italiani',          price:28,  cat:'Pasta',    tags:['V'],        desc:'House-made spinach and ricotta ravioli, roasted pumpkin sauce' },
  { id:'gnocchi',        name:'Gnocchi della Casa',        price:24,  cat:'Pasta',    tags:['V','GF'],   desc:'Potato gnocchi, fresh tomato sauce, parmesan & basil oil' },
  { id:'carbonara',      name:'Carbonara',                 price:24,  cat:'Pasta',    tags:[],           desc:'Spaghetti, guanciale, egg yolk, pecorino romano, black pepper' },
  { id:'risotto',        name:'Risotto ai Funghi',         price:26,  cat:'Pasta',    tags:['V','GF'],   desc:'Wild mushroom risotto, truffle oil, parmesan & thyme' },
  // Pizza
  { id:'margherita',     name:'Margherita',                price:20,  cat:'Pizza',    tags:['V'],        desc:'San Marzano tomato, fior di latte mozzarella, fresh basil' },
  { id:'prosciutto',     name:'Prosciutto e Rucola',       price:26,  cat:'Pizza',    tags:[],           desc:'Prosciutto di Parma, rocket, parmesan, cherry tomatoes' },
  { id:'quattro',        name:'Quattro Formaggi',          price:24,  cat:'Pizza',    tags:['V'],        desc:'Mozzarella, gorgonzola, fontina, parmesan' },
  { id:'diavola',        name:'Diavola',                   price:25,  cat:'Pizza',    tags:[],           desc:'Spicy Calabrese salami, mozzarella, chilli' },
  // Mains
  { id:'pollo-parm',     name:'Pollo Parmigiana',          price:30,  cat:'Mains',    tags:[],           desc:'Crumbed chicken breast, tomato sauce, mozzarella, ham' },
  { id:'bistecca',       name:'Bistecca alla Fiorentina',  price:52,  cat:'Mains',    tags:['GF'],       desc:'500g T-bone steak, truffle butter, rosemary potatoes' },
  // Desserts
  { id:'tiramisu',       name:'Tiramisu',                  price:14,  cat:'Desserts', tags:['V'],        desc:'Classic Italian tiramisu — espresso-soaked, mascarpone cream' },
  { id:'panna-cotta',    name:'Panna Cotta',               price:12,  cat:'Desserts', tags:['V','GF'],   desc:'Vanilla panna cotta with seasonal berry compote' },
  { id:'cannoli',        name:'Cannoli Siciliani',         price:13,  cat:'Desserts', tags:['V'],        desc:'Crispy pastry, sweet ricotta, chocolate chips, orange zest' },
  { id:'gelato',         name:'Gelato del Giorno',         price:11,  cat:'Desserts', tags:['V','GF'],   desc:'Three scoops of chef\'s daily gelato selection' },
  // Drinks
  { id:'sparkling',      name:'San Pellegrino Sparkling',  price:5,   cat:'Drinks',   tags:[],           desc:'500ml sparkling mineral water' },
  { id:'soda',           name:'Italian Soda',              price:6,   cat:'Drinks',   tags:[],           desc:'Limonata, Aranciata, or Chinotto' },
  { id:'coffee',         name:'Cappuccino / Latte / Flat White', price:5, cat:'Drinks', tags:[],         desc:'Traditional Italian coffee' },
  { id:'aperol',         name:'Aperol Spritz',             price:16,  cat:'Drinks',   tags:[],           desc:'Aperol, prosecco, soda, orange' },
];

var cart = {};         // { id: qty }
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
  var items = MENU_ITEMS.filter(function(i){ return i.cat === cat; });
  return items.map(function(item) {
    var qty = cart[item.id] || 0;
    var tagsHTML = item.tags.map(tagHTML).join('');
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
  var cats = ['Starters','Pasta','Pizza','Mains','Desserts','Drinks'];
  var tabs = cats.map(function(c, i) {
    return '<button class="menu-tab' + (i===0?' active':'') + '" data-cat="' + c + '">' + c + '</button>';
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
function addItem(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateUI();
}
function removeItem(id) {
  if (cart[id] > 0) cart[id]--;
  if (cart[id] === 0) delete cart[id];
  updateUI();
}
window.addItem = addItem;
window.removeItem = removeItem;

function updateUI() {
  // Re-render current category controls
  var activeBtn = document.querySelector('#order-tabs .menu-tab.active');
  if (activeBtn) renderCategoryGrid(activeBtn.dataset.cat);
  // Update sidebar
  renderSidebar();
  // Mobile bar
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

// ---- Checkout modal ----
function openModal() {
  if (getCount() === 0) return;
  var note = (document.getElementById('cartNote') || {}).value || '';
  var items = MENU_ITEMS.filter(function(i){ return cart[i.id]; });
  var lines = items.map(function(item) {
    return '<div class="modal-order-line"><span>' + cart[item.id] + '&times; ' + item.name + '</span><span>$' + (item.price * cart[item.id]).toFixed(2) + '</span></div>';
  }).join('');
  var total = getTotal();

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
      '<a href="' + buildStripeLink(items, total, orderType, note) + '" target="_blank" rel="noopener" class="btn-primary" style="text-align:center;width:100%;">Pay Online via Stripe</a>' +
      '<a href="tel:+61883813446" class="btn-outline" style="text-align:center;width:100%;">📞 Call to Order: (08) 8381 3446</a>' +
    '</div>' +
    '<p style="text-align:center;font-size:0.72rem;color:var(--muted);margin-top:0.75rem;">🔒 Payment processed securely via Stripe</p>';

  document.getElementById('checkout-modal').classList.add('open');
}
window.openModal = openModal;

function closeModal() {
  document.getElementById('checkout-modal').classList.remove('open');
}
window.closeModal = closeModal;

// Build Stripe Payment Link URL
// IMPORTANT: Replace the placeholder URL below with your actual Stripe Payment Link
// Create one at: https://dashboard.stripe.com/payment-links
// Use "Customer chooses price" option so any amount works
function buildStripeLink(items, total, type, note) {
  // === REPLACE THIS URL with your Stripe Payment Link ===
  var baseLink = 'https://buy.stripe.com/YOUR_PAYMENT_LINK_ID';
  // ======================================================
  // Pass order summary in the URL comment (Stripe will show this in the payment page notes)
  return baseLink;
}

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
  // Close modal on overlay click
  document.getElementById('checkout-modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  renderAllCategories();
  renderSidebar();
  renderMobileBar();
});
