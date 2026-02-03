import { useEffect, useState } from "react";
import { Trash, Edit2, Upload } from "lucide-react";
import Swal from "sweetalert2";
import { supabase } from "../../../../supabase";
import protectedAction from "../../../../Utils/guestFunction";
import { toast } from "react-toastify";

type Slider = {
  id: string;
  image_url: string;
  link: string;
};

const AdminSliders = () => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [slidersLoading, setSlidersLoading] = useState(true);

  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [imageUploading, setImageUploading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);

  const fetchSliders = async () => {
    setSlidersLoading(true);
    const { data } = await supabase
      .from("sliders")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setSliders(data);
    setSlidersLoading(false);
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    const fileName = `${Date.now()}-${file.name}`;

    try {
      const { error } = await supabase.storage
        .from("sliders")
        .upload(fileName, file);

      if (!error) {
        const { data } = supabase.storage
          .from("sliders")
          .getPublicUrl(fileName);
        setImageUrl(data.publicUrl);
      }
    } catch (error) {
      toast("خطا در بارگذاری تصویر اسلایدر: " + (error as Error).message);
    } finally {
      setImageUploading(false);
    }
  };

  const deleteSlider = async (slider: Slider) => {
    const result = await Swal.fire({
      title: "حذف اسلایدر؟",
      text: "این عملیات قابل بازگشت نیست",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "حذف شود",
      cancelButtonText: "انصراف",
    });

    if (!result.isConfirmed) return;

    const fileName = slider.image_url.split("/").pop();
    if (fileName) {
      await supabase.storage.from("sliders").remove([fileName]);
    }

    await supabase.from("sliders").delete().eq("id", slider.id);

    Swal.fire({
      title: "حذف شد",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });
    fetchSliders();
  };

  const submitSlider = async () => {
    if (!link || !imageUrl) {
      Swal.fire("خطا", "لطفا تصویر و لینک را وارد کنید", "error");
      return;
    }

    setFormSubmitting(true);

    if (editingSlider) {
      await supabase
        .from("sliders")
        .update({ link, image_url: imageUrl })
        .eq("id", editingSlider.id);
    } else {
      await supabase.from("sliders").insert({
        link,
        image_url: imageUrl,
      });
    }

    resetForm();
    fetchSliders();
    setFormSubmitting(false);
  };

  const resetForm = () => {
    setLink("");
    setImageUrl(null);
    setEditingSlider(null);
  };

  const startEditing = (slider: Slider) => {
    setEditingSlider(slider);
    setLink(slider.link);
    setImageUrl(slider.image_url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-(--color-PrimeGray) min-h-screen py-8 max-w-[1000px] mx-auto">
      <div className="Width px-4 space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-(--color-SecondaryBlue)">
            مدیریت اسلایدرها
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-lg font-bold border-b pb-3">
            {editingSlider ? "ویرایش اسلایدر" : "افزودن اسلایدر جدید"}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                تصویر اسلایدر
              </label>
              <div className="relative h-48 w-full rounded-2xl border-2 mt-2 border-dashed border-blue-100 bg-blue-50/30 flex flex-col items-center justify-center overflow-hidden group">
                {imageUrl ? (
                  <>
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-xs">تغییر تصویر</p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Upload className="w-8! h-8! mb-2" />
                    <span className="text-xs">برای انتخاب تصویر کلیک کنید</span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                  disabled={imageUploading}
                />

                {imageUploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                    <div className="h-8! w-8! animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  لینک مقصد
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://example.com"
                  className="h-12 w-full rounded-xl border border-gray-200 mt-2 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="flex gap-3 mb-2">
                <button
                  onClick={() => protectedAction(() => submitSlider())}
                  disabled={formSubmitting || imageUploading}
                  className="flex-1 h-12 rounded-xl bg-[var(--color-PrimeBlue)] text-white font-bold cursor-pointer hover:bg-[var(--color-SecondaryBlue)] disabled:opacity-50 transition-colors shadow-md shadow-blue-100"
                >
                  {formSubmitting
                    ? "در حال ذخیره..."
                    : editingSlider
                      ? "بروزرسانی تغییرات"
                      : "ثبت اسلایدر"}
                </button>

                {editingSlider && (
                  <button
                    onClick={resetForm}
                    className="px-6 h-12 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    انصراف
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            لیست اسلایدرهای فعال
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-gray-50 text-gray-500 text-center">
                <tr>
                  <th className="p-4 rounded-r-xl">تصویر</th>
                  <th className="p-4">لینک</th>
                  <th className="p-4 rounded-l-xl text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-center">
                {sliders.map((slider) => (
                  <tr
                    key={slider.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 flex justify-center">
                      <img
                        src={slider.image_url}
                        alt=""
                        className="h-16 w-32 rounded-lg object-cover border border-gray-100"
                      />
                    </td>
                    <td className="p-4 text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {slider.link}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => startEditing(slider)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="ویرایش"
                        >
                          <Edit2 className="w-5! h-5!" />
                        </button>
                        <button
                          onClick={() =>
                            protectedAction(() => deleteSlider(slider))
                          }
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash className="w-5! h-5!" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {slidersLoading && (
                  <tr>
                    <td colSpan={3} className="py-12 text-center">
                      <p>در حال بارگذاری...</p>
                    </td>
                  </tr>
                )}
                {sliders.length === 0 && !slidersLoading && (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-gray-400">
                      هیچ اسلایدر فعالی یافت نشد
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSliders;
