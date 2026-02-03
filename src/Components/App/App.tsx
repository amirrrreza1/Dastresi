import React, { useEffect } from "react";
import Home from "../../Pages/Home/Home";
import NotFound from "../../Pages/NotFound/NotFound";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RedirectIfAuth, RequireUserOrGuest } from "../../Routes/guards";
import AuthPage from "../../Pages/Auth/AuthPage";
import { initSupabaseCookieSync } from "../../Utils/syncAuthCookie";
import AdminLayout from "../../Layouts/AdminLayout";
import AdminSliders from "../Dashboard/Admin/Slider";
import { ToastContainer } from "react-toastify";
import AdminBlogs from "../Dashboard/Admin/Blogs";
import AdminBrands from "../Dashboard/Admin/Brands";
import AdminCategories from "../Dashboard/Admin/Categories";
import AdminProducts from "../Dashboard/Admin/Products";
import ProductSingle from "../../Pages/Home/Products";
import Layout from "../../Layouts/Layout";

const App: React.FC = () => {
  useEffect(() => {
    const cleanup = initSupabaseCookieSync();
    return cleanup;
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<ProductSingle />} />
        </Route>

        <Route element={<RedirectIfAuth />}>
          <Route path="/login" element={<AuthPage />} />
        </Route>

        <Route element={<RequireUserOrGuest />}>
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="sliders" element={<AdminSliders />} />
            <Route path="brands" element={<AdminBrands />} />
            <Route path="blogs" element={<AdminBlogs />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
