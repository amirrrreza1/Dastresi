import { useCallback, useEffect, useState } from "react";
import {
  Trash,
  Edit2,
  Plus,
  Search,
  Zap,
  Star,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
} from "lucide-react";
import Swal from "sweetalert2";
import { supabase } from "../../../../supabase";
import protectedAction from "../../../../Utils/guestFunction";
import ProductModal from "./ProductModal";
import ProductCard from "./ProductCard";
import { LookupItem, Product } from "./Type";
import { formatPrice } from "../../../../Utils/formatPrice";

const PAGE_SIZE = 10;

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<LookupItem[]>([]);
  const [brands, setBrands] = useState<LookupItem[]>([]);

  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const from = (currentPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (searchQuery) {
      query = query.or(
        `title.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`,
      );
    }

    const { data, count, error } = await query;

    if (!error) {
      setProducts((data as Product[]) || []);
      setTotalCount(count || 0);
    }
    setLoading(false);
  }, [currentPage, searchQuery]);

  useEffect(() => {
    let isMounted = true;
    const loadFilters = async () => {
      try {
        const [c, b] = await Promise.all([
          supabase.from("categories").select("name"),
          supabase.from("brands").select("name"),
        ]);

        if (isMounted) {
          if (c.data) setCategories(c.data as LookupItem[]);
          if (b.data) setBrands(b.data as LookupItem[]);
        }
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      }
    };

    loadFilters();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchProducts();
    }, 50);

    return () => clearTimeout(handler);
  }, [fetchProducts]);

  const toggleFlag = async (
    id: string,
    column: string,
    currentValue: boolean,
  ) => {
    const newValue = !currentValue;
    if (column === "is_special" && newValue === true) {
      const { count } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("is_special", true);
      if (count && count >= 5) {
        Swal.fire("محدودیت تعداد", "حداکثر ۵ پیشنهاد ویژه مجاز است", "warning");
        return;
      }
    }
    await supabase
      .from("products")
      .update({ [column]: newValue })
      .eq("id", id);
    fetchProducts();
  };

  const handleDelete = (id: string, title: string) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: `محصول "${title}" برای همیشه حذف خواهد شد!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف شود",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        protectedAction(async () => {
          const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", id);

          if (error) {
            Swal.fire("خطا!", "مشکلی در حذف محصول پیش آمد.", "error");
          } else {
            Swal.fire("حذف شد!", "محصول با موفقیت حذف گردید.", "success");
            fetchProducts();
          }
        });
      }
    });
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  return (
    <div className="bg-(--color-PrimeGray) min-h-screen py-4 sm:py-8">
      <div className="max-w-[1200px] mx-auto md:px-4">
        <div className="flex flex-col lg:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <p className="text-xl sm:text-2xl font-bold text-(--color-SecondaryBlue) flex items-center gap-2 shrink-0">
            مدیریت محصولات
          </p>

          <div className="flex flex-col items-center lg:flex-row gap-3 lg:gap-4 lg:justify-end w-full">
            <div className="flex-1 lg:max-w-md relative w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5! h-5!" />
              <input
                type="text"
                placeholder="جستجو در کل محصولات..."
                className="w-full h-11 pr-10 pl-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setIsModalOpen(true);
              }}
              className="bg-[var(--color-PrimeBlue)] w-full lg:w-fit h-10 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <Plus className="w-5! h-5!" /> محصول جدید
            </button>
          </div>
        </div>

        <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-4 text-center">تصویر</th>
                <th className="p-4">نام محصول</th>
                <th className="p-4 text-center">پرفروش</th>
                <th className="p-4 text-center">جدید</th>
                <th className="p-4 text-center">ویژه</th>
                <th className="p-4 text-center">قیمت</th>
                <th className="p-4 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10">
                    در حال بارگذاری...
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 flex justify-center">
                      <img
                        src={p.image_url}
                        alt={p.title}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    </td>
                    <td className="p-3">
                      <p className="font-bold text-gray-800">{p.title.slice(0, 50)}{p.title.length > 40 && "..."}</p>
                      <p className="text-xs text-gray-400">
                        {p.category} | {p.brand}
                      </p>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() =>
                          toggleFlag(p.id, "most_sell", p.most_sell)
                        }
                        className={`p-2 rounded-full transition-colors ${p.most_sell ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
                      >
                        <CircleDollarSign className="w-5! h-5!" />
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleFlag(p.id, "is_new", p.is_new)}
                        className={`p-2 rounded-full transition-colors ${p.is_new ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
                      >
                        <Zap className="w-5! h-5!" />
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() =>
                          toggleFlag(p.id, "is_special", p.is_special)
                        }
                        className={`p-2 rounded-full transition-colors ${p.is_special ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
                      >
                        <Star className="w-5! h-5!" />
                      </button>
                    </td>
                    <td className="p-3 text-center font-bold text-green-600">
                      {formatPrice(p.discount_price)}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Edit2 className="w-5! h-5!" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash className="w-5! h-5!" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {products.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="text-center py-10">
                    هیچ محصولی یافت نشد
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalCount > PAGE_SIZE && (
            <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
              <p className="text-xs text-gray-500">
                نمایش {products.length} از {totalCount} محصول
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-5! h-5!" />
                </button>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-gray-700">
                    {currentPage}
                  </span>
                  <span className="text-sm text-gray-400">از</span>
                  <span className="text-sm font-bold text-gray-700">
                    {totalPages}
                  </span>
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-5! h-5!" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:hidden space-y-4">
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              در حال بارگذاری...
            </div>
          ) : (
            products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onEdit={(product) => {
                  setEditingProduct(product);
                  setIsModalOpen(true);
                }}
                onDelete={handleDelete}
                onToggleFlag={toggleFlag}
                formatPrice={formatPrice}
              />
            ))
          )}

          {totalCount > PAGE_SIZE && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="p-2 rounded-lg bg-gray-50 border border-gray-200 disabled:opacity-30 hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight className="w-5! h-5!" />
                  </button>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-gray-700">
                      {currentPage}
                    </span>
                    <span className="text-sm text-gray-400">از</span>
                    <span className="text-sm font-bold text-gray-700">
                      {totalPages}
                    </span>
                  </div>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="p-2 rounded-lg bg-gray-50 border border-gray-200 disabled:opacity-30 hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="w-5! h-5!" />
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  نمایش {products.length} از {totalCount} محصول
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={editingProduct}
        categories={categories}
        brands={brands}
        onSave={async (data) => {
          const res = editingProduct
            ? await supabase
                .from("products")
                .update(data)
                .eq("id", editingProduct.id)
            : await supabase.from("products").insert(data);
          if (!res.error) {
            setIsModalOpen(false);
            fetchProducts();
          }
        }}
      />
    </div>
  );
};

export default AdminProducts;
