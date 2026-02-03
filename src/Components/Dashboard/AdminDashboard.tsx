import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    id: "PR-118",
    name: "هدفون گیمینگ D-900",
    stock: 14,
    price: "۲,۷۵۰,۰۰۰",
  },
  {
    id: "PR-097",
    name: "کیبورد مکانیکی RX",
    stock: 6,
    price: "۱,۹۹۰,۰۰۰",
  },
  {
    id: "PR-083",
    name: "میکروفون استودیویی P12",
    stock: 21,
    price: "۳,۴۵۰,۰۰۰",
  },
];

const AdminDashboard = () => {
  return (
    <div className="bg-(--color-PrimeGray) ">
      <div className="Width px-4 space-y-6">
        <div className="flex gap-2 justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-(--color-SecondaryBlue)">
              پنل مدیریت
            </p>
          </div>
          <div className="md:flex flex-wrap gap-2 hidden">
              <Link
                to="/dashboard/products"
                className="h-10 rounded-xl bg-(--color-PrimeBlue) flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white hover:bg-(--color-SecondaryBlue) cursor-pointer"
              >
                <Plus className="w-5! h-5!" />
                افزودن محصول
              </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-(--color-SecondaryBlue)">
                مدیریت محصولات
              </h2>
              <button className="text-sm text-(--color-PrimeBlue) hover:text-(--color-SecondaryBlue)">
                مشاهده همه
              </button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="text-xs text-(--color-TextGray)">
                  <tr>
                    <th className="py-2">کد</th>
                    <th className="py-2">نام محصول</th>
                    <th className="py-2">موجودی</th>
                    <th className="py-2">قیمت</th>
                    <th className="py-2">عملیات</th>
                  </tr>
                </thead>
                <tbody className="text-(--color-SecondaryBlue)">
                  {products.map((product) => (
                    <tr key={product.id} className="border-t border-black/5">
                      <td className="py-3">{product.id}</td>
                      <td className="py-3">{product.name}</td>
                      <td className="py-3">{product.stock}</td>
                      <td className="py-3">{product.price} تومان</td>
                      <td className="py-3">
                        <button className="text-xs text-(--color-PrimeOrange) hover:text-(--color-SecondaryBlue)">
                          ویرایش
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
