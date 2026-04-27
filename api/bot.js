import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.BOT_TOKEN);

bot.onText(/\/go/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to Digital Shop Bot 🚀");
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    bot.processUpdate(req.body);
  }

  res.status(200).send("ok");
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
  }

  res.status(200).send("OK");
}



const express = require('express');
const { getBot } = require('../src/bot');
const { getRequiredEnv } = require('../src/utils/env');

const app = express();

app.use(express.json());

app.get(['/', '/api/bot'], (req, res) => {
  return res.status(200).json({
    ok: true,
    message: 'Telegram bot webhook is ready.',
  });
});

app.post(['/', '/api/bot'], async (req, res) => {
  const webhookSecret = getRequiredEnv('TELEGRAM_WEBHOOK_SECRET');
  const requestSecret = req.headers['x-telegram-bot-api-secret-token'];

  if (requestSecret !== webhookSecret) {
    return res.status(401).json({
      ok: false,
      error: 'Invalid webhook secret',
    });
  }

  try {
    const bot = getBot();
    await bot.processUpdate(req.body);

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to process Telegram update:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to process update',
    });
  }
});

module.exports = app;
