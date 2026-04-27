require('dotenv').config();

const { getRequiredEnv } = require('../src/utils/env');

async function main() {
  const token = getRequiredEnv('TELEGRAM_BOT_TOKEN');
  const appUrl = getRequiredEnv('APP_URL');
  const webhookSecret = getRequiredEnv('TELEGRAM_WEBHOOK_SECRET');

  const webhookUrl = `${appUrl.replace(/\/$/, '')}/api/bot`;
  const endpoint = `https://api.telegram.org/bot${token}/setWebhook`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: webhookUrl,
      secret_token: webhookSecret,
      drop_pending_updates: true,
      allowed_updates: ['message', 'callback_query'],
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.ok) {
    throw new Error(`Failed to set webhook: ${result.description || response.statusText}`);
  }

  console.log(`Webhook set successfully: ${webhookUrl}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
