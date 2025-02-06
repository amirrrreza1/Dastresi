import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch } from "../../Redux/Store";
import { fetchBlogData } from "../../Redux/Blog/BlogAction";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/free-mode";
// @ts-ignore
import "swiper/css/pagination";
import "./Blog.css";

type blogItem = {
  id: number;
  src: string;
  alt: string;
  text: string;
};

export default function Blog() {
  const dispatch = useDispatch<AppDispatch>();
  const { blog, loading, error } = useSelector(
    (state: any) =>
      state.blog as {
        blog: blogItem[];
        loading: boolean;
        error: string;
      }
  );

  useEffect(() => {
    dispatch(fetchBlogData());
  }, []);

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
        <div className="w-full">
          <div className="Width w-[90%] flex justify-between items-center  mt-7">
            <h2 className="text-lg lg:text-2xl font-bold text-(--color-TextGray)">
              آخرین مقالات
            </h2>
            <Link to="/Blog" className="flex items-center gap-2">
              <p className="font-light md:block hidden">ورود به بلاگ</p>
              <img
                src="../../../public/Images/SVG/toleftArrowBox.svg"
                alt="To right Arrow Box"
                width={15}
              />
            </Link>
          </div>
          <Swiper
            slidesPerView={4.1}
            spaceBetween={15}
            freeMode={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            breakpoints={{
              100: {
                slidesPerView: 1.7,
              },
              300: {
                slidesPerView: 2,
              },
              500: {
                slidesPerView: 2.7,
              },
              700: {
                slidesPerView: 3.5,
              },
              900: {
                slidesPerView: 4,
              },
            }}
            className="Width !w-[90%] my-7"
          >
            {blog.map((item: blogItem) => (
              <SwiperSlide
                className="rounded-lg overflow-hidden flex-col CustomShadow mb-12 group"
                key={item.id}
              >
                <img src={item.src} alt={item.alt} className="rounded-lg " />
                <p className="text-[13px] w-[90%]  h-[70px] flex justify-center items-center text-center group-hover:text-(--color-PrimeBlue) transition duration-200">
                  {item.text}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
