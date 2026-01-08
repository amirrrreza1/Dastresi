import React, { useEffect } from "react";
import Home from "../../Pages/Home/Home";
import NotFound from "../../Pages/NotFound/NotFound";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  RedirectIfAuth,
  RequireAdmin,
  RequireUserOrGuest,
} from "../../Routes/guards";
import Dashboard from "../Dashboard/Dashboard";
import AuthPage from "../../Pages/Auth/AuthPage";
import { initSupabaseCookieSync } from "../../Utils/syncAuthCookie";

const App: React.FC = () => {
  useEffect(() => {
    const cleanup = initSupabaseCookieSync();
    return cleanup;
  }, []);

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<RedirectIfAuth />}>
          <Route path="/login" element={<AuthPage />} />
        </Route>

        <Route element={<RequireUserOrGuest />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
