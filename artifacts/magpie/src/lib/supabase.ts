import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getSiteUrl(): string {
  return import.meta.env.VITE_SITE_URL || window.location.origin;
}

export const AUTH_TOKEN_KEY = "magpie_auth_token";

export async function getAuthToken(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    return session.access_token;
  }
  return null;
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") {
    if (session?.access_token) {
      setAuthToken(session.access_token);
    }
  } else if (event === "SIGNED_OUT") {
    clearAuthToken();
  }
});
