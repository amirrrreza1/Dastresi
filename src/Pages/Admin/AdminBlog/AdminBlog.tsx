import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogData } from "../../../Redux/Blog/BlogAction";
import { AppDispatch } from "../../../Redux/Store";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

type BlogItem = {
  id: string;
  src: string;
  alt: string;
  text: string;
};

const AdminBlog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogPosts, loading, error } = useSelector(
    (state: any) =>
      state.blog as {
        blogPosts: BlogItem[];
        loading: boolean;
        error: string;
      }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<BlogItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<BlogItem>({
    id: "",
    src: "",
    alt: "",
    text: "",
  });

  useEffect(() => {
    dispatch(fetchBlogData());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله، حذف کن!",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/Blog/${id}`);
          Swal.fire("حذف شد!", "پست با موفقیت حذف شد.", "success");
          dispatch(fetchBlogData());
        } catch (error) {
          Swal.fire("خطا!", "مشکلی در حذف پست پیش آمد.", "error");
        }
      }
    });
  };

  const handleEdit = (item: BlogItem) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editItem) {
      setEditItem({ ...editItem, [e.target.name]: e.target.value });
    }
  };

  const handleAddChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editItem || !editItem.id) return;
    Swal.fire({
      title: "ذخیره تغییرات؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "بله، ذخیره کن!",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `http://localhost:3001/Blog/${editItem.id}`,
            editItem
          );
          Swal.fire("ذخیره شد!", "تغییرات با موفقیت ثبت شد.", "success");
          setIsModalOpen(false);
          dispatch(fetchBlogData());
        } catch (error) {
          Swal.fire("خطا!", "مشکلی در ذخیره تغییرات پیش آمد.", "error");
        }
      }
    });
  };

  const handleAddItem = async () => {
    if (!newItem.src || !newItem.alt || !newItem.text) {
      Swal.fire("خطا!", "لطفاً تمامی فیلدها را پر کنید.", "error");
      return;
    }

    const newItemWithId = { ...newItem, id: Date.now().toString() };

    try {
      await axios.post("http://localhost:3001/Blog", newItemWithId);
      Swal.fire("موفق!", "پست جدید با موفقیت اضافه شد.", "success");
      setIsAddModalOpen(false);
      setNewItem({ id: "", src: "", alt: "", text: "" }); // پاک کردن فرم بعد از افزودن
      dispatch(fetchBlogData());
    } catch (error) {
      Swal.fire("خطا!", "مشکلی در افزودن پست پیش آمد.", "error");
    }
  };

  return (
    <>
      {loading && <div>در حال بارگذاری...</div>}
      {error && (
        <div className="error-message text-red-500 text-2xl text-center leading-[60px]">
          Blog : {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <h2 className="leading-[80px] text-4xl text-center bg-(--gradient)">
            Blogs 
          </h2>
          <div className="w-[90%] m-auto flex flex-wrap items-center justify-center gap-5">
            {blogPosts?.map((item) => (
              <div
                key={item.id}
                className="w-[90%] md:w-[30%] lg:w-[27%] bg-blue-500 p-2 m-3 rounded-md"
              >
                <img src={item.src} alt={item.alt} />
                <p className="text-center text-sm h-[40px] leading-[20px] text-white mt-1">
                  Alt: {item.alt}
                </p>
                <p className="text-center text-sm h-[40px] leading-[20px] text-white line-clamp-3">
                  {item.text}
                </p>
                <div className="flex items-center justify-center gap-2 p-3">
                  <button
                    className="AdminPageRedButton"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="AdminPageEditButton"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="AdminPageAddButton"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add
          </button>
          <Link to="/Admin" className="AdminPageBackButton">
            Back
          </Link>
        </>
      )}

      {/* Edit Modal */}
      {isModalOpen && editItem && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)} // بستن مودال با کلیک روی پس‌زمینه
        >
          <div
            className="bg-white p-5 rounded-lg w-[90%] max-w-[500px]"
            onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن با کلیک روی خود فرم
          >
            <h2 className="text-xl text-center font-bold mb-4">ویرایش</h2>
            <label htmlFor="src" className="mb-2 text-sm">
              آدرس تصویر{" "}
            </label>
            <input
              type="text"
              name="src"
              value={editItem.src}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="آدرس تصویر"
            />
            <label htmlFor="alt" className="mb-2 text-sm">
              Alt
            </label>
            <input
              type="text"
              name="alt"
              value={editItem.alt}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="عنوان پست"
            />
            <label htmlFor="text" className="mb-2 text-sm">
              متن پست
            </label>
            <textarea
              name="text"
              value={editItem.text}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="متن پست"
              rows={3}
            />
            <div className="flex justify-between mt-4">
              <button
                className="AdminPageRedButton"
                onClick={() => setIsModalOpen(false)}
              >
                لغو
              </button>
              <button className="AdminPageGreenButton" onClick={handleUpdate}>
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center"
          onClick={() => setIsAddModalOpen(false)} // بستن مودال با کلیک روی پس‌زمینه
        >
          <div
            className="bg-white p-5 rounded-lg w-[90%] max-w-[500px]"
            onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن مودال با کلیک داخل آن
          >
            <h2 className="text-xl text-center font-bold mb-4">افزودن پست جدید</h2>
            <input
              type="text"
              name="src"
              value={newItem.src}
              onChange={handleAddChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="آدرس تصویر"
            />
            <input
              type="text"
              name="alt"
              value={newItem.alt}
              onChange={handleAddChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="عنوان پست"
            />
            <textarea
              name="text"
              value={newItem.text}
              onChange={handleAddChange}
              className="w-full p-2 border rounded-md"
              placeholder="متن پست"
              rows={3}
            />
            <div className="flex justify-between mt-4">
              <button
                className="AdminPageRedButton"
                onClick={() => setIsAddModalOpen(false)}
              >
                لغو
              </button>
              <button className="AdminPageGreenButton" onClick={handleAddItem}>
                افزودن
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminBlog;
