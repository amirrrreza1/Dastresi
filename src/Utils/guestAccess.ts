const GUEST_ACCESS_KEY = "guestAccess";

export function enableGuestAccess() {
  sessionStorage.setItem(GUEST_ACCESS_KEY, "true");
}

export function clearGuestAccess() {
  sessionStorage.removeItem(GUEST_ACCESS_KEY);
}

export function hasGuestAccess(): boolean {
  return sessionStorage.getItem(GUEST_ACCESS_KEY) === "true";
}
