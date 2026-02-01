import React, { useEffect } from "react";
import Home from "../../Pages/Home/Home";
import NotFound from "../../Pages/NotFound/NotFound";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RedirectIfAuth, RequireUserOrGuest } from "../../Routes/guards";
import AuthPage from "../../Pages/Auth/AuthPage";
import { initSupabaseCookieSync } from "../../Utils/syncAuthCookie";
import AdminLayout from "../../Layouts/AdminLayout";
import AdminDashboard from "../Dashboard/AdminDashboard";
import AdminSliders from "../Dashboard/Admin/Slider";
import { ToastContainer } from "react-toastify";
import AdminBlogs from "../Dashboard/Admin/Blogs";

const App: React.FC = () => {
  useEffect(() => {
    const cleanup = initSupabaseCookieSync();
    return cleanup;
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
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
            <Route path="sliders" element={<AdminSliders />} />
            <Route path="new" element={<div>Newly Available</div>} />
            <Route path="brands" element={<div>Brands</div>} />
            <Route path="blogs" element={<AdminBlogs />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
