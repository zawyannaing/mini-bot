const { getAdminOrderMenu } = require('../utils/menu');
const {
  isAwaitingPaymentScreenshot,
  getOrderDetails,
  clearOrder,
  upsertTelegramUser,
} = require('../utils/sessionStore');
const { createPendingOrder, setAdminMessage } = require('../utils/orderStore');

function getTelegramUsername(user) {
  if (user.username) {
    return `@${user.username}`;
  }

  return [user.first_name, user.last_name].filter(Boolean).join(' ') || 'Unknown user';
}

function registerPaymentHandler(bot, adminChatId) {
  bot.on('message', async (msg) => {
    if (!(await isAwaitingPaymentScreenshot(msg.chat.id))) {
      return;
    }

    if (!msg.photo || msg.photo.length === 0) {
      if (msg.text && msg.text.startsWith('/')) {
        return;
      }

      await bot.sendMessage(
        msg.chat.id,
        'Please upload your payment screenshot as an image.'
      );
      return;
    }

    await upsertTelegramUser(msg.from, msg.chat.id);
    const order = await getOrderDetails(msg.chat.id);

    if (!order.selectedProduct || !order.gameId) {
      await clearOrder(msg.chat.id);
      await bot.sendMessage(
        msg.chat.id,
        'Order details were not found. Please start your order again.'
      );
      return;
    }

    const username = getTelegramUsername(msg.from);
    const largestPhoto = msg.photo[msg.photo.length - 1];
    const savedOrder = await createPendingOrder({
      userId: order.user && order.user.id,
      telegramUserId: msg.from.id,
      username,
      firstName: msg.from.first_name || null,
      lastName: msg.from.last_name || null,
      userChatId: msg.chat.id,
      product: order.selectedProduct,
      gameId: order.gameId,
      paymentFileId: largestPhoto.file_id,
      adminChatId,
    });

    const adminMessage = await bot.sendPhoto(adminChatId, largestPhoto.file_id, {
      caption: [
        'New Order Payment',
        `Username: ${username}`,
        `Product: ${order.selectedProduct.name}`,
        `Price: ${order.selectedProduct.price}`,
        `Game ID: ${order.gameId}`,
        'Status: pending',
      ].join('\n'),
      reply_markup: getAdminOrderMenu(savedOrder.id),
    });

    await setAdminMessage(savedOrder.id, adminMessage.message_id);

    await bot.sendMessage(
      msg.chat.id,
      'Payment screenshot received. Waiting for admin review.'
    );

    await clearOrder(msg.chat.id);
  });
}

module.exports = { registerPaymentHandler };
