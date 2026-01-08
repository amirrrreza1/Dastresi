import { JwtPayload } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { getCookie } from "./getCookies";

const ACCESS_TOKEN_COOKIE = import.meta.env
  .VITE_ACCESS_TOKEN_COOKIE_NAME as string;

function decodeBase64Url(input: string) {
  let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad) base64 += "=".repeat(4 - pad);

  const json = atob(base64);
  return json;
}

export function getAccessToken(): string | null {
  return getCookie(ACCESS_TOKEN_COOKIE);
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payloadJson = decodeBase64Url(parts[1]);
    return JSON.parse(payloadJson) as JwtPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string, leewaySeconds = 30): boolean {
  const payload = decodeJwtPayload(token);
  const exp = payload?.exp;

  if (!exp) return true;
  const nowSeconds = Math.floor(Date.now() / 1000);

  return nowSeconds >= exp - leewaySeconds;
}

export function hasValidToken(): boolean {
  const token = getAccessToken();
  if (!token) return false;
  return !isTokenExpired(token);
}

export async function validateTokenWithSupabase() {
  const token = getAccessToken();
  if (!token) {
    return { user: null, error: new Error("توکن منقضی شده است.") };
  }

  if (isTokenExpired(token)) {
    return { user: null, error: new Error("توکن منقضی شده است.") };
  }

  const { data, error } = await supabase.auth.getUser(token);
  return { user: data.user ?? null, error: error ?? null };
}
