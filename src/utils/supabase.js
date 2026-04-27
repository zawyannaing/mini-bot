const { createClient } = require('@supabase/supabase-js');
const { getSupabaseUrl, getSupabaseServiceRoleKey } = require('./env');

const supabaseUrl = getSupabaseUrl();
const supabaseServiceRoleKey = getSupabaseServiceRoleKey();

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

function throwIfError(error, context) {
  if (error) {
    throw new Error(`${context}: ${error.message}`);
  }
}

module.exports = {
  supabase,
  throwIfError,
};
