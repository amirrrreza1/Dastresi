import { supabase } from "../supabase";
import { removeCookie, setCookie } from "./cookies";

const ACCESS_TOKEN_COOKIE = import.meta.env
  .VITE_ACCESS_TOKEN_COOKIE_NAME as string;

export function initSupabaseCookieSync() {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.access_token) {
      setCookie(ACCESS_TOKEN_COOKIE, session.access_token, {
        expires: new Date(session.expires_at! * 1000),
        path: "/",
        sameSite: "lax",
        secure: window.location.protocol === "https:",
      });
    } else {
      removeCookie(ACCESS_TOKEN_COOKIE, "/");
    }
  });

  return () => data.subscription.unsubscribe();
}
