/* ==========================================================
   HEALTH AND AWARENESS CENTRE — interactive behaviour
   Vanilla JS only. Content lives in assets/js/data.js
   ========================================================== */
(function () {
  "use strict";

  var D = window.HAC;
  if (!D) return;

  var SLIDE_MS = 2000;   // homepage slideshow refresh rate
  var REVIEW_MS = 5000;  // reviews refresh rate
  var REVIEWS_PER_VIEW = 3;
  var CART_KEY = "hac-cart-v1";
  var AVATAR_COLORS = ["#0f766e", "#b45309", "#7c3aed", "#be123c", "#1d4ed8", "#047857", "#c2410c", "#0e7490"];

  // ---------- helpers ----------
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = function (n) { return D.currency + " " + Number(n).toLocaleString("en-KE"); };
  var waLink = function (msg) { return "https://wa.me/" + D.whatsappNumber + "?text=" + encodeURIComponent(msg); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var byId = function (id) {
    for (var i = 0; i < D.products.length; i++) if (D.products[i].id === id) return D.products[i];
    return null;
  };
  var initials = function (name) {
    return name.split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join("");
  };
  var hashColor = function (str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return AVATAR_COLORS[h % AVATAR_COLORS.length];
  };
  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function bottleHTML(p, large) {
    var words = p.name.split(" ").slice(0, 3).join(" ");
    return '<div class="bottle' + (large ? " bottle-lg" : "") + '" aria-hidden="true">' +
      '<span class="cap"></span><span class="neck"></span>' +
      '<div class="body"><span class="label">' + esc(words) + "</span></div></div>";
  }

  function starsHTML(n) {
    var s = "";
    for (var i = 1; i <= 5; i++) s += i <= n ? "★" : "☆";
    return s;
  }

  function productMessage(p) {
    var msg = "Hello Health and Awareness Centre, I would like to order: " + p.name +
      " (" + fmt(p.price) + ").";
    if (p.rx) msg += " I understand this item needs a consultation first.";
    return msg + " Please confirm availability and delivery to my county.";
  }

  // ---------- NAV ----------
  var nav = $("#nav");
  var menuBtn = $("#menuBtn");
  var navLinks = $("#navLinks");

  function onScrollNav() { nav.classList.toggle("scrolled", window.scrollY > 20); }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  menuBtn.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $$("#navLinks a").forEach(function (a) {
    a.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // highlight nav link for the section in view
  if ("IntersectionObserver" in window) {
    var navMap = {};
    $$("#navLinks a").forEach(function (a) { navMap[a.getAttribute("href").slice(1)] = a; });
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          $$("#navLinks a").forEach(function (a) { a.classList.remove("is-active"); });
          if (navMap[e.target.id]) navMap[e.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("[data-section]").forEach(function (s) { secObs.observe(s); });
  }

  $("#year").textContent = new Date().getFullYear();

  // ---------- REVEAL ON SCROLL + COUNTERS ----------
  var revealEls = $$(".reveal");
  revealEls.forEach(function (el) {
    var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty("--rd", (idx % 6) * 90 + "ms");
  });

  if ("IntersectionObserver" in window && !prefersReduced) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (prefersReduced) { el.textContent = target; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var cntObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cntObs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    $$("[data-count]").forEach(function (el) { cntObs.observe(el); });
  }

  // ---------- POINTER FX: hero glow, tilt, magnetic buttons ----------
  var hero = $("#home");
  hero.addEventListener("pointermove", function (e) {
    var r = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", (e.clientX - r.left) + "px");
    hero.style.setProperty("--my", (e.clientY - r.top) + "px");
  });

  if (!prefersReduced && window.matchMedia("(hover: hover)").matches) {
    var tiltSel = ".tilt, .product-card, .showcase";
    document.addEventListener("pointermove", function (e) {
      var el = e.target.closest && e.target.closest(tiltSel);
      if (!el) return;
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      var max = el.classList.contains("showcase") ? 4 : 7;
      el.style.transform = "perspective(900px) rotateX(" + (-y * max).toFixed(2) + "deg) rotateY(" +
        (x * max).toFixed(2) + "deg) translateY(-3px)";
    });
    document.addEventListener("pointerout", function (e) {
      var el = e.target.closest && e.target.closest(tiltSel);
      if (el && !el.contains(e.relatedTarget)) el.style.transform = "";
    });

    document.addEventListener("pointermove", function (e) {
      var b = e.target.closest && e.target.closest(".magnetic");
      if (!b) return;
      var r = b.getBoundingClientRect();
      var x = e.clientX - (r.left + r.width / 2);
      var y = e.clientY - (r.top + r.height / 2);
      b.style.transform = "translate(" + (x * 0.18).toFixed(1) + "px, " + (y * 0.25 - 2).toFixed(1) + "px)";
    });
    document.addEventListener("pointerout", function (e) {
      var b = e.target.closest && e.target.closest(".magnetic");
      if (b && !b.contains(e.relatedTarget)) b.style.transform = "";
    });
  }

  // ---------- CART (localStorage) ----------
  var cart = {};
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch (err) { cart = {}; }
  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (err) { /* private mode */ }
  }
  function cartLines() {
    return Object.keys(cart).map(function (id) {
      var p = byId(id);
      return p ? { p: p, qty: cart[id] } : null;
    }).filter(Boolean);
  }
  function cartCount() {
    return cartLines().reduce(function (n, l) { return n + l.qty; }, 0);
  }
  function cartTotal() {
    return cartLines().reduce(function (n, l) { return n + l.p.price * l.qty; }, 0);
  }

  var cartEl = $("#cart");
  var overlay = $("#cartOverlay");
  var cartBody = $("#cartBody");

  function renderCart() {
    var lines = cartLines();
    $("#cartCount").textContent = cartCount();
    $("#cartTotal").textContent = fmt(cartTotal());
    $("#orderAll").disabled = lines.length === 0;
    if (!lines.length) {
      cartBody.innerHTML = '<div class="cart-empty"><span class="big">🛒</span><p>Your cart is empty.<br>Add products to order them all at once.</p><a href="#products" class="btn btn-wa btn-sm" data-close>Browse products</a></div>';
      return;
    }
    cartBody.innerHTML = lines.map(function (l) {
      return '<div class="cart-item" data-id="' + l.p.id + '">' +
        '<div class="mini" style="--c1:' + l.p.color[0] + ';--c2:' + l.p.color[1] + '">' + bottleHTML(l.p) + "</div>" +
        '<div><h4>' + esc(l.p.name) + '</h4><div class="unit">' + fmt(l.p.price) + ' each</div>' +
        '<div class="qty"><button data-act="dec" aria-label="Decrease">−</button><span>' + l.qty +
        '</span><button data-act="inc" aria-label="Increase">+</button></div></div>' +
        '<div><div class="line-total">' + fmt(l.p.price * l.qty) + '</div>' +
        '<button class="remove" data-act="remove">Remove</button></div></div>';
    }).join("");
  }

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();
    var p = byId(id);
    toast("Added to cart: " + (p ? p.name : "item"));
    var btn = $("#cartOpen");
    btn.classList.remove("bump");
    void btn.offsetWidth;
    btn.classList.add("bump");
  }

  function changeQty(id, delta) {
    if (!cart[id]) return;
    cart[id] += delta;
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    renderCart();
  }

  function openCart() {
    overlay.hidden = false;
    requestAnimationFrame(function () {
      overlay.classList.add("show");
      cartEl.classList.add("open");
    });
    cartEl.setAttribute("aria-hidden", "false");
    renderCart();
  }
  function closeCart() {
    cartEl.classList.remove("open");
    overlay.classList.remove("show");
    cartEl.setAttribute("aria-hidden", "true");
    setTimeout(function () { if (!overlay.classList.contains("show")) overlay.hidden = true; }, 420);
  }

  $("#cartOpen").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCart(); });

  cartBody.addEventListener("click", function (e) {
    var btn = e.target.closest("button, [data-close]");
    if (btn && btn.hasAttribute("data-close")) { closeCart(); return; }
    if (!btn) return;
    var item = btn.closest(".cart-item");
    if (!item) return;
    var id = item.getAttribute("data-id");
    var act = btn.getAttribute("data-act");
    if (act === "inc") changeQty(id, 1);
    if (act === "dec") changeQty(id, -1);
    if (act === "remove") { delete cart[id]; saveCart(); renderCart(); }
  });

  $("#clearCart").addEventListener("click", function () {
    cart = {}; saveCart(); renderCart(); toast("Cart cleared");
  });

  $("#orderAll").addEventListener("click", function () {
    var lines = cartLines();
    if (!lines.length) return;
    var msg = "Hello Health and Awareness Centre, I would like to place this order:\n\n";
    lines.forEach(function (l, i) {
      msg += (i + 1) + ". " + l.p.name + " x" + l.qty + " — " + fmt(l.p.price * l.qty) + "\n";
    });
    msg += "\nTotal: " + fmt(cartTotal()) + "\n\nPlease confirm availability and delivery to my county.";
    window.open(waLink(msg), "_blank", "noopener");
  });

  // ---------- TOAST ----------
  var toastEl = $("#toast");
  var toastTimer = null;
  function toast(text) {
    toastEl.textContent = text;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  // ---------- PRODUCTS: filter, search, sort, render ----------
  var state = { cat: "All", q: "", sort: "default" };
  var grid = $("#productGrid");
  var chips = $("#chips");
  var emptyState = $("#emptyState");

  D.categories.forEach(function (c) {
    var b = document.createElement("button");
    b.className = "chip" + (c === state.cat ? " active" : "");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.textContent = c;
    b.addEventListener("click", function () {
      state.cat = c;
      $$(".chip", chips).forEach(function (x) { x.classList.toggle("active", x === b); });
      renderProducts();
    });
    chips.appendChild(b);
  });

  function visibleProducts() {
    var q = state.q.trim().toLowerCase();
    var list = D.products.filter(function (p) {
      var okCat = state.cat === "All" || p.category === state.cat;
      var okQ = !q || (p.name + " " + p.category + " " + p.short).toLowerCase().indexOf(q) !== -1;
      return okCat && okQ;
    });
    if (state.sort === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
    if (state.sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
    if (state.sort === "name") list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return list;
  }

  function productCardHTML(p, i) {
    return '<article class="product-card" style="--c1:' + p.color[0] + ';--c2:' + p.color[1] +
      ";--d:" + Math.min(i * 60, 600) + 'ms" data-id="' + p.id + '">' +
      '<div class="card-visual">' +
      (p.rx ? '<span class="badge rx">Consult first</span>' : "") +
      '<div class="bottle-wrap">' + bottleHTML(p) + "</div></div>" +
      '<div class="card-body">' +
      '<span class="card-cat">' + esc(p.category) + "</span>" +
      '<h3 class="card-name">' + esc(p.name) + "</h3>" +
      '<p class="card-desc">' + esc(p.short) + "</p>" +
      '<div class="card-foot"><span class="price">' + fmt(p.price) + "</span></div>" +
      '<div class="card-actions">' +
      '<a class="btn btn-wa btn-sm" href="' + waLink(productMessage(p)) + '" target="_blank" rel="noopener">Order on WhatsApp</a>' +
      '<button class="btn btn-cart btn-sm" type="button" data-add="' + p.id + '">Add to cart</button>' +
      "</div></div></article>";
  }

  function renderProducts() {
    var list = visibleProducts();
    grid.innerHTML = list.map(productCardHTML).join("");
    emptyState.hidden = list.length > 0;
  }

  grid.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-add]");
    if (btn) addToCart(btn.getAttribute("data-add"));
  });

  $("#searchInput").addEventListener("input", function (e) { state.q = e.target.value; renderProducts(); });
  $("#sortSelect").addEventListener("change", function (e) { state.sort = e.target.value; renderProducts(); });
  renderProducts();

  // ---------- HERO SLIDESHOW (products + happy customer transformations) ----------
  var slidesEl = $("#slides");
  var dotsEl = $("#dots");
  var counterEl = $("#slideCounter");
  var bar = $("#progressBar");
  var showcase = $("#showcase");

  var items = [];
  var t = 0;
  D.products.forEach(function (p, i) {
    items.push({ type: "product", p: p });
    if ((i + 1) % 4 === 0 && t < D.transformations.length) items.push({ type: "transform", t: D.transformations[t++] });
  });

  var slideHTML = items.map(function (it) {
    if (it.type === "product") {
      var p = it.p;
      return '<div class="slide slide-product" style="--c1:' + p.color[0] + ';--c2:' + p.color[1] + '">' +
        '<span class="cat-tag">' + esc(p.category) + "</span>" +
        '<div class="slide-bottle">' + bottleHTML(p, true) + "</div>" +
        '<div class="slide-info"><div><h4>' + esc(p.name) + '</h4><span class="price">' + fmt(p.price) + "</span></div>" +
        '<a class="btn btn-wa btn-sm" href="' + waLink(productMessage(p)) + '" target="_blank" rel="noopener">Order</a></div>' +
        "</div>";
    }
    var tr = it.t;
    return '<div class="slide slide-transform">' +
      '<img src="' + tr.image + '" alt="Happy customer ' + esc(tr.name) + ' from ' + esc(tr.city) + '" loading="lazy" />' +
      '<span class="transform-tag">Transformation</span>' +
      '<span class="illustrative">Illustrative photo</span>' +
      '<div class="transform-text"><div class="stars">★★★★★</div><p class="quote">“' + esc(tr.quote) + '”</p>' +
      '<span class="who">' + esc(tr.name) + " · " + esc(tr.city) + "</span></div></div>";
  }).join("");
  slidesEl.innerHTML = slideHTML;

  var slideEls = $$(".slide", slidesEl);
  dotsEl.innerHTML = slideEls.map(function (_, i) {
    return '<button class="dot" type="button" aria-label="Show slide ' + (i + 1) + '"></button>';
  }).join("");
  var dotEls = $$(".dot", dotsEl);

  var current = 0;
  var slideTimer = null;
  var slidePaused = false;

  function showSlide(i) {
    var n = slideEls.length;
    current = (i + n) % n;
    slideEls.forEach(function (s, k) {
      s.classList.toggle("active", k === current);
      s.classList.toggle("prev", k === (current - 1 + n) % n);
    });
    dotEls.forEach(function (d, k) { d.classList.toggle("active", k === current); });
    counterEl.textContent = String(current + 1).padStart(2, "0") + " / " + String(n).padStart(2, "0");
    restartBar();
  }

  function restartBar() {
    bar.classList.remove("run");
    void bar.offsetWidth;
    if (!slidePaused) bar.classList.add("run");
  }

  function startSlides() {
    clearInterval(slideTimer);
    slideTimer = setInterval(function () { showSlide(current + 1); }, SLIDE_MS);
    slidePaused = false;
    restartBar();
  }
  function stopSlides() {
    clearInterval(slideTimer);
    slidePaused = true;
    bar.classList.remove("run");
  }

  dotEls.forEach(function (d, k) {
    d.addEventListener("click", function () { showSlide(k); startSlides(); });
  });
  showcase.addEventListener("mouseenter", stopSlides);
  showcase.addEventListener("mouseleave", startSlides);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopSlides(); else startSlides();
  });

  showSlide(0);
  startSlides();

  // ---------- SLOGAN: cycle the highlight through the three words ----------
  var slogan = $$(".sw");
  var swIdx = 0;
  function highlightWord() {
    slogan.forEach(function (w, k) { w.classList.toggle("hi", k === swIdx); });
    swIdx = (swIdx + 1) % slogan.length;
  }
  if (slogan.length) { highlightWord(); setInterval(highlightWord, SLIDE_MS); }

  // ---------- REVIEWS (3 at a time, refresh every 5 seconds) ----------
  var reviews = D.reviews;
  var track = $("#reviewsTrack");
  var rDots = $("#reviewDots");
  var rCount = $("#reviewCount");
  var groups = Math.ceil(reviews.length / REVIEWS_PER_VIEW);
  var group = 0;
  var reviewTimer = null;

  rDots.innerHTML = Array.apply(null, new Array(groups)).map(function (_, i) {
    return '<button class="dot" type="button" aria-label="Show reviews group ' + (i + 1) + '"></button>';
  }).join("");
  var rDotEls = $$(".dot", rDots);

  function renderReviews() {
    var html = "";
    for (var k = 0; k < REVIEWS_PER_VIEW; k++) {
      var r = reviews[(group * REVIEWS_PER_VIEW + k) % reviews.length];
      html += '<figure class="review" style="--d:' + (k * 120) + 'ms">' +
        '<span class="quote-mark" aria-hidden="true">”</span>' +
        '<div class="stars" aria-label="' + r.rating + ' out of 5 stars">' + starsHTML(r.rating) + "</div>" +
        "<p>" + esc(r.text) + "</p>" +
        '<figcaption class="review-by"><span class="avatar" style="background:' + hashColor(r.name) + '">' + esc(initials(r.name)) + "</span>" +
        "<div><strong>" + esc(r.name) + "</strong><small>" + esc(r.county) + " County</small></div></figcaption></figure>";
    }
    track.innerHTML = html;
    rDotEls.forEach(function (d, k) { d.classList.toggle("active", k === group); });
    var from = group * REVIEWS_PER_VIEW + 1;
    var to = Math.min(from + REVIEWS_PER_VIEW - 1, reviews.length);
    rCount.textContent = "Showing " + from + "–" + to + " of " + reviews.length;
  }

  function nextReviews() { group = (group + 1) % groups; renderReviews(); }
  function startReviews() { clearInterval(reviewTimer); reviewTimer = setInterval(nextReviews, REVIEW_MS); }
  function stopReviews() { clearInterval(reviewTimer); }

  rDotEls.forEach(function (d, k) {
    d.addEventListener("click", function () { group = k; renderReviews(); startReviews(); });
  });
  track.addEventListener("mouseenter", stopReviews);
  track.addEventListener("mouseleave", startReviews);
  renderReviews();
  startReviews();

  // ---------- CONTACT FORM -> WhatsApp ----------
  var countySel = $("#fCounty");
  var productSel = $("#fProduct");
  countySel.innerHTML = '<option value="">Select county</option>' +
    D.counties.map(function (c) { return "<option>" + esc(c) + "</option>"; }).join("");
  productSel.innerHTML = '<option value="General enquiry">General enquiry</option>' +
    D.products.map(function (p) { return "<option>" + esc(p.name) + "</option>"; }).join("");

  var form = $("#contactForm");
  var formError = $("#formError");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#fName").value.trim();
    var phone = $("#fPhone").value.replace(/\D/g, "");
    var county = countySel.value;
    var product = productSel.value;
    var message = $("#fMsg").value.trim();

    if (name.length < 2 || phone.length < 9) {
      formError.hidden = false;
      form.classList.remove("shake");
      void form.offsetWidth;
      form.classList.add("shake");
      return;
    }
    formError.hidden = true;

    var msg = "Hello Health and Awareness Centre, my name is " + name + " (" + $("#fPhone").value.trim() + ")" +
      (county ? " from " + county + " County" : "") + ".\nInterested in: " + product + ".";
    if (message) msg += "\n\n" + message;
    window.open(waLink(msg), "_blank", "noopener");
    toast("Opening WhatsApp with your message…");
    form.reset();
  });

  // ---------- INITIAL CART STATE ----------
  renderCart();
})();
