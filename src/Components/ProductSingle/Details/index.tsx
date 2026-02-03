import { toast } from "react-toastify";
import { Product } from "../../Dashboard/Admin/Products/Type";
import { Share2 } from "lucide-react";
import Price from "./Price";

const Details = ({ product }: { product: Product }) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("لینک کپی شد");
  };

  return (
    <div className="w-[95%] max-w-[1200px] my-4 mx-auto rounded-xl bg-white md:flex items-start justify-between shadow-sm border border-gray-200">
      <img
        src={product.image_url}
        alt={product.title}
        className="w-full md:w-[369px] p-6"
      />
      <div className="block w-full border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <p className="text-[18px] font-medium text-center md:text-right">
            {product.title}
          </p>
          <div className="flex items-center justify-center md:justify-end h-[50px]">
            <button
              onClick={handleCopy}
              className="text-[12px] flex items-center text-[#757575]"
            >
              <Share2 className="w-3.5! h-3.5! ml-1" color="gray" />
              اشتراک
            </button>
          </div>
        </div>
        <div className="p-6 lg:flex space-y-4 lg:space-y-0 w-full border-b border-gray-200">
          <p className="md:w-1/2 text-gray-500">
            برند:{" "}
            <span className="rounded-full border border-gray-200 px-2 py-1 text-[14px] text-black">
              {product.brand}
            </span>
          </p>
          <p className="md:w-1/2 text-gray-500">
            دسته بندی:{" "}
            <span className="rounded-full border border-gray-200 px-2 py-1 text-[14px] text-black">
              {product.category}
            </span>
          </p>
        </div>
        <div className="p-6 lg:flex space-y-4 lg:space-y-0 w-full border-b border-gray-200">
          <p className="md:w-1/2 text-gray-500 flex items-center gap-2">
            رنگ:{" "}
            <div className="flex items-center gap-2 w-fit rounded-xl border border-gray-200 px-2 py-1 text-[14px] text-black">
              <span
                className="w-4 h-4 block rounded-full"
                style={{ backgroundColor: product.color.hex }}
              />
              <p>{product.color.name}</p>
            </div>
          </p>
          <p className="md:w-1/2 text-gray-500">
            گارانتی:{" "}
            <span className="rounded-xl border border-gray-200 px-2 py-1 text-[14px] text-black">
              مهلت تست 3 روزه
            </span>
          </p>
        </div>
        <div className="p-4 flex justify-between items-center">
          <div className="">
            <ul className="list-disc mr-4 text-[14px] leading-[28px]">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <Price
            pure_price={product.price}
            discount_price={product.discount_price}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
