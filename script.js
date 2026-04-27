const STORAGE_KEYS = {
  products: "neonvault_products",
  purchases: "neonvault_purchases",
  payments: "neonvault_payments",
  posts: "neonvault_posts",
  session: "neonvault_session",
  viewed: "neonvault_viewed"
};

const ADMIN_SECRET = "neonadmin";
const ADMIN_SESSION_KEY = "neonvault_admin_session";

const BACKEND_CONFIG = window.NEONVAULT_BACKEND_CONFIG || {
  enabled: false,
  baseUrl: "",
  notes: "LocalStorage mode"
};

const seedProducts = [
  {
    id: "prod-vpn-pro",
    title: "Ultra VPN Premium Access",
    price: 8.99,
    category: "VPN",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
    video: "https://www.youtube.com/embed/bixR-KIJKYM",
    fileUrl: "https://github.com/github/gitignore/archive/refs/heads/main.zip",
    description: "Fast premium VPN account bundle with setup guide, region list, and recommended devices for private browsing."
  },
  {
    id: "prod-course-js",
    title: "JavaScript Mastery Crash Course",
    price: 24.5,
    category: "Course",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    video: "https://www.youtube.com/embed/PkZNo7MFNFg",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "Recorded lessons, PDF notes, and project files for learners who want a practical front-end foundation."
  },
  {
    id: "prod-capcut-pack",
    title: "CapCut Premium Template Pack",
    price: 14,
    category: "CapCut",
    image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=900&q=80",
    video: "https://www.youtube.com/embed/GbB1JZLF6iQ",
    fileUrl: "https://github.com/mdn/css-examples/archive/refs/heads/main.zip",
    description: "Trending reels templates, cinematic transitions, overlays, and content presets for fast editing."
  },
  {
    id: "prod-mlbb-topup",
    title: "MLBB Diamond Top-Up Pack",
    price: 5.75,
    category: "Game Currency",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    video: "",
    fileUrl: "https://raw.githubusercontent.com/github/gitignore/main/README.md",
    description: "Digital delivery instructions and redeem support for MLBB currency top-ups with premium bonus info."
  },
  {
    id: "prod-pubg-uc",
    title: "PUBG UC Boost Bundle",
    price: 12.25,
    category: "Game Currency",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    video: "",
    fileUrl: "https://raw.githubusercontent.com/mdn/content/main/README.md",
    description: "Step-by-step purchase redemption guide and access notes for PUBG UC digital top-up buyers."
  },
  {
    id: "prod-design-kit",
    title: "Creator Asset Mega Bundle",
    price: 19.99,
    category: "Bundle",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    video: "https://www.youtube.com/embed/1Rs2ND1ryYc",
    fileUrl: "https://github.com/twbs/bootstrap/archive/refs/heads/main.zip",
    description: "Fonts, overlays, mockups, UI assets, icons, and brand templates for creators and marketers."
  }
];

const seedPosts = [
  {
    id: "post-launch",
    title: "NeonVault is live",
    tag: "Launch",
    content: "Welcome to the first version of our digital marketplace. Browse premium access products, learning resources, and top-up bundles in one place.",
    createdAt: new Date().toISOString()
  },
  {
    id: "post-community",
    title: "Community promos are coming soon",
    tag: "Community",
    content: "We will start posting discount campaigns, new arrivals, and community event updates here. You can add and edit these posts from the admin page.",
    createdAt: new Date().toISOString()
  }
];

function loadJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureSeedData() {
  if (!localStorage.getItem(STORAGE_KEYS.products)) {
    saveJSON(STORAGE_KEYS.products, seedProducts);
  }
  if (!localStorage.getItem(STORAGE_KEYS.posts)) {
    saveJSON(STORAGE_KEYS.posts, seedPosts);
  }
  if (!localStorage.getItem(STORAGE_KEYS.purchases)) {
    saveJSON(STORAGE_KEYS.purchases, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.payments)) {
    saveJSON(STORAGE_KEYS.payments, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.viewed)) {
    saveJSON(STORAGE_KEYS.viewed, []);
  }
}

function getProducts() {
  return loadJSON(STORAGE_KEYS.products, []);
}

function getPosts() {
  return loadJSON(STORAGE_KEYS.posts, []);
}

function getPurchases() {
  return loadJSON(STORAGE_KEYS.purchases, []);
}

function getPayments() {
  return loadJSON(STORAGE_KEYS.payments, []);
}

function getSession() {
  return loadJSON(STORAGE_KEYS.session, null);
}

function setSession(session) {
  if (session) {
    saveJSON(STORAGE_KEYS.session, session);
  } else {
    localStorage.removeItem(STORAGE_KEYS.session);
  }
}

function currency(value) {
  return `$${Number(value).toFixed(2)}`;
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function generateId(prefix, value) {
  return `${prefix}-${slugify(value)}-${Date.now().toString(36)}`;
}

function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

function embedUrl(url) {
  if (!url) {
    return "";
  }
  if (url.includes("youtube.com/embed/")) {
    return url;
  }
  try {
    const parsed = new URL(url);
    const videoId = parsed.searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (error) {
    return url;
  }
  return url;
}

function isAdminUnlocked() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function unlockAdmin(key) {
  if (key !== ADMIN_SECRET) {
    return false;
  }
  sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  return true;
}

function lockAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

function renderProductCard(product, { showCategory = true } = {}) {
  return `
    <article class="product-card">
      <img src="${product.image}" alt="${product.title}">
      <div class="product-card-content">
        <div class="product-meta">
          ${showCategory ? `<span class="category-chip">${product.category}</span>` : "<span></span>"}
          <span class="price-tag">${currency(product.price)}</span>
        </div>
        <h3>${product.title}</h3>
        <p class="product-description">${product.description}</p>
        <a class="button button-primary" href="product.html?id=${product.id}">View Details</a>
      </div>
    </article>
  `;
}

function updateNavState() {
  const nav = qs(".site-nav");
  const toggle = qs(".menu-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }
}

function ensureGlobalUserUI() {
  if (!qs("#login-modal")) {
    document.body.insertAdjacentHTML("beforeend", `
      <div id="login-modal" class="modal hidden" aria-hidden="true">
        <div class="modal-card">
          <button class="modal-close" type="button" data-close-login>&times;</button>
          <p class="panel-label">Fake Login</p>
          <h3>Save your purchases locally</h3>
          <form id="login-form" class="stack-form">
            <label>
              Display Name
              <input type="text" id="login-name" placeholder="Enter your buyer name" required>
            </label>
            <button class="button button-primary" type="submit">Continue</button>
          </form>
        </div>
      </div>
    `);
  }

  if (!qs(".floating-userbar")) {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="floating-userbar">
        <span id="current-user-label">Guest mode</span>
        <button id="open-login" class="button button-secondary button-small" type="button">Login</button>
        <button id="logout-button" class="button button-ghost button-small hidden" type="button">Logout</button>
      </div>
    `);
  }
}

function initLoginUI() {
  const modal = qs("#login-modal");
  const openButton = qs("#open-login");
  const closeButton = qs("[data-close-login]");
  const logoutButton = qs("#logout-button");
  const label = qs("#current-user-label");
  const loginForm = qs("#login-form");
  const session = getSession();

  if (label) {
    label.textContent = session?.name ? `Logged in as ${session.name}` : "Guest mode";
  }
  if (openButton) {
    openButton.classList.toggle("hidden", Boolean(session));
    openButton.addEventListener("click", () => modal?.classList.remove("hidden"));
  }
  if (logoutButton) {
    logoutButton.classList.toggle("hidden", !session);
    logoutButton.addEventListener("click", () => {
      setSession(null);
      window.location.reload();
    });
  }
  closeButton?.addEventListener("click", () => modal?.classList.add("hidden"));
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = qs("#login-name");
    const name = nameInput.value.trim();
    if (!name) {
      return;
    }
    setSession({ name, createdAt: new Date().toISOString() });
    modal.classList.add("hidden");
    window.location.reload();
  });
}

function initHomePage() {
  const products = getProducts();
  const posts = [...getPosts()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const featuredContainer = qs("#featured-products");
  const postList = qs("#post-list");

  if (featuredContainer) {
    featuredContainer.innerHTML = products.slice(0, 3).map((product) => renderProductCard(product)).join("");
  }

  if (postList) {
    postList.innerHTML = posts.map((post) => `
      <article class="post-card">
        <div class="post-meta">
          <span class="category-chip">${post.tag}</span>
          <span class="muted">${new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.content}</p>
      </article>
    `).join("");
  }

  const categories = new Set(products.map((item) => item.category));
  qs('[data-stat="products"]')?.replaceChildren(document.createTextNode(String(products.length)));
  qs('[data-stat="categories"]')?.replaceChildren(document.createTextNode(String(categories.size)));
  qs('[data-stat="posts"]')?.replaceChildren(document.createTextNode(String(posts.length)));
}

function initProductsPage() {
  const searchInput = qs("#product-search");
  const filterSelect = qs("#category-filter");
  const grid = qs("#product-grid");
  const empty = qs("#empty-products");
  const products = getProducts();
  const categories = [...new Set(products.map((item) => item.category))];

  if (filterSelect) {
    filterSelect.innerHTML += categories.map((category) => `<option value="${category}">${category}</option>`).join("");
  }

  function renderFilteredProducts() {
    const term = searchInput?.value.trim().toLowerCase() || "";
    const category = filterSelect?.value || "all";
    const filtered = products.filter((product) => {
      const matchesTerm =
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);
      const matchesCategory = category === "all" || product.category === category;
      return matchesTerm && matchesCategory;
    });

    grid.innerHTML = filtered.map((product) => renderProductCard(product)).join("");
    empty?.classList.toggle("hidden", filtered.length > 0);
  }

  searchInput?.addEventListener("input", renderFilteredProducts);
  filterSelect?.addEventListener("change", renderFilteredProducts);
  renderFilteredProducts();
}

function saveRecentlyViewed(productId) {
  const viewed = loadJSON(STORAGE_KEYS.viewed, []);
  const next = [productId, ...viewed.filter((id) => id !== productId)].slice(0, 4);
  saveJSON(STORAGE_KEYS.viewed, next);
}

function hasPurchased(productId) {
  const session = getSession();
  const purchases = getPurchases();
  if (!session?.name) {
    return false;
  }
  return purchases.some((entry) => entry.productId === productId && entry.buyerName === session.name);
}

function initProductDetailPage() {
  const container = qs("#product-detail-view");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = getProducts().find((item) => item.id === id);

  if (!container) {
    return;
  }

  if (!product) {
    container.innerHTML = `<p class="empty-state">Product not found. Return to <a class="text-link" href="products.html">products</a>.</p>`;
    return;
  }

  saveRecentlyViewed(product.id);
  const unlocked = hasPurchased(product.id);

  container.innerHTML = `
    <section class="detail-layout">
      <article class="detail-card detail-media">
        <img src="${product.image}" alt="${product.title}">
        ${product.video ? `<iframe class="video-frame" src="${embedUrl(product.video)}" title="${product.title} preview video" loading="lazy" allowfullscreen></iframe>` : ""}
      </article>
      <article class="detail-card detail-copy">
        <span class="category-chip">${product.category}</span>
        <h1>${product.title}</h1>
        <p class="price-tag">${currency(product.price)}</p>
        <p>${product.description}</p>
        <ul class="detail-points">
          <li>Manual payment proof supported</li>
          <li>Buyer name stored locally for access</li>
          <li>Download unlock after successful submission</li>
        </ul>
        <div class="detail-actions">
          <a class="button button-secondary" href="products.html">Back to Products</a>
          ${unlocked ? `<a class="button button-primary" href="${product.fileUrl}" target="_blank" rel="noopener">Download Now</a>` : `<a class="button button-primary" href="#payment-form">Buy Now</a>`}
        </div>
        <section class="payment-box">
          <p class="panel-label">Manual Checkout</p>
          <h3>Pay and submit proof</h3>
          <div class="payment-methods">
            <span>KBZPay</span>
            <span>WavePay</span>
            <span>Manual transfer</span>
          </div>
          <p>Send payment to your business account, then submit your name and screenshot below. Version 1 unlocks the file immediately after submission.</p>
          <form id="payment-form" class="stack-form">
            <label>
              Buyer Name
              <input type="text" id="buyer-name" value="${getSession()?.name || ""}" placeholder="Enter your name" required>
            </label>
            <label>
              Payment Screenshot
              <input type="file" id="payment-screenshot" accept="image/*" required>
            </label>
            <button class="button button-primary" type="submit">Submit Payment</button>
          </form>
          <div id="payment-confirmation" class="confirmation-box hidden"></div>
        </section>
      </article>
    </section>
  `;

  qs("#payment-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const buyerName = qs("#buyer-name").value.trim();
    const fileInput = qs("#payment-screenshot");
    const file = fileInput.files?.[0];
    const confirmation = qs("#payment-confirmation");

    if (!buyerName || !file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const payments = getPayments();
      const purchases = getPurchases();

      payments.unshift({
        id: generateId("payment", product.title),
        productId: product.id,
        productTitle: product.title,
        buyerName,
        method: "Manual",
        proofImage: reader.result,
        submittedAt: new Date().toISOString()
      });
      saveJSON(STORAGE_KEYS.payments, payments);

      const existingPurchase = purchases.find((entry) => entry.productId === product.id && entry.buyerName === buyerName);
      if (!existingPurchase) {
        purchases.unshift({
          id: generateId("purchase", product.title),
          productId: product.id,
          buyerName,
          fileUrl: product.fileUrl,
          unlocked: true,
          purchasedAt: new Date().toISOString()
        });
        saveJSON(STORAGE_KEYS.purchases, purchases);
      }

      setSession({ name: buyerName, createdAt: new Date().toISOString() });
      confirmation.classList.remove("hidden");
      confirmation.innerHTML = `Payment saved for <strong>${buyerName}</strong>. Your purchase is unlocked now. <a class="text-link" href="${product.fileUrl}" target="_blank" rel="noopener">Download product</a> or open <a class="text-link" href="dashboard.html">My Purchases</a>.`;
    };
    reader.readAsDataURL(file);
  });
}

function initDashboardPage() {
  const list = qs("#purchase-list");
  const empty = qs("#empty-purchases");
  const userLine = qs("#dashboard-user-line");
  const recent = qs("#recently-viewed");
  const session = getSession();
  const purchases = getPurchases();
  const products = getProducts();
  const viewed = loadJSON(STORAGE_KEYS.viewed, []);

  if (userLine) {
    userLine.textContent = session?.name ? `You are currently browsing as ${session.name}.` : "You are currently browsing as Guest.";
  }

  const myPurchases = session?.name ? purchases.filter((entry) => entry.buyerName === session.name) : [];

  if (list) {
    list.innerHTML = myPurchases.map((purchase) => {
      const product = products.find((item) => item.id === purchase.productId);
      if (!product) {
        return "";
      }
      return `
        <article class="purchase-card">
          <img class="purchase-thumb" src="${product.image}" alt="${product.title}">
          <div class="purchase-meta">
            <div>
              <span class="category-chip">${product.category}</span>
              <h3>${product.title}</h3>
              <p class="muted">Purchased on ${new Date(purchase.purchasedAt).toLocaleString()}</p>
            </div>
            <div class="status-chip">${purchase.unlocked ? "Unlocked" : "Pending"}</div>
          </div>
          <div class="button-row">
            <a class="button button-secondary" href="product.html?id=${product.id}">Details</a>
            <a class="button button-primary" href="${purchase.fileUrl}" target="_blank" rel="noopener">Download</a>
          </div>
        </article>
      `;
    }).join("");
  }

  empty?.classList.toggle("hidden", myPurchases.length > 0);

  if (recent) {
    const recentProducts = viewed.map((id) => products.find((item) => item.id === id)).filter(Boolean);
    recent.innerHTML = recentProducts.length
      ? recentProducts.map((product) => renderProductCard(product, { showCategory: true })).join("")
      : `<p class="empty-state">No recently viewed products yet.</p>`;
  }
}

function initAdminPage() {
  const adminLock = qs("#admin-lock");
  const adminPanel = qs("#admin-panel");
  const accessForm = qs("#admin-access-form");

  if (!isAdminUnlocked()) {
    adminLock?.classList.remove("hidden");
    adminPanel?.classList.add("hidden");
  } else {
    adminLock?.classList.add("hidden");
    adminPanel?.classList.remove("hidden");
  }

  accessForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const key = qs("#admin-access-key").value.trim();
    if (unlockAdmin(key)) {
      window.location.href = "admin.html";
      return;
    }
    alert("Incorrect secret key.");
  });

  if (!isAdminUnlocked()) {
    return;
  }

  const productForm = qs("#product-form");
  const postForm = qs("#post-form");
  const productList = qs("#admin-product-list");
  const postList = qs("#admin-post-list");
  const paymentList = qs("#payment-list");
  const adminLogout = qs("#admin-logout");
  const backendModeTitle = qs("#backend-mode-title");
  const backendModeCopy = qs("#backend-mode-copy");

  if (backendModeTitle) {
    backendModeTitle.textContent = BACKEND_CONFIG.enabled ? "Current mode: backend connected" : "Current mode: frontend demo";
  }
  if (backendModeCopy) {
    backendModeCopy.textContent = BACKEND_CONFIG.enabled
      ? `Connected to ${BACKEND_CONFIG.baseUrl || "configured API"}. Replace LocalStorage reads and writes with your live backend endpoints as you expand the app.`
      : "This admin is hidden from public navigation, but true protection needs backend authentication and server-side product, post, payment, and download APIs.";
  }

  adminLogout?.addEventListener("click", () => {
    lockAdmin();
    window.location.reload();
  });

  function renderAdminLists() {
    const products = getProducts();
    const posts = [...getPosts()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const payments = [...getPayments()].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    productList.innerHTML = products.map((product) => `
      <article class="admin-item">
        <div class="admin-item-header">
          <div>
            <span class="category-chip">${product.category}</span>
            <h3>${product.title}</h3>
          </div>
          <span class="price-tag">${currency(product.price)}</span>
        </div>
        <p>${product.description}</p>
        <div class="admin-actions">
          <button class="button button-secondary" type="button" data-edit-product="${product.id}">Edit Product</button>
          <button class="button button-ghost" type="button" data-delete-product="${product.id}">Delete Product</button>
        </div>
      </article>
    `).join("");

    postList.innerHTML = posts.map((post) => `
      <article class="admin-item">
        <div class="admin-item-header">
          <div>
            <span class="category-chip">${post.tag}</span>
            <h3>${post.title}</h3>
          </div>
          <span class="muted">${new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <p>${post.content}</p>
        <div class="admin-actions">
          <button class="button button-secondary" type="button" data-edit-post="${post.id}">Edit Post</button>
          <button class="button button-ghost" type="button" data-delete-post="${post.id}">Delete Post</button>
        </div>
      </article>
    `).join("");

    paymentList.innerHTML = payments.length ? payments.map((payment) => `
      <article class="admin-item">
        <div class="admin-item-header">
          <div>
            <span class="category-chip">${payment.method}</span>
            <h3>${payment.productTitle}</h3>
          </div>
          <span class="muted">${new Date(payment.submittedAt).toLocaleString()}</span>
        </div>
        <p><strong>Buyer:</strong> ${payment.buyerName}</p>
        <img src="${payment.proofImage}" alt="Payment proof for ${payment.buyerName}">
      </article>
    `).join("") : `<p class="empty-state">No payment submissions yet.</p>`;
  }

  productForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const products = getProducts();
    const id = qs("#product-id").value;
    const productPayload = {
      id: id || generateId("product", qs("#product-name").value),
      title: qs("#product-name").value.trim(),
      price: Number(qs("#product-price").value),
      category: qs("#product-category").value.trim(),
      image: qs("#product-image").value.trim(),
      video: qs("#product-video").value.trim(),
      fileUrl: qs("#product-file").value.trim(),
      description: qs("#product-description").value.trim()
    };

    const existingIndex = products.findIndex((item) => item.id === productPayload.id);
    if (existingIndex >= 0) {
      products[existingIndex] = productPayload;
    } else {
      products.unshift(productPayload);
    }
    saveJSON(STORAGE_KEYS.products, products);
    productForm.reset();
    qs("#product-id").value = "";
    qs('#product-form button[type="submit"]').textContent = "Add Product";
    renderAdminLists();
  });

  postForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const posts = getPosts();
    const id = qs("#post-id").value;
    const postPayload = {
      id: id || generateId("post", qs("#post-title").value),
      title: qs("#post-title").value.trim(),
      tag: qs("#post-tag").value.trim(),
      content: qs("#post-content").value.trim(),
      createdAt: new Date().toISOString()
    };

    const existingIndex = posts.findIndex((item) => item.id === postPayload.id);
    if (existingIndex >= 0) {
      posts[existingIndex] = { ...posts[existingIndex], ...postPayload };
    } else {
      posts.unshift(postPayload);
    }
    saveJSON(STORAGE_KEYS.posts, posts);
    postForm.reset();
    qs("#post-id").value = "";
    qs('#post-form button[type="submit"]').textContent = "Publish Post";
    renderAdminLists();
  });

  qs("#reset-product-form")?.addEventListener("click", () => {
    productForm.reset();
    qs("#product-id").value = "";
    qs('#product-form button[type="submit"]').textContent = "Add Product";
  });

  qs("#reset-post-form")?.addEventListener("click", () => {
    postForm.reset();
    qs("#post-id").value = "";
    qs('#post-form button[type="submit"]').textContent = "Publish Post";
  });

  document.addEventListener("click", (event) => {
    const editProductId = event.target.getAttribute("data-edit-product");
    const deleteProductId = event.target.getAttribute("data-delete-product");
    const editPostId = event.target.getAttribute("data-edit-post");
    const deletePostId = event.target.getAttribute("data-delete-post");

    if (editProductId) {
      const product = getProducts().find((item) => item.id === editProductId);
      if (!product) {
        return;
      }
      qs("#product-id").value = product.id;
      qs("#product-name").value = product.title;
      qs("#product-price").value = product.price;
      qs("#product-category").value = product.category;
      qs("#product-image").value = product.image;
      qs("#product-video").value = product.video;
      qs("#product-file").value = product.fileUrl;
      qs("#product-description").value = product.description;
      qs('#product-form button[type="submit"]').textContent = "Edit Product";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (deleteProductId) {
      const filtered = getProducts().filter((item) => item.id !== deleteProductId);
      saveJSON(STORAGE_KEYS.products, filtered);
      renderAdminLists();
    }

    if (editPostId) {
      const post = getPosts().find((item) => item.id === editPostId);
      if (!post) {
        return;
      }
      qs("#post-id").value = post.id;
      qs("#post-title").value = post.title;
      qs("#post-tag").value = post.tag;
      qs("#post-content").value = post.content;
      qs('#post-form button[type="submit"]').textContent = "Edit Post";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (deletePostId) {
      const filtered = getPosts().filter((item) => item.id !== deletePostId);
      saveJSON(STORAGE_KEYS.posts, filtered);
      renderAdminLists();
    }
  });

  renderAdminLists();
}

function initPage() {
  ensureSeedData();
  ensureGlobalUserUI();
  updateNavState();
  initLoginUI();

  switch (document.body.dataset.page) {
    case "home":
      initHomePage();
      break;
    case "products":
      initProductsPage();
      break;
    case "product-detail":
      initProductDetailPage();
      break;
    case "dashboard":
      initDashboardPage();
      break;
    case "admin":
      initAdminPage();
      break;
    default:
      break;
  }
}

document.addEventListener("DOMContentLoaded", initPage);
