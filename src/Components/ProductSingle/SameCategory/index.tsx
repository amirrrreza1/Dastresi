import { Swiper, SwiperSlide } from "swiper/react";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css/free-mode";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'freeMode' does not exist on type 'SwiperOptions'.
import "swiper/css/navigation";

import { FreeMode, Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { Product } from "../../Dashboard/Admin/Products/Type";
import { supabase } from "../../../supabase";
import { NextButton, PrevButton } from "../../SwiperButton/SwiperButton";

const SameCategory = ({
  categoryName,
  id,
}: {
  categoryName: string;
  id: string;
}) => {
  const swiperRef = useRef<any>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category", categoryName)
          .neq("id", id);
        if (error) throw error;
        if (data) setProduct(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.update();
      setIsReady(true);
    }
  }, [product]);

  if (loading)
    return (
      <div className="w-[90%] max-w-[1200px] h-[420px] mx-auto bg-gray-200 animate-pulse rounded-2xl mb-12" />
    );

  return (
    <>
      <div className="Width w-[95%] bg-[#E2E2E2] p-5 rounded-2xl my-5">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-lg lg:text-2xl font-bold text-(--color-TextGray)">
            محصولات مشابه
          </h2>
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
              {product.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="cursor-pointer rounded-lg flex flex-col justify-center items-center group "
                >
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default SameCategory;
