const { getPendingOrder, updatePendingOrderStatus } = require('../utils/orderStore');

function registerAdminHandler(bot) {
  bot.on('callback_query', async (query) => {
    const callbackData = query.data || '';

    if (
      !callbackData.startsWith('admin_confirm:') &&
      !callbackData.startsWith('admin_cancel:')
    ) {
      return;
    }

    const [action, orderId] = callbackData.split(':');
    const order = await getPendingOrder(orderId);

    if (!order) {
      await bot.answerCallbackQuery(query.id, {
        text: 'Order not found.',
      });
      return;
    }

    if (order.status !== 'pending') {
      await bot.answerCallbackQuery(query.id, {
        text: `Order already ${order.status}.`,
      });
      return;
    }

    const nextStatus = action === 'admin_confirm' ? 'confirmed' : 'cancelled';
    const updatedOrder = await updatePendingOrderStatus(orderId, nextStatus);
    const customerMessage =
      nextStatus === 'confirmed'
        ? 'Your order is confirmed'
        : 'Your order is cancelled';

    await bot.answerCallbackQuery(query.id, {
      text: `Order ${nextStatus}.`,
    });

    await bot.sendMessage(updatedOrder.telegram_chat_id, customerMessage);

    await bot.editMessageCaption(
      [
        'New Order Request',
        `Username: ${updatedOrder.username}`,
        `Product: ${updatedOrder.product_name}`,
        `Price: ${updatedOrder.price}`,
        `Game ID: ${updatedOrder.game_id}`,
        `Status: ${nextStatus}`,
      ].join('\n'),
      {
        chat_id: query.message.chat.id,
        message_id: query.message.message_id,
      }
    );
  });
}

module.exports = { registerAdminHandler };
