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
      setError("رمز عبور و تکرار آن یکسان نیستند.");
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
        <div className="rounded-xl border border-amber-500/30 bg-amber-50 px-3 py-2 text-sm text-amber-700">
          این لینک معتبر نیست یا منقضی شده است. لطفا دوباره درخواست دهید.
        </div>

        <button
          type="button"
          onClick={() => onModeChange("forgot")}
          className="w-full cursor-pointer rounded-xl bg-(--color-PrimeBlue) py-2 text-sm font-semibold text-white hover:bg-(--color-SecondaryBlue)"
        >
          درخواست لینک جدید
        </button>

        <button
          type="button"
          onClick={() => onModeChange("signin")}
          className="w-full cursor-pointer rounded-xl border border-[#0a5abd]/20 bg-white py-2 text-sm font-semibold text-(--color-SecondaryBlue)
                     hover:bg-[#0a5abd]/5"
        >
          بازگشت به ورود
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-(--color-SecondaryBlue)">
          رمز جدید
        </label>
        <input
          className="w-full rounded-xl border border-[#0a5abd]/20 bg-white px-3 py-2 text-sm text-(--color-SecondaryBlue) outline-none
                     focus:border-[#0a5abd]/40 focus:ring-2 focus:ring-[#0a5abd]/15"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-(--color-SecondaryBlue)">
          تکرار رمز جدید
        </label>
        <input
          className="w-full rounded-xl border border-[#0a5abd]/20 bg-white px-3 py-2 text-sm text-(--color-SecondaryBlue) outline-none
                     focus:border-[#0a5abd]/40 focus:ring-2 focus:ring-[#0a5abd]/15"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          minLength={6}
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-500/30 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-(--color-PrimeBlue) py-2 text-sm font-semibold text-white
                   hover:bg-(--color-SecondaryBlue) disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "در حال بروزرسانی..." : "بروزرسانی رمز عبور"}
      </button>

      <div className="text-sm">
        <button
          type="button"
          onClick={() => onModeChange("signin")}
          className="text-(--color-TextGray) hover:text-(--color-SecondaryBlue) underline underline-offset-4"
        >
          بازگشت به ورود
        </button>
      </div>
    </form>
  );
}
