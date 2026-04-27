const {
  getMainMenu,
  getCategoryMenu,
  getVpnMenu,
  getGameCurrencyMenu,
  getOrderSummaryMenu,
} = require('../utils/menu');
const {
  setSelectedProduct,
  setAwaitingPaymentScreenshot,
  getOrderDetails,
  clearOrder,
  upsertTelegramUser,
} = require('../utils/sessionStore');
const { getLatestOrderByChatId } = require('../utils/orderStore');

const productCatalog = {
  product_vpn_1_month: {
    name: 'VPN - 1 Month',
    price: '3000 Ks',
  },
  product_vpn_3_months: {
    name: 'VPN - 3 Months',
    price: '8000 Ks',
  },
  product_mobile_legends: {
    name: 'Mobile Legends',
    price: 'Ask admin',
  },
};

async function showMenu(bot, query, text, replyMarkup) {
  await bot.answerCallbackQuery(query.id);
  await bot.sendMessage(query.message.chat.id, text, {
    reply_markup: replyMarkup,
  });
}

function getTelegramUsername(user) {
  if (user.username) {
    return `@${user.username}`;
  }

  return [user.first_name, user.last_name].filter(Boolean).join(' ') || 'Unknown user';
}

function getOrderUsername(customer) {
  return getTelegramUsername(customer);
}

function registerMenuHandler(bot) {
  bot.on('callback_query', async (query) => {
    if ((query.data || '').startsWith('admin_')) {
      return;
    }

    const selectedProduct = productCatalog[query.data];

    if (selectedProduct) {
      await setSelectedProduct(query.message.chat.id, query.from, selectedProduct);
      await bot.answerCallbackQuery(query.id, {
        text: 'Product selected',
      });
      await bot.sendMessage(
        query.message.chat.id,
        `You selected: ${selectedProduct.name}\nPlease enter your Game ID or username:`
      );
      return;
    }

    switch (query.data) {
      case 'buy_products':
        await showMenu(bot, query, 'Choose a product category:', getCategoryMenu());
        return;
      case 'category_vpn':
        await showMenu(bot, query, 'Select a VPN plan:', getVpnMenu());
        return;
      case 'category_game_currency':
        await showMenu(
          bot,
          query,
          'Select a game currency product:',
          getGameCurrencyMenu()
        );
        return;
      case 'my_orders': {
        const draftOrder = await getOrderDetails(query.message.chat.id);
        const latestOrder = await getLatestOrderByChatId(query.message.chat.id);
        const text = draftOrder.selectedProduct
          ? [
              'Current draft order',
              `Product: ${draftOrder.selectedProduct.name}`,
              `Game ID: ${draftOrder.gameId || 'Not provided yet'}`,
              `Price: ${draftOrder.selectedProduct.price}`,
            ].join('\n')
          : latestOrder
            ? [
                'Latest saved order',
                `Product: ${latestOrder.product_name}`,
                `Game ID: ${latestOrder.game_id}`,
                `Price: ${latestOrder.price}`,
                `Status: ${latestOrder.status}`,
              ].join('\n')
            : 'You have not selected any product yet.';
        await showMenu(bot, query, text, getMainMenu());
        return;
      }
      case 'support':
        await showMenu(
          bot,
          query,
          'You selected: Support',
          getMainMenu()
        );
        return;
      case 'back_main':
        await showMenu(bot, query, 'Back to main menu:', getMainMenu());
        return;
      case 'back_categories':
        await showMenu(bot, query, 'Choose a product category:', getCategoryMenu());
        return;
      case 'confirm_order': {
        await upsertTelegramUser(query.from, query.message.chat.id);
        const order = await getOrderDetails(query.message.chat.id);
        if (!order.selectedProduct || !order.gameId) {
          await bot.answerCallbackQuery(query.id, {
            text: 'Order information is incomplete.',
          });
          return;
        }
        await bot.answerCallbackQuery(query.id, {
          text: 'Order confirmed',
        });
        await setAwaitingPaymentScreenshot(query.message.chat.id, true);
        const username = getOrderUsername(query.from);
        await bot.sendMessage(
          query.message.chat.id,
          [
            'Your order details have been saved.',
            `Product: ${order.selectedProduct.name}`,
            `Game ID: ${order.gameId}`,
            `Price: ${order.selectedProduct.price}`,
            `User: ${username}`,
            'Please upload your payment screenshot.',
          ].join('\n'),
        );
        return;
      }
      case 'cancel_order':
        await clearOrder(query.message.chat.id);
        await showMenu(
          bot,
          query,
          'Your order has been canceled.',
          getMainMenu()
        );
        return;
      default:
        await bot.answerCallbackQuery(query.id, {
          text: 'Unknown menu option.',
        });
    }
  });
}

module.exports = { registerMenuHandler };
