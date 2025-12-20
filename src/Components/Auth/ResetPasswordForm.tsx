import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { getErrorMessage } from "../../Utils/Errors";

type Props = {
  onModeChange: (mode: "signin" | "signup" | "forgot" | "reset") => void;
};

export default function ResetPasswordForm({ onModeChange }: Props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      setReady(!!data.session);
    };
    void check();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });
      if (updateError) throw updateError;
      onModeChange("signin");
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (!ready) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
          This reset link is invalid or expired. Please request a new one.
        </div>

        <button
          type="button"
          onClick={() => onModeChange("forgot")}
          className="w-full rounded-xl bg-white text-slate-900 py-2 text-sm font-semibold hover:bg-slate-100"
        >
          Request a new reset link
        </button>

        <button
          type="button"
          onClick={() => onModeChange("signin")}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2 text-sm font-semibold text-slate-100
                     hover:bg-white/10"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-slate-200">New password</label>
        <input
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none
                     focus:border-white/20 focus:ring-2 focus:ring-white/10"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-200">Confirm new password</label>
        <input
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none
                     focus:border-white/20 focus:ring-2 focus:ring-white/10"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          minLength={6}
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-white text-slate-900 py-2 text-sm font-semibold
                   hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Updating…" : "Update password"}
      </button>

      <div className="text-sm">
        <button
          type="button"
          onClick={() => onModeChange("signin")}
          className="text-slate-300 hover:text-white underline underline-offset-4"
        >
          Back to sign in
        </button>
      </div>
    </form>
  );
}
