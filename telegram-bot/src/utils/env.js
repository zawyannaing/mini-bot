function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getValidatedEnv(name, validator, message) {
  const value = getRequiredEnv(name);

  if (!validator(value)) {
    throw new Error(`Invalid ${name}: ${message}`);
  }

  return value;
}

function getTelegramBotToken() {
  return getValidatedEnv(
    'TELEGRAM_BOT_TOKEN',
    (value) => /^\d+:[A-Za-z0-9_-]{20,}$/.test(value),
    'expected a Telegram bot token like 123456:ABC...'
  );
}

function getAdminChatId() {
  return getValidatedEnv(
    'ADMIN_CHAT_ID',
    (value) => /^-?\d+$/.test(value),
    'expected a numeric Telegram chat ID'
  );
}

function getAppUrl() {
  return getValidatedEnv(
    'APP_URL',
    (value) => /^https:\/\/[^\s]+$/.test(value),
    'expected an https URL like https://your-project.vercel.app'
  );
}

function getWebhookSecret() {
  return getValidatedEnv(
    'TELEGRAM_WEBHOOK_SECRET',
    (value) => value !== 'your_random_webhook_secret' && value.length >= 12,
    'use a real secret string with at least 12 characters'
  );
}

function getSupabaseUrl() {
  return getValidatedEnv(
    'SUPABASE_URL',
    (value) => /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(value),
    'expected a Supabase project URL like https://your-project-ref.supabase.co'
  );
}

function getSupabaseServiceRoleKey() {
  return getValidatedEnv(
    'SUPABASE_SERVICE_ROLE_KEY',
    (value) =>
      value !== 'sb_publishable_your_key_here' &&
      value !== 'your_supabase_service_role_key' &&
      value.length >= 20,
    'use the real Supabase service_role key, not the publishable key'
  );
}

module.exports = {
  getRequiredEnv,
  getTelegramBotToken,
  getAdminChatId,
  getAppUrl,
  getWebhookSecret,
  getSupabaseUrl,
  getSupabaseServiceRoleKey,
};
