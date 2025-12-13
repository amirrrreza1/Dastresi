import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import data from "../../../db.json";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css/pagination";

import "./MainSlider.css";

type SliderItem = {
  src: string;
  alt: string;
};

const MainSlider: React.FC = () => {
  const mainSlider: SliderItem[] = data.MainSlider;

  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="w-[90%]! max-w-[1200px] rounded-2xl mt-20 lg:my-7"
      >
        {mainSlider.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.src} alt={item.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MainSlider;
