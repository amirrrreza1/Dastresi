import React from "react";

const WhyDastresi: React.FC = () => {
  return (
    <div className="Width w-[90%] my-12 hidden lg:block">
      <h2 className="text-2xl font-bold text-center">
        چرا دسترسی رو برای خرید انتخاب کنیم؟
      </h2>
      <div className="w-full flex flex-wrap justify-between items-center gap-3">
        <div className="w-[210px] flex flex-col justify-center items-center mt-6">
          <img
            src="../../../public/Images/WhyDastresi/WhyDastresi1.png"
            alt="WhyDastresi1"
            width={64}
          />
          <p className="text-center font-bold text-[14px] text-black/60 my-3">
            مشاوره تخصصی برای خرید محصول
          </p>
          <p className="text-center text-[14px] text-black/60">
            برای خرید هر محصول با تیم دسترسی در ارتباط باشید تا بهترین انتخاب رو
            انجام دهید.
          </p>
        </div>
        <div className="w-[210px] flex justify-between items-center">
          <div className="w-[210px] flex flex-col justify-center items-center mt-6">
            <img
              src="../../../public/Images/WhyDastresi/WhyDastresi2.png"
              alt="WhyDastresi2"
              width={64}
            />
            <p className="text-center font-bold text-[14px] text-black/60 my-3">
              قیمت مناسب با بالاترین کیفیت{" "}
            </p>
            <p className="text-center text-[14px] text-black/60">
              گروه دسترسی در تلاش است که کالای با کیفیت را با مناسب‌ترین قیمت به
              دست شما برساند.
            </p>
          </div>
        </div>
        <div className="w-[210px] flex justify-between items-center">
          <div className="w-[210px] flex flex-col justify-center items-center mt-6">
            <img
              src="../../../public/Images/WhyDastresi/WhyDastresi3.png"
              alt="WhyDastresi3"
              width={64}
            />
            <p className="text-center font-bold text-[14px] text-black/60 my-3">
              ارسال سریع
            </p>
            <p className="text-center text-[14px] text-black/60">
              ارسال از طریق تیپاکس، پست پیشتاز و پیک موتوری (ویژه تهران) صورت می
              گیرد.
            </p>
          </div>
        </div>
        <div className="w-[210px] flex justify-between items-center">
          <div className="w-[210px] flex flex-col justify-center items-center mt-6">
            <img
              src="../../../public/Images/WhyDastresi/WhyDastresi4.png"
              alt="WhyDastresi4"
              width={64}
            />
            <p className="text-center font-bold text-[14px] text-black/60 my-3">
              امکان خرید حضوری
            </p>
            <p className="text-center text-[14px] text-black/60">
              مشتری گرامی جهت خرید حضوری می‌توانید به آدرس مندرج در پایین سایت
              مراجعه نمایید.
            </p>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default WhyDastresi;
