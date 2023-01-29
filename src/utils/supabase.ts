import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// 環境変数が設定されていなかったらエラーを投げる
if (SUPABASE_URL == null) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (SUPABASE_KEY == null) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_KEY');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
