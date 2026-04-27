function getMainMenu() {
  return {
    inline_keyboard: [
      [{ text: '🛒 Buy Products', callback_data: 'buy_products' }],
      [{ text: '📦 My Orders', callback_data: 'my_orders' }],
      [{ text: '📞 Support', callback_data: 'support' }],
    ],
  };
}

function getCategoryMenu() {
  return {
    inline_keyboard: [
      [{ text: '🔐 VPN', callback_data: 'category_vpn' }],
      [{ text: '🎮 Game Currency', callback_data: 'category_game_currency' }],
      [{ text: '⬅️ Back', callback_data: 'back_main' }],
    ],
  };
}

function getVpnMenu() {
  return {
    inline_keyboard: [
      [{ text: '1 Month - 3000 Ks', callback_data: 'product_vpn_1_month' }],
      [{ text: '3 Months - 8000 Ks', callback_data: 'product_vpn_3_months' }],
      [{ text: '⬅️ Back', callback_data: 'back_categories' }],
    ],
  };
}

function getGameCurrencyMenu() {
  return {
    inline_keyboard: [
      [{ text: 'Mobile Legends', callback_data: 'product_mobile_legends' }],
      [{ text: '⬅️ Back', callback_data: 'back_categories' }],
    ],
  };
}

function getOrderSummaryMenu() {
  return {
    inline_keyboard: [
      [{ text: '✅ Confirm Order', callback_data: 'confirm_order' }],
      [{ text: '❌ Cancel', callback_data: 'cancel_order' }],
    ],
  };
}

function getAdminOrderMenu(orderId) {
  return {
    inline_keyboard: [
      [{ text: '✅ Confirm Order', callback_data: `admin_confirm:${orderId}` }],
      [{ text: '❌ Cancel Order', callback_data: `admin_cancel:${orderId}` }],
    ],
  };
}

module.exports = {
  getMainMenu,
  getCategoryMenu,
  getVpnMenu,
  getGameCurrencyMenu,
  getOrderSummaryMenu,
  getAdminOrderMenu,
};
