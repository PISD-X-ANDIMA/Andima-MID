import "server-only";

import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Konfigurasi koneksi database Supabase belum tersedia."
    );
  }

  return createClient(url, key);
}

export async function getTrackingLogin() {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("tracking_login")
    .select(`
      id,
      date,
      timelogin,
      timelogout,
      email,
      role
    `)
    .order("date", {
      ascending: false,
    });

  if (error) {
    console.error("Failed to fetch tracking login:", error);
    throw error;
  }

  return data ?? [];
}