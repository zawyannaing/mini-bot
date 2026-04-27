require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const { registerStartHandler } = require('./handlers/startHandler');
const { registerMenuHandler } = require('./handlers/menuHandler');
const { registerOrderFormHandler } = require('./handlers/orderFormHandler');
const { registerAdminHandler } = require('./handlers/adminHandler');
const { registerPaymentHandler } = require('./handlers/paymentHandler');
const { getRequiredEnv } = require('./utils/env');

let botInstance;

function createBot() {
  const token = getRequiredEnv('TELEGRAM_BOT_TOKEN');
  const adminChatId = getRequiredEnv('ADMIN_CHAT_ID');

  const bot = new TelegramBot(token);

  registerStartHandler(bot);
  registerMenuHandler(bot);
  registerOrderFormHandler(bot);
  registerPaymentHandler(bot, adminChatId);
  registerAdminHandler(bot);

  bot.on('webhook_error', (error) => {
    console.error('Webhook error:', error.message);
  });

  return bot;
}

function getBot() {
  if (!botInstance) {
    botInstance = createBot();
  }

  return botInstance;
}

module.exports = {
  getBot,
};
