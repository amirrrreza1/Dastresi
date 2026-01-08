import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SignUpForm from "../../Components/Auth/SignUpForm";
import ForgotPasswordForm from "../../Components/Auth/ForgetPasswordForm";
import ResetPasswordForm from "../../Components/Auth/ResetPasswordForm";
import SignInForm from "../../Components/Auth/SignInForm";
import AuthShell from "../../Components/Auth/AuthShell";
import { supabase } from "../../supabase";
import { clearGuestAccess, enableGuestAccess } from "../../Utils/guestAccess";
import { getProfileRole } from "../../Utils/profileRole";

type Mode = "signin" | "signup" | "forgot" | "reset";

function normalizeMode(value: string | null): Mode {
  if (
    value === "signup" ||
    value === "forgot" ||
    value === "reset" ||
    value === "signin"
  ) {
    return value;
  }
  return "signin";
}

export default function AuthPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const mode = useMemo(() => normalizeMode(params.get("mode")), [params]);

  const setMode = (next: Mode) => {
    navigate(`/login?mode=${next}`, { replace: true });
  };

  useEffect(() => {
    if (!params.get("mode")) {
      navigate("/login?mode=signin", { replace: true });
    }
  });

  const header = useMemo(() => {
    switch (mode) {
      case "signup":
        return {
          title: "ساخت حساب کاربری",
          subtitle: "با ایمیل و رمز عبور ثبت نام کنید.",
        };
      case "forgot":
        return {
          title: "فراموشی رمز عبور",
          subtitle: "لینک بازیابی برای شما ایمیل می شود.",
        };
      case "reset":
        return {
          title: "تعیین رمز جدید",
          subtitle: "یک رمز قوی و قابل یادآوری انتخاب کنید.",
        };
      case "signin":
      default:
        return { title: "خوش آمدید", subtitle: "برای ادامه وارد شوید." };
    }
  }, [mode]);

  const handleAuthDone = async () => {
    clearGuestAccess();
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      navigate("/login?mode=signin", { replace: true });
      return;
    }

    const role = await getProfileRole(data.user.id);
    if (role === "admin") {
      navigate("/admin", { replace: true });
      return;
    }

    navigate("/dashboard", { replace: true });
  };

  const handleGuestEnter = () => {
    enableGuestAccess();
    navigate("/dashboard", { replace: true });
  };

  return (
    <AuthShell title={header.title} subtitle={header.subtitle}>
      {mode === "signin" ? (
        <SignInForm
          onModeChange={setMode}
          onDone={handleAuthDone}
          onGuest={handleGuestEnter}
        />
      ) : null}

      {mode === "signup" ? <SignUpForm onModeChange={setMode} /> : null}
      {mode === "forgot" ? <ForgotPasswordForm onModeChange={setMode} /> : null}
      {mode === "reset" ? <ResetPasswordForm onModeChange={setMode} /> : null}
    </AuthShell>
  );
}
