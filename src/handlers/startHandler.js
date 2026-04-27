const { getMainMenu } = require('../utils/menu');
const { upsertTelegramUser } = require('../utils/sessionStore');

function registerStartHandler(bot) {
  bot.onText(/^\/start$/, async (msg) => {
    await upsertTelegramUser(msg.from, msg.chat.id);
    bot.sendMessage(msg.chat.id, 'Welcome to Digital Shop Bot', {
      reply_markup: getMainMenu(),
    });
  });
}

module.exports = { registerStartHandler };
