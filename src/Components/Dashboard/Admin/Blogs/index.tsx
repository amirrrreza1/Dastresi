import { useEffect, useState } from "react";
import { Trash, Edit2, Upload } from "lucide-react";
import Swal from "sweetalert2";
import { supabase } from "../../../../supabase";
import protectedAction from "../../../../Utils/guestFunction";

type Blog = {
  id: string;
  image_url: string;
  title: string;
};

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [imageUploading, setImageUploading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const fetchBlogs = async () => {
    setBlogsLoading(true);
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setBlogs(data);
    setBlogsLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    const fileName = `blogs/${Date.now()}-${file.name}`;

    try {
      const { error } = await supabase.storage
        .from("blogs")
        .upload(fileName, file);
      if (!error) {
        const { data } = supabase.storage.from("blogs").getPublicUrl(fileName);
        setImageUrl(data.publicUrl);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const deleteBlog = async (blog: Blog) => {
    const result = await Swal.fire({
      title: "حذف مقاله؟",
      text: "این عملیات قابل بازگشت نیست",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف شود",
      cancelButtonText: "انصراف",
    });

    if (!result.isConfirmed) return;

    const fileName = blog.image_url.split("/").pop();
    if (fileName) await supabase.storage.from("blogs").remove([fileName]);
    await supabase.from("blogs").delete().eq("id", blog.id);

    Swal.fire({
      title: "حذف شد",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });
    fetchBlogs();
  };

  const submitBlog = async () => {
    if (!title || !imageUrl) {
      Swal.fire("خطا", "لطفا تصویر و عنوان را وارد کنید", "error");
      return;
    }

    setFormSubmitting(true);
    if (editingBlog) {
      await supabase
        .from("blogs")
        .update({ title, image_url: imageUrl })
        .eq("id", editingBlog.id);
    } else {
      await supabase.from("blogs").insert({ title, image_url: imageUrl });
    }

    resetForm();
    fetchBlogs();
    setFormSubmitting(false);
  };

  const resetForm = () => {
    setTitle("");
    setImageUrl(null);
    setEditingBlog(null);
  };

  const startEditing = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setImageUrl(blog.image_url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-(--color-PrimeGray) min-h-screen py-8 max-w-[1000px] mx-auto">
      <div className="Width px-4 space-y-6">
        <p className="text-2xl font-bold text-(--color-SecondaryBlue)">
          مدیریت بلاگ ها{" "}
        </p>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-lg font-bold border-b pb-3">
            {editingBlog ? "ویرایش بلاگ" : "افزودن بلاگ جدید"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                تصویر شاخص
              </label>
              <div className="relative h-48 w-full rounded-2xl border-2 border-dashed border-blue-100 bg-blue-50/30 flex flex-col items-center justify-center overflow-hidden group">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Upload className="w-8! h-8! mb-2" />
                    <span className="text-xs">انتخاب تصویر بلاگ</span>
                  </div>
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  عنوان بلاگ
                </label>
                <textarea
                  rows={4}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: راهنمای خرید لپ‌تاپ"
                  className=" w-full rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 mb-2">
                <button
                  onClick={() => protectedAction(submitBlog)}
                  disabled={formSubmitting || imageUploading}
                  className="flex-1 h-12 rounded-xl bg-[var(--color-PrimeBlue)] text-white font-bold hover:bg-[var(--color-SecondaryBlue)] disabled:opacity-50 transition-colors shadow-md shadow-blue-100"
                >
                  {formSubmitting
                    ? "در حال ذخیره..."
                    : editingBlog
                      ? "بروزرسانی"
                      : "ثبت مقاله"}
                </button>
                {editingBlog && (
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
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="p-4 flex justify-center">
                    <img
                      src={blog.image_url}
                      className="h-16 w-24 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 font-medium " title={blog.title}>
                    {blog.title.trim().slice(0, 30)}...
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => startEditing(blog)}
                        className="p-2 text-blue-500"
                      >
                        <Edit2 className="w-5! h-5!" />
                      </button>
                      <button
                        onClick={() => protectedAction(() => deleteBlog(blog))}
                        className="p-2 text-red-500"
                      >
                        <Trash className="w-5! h-5!" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {blogs.length === 0 && !blogsLoading && (
              <tr>
                <td colSpan={3} className="py-12 text-center text-gray-400">
                  هیچ بلاگی فعالی یافت نشد
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
