import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  hasValidToken,
  validateTokenWithSupabase,
} from "../Utils/validateToken";
import { hasGuestAccess } from "../Utils/guestAccess";

type GuardStatus = "loading" | "allow" | "redirect";

type GuardState = {
  status: GuardStatus;
  to?: string;
};

export function RequireAuth() {
  const location = useLocation();

  if (!hasValidToken()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export function RequireUserOrGuest() {
  const location = useLocation();
  const [state, setState] = useState<GuardState>({ status: "loading" });

  useEffect(() => {
    let alive = true;

    const checkAccess = async () => {
      if (hasGuestAccess()) {
        if (alive) setState({ status: "allow" });
        return;
      }

      if (!hasValidToken()) {
        if (alive) {
          setState({ status: "redirect", to: "/login" });
        }
        return;
      }

      const { user, error } = await validateTokenWithSupabase();
      if (!alive) return;

      if (error || !user) {
        setState({ status: "redirect", to: "/login" });
        return;
      }

      setState({ status: "allow" });
    };

    void checkAccess();
    return () => {
      alive = false;
    };
  }, [location.pathname]);

  if (state.status === "redirect") {
    return <Navigate to={state.to ?? "/login"} replace />;
  }

  if (state.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-(--color-TextGray)">
        در حال بررسی دسترسی...
      </div>
    );
  }

  return <Outlet />;
}

export function RedirectIfAuth() {
  const [state, setState] = useState<GuardState>({ status: "loading" });

  useEffect(() => {
    let alive = true;

    const checkAccess = async () => {
      if (!hasValidToken()) {
        if (alive) setState({ status: "allow" });
        return;
      }

      if (!alive) return;

      setState({ status: "redirect", to: "/dashboard" });
    };

    void checkAccess();
    return () => {
      alive = false;
    };
  }, []);

  if (state.status === "redirect") {
    return <Navigate to={state.to ?? "/dashboard"} replace />;
  }

  if (state.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-(--color-TextGray)">
        در حال بررسی دسترسی...
      </div>
    );
  }

  return <Outlet />;
}
