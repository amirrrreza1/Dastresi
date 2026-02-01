"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { supabase } from "../../supabase";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css/pagination";
import "./MainSlider.css";

type SliderItem = {
  id: string;
  image_url: string;
  link: string;
};

const MainSlider: React.FC = () => {
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const { data, error } = await supabase
          .from("sliders")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        if (data) setSliders(data);
      } catch (err) {
        console.error("Error fetching sliders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  if (loading)
    return (
      <div className="w-[90%] max-w-[1200px] aspect-[112/37] mx-auto bg-gray-200 animate-pulse rounded-2xl mt-20" />
    );

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      loop={sliders.length > 1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      className="w-[90%]! max-w-[1200px] aspect-[112/37] mx-auto rounded-2xl mt-20 lg:my-7"
    >
      {sliders.map((slider) => (
        <SwiperSlide key={slider.id}>
          <a
            href={slider.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <img
              src={slider.image_url}
              alt="Slider Image"
              className="w-full h-full object-cover"
            />
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
