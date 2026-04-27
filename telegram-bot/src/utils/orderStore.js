const { supabase, throwIfError } = require('./supabase');

async function createPendingOrder(order) {
  const payload = {
    user_id: order.userId || null,
    telegram_user_id: order.telegramUserId,
    telegram_chat_id: order.userChatId,
    username: order.username || null,
    first_name: order.firstName || null,
    last_name: order.lastName || null,
    product_name: order.product.name,
    price: order.product.price,
    game_id: order.gameId,
    payment_file_id: order.paymentFileId || null,
    status: 'pending',
    admin_chat_id: order.adminChatId || null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('orders')
    .insert(payload)
    .select()
    .single();

  throwIfError(error, 'Failed to create pending order');
  return data;
}

async function getPendingOrder(orderId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', Number(orderId))
    .maybeSingle();

  throwIfError(error, 'Failed to fetch order');
  return data;
}

async function updatePendingOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', Number(orderId))
    .select()
    .single();

  throwIfError(error, 'Failed to update order status');
  return data;
}

async function setAdminMessage(orderId, adminMessageId) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      admin_message_id: adminMessageId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', Number(orderId))
    .select()
    .single();

  throwIfError(error, 'Failed to store admin message id');
  return data;
}

async function getLatestOrderByChatId(chatId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('telegram_chat_id', chatId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  throwIfError(error, 'Failed to load latest order');
  return data;
}

module.exports = {
  createPendingOrder,
  getPendingOrder,
  updatePendingOrderStatus,
  setAdminMessage,
  getLatestOrderByChatId,
};
