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
          redirectTo: `${window.location.origin}/login?mode=reset`,
        }
      );

      if (resetError) throw resetError;

      setSuccess("اگر حسابی با این ایمیل وجود داشته باشد، لینک بازیابی ارسال شد.");
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-(--color-SecondaryBlue)">ایمیل</label>
        <input
          className="w-full rounded-xl border border-[#0a5abd]/20 bg-white px-3 py-2 text-sm text-(--color-SecondaryBlue) outline-none
                     focus:border-[#0a5abd]/40 focus:ring-2 focus:ring-[#0a5abd]/15"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-500/30 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {success}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer rounded-xl bg-(--color-PrimeBlue) py-2 text-sm font-semibold text-white
                   hover:bg-(--color-SecondaryBlue) disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "در حال ارسال..." : "ارسال لینک بازیابی"}
      </button>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={() => onModeChange("signin")}
          className="cursor-pointer text-(--color-TextGray) hover:text-(--color-SecondaryBlue) underline underline-offset-4"
        >
          بازگشت به ورود
        </button>

        <button
          type="button"
          onClick={() => onModeChange("signup")}
          className="cursor-pointer text-(--color-TextGray) hover:text-(--color-SecondaryBlue) underline underline-offset-4"
        >
          ساخت حساب کاربری
        </button>
      </div>
    </form>
  );
}
