const { getOrderSummaryMenu } = require('../utils/menu');
const {
  isAwaitingGameId,
  setGameId,
  getOrderDetails,
} = require('../utils/sessionStore');

function registerOrderFormHandler(bot) {
  bot.on('message', async (msg) => {
    if (!msg.text || msg.text.startsWith('/')) {
      return;
    }

    if (!(await isAwaitingGameId(msg.chat.id))) {
      return;
    }

    await setGameId(msg.chat.id, msg.text.trim());

    const order = await getOrderDetails(msg.chat.id);

    if (!order.selectedProduct) {
      return;
    }

    await bot.sendMessage(
      msg.chat.id,
      [
        'Order Summary',
        `Product name: ${order.selectedProduct.name}`,
        `User input (Game ID): ${order.gameId}`,
        `Price: ${order.selectedProduct.price}`,
      ].join('\n'),
      {
        reply_markup: getOrderSummaryMenu(),
      }
    );
  });
}

module.exports = { registerOrderFormHandler };
