const STORAGE_KEYS = {
  cart: "aurora_cart",
  orders: "aurora_orders",
  profile: "aurora_profile",
  theme: "aurora_theme"
};

export const storeConfig = {
  name: "Aurora Supply",
  currency: "USD",
  supportEmail: "support@aurorasupply.example",
  supportChat: "@aurorasupply",
  paymentMethods: [
    { id: "card", name: "Credit Card", description: "Fastest checkout for gift cards and digital licenses." },
    { id: "wallet", name: "Digital Wallet", description: "Apple Pay, Google Pay, and supported regional wallets." },
    { id: "crypto", name: "Crypto", description: "For global buyers who want instant cross-border checkout." }
  ]
};

export const products = [
  {
    id: "pubg-uc-660",
    name: "PUBG Mobile 660 UC",
    category: "Game Currency",
    slug: "pubg-mobile-660-uc",
    price: 7.99,
    compareAtPrice: 9.99,
    badge: "Best Seller",
    popular: true,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    description: "Fast PUBG Mobile UC delivery for ranked grinders and seasonal event shoppers.",
    details: "Secure top-up flow with order confirmation, account-safe delivery instructions, and a clean checkout built for repeat buyers.",
    deliveryType: "Instant Top Up",
    accountFieldLabel: "Player ID",
    options: [
      { label: "325 UC", price: 4.49 },
      { label: "660 UC", price: 7.99 },
      { label: "1800 UC", price: 19.99 }
    ]
  },
  {
    id: "free-fire-530",
    name: "Free Fire 530 Diamonds",
    category: "Game Currency",
    slug: "free-fire-530-diamonds",
    price: 5.99,
    compareAtPrice: 7.49,
    badge: "Popular",
    popular: true,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    description: "Touch-friendly mobile top-up experience for fast Free Fire diamond purchases.",
    details: "Great for repeat top-ups. Buyers can save their game ID in the dashboard for future checkouts.",
    deliveryType: "Instant Top Up",
    accountFieldLabel: "Free Fire UID",
    options: [
      { label: "110 Diamonds", price: 1.49 },
      { label: "530 Diamonds", price: 5.99 },
      { label: "1080 Diamonds", price: 11.49 }
    ]
  },
  {
    id: "apple-gift-25",
    name: "Apple Gift Card $25",
    category: "Gift Cards",
    slug: "apple-gift-card-25",
    price: 25,
    compareAtPrice: 27,
    badge: "Instant",
    popular: false,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    description: "Premium digital gift card delivery for App Store, iCloud, and Apple services.",
    details: "Delivered digitally with a premium storefront flow that can later connect to inventory and fulfillment APIs.",
    deliveryType: "Gift Card Code",
    accountFieldLabel: "Email Only",
    options: [
      { label: "$10 Card", price: 10 },
      { label: "$25 Card", price: 25 },
      { label: "$50 Card", price: 50 }
    ]
  },
  {
    id: "google-play-20",
    name: "Google Play Gift Card $20",
    category: "Gift Cards",
    slug: "google-play-gift-card-20",
    price: 20,
    compareAtPrice: 22,
    badge: "Fast Delivery",
    popular: true,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80",
    description: "Clean code delivery flow for apps, subscriptions, and in-game spending.",
    details: "Built for mobile shoppers with a swipeable category UI and checkout focused on speed.",
    deliveryType: "Gift Card Code",
    accountFieldLabel: "Email Only",
    options: [
      { label: "$10 Card", price: 10 },
      { label: "$20 Card", price: 20 },
      { label: "$50 Card", price: 50 }
    ]
  },
  {
    id: "steam-wallet-50",
    name: "Steam Wallet Code $50",
    category: "Gift Cards",
    slug: "steam-wallet-code-50",
    price: 50,
    compareAtPrice: 54,
    badge: "Popular",
    popular: true,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80",
    description: "Premium storefront card with one-tap purchase for PC gamers and gift buyers.",
    details: "Ideal for seasonal campaigns and bundles. Future backend hooks can reserve codes and track fulfillment.",
    deliveryType: "Wallet Code",
    accountFieldLabel: "Steam Email",
    options: [
      { label: "$20 Code", price: 20 },
      { label: "$50 Code", price: 50 },
      { label: "$100 Code", price: 100 }
    ]
  },
  {
    id: "windows-pro-key",
    name: "Windows Pro License Key",
    category: "Digital Products",
    slug: "windows-pro-license-key",
    price: 18.99,
    compareAtPrice: 24.99,
    badge: "Top Rated",
    popular: false,
    image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&q=80",
    description: "Digital license delivery with structured checkout data ready for CRM and fulfillment APIs.",
    details: "Designed for high-conversion checkout with clear pricing, summary cards, and reusable product data.",
    deliveryType: "License Key",
    accountFieldLabel: "Email Only",
    options: [
      { label: "1 Device", price: 18.99 },
      { label: "2 Devices", price: 29.99 }
    ]
  },
  {
    id: "creator-bundle",
    name: "Creator Asset Bundle",
    category: "Digital Products",
    slug: "creator-asset-bundle",
    price: 14.99,
    compareAtPrice: 19.99,
    badge: "Bundle",
    popular: false,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    description: "A polished bundle of overlays, presets, mockups, and promo graphics for creators.",
    details: "Good example product for future download delivery APIs, customer entitlements, and license tracking.",
    deliveryType: "Instant Download",
    accountFieldLabel: "Email Only",
    options: [
      { label: "Personal License", price: 14.99 },
      { label: "Commercial License", price: 29.99 }
    ]
  },
  {
    id: "netflix-profile-slot",
    name: "Streaming Profile Slot",
    category: "Digital Products",
    slug: "streaming-profile-slot",
    price: 6.5,
    compareAtPrice: 8.5,
    badge: "Limited",
    popular: false,
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=80",
    description: "Example subscription-style digital access offer with a light, premium UI treatment.",
    details: "Included as a template product type for access-based digital inventory and account-managed delivery.",
    deliveryType: "Account Access",
    accountFieldLabel: "Email / Username",
    options: [
      { label: "30 Days", price: 6.5 },
      { label: "90 Days", price: 17.99 }
    ]
  }
];

export const categories = ["All", "Game Currency", "Gift Cards", "Digital Products"];

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: storeConfig.currency
  }).format(value);
}

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getProductById(id) {
  return products.find((product) => product.id === id) || null;
}

export function getCart() {
  return readStorage(STORAGE_KEYS.cart, []);
}

export function saveCart(cart) {
  writeStorage(STORAGE_KEYS.cart, cart);
}

export function getOrders() {
  return readStorage(STORAGE_KEYS.orders, []);
}

export function saveOrders(orders) {
  writeStorage(STORAGE_KEYS.orders, orders);
}

export function getProfile() {
  return readStorage(STORAGE_KEYS.profile, {
    email: "",
    gameId: "",
    displayName: ""
  });
}

export function saveProfile(profile) {
  writeStorage(STORAGE_KEYS.profile, profile);
}

export function getTheme() {
  return localStorage.getItem(STORAGE_KEYS.theme) || "light";
}

export function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}

export function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal() {
  return getCart().reduce((total, item) => total + item.price * item.quantity, 0);
}

export function addToCart({ productId, optionLabel, quantity }) {
  const product = getProductById(productId);
  if (!product) {
    return null;
  }

  const selectedOption = product.options.find((option) => option.label === optionLabel) || product.options[0];
  const cart = getCart();
  const existing = cart.find(
    (item) => item.productId === productId && item.optionLabel === selectedOption.label
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: `${productId}-${selectedOption.label}`,
      productId,
      name: product.name,
      image: product.image,
      category: product.category,
      optionLabel: selectedOption.label,
      accountFieldLabel: product.accountFieldLabel,
      price: selectedOption.price,
      quantity
    });
  }

  saveCart(cart);
  return { product, selectedOption };
}

export function updateCartQuantity(itemId, quantity) {
  const nextCart = getCart()
    .map((item) => (item.id === itemId ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);
  saveCart(nextCart);
}

export function removeCartItem(itemId) {
  saveCart(getCart().filter((item) => item.id !== itemId));
}

export function clearCart() {
  saveCart([]);
}

export function placeOrder(payload) {
  const orders = getOrders();
  const nextOrder = {
    id: `ORD-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "Processing",
    items: payload.items,
    total: payload.total,
    email: payload.email,
    gameId: payload.gameId,
    paymentMethod: payload.paymentMethod
  };
  orders.unshift(nextOrder);
  saveOrders(orders);
  saveProfile({
    ...getProfile(),
    email: payload.email,
    gameId: payload.gameId
  });
  clearCart();
  return nextOrder;
}
