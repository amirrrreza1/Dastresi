import React, { useState } from "react";
import { supabase } from "../../supabase";
import { getErrorMessage } from "../../Utils/Errors";

type Props = {
  onModeChange: (mode: "signin" | "signup" | "forgot" | "reset") => void;
};

export default function ForgotPasswordForm({ onModeChange }: Props) {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/auth?mode=reset`,
        }
      );

      if (resetError) throw resetError;

      setSuccess(
        "If an account exists for that email, a reset link has been sent."
      );
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-slate-200">Email</label>
        <input
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none
                     focus:border-white/20 focus:ring-2 focus:ring-white/10"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          {success}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-white text-slate-900 py-2 text-sm font-semibold
                   hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sending…" : "Send reset link"}
      </button>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={() => onModeChange("signin")}
          className="text-slate-300 hover:text-white underline underline-offset-4"
        >
          Back to sign in
        </button>

        <button
          type="button"
          onClick={() => onModeChange("signup")}
          className="text-slate-300 hover:text-white underline underline-offset-4"
        >
          Create account
        </button>
      </div>
    </form>
  );
}
