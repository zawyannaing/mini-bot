const express = require('express');
const { getBot } = require('../src/bot');
const { getWebhookSecret } = require('../src/utils/env');

const app = express();

app.use(express.json());

app.get(['/', '/api/bot'], (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Telegram bot webhook is ready.',
  });
});

app.post(['/', '/api/bot'], async (req, res) => {
  const webhookSecret = getWebhookSecret();
  const requestSecret = req.headers['x-telegram-bot-api-secret-token'];

  if (requestSecret !== webhookSecret) {
    res.status(401).json({
      ok: false,
      error: 'Invalid webhook secret',
    });
    return;
  }

  try {
    const bot = getBot();
    await bot.processUpdate(req.body);

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to process Telegram update:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to process update',
    });
  }
});

module.exports = app;
