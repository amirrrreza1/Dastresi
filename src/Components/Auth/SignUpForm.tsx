import React, { useState } from "react";
import { supabase } from "../../supabase";
import { getErrorMessage } from "../../Utils/Errors";
import { setCookie } from "../../Utils/cookies";

type Props = {
  onModeChange: (mode: "signin" | "signup" | "forgot" | "reset") => void;
};

export default function SignUpForm({ onModeChange }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirm) {
      setError("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login?mode=signin`,
        },
      });

      if (signUpError) throw signUpError;

      if (data.session) {
        setCookie("accessToken", data.session.access_token, {
          expires: new Date(data.session.expires_at! * 1000),
          path: "/",
          sameSite: "lax",
          secure: window.location.protocol === "https:",
        });

        setSuccess("حساب شما ساخته شد و وارد شدید.");
      } else {
        setSuccess("حساب ساخته شد. لطفا ایمیل خود را تایید کنید.");
      }
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
        <label className="text-sm text-(--color-SecondaryBlue)">رمز عبور</label>
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
          تکرار رمز عبور
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
        {loading ? "در حال ساخت حساب..." : "ساخت حساب"}
      </button>

      <div className="text-sm">
        <button
          type="button"
          onClick={() => onModeChange("signin")}
          className="cursor-pointer text-(--color-TextGray) hover:text-(--color-SecondaryBlue) underline underline-offset-4"
        >
          حساب دارید؟ وارد شوید
        </button>
      </div>
    </form>
  );
}
