const Price = ({
  pure_price,
  discount_price,
}: {
  pure_price: number;
  discount_price: number;
}) => {
  return (
    <>
      <div className="bg-[#F7F8F9] rounded-xl border border-gray-200 hidden md:block">
        <p className="border-b border-gray-200  px-4 py-2">قیمت محصول:</p>
        <div className="flex gap-2 items-center p-4">
          <p className="text-gray-600 line-through">
            {pure_price.toLocaleString("fa-IR")}
          </p>
          <span className="text-[var(--color-PrimeBlue)] font-bold text-[20px]">
            {discount_price.toLocaleString("fa-IR")}{" "}
          </span>
          <span className="text-[12px]">تومان</span>
        </div>
        <div className="p-4 pt-0">
          <button className="w-full bg-[var(--color-PrimeBlue)] text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            افزودن به سبد خرید
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full p-4 bg-[#F7FAFB] md:hidden">
        <div className="bg-[#F7F8F9] rounded-xl border border-gray-200 p-4">
          <div className="flex gap-2 items-center justify-center">
            <p className="text-gray-600 line-through">
              {pure_price.toLocaleString("fa-IR")}
            </p>
            <span className="text-[var(--color-PrimeBlue)] font-bold text-[20px]">
              {discount_price.toLocaleString("fa-IR")}{" "}
            </span>
            <span className="text-[12px]">تومان</span>
          </div>
          <button className="w-full bg-[var(--color-PrimeBlue)] text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </>
  );
};

export default Price;
