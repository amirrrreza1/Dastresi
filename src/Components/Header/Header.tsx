import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import data from "../../../db.json";
import { hasValidToken } from "../../Utils/validateToken";

type NavbarSubmenu = {
  id: number;
  SubMenuText: string;
};

type NavbarCategory = {
  id: number;
  text: string;
  Submenu?: NavbarSubmenu[];
};

type NavbarBrands = {
  id: number;
  EnglishText: string;
  PersianText: string;
};

type NavbarItem = {
  Home: NavbarCategory[];
  Accessories: NavbarCategory[];
  Cable: NavbarCategory[];
  ContentCrator: NavbarCategory[];
  Networking: NavbarCategory[];
  GameConsole: NavbarCategory[];
  Personal: NavbarCategory[];
  Brands: NavbarBrands[];
};

const Header: React.FC = () => {
  const navbar: NavbarItem = data.Navbar;

  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [openNestedSubMenu, setOpenNestedSubMenu] = useState<string | null>(
    null,
  );

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleSubMenu = (menu: string) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
    setOpenNestedSubMenu(null);
  };
  const toggleNestedSubMenu = (submenu: string) => {
    setOpenNestedSubMenu(openNestedSubMenu === submenu ? null : submenu);
  };

  const isLogin = hasValidToken();

  return (
    <>
      <div>
        <header className="w-full h-fit shadow-md bg-white z-70 sticky top-0 left-0 right-0 hidden lg:block">
          <div className="Width h-20 mx-auto flex justify-between  items-center gap-5 px-4">
            <NavLink to="/" className="flex items-center">
              <img
                src="/Images/Header/logo.png"
                alt="Logo"
                width="100"
                height="40"
              />
            </NavLink>
            <div className="w-[30%]">
              <button className="w-full h-10 px-3 rounded-xl bg-(--color-PrimeGray) shadow flex items-center justify-center">
                <img
                  src="/Images/SVG/SearchIcon.svg"
                  alt=""
                  width="20"
                  height="20"
                />
                <input
                  type="text"
                  className="w-full h-full rounded-xl px-3  text-black placeholder:(--color-PrimeGray) focus-within:border-none focus-within:outline-none"
                  placeholder=" جستجو محصولات"
                />
              </button>
            </div>
            <div className="w-[60%] flex items-center justify-between max-w-[520px]">
              <div className="flex items-center">
                <a href="#" className="HeaderPagesItem">
                  باشگاه مشتریان
                </a>
                <a href="#" className="HeaderPagesItem">
                  بلاگ
                </a>
                <a href="#" className="HeaderPagesItem">
                  ارتباط ما
                </a>
                <a href="#" className="HeaderPagesItem">
                  درباره ما
                </a>
              </div>
              <div className="flex items-center">
                <div className="w-15 h-15 relative flex justify-center items-center">
                  <a
                    href="#"
                    className="w-10 h-10 bg-(--color-PrimeGray) flex items-center justify-center shadow-md rounded-lg group"
                  >
                    <img
                      src="/Images/SVG/ShoppingCartOrange.svg"
                      alt=""
                      width="20"
                      height="20"
                      className="absolute w-5 h-5 flex justify-center items-center transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <img
                      src="/Images/SVG/ShoppingCartBlack.svg"
                      alt=""
                      width="20"
                      height="20"
                      className="absolute w-5 h-5 flex justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </a>
                  <div className="w-5 h-5 text-white bg-(--color-PrimeOrange) absolute top-0 right-0 rounded-full shadow-lg leading-5 text-center">
                    ۰
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="h-10 shadow leading-10 px-3 bg-(--color-PrimeBlue) text-white rounded-lg hover:bg-black transition-bg-color duration-300"
                >
                  {isLogin ? "داشبورد" : "ورود / ثبت نام"}
                </Link>
              </div>
            </div>
          </div>
          <nav className="Width m-auto flex flex-wrap justify-between items-center px-4">
            <NavLink
              to="/"
              className={(navDate) =>
                navDate.isActive
                  ? "group HeaderNavBarActive"
                  : "HeaderNavBarNotActive group"
              }
            >
              {({ isActive }) => (
                <div className="flex items-center gap-2">
                  خانه
                  <img
                    src={
                      isActive
                        ? "/Images/SVG/TriangleOrange.svg"
                        : "/Images/SVG/TriangleBlack.svg"
                    }
                    alt="Triangle Indicator"
                    width={8}
                    className="group-hover:hidden!"
                  />
                  <img
                    src="/Images/SVG/TriangleOrange.svg"
                    alt="Triangle Indicator Hover"
                    width={8}
                    className={`hidden group-hover:block!`}
                  />
                </div>
              )}
            </NavLink>
            <NavLink
              to="/Accessories"
              className={({ isActive }) =>
                isActive
                  ? "group relative HeaderNavBarActive"
                  : "group relative HeaderNavBarNotActive"
              }
            >
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    لوازم جانبی موبایل و کامپیوتر
                    <img
                      src={
                        isActive
                          ? "/Images/SVG/TriangleOrange.svg"
                          : "/Images/SVG/TriangleBlack.svg"
                      }
                      alt="Triangle Indicator"
                      width={8}
                      className="group-hover:hidden!"
                    />
                    <img
                      src="/Images/SVG/TriangleOrange.svg"
                      alt="Triangle Indicator Hover"
                      width={8}
                      className="hidden group-hover:block!"
                    />
                  </div>

                  <div className="absolute right-0 top-10 hidden w-[250px] bg-white shadow-lg group-hover:block">
                    {navbar?.Accessories?.map((item, index) => (
                      <div key={index} className="relative group/item">
                        {item.Submenu && item.Submenu.length > 0 ? (
                          <>
                            <button className="w-full text-right hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light flex items-center justify-between px-2">
                              {item.text}
                              <img
                                src="/Images/SVG/ToLeftArrow.svg"
                                alt="to left arrow"
                                width={15}
                              />
                            </button>
                            <div className="absolute  w-[200px] right-[250px] top-0 hidden bg-white shadow-lg group-hover/item:block">
                              {item.Submenu.map(
                                (subItem: NavbarSubmenu, subIndex: number) => (
                                  <p
                                    key={subIndex}
                                    className="block hover:bg-gray-100 px-2 text-black hover:text-(--color-PrimeBlue) font-light"
                                  >
                                    {subItem.SubMenuText}
                                  </p>
                                ),
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="block hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light px-2">
                            {item.text}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </NavLink>
            <NavLink
              to="/Cable"
              className={({ isActive }) =>
                isActive
                  ? "group relative HeaderNavBarActive"
                  : "group relative HeaderNavBarNotActive"
              }
            >
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    کابل - رابط - رابط
                    <img
                      src={
                        isActive
                          ? "/Images/SVG/TriangleOrange.svg"
                          : "/Images/SVG/TriangleBlack.svg"
                      }
                      alt="Triangle Indicator"
                      width={8}
                      className="group-hover:hidden!"
                    />
                    <img
                      src="/Images/SVG/TriangleOrange.svg"
                      alt="Triangle Indicator Hover"
                      width={8}
                      className="hidden group-hover:block!"
                    />
                  </div>

                  <div className="absolute right-0 top-10 hidden w-[250px] bg-white shadow-lg group-hover:block">
                    {navbar?.Cable?.map((item, index) => (
                      <div key={index} className="relative group/item">
                        {item.Submenu && item.Submenu.length > 0 ? (
                          <>
                            <button className="w-full text-right hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light flex items-center justify-between px-2">
                              {item.text}
                              <img
                                src="/Images/SVG/ToLeftArrow.svg"
                                alt="to left arrow"
                                width={15}
                              />
                            </button>
                            <div className="absolute  w-[200px] right-[250px] top-0 hidden bg-white shadow-lg group-hover/item:block">
                              {item.Submenu.map(
                                (subItem: NavbarSubmenu, subIndex: number) => (
                                  <div
                                    key={subIndex}
                                    className="block hover:bg-gray-100 px-2 text-black hover:text-(--color-PrimeBlue) font-light"
                                  >
                                    {subItem.SubMenuText}
                                  </div>
                                ),
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="block hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light px-2">
                            {item.text}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </NavLink>
            <NavLink
              to="/ContentCrator"
              className={({ isActive }) =>
                isActive
                  ? "group relative HeaderNavBarActive"
                  : "group relative HeaderNavBarNotActive"
              }
            >
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    لوازم تولید محتوا
                    <img
                      src={
                        isActive
                          ? "/Images/SVG/TriangleOrange.svg"
                          : "/Images/SVG/TriangleBlack.svg"
                      }
                      alt="Triangle Indicator"
                      width={8}
                      className="group-hover:hidden!"
                    />
                    <img
                      src="/Images/SVG/TriangleOrange.svg"
                      alt="Triangle Indicator Hover"
                      width={8}
                      className="hidden group-hover:block!"
                    />
                  </div>

                  <div className="absolute right-0 top-10 hidden w-[250px] bg-white shadow-lg group-hover:block">
                    {navbar?.ContentCrator?.map((item, index) => (
                      <div key={index} className="relative group/item">
                        {item.Submenu && item.Submenu.length > 0 ? (
                          <>
                            <button className="w-full text-right hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light flex items-center justify-between px-2">
                              {item.text}
                              <img
                                src="/Images/SVG/ToLeftArrow.svg"
                                alt="to left arrow"
                                width={15}
                              />
                            </button>
                            <div className="absolute  w-[200px] right-[250px] top-0 hidden bg-white shadow-lg group-hover/item:block">
                              {item.Submenu.map(
                                (subItem: NavbarSubmenu, subIndex: number) => (
                                  <div
                                    key={subIndex}
                                    className="block hover:bg-gray-100 px-2 text-black hover:text-(--color-PrimeBlue) font-light"
                                  >
                                    {subItem.SubMenuText}
                                  </div>
                                ),
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="block hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light px-2">
                            {item.text}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </NavLink>
            <NavLink
              to="/Networking"
              className={({ isActive }) =>
                isActive
                  ? "group relative HeaderNavBarActive"
                  : "group relative HeaderNavBarNotActive"
              }
            >
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    لوازم شبکه
                    <img
                      src={
                        isActive
                          ? "/Images/SVG/TriangleOrange.svg"
                          : "/Images/SVG/TriangleBlack.svg"
                      }
                      alt="Triangle Indicator"
                      width={8}
                      className="group-hover:hidden!"
                    />
                    <img
                      src="/Images/SVG/TriangleOrange.svg"
                      alt="Triangle Indicator Hover"
                      width={8}
                      className="hidden group-hover:block!"
                    />
                  </div>

                  <div className="absolute right-0 top-10 hidden w-[250px] bg-white shadow-lg group-hover:block">
                    {navbar?.Networking?.map((item, index) => (
                      <div key={index} className="relative group/item">
                        {item.Submenu && item.Submenu.length > 0 ? (
                          <>
                            <button className="w-full text-right hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light flex items-center justify-between px-2">
                              {item.text}
                              <img
                                src="/Images/SVG/ToLeftArrow.svg"
                                alt="to left arrow"
                                width={15}
                              />
                            </button>
                            <div className="absolute  w-[200px] right-[250px] top-0 hidden bg-white shadow-lg group-hover/item:block">
                              {item.Submenu.map(
                                (subItem: NavbarSubmenu, subIndex: number) => (
                                  <div
                                    key={subIndex}
                                    className="block hover:bg-gray-100 px-2 text-black hover:text-(--color-PrimeBlue) font-light"
                                  >
                                    {subItem.SubMenuText}
                                  </div>
                                ),
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="block hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light px-2">
                            {item.text}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </NavLink>
            <NavLink
              to="/GameConsole"
              className={({ isActive }) =>
                isActive
                  ? "group relative HeaderNavBarActive"
                  : "group relative HeaderNavBarNotActive"
              }
            >
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    کنسول بازی و لوازم جانبی
                    <img
                      src={
                        isActive
                          ? "/Images/SVG/TriangleOrange.svg"
                          : "/Images/SVG/TriangleBlack.svg"
                      }
                      alt="Triangle Indicator"
                      width={8}
                      className="group-hover:hidden!"
                    />
                    <img
                      src="/Images/SVG/TriangleOrange.svg"
                      alt="Triangle Indicator Hover"
                      width={8}
                      className="hidden group-hover:block!"
                    />
                  </div>

                  <div className="absolute right-0 top-10 hidden w-[250px] bg-white shadow-lg group-hover:block">
                    {navbar?.GameConsole?.map((item, index) => (
                      <div key={index} className="relative group/item">
                        {item.Submenu && item.Submenu.length > 0 ? (
                          <>
                            <button className="w-full text-right hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light flex items-center justify-between px-2">
                              {item.text}
                              <img
                                src="/Images/SVG/ToLeftArrow.svg"
                                alt="to left arrow"
                                width={15}
                              />
                            </button>
                            <div className="absolute  w-[200px] right-[250px] top-0 hidden bg-white shadow-lg group-hover/item:block">
                              {item.Submenu.map(
                                (subItem: NavbarSubmenu, subIndex: number) => (
                                  <div
                                    key={subIndex}
                                    className="block hover:bg-gray-100 px-2 text-black hover:text-(--color-PrimeBlue) font-light"
                                  >
                                    {subItem.SubMenuText}
                                  </div>
                                ),
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="block hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light px-2">
                            {item.text}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </NavLink>
            <NavLink
              to="/Personal"
              className={({ isActive }) =>
                isActive
                  ? "group relative HeaderNavBarActive"
                  : "group relative HeaderNavBarNotActive"
              }
            >
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    لوازم خانگی و شخصی
                    <img
                      src={
                        isActive
                          ? "/Images/SVG/TriangleOrange.svg"
                          : "/Images/SVG/TriangleBlack.svg"
                      }
                      alt="Triangle Indicator"
                      width={8}
                      className="group-hover:hidden!"
                    />
                    <img
                      src="/Images/SVG/TriangleOrange.svg"
                      alt="Triangle Indicator Hover"
                      width={8}
                      className="hidden group-hover:block!"
                    />
                  </div>

                  <div className="absolute right-0 top-10 hidden w-[250px] bg-white shadow-lg group-hover:block">
                    {navbar?.Personal?.map((item, index) => (
                      <div key={index} className="relative group/item">
                        {item.Submenu && item.Submenu.length > 0 ? (
                          <>
                            <button className="w-full text-right hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light flex items-center justify-between px-2">
                              {item.text}
                              <img
                                src="/Images/SVG/ToLeftArrow.svg"
                                alt="to left arrow"
                                width={15}
                              />
                            </button>
                            <div className="absolute  w-[200px] right-[250px] top-0 hidden bg-white shadow-lg group-hover/item:block">
                              {item.Submenu.map(
                                (subItem: NavbarSubmenu, subIndex: number) => (
                                  <div
                                    key={subIndex}
                                    className="block hover:bg-gray-100 px-2 text-black hover:text-(--color-PrimeBlue) font-light"
                                  >
                                    {subItem.SubMenuText}
                                  </div>
                                ),
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="block hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light px-2">
                            {item.text}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </NavLink>
            <NavLink
              to="/Brands"
              className={({ isActive }) =>
                isActive
                  ? "group  HeaderNavBarActive"
                  : "group  HeaderNavBarNotActive"
              }
            >
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    برند ها
                    <img
                      src={
                        isActive
                          ? "/Images/SVG/TriangleOrange.svg"
                          : "/Images/SVG/TriangleBlack.svg"
                      }
                      alt="Triangle Indicator"
                      width={8}
                      className="group-hover:hidden!"
                    />
                    <img
                      src="/Images/SVG/TriangleOrange.svg"
                      alt="Triangle Indicator Hover"
                      width={8}
                      className="hidden group-hover:block!"
                    />
                  </div>

                  <div className="absolute left-1/2 top-[120px] hidden Width w-[98%]  bg-white shadow-2xl transform -translate-x-1/2  group-hover:block overflow-hidden">
                    <div className="group-hover:flex flex-wrap">
                      {navbar?.Brands?.map((item, index) => (
                        <div
                          key={index}
                          className="w-[20%] !flex items-center justify-between border-x border-gray-200 px-2 text-black hover:bg-gray-100 hover:text-(--color-PrimeBlue) font-light text-[11px]"
                        >
                          <p>{item.PersianText}</p>
                          <p>{item.EnglishText}</p>
                        </div>
                      ))}
                    </div>
                    <hr className="w-full border-gray-200" />
                    <div className="w-full h-10 px-3 text-[12px] hover:text-(--color-PrimeBlue)">
                      مشاهده دیگر برندها {">"}
                    </div>
                  </div>
                </div>
              )}
            </NavLink>
          </nav>
        </header>
        <header className="w-full h-15 shadow-md bg-white z-40 fixed top-0 left-0 right-0 flex lg:hidden justify-between items-center p-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsOpen(true)}>
              <img src="/Images/SVG/MenuIcon.svg" alt="Menu Icon" width="30" />
            </button>
            <Link to="/">
              <img src="/Images/Header/logo.png" alt="Logo" width="60" />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="">
              <img
                src="/Images/SVG/SearchIconBlack.svg"
                alt="SearchIcon"
                width="25"
              />
            </div>
            <Link to="/dashboard">
              <img src="/Images/SVG/UserIcon.svg" alt="UserIcon" width="25" />
            </Link>
            <div className="w-[45px] h-[45px] relative flex justify-center items-center">
              <Link
                to="/"
                className="w-10 h-10 flex items-center justify-center  group"
              >
                <img
                  src="/Images/SVG/ShoppingCartBlack.svg"
                  alt=""
                  width="20"
                  height="20"
                  className="absolute w-5 h-5 flex justify-center items-center"
                />
              </Link>
              <div className="w-5 h-5 text-white bg-(--color-PrimeOrange) absolute top-0 right-0 rounded-full shadow-lg leading-5 text-center">
                ۰
              </div>
            </div>
          </div>
        </header>
      </div>
      <div
        className={`fixed top-0 right-0 h-screen w-[300px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="absolute top-4 left-4 text-gray-600"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>
        <div
          className={`sticky  top-0 right-0  w-[300px] h-full transform transition-transform duration-300 ease-in-out zIndex 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          onMouseLeave={() => setIsOpen(false)}
        >
          <button
            className="absolute top-4 left-4 text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
          <div className="bg-white flex flex-col justify-center items-center">
            <img
              src="/Images/Header/logo.png"
              alt="Menu Icon"
              width="220"
              className="p-10"
            />
            <hr className="w-full border-gray-200" />
            <div className="w-full flex justify-around items-center text-[14px] leading-[30px]">
              <Link to="/" className="MobileMenuLink">
                خانه
              </Link>
              <Link to="/AboutUs" className="MobileMenuLink">
                درباره ما
              </Link>
              <Link to="/AboutUs" className="MobileMenuLink">
                تماس با ما
              </Link>
              <Link to="/AboutUs" className="MobileMenuLink">
                بلاگ
              </Link>
            </div>
            <hr className="w-full border-gray-200" />
            <div className="w-full h-[250px] overflow-y-scroll  justify-around items-center text-[14px] leading-[30px]">
              <div className="relative">
                <button
                  className="w-full text-right flex justify-between items-center px-4 py-2"
                  onClick={() => toggleSubMenu("Accessories")}
                >
                  لوازم جانبی موبایل و کامپیوتر
                  <img
                    src="/Images/SVG/TriangleBlack.svg"
                    alt="Arrow"
                    width={8}
                  />
                </button>

                {openSubMenu === "Accessories" && (
                  <div className="bg-[#F5F5F5] px-6 py-2 mr-2">
                    <Link
                      to={`/${openSubMenu}`}
                      className="py-1 text-[12px] flex items-center text-(--color-TextGray)"
                    >
                      همه موارد این دسته
                      <img
                        src="/Images/SVG/ToLeftArrow.svg"
                        alt="Arrow"
                        width={12}
                      />
                    </Link>

                    {navbar?.Accessories?.map(
                      (item: NavbarCategory, index: number) => (
                        <div key={index} className="relative">
                          {item.Submenu && item.Submenu.length > 0 ? (
                            <>
                              <button
                                className="w-full text-right flex justify-between items-center py-1 text-[14px]"
                                onClick={() => toggleNestedSubMenu(item.text)}
                              >
                                {item.text}
                                <img
                                  src="/Images/SVG/TriangleBlack.svg"
                                  alt="Arrow"
                                  width={8}
                                />
                              </button>

                              {openNestedSubMenu === item.text && (
                                <div className="px-4 py-1 border-r-[3px] border-(--color-PrimeOrange)">
                                  <Link
                                    to={`/${openSubMenu}`}
                                    className="py-1 text-[12px] flex items-center text-(--color-TextGray)"
                                  >
                                    همه موارد این دسته
                                    <img
                                      src="/Images/SVG/ToLeftArrow.svg"
                                      alt="Arrow"
                                      width={12}
                                    />
                                  </Link>
                                  {item.Submenu.map(
                                    (
                                      subItem: NavbarSubmenu,
                                      subIndex: number,
                                    ) => (
                                      <NavLink
                                        key={subIndex}
                                        to={`/${subItem.SubMenuText}`}
                                        className="block py-1 text-[12px]"
                                        onClick={toggleMenu}
                                      >
                                        {subItem.SubMenuText}
                                      </NavLink>
                                    ),
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <NavLink
                              to={`/${item.text}`}
                              className="block py-1 text-[14px]"
                              onClick={toggleMenu}
                            >
                              {item.text}
                            </NavLink>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="w-full text-right flex justify-between items-center px-4 py-2"
                  onClick={() => toggleSubMenu("Cable")}
                >
                  کابل - مبدل - رابط
                  <img
                    src="/Images/SVG/TriangleBlack.svg"
                    alt="Arrow"
                    width={8}
                  />
                </button>

                {openSubMenu === "Cable" && (
                  <div className="bg-[#F5F5F5] px-6 py-2 mr-2">
                    <Link
                      to={`/${openSubMenu}`}
                      className="py-1 text-[12px] flex items-center text-(--color-TextGray)"
                    >
                      همه موارد این دسته
                      <img
                        src="/Images/SVG/ToLeftArrow.svg"
                        alt="Arrow"
                        width={12}
                      />
                    </Link>
                    {navbar?.Cable?.map(
                      (item: NavbarCategory, index: number) => (
                        <div key={index} className="relative">
                          {item.Submenu && item.Submenu.length > 0 ? (
                            <>
                              <button
                                className="w-full text-right flex justify-between items-center py-1 text-[14px]"
                                onClick={() => toggleNestedSubMenu(item.text)}
                              >
                                {item.text}
                                <img
                                  src="/Images/SVG/TriangleBlack.svg"
                                  alt="Arrow"
                                  width={8}
                                />
                              </button>

                              {openNestedSubMenu === item.text && (
                                <div className="px-4 py-1 border-r-[3px] border-(--color-PrimeOrange)">
                                  <Link
                                    to={`/${openSubMenu}`}
                                    className="py-1 text-[12px] flex items-center text-(--color-TextGray)"
                                  >
                                    همه موارد این دسته
                                    <img
                                      src="/Images/SVG/ToLeftArrow.svg"
                                      alt="Arrow"
                                      width={12}
                                    />
                                  </Link>
                                  {item.Submenu.map(
                                    (
                                      subItem: NavbarSubmenu,
                                      subIndex: number,
                                    ) => (
                                      <NavLink
                                        key={subIndex}
                                        to={`/${subItem.SubMenuText}`}
                                        className="block py-1 text-[12px]"
                                        onClick={toggleMenu}
                                      >
                                        {subItem.SubMenuText}
                                      </NavLink>
                                    ),
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <NavLink
                              to={`/${item.text}`}
                              className="block py-1 text-[14px]"
                              onClick={toggleMenu}
                            >
                              {item.text}
                            </NavLink>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="w-full text-right flex justify-between items-center px-4 py-2"
                  onClick={() => toggleSubMenu("ContentCrator")}
                >
                  لوازم تولید محتوا
                  <img
                    src="/Images/SVG/TriangleBlack.svg"
                    alt="Arrow"
                    width={8}
                  />
                </button>

                {openSubMenu === "ContentCrator" && (
                  <div className="bg-[#F5F5F5] px-6 py-2 mr-2">
                    <Link
                      to={`/${openSubMenu}`}
                      className="py-1 text-[12px] flex items-center text-(--color-TextGray)"
                    >
                      همه موارد این دسته
                      <img
                        src="/Images/SVG/ToLeftArrow.svg"
                        alt="Arrow"
                        width={12}
                      />
                    </Link>
                    {navbar?.ContentCrator?.map(
                      (item: NavbarCategory, index: number) => (
                        <div key={index} className="relative">
                          {item.Submenu && item.Submenu.length > 0 ? (
                            <>
                              <button
                                className="w-full text-right flex justify-between items-center py-1 text-[14px]"
                                onClick={() => toggleNestedSubMenu(item.text)}
                              >
                                {item.text}
                                <img
                                  src="/Images/SVG/TriangleBlack.svg"
                                  alt="Arrow"
                                  width={8}
                                />
                              </button>

                              {openNestedSubMenu === item.text && (
                                <div className="px-4 py-1 border-r-[3px] border-(--color-PrimeOrange)">
                                  <Link
                                    to={`/${openSubMenu}`}
                                    className="py-1 text-[12px] flex items-center text-(--color-TextGray)"
                                  >
                                    همه موارد این دسته
                                    <img
                                      src="/Images/SVG/ToLeftArrow.svg"
                                      alt="Arrow"
                                      width={12}
                                    />
                                  </Link>
                                  {item.Submenu.map(
                                    (
                                      subItem: NavbarSubmenu,
                                      subIndex: number,
                                    ) => (
                                      <NavLink
                                        key={subIndex}
                                        to={`/${subItem.SubMenuText}`}
                                        className="block py-1 text-[12px]"
                                        onClick={toggleMenu}
                                      >
                                        {subItem.SubMenuText}
                                      </NavLink>
                                    ),
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <NavLink
                              to={`/${item.text}`}
                              className="block py-1 text-[14px]"
                              onClick={toggleMenu}
                            >
                              {item.text}
                            </NavLink>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="w-full text-right flex justify-between items-center px-4 py-2"
                  onClick={() => toggleSubMenu("Networking")}
                >
                  لوازم شبکه
                  <img
                    src="/Images/SVG/TriangleBlack.svg"
                    alt="Arrow"
                    width={8}
                  />
                </button>

                {openSubMenu === "Networking" && (
                  <div className="bg-[#F5F5F5] px-6 py-2 mr-2">
                    <Link
                      to={`/${openSubMenu}`}
                      className="py-1 text-[12px] flex items-center text-(--color-TextGray)"
                    >
                      همه موارد این دسته
                      <img
                        src="/Images/SVG/ToLeftArrow.svg"
                        alt="Arrow"
                        width={12}
                      />
                    </Link>
                    {navbar?.Networking?.map(
                      (item: NavbarCategory, index: number) => (
                        <div key={index} className="relative">
                          {item.Submenu && item.Submenu.length > 0 ? (
                            <>
                              <button
                                className="w-full text-right flex justify-between items-center py-1 text-[14px]"
                                onClick={() => toggleNestedSubMenu(item.text)}
                              >
                                {item.text}
                                <img
                                  src="/Images/SVG/TriangleBlack.svg"
                                  alt="Arrow"
                                  width={8}
                                />
                              </button>

                              {openNestedSubMenu === item.text && (
                                <div className="px-4 py-1 border-r-[3px] border-(--color-PrimeOrange)">
                                  <Link
                                    to={`/${openSubMenu}`}
                                    className="py-1 text-[12px] flex items-center text-(--color-TextGray)"
                                  >
                                    همه موارد این دسته
                                    <img
                                      src="/Images/SVG/ToLeftArrow.svg"
                                      alt="Arrow"
                                      width={12}
                                    />
                                  </Link>
                                  {item.Submenu.map(
                                    (
                                      subItem: NavbarSubmenu,
                                      subIndex: number,
                                    ) => (
                                      <NavLink
                                        key={subIndex}
                                        to={`/${subItem.SubMenuText}`}
                                        className="block py-1 text-[12px]"
                                        onClick={toggleMenu}
                                      >
                                        {subItem.SubMenuText}
                                      </NavLink>
                                    ),
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <NavLink
                              to={`/${item.text}`}
                              className="block py-1 text-[14px]"
                              onClick={toggleMenu}
                            >
                              {item.text}
                            </NavLink>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="w-full text-right flex justify-between items-center px-4 py-2"
                  onClick={() => toggleSubMenu("GameConsole")}
                >
                  کنسول بازی و لوازم جانبی
                  <img
                    src="/Images/SVG/TriangleBlack.svg"
                    alt="Arrow"
                    width={8}
                  />
                </button>

                {openSubMenu === "GameConsole" && (
                  <div className="bg-[#F5F5F5] px-6 py-2 mr-2">
                    <Link
                      to={`/${openSubMenu}`}
                      className="py-1 text-[12px] flex items-center text-(--color-TextGray)"
                    >
                      همه موارد این دسته
                      <img
                        src="/Images/SVG/ToLeftArrow.svg"
                        alt="Arrow"
                        width={12}
                      />
                    </Link>
                    {navbar?.GameConsole?.map(
                      (item: NavbarCategory, index: number) => (
                        <div key={index} className="relative">
                          {item.Submenu && item.Submenu.length > 0 ? (
                            <>
                              <button
                                className="w-full text-right flex justify-between items-center py-1 text-[14px]"
                                onClick={() => toggleNestedSubMenu(item.text)}
                              >
                                {item.text}
                                <img
                                  src="/Images/SVG/TriangleBlack.svg"
                                  alt="Arrow"
                                  width={8}
                                />
                              </button>

                              {openNestedSubMenu === item.text && (
                                <div className="px-4 py-1 border-r-[3px] border-(--color-PrimeOrange)">
                                  <Link
                                    to={`/${openSubMenu}`}
                                    className="py-1 text-[12px] flex items-center text-(--color-TextGray)"
                                  >
                                    همه موارد این دسته
                                    <img
                                      src="/Images/SVG/ToLeftArrow.svg"
                                      alt="Arrow"
                                      width={12}
                                    />
                                  </Link>
                                  {item.Submenu.map(
                                    (
                                      subItem: NavbarSubmenu,
                                      subIndex: number,
                                    ) => (
                                      <NavLink
                                        key={subIndex}
                                        to={`/${subItem.SubMenuText}`}
                                        className="block py-1 text-[12px]"
                                        onClick={toggleMenu}
                                      >
                                        {subItem.SubMenuText}
                                      </NavLink>
                                    ),
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <NavLink
                              to={`/${item.text}`}
                              className="block py-1 text-[14px]"
                              onClick={toggleMenu}
                            >
                              {item.text}
                            </NavLink>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="w-full text-right flex justify-between items-center px-4 py-2"
                  onClick={() => toggleSubMenu("Personal")}
                >
                  لوازم خانگی و شخصی
                  <img
                    src="/Images/SVG/TriangleBlack.svg"
                    alt="Arrow"
                    width={8}
                  />
                </button>

                {openSubMenu === "Personal" && (
                  <div className="bg-[#F5F5F5] px-6 py-2 mr-2">
                    <Link
                      to={`/${openSubMenu}`}
                      className="py-1 text-[12px] flex items-center text-(--color-TextGray)"
                    >
                      همه موارد این دسته
                      <img
                        src="/Images/SVG/ToLeftArrow.svg"
                        alt="Arrow"
                        width={12}
                      />
                    </Link>
                    {navbar?.Personal?.map(
                      (item: NavbarCategory, index: number) => (
                        <div key={index} className="relative">
                          {item.Submenu && item.Submenu.length > 0 ? (
                            <>
                              <button
                                className="w-full text-right flex justify-between items-center py-1 text-[14px]"
                                onClick={() => toggleNestedSubMenu(item.text)}
                              >
                                {item.text}
                                <img
                                  src="/Images/SVG/TriangleBlack.svg"
                                  alt="Arrow"
                                  width={8}
                                />
                              </button>

                              {openNestedSubMenu === item.text && (
                                <div className="px-4 py-1 border-r-[3px] border-(--color-PrimeOrange)">
                                  <Link
                                    to={`/${openSubMenu}`}
                                    className="py-1 text-[12px] flex items-center text-(--color-TextGray)"
                                  >
                                    همه موارد این دسته
                                    <img
                                      src="/Images/SVG/ToLeftArrow.svg"
                                      alt="Arrow"
                                      width={12}
                                    />
                                  </Link>
                                  {item.Submenu.map(
                                    (
                                      subItem: NavbarSubmenu,
                                      subIndex: number,
                                    ) => (
                                      <NavLink
                                        key={subIndex}
                                        to={`/${subItem.SubMenuText}`}
                                        className="block py-1 text-[12px]"
                                        onClick={toggleMenu}
                                      >
                                        {subItem.SubMenuText}
                                      </NavLink>
                                    ),
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <NavLink
                              to={`/${item.text}`}
                              className="block py-1 text-[14px]"
                              onClick={toggleMenu}
                            >
                              {item.text}
                            </NavLink>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="w-full text-right flex justify-between items-center px-4 py-2"
                  onClick={() => toggleSubMenu("Brands")}
                >
                  برند ها
                  <img
                    src="/Images/SVG/TriangleBlack.svg"
                    alt="Arrow"
                    width={8}
                  />
                </button>

                {openSubMenu === "Brands" && (
                  <>
                    {navbar?.Brands?.map(
                      (item: NavbarBrands, index: number) => (
                        <div key={index} className="relative px-4 py-1">
                          {item.PersianText} | {item.EnglishText}
                        </div>
                      ),
                    )}
                  </>
                )}
              </div>
            </div>

            <Link
              to="/dashboard"
              className="w-[80%] h-10 text-center leading-10 rounded-lg bg-[#0B295A] text-white my-10 "
            >
              {isLogin ? "ورود به داشبورد" : "ورود / ثبت نام"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
