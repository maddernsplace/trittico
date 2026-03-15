// ============================================================
//  TRITTICO ADMIN — admin.js
//  Password protection + GitHub API content management
// ============================================================
(function () {
  'use strict';

  // ── Config ──────────────────────────────────────────────
  const PW_HASH   = '0fb9dfdd37bd226cb0cbaedacea136911c0d10f093861d53b267e51378f58b0d';
  const REPO      = 'maddernsplace/trittico';
  const BRANCH    = 'claude/master';
  const SESSION_KEY = 'tr_admin_session';
  const TOKEN_KEY   = 'tr_gh_token';
  const SESSION_TTL = 8 * 60 * 60 * 1000; // 8 hours

  const CATS = ['Starters','Soups','Pasta','Pizza','Mains','Kids','Desserts','Drinks'];

  // ── State ────────────────────────────────────────────────
  let ghToken   = '';
  let menuItems = [];
  let siteData  = {};
  let editingId = null;
  let filterCat = 'All';

  // ── SHA-256 helper ───────────────────────────────────────
  async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
  }

  // ── Session ──────────────────────────────────────────────
  function sessionValid() {
    const s = localStorage.getItem(SESSION_KEY);
    if (!s) return false;
    return (Date.now() - parseInt(s, 10)) < SESSION_TTL;
  }
  function setSession() { localStorage.setItem(SESSION_KEY, Date.now()); }
  function clearSession() { localStorage.removeItem(SESSION_KEY); }

  // ── Toast ────────────────────────────────────────────────
  function toast(msg, type) {
    const el = document.getElementById('a-toast');
    el.textContent = msg;
    el.className = 'show ' + (type || 'info');
    clearTimeout(el._t);
    el._t = setTimeout(function() { el.className = ''; }, 3000);
  }

  // ── Save status ──────────────────────────────────────────
  function setSaveStatus(state, msg) {
    const el = document.getElementById('save-status');
    if (!el) return;
    el.className = 'save-status ' + state;
    el.textContent = msg || '';
  }

  // ── GitHub API ───────────────────────────────────────────
  async function ghGet(path) {
    const headers = { 'Accept': 'application/vnd.github+json' };
    if (ghToken) headers['Authorization'] = 'Bearer ' + ghToken;
    const res = await fetch('https://api.github.com/repos/' + REPO + '/contents/' + path + '?ref=' + BRANCH, { headers });
    if (!res.ok) throw new Error('GitHub fetch failed: ' + res.status);
    return res.json();
  }

  async function ghPut(path, content, message) {
    // Get current SHA
    let sha = '';
    try {
      const current = await ghGet(path);
      sha = current.sha;
    } catch(e) { /* new file, no sha needed */ }

    const body = { message: message, content: btoa(unescape(encodeURIComponent(content))), branch: BRANCH };
    if (sha) body.sha = sha;

    const res = await fetch('https://api.github.com/repos/' + REPO + '/contents/' + path, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + ghToken,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json'
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'GitHub save failed');
    }
    return res.json();
  }

  // ── Load data directly from the live site files ─────────
  async function loadData() {
    setSaveStatus('saving', 'Loading...');
    try {
      const [menuRes, siteRes] = await Promise.all([
        fetch('data/menu.json?_=' + Date.now()),
        fetch('data/site.json?_=' + Date.now())
      ]);
      if (!menuRes.ok) throw new Error('data/menu.json not found (' + menuRes.status + ')');
      if (!siteRes.ok) throw new Error('data/site.json not found (' + siteRes.status + ')');
      menuItems = await menuRes.json();
      siteData  = await siteRes.json();
      setSaveStatus('', '');
      renderAll();
    } catch(e) {
      setSaveStatus('error', 'Load failed');
      toast('Could not load data: ' + e.message, 'error');
    }
  }

  // ── Save menu.json ───────────────────────────────────────
  async function saveMenu(msg) {
    if (!ghToken) { toast('No GitHub token set — go to Settings tab to add one', 'error'); return; }
    setSaveStatus('saving', 'Saving...');
    try {
      await ghPut('data/menu.json', JSON.stringify(menuItems, null, 2), msg || 'Update menu via admin panel');
      setSaveStatus('saved', 'Saved ✓');
      toast('Menu saved — deploying in ~1 min', 'success');
      setTimeout(function() { setSaveStatus('', ''); }, 4000);
    } catch(e) {
      setSaveStatus('error', 'Save failed');
      toast('Save failed: ' + e.message, 'error');
    }
  }

  // ── Save site.json ───────────────────────────────────────
  async function saveSite(msg) {
    if (!ghToken) { toast('No GitHub token set — go to Settings tab to add one', 'error'); return; }
    setSaveStatus('saving', 'Saving...');
    try {
      await ghPut('data/site.json', JSON.stringify(siteData, null, 2), msg || 'Update site config via admin panel');
      setSaveStatus('saved', 'Saved ✓');
      toast('Saved — deploying in ~1 min', 'success');
      setTimeout(function() { setSaveStatus('', ''); }, 4000);
    } catch(e) {
      setSaveStatus('error', 'Save failed');
      toast('Save failed: ' + e.message, 'error');
    }
  }

  // ── Render all panels ────────────────────────────────────
  function renderAll() {
    renderMenu();
    renderOrder();
    renderAnnouncement();
    renderHours();
    renderContact();
    renderEmailSettings();
  }

  // ──────────────────────────────────────────────────────────
  //  MENU PANEL
  // ──────────────────────────────────────────────────────────
  function renderMenu() {
    // Category filter buttons
    const filterBar = document.getElementById('cat-filter-bar');
    if (!filterBar) return;
    filterBar.innerHTML = '<button class="cat-btn' + (filterCat==='All'?' active':'') + '" data-cat="All">All</button>'
      + CATS.map(function(c) {
          return '<button class="cat-btn' + (filterCat===c?' active':'') + '" data-cat="' + c + '">' + c + '</button>';
        }).join('');

    filterBar.querySelectorAll('.cat-btn').forEach(function(btn) {
      btn.addEventListener('click', function() { filterCat = btn.dataset.cat; renderMenu(); });
    });

    // Table
    const tbody = document.getElementById('menu-tbody');
    const filtered = menuItems.filter(function(it) { return filterCat === 'All' || it.cat === filterCat; });

    tbody.innerHTML = filtered.map(function(item) {
      const tags = (item.tags || []).map(function(t) {
        var cls = t==='V'?'tag-pill-v':t==='VG'?'tag-pill-vg':'tag-pill-gf';
        return '<span class="tag-pill ' + cls + '">' + t + '</span>';
      }).join('');
      const avail = item.available !== false
        ? '<span class="status-dot green"></span>Active'
        : '<span class="status-dot red"></span>Hidden';
      return '<tr>' +
        '<td><div class="item-name">' + esc(item.name) + '</div><div class="item-desc">' + esc(item.desc) + '</div></td>' +
        '<td><span class="item-cat">' + esc(item.cat) + '</span></td>' +
        '<td class="item-price">$' + item.price + '</td>' +
        '<td>' + tags + '</td>' +
        '<td>' + avail + '</td>' +
        '<td class="item-actions">' +
          '<button class="btn-edit" data-id="' + item.id + '">Edit</button>' +
          '<button class="btn-danger" data-del="' + item.id + '">Del</button>' +
        '</td>' +
      '</tr>';
    }).join('') || '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--a-muted);">No items in this category</td></tr>';

    tbody.querySelectorAll('.btn-edit').forEach(function(btn) {
      btn.addEventListener('click', function() { openItemForm(btn.dataset.id); });
    });
    tbody.querySelectorAll('[data-del]').forEach(function(btn) {
      btn.addEventListener('click', function() { deleteItem(btn.dataset.del); });
    });

    // Stats
    const statsEl = document.getElementById('menu-stats');
    if (statsEl) {
      const active = menuItems.filter(function(i){return i.available!==false;}).length;
      statsEl.textContent = menuItems.length + ' items total · ' + active + ' active';
    }
  }

  function openItemForm(id) {
    editingId = id || null;
    const form = document.getElementById('item-form');
    form.classList.add('visible');
    document.getElementById('item-form-title').textContent = id ? 'Edit Item' : 'Add New Item';

    const item = id ? menuItems.find(function(i){ return i.id === id; }) : null;
    document.getElementById('f-name').value  = item ? item.name  : '';
    document.getElementById('f-price').value = item ? item.price : '';
    document.getElementById('f-cat').value   = item ? item.cat   : 'Starters';
    document.getElementById('f-desc').value  = item ? item.desc  : '';
    const tags = item ? (item.tags || []) : [];
    document.getElementById('f-tag-v').checked  = tags.includes('V');
    document.getElementById('f-tag-vg').checked = tags.includes('VG');
    document.getElementById('f-tag-gf').checked = tags.includes('GF');
    document.getElementById('f-avail').checked  = item ? item.available !== false : true;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeItemForm() {
    document.getElementById('item-form').classList.remove('visible');
    editingId = null;
  }

  function saveItem() {
    const name  = document.getElementById('f-name').value.trim();
    const price = parseFloat(document.getElementById('f-price').value);
    const cat   = document.getElementById('f-cat').value;
    const desc  = document.getElementById('f-desc').value.trim();
    if (!name || isNaN(price)) { toast('Name and price are required', 'error'); return; }
    const tags = [];
    if (document.getElementById('f-tag-v').checked)  tags.push('V');
    if (document.getElementById('f-tag-vg').checked) tags.push('VG');
    if (document.getElementById('f-tag-gf').checked) tags.push('GF');
    const available = document.getElementById('f-avail').checked;

    if (editingId) {
      const idx = menuItems.findIndex(function(i){ return i.id === editingId; });
      if (idx !== -1) {
        menuItems[idx] = Object.assign(menuItems[idx], { name, price, cat, desc, tags, available });
      }
    } else {
      const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
      menuItems.push({ id, name, price, cat, desc, tags, available });
    }
    closeItemForm();
    filterCat = cat;
    renderMenu();
    saveMenu(editingId ? 'Edit menu item: ' + name : 'Add menu item: ' + name);
  }

  function deleteItem(id) {
    const item = menuItems.find(function(i){ return i.id === id; });
    if (!item) return;
    if (!confirm('Delete "' + item.name + '"?')) return;
    menuItems = menuItems.filter(function(i){ return i.id !== id; });
    renderMenu();
    saveMenu('Delete menu item: ' + item.name);
  }

  // ──────────────────────────────────────────────────────────
  //  ORDER PANEL
  // ──────────────────────────────────────────────────────────
  function renderOrder() {
    const workerInput = document.getElementById('worker-url-input');
    if (workerInput) workerInput.value = siteData.checkout_worker_url || '';
    const stripeInput = document.getElementById('stripe-link-input');
    if (stripeInput) stripeInput.value = siteData.stripe_link || '';
    const orderToggle = document.getElementById('ordering-toggle');
    if (orderToggle) orderToggle.checked = siteData.ordering_enabled !== false;
    updateOrderStatus();

    // Availability list
    const avail = document.getElementById('order-avail-list');
    if (!avail) return;
    avail.innerHTML = CATS.map(function(cat) {
      const items = menuItems.filter(function(i){ return i.cat === cat; });
      if (!items.length) return '';
      return '<div style="margin-bottom:1rem;">' +
        '<div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--a-muted);margin-bottom:0.5rem;">' + cat + '</div>' +
        items.map(function(item) {
          const chk = item.available !== false ? 'checked' : '';
          return '<div class="toggle-row">' +
            '<div><div class="toggle-label">' + esc(item.name) + '</div><div class="toggle-desc">$' + item.price + '</div></div>' +
            '<label class="toggle-switch"><input type="checkbox" ' + chk + ' data-avail="' + item.id + '"><span class="toggle-slider"></span></label>' +
          '</div>';
        }).join('') +
      '</div>';
    }).join('');

    avail.querySelectorAll('[data-avail]').forEach(function(cb) {
      cb.addEventListener('change', function() {
        const item = menuItems.find(function(i){ return i.id === cb.dataset.avail; });
        if (item) item.available = cb.checked;
        saveMenu('Toggle availability: ' + (item ? item.name : cb.dataset.avail));
      });
    });
  }

  function updateOrderStatus() {
    const el = document.getElementById('order-status-text');
    if (!el) return;
    const on = siteData.ordering_enabled !== false;
    el.innerHTML = '<span class="status-dot ' + (on?'green':'red') + '"></span>Online ordering is ' + (on ? 'ENABLED' : 'DISABLED');
  }

  // ──────────────────────────────────────────────────────────
  //  ANNOUNCEMENT PANEL
  // ──────────────────────────────────────────────────────────
  function renderAnnouncement() {
    const ann = siteData.announcement || {};
    const activeEl = document.getElementById('ann-active');
    if (activeEl) activeEl.checked = !!ann.active;
    const textEl = document.getElementById('ann-text');
    if (textEl) textEl.value = ann.text || '';
    const typeEl = document.getElementById('ann-type');
    if (typeEl) typeEl.value = ann.type || 'info';
    updateAnnouncePreview();
  }

  function updateAnnouncePreview() {
    const text = document.getElementById('ann-text');
    const type = document.getElementById('ann-type');
    const prev = document.getElementById('ann-preview');
    if (!text || !type || !prev) return;
    if (text.value.trim()) {
      prev.className = 'announce-preview visible ' + type.value;
      prev.textContent = '📢 ' + text.value;
    } else {
      prev.className = 'announce-preview';
    }
  }

  // ──────────────────────────────────────────────────────────
  //  HOURS PANEL
  // ──────────────────────────────────────────────────────────
  function renderHours() {
    const container = document.getElementById('hours-rows');
    if (!container) return;
    const hours = siteData.hours || {};
    const days = Object.keys(hours).length
      ? Object.keys(hours)
      : ['Monday','Tue–Thu','Friday','Saturday','Sunday'];

    container.innerHTML = days.map(function(day) {
      return '<div class="hours-row">' +
        '<div class="hours-day">' + esc(day) + '</div>' +
        '<input class="form-input" data-day="' + esc(day) + '" value="' + esc(hours[day] || '') + '" placeholder="e.g. 11:30am–9pm or Closed">' +
      '</div>';
    }).join('');
  }

  // ──────────────────────────────────────────────────────────
  //  CONTACT PANEL
  // ──────────────────────────────────────────────────────────
  function renderContact() {
    const c = siteData.contact || {};
    const addr  = document.getElementById('c-address');
    const phone = document.getElementById('c-phone');
    const email = document.getElementById('c-email');
    if (addr)  addr.value  = c.address || '';
    if (phone) phone.value = c.phone   || '';
    if (email) email.value = c.email   || '';
  }

  // ── HTML escape ──────────────────────────────────────────
  function esc(str) {
    return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ── Tab switching ────────────────────────────────────────
  function switchTab(name) {
    document.querySelectorAll('.admin-nav-btn').forEach(function(b){ b.classList.remove('active'); });
    document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
    const btn = document.querySelector('.admin-nav-btn[data-tab="' + name + '"]');
    const panel = document.getElementById('panel-' + name);
    if (btn)   btn.classList.add('active');
    if (panel) panel.classList.add('active');
  }

  // ── GitHub token setup ───────────────────────────────────
  function loadToken() {
    ghToken = localStorage.getItem(TOKEN_KEY) || '';
    const inp = document.getElementById('gh-token-input');
    if (inp) inp.value = ghToken ? '••••••••••••••••' : '';
    updateTokenStatus();
  }

  // ── Render EmailJS settings from siteData ────────────────
  function renderEmailSettings() {
    const kitchen = document.getElementById('kitchen-email');
    const pubKey  = document.getElementById('ejs-public-key');
    const svcId   = document.getElementById('ejs-service-id');
    const tplId   = document.getElementById('ejs-template-id');
    if (kitchen) kitchen.value = siteData.kitchen_email || '';
    const ejs = siteData.emailjs || {};
    if (pubKey) pubKey.value = ejs.public_key  || '';
    if (svcId)  svcId.value  = ejs.service_id  || '';
    if (tplId)  tplId.value  = ejs.template_id || '';
  }

  function updateTokenStatus() {
    const el = document.getElementById('token-status');
    if (!el) return;
    el.innerHTML = ghToken
      ? '<span class="status-dot green"></span>Token saved — changes will commit to GitHub'
      : '<span class="status-dot red"></span>No token — saves won\'t work until you add one';
  }

  // ── Unlock screen ────────────────────────────────────────
  async function tryUnlock() {
    const pw   = document.getElementById('pw-input').value;
    const errEl = document.getElementById('pw-error');
    const hash = await sha256(pw);
    if (hash !== PW_HASH) {
      errEl.textContent = 'Incorrect password';
      document.getElementById('pw-input').value = '';
      return;
    }
    setSession();
    showApp();
  }

  function showApp() {
    document.getElementById('lock-screen').style.display = 'none';
    const app = document.getElementById('admin-app');
    app.classList.add('visible');
    loadToken();
    loadData();
    switchTab('menu');
  }

  // ── Boot ─────────────────────────────────────────────────
  function init() {
    // Password form
    const pwInput = document.getElementById('pw-input');
    const pwBtn   = document.getElementById('pw-submit');
    if (pwBtn) pwBtn.addEventListener('click', tryUnlock);
    if (pwInput) pwInput.addEventListener('keydown', function(e){ if(e.key==='Enter') tryUnlock(); });

    // Logout
    document.getElementById('btn-logout').addEventListener('click', function() {
      clearSession();
      location.reload();
    });

    // Nav tabs
    document.querySelectorAll('.admin-nav-btn[data-tab]').forEach(function(btn) {
      btn.addEventListener('click', function() { switchTab(btn.dataset.tab); });
    });

    // ── Menu panel wiring ──
    document.getElementById('btn-add-item').addEventListener('click', function() { openItemForm(null); });
    document.getElementById('btn-cancel-item').addEventListener('click', closeItemForm);
    document.getElementById('btn-save-item').addEventListener('click', saveItem);

    // ── Order panel wiring ──
    document.getElementById('btn-save-worker-url').addEventListener('click', function() {
      siteData.checkout_worker_url = document.getElementById('worker-url-input').value.trim();
      saveSite('Update Checkout Worker URL');
    });
    document.getElementById('btn-save-stripe').addEventListener('click', function() {
      siteData.stripe_link = document.getElementById('stripe-link-input').value.trim();
      saveSite('Update Stripe payment link');
    });
    document.getElementById('ordering-toggle').addEventListener('change', function(e) {
      siteData.ordering_enabled = e.target.checked;
      updateOrderStatus();
      saveSite('Toggle online ordering ' + (e.target.checked ? 'on' : 'off'));
    });

    // ── Announcement wiring ──
    document.getElementById('ann-text').addEventListener('input', updateAnnouncePreview);
    document.getElementById('ann-type').addEventListener('change', updateAnnouncePreview);
    document.getElementById('btn-save-ann').addEventListener('click', function() {
      siteData.announcement = {
        active: document.getElementById('ann-active').checked,
        text:   document.getElementById('ann-text').value.trim(),
        type:   document.getElementById('ann-type').value
      };
      saveSite('Update site announcement');
    });

    // ── Hours wiring ──
    document.getElementById('btn-save-hours').addEventListener('click', function() {
      const rows = document.querySelectorAll('#hours-rows [data-day]');
      const hours = {};
      rows.forEach(function(inp) { hours[inp.dataset.day] = inp.value.trim(); });
      siteData.hours = hours;
      saveSite('Update opening hours');
    });

    // ── Contact wiring ──
    document.getElementById('btn-save-contact').addEventListener('click', function() {
      siteData.contact = {
        address: document.getElementById('c-address').value.trim(),
        phone:   document.getElementById('c-phone').value.trim(),
        email:   document.getElementById('c-email').value.trim()
      };
      saveSite('Update contact details');
    });

    // ── EmailJS / kitchen printer wiring ──
    document.getElementById('btn-save-emailjs').addEventListener('click', function() {
      siteData.kitchen_email = document.getElementById('kitchen-email').value.trim();
      siteData.emailjs = {
        public_key:  document.getElementById('ejs-public-key').value.trim(),
        service_id:  document.getElementById('ejs-service-id').value.trim(),
        template_id: document.getElementById('ejs-template-id').value.trim()
      };
      saveSite('Update kitchen email / EmailJS config');
    });

    // ── GitHub token wiring ──
    document.getElementById('btn-save-token').addEventListener('click', function() {
      const val = document.getElementById('gh-token-input').value.trim();
      if (!val || val.startsWith('•')) { toast('Enter a valid token', 'error'); return; }
      ghToken = val;
      localStorage.setItem(TOKEN_KEY, ghToken);
      document.getElementById('gh-token-input').value = '••••••••••••••••';
      updateTokenStatus();
      toast('Token saved', 'success');
      loadData();
    });
    document.getElementById('btn-clear-token').addEventListener('click', function() {
      ghToken = '';
      localStorage.removeItem(TOKEN_KEY);
      document.getElementById('gh-token-input').value = '';
      updateTokenStatus();
      toast('Token cleared', 'info');
    });

    // Check session
    if (sessionValid()) {
      showApp();
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
