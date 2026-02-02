import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home, LogOut, Menu, Plus, X } from "lucide-react";
import HoveredButton from "../../UI/Buttons/HoveredButton";

const menuItems = [
  { label: "داشبورد", path: "/dashboard" },
  { label: "اسلایدرها", path: "/dashboard/sliders" },
  { label: "دسته‌بندی‌ها", path: "/dashboard/categories" },
  { label: "محصولات", path: "/dashboard/products" },
  { label: "برندها", path: "/dashboard/brands" },
  { label: "بلاگ‌ها", path: "/dashboard/blogs" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);

  const logoutHandler = () => {
    localStorage.clear();

    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    closeSidebar();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 rounded-lg bg-white p-2 shadow cursor-pointer"
        aria-label="Open menu"
      >
        <Menu className="w-5! h-5!" />
      </button>
      <img
        alt="Logo"
        width="60"
        src="/Images/Header/logo.png"
        className="md:hidden fixed top-4 left-4 "
      />
      <HoveredButton
        text="افزودن محصول"
        icon={<Plus className="w-5! h-5!" color="black" />}
        className="w-9 h-9 fixed top-4 right-15"
      />

      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed z-50 h-screen w-64 bg-white shadow-lg flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
          md:sticky md:top-0 md:translate-x-0
        `}
      >
        <div className="p-3 border-b border-gray-400 flex items-center justify-between">
          <img src="/Images/Header/logo.png" alt="Logo" width="60" />

          <button
            onClick={closeSidebar}
            className="md:hidden text-xl font-bold rounded-full hover:bg-gray-300 transition-colors duration-200 p-1 cursor-pointer"
          >
            <X className="w-5! h-5!" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-2 text-sm font-medium transition
                ${
                  isActive
                    ? "bg-(--color-PrimeBlue) text-white"
                    : "text-(--color-SecondaryBlue) hover:bg-black/5"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 space-y-2">
          <Link
            to={"/"}
            className="w-full rounded-xl bg-(--color-PrimeBlue) py-2 text-sm font-semibold text-white hover:opacity-90 flex justify-center items-center cursor-pointer"
          >
            <Home className="w-5! h-5! ml-2" /> صفحه اصلی
          </Link>
          <button
            onClick={logoutHandler}
            className="w-full rounded-xl bg-(--color-PrimeOrange) py-2 text-sm font-semibold text-white hover:opacity-90 flex justify-center items-center cursor-pointer"
          >
            <LogOut className="w-5! h-5! ml-2" /> خروج از حساب
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
