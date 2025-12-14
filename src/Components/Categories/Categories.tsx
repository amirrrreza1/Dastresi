import { Swiper, SwiperSlide } from "swiper/react";
import data from "../../../db.json";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css/free-mode";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css/navigation";

import "./Categories.css";

import { FreeMode, Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { NextButton, PrevButton } from "../SwiperButton/SwiperButton";

type CategoryItem = {
  id: string;
  src: string;
  alt: string;
};

export default function Categories() {
  const swiperRef = useRef<any>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const categories: CategoryItem[] = data.Categories;

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
      setIsReady(true);
    }
  }, [categories]);

  return (
    <>
      <div className="my-10">
        <div className="Width w-[90%] my-5 p-5 rounded-2xl bg-white">
          <div className="text-center text-2xl font-bold bg-white">
            دسته بندی های منتخب
          </div>

          <div className="relative Width w-[90%] pb-5 rounded-2xl my-5 hidden lg:block">
            <PrevButton ref={prevRef} />
            <NextButton ref={nextRef} />
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView={6}
              spaceBetween={5}
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
              modules={[FreeMode, Autoplay, Navigation]}
            >
              {categories.map((item, index) => (
                <SwiperSlide key={index} className="cursor-pointer">
                  <img src={item.src} alt={item.alt} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="lg:hidden flex  flex-wrap justify-center items-center">
            {categories.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg flex justify-center items-center w-[40%]"
              >
                <img src={item.src} alt={item.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
