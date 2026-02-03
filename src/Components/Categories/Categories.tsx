import { Swiper, SwiperSlide } from "swiper/react";

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
import { supabase } from "../../supabase";
import { toast } from "react-toastify";

type CategoryItem = {
  id: string;
  image_url: string;
  name: string;
};

export default function Categories() {
  const swiperRef = useRef<any>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setCategories(data);
      } catch (err) {
        toast("خطا در بارگذاری دسته بندی ها: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
      setIsReady(true);
    }
  }, [categories]);

  if (loading)
    return (
      <div className="w-[90%] max-w-[1200px] h-[220px] mx-auto bg-gray-200 animate-pulse rounded-2xl mb-12" />
    );

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
                  <img src={item.image_url} alt={item.name} />
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
                <img src={item.image_url} alt={item.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
