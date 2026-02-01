"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { NextButton, PrevButton } from "../SwiperButton/SwiperButton";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css/free-mode";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css/navigation";

import "./Brands.css";
import { supabase } from "../../supabase";

type BrandItem = {
  id: string;
  image_url: string;
  name: string;
};

const Brands: React.FC = () => {
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data, error } = await supabase
          .from("brands")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setBrands(data);
      } catch (err) {
        console.error("Error fetching brands:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const swiperRef = useRef<any>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.update();
      setIsReady(true);
    }
  }, [brands]);

  if (loading)
    return (
      <div className="w-[90%] max-w-[1200px] h-[220px] mx-auto bg-gray-200 animate-pulse rounded-2xl mb-12" />
    );

  return (
    <>
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
                  <div className="cursor-pointer  shadow rounded-lg overflow-hidden flex flex-col justify-center items-center my-6 group-hover:-translate-y-2.5 transition duration-200">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="px-2 lg:px-7"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brands;
