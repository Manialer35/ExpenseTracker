import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Lazily-initialized singleton Supabase client.
 * Initialization is deferred to first call so that Next.js static analysis /
 * build-time pre-rendering does not throw when env vars are absent.
 */
let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables.\n" +
        "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  _client = createClient(supabaseUrl, supabaseAnonKey);
  return _client;
}

/**
 * Convenience re-export for callers that just want the client directly.
 * Uses the lazy getter above.
 */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseClient() as never)[prop];
  },
});
