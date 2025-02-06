
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchBrandsData } from "../../Redux/Brands/BrandsAction";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/free-mode";
// @ts-ignore
import "swiper/css/navigation";

import "./Brands.css";

import { FreeMode, Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextButton, PrevButton } from "../SwiperButton/SwiperButton";
import type { AppDispatch } from "../../Redux/Store";

type BrandItem = {
  id: number;
  src: string;
  alt: string;
};

const Brands: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { brands, loading, error } = useSelector(
    (state: any) =>
      state.brands as {
        brands: BrandItem[];
        loading: boolean;
        error: string;
      }
  );

  const swiperRef = useRef<any>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(fetchBrandsData());
  }, []);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.update();
      setIsReady(true);
    }
  }, [brands]);

  return (
    <>
      {loading && (
        <div className="text-center m-auto text-3xl">در حال بارگذاری...</div>
      )}
      {error && (
        <div className="error-message error-message text-red-500 text-2xl text-center leading-[60px]">
          Categories: {error}
        </div>
      )}
      {!loading && !error && (
        <div className="Width w-[90%] my-5 bg-white p-5 rounded-2xl">
          <div className="text-(--color-TextGray) text-lg lg:text-2xl font-bold">
            محبوب ترین برندها
          </div>
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
                    slidesPerView: 2,
                  },
                  300: {
                    slidesPerView: 3,
                  },
                  500: {
                    slidesPerView: 4,
                  },
                  700: {
                    slidesPerView: 5,
                  },
                  900: {
                    slidesPerView: 6,
                  },
                }}
                modules={[FreeMode, Autoplay, Navigation]}
              >
                {brands.map((item) => (
                  <SwiperSlide key={item.id} className="group">
                    <div className="cursor-pointer  shadow rounded-lg overflow-hidden flex flex-col justify-center items-center my-6 group-hover:translate-y-[-10px] transition duration-200">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="px-2 lg:px-7"
                      />
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

export default Brands;
