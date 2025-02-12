import { Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import NotFound from "../NotFound/NotFound";
import AdminDailyOffers from "./AdminDailyOffers/AdminDailyOffers";
import AdminCategories from "./AdminCategories/AdminCategories";
import AdminMostSell from "./AdminMostSell/AdminMostSell";
import AdminBrands from "./AdminBrands/AdminBrands";
import AdminNewlyAvailable from "./AdminNewlyAvailable/AdminNewlyAvailable";
import AdminMainSlider from "./AdminMainSlider/AdminMainSlider";
import AdminBlog from "./AdminBlog/AdminBlog";

const AdminRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/MainSlider" element={<AdminMainSlider />} />
        <Route path="/DailyOffers" element={<AdminDailyOffers />} />
        <Route path="/Categories" element={<AdminCategories />} />
        <Route path="/NewlyAvailable" element={<AdminNewlyAvailable />} />
        <Route path="/MostSell" element={<AdminMostSell />} />
        <Route path="/Brands" element={<AdminBrands />} />
        <Route path="/Blog" element={<AdminBlog />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AdminRoute;
