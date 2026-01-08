export type SupabaseLikeError = {
  message: string;
  status?: number;
  code?: string;
};

export function isSupabaseLikeError(err: unknown): err is SupabaseLikeError {
  if (typeof err !== "object" || err === null) return false;

  const e = err as Record<string, unknown>;
  return typeof e.message === "string";
}

export function getErrorMessage(
  err: unknown,
  fallback = "Something went wrong"
) {
  if (isSupabaseLikeError(err)) return err.message;
  if (err instanceof Error) return err.message;
  return fallback;
}
