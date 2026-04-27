const { getBot } = require('../src/bot');
const { getRequiredEnv } = require('../src/utils/env');

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      message: 'Telegram webhook is ready.',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed',
    });
  }

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
};
