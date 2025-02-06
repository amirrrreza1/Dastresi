import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import type { AppDispatch } from "../../Redux/Store";
import { fetchNavbarData } from "../../Redux/Navbar/NavbarAction";

type NavbarSubmenu = {
  id: number;
  SubMenuText: string;
};

type NavbarData = {
  id: number;
  text: string;
  PersianText: string;
  EnglishText: string;
  Submenu?: NavbarSubmenu[];
};

type NavbarItem = {
  Home: NavbarData[];
  Accessories: NavbarData[];
  Cable: NavbarData[];
  ContentCrator: NavbarData[];
  Networking: NavbarData[];
  GameConsole: NavbarData[];
  Personal: NavbarData[];
  Brands: NavbarData[];
};

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { navbar, loading, error } = useSelector(
    (state: any) =>
      state.navbar as {
        navbar: NavbarItem;
        loading: boolean;
        error: string;
      }
  );
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null); // کنترل باز بودن زیرمنو
  const [openNestedSubMenu, setOpenNestedSubMenu] = useState<string | null>(
    null
  );

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleSubMenu = (menu: string) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
    setOpenNestedSubMenu(null); // بستن زیرمنوی دوم هنگام تغییر منوی اول
  };
  const toggleNestedSubMenu = (submenu: string) => {
    setOpenNestedSubMenu(openNestedSubMenu === submenu ? null : submenu);
  };

  useEffect(() => {
    dispatch(fetchNavbarData());
  }, []);

  return (
    <>
      {loading && (
        <div className="text-center m-auto text-3xl">در حال بارگذاری...</div>
      )}
      {error && (
        <div className="error-message text-red-500 text-2xl text-center leading-[60px]">
          DailyOffers :{error}
        </div>
      )}
      {/* Header Wrapper Start */}
      {!loading && !error && (
        <div>
          {/* Desktop Header Start */}
          <header className="w-full h-fit shadow-md bg-white z-70 sticky top-0 left-0 right-0 hidden lg:block">
            {/* Top Part of the Header Start */}
            <div className="Width h-[80px] mx-auto flex justify-between  items-center gap-[20px] px-4">
              {/* Logo */}
              <NavLink to="/" className="flex items-center">
                <img
                  src="./Images/Header/logo.png"
                  alt="Logo"
                  width="100"
                  height="40"
                />
              </NavLink>
              {/* Search Bar */}
              <div className="w-[30%]">
                <button className="w-full h-10 px-3 rounded-xl bg-(--color-PrimeGray) shadow flex items-center justify-center">
                  <img
                    src="./Images/SVG/SearchIcon.svg"
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
              {/* User Actions */}
              <div className="w-[60%] flex items-center justify-between max-w-[520px]">
                {/* Pages */}
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
                {/* Items */}
                <div className="flex items-center">
                  {/* Shop Basket */}
                  <div className="w-[60px] h-[60px] relative flex justify-center items-center">
                    <a
                      href="#"
                      className="w-[40px] h-[40px] bg-(--color-PrimeGray) flex items-center justify-center shadow-md rounded-lg group"
                    >
                      <img
                        src="./Images/SVG/ShoppingCartOrange.svg"
                        alt=""
                        width="20"
                        height="20"
                        className="absolute w-5 h-5 flex justify-center items-center transition-opacity duration-300 group-hover:opacity-0"
                      />
                      <img
                        src="./Images/SVG/ShoppingCartBlack.svg"
                        alt=""
                        width="20"
                        height="20"
                        className="absolute w-5 h-5 flex justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </a>
                    <div className="w-[20px] h-[20px] text-white bg-(--color-PrimeOrange) absolute top-0 right-0 rounded-full shadow-lg leading-[20px] text-center">
                      ۰
                    </div>
                  </div>

                  {/* User Profile */}
                  <a
                    href="#"
                    className="h-[40px] shadow leading-[40px] px-3 bg-(--color-PrimeBlue) text-white rounded-lg hover:bg-black transition-bg-color duration-300"
                  >
                    ورود و ثبت نام
                  </a>
                </div>
              </div>
            </div>
            {/* Top Part of the Header End */}
            {/* Navbar Start */}
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
                      className="group-hover:!hidden"
                    />
                    <img
                      src="/Images/SVG/TriangleOrange.svg"
                      alt="Triangle Indicator Hover"
                      width={8}
                      className={`hidden group-hover:!block`}
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
                        className="group-hover:!hidden"
                      />
                      <img
                        src="/Images/SVG/TriangleOrange.svg"
                        alt="Triangle Indicator Hover"
                        width={8}
                        className="hidden group-hover:!block"
                      />
                    </div>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-[40px] hidden w-[250px] bg-white shadow-lg group-hover:block">
                      {navbar?.Accessories?.map((item, index) => (
                        <div key={index} className="relative group/item">
                          {item.Submenu && item.Submenu.length > 0 ? (
                            <>
                              <button className="w-full text-right hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light flex items-center justify-between px-2">
                                {item.text}
                                <img
                                  src="./Images/SVG/ToLeftArrow.svg"
                                  alt="to left arrow"
                                  width={15}
                                />
                              </button>
                              <div className="absolute  w-[200px] right-[250px] top-0 hidden bg-white shadow-lg group-hover/item:block">
                                {item.Submenu.map(
                                  (subItem: any, subIndex: number) => (
                                    <NavLink
                                      key={subIndex}
                                      to={`/${subItem.SubMenuText}`}
                                      className="block hover:bg-gray-100 px-2 text-black hover:text-(--color-PrimeBlue) font-light"
                                    >
                                      {subItem.SubMenuText}
                                    </NavLink>
                                  )
                                )}
                              </div>
                            </>
                          ) : (
                            <NavLink
                              to={`/${item.text}`}
                              className="block hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light px-2"
                            >
                              {item.text}
                            </NavLink>
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
                        className="group-hover:!hidden"
                      />
                      <img
                        src="/Images/SVG/TriangleOrange.svg"
                        alt="Triangle Indicator Hover"
                        width={8}
                        className="hidden group-hover:!block"
                      />
                    </div>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-[40px] hidden w-[250px] bg-white shadow-lg group-hover:block">
                      {navbar?.Cable?.map((item, index) => (
                        <div key={index} className="relative group/item">
                          {item.Submenu && item.Submenu.length > 0 ? (
                            <>
                              <button className="w-full text-right hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light flex items-center justify-between px-2">
                                {item.text}
                                <img
                                  src="./Images/SVG/ToLeftArrow.svg"
                                  alt="to left arrow"
                                  width={15}
                                />
                              </button>
                              <div className="absolute  w-[200px] right-[250px] top-0 hidden bg-white shadow-lg group-hover/item:block">
                                {item.Submenu.map(
                                  (subItem: any, subIndex: number) => (
                                    <NavLink
                                      key={subIndex}
                                      to={`/${subItem.SubMenuText}`}
                                      className="block hover:bg-gray-100 px-2 text-black hover:text-(--color-PrimeBlue) font-light"
                                    >
                                      {subItem.SubMenuText}
                                    </NavLink>
                                  )
                                )}
                              </div>
                            </>
                          ) : (
                            <NavLink
                              to={`/${item.text}`}
                              className="block hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light px-2"
                            >
                              {item.text}
                            </NavLink>
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
                        className="group-hover:!hidden"
                      />
                      <img
                        src="/Images/SVG/TriangleOrange.svg"
                        alt="Triangle Indicator Hover"
                        width={8}
                        className="hidden group-hover:!block"
                      />
                    </div>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-[40px] hidden w-[250px] bg-white shadow-lg group-hover:block">
                      {navbar?.ContentCrator?.map((item, index) => (
                        <div key={index} className="relative group/item">
                          {item.Submenu && item.Submenu.length > 0 ? (
                            <>
                              <button className="w-full text-right hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light flex items-center justify-between px-2">
                                {item.text}
                                <img
                                  src="./Images/SVG/ToLeftArrow.svg"
                                  alt="to left arrow"
                                  width={15}
                                />
                              </button>
                              <div className="absolute  w-[200px] right-[250px] top-0 hidden bg-white shadow-lg group-hover/item:block">
                                {item.Submenu.map(
                                  (subItem: any, subIndex: number) => (
                                    <NavLink
                                      key={subIndex}
                                      to={`/${subItem.SubMenuText}`}
                                      className="block hover:bg-gray-100 px-2 text-black hover:text-(--color-PrimeBlue) font-light"
                                    >
                                      {subItem.SubMenuText}
                                    </NavLink>
                                  )
                                )}
                              </div>
                            </>
                          ) : (
                            <NavLink
                              to={`/${item.text}`}
                              className="block hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light px-2"
                            >
                              {item.text}
                            </NavLink>
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
                        className="group-hover:!hidden"
                      />
                      <img
                        src="/Images/SVG/TriangleOrange.svg"
                        alt="Triangle Indicator Hover"
                        width={8}
                        className="hidden group-hover:!block"
                      />
                    </div>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-[40px] hidden w-[250px] bg-white shadow-lg group-hover:block">
                      {navbar?.Networking?.map((item, index) => (
                        <div key={index} className="relative group/item">
                          {item.Submenu && item.Submenu.length > 0 ? (
                            <>
                              <button className="w-full text-right hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light flex items-center justify-between px-2">
                                {item.text}
                                <img
                                  src="./Images/SVG/ToLeftArrow.svg"
                                  alt="to left arrow"
                                  width={15}
                                />
                              </button>
                              <div className="absolute  w-[200px] right-[250px] top-0 hidden bg-white shadow-lg group-hover/item:block">
                                {item.Submenu.map(
                                  (subItem: any, subIndex: number) => (
                                    <NavLink
                                      key={subIndex}
                                      to={`/${subItem.SubMenuText}`}
                                      className="block hover:bg-gray-100 px-2 text-black hover:text-(--color-PrimeBlue) font-light"
                                    >
                                      {subItem.SubMenuText}
                                    </NavLink>
                                  )
                                )}
                              </div>
                            </>
                          ) : (
                            <NavLink
                              to={`/${item.text}`}
                              className="block hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light px-2"
                            >
                              {item.text}
                            </NavLink>
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
                        className="group-hover:!hidden"
                      />
                      <img
                        src="/Images/SVG/TriangleOrange.svg"
                        alt="Triangle Indicator Hover"
                        width={8}
                        className="hidden group-hover:!block"
                      />
                    </div>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-[40px] hidden w-[250px] bg-white shadow-lg group-hover:block">
                      {navbar?.GameConsole?.map((item, index) => (
                        <div key={index} className="relative group/item">
                          {item.Submenu && item.Submenu.length > 0 ? (
                            <>
                              <button className="w-full text-right hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light flex items-center justify-between px-2">
                                {item.text}
                                <img
                                  src="./Images/SVG/ToLeftArrow.svg"
                                  alt="to left arrow"
                                  width={15}
                                />
                              </button>
                              <div className="absolute  w-[200px] right-[250px] top-0 hidden bg-white shadow-lg group-hover/item:block">
                                {item.Submenu.map(
                                  (subItem: any, subIndex: number) => (
                                    <NavLink
                                      key={subIndex}
                                      to={`/${subItem.SubMenuText}`}
                                      className="block hover:bg-gray-100 px-2 text-black hover:text-(--color-PrimeBlue) font-light"
                                    >
                                      {subItem.SubMenuText}
                                    </NavLink>
                                  )
                                )}
                              </div>
                            </>
                          ) : (
                            <NavLink
                              to={`/${item.text}`}
                              className="block hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light px-2"
                            >
                              {item.text}
                            </NavLink>
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
                        className="group-hover:!hidden"
                      />
                      <img
                        src="/Images/SVG/TriangleOrange.svg"
                        alt="Triangle Indicator Hover"
                        width={8}
                        className="hidden group-hover:!block"
                      />
                    </div>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-[40px] hidden w-[250px] bg-white shadow-lg group-hover:block">
                      {navbar?.Personal?.map((item, index) => (
                        <div key={index} className="relative group/item">
                          {item.Submenu && item.Submenu.length > 0 ? (
                            <>
                              <button className="w-full text-right hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light flex items-center justify-between px-2">
                                {item.text}
                                <img
                                  src="./Images/SVG/ToLeftArrow.svg"
                                  alt="to left arrow"
                                  width={15}
                                />
                              </button>
                              <div className="absolute  w-[200px] right-[250px] top-0 hidden bg-white shadow-lg group-hover/item:block">
                                {item.Submenu.map(
                                  (subItem: any, subIndex: number) => (
                                    <NavLink
                                      key={subIndex}
                                      to={`/${subItem.SubMenuText}`}
                                      className="block hover:bg-gray-100 px-2 text-black hover:text-(--color-PrimeBlue) font-light"
                                    >
                                      {subItem.SubMenuText}
                                    </NavLink>
                                  )
                                )}
                              </div>
                            </>
                          ) : (
                            <NavLink
                              to={`/${item.text}`}
                              className="block hover:bg-gray-100 text-black hover:text-(--color-PrimeBlue) font-light px-2"
                            >
                              {item.text}
                            </NavLink>
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
                        className="group-hover:!hidden"
                      />
                      <img
                        src="/Images/SVG/TriangleOrange.svg"
                        alt="Triangle Indicator Hover"
                        width={8}
                        className="hidden group-hover:!block"
                      />
                    </div>

                    {/* Dropdown Menu */}
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
                      <Link
                        to="/Brands"
                        className="w-full h-[40px] px-3 text-[12px] hover:text-(--color-PrimeBlue)"
                      >
                        مشاهده دیگر برندها {">"}
                      </Link>
                    </div>
                  </div>
                )}
              </NavLink>
            </nav>
            {/* Navbar End */}
          </header>
          {/* Desktop Header End */}
          {/* Desktop Mobile Strat */}
          <header className="w-full h-[60px] shadow-md bg-white z-40 fixed top-0 left-0 right-0 flex lg:hidden justify-between items-center p-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsOpen(true)}>
                <img
                  src="./Images/SVG/MenuIcon.svg"
                  alt="Menu Icon"
                  width="30"
                />
              </button>
              <Link to="/">
                <img src="./Images/Header/logo.png" alt="Logo" width="60" />
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="">
                <img
                  src="./Images/SVG/SearchIconBlack.svg"
                  alt="SearchIcon"
                  width="25"
                />
              </div>
              <Link to="/Profile">
                <img
                  src="./Images/SVG/UserIcon.svg"
                  alt="UserIcon"
                  width="25"
                />
              </Link>
              <div className="w-[45px] h-[45px] relative flex justify-center items-center">
                <Link
                  to="/"
                  className="w-[40px] h-[40px] flex items-center justify-center  group"
                >
                  <img
                    src="./Images/SVG/ShoppingCartBlack.svg"
                    alt=""
                    width="20"
                    height="20"
                    className="absolute w-5 h-5 flex justify-center items-center"
                  />
                </Link>
                <div className="w-[20px] h-[20px] text-white bg-(--color-PrimeOrange) absolute top-0 right-0 rounded-full shadow-lg leading-[20px] text-center">
                  ۰
                </div>
              </div>
            </div>
          </header>
          {/* Desktop Mobile End */}
        </div>
      )}
      {/* Header Wrapper End */}
      <div
        className={`fixed top-0 right-0 h-screen w-[300px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* دکمه بستن */}
        <button
          className="absolute top-4 left-4 text-gray-600"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>
        {/* منوی کشویی */}
        <div
          className={`sticky  top-0 right-0  w-[300px] h-full transform transition-transform duration-300 ease-in-out zIndex 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* دکمه بستن */}
          <button
            className="absolute top-4 left-4 text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
          <div className="bg-white flex flex-col justify-center items-center">
            <img
              src="./Images/Header/logo.png"
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
                {" "}
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

                {/* داینامیک کردن زیرمنو */}
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
                    {navbar?.Accessories?.map((item: any, index: number) => (
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

                            {/* زیرمنوی تو در تو */}
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
                                  (subItem: any, subIndex: number) => (
                                    <NavLink
                                      key={subIndex}
                                      to={`/${subItem.SubMenuText}`}
                                      className="block py-1 text-[12px]"
                                      onClick={toggleMenu}
                                    >
                                      {subItem.SubMenuText}
                                    </NavLink>
                                  )
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
                    ))}
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

                {/* داینامیک کردن زیرمنو */}
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
                    {navbar?.Cable?.map((item: any, index: number) => (
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

                            {/* زیرمنوی تو در تو */}
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
                                  (subItem: any, subIndex: number) => (
                                    <NavLink
                                      key={subIndex}
                                      to={`/${subItem.SubMenuText}`}
                                      className="block py-1 text-[12px]"
                                      onClick={toggleMenu}
                                    >
                                      {subItem.SubMenuText}
                                    </NavLink>
                                  )
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
                    ))}
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

                {/* داینامیک کردن زیرمنو */}
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
                    {navbar?.ContentCrator?.map((item: any, index: number) => (
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

                            {/* زیرمنوی تو در تو */}
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
                                  (subItem: any, subIndex: number) => (
                                    <NavLink
                                      key={subIndex}
                                      to={`/${subItem.SubMenuText}`}
                                      className="block py-1 text-[12px]"
                                      onClick={toggleMenu}
                                    >
                                      {subItem.SubMenuText}
                                    </NavLink>
                                  )
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
                    ))}
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

                {/* داینامیک کردن زیرمنو */}
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
                    {navbar?.Networking?.map((item: any, index: number) => (
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

                            {/* زیرمنوی تو در تو */}
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
                                  (subItem: any, subIndex: number) => (
                                    <NavLink
                                      key={subIndex}
                                      to={`/${subItem.SubMenuText}`}
                                      className="block py-1 text-[12px]"
                                      onClick={toggleMenu}
                                    >
                                      {subItem.SubMenuText}
                                    </NavLink>
                                  )
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
                    ))}
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

                {/* داینامیک کردن زیرمنو */}
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
                    {navbar?.GameConsole?.map((item: any, index: number) => (
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

                            {/* زیرمنوی تو در تو */}
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
                                  (subItem: any, subIndex: number) => (
                                    <NavLink
                                      key={subIndex}
                                      to={`/${subItem.SubMenuText}`}
                                      className="block py-1 text-[12px]"
                                      onClick={toggleMenu}
                                    >
                                      {subItem.SubMenuText}
                                    </NavLink>
                                  )
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
                    ))}
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

                {/* داینامیک کردن زیرمنو */}
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
                    {navbar?.Personal?.map((item: any, index: number) => (
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

                            {/* زیرمنوی تو در تو */}
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
                                  (subItem: any, subIndex: number) => (
                                    <NavLink
                                      key={subIndex}
                                      to={`/${subItem.SubMenuText}`}
                                      className="block py-1 text-[12px]"
                                      onClick={toggleMenu}
                                    >
                                      {subItem.SubMenuText}
                                    </NavLink>
                                  )
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
                    ))}
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

                {/* داینامیک کردن زیرمنو */}
                {openSubMenu === "Brands" && (
                  <>
                    {navbar?.Brands?.map((item: any, index: number) => (
                      <div key={index} className="relative px-4 py-1">
                        {item.PersianText} | {item.EnglishText}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className="w-[80%] h-[40px] text-center leading-[40px] rounded-lg bg-[#0B295A] text-white my-10 ">
              ورود به باشگاه مشتریان
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
