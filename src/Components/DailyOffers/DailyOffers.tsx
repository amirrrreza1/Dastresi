import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDailyOffersData } from "../../Redux/DailyOffers/DailyOffersAction";
import DailyOffersCounter from "./DailyOfferCounter";
import type { AppDispatch } from "../../Redux/Store";

type DailyOfferItem = {
  id: number;
  src: string;
  alt: string;
  Des: string;
  PurePrice: string;
  Off: string;
  Price: string;
};

type DailyOffersData = {
  DailyOffersBig: DailyOfferItem[];
  DailyOfferSmall: DailyOfferItem[];
};

const DailyOffers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dailyOffers, loading, error } = useSelector(
    (state: any) =>
      state.dailyOffers as {
        dailyOffers: DailyOffersData;
        loading: boolean;
        error: string;
      }
  );

  useEffect(() => {
    dispatch(fetchDailyOffersData());
  }, []);

  return (
    <>
      {loading && (
        <div className="text-center m-auto text-3xl">در حال بارگذاری...</div>
      )}
      {error && (
        <div className="error-message text-red-500 text-2xl text-center leading-[60px]">
          DailyOffers :{error}
        </div>
      )}
      {!loading && !error && dailyOffers && (
        <div className="Width w-[90%] bg-[#E2E2E2] p-5 rounded-2xl my-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src="../../../public/Images/SVG/Percent.svg"
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
            <div className="flex w-full lg:w-[55%] gap-3 flex-col lg:flex-row">
              {dailyOffers?.DailyOffersBig?.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-xl flex justify-between flex-row lg:flex-col"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-[140px] h-[140px] lg:w-full lg:h-auto rounded-md"
                  />{" "}
                  <div className="w-full">
                    <h3 className="lg:h-[100px] text-sm lg:text-lg mt-2">
                      {item.Des}
                    </h3>
                    <div className="">
                      <div className="">
                        <p className="text-gray-500 line-through">
                          {item.PurePrice}
                        </p>
                        <p className="text-red-500 text-sm">
                          {item.Off} تومان تخفیف
                        </p>
                      </div>
                      <p className="text-(--color-PrimeBlue) font-bold text-end">
                        {item.Price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:w-[40%] flex flex-col gap-3">
              {dailyOffers?.DailyOfferSmall?.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-xl flex justify-between gap-3"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-[130px] h-[130px]"
                  />
                  <div className="w-full">
                    <h3 className="lg:w-[90%] xl:h-[60px] text-sm mt-2 overflow-hidden line-clamp-3">
                      {item.Des}
                    </h3>
                    <div className="h-[40px] xl:flex justify-between  text-sm">
                      <p className="text-gray-500 line-through">
                        {item.PurePrice}
                      </p>
                      <p className="text-red-500">{item.Off} تومان تخفیف</p>
                    </div>
                    <p className="text-(--color-PrimeBlue) font-bold text-lg text-end">
                      {item.Price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyOffers;
