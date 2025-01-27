"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Creates a Supabase client with server-side authentication.
 * @returns {Promise<SupabaseClient>} A Supabase client instance.
 */
export async function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_DB_URL!,
    process.env.NEXT_PUBLIC_DB_API_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.then((cookie) => cookie.getAll());
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.then((cookie) => cookie.set(name, value, options))
          );
        },
      },
    }
  );
}
