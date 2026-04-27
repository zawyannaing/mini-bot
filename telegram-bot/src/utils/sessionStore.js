const { supabase, throwIfError } = require('./supabase');

async function upsertTelegramUser(telegramUser, chatId) {
  const payload = {
    telegram_user_id: telegramUser.id,
    chat_id: chatId,
    username: telegramUser.username || null,
    first_name: telegramUser.first_name || null,
    last_name: telegramUser.last_name || null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('users')
    .upsert(payload, {
      onConflict: 'telegram_user_id',
    })
    .select()
    .single();

  throwIfError(error, 'Failed to upsert Telegram user');
  return data;
}

async function getUserByChatId(chatId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('chat_id', chatId)
    .maybeSingle();

  throwIfError(error, 'Failed to load Telegram user');
  return data;
}

async function updateUserDraft(chatId, patch) {
  const { data, error } = await supabase
    .from('users')
    .update({
      ...patch,
      updated_at: new Date().toISOString(),
    })
    .eq('chat_id', chatId)
    .select()
    .single();

  throwIfError(error, 'Failed to update Telegram user draft');
  return data;
}

async function setSelectedProduct(chatId, telegramUser, product) {
  await upsertTelegramUser(telegramUser, chatId);
  return updateUserDraft(chatId, {
    current_product_name: product.name,
    current_product_price: product.price,
    current_game_id: null,
    awaiting_game_id: true,
    awaiting_payment_screenshot: false,
  });
}

async function getSelectedProduct(chatId) {
  const session = await getOrderDetails(chatId);
  return session.selectedProduct;
}

async function setAwaitingGameId(chatId, value) {
  return updateUserDraft(chatId, {
    awaiting_game_id: value,
  });
}

async function isAwaitingGameId(chatId) {
  const user = await getUserByChatId(chatId);
  return Boolean(user && user.awaiting_game_id);
}

async function setGameId(chatId, gameId) {
  return updateUserDraft(chatId, {
    current_game_id: gameId,
    awaiting_game_id: false,
  });
}

async function setAwaitingPaymentScreenshot(chatId, value) {
  return updateUserDraft(chatId, {
    awaiting_payment_screenshot: value,
  });
}

async function isAwaitingPaymentScreenshot(chatId) {
  const user = await getUserByChatId(chatId);
  return Boolean(user && user.awaiting_payment_screenshot);
}

async function getOrderDetails(chatId) {
  const user = await getUserByChatId(chatId);

  if (!user) {
    return {
      user: null,
      selectedProduct: null,
      gameId: null,
      awaitingPaymentScreenshot: false,
    };
  }

  return {
    user,
    selectedProduct: user.current_product_name
      ? {
          name: user.current_product_name,
          price: user.current_product_price,
        }
      : null,
    gameId: user.current_game_id || null,
    awaitingPaymentScreenshot: Boolean(user.awaiting_payment_screenshot),
  };
}

async function clearOrder(chatId) {
  const user = await getUserByChatId(chatId);

  if (!user) {
    return null;
  }

  return updateUserDraft(chatId, {
    current_product_name: null,
    current_product_price: null,
    current_game_id: null,
    awaiting_game_id: false,
    awaiting_payment_screenshot: false,
  });
}

module.exports = {
  upsertTelegramUser,
  setSelectedProduct,
  getSelectedProduct,
  setAwaitingGameId,
  isAwaitingGameId,
  setGameId,
  setAwaitingPaymentScreenshot,
  isAwaitingPaymentScreenshot,
  getOrderDetails,
  clearOrder,
};
