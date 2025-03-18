import React from "react";
import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
  const CliclHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {/* Footer Wrapper Start */}
      <footer className="w-full h-fit bg-white">
        {/* Footer Top Part Start */}
        <div className="w-full h-fit flex justify-between items-center bg-[#E2E2E2] p-4">
          <div className="Width h-full mx-auto block lg:flex space-y-3 lg:space-y-0  justify-between items-center flex-wrap">
            <div className="FooterGrayItems">
              <img
                src="/Images/Icons/Phone.png"
                alt="Phone"
                width={22}
              />
              <a href="tel:+989021994438">۰۹۰۲۱۹۹۴۴۳۸۸</a>
            </div>
            <div className="FooterGrayItems">
              <img
                src="/Images/SVG/Clock.svg"
                alt="Clock"
                width={22}
              />
              <p>
                شنبه تا چهارشنبه از ساعت 10 صبح الی ساعت 18 پنج شنبه ها از 10
                صبح الی ساعت 16
              </p>
            </div>
            <div className="FooterGrayItems">
              <img
                src="/Images/Icons/Location.png"
                alt="Location"
                width={22}
              />
              <p>
                تهران - میدان امام خمینی - پاساژ لباف - همکف - پلاک ۳ فروشگاه
                بدیع
              </p>
            </div>
            <button
              onClick={CliclHandler}
              className="hidden xl:flex items-center gap-1 bg-white p-2 rounded-lg shadow-md cursor-pointer hover:bg-[#E2E2E2] transition-all duration-300 text-sm "
            >
              برو بالا
              <img
                src="/Images/Icons/Top-Triangle.png"
                alt="Triangle"
                width={10}
              />
            </button>
          </div>
        </div>
        {/* Footer Top Part End */}
        {/* Footer Center Part Start */}
        <div className="w-full bg-(--color-PrimeGray) p-4">
          <div className="Width h-full mx-auto block lg:flex space-y-3 lg:space-y-0  justify-around items-center flex-wrap">
            <div className="w-[95%] lg:w-[17%] mx-auto flex flex-wrap items-center justify-center lg:flex-col gap-3  p-4">
              <img
                src="/Images/Header/logo.png"
                alt="Logo"
                width={200}
              />
              <a
                href="https://www.instagram.com/dastresii"
                className="flex items-center gap-2"
              >
                <p className="text-sm">با ما در ارتباط باشید:</p>
                <img
                  src="/Images/SVG/Instagram.svg"
                  alt="Instagram"
                  width={40}
                />
              </a>
            </div>
            <div className="w-[95%] lg:w-[57%] mx-auto text-center lg:text-start">
              <h2 className="font-bold text-xl mb-2">
                فروشگاه اینترنتی دسترسی
              </h2>
              <p className="text-(--color-TextGray) text-justify">
                فروشگاه دسترسی فعالیت خود را از سال 1389 به صورت فروش فیزیکی
                کالا در حوزه لوازم جانبی کامپیوتر و موبایل در تهران شروع کرد و
                از سال 1398 از طریق پیج اینستاگرام وارد فروش آنلاین شد و به خاطر
                ارائه کالای اصلی و مشاوره های دقیق در بازه بسیار کوتاهی توانست
                اعتماد بسیاری از مشتریانش را جلب کند و سرانجام در سال 1399 فروش
                از طریق سایت را هم به فعالیت های خود اضافه کرد تا اینکه بتواند
                با بررسی دقیق کالاها انتخاب صحیح شما را به ارمغان آورد. و امروز
                دسترسی فعالیت خود را در زمینه آداپتور موبایل، کابل شارژ،
                پاوربانک، ساعت هوشمند، هندزفری و هدست، لوازم گیمینگ، باتری و
                شارژر، لوازم شبکه، تجهیزات ذخیره سازی، گیرنده دیجیتال و هزاران
                گجت جذاب ادامه میدهد.
              </p>
            </div>
            <div className="w-[95%] lg:w-[17%] mx-auto flex flex-row justify-center items-center flex-wrap lg:flex-col gap-3 lg:gap-1">
              <h2 className="font-bold text-lg hidden lg:block mb-2">
                دسترسی سریع
              </h2>
              <NavLink to="/" className="FooterQuickLinks">
                باشگاه مشتریان
              </NavLink>
              <NavLink to="/" className="FooterQuickLinks">
                سوالات متداول
              </NavLink>
              <NavLink to="/" className="FooterQuickLinks">
                بلاگ
              </NavLink>
              <NavLink to="/" className="FooterQuickLinks">
                شرایط و قوانین
              </NavLink>
              <NavLink to="/" className="FooterQuickLinks">
                ارتباط ما
              </NavLink>
              <NavLink to="/" className="FooterQuickLinks">
                درباره ما
              </NavLink>
            </div>
          </div>
        </div>
        {/* Footer Center Part End */}
        {/* Footer Bottom Part Start */}
        <div className="w-full h-fit bg-(--color-PrimeBlue) p-4 text-white text-center">
      این سایت توسط امیررضا آذریون و از روی سایت دسترسی ساخته شده
        </div>
        {/* Footer Bottom Part End */}
      </footer>
    </>
  );
};

export default Footer;
