const Description = ({ description }: { description: string }) => {
  return (
    <div className="w-[95%] max-w-[1200px] my-4 mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="pt-1 flex justify-start items-center border-b border-gray-200">
        <p className="p-3 text-[16px] font-bold border-b-2 border-[var(--color-PrimeBlue)] text-[var(--color-PrimeBlue)]">
          نقد و بررسی
        </p>
      </div>
      <p className="text-gray-700 p-4">{description}</p>
    </div>
  );
};

export default Description;
