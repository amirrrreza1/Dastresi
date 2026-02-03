import React, { useEffect, useState } from "react";
import DailyOffersCounter from "./DailyOfferCounter";
import { supabase } from "../../supabase";
import { Product } from "../Dashboard/Admin/Products/Type";
import { Link } from "react-router-dom";

const DailyOffers: React.FC = () => {
  const [dailyOffers, setDailyOffers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_special", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setDailyOffers(data);
      } catch (err) {
        console.error("Error fetching brands:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading)
    return (
      <div className="w-[90%] max-w-[1200px] h-[920px] md:h-[610px] mx-auto bg-gray-200 animate-pulse rounded-2xl mb-12 mt-6" />
    );

  return (
    <>
      <div className="Width w-[90%] bg-[#E2E2E2] p-5 rounded-2xl my-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/Images/SVG/Percent.svg"
              alt="Percent"
              width={35}
            />
            <h2 className="text-xl lg:text-3xl text-[#757575] font-bold">
              تخفیف‌های روزانه دسترسی
            </h2>
          </div>
          <DailyOffersCounter />
        </div>
        <div className="flex flex-col lg:flex-row justify-evenly mt-5 gap-3">
          <div className="flex w-full lg:w-[55%] gap-3 flex-col lg:flex-row items-stretch">
            {dailyOffers?.slice(0, 2).map((item: Product) => (
              <Link to={`/product/${item.id}`} className="lg:w-1/2 flex">
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-xl flex lg:flex-col gap-3 justify-between flex-1"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-[130px] h-[130px] lg:w-full lg:h-auto rounded-md"
                  />{" "}
                  <div className="w-full">
                    <h3 className="lg:h-25 text-sm lg:text-lg mt-2">
                      {item.title}
                    </h3>
                    <div className="">
                      <div className="">
                        <p className="text-gray-500 line-through">
                          {item.price.toLocaleString("fa-IR")} تومان
                        </p>
                        <p className="text-red-500 text-sm">
                          {item.discount_price.toLocaleString("fa-IR")} تخفیف
                        </p>
                      </div>
                      <p className="text-(--color-PrimeBlue) font-bold text-end">
                        {item.price.toLocaleString("fa-IR")} تومان
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="lg:w-[40%] flex flex-col gap-3">
            {dailyOffers?.slice(2, 5).map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-xl flex justify-between gap-3"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-[130px] h-[130px]"
                />
                <div className="w-full">
                  <h3 className="lg:w-[90%] xl:h-15 text-sm mt-2 overflow-hidden line-clamp-3">
                    {item.title}
                  </h3>
                  <div className="h-10 xl:flex justify-between text-sm">
                    <p className="text-gray-500 line-through">
                      {item.price.toLocaleString("fa-IR")} تومان
                    </p>
                    <p className="text-red-500">
                      {item.discount_price.toLocaleString("fa-IR")} تخفیف
                    </p>
                  </div>
                  <p className="text-(--color-PrimeBlue) font-bold text-lg text-end">
                    {item.price.toLocaleString("fa-IR")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyOffers;
