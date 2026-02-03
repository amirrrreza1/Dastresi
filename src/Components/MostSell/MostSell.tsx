import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css/free-mode";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css/navigation";

import "./MostSell.css";

import { FreeMode, Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { NextButton, PrevButton } from "../SwiperButton/SwiperButton";
import { Product } from "../Dashboard/Admin/Products/Type";
import { supabase } from "../../supabase";
import { toast } from "react-toastify";

const MostSell: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const [mostSell, setMostSell] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("most_sell", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setMostSell(data);
      } catch (err) {
        toast("خطا در بارگذاری محصولات با تخفیف بیشتر: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.update();
      setIsReady(true);
    }
  }, [mostSell]);

  if (loading)
    return (
      <div className="w-[90%] max-w-[1200px] h-[420px] mx-auto bg-gray-200 animate-pulse rounded-2xl mb-12" />
    );

  return (
    <>
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
                  className="cursor-pointer rounded-lg flex flex-col justify-center items-center group "
                >
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full rounded-lg"
                    />
                    <div
                      className={`w-4 h-4 rounded-full absolute top-3 left-3 shadow border border-gray-100`}
                      style={{ backgroundColor: item.color.hex }}
                    ></div>

                    <p className="text-[12px] text-black/60 mt-4 line-clamp-1">
                      {item.category}
                    </p>
                    <div className="w-[85%] line-clamp-1 text-[10px] md:text-[14px] mt-2 group-hover:text-(--color-PrimeBlue) transition duration-200">
                      {item.title}
                    </div>

                    <div className="text-end w-full mt-4 p-0 text-[8px] md:text-[14px] flex flex-row gap-1 justify-end ">
                      {item.inventory === 0 ? (
                        <span className="w-full bg-[#FEF5F5] text-[#9B2B2C] p-2 text-center text-[10px] md:text-[16px] rounded-b-lg">
                          ناموجود
                        </span>
                      ) : (
                        <div className="p-2 flex flex-row gap-1 items-center">
                          <span className="text-(--color-PrimeBlue) font-bold text-[10px] md:text-[16px]">
                            {item.price.toLocaleString("fa-IR")}
                          </span>
                          تومان
                        </div>
                      )}
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default MostSell;
