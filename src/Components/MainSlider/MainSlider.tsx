import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { AppDispatch } from "../../Redux/Store";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";

import { fetchMainSliderData } from "../../Redux/MainSlider/MainSliderAction";
import "./MainSlider.css";

type SliderItem = {
  src: string;
  alt: string;
};

const MainSlider: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mainSlider, loading, error } = useSelector(
    (state: any) =>
      state.mainSlider as {
        mainSlider: SliderItem[];
        loading: boolean;
        error: string;
      }
  );

  useEffect(() => {
    dispatch(fetchMainSliderData());
  }, []);

  return (
    <>
      {loading && <div>در حال بارگذاری...</div>}
      {error && <div className="error-message text-red-500 text-2xl text-center leading-[60px]">MainSlider : {error}</div>}
      {!loading && !error && (
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
          className="!w-[90%] max-w-[1200px] rounded-2xl mt-[80px] lg:my-7"
        >
          {mainSlider.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.src} alt={item.alt} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default MainSlider;
