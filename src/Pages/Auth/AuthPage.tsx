import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthShell from "../../Components/Auth/AuthShell";
import SignInForm from "../../Components/Auth/SignInForm";
import SignUpForm from "../../Components/Auth/SignUpForm";
import ForgotPasswordForm from "../../Components/Auth/ForgetPasswordForm";
import ResetPasswordForm from "../../Components/Auth/ResetPasswordForm";

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
    navigate(`/auth?mode=${next}`, { replace: true });
  };

  useEffect(() => {
    if (!params.get("mode")) {
      navigate("/auth?mode=signin", { replace: true });
    }
  });

  const header = useMemo(() => {
    switch (mode) {
      case "signup":
        return {
          title: "Create account",
          subtitle: "Sign up with email and password.",
        };
      case "forgot":
        return {
          title: "Reset password",
          subtitle: "We will email you a reset link.",
        };
      case "reset":
        return {
          title: "Set new password",
          subtitle: "Choose a strong password you can remember.",
        };
      case "signin":
      default:
        return { title: "Welcome back", subtitle: "Sign in to continue." };
    }
  }, [mode]);

  return (
    <AuthShell title={header.title} subtitle={header.subtitle}>
      {mode === "signin" ? (
        <SignInForm
          onModeChange={setMode}
          onDone={() => navigate("/", { replace: true })}
        />
      ) : null}

      {mode === "signup" ? <SignUpForm onModeChange={setMode} /> : null}
      {mode === "forgot" ? <ForgotPasswordForm onModeChange={setMode} /> : null}
      {mode === "reset" ? <ResetPasswordForm onModeChange={setMode} /> : null}
    </AuthShell>
  );
}
