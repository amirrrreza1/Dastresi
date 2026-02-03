import { useEffect, useState } from "react";
import { Trash, Edit2, Upload } from "lucide-react";
import Swal from "sweetalert2";
import { supabase } from "../../../../supabase";
import protectedAction from "../../../../Utils/guestFunction";

type Brand = {
  id: string;
  image_url: string;
  name: string;
};

const AdminBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [imageUploading, setImageUploading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const fetchBrands = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("brands")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setBrands(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    const fileName = `brands/${Date.now()}-${file.name}`;
    try {
      const { error } = await supabase.storage
        .from("brands")
        .upload(fileName, file);
      if (!error) {
        const { data } = supabase.storage.from("brands").getPublicUrl(fileName);
        setImageUrl(data.publicUrl);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setImageUploading(false);
    }
  };

  const deleteBrand = async (brand: Brand) => {
    const result = await Swal.fire({
      title: "حذف برند؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "انصراف",
    });
    if (!result.isConfirmed) return;
    const fileName = brand.image_url.split("/").pop();
    if (fileName) await supabase.storage.from("brands").remove([fileName]);
    await supabase.from("brands").delete().eq("id", brand.id);
    fetchBrands();
  };

  const submitBrand = async () => {
    if (!name || !imageUrl)
      return Swal.fire("خطا", "اطلاعات ناقص است", "error");
    setFormSubmitting(true);
    if (editingBrand) {
      await supabase
        .from("brands")
        .update({ name, image_url: imageUrl })
        .eq("id", editingBrand.id);
    } else {
      await supabase.from("brands").insert({ name, image_url: imageUrl });
    }
    resetForm();
    fetchBrands();
    setFormSubmitting(false);
  };

  const resetForm = () => {
    setName("");
    setImageUrl(null);
    setEditingBrand(null);
  };

  const startEditing = (brand: Brand) => {
    setEditingBrand(brand);
    setName(brand.name);
    setImageUrl(brand.image_url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-(--color-PrimeGray) min-h-screen py-8 max-w-[1000px] mx-auto">
      <div className="Width px-4 space-y-6">
        <p className="text-2xl font-bold text-(--color-SecondaryBlue)">
          مدیریت برندها
        </p>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-lg font-bold border-b pb-3">
            {editingBrand ? "ویرایش برند" : "افزودن برند جدید"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                لوگوی برند
              </label>
              <div className="relative h-48 w-full rounded-2xl border-2 border-dashed border-blue-100 bg-blue-50/30 flex flex-col items-center justify-center overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <div className="flex flex-col gap-2 items-center text-gray-400">
                    <Upload className="w-8! h-8! text-gray-400" />
                    <span className="text-xs">انتخاب تصویر برند </span>
                  </div>
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            <div className="flex flex-col justify-between py-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  نام برند
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: سامسونگ"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => protectedAction(submitBrand)}
                disabled={formSubmitting || imageUploading}
                className="h-12 rounded-xl bg-[var(--color-PrimeBlue)] text-white font-bold"
              >
                {formSubmitting
                  ? "در حال ذخیره..."
                  : editingBrand
                    ? "بروزرسانی"
                    : "ثبت برند"}{" "}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50 text-gray-500 text-center">
              <tr>
                <th className="p-4 rounded-r-xl">تصویر</th>
                <th className="p-4">عنوان</th>
                <th className="p-4 rounded-l-xl">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-center">
              {brands.map((brand) => (
                <tr key={brand.id}>
                  <td className="p-4 flex justify-center">
                    <img
                      src={brand.image_url}
                      className="h-16 w-24 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {brand.name}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => startEditing(brand)}
                        className="p-2 text-blue-500"
                      >
                        <Edit2 className="w-5! h-5!" />
                      </button>
                      <button
                        onClick={() =>
                          protectedAction(() => deleteBrand(brand))
                        }
                        className="p-2 text-red-500"
                      >
                        <Trash className="w-5! h-5!" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {loading && (
                <tr>
                  <td colSpan={3} className="py-12 text-center">
                    <p>در حال بارگذاری...</p>
                  </td>
                </tr>
              )}
              {brands.length === 0 && !loading && (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-gray-400">
                    هیچ بلاگی فعالی یافت نشد
                  </td>
                </tr>
              )}{" "}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBrands;
