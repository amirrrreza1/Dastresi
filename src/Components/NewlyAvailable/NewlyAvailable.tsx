import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css/free-mode";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css/navigation";

import "./NewlyAvailable.css";

import { FreeMode, Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { NextButton, PrevButton } from "../SwiperButton/SwiperButton";
import { Tooltip } from "react-tooltip";
import data from "../../../db.json";

type newlyAvailableItem = {
  id: string;
  src: string;
  alt: string;
  text: string;
  color: string;
  category: string;
  price: string;
  Inventory: number;
};

const NewlyAvailable: React.FC = () => {
  const newlyAvailable: newlyAvailableItem[] = data.NewlyAvailable;
  const swiperRef = useRef<any>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
      setIsReady(true);
    }
  }, [newlyAvailable]);

  return (
    <>
      <div className="Width w-[90%] bg-[#E2E2E2] p-5 rounded-2xl my-5">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-lg lg:text-2xl font-bold text-(--color-TextGray)">
            همین الان موجود شد...
          </h2>
          <Link
            to="/NewlyAvailable"
            className="text-sm flex items-center gap-2"
          >
            <span className="hidden md:block"> مشاهده همه محصولات</span>
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
              {newlyAvailable.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="cursor-pointer rounded-lg flex flex-col justify-center items-center group "
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full rounded-lg"
                  />
                  <div
                    className={`w-4 h-4 rounded-full absolute top-3 left-3 shadow border border-gray-100 ${
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
                  <div className="text-[12px] text-black/60 mt-4 line-clamp-1">
                    {item.category}
                  </div>
                  <div
                    data-tooltip-id={`NewlyAvailable${item.id}`}
                    data-tooltip-content={item.text}
                    data-tooltip-place="top"
                    className="w-[85%] line-clamp-1 text-[10px] md:text-[14px] mt-2 group-hover:text-(--color-PrimeBlue) transition duration-200"
                  >
                    {item.text}
                  </div>
                  <Tooltip
                    className="z-[999]!"
                    positionStrategy="fixed"
                    id={`NewlyAvailable${item.id}`}
                  />
                  <div className="text-end w-full mt-4 p-0 text-[8px] md:text-[14px] flex flex-row gap-1 justify-end">
                    {item.Inventory === 0 ? (
                      <div className="w-full bg-[#FEF5F5] text-[#9B2B2C] p-2 text-center text-[10px] md:text-[16px]">
                        ناموجود
                      </div>
                    ) : (
                      <div className="p-2 flex flex-row gap-1 items-center">
                        <span className="text-(--color-PrimeBlue) font-bold text-[10px] md:text-[16px]">
                          {item.price}
                        </span>
                        <span>تومان</span>
                      </div>
                    )}
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

export default NewlyAvailable;
