# Digital Shop Bot

A beginner-friendly Telegram bot built with `node-telegram-bot-api`, `dotenv`, Supabase, and a Vercel webhook deployment setup.

## Project structure

```text
api/
  webhook.js
scripts/
  setWebhook.js
src/
  bot.js
  handlers/
    startHandler.js
    menuHandler.js
    orderFormHandler.js
    paymentHandler.js
    adminHandler.js
  utils/
    env.js
    menu.js
    orderStore.js
    sessionStore.js
    supabase.js
supabase/
  schema.sql
vercel.json
```

## Environment variables

Create a `.env` file from `.env.example` and fill in:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
ADMIN_CHAT_ID=your_admin_chat_id_here
APP_URL=https://your-project-name.vercel.app
TELEGRAM_WEBHOOK_SECRET=your_random_webhook_secret
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Vercel deployment

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file:

   ```bash
   cp .env.example .env
   ```

3. Add your environment variables to `.env`.

4. Create the database tables in Supabase by running the SQL from `supabase/schema.sql`.

5. Push this project to GitHub.

6. Import the GitHub repo into Vercel.

7. Deploy once on Vercel so you get your project URL.

8. In Vercel, add these environment variables:
   - `TELEGRAM_BOT_TOKEN`
   - `ADMIN_CHAT_ID`
   - `APP_URL`
   - `TELEGRAM_WEBHOOK_SECRET`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

9. Set `APP_URL` to your real Vercel domain, for example:

   ```env
   APP_URL=https://your-project-name.vercel.app
   ```

10. Redeploy the project after saving the environment variables.

11. Update your local `.env` so `APP_URL` also points to the same Vercel URL.

12. After deployment, register the Telegram webhook:

   ```bash
   npm run set:webhook
   ```

13. Open this URL to confirm the function is live:

   ```text
   https://your-project-name.vercel.app/api/webhook
   ```

   It should return a small JSON response saying the webhook is ready.

## Local testing

For local Vercel-style testing:

```bash
npm run dev
```

This runs `vercel dev`, which serves the webhook locally.

## Bot behavior

- Sends `Welcome to Digital Shop Bot` when a user sends `/start`
- Shows an inline main menu with `🛒 Buy Products`, `📦 My Orders`, and `📞 Support`
- Lets users browse categories with inline buttons:
  - `🔐 VPN`
  - `🎮 Game Currency`
- Lets users choose products:
  - `1 Month - 3000 Ks`
  - `3 Months - 8000 Ks`
  - `Mobile Legends`
- After product selection, asks for the user's `Game ID` or username
- Shows an order summary with product name, user input, and price
- Lets users confirm or cancel the order with inline buttons
- After user confirms the order, asks for a payment screenshot
- Sends the uploaded payment image to the admin chat with username, product, price, and Game ID
- Adds admin inline buttons for `✅ Confirm Order` and `❌ Cancel Order`
- Notifies the original user when the admin confirms or cancels the order
- Includes back buttons for navigation
- Saves users and orders in Supabase
- Stores order status as `pending`, `confirmed`, or `cancelled`
- Uses a Telegram webhook for Vercel deployment
