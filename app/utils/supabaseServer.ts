"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

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
