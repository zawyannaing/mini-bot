require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const { registerStartHandler } = require('./handlers/startHandler');
const { registerMenuHandler } = require('./handlers/menuHandler');
const { registerOrderFormHandler } = require('./handlers/orderFormHandler');
const { registerAdminHandler } = require('./handlers/adminHandler');
const { registerPaymentHandler } = require('./handlers/paymentHandler');
const { getTelegramBotToken, getAdminChatId } = require('./utils/env');

let botInstance;

function createBot() {
  const token = getTelegramBotToken();
  const adminChatId = getAdminChatId();

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
