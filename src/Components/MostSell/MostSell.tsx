import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchMostSellData } from "../../Redux/MostSell/MostSellAction";
import type { AppDispatch } from "../../Redux/Store";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/free-mode";
// @ts-ignore
import "swiper/css/navigation";

import "./MostSell.css";

import { FreeMode, Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextButton, PrevButton } from "../SwiperButton/SwiperButton";

type mostSellItem = {
  id: number;
  src: string;
  alt: string;
  text: string;
  color: string;
  category: string;
  price: string;
  Inventory: number;
};

const MostSell: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mostSell, loading, error } = useSelector(
    (state: any) =>
      state.mostSell as {
        mostSell: mostSellItem[];
        loading: boolean;
        error: string;
      }
  );

  const swiperRef = useRef<any>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(fetchMostSellData());
  }, []);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.update();
      setIsReady(true);
    }
  }, [MostSell]);

  return (
    <>
      {loading && (
        <div className="text-center m-auto text-3xl">در حال بارگذاری...</div>
      )}
      {error && (
        <div className="error-message error-message text-red-500 text-2xl text-center leading-[60px]">
          MostSell: {error}
        </div>
      )}
      {!loading && !error && (
        <div className="Width w-[90%] bg-[#E2E2E2] p-5 rounded-2xl my-5">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-lg lg:text-2xl font-bold text-(--color-TextGray)">
              پرفروش ترین محصولات
            </h2>
            <Link to="/MostSell" className="text-sm flex items-center gap-2">
              <p className="hidden md:block"> مشاهده همه محصولات</p>
              <img
                src="/Images/SVG/ToLeftArrowBox.svg"
                alt="To left Arrow Box"
                width={15}
              />
            </Link>
          </div>{" "}
          <div className="relative">
            <PrevButton ref={prevRef} />
            <NextButton ref={nextRef} />
            <div className="  w-[98%] m-auto rounded-2xl mt-4">
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={4}
                spaceBetween={20}
                loop={true}
                freeMode={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                navigation={
                  isReady
                    ? { prevEl: prevRef.current, nextEl: nextRef.current }
                    : false
                }
                breakpoints={{
                  100: {
                    slidesPerView: 1.5,
                  },
                  300: {
                    slidesPerView: 2,
                  },
                  500: {
                    slidesPerView: 3,
                  },
                  700: {
                    slidesPerView: 4,
                  },
                }}
                modules={[FreeMode, Autoplay, Navigation]}
                className=""
              >
                {mostSell.map((item) => (
                  <SwiperSlide
                    key={item.id}
                    className="cursor-pointer rounded-lg overflow-hidden flex flex-col justify-center items-center group"
                  >
                    <img src={item.src} alt={item.alt} className="w-full" />
                    <div
                      className={`w-4 h-4 rounded-full absolute top-3 left-3 shadow border-[1px] border-gray-100 ${
                        item.color === "white"
                          ? "bg-white"
                          : item.color === "black"
                          ? "bg-black"
                          : item.color === "blue"
                          ? "bg-blue-500"
                          : item.color === "glass"
                          ? "bg-transparent border-gray-300"
                          : ""
                      }`}
                    ></div>

                    <p className="text-[12px] text-black/60 mt-4 line-clamp-1">
                      {item.category}
                    </p>
                    <p className="w-[85%] line-clamp-1 text-[10px] md:text-[14px] mt-2 group-hover:text-(--color-PrimeBlue) transition duration-200">
                      {item.text}
                    </p>
                    <div className="text-end w-full mt-4 p-0 text-[8px] md:text-[14px] flex flex-row gap-1 justify-end">
                      {item.Inventory === 0 ? (
                        <span className="w-full bg-[#FEF5F5] text-[#9B2B2C] p-2 text-center text-[10px] md:text-[16px]">
                          ناموجود
                        </span>
                      ) : (
                        <div className="p-2 flex flex-row gap-1 items-center">
                          <span className="text-(--color-PrimeBlue) font-bold text-[10px] md:text-[16px]">
                            {item.price}
                          </span>
                          تومان
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MostSell;
