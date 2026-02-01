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
import AdminLayout from "../../Layouts/AdminLayout";

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
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<div>Products</div>} />
            <Route path="categories" element={<div>Categories</div>} />
            <Route path="sliders" element={<div>Sliders</div>} />
            <Route path="new" element={<div>Newly Available</div>} />
            <Route path="brands" element={<div>Brands</div>} />
            <Route path="blogs" element={<div>Blogs</div>} />
          </Route>
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
