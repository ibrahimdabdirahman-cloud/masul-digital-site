/* ============================================================
   Masul Digital — shared site behaviour
   Every interactive piece is guarded by element existence,
   so this single file is safe to include on every page.
   ============================================================ */
(function () {
  'use strict';

  /* ─── Mobile menu ─────────────────────────── */
  var burger = document.getElementById('burger');
  var mob = document.getElementById('mob');
  if (burger && mob) {
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('open');
      mob.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('[data-mob-link]').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('open');
        mob.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─── FAQ accordion ───────────────────────── */
  var faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    faqItems.forEach(function (item) {
      var q = item.querySelector('.faq-q');
      if (!q) return;
      q.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');
        faqItems.forEach(function (i) { i.classList.remove('open'); });
        if (!wasOpen) item.classList.add('open');
      });
    });
    faqItems[0].classList.add('open'); // open the first by default
  }

  /* ─── Pricing tabs (+ deep-link via #hash or ?tab=) ─── */
  var priceTabs = document.querySelectorAll('.price-tab');
  var pricePanels = document.querySelectorAll('.price-panel');
  if (priceTabs.length && pricePanels.length) {
    var validTab = function (key) {
      return Array.prototype.some.call(priceTabs, function (t) { return t.dataset.ptab === key; });
    };
    var activatePtab = function (key) {
      if (!validTab(key)) return;
      priceTabs.forEach(function (t) { t.classList.toggle('active', t.dataset.ptab === key); });
      pricePanels.forEach(function (p) { p.classList.toggle('active', p.dataset.ppanel === key); });
    };
    priceTabs.forEach(function (t) {
      t.addEventListener('click', function () { activatePtab(t.dataset.ptab); });
    });
    // same-page jump links (e.g. inside a page) that pre-select a tab
    document.querySelectorAll('[data-goto-ptab]').forEach(function (a) {
      a.addEventListener('click', function () { activatePtab(a.dataset.gotoPtab); });
    });
    // deep link: /pricing#falcon  or  /pricing?tab=falcon
    var fromHash = (location.hash || '').replace('#', '').trim();
    var fromQuery = new URLSearchParams(location.search).get('tab');
    var initial = fromQuery || fromHash;
    if (initial && validTab(initial)) activatePtab(initial);
    window.addEventListener('hashchange', function () {
      var h = (location.hash || '').replace('#', '').trim();
      if (validTab(h)) activatePtab(h);
    });
  }

  /* ─── Lead form (deliver via WhatsApp) ──────── */
  var leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(leadForm);
      var message = [
        "Hi Masul Digital, I'd like a free digital check.",
        '',
        'Business: ' + (data.get('biz') || ''),
        'Type: ' + (data.get('type') || ''),
        'WhatsApp: ' + (data.get('wa') || ''),
        'Priority: ' + (data.get('need') || '')
      ].join('\n');
      var url = 'https://wa.me/447375440623?text=' + encodeURIComponent(message);
      var opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) window.location.href = url;
      leadForm.classList.add('sent');
    });
  }

  /* ─── Footer year ─────────────────────────── */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
