import { CookieOptions } from "react-router-dom";

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  const path = options.path ?? "/";
  const sameSite = options.sameSite ?? "lax";
  const secure = options.secure ?? window.location.protocol === "https:";

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=${path}; SameSite=${sameSite}`;

  if (secure) cookie += `; Secure`;
  if (options.maxAge != null) cookie += `; Max-Age=${options.maxAge}`;
  if (options.expires) cookie += `; Expires=${options.expires.toUTCString()}`;

  document.cookie = cookie;
}

export function removeCookie(name: string, path = "/") {
  document.cookie = `${encodeURIComponent(name)}=; Path=${path}; Max-Age=0`;
}
