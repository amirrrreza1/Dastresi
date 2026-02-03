import { useEffect, useState } from "react";
import { Trash, Edit2, Upload } from "lucide-react";
import Swal from "sweetalert2";
import { supabase } from "../../../../supabase";
import protectedAction from "../../../../Utils/guestFunction";

type Category = {
  id: string;
  image_url: string;
  name: string;
};

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [imageUploading, setImageUploading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    const fileName = `categories/${Date.now()}-${file.name}`;

    try {
      const { error } = await supabase.storage
        .from("categories")
        .upload(fileName, file);
      if (!error) {
        const { data } = supabase.storage
          .from("categories")
          .getPublicUrl(fileName);
        setImageUrl(data.publicUrl);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const deleteCategory = async (category: Category) => {
    const result = await Swal.fire({
      title: "حذف دسته‌بندی؟",
      text: "محصولات مرتبط با این دسته ممکن است دچار مشکل شوند",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف شود",
      cancelButtonText: "انصراف",
    });

    if (!result.isConfirmed) return;

    const fileName = category.image_url.split("/").pop();
    if (fileName) await supabase.storage.from("categories").remove([fileName]);
    await supabase.from("categories").delete().eq("id", category.id);

    Swal.fire({
      title: "حذف شد",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });
    fetchCategories();
  };

  const submitCategory = async () => {
    if (!name || !imageUrl) {
      Swal.fire("خطا", "لطفا تصویر و نام دسته‌بندی را وارد کنید", "error");
      return;
    }

    setFormSubmitting(true);
    if (editingCategory) {
      await supabase
        .from("categories")
        .update({ name, image_url: imageUrl })
        .eq("id", editingCategory.id);
    } else {
      await supabase.from("categories").insert({ name, image_url: imageUrl });
    }

    resetForm();
    fetchCategories();
    setFormSubmitting(false);
  };

  const resetForm = () => {
    setName("");
    setImageUrl(null);
    setEditingCategory(null);
  };

  const startEditing = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setImageUrl(category.image_url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-(--color-PrimeGray) min-h-screen py-8 max-w-[1000px] mx-auto">
      <div className="Width px-4 space-y-6">
        <p className="text-2xl font-bold text-(--color-SecondaryBlue)">
          مدیریت دسته‌بندی‌ها
        </p>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-lg font-bold border-b pb-3">
            {editingCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                تصویر دسته بندی
              </label>
              <div className="relative h-48 w-full rounded-2xl border-2 border-dashed border-blue-100 bg-blue-50/30 flex flex-col items-center justify-center overflow-hidden group">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Upload className="w-8! h-8! mb-2" />
                    <span className="text-xs">انتخاب تصویر دسته بندی</span>
                  </div>
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                />

                {imageUploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                    <div className="h-8! w-8! animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between py-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  نام دسته‌بندی
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: قطعات کامپیوتر"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => protectedAction(submitCategory)}
                  disabled={formSubmitting || imageUploading}
                  className="flex-1 h-12 rounded-xl bg-[var(--color-PrimeBlue)] text-white font-bold hover:bg-[var(--color-SecondaryBlue)] disabled:opacity-50 transition-colors shadow-md shadow-blue-100"
                >
                  {formSubmitting
                    ? "در حال ذخیره..."
                    : editingCategory
                      ? "بروزرسانی"
                      : "ثبت دسته"}
                </button>
                {editingCategory && (
                  <button
                    onClick={resetForm}
                    className="px-6 h-12 rounded-xl border border-gray-200 text-gray-500"
                  >
                    انصراف
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Table List Section */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-gray-50 text-gray-500 text-center">
                <tr>
                  <th className="p-4 rounded-r-xl">آیکون</th>
                  <th className="p-4">نام دسته‌بندی</th>
                  <th className="p-4 rounded-l-xl">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-center">
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 flex justify-center">
                      <img
                        src={cat.image_url}
                        className="h-12 w-12 rounded-lg object-contain bg-gray-50"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {cat.name}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => startEditing(cat)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-5! h-5!" />
                        </button>
                        <button
                          onClick={() =>
                            protectedAction(() => deleteCategory(cat))
                          }
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash className="w-5! h-5!" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {categories.length === 0 && !loading && (
              <p className="text-center py-10 text-gray-400">
                هیچ دسته‌بندی یافت نشد
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
