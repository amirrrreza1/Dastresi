import { Edit2, Trash, Zap, Star } from "lucide-react";
import { ProductCardProps } from "../Type";

const ProductCard = ({
  product,
  onEdit,
  onDelete,
  onToggleFlag,
  formatPrice,
}: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="shrink-0">
          <img
            src={product.image_url}
            alt={product.title}
            className="h-20 w-20 rounded-lg object-cover border"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-base mb-1 truncate">
            {product.title}
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            {product.category} | {product.brand}
          </p>

          <div className="mb-3">
            <span className="text-sm text-gray-500 ml-2">قیمت:</span>
            <span className="font-bold text-green-600 text-base">
              {formatPrice(product.discount_price)} تومان
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onToggleFlag(product.id, "is_new", product.is_new)
                }
                className={`p-2 rounded-full transition-colors ${
                  product.is_new
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
                title="جدید"
              >
                <Zap className="w-4! h-4!" />
              </button>
              <button
                onClick={() =>
                  onToggleFlag(product.id, "is_special", product.is_special)
                }
                className={`p-2 rounded-full transition-colors ${
                  product.is_special
                    ? "bg-amber-100 text-amber-600"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
                title="ویژه"
              >
                <Star className="w-4! h-4!" />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(product)}
                className="p-2 text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                title="ویرایش"
              >
                <Edit2 className="w-4! h-4!" />
              </button>
              <button
                onClick={() => onDelete(product.id, product.title)}
                className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                title="حذف"
              >
                <Trash className="w-4! h-4!" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
