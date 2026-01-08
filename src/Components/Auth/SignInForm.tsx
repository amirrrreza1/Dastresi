import React, { useState } from "react";
import { supabase } from "../../supabase";
import { getErrorMessage } from "../../Utils/Errors";

type Props = {
  onModeChange: (mode: "signin" | "signup" | "forgot" | "reset") => void;
  onDone?: () => void;
  onGuest?: () => void;
};

export default function SignInForm({ onModeChange, onDone, onGuest }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      console.log("sign in Data: ", signInData);

      if (signInError) throw signInError;

      onDone?.();
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

      <div className="space-y-2">
        <label className="text-sm text-(--color-SecondaryBlue)">
          رمز عبور
        </label>
        <input
          className="w-full rounded-xl border border-[#0a5abd]/20 bg-white px-3 py-2 text-sm text-(--color-SecondaryBlue) outline-none
                     focus:border-[#0a5abd]/40 focus:ring-2 focus:ring-[#0a5abd]/15"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        className="w-full cursor-pointer rounded-xl bg-(--color-PrimeBlue) py-2 text-sm font-semibold text-white
                   hover:bg-(--color-SecondaryBlue) disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "در حال ورود..." : "ورود به حساب"}
      </button>

      <button
        type="button"
        onClick={onGuest}
        className="w-full cursor-pointer rounded-xl border border-[#0a5abd]/20 bg-white py-2 text-sm font-semibold text-(--color-SecondaryBlue)
                   hover:bg-[#0a5abd]/5"
      >
        ورود به عنوان مهمان
      </button>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={() => onModeChange("forgot")}
          className="cursor-pointer text-(--color-TextGray) hover:text-(--color-SecondaryBlue) underline underline-offset-4"
        >
          رمز عبور را فراموش کرده اید؟
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
